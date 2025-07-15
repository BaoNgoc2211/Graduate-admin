"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useUnassignedChatRooms } from "@/hooks/chat/useChat"
// import type { IChatRoom } from "@/interface/chat/chat.interface"
import { MessageCircle, User, Clock, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { IChatRoom } from "@/interface/chat.interface";
import { useUnassignedChatRooms } from "@/hooks/chat.hooks";

interface ChatRoomListProps {
  selectedRoomId?: string;
  onRoomSelect: (room: IChatRoom) => void;
}

export function ChatRoomList({
  selectedRoomId,
  onRoomSelect,
}: ChatRoomListProps) {
  const { data: roomsResponse, isLoading, error } = useUnassignedChatRooms();

  const rooms = roomsResponse?.data || [];

  const getStatusBadge = (room: IChatRoom) => {
    if (!room.isHandled) {
      return (
        <Badge variant="destructive" className="text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          Unassigned
        </Badge>
      );
    }

    if (room.status === "open") {
      return (
        <Badge variant="default" className="bg-blue-600 text-xs">
          <MessageCircle className="w-3 h-3 mr-1" />
          Active
        </Badge>
      );
    }

    return (
      <Badge variant="secondary" className="text-xs">
        Closed
      </Badge>
    );
  };

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Unknown time";
    }
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-blue-900">
            Chat Rooms
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-900">
            Chat Rooms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load chat rooms</p>
            <p className="text-sm text-gray-500 mt-1">Please try again later</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat Rooms ({rooms.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-200px)]">
          {rooms.length === 0 ? (
            <div className="text-center py-8 px-4">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No chat rooms available</p>
              <p className="text-sm text-gray-500 mt-1">
                New conversations will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => onRoomSelect(room)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 ${
                    selectedRoomId === room._id
                      ? "bg-blue-50 border-blue-300 shadow-sm"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900 text-sm">
                        {room.user}
                      </span>
                    </div>
                    {getStatusBadge(room)}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">
                      Room ID: {room._id.slice(-8)}
                    </p>

                    {room.staff && (
                      <p className="text-xs text-blue-600">
                        Staff: {room.staff}
                      </p>
                    )}

                    {room.lastMessage && (
                      <p className="text-xs text-gray-700 line-clamp-2">
                        {room.lastMessage}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {formatTime(room.updatedAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
