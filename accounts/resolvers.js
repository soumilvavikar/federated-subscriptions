const { AuthenticationError } = require("./utils/errors");

const resolvers = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      const user = await dataSources.accountsAPI.getUser(id);
      if (!user) {
        throw new Error("No user found for this Id");
      }
      return user;
    },
    me: async (_, __, { dataSources, userId }) => {
      if (!userId) throw AuthenticationError();
      const user = await dataSources.db.getUser(userId);
      return user;
    },
  },
  Mutation: {
    updateProfile: async (
      _,
      { updateProfileInput },
      { dataSources, userId }
    ) => {
      if (!userId) throw AuthenticationError();
      try {
        const updatedUser = await dataSources.accountsAPI.updateUser({
          userId,
          userInfo: updateProfileInput,
        });
        return {
          code: 200,
          success: true,
          message: "Profile successfully updated!",
          user: updatedUser,
        };
      } catch (err) {
        return {
          code: 400,
          success: false,
          message: err.message,
        };
      }
    },
    changeLoggedInStatus: async (_, __, { dataSources, userId }) => {
      if (!userId) throw AuthenticationError();
      try {
        const userLoggedInOrOut = await dataSources.db.changeAuthStatus(userId);

        const { lastActiveTime, isLoggedIn } = userLoggedInOrOut;

        return {
          success: true,
          time: lastActiveTime,
          message: `User was successfully ${
            isLoggedIn ? "logged in" : "logged out"
          }`,
        };
      } catch (err) {
        return {
          success: false,
          time: null,
          message: err.message,
        };
      }
    },
  },
  User: {
    __resolveReference: async ({ id }, { dataSources }) => {
      const user = await dataSources.db.getUser(id);
      return user;
    },
    id: (parent) => {
      // Get the username from the object in db and return it as id
      return parent.username;
    },
    profileDescription: (user) => {
      return user.description;
    },
    lastActiveTime: (user) => {
      return user.lastActiveTime.toString();
    },
  },
};

module.exports = resolvers;
