// export interface IChatRoom {
//   _id: string;
//   user: string;
//   staff?: string;
//   isHandled: boolean;
//   status: "open" | "closed";
//   lastMessage?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IMessage {
//   _id: string;
//   room: string;
//   content: string;
//   sender: string;
//   senderType: "user" | "staff";
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IStartChatPayload {
//   message: string;
// }

// export interface ISendMessagePayload {
//   roomId: string;
//   content: string;
//   senderId: string;
// }
export interface IUser extends Document {
  _id: string;
  googleId?: string;
  email: string;
  password: string;
  info: {
    name?: string;
    phone?: string;
    avatar?: string;
    gender?: string;
    point?: number;
    birthday?: Date;
    address?: {
      provinceId: string;
      provinceName: string;
      wardId: string;
      wardName: string;
      street?: string;
    };
  };
}
export interface IChatRoom {
  _id: string;
  user: IUser;
  staff?: string;
  isHandled: boolean;
  status: "open" | "closed";
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  room: string;
  content: string;
  sender: string;
  senderType: "user" | "staff";
  createdAt: string;
  updatedAt: string;
}

export interface IStartChatPayload {
  message: string;
}

export interface ISendMessagePayload {
  roomId: string;
  content: string;
  senderId: string;
}

export interface IStartChatResponse {
  room: IChatRoom;
  newMessage: IMessage;
}
