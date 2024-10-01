import { Resolvers } from "../__generated__/resolvers-types";

export const Conversation: Resolvers = {
  Conversation: {
    messages: ({messages}) => {
      return messages?.length ? messages.map(({ id, sentTime, text, senderId, receiverId }) => ({
        id,
        sentTime,
        senderId,
        receiverId,
        text
      })) : []
    }

    /* IF PRISMA DOES NOT WORK FOR YOU, USE THIS RESOLVER INSTEAD */
    // messages: ({messages}) => {
    //   return messages?.length ? messages.map(({ id, sentTime, text, sentFrom, sentTo }) => ({
    //     id,
    //     sentTime,
    //     sentFrom,
    //     sentTo,
    //     text
    //   })) : []
    // }
  }
}