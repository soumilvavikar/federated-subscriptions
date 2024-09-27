const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const { readFileSync } = require("fs");
const axios = require("axios");
const gql = require("graphql-tag");
const { PrismaDbClient } = require("./datasources/client");

const { AuthenticationError } = require("./utils/errors");

const typeDefs = gql(readFileSync("./accounts.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers");
const AccountsAPI = require("./datasources/accounts");

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
  });

  const port = process.env.PORT || 4002;
  const subgraphName = "accounts";

  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const username = token.split(" ")[1]; // get the user name after 'Bearer '

        let userInfo = {};
        if (username) {
          userInfo = { userId: username };
        }

        return {
          ...userInfo,
          dataSources: {
            accountsAPI: new AccountsAPI(),
            db: new PrismaDbClient(),
          },
        };
      },
      listen: {
        port,
      },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
