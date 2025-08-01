import type {
  IChatRoom,
  IMessage,
  ISendMessagePayload,
} from "@/interface/chat.interface";
import APIConfig from "./api.config";

// Lấy danh sách các phòng chat chưa có staff xử lý
export const getUnassignedRooms = async (): Promise<{ data: IChatRoom[] }> => {
  const res = await APIConfig.get(`/api/chat/unassigned`);
  return res.data;
};

// Lấy tất cả phòng chat (cả assigned và unassigned)
export const getAllChatRooms = async (): Promise<{ data: IChatRoom[] }> => {
  const res = await APIConfig.get(`/api/chat/all`);
  return res.data;
};

// Lấy phòng chat được gán cho staff hiện tại
export const getAssignedRooms = async (): Promise<{ data: IChatRoom[] }> => {
  const res = await APIConfig.get(`/api/chat/staff/messages`, {
    withCredentials: true,
  });
  return res.data;
};

// Lấy danh sách tin nhắn theo room
export const getMessages = async (
  roomId: string
): Promise<{ data: IMessage[] }> => {
  const res = await APIConfig.get(`/api/chat/messages/${roomId}`);
  return res.data;
};

// Gửi message (từ phía staff/admin)
export const sendMessage = async (
  data: ISendMessagePayload
): Promise<{ data: IMessage }> => {
  const res = await APIConfig.post(`/api/chat/send`, data, {
    withCredentials: true,
  });
  return res.data;
};
// Gán staff cho phòng chat
export const assignStaffToRoom = async (roomId: string): Promise<{ data: IChatRoom }> => {
  const res = await APIConfig.post(`/api/chat/assign/${roomId}`, {}, {
    withCredentials: true,
  });
  return res.data;
};

// Hủy gán staff khỏi phòng chat
export const unassignStaffFromRoom = async (roomId: string): Promise<{ data: IChatRoom }> => {
  const res = await APIConfig.post(`/api/chat/unassign/${roomId}`, {}, {
    withCredentials: true,
  });
  return res.data;
};
// Đóng phòng chat
export const closeChatRoom = async (roomId: string): Promise<{ data: IChatRoom }> => {
  const res = await APIConfig.post(`/api/chat/close/${roomId}`, {}, {
    withCredentials: true,
  });
  return res.data;
};

// Lấy tin nhắn chưa đọc 
export const getUnreadMessages = async (): Promise<{ data: IMessage[] }> => {
  const res = await APIConfig.get(`/api/chat/unread`, {
    withCredentials: true,
  });
  return res.data;
};

// Lấy số lượng tin nhắn chưa đọc theo room
export const getUnreadCount = async (roomId: string): Promise<{ data: { count: number } }> => {
  const res = await APIConfig.get(`/api/chat/unread-count/${roomId}`, {
    withCredentials: true,
  });
  return res.data;
};