// A collection of Prisma-focused operations, extracted to keep our resolvers thin!
import { PrismaClient, Prisma } from "@prisma/client";
import { AuthenticationError, RecordAlreadyExistsError, ConversationNotFoundError, RecordNotFoundError } from "./utils/errors"



export class PrismaDbClient {

  prisma = new PrismaClient();

  sendMessageToConversation = async ({ conversationId, text, userId }: { conversationId: number; text: string; userId: number;}) => {

    if (!userId) throw AuthenticationError();
    
    try {
      // see whether user is part of the conversation, then get other participant
      const participants = await this.getConversationParticipants({ conversationId, userId })

      if (!participants.length) {
        throw ConversationNotFoundError()
      }

      const recipient = participants.find(p => p !== userId);
      
      // Create the message
      const submittedMessage = await this.prisma.message.create({
        data: {
          text,
          senderId: userId,
          receiverId: recipient,
          sentTime: new Date(),
        }
      })

      // Add the message to the conversation
       await this.prisma.conversation.update({
        where: {
          id: conversationId
        },
        data: {
          messages: {
            connect: {
              id: submittedMessage.id
            }
          }
        }
      })

      const returnMessage = {
        ...submittedMessage,
        sentFrom: submittedMessage.senderId,
        sentTo: submittedMessage.receiverId
      }


      return returnMessage;
      
    } catch (e) {
      console.log(e)
      return e
    }
  }

  getMessagesAfterDate = async (timestampMs: number, conversationId: string) => {
    const date = new Date(timestampMs);

    try {
      const messages = await this.prisma.message.findMany({
        where: {
          conversationId: parseInt(conversationId),
          sentTime: {
            gte: date
          }
        }
      })
      
      
      return messages.map(({ senderId, receiverId, id, sentTime, text }) => {
        return {
          id,
          sentTime,
          text,
          sentFrom: senderId,
          sentTo: receiverId
        }
      })
    } catch (e) {
      console.log(e)
      return e
    }

  }

  getUserDetails = async (id: number) => {

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id
        }
      })


      return user;
    } catch (e) {
      console.log(e)
      return e
    }
  }

  findUserConversationWithRecipient = async ({ recipientId, userId }: { recipientId: number, userId: number }) => {
    if (!userId) throw AuthenticationError();
    if (userId === recipientId) throw Error("Please provide a recipient ID different from your own")

    try {
      // Grab user's conversations
      const { conversation: conversationsArray } = await this.prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          conversation: {
            include: {
              conversation: {
                include: {
                  participants: true
                }
              }
            }
          }
        }
      })

      // find conversation that has recipient as participant
      const matchedConversationArray = conversationsArray.filter(({ conversation }) => {
        // Only return the conversation that contains the recipient's ID
        return conversation.participants.find(participant => participant.participantId === recipientId)
      })
  

      if (!matchedConversationArray.length) {
        throw ConversationNotFoundError();
      }

      const [{ conversation: matchedConversation}] = matchedConversationArray;

  
      // Now fetch additional details about this conversation using the ID we found
      const { id: conversationId, openedTime, ...conversationAttributes } = await this.prisma.conversation.findUnique({
        where: {
          id: matchedConversation.id 
        },
      })
    
    return {
      // Schema expects ID to be a string
      id: conversationId.toString(),
      createdAt: openedTime.toString(),
      ...conversationAttributes
    }
    
    } catch (e) {
      // If conversation lookup fails, throw error
      console.log(e)
      throw Error(e.message)
    }
  }
  
  findUserConversations = async (userId: number) => {
    if (!userId) throw AuthenticationError();
    
    try {
      // Find conversations where user is a participant
      const conversations = await this.prisma.conversationParticipant.findMany({
        where: {
          participantId: userId
        },
        include: {
          conversation: {
            include: {
              messages: true
            }
          }
        }
      })

      // If there are conversations, map through and return their properties
      return conversations.length ? conversations.map(({ conversation: { id, openedTime, messages, ...conversationAttributes } }) => {
        return {
          id: id.toString(),
          createdAt: openedTime.toString(),
          messages,
          ...conversationAttributes
        }
      }) : []

    } catch (e) {
      console.log(e)
      throw Error(e.message)
    }
  }

  createNewConversation = async ({ recipientId, userId }: { recipientId: number, userId: number }) => {
    if (!userId) throw AuthenticationError();
    if (userId === recipientId) throw Error("You can't start a conversation with yourself! Maybe try talking to the mirror instead?")

      try {
        // Grab user's conversations
        const user = await this.prisma.user.findUnique({
          where: {
            id: userId
          },
          include: {
            conversation: {
              include: {
                conversation: {
                  include: {
                    participants: true
                  }
                }
              }
            }
          }
        })

        // User could not be found
        if (!user) {
          throw RecordNotFoundError()
        }

        const { conversation: conversationsArray } = user;

        // see if a conversation exists with recipient
        const matchedConversation = conversationsArray.filter(({ conversation }) => {
          // Only return the conversation that contains the recipient's ID
          return conversation.participants.find(participant => participant.participantId === recipientId)
        })
    

        if (matchedConversation.length) {
          throw RecordAlreadyExistsError()
        }


        const createdConversation = await this.prisma.conversation.create({
          data: {
            participants: {
            create: [
              {
                participant: {
                  connect: {
                    id: userId
                  }
                }
              },
              {
                participant: {
                  connect: {
                    id: recipientId
                  }
                }
              }
            ]
            }
          }
        })

        const { id: conversationId, openedTime, ...conversationAttributes } = createdConversation;
    
      
        return {
          // Schema expects ID to be a string
          id: conversationId.toString(),
          createdAt: openedTime.toString(),
          ...conversationAttributes
        }
      
      } catch (e) {
        // If conversation creation fails, throw error
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e)
          throw Error("The operation failed because one or more records could not be found")
        }
        throw Error(e.message)
      }
  }

  getConversationParticipants = async ({conversationId, userId}: {conversationId: number, userId: number}) => {
    // First validate that the user is a member of the conversation
    const userConversations = await this.prisma.conversationParticipant.findMany({
      where: {
        conversationId: {
          in: [conversationId]
        },
        participantId: {
          in: [userId]
        }
      },
      include: {
        conversation: {
          select: {
            participants: {
              select: {
                participantId: true
              }
            }
          }
        }
      }
    })

    if (!userConversations.length) {
      throw ConversationNotFoundError()
    }

    // grab the other participant
    const otherParticipant = await this.prisma.conversationParticipant.findMany({
        where: {
          conversationId: {
            in: [conversationId]
          },
          participantId: {
            notIn: [userId]
          }
        },
        select: {
          participant: {
            select: {
              id: true
            }
          }
        }
      })

      const { participant: { id: participantId } } = otherParticipant[0]
    
      return [ userId, participantId ]

  }

  // todo: find conversation between two participants

}