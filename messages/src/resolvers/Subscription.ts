import { Resolvers } from "../__generated__/resolvers-types";
import { NewMessageEvent } from "../datasources/models";

/**
 * This is simple resolver for PubSub subscription
 */
// export const Subscription: Resolvers = {
//     Subscription: {
//         listenForMessageInConversation: {
//             //@ts-ignore
//             subscribe: (_, __, { pubsub }) => {
//                 return pubsub.asyncIterator(["NEW_MESSAGE_SENT"]) 
//             }
//         },
//     },
// };

/**
 * This is the resolver for PubSub subscription with a cursor and allows to get messages sent after a certain timestamp
 */
export const Subscription: Resolvers = {
  Subscription: {
    listenForMessageInConversation: {
      // @ts-ignore
      subscribe: async (
        _,
        { fromMessageReceivedAt, id },
        { pubsub, dataSources }
      ) => {
        // GOAL: If a cursor `fromMessageReceivedAt` is passed, fetch all messages sent after

        // Check whether a timestamp was passed
        const timestampMs = parseInt(fromMessageReceivedAt);

        // Validate that timestamp is a number, if so retrieve messages sent after that timestamp
        if (!isNaN(timestampMs) && timestampMs > 0) {
          const messages = await dataSources.db.getMessagesAfterDate(
            timestampMs,
            id
          );

          return {
            // Set up the generator
            async *[Symbol.asyncIterator]() {
              console.log(
                "STEP 1: I am called the first time the subscription runs!"
              );
              // Initially, iterate through all the messages to "play back" what was missed
              // We're not awaiting NEW messages, just yielding the messages we already have in DB
              for (let i = 0; i < messages.length; i++) {
                yield { listenForMessageInConversation: messages[i] };
              }

              console.log(
                "STEP 2 TO INFINITY: creating a new iterator for each event"
              );
              // The thing we want to do with every new message
              let iterator = {
                [Symbol.asyncIterator]: () =>
                  pubsub.asyncIterator<NewMessageEvent>(["NEW_MESSAGE_SENT"]),
              };

              // The loop that awaits new message events and yields them
              for await (const event of iterator) {
                if (event.conversationId == id) {
                  yield event;
                }
              }
            },
          };

          // If no timestamp is passed, handle new messages as we normally would
        }
        return pubsub.asyncIterator(["NEW_MESSAGE_SENT"]);
      },
    },
  },
};