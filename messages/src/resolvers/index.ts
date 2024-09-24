import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { Message } from "./Message";
import { Conversation } from "./Conversation";
import { User } from "./User";
// import { Subscription } from "./Subscription"


const resolvers = {
  ...Query,
  ...Mutation,
  ...Conversation,
  ...Message,
  ...User,
  // ...Subscription
};

export default resolvers;
