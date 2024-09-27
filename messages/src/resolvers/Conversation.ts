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
  }
}