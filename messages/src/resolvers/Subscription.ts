import { Resolvers } from "../__generated__/resolvers-types";

export const Subscription: Resolvers = {
    Subscription: {
        listenForMessageInConversation: {
            //@ts-ignore
            subscribe: (_, __, { pubsub }) => {
                return pubsub.asyncIterator(["NEW_MESSAGE_SENT"]) 
            }
        },
    },
};