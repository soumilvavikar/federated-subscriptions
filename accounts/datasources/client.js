const { PrismaClient } = require("@prisma/client");

class PrismaDbClient {
  prisma = new PrismaClient();

  getUser = async (username) => {
    console.log("I got called with ", username);
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      console.log({ user });
      return user;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  changeAuthStatus = async (username) => {
    try {
      const { isLoggedIn } = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });

      return this.prisma.user.update({
        where: {
          username,
        },
        data: {
          isLoggedIn: !isLoggedIn,
          lastActiveTime: new Date(),
        },
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  updateUser = async (_, { updateProfileInput }, { userId }) => {
    const { name, profileDescription: description } = updateProfileInput;
    try {
      return this.prisma.user.update({
        where: {
          username: userId,
        },
        data: {
          ...(name && { name }),
          ...(description && { description }),
        },
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}

module.exports = {
  PrismaDbClient,
};
