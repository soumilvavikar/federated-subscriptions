import { Resolvers } from "../__generated__/resolvers-types";

export const User: Resolvers = {
  User: {
    __resolveReference: async ({ id, ...attributes }, { dataSources }) => {
      const user = await dataSources.db.getUserDetails(id)
      return { ...attributes, ...user  }
    },
    id: (parent) => {
      return parent.username
    }
  }
}
