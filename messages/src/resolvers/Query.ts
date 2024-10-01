import { Resolvers } from "../__generated__/resolvers-types";

export const Query: Resolvers = {
  Query: {
    conversations: async (_, __, { dataSources, userId }) => {
      return dataSources.db.findUserConversations(userId);
    },
    conversation: async (_, { recipientId }, { dataSources, userId }) => {
      return dataSources.db.findUserConversationWithRecipient({ recipientId, userId });
    }
    /* IF PRISMA DOES NOT WORK FOR YOU, UNCOMMENT THESE RESOLVERS INSTEAD: */
    // conversations: async (_, __, { dataSources, userId }) => {
    //   return dataSources.messagesAPI.findUserConversations(userId);
    // },
    // conversation: async (_, { recipientId }, { dataSources, userId }) => {
    //   return dataSources.messagesAPI.findUserConversationWithRecipient({ recipientId, userId });
    // }
  }
}
