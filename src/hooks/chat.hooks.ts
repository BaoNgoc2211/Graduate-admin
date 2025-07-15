// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   getUnassignedRooms,
//   getMessages,
//   startChat,
//   sendMessage,
// } from "@/api/chat.api";
// import {
//   IChatRoom,
//   IMessage,
//   IStartChatPayload,
//   ISendMessagePayload,
// } from "@/interface/chat.interface";

// // Lấy danh sách phòng chưa gán staff
// export const useUnassignedChatRooms = () => {
//   return useQuery<{ data: IChatRoom[] }>({
//     queryKey: ["chat-rooms-unassigned"],
//     queryFn: getUnassignedRooms,
//   });
// };

// // Lấy tin nhắn trong room
// export const useChatMessages = (roomId: string) => {
//   return useQuery<{ data: IMessage[] }>({
//     queryKey: ["chat-messages", roomId],
//     queryFn: () => getMessages(roomId),
//     enabled: !!roomId,
//     refetchInterval: 5000, // Optional: polling mỗi 5s
//   });
// };

// // Bắt đầu cuộc trò chuyện (user)
// export const useStartChat = () => {
//   return useMutation({
//     mutationFn: (payload: IStartChatPayload) => startChat(payload),
//   });
// };

// // Gửi tin nhắn (admin hoặc staff)
// export const useSendMessage = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
//     onSuccess: (_res, variables) => {
//       // Refetch tin nhắn khi gửi thành công
//       queryClient.invalidateQueries({
//         queryKey: ["chat-messages", variables.roomId],
//       });
//     },
//   });
// };
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUnassignedRooms,
  getMessages,
  startChat,
  sendMessage,
} from "@/api/chat.api";
import type {
  IChatRoom,
  IMessage,
  IStartChatPayload,
  ISendMessagePayload,
  IStartChatResponse,
} from "@/interface/chat.interface";

// Lấy danh sách phòng chưa gán staff
export const useUnassignedChatRooms = () => {
  return useQuery<{ data: IChatRoom[] }>({
    queryKey: ["chat-rooms-unassigned"],
    queryFn: getUnassignedRooms,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// Lấy tin nhắn trong room
export const useChatMessages = (roomId: string) => {
  return useQuery<{ data: IMessage[] }>({
    queryKey: ["chat-messages", roomId],
    queryFn: () => getMessages(roomId),
    enabled: !!roomId,
    refetchInterval: 5000, // Optional: polling mỗi 5s
  });
};

// Bắt đầu cuộc trò chuyện (user)
export const useStartChat = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: IStartChatResponse }, Error, IStartChatPayload>({
    mutationFn: (payload: IStartChatPayload) => startChat(payload),
    onSuccess: (response) => {
      // Invalidate unassigned rooms to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      });

      // Set the new messages in cache
      queryClient.setQueryData(["chat-messages", response.data.room._id], {
        data: [response.data.newMessage],
      });
    },
  });
};

// Gửi tin nhắn (admin hoặc staff)
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
    mutationFn: (payload: ISendMessagePayload) => sendMessage(payload),
    onSuccess: (_res, variables) => {
      // Refetch tin nhắn khi gửi thành công
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
      });

      // Also invalidate unassigned rooms to update lastMessage
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      });
    },
  });
};
