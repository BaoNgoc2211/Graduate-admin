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
  unreadCount?: number; 
  priority?: "low" | "normal" | "high"; 
  tags?: string[]; 
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  room: string;
  content: string;
  sender: string;
  senderType: "user" | "staff";
  isRead?: boolean; 
  readAt?: string; 
  messageType?: "text" | "image" | "file" | "system"; 
  metadata?: { 
    fileName?: string;
    fileSize?: number;
    imageUrl?: string;
    systemAction?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IStartChatPayload {
  message: string;
}

export interface ISendMessagePayload {
  roomId: string;
  content: string;
  // senderId: string;
  messageType?: "text" | "image" | "file"; 
  metadata?: IMessage["metadata"]; 
}

export interface IStartChatResponse {
  room: IChatRoom;
  newMessage: IMessage;
}

export interface IChatStats {
  totalRooms: number;
  activeRooms: number;
  unassignedRooms: number;
  closedRooms: number;
  totalMessages: number;
  unreadMessages: number;
  averageResponseTime: number;
  staffActivity: {
    staffId: string;
    staffName: string;
    assignedRooms: number;
    messagesHandled: number;
    averageResponseTime: number;
  }[];
}

export interface IAssignStaffPayload {
  roomId: string;
  staffId?: string; 
}

export interface IUnassignStaffPayload {
  roomId: string;
}

export interface ICloseChatRoomPayload {
  roomId: string;
  reason?: string;
}

export interface IChatRoomFilter {
  status?: "open" | "closed" | "all";
  isHandled?: boolean;
  staffId?: string;
  priority?: "low" | "normal" | "high";
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  hasUnreadMessages?: boolean;
}

// Add notification interface
export interface IChatNotification {
  _id: string;
  type: "new_message" | "room_assigned" | "room_closed" | "staff_joined";
  roomId: string;
  messageId?: string;
  title: string;
  content: string;
  isRead: boolean;
  recipientId: string;
  createdAt: string;
}