import { Resolvers } from "../__generated__/resolvers-types";

export const Query: Resolvers = {
  Query: {
    conversations: async (_, __, { dataSources, userId }) => {
      return dataSources.messagesAPI.findUserConversations(userId);
      
      // return dataSources.db.findUserConversations(userId);
    },
    conversation: async (_, { recipientId }, { dataSources, userId }) => {
      return dataSources.messagesAPI.findUserConversationWithRecipient({ recipientId, userId });
      
      //return dataSources.db.findUserConversationWithRecipient({ recipientId, userId });
    }
  }
}
