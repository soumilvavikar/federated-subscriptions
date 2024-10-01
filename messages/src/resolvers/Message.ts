import { Resolvers } from "../__generated__/resolvers-types";

export const Message: Resolvers = {
  Message: {
    sentFrom: async ({ sentFrom, senderId }, _, { dataSources }) => {
      const sender = await dataSources.db.getUserDetails(sentFrom ?? senderId);
      return sender;
    }, 
    sentTo: async ({sentTo, receiverId}, _, { dataSources }) => {
      const receiver = await dataSources.db.getUserDetails(sentTo ?? receiverId);
      return receiver;
    }
    // 
    /* IF PRISMA DOES NOT WORK FOR YOU, UNCOMMENT THESE RESOLVERS INSTEAD: */
    // sentFrom: async ({sentFrom, senderId}, _, { dataSources }) => {
    //   const sender = dataSources.messagesAPI.getUserDetails(sentFrom ?? senderId);
    //   return sender;
    // }, 
    // sentTo: async ({sentTo, receiverId}, _, { dataSources }) => {
    //   const receiver = dataSources.messagesAPI.getUserDetails(sentTo ?? receiverId);
    //   return receiver;
    // }
  }
}