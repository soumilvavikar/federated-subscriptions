import { PrismaDbClient } from "../datasources/prisma/client"

// This interface is used with graphql-codegen to generate types for resolvers context
export interface DataSourceContext {
  userId: string;
  dataSources: {
    db: PrismaDbClient;
  }
}
