import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { PrismaDbClient } from "./prisma/client"
import { MessagesAPI } from "./messages"
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const createContext = async ({ req }: StandaloneServerContextFunctionArgument) => {
  const token = req.headers.authorization || "";
  const userId = token.split(" ")[1];
  return {
    userId,
    pubsub,
    dataSources: {
      db: new PrismaDbClient(),
      // use if Prisma is not working
      messagesAPI: new MessagesAPI()
    }
  }
};
