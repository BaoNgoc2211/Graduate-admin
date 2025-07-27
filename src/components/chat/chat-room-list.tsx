"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  User, 
  Clock, 
  AlertCircle, 
  UserPlus, 
  UserMinus, 
  X,
  CheckCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { IChatRoom } from "@/interface/chat.interface";
import { 
  useUnassignedChatRooms,
  useAssignedChatRooms,
  useAllChatRooms,
  useAssignStaff,
  useUnassignStaff,
  useCloseChatRoom,
  useUnreadCount
} from "@/hooks/chat.hooks";
import { useState } from "react";

interface ChatRoomListProps {
  selectedRoomId?: string;
  onRoomSelect: (room: IChatRoom) => void;
}

export function ChatRoomList({
  selectedRoomId,
  onRoomSelect,
}: ChatRoomListProps) {
  const [activeTab, setActiveTab] = useState("unassigned");
  
  // Multiple queries for different room types
  const { data: unassignedResponse, isLoading: unassignedLoading } = useUnassignedChatRooms();
  const { data: assignedResponse, isLoading: assignedLoading } = useAssignedChatRooms();
  const { data: allResponse, isLoading: allLoading } = useAllChatRooms();
  
  // Mutations for room management
  const assignStaffMutation = useAssignStaff();
  const unassignStaffMutation = useUnassignStaff();
  const closeChatRoomMutation = useCloseChatRoom();

  // Get appropriate data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "unassigned":
        return { data: unassignedResponse?.data || [], isLoading: unassignedLoading };
      case "assigned":
        return { data: assignedResponse?.data || [], isLoading: assignedLoading };
      case "all":
        return { data: allResponse?.data || [], isLoading: allLoading };
      default:
        return { data: [], isLoading: false };
    }
  };

  const { data: rooms, isLoading } = getCurrentData();

  // Room action handlers
  const handleAssignStaff = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    assignStaffMutation.mutate(roomId);
  };

  const handleUnassignStaff = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    unassignStaffMutation.mutate(roomId);
  };

  const handleCloseRoom = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    closeChatRoomMutation.mutate(roomId);
  };

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
        <CheckCircle className="w-3 h-3 mr-1" />
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

  // Room item component with actions
  const RoomItem = ({ room }: { room: IChatRoom }) => {
    return (
      <div
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
              {typeof room.user === "object" ? room.user.email : room.user}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {getStatusBadge(room)}
            <UnreadCountBadge roomId={room._id} />
          </div>
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {formatTime(room.updatedAt)}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              {!room.isHandled && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 px-2 text-xs"
                  onClick={(e) => handleAssignStaff(room._id, e)}
                  disabled={assignStaffMutation.isPending}
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  Assign
                </Button>
              )}

              {room.isHandled && room.status === "open" && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs"
                    onClick={(e) => handleUnassignStaff(room._id, e)}
                    disabled={unassignStaffMutation.isPending}
                  >
                    <UserMinus className="w-3 h-3 mr-1" />
                    Unassign
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                    onClick={(e) => handleCloseRoom(room._id, e)}
                    disabled={closeChatRoomMutation.isPending}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Close
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Unread count component
  const UnreadCountBadge = ({ roomId }: { roomId: string }) => {
    const { data: unreadResponse } = useUnreadCount(roomId);
    const unreadCount = unreadResponse?.data?.count || 0;

    if (unreadCount === 0) return null;

    return (
      <Badge variant="destructive" className="text-xs">
        {unreadCount}
      </Badge>
    );
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chat Rooms
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Tabs for different room types */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 m-2">
            <TabsTrigger value="unassigned" className="text-xs">
              Unassigned ({unassignedResponse?.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="assigned" className="text-xs">
              My Rooms ({assignedResponse?.data?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs">
              All ({allResponse?.data?.length || 0})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <TabsContent value="unassigned" className="mt-0">
              {rooms.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Không có phòng chưa được gán</p>
                  <p className="text-sm text-gray-500 mt-1">
                  Tất cả các phòng hiện đang được xử lý
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {rooms.map((room) => (
                    <RoomItem key={room._id} room={room} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="assigned" className="mt-0">
              {rooms.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Chưa có phòng nào được gán.</p>
                  <p className="text-sm text-gray-500 mt-1">
                  Gán mình vào phòng để xem các cuộc trò chuyện tại đây
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {rooms.map((room) => (
                    <RoomItem key={room._id} room={room} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-0">
              {rooms.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Không có phòng trò chuyện nào</p>
                  <p className="text-sm text-gray-500 mt-1">
                  Các cuộc trò chuyện mới sẽ hiển thị tại đây
                  </p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {rooms.map((room) => (
                    <RoomItem key={room._id} room={room} />
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}