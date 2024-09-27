import { Resolvers } from "../__generated__/resolvers-types";

export const Mutation: Resolvers = {
  Mutation: {
    createConversation: async (_, { recipientId }, { dataSources, userId }) => {
      return dataSources.db.createNewConversation({ userId, recipientId })
    },
    sendMessage: async (_, { message }, { dataSources, userId }) => {
      const { conversationId, text } = message;
      const {
        id,
        text: messageText,
        sentFrom,
        sentTo,
        sentTime,
        ...messageAttributes
      } = await dataSources.db.sendMessageToConversation({
        conversationId,
        text,
        userId,
      });
    
      // Return all of the message that was created
      return {
        id,
        text: messageText,
        sentFrom,
        sentTo,
        sentTime,
        ...messageAttributes,
      };
    }
  }
}