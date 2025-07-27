"use client";

import { ChatRoomList } from "@/components/chat/chat-room-list";
import { ChatWindow } from "@/components/chat/chat-window";
import { IChatRoom } from "@/interface/chat.interface";
import { useState } from "react";

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState<IChatRoom | undefined>();

  const handleRoomSelect = (room: IChatRoom) => {
    setSelectedRoom(room);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            Chat 
          </h1>
          <p className="text-gray-600">
            Quản lý các cuộc trò chuyện với khách hàng và cung cấp hỗ trợ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
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
      </div>
    </div>
  );
}
