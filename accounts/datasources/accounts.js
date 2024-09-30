const fs = require("fs");
const { users: importedUsers } = require("./accounts_data");
const filename = "./accounts_data.json";

// Use this datasource if Prisma DB fails for any reason
class AccountsAPI {
  getUsers() {
    const data = fs.readFileSync("./datasources/accounts_data.json", "utf8");
    const users = JSON.parse(data);
    return users;
  }

  getUser(userId) {
    const users = this.getUsers();
    const user = users.find((u) => u.username === userId);
    return user;
  }

  changeAuthStatus(userId) {
    const { isLoggedIn, ...user } = this.getUser(userId);

    const updatedUser = {
      ...user,
      isLoggedIn: !isLoggedIn,
      lastActiveTime: Date.now(),
    };

    this.writeFileChanges(updatedUser);

    return updatedUser;
  }

  updateUser(userId, { name, profileDescription }) {
    const user = this.getUser(userId);

    const updatedUser = { ...user, name, profileDescription };

    this.writeFileChanges(updatedUser);

    return updatedUser;
  }

  writeFileChanges(singleUpdatedUser) {
    const users = this.getUsers();
    const { username } = singleUpdatedUser;
    const filteredUsers = users.filter((u) => u.username !== username);

    const updatedUsers = [...filteredUsers, singleUpdatedUser];

    fs.writeFileSync(
      "./datasources/accounts_data.json",
      JSON.stringify(updatedUsers, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        }
        return err;
      }
    );

    return true;
  }
}

module.exports = AccountsAPI;
