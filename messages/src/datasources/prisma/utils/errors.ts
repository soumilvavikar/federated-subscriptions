import { GraphQLError } from "graphql";

export const AuthenticationError = () => {
  const authErrorMessage = "*** you must be logged in ***";
  return new GraphQLError(authErrorMessage, {
    extensions: {
      code: "UNAUTHENTICATED"
    }
  })
}

export const ConversationNotFoundError = () => NotFoundError("Conversation not found!")
export const RecordNotFoundError = () => NotFoundError("Record not found!")


export const NotFoundError = (message: string) => {
  return new GraphQLError(message, {
    extensions: {
      code: "NOT FOUND"
    }
  })
}

export const RecordAlreadyExistsError = () => {
  return new GraphQLError("Record already exists", {
    extensions: {
      code: "RECORD ALREADY EXISTS"
    }
  })
}