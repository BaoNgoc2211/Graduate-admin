import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUnassignedRooms,
  getAllChatRooms,
  getAssignedRooms,
  assignStaffToRoom,
  unassignStaffFromRoom,
  closeChatRoom,
  getMessages,
  sendMessage,
  getUnreadMessages,
  getUnreadCount,
} from "@/api/chat.api";
import type {
  IChatRoom,
  IMessage,
  ISendMessagePayload,
} from "@/interface/chat.interface";
import { toast } from "sonner";

// Lấy danh sách phòng chưa gán staff
export const useUnassignedChatRooms = () => {
  return useQuery<{ data: IChatRoom[] }>({
    queryKey: ["chat-rooms-unassigned"],
    queryFn: getUnassignedRooms,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// Lấy tất cả phòng chat
export const useAllChatRooms = () => {
  return useQuery<{ data: IChatRoom[] }>({
    queryKey: ["chat-rooms-all"],
    queryFn: getAllChatRooms,
    refetchInterval: 30000,
  });
};

// Lấy phòng chat được gán cho staff hiện tại
export const useAssignedChatRooms = () => {
  return useQuery<{ data: IChatRoom[] }>({
    queryKey: ["chat-rooms-assigned"],
    queryFn: getAssignedRooms,
    refetchInterval: 15000, // Refetch every 15 seconds
    
  });
};

// Lấy tin nhắn trong room
export const useChatMessages = (roomId: string) => {
  return useQuery<{ data: IMessage[] }>({
    queryKey: ["chat-messages", roomId],
    queryFn: () => getMessages(roomId),
    enabled: !!roomId,
    refetchInterval: 5000, // Polling every 5s for real-time feel
 
  });
};


export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: IMessage }, Error, ISendMessagePayload>({
    mutationFn: (payload: ISendMessagePayload) => {
      // ✅ Đảm bảo payload không có senderId
      const { roomId, content, messageType, metadata } = payload;
      return sendMessage({ roomId, content, messageType, metadata });
    },
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", variables.roomId],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-unassigned"],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-assigned"],
      });
      queryClient.invalidateQueries({
        queryKey: ["chat-rooms-all"],
      });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  });
};
// Lấy số lượng tin nhắn chưa đọc theo room
export const useUnreadCount = (roomId: string) => {
  return useQuery<{ data: { count: number } }>({
    queryKey: ["chat-unread-count", roomId],
    queryFn: () => getUnreadCount(roomId),
    enabled: !!roomId,
    refetchInterval: 10000,
  });
};

// Gán staff cho phòng chat
export const useAssignStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: IChatRoom }, Error, string>({
    mutationFn: (roomId: string) => assignStaffToRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-unassigned"] });
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-assigned"] });
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-all"] });
      
      toast.success("Successfully assigned to chat room");
    },
    onError: (error) => {
      console.error("Error assigning staff:", error);
      toast.error("Failed to assign staff to chat room");
    }
  });
};

export const useUnassignStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: IChatRoom }, Error, string>({
    mutationFn: (roomId: string) => unassignStaffFromRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-unassigned"] });
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-assigned"] });
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-all"] });
      
      toast.success("Successfully unassigned from chat room");
    },
    onError: (error) => {
      console.error("Error unassigning staff:", error);
      toast.error("Failed to unassign staff from chat room");
    }
  });
};


// Lấy tin nhắn chưa đọc 
export const useUnreadMessages = () => {
  return useQuery<{ data: IMessage[] }>({
    queryKey: ["chat-unread-messages"],
    queryFn: getUnreadMessages,
    refetchInterval: 10000, // Polling every 10s
   
  });
};

// Đóng phòng chat
export const useCloseChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: IChatRoom }, Error, string>({
    mutationFn: (roomId: string) => closeChatRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-unassigned"] });
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-assigned"] });
      queryClient.invalidateQueries({ queryKey: ["chat-rooms-all"] });
      
      toast.success("Chat room closed successfully");
    },
    onError: (error) => {
      console.error("Error closing chat room:", error);
      toast.error("Failed to close chat room");
    }
  });
};