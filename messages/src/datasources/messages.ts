// A fallback in case Prisma DB does not work for some reason
import { AuthenticationError, RecordAlreadyExistsError, ConversationNotFoundError, RecordNotFoundError } from "./prisma/utils/errors"
import fs from "fs"

type User = {
  username: string;
  name: string;
  conversations: string[]
}

type Message = {
  id: number;
  sentTime: Date;
  text: string;
  senderId?: string;
  receiverId?: string;
  sentFrom?: string;
  sentTo?: string;
  conversationId?: string;
}

type Conversation = {
  id: string;
  messages: Message[];
  createdAt: string;
}

const conversationsFilePath = "./src/datasources/json/messages_data.json"
const participantsFilePath = "./src/datasources/json/participants_data.json"

export class MessagesAPI {

  getConversations(): Conversation[] {
    const data = fs.readFileSync(conversationsFilePath, 'utf8');
    const conversations = JSON.parse(data)
    return conversations
  }

  getParticipants(): User[] {
    const data = fs.readFileSync(participantsFilePath, 'utf8');
    const participants = JSON.parse(data)
    return participants
  }

  getParticipant(userId: string): User {
    const participants = this.getParticipants()
    return participants.find(p => p.username === userId);
  }

  getConversation(id: string): Conversation {
    const conversations = this.getConversations()
    return conversations.find((conv) => conv.id === id)
  }

  async findUserConversations(userId: string): Promise<Conversation[]> {
    const participant = this.getParticipant(userId);
    const { conversations } = participant;

    const matchedConversations = conversations.map((convId) => this.getConversation(convId))
    return Promise.resolve(matchedConversations)
  }

  async findUserConversationWithRecipient({ recipientId, userId }: { recipientId: string, userId: string }): Promise<Conversation> {
    if (!userId) throw AuthenticationError();
    if (userId === recipientId) throw Error("Please provide a recipient ID different from your own")

    const recipientConversations = await this.findUserConversations(recipientId)
    const senderConversations = await this.findUserConversations(userId);

    const senderConversationKeys = senderConversations.map(({ id }) => id)

    const matchedConversation = recipientConversations.filter(({ id }) => senderConversationKeys.includes(id))

    // if (!matchedConversation.length) {
    //   throw ConversationNotFoundError();
    // }

    return matchedConversation[0]
  }

  sendMessageToConversation() {

  }


  getUserDetails(id: string) {
    const participant = this.getParticipant(id)
    return participant
  }


  async createNewConversation({ userId, recipientId }: { userId: string; recipientId: string; }) {
    
    const existingConversation = await this.findUserConversationWithRecipient({ userId, recipientId})
     if (existingConversation) throw RecordAlreadyExistsError();
  
    const newConversationId = `${userId}-${recipientId}-chat`
    // add new conversation entry
    const conversations = this.getConversations()
    const newConversation = {
      id: newConversationId,
      createdAt: Date.now()
    }

    const updatedConversations = [...conversations, newConversation]

    fs.writeFileSync(
      conversationsFilePath,
      JSON.stringify(updatedConversations, null, 2),
    );

    // update participants with reference to conversation

    const otherParticipants = this.getParticipants().filter(p => ![recipientId, userId].includes(p.username))
    const { conversations: recipientConversations, ...recipient } = this.getParticipant(recipientId)
    const { conversations: senderConversations, ...sender } = this.getParticipant(userId)

    const newSender = {
      ...sender,
      conversations: [
        ...senderConversations,
        newConversationId
      ]
    }

    const newRecipient = {
      ...recipient,
      conversations: [
        ...recipientConversations,
        newConversationId
      ]
    }



    const updatedParticipants = [...otherParticipants, newRecipient, newSender]

    fs.writeFileSync(
      participantsFilePath,
      JSON.stringify(updatedParticipants, null, 2),
    );

    const retrievedConversation = this.getConversation(newConversationId)
    return retrievedConversation
  }

  // getConversationParticipants() {}

   // getMessagesAfterDate() {

  // }

}