import { Resolvers } from "../__generated__/resolvers-types";

export const Message: Resolvers = {
  Message: {
    sentFrom: async ({ sentFrom, senderId }, _, { dataSources }) => {
      const id = sentFrom ? parseInt(sentFrom) : senderId
      const sender = await dataSources.db.getUserDetails(id);
      return sender;
    }, 
    sentTo: async ({sentTo, receiverId}, _, { dataSources }) => {
      const id = sentTo ? parseInt(sentTo) : receiverId
      const receiver = await dataSources.db.getUserDetails(id);
      return receiver;
    }
  }
}