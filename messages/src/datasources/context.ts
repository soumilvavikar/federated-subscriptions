import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";
import { PrismaDbClient } from "./prisma/client"


export const createContext = async ({ req }: StandaloneServerContextFunctionArgument) => {
  const token = req.headers.authorization || "";
  const userId = token.split(" ")[1];
  return {
    userId,
    dataSources: {
      db: new PrismaDbClient()
    }
  }
};
