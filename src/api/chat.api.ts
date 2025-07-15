// import { IChatRoom, IMessage, IStartChatPayload, ISendMessagePayload } from "@/interface/chat.interface";
// import APIConfig from "./api.config";

// // Lấy danh sách các phòng chat chưa có staff xử lý
// export const getUnassignedRooms = async (): Promise<{ data: IChatRoom[] }> => {
//   const res = await APIConfig.get(`/chat/unassigned`);
//   return res.data;
// };

// // Lấy danh sách tin nhắn theo room
// export const getMessages = async (roomId: string): Promise<{ data: IMessage[] }> => {
//   const res = await APIConfig.get(`/chat/messages/${roomId}`);
//   return res.data;
// };

// // Bắt đầu chat (từ phía user)
// export const startChat = async (data: IStartChatPayload): Promise<{ data: { room: IChatRoom; newMessage: IMessage } }> => {
//   const res = await APIConfig.post(`/chat/start`, data, {
//     withCredentials: true,
//   });
//   return res.data;
// };

// // Gửi message (từ phía staff/admin)
// export const sendMessage = async (data: ISendMessagePayload): Promise<{ data: IMessage }> => {
//   const res = await APIConfig.post(`/chat/send`, data, {
//     withCredentials: true,
//   });
//   return res.data;
// };
import type {
  IChatRoom,
  IMessage,
  IStartChatPayload,
  ISendMessagePayload,
  IStartChatResponse,
} from "@/interface/chat.interface";
import APIConfig from "./api.config";

// Lấy danh sách các phòng chat chưa có staff xử lý
export const getUnassignedRooms = async (): Promise<{ data: IChatRoom[] }> => {
  const res = await APIConfig.get(`/api/chat/unassigned`);
  return res.data;
};

// Lấy danh sách tin nhắn theo room
export const getMessages = async (
  roomId: string
): Promise<{ data: IMessage[] }> => {
  const res = await APIConfig.get(`/api/chat/messages/${roomId}`);
  return res.data;
};

// Bắt đầu chat (từ phía user)
export const startChat = async (
  data: IStartChatPayload
): Promise<{ data: IStartChatResponse }> => {
  const res = await APIConfig.post(`/api/chat/start`, data, {
    withCredentials: true,
  });
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
