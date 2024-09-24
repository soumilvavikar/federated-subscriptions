// The representation for a message as extracted from the database
export type MessageRepresentation = {
  id: number;
  sentTime: Date;
  text: string;
  senderId?: number;
  receiverId?: number;
  sentFrom?: string;
  sentTo?: string;
  conversationId?: number;
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
  id: string;
  lastActiveTime?: number;
  isLoggedIn?: boolean;
}