"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IChatRoom } from "@/interface/chat.interface";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import {
  useUnassignedChatRooms,
  useAssignedChatRooms,
} from "@/hooks/chat.hooks";
import { ChatRoomList } from "./chat-room-list";
import { ChatWindow } from "./chat-window";
export default function ChatDashboard() {
  const [selectedRoom, setSelectedRoom] = useState<IChatRoom | undefined>();
  const { data: unassignedResponse } = useUnassignedChatRooms();
  const { data: assignedResponse } = useAssignedChatRooms();

  const unassignedRooms = unassignedResponse?.data || [];
  const assignedRooms = assignedResponse?.data || [];

  const handleRoomSelect = (room: IChatRoom) => {
    setSelectedRoom(room);
  };

  // Calculate dashboard stats
  const stats = {
    totalUnassigned: unassignedRooms.length,
    totalAssigned: assignedRooms.length,
    activeRooms: [...unassignedRooms, ...assignedRooms].filter(
      (room) => room.status === "open"
    ).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with title and stats */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-900 mb-2">
              Bảng Điều Khiển Quản Lý Trò Chuyện
              </h1>
              <p className="text-gray-600">
                Quản lý các cuộc trò chuyện với khách hàng và cung cấp hỗ trợ
                thời gian thực
              </p>
            </div>

            {/* Quick stats badges */}
            <div className="flex items-center gap-3">
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                {stats.totalUnassigned} Chưa được gán
              </Badge>
              <Badge
                variant="default"
                className="bg-blue-600 flex items-center gap-1"
              >
                <UserCheck className="w-4 h-4" />
                {stats.totalAssigned} Phòng của tôi
              </Badge>
            </div>
          </div>

          {/* Dashboard overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                    Phòng chưa được gán
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {stats.totalUnassigned}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                    Phòng đã gán của tôi
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.totalAssigned}
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                    Phòng đang hoạt động
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.activeRooms}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main chat interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          {/* Left Sidebar - Chat Room List */}
          <div className="lg:col-span-1">
            <ChatRoomList
              selectedRoomId={selectedRoom?._id}
              onRoomSelect={handleRoomSelect}
            />
          </div>

          {/* Right Panel - Chat Window */}
          <div className="lg:col-span-3">
            <ChatWindow selectedRoom={selectedRoom} />
          </div>
        </div>

        {/* Footer with helpful tips */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                💡 Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-600">
              <ul className="space-y-1">
                <li>
                  • Nhấp vào &quot;Gán cho tôi&quot; để nhận khách chưa có người phụ trách
                </li>
                <li>• Dùng &quot;Đánh dấu đã đọc&quot; để xóa các tin nhắn chưa đọc</li>
                <li>
                  • Đóng các cuộc trò chuyện đã hoàn thành để giữ danh sách gọn gàng
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                ⚡ Phím tắt
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-600">
              <ul className="space-y-1">
                <li>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">
                    Enter
                  </kbd>{" "}
                  - Gửi tin nhắn
                </li>
                <li>
                  •{" "}
                  <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">
                    Shift + Enter
                  </kbd>{" "}
                  - Xuống dòng mới
                </li>
                <li>•Tự động làm mới mỗi 30 giây</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                📊  Hiệu suất
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-600">
              <ul className="space-y-1">
              <li>• Tin nhắn làm mới mỗi 5 giây</li>
                <li>• Phòng làm mới mỗi 30 giây</li>
                <li>• Tự động đánh dấu đã đọc sau 2 giây</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
