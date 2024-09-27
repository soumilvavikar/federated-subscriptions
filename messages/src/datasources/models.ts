// The representation for a message as extracted from the database
export type MessageRepresentation = {
  id: number;
  sentTime: Date;
  text: string;
  senderId?: string;
  receiverId?: string;
  sentFrom?: string;
  sentTo?: string;
  conversationId?: string;
}

export type NewMessageEvent = {
  listenForMessageInConversation: {
    id: number;
    sentTime: Date;
    text: string;
    sentFrom: string;
    sentTo: string;
  },
  conversationId: string;
}

export type UserRepresentation = {
  id?: string;
  username?: string;
  lastActiveTime?: number;
  isLoggedIn?: boolean;
}