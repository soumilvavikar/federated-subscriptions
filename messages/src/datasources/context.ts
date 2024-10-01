import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { PrismaDbClient } from "./prisma/client"
import { MessagesAPI } from "./messages"

export const createContext = async ({ req }: StandaloneServerContextFunctionArgument) => {
  const token = req.headers.authorization || "";
  const userId = token.split(" ")[1];
  return {
    userId,
    dataSources: {
      db: new PrismaDbClient(),
      // use if Prisma is not working
      messagesAPI: new MessagesAPI()
    }
  }
};
