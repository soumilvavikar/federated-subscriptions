import { Resolvers } from "../__generated__/resolvers-types";

export const Query: Resolvers = {
  Query: {
    conversations: async (_, __, { dataSources, userId }) => {
      return dataSources.db.findUserConversations(parseInt(userId));
    },
    conversation: async (_, { recipientId }, { dataSources, userId }) => {
      const [sender, receiver] = [userId, recipientId].map((id) => parseInt(id))
      return dataSources.db.findUserConversationWithRecipient({ recipientId: receiver, userId: sender });
    }
  }
}
