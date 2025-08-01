// "use client";

// import type React from "react";
// import { useState, useRef, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Send,
//   MessageCircle,
//   User,
//   Bot,
//   AlertCircle,
//   UserPlus,
//   UserMinus,
//   X,
//   CheckCircle,
// } from "lucide-react";
// import { format, isSameDay } from "date-fns";
// import { toast } from "sonner";
// import { IChatRoom, IMessage } from "@/interface/chat.interface";
// import {
//   useChatMessages,
//   useSendMessage,
//   useAssignStaff,
//   useUnassignStaff,
//   useCloseChatRoom,
// } from "@/hooks/chat.hooks";

// interface ChatWindowProps {
//   selectedRoom?: IChatRoom;
// }

// export function ChatWindow({ selectedRoom }: ChatWindowProps) {
//   const [message, setMessage] = useState("");
//   const scrollAreaRef = useRef<HTMLDivElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const {
//     data: messagesResponse,
//     isLoading,
//     error,
//   } = useChatMessages(selectedRoom?._id || "");

//   const sendMessageMutation = useSendMessage();

//   // Room management mutations
//   const assignStaffMutation = useAssignStaff();
//   const unassignStaffMutation = useUnassignStaff();
//   const closeChatRoomMutation = useCloseChatRoom();

//   const messages = messagesResponse?.data || [];

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!message.trim() || !selectedRoom) return;

//     try {
//       await sendMessageMutation.mutateAsync({
//         roomId: selectedRoom._id,
//         content: message.trim(),
//         senderId: "current-staff-id",
//       });

//       setMessage("");
//       toast.success("Message sent successfully");
//     } catch (error) {
//       toast.error("Failed to send message");
//       console.error("Send message error:", error);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Room action handlers
//   const handleAssignStaff = () => {
//     if (selectedRoom) {
//       assignStaffMutation.mutate(selectedRoom._id);
//     }
//   };

//   const handleUnassignStaff = () => {
//     if (selectedRoom) {
//       unassignStaffMutation.mutate(selectedRoom._id);
//     }
//   };

//   const handleCloseRoom = () => {
//     if (selectedRoom) {
//       closeChatRoomMutation.mutate(selectedRoom._id);
//     }
//   };

//   const formatMessageTime = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       return format(date, "HH:mm");
//     } catch {
//       return "";
//     }
//   };

//   const formatMessageDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       const today = new Date();

//       if (isSameDay(date, today)) {
//         return "Today";
//       }

//       return format(date, "MMM dd, yyyy");
//     } catch {
//       return "";
//     }
//   };

//   const groupMessagesByDate = (messages: IMessage[]) => {
//     const groups: { [key: string]: IMessage[] } = {};

//     messages.forEach((message) => {
//       const dateKey = formatMessageDate(message.createdAt);
//       if (!groups[dateKey]) {
//         groups[dateKey] = [];
//       }
//       groups[dateKey].push(message);
//     });

//     return groups;
//   };

//   const renderMessage = (message: IMessage) => {
//     const isStaff = message.senderType === "staff";

//     return (
//       <div
//         key={message._id}
//         className={`flex ${isStaff ? "justify-end" : "justify-start"} mb-4`}
//       >
//         <div
//           className={`flex items-start gap-2 max-w-[70%] ${
//             isStaff ? "flex-row-reverse" : ""
//           }`}
//         >
//           <div
//             className={`w-8 h-8 rounded-full flex items-center justify-center ${
//               isStaff ? "bg-blue-600" : "bg-gray-500"
//             }`}
//           >
//             {isStaff ? (
//               <Bot className="w-4 h-4 text-white" />
//             ) : (
//               <User className="w-4 h-4 text-white" />
//             )}
//           </div>

//           <div
//             className={`rounded-lg px-4 py-2 ${
//               isStaff ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
//             }`}
//           >
//             <p className="text-sm whitespace-pre-wrap">{message.content}</p>
//             <p
//               className={`text-xs mt-1 ${
//                 isStaff ? "text-blue-100" : "text-gray-500"
//               }`}
//             >
//               {formatMessageTime(message.createdAt)}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (!selectedRoom) {
//     return (
//       <Card className="h-full">
//         <CardContent className="flex items-center justify-center h-full">
//           <div className="text-center">
//             <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600 mb-2">
//               Chọn một phòng chat
//             </h3>
//             <p className="text-gray-500">
//               Chọn một cuộc trò chuyện từ bảng điều khiển bên trái để bắt đầu
//               chat
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (isLoading) {
//     return (
//       <Card className="h-full flex flex-col">
//         <CardHeader className="pb-3">
//           <div className="flex items-center justify-between">
//             <Skeleton className="h-6 w-32" />
//             <Skeleton className="h-6 w-20" />
//           </div>
//         </CardHeader>
//         <CardContent className="flex-1 flex flex-col">
//           <div className="flex-1 space-y-4 mb-4">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   index % 2 === 0 ? "justify-start" : "justify-end"
//                 }`}
//               >
//                 <div className="flex items-start gap-2 max-w-[70%]">
//                   <Skeleton className="w-8 h-8 rounded-full" />
//                   <Skeleton className="h-16 w-48 rounded-lg" />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <Skeleton className="h-20 w-full" />
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="h-full">
//         <CardContent className="flex items-center justify-center h-full">
//           <div className="text-center">
//             <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600 mb-2">
//               Không thể tải tin nhắn
//             </h3>
//             <p className="text-gray-500">Vui lòng thử chọn lại phòng</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const messageGroups = groupMessagesByDate(messages);

//   return (
//     <Card className="h-full flex flex-col">
//       <CardHeader className="pb-3 border-b">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
//             <User className="w-5 h-5" />
//             {typeof selectedRoom.user === "object"
//               ? selectedRoom.user.email
//               : selectedRoom.user}
//           </CardTitle>
//           <div className="flex items-center gap-2">
//             {/* Room status badges */}
//             <Badge
//               variant={selectedRoom.status === "open" ? "default" : "secondary"}
//               className={selectedRoom.status === "open" ? "bg-green-600" : ""}
//             >
//               {selectedRoom.status === "open" ? (
//                 <MessageCircle className="w-3 h-3 mr-1" />
//               ) : (
//                 <CheckCircle className="w-3 h-3 mr-1" />
//               )}
//               {selectedRoom.status}
//             </Badge>

//             {selectedRoom.isHandled ? (
//               <Badge variant="outline" className="text-blue-600">
//                 {selectedRoom.staff
//                   ? `Staff: ${selectedRoom.staff}`
//                   : "Assigned"}
//               </Badge>
//             ) : (
//               <Badge variant="destructive">
//                 <AlertCircle className="w-3 h-3 mr-1" />
//                 Chưa được gán
//               </Badge>
//             )}

//             {/* Room action buttons */}
//             <div className="flex items-center gap-1">

//               {!selectedRoom.isHandled && (
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={handleAssignStaff}
//                   disabled={assignStaffMutation.isPending}
//                   className="h-8 px-2"
//                 >
//                   <UserPlus className="w-4 h-4 mr-1" />
//                   Gán cho tôi
//                 </Button>
//               )}

//               {selectedRoom.isHandled && selectedRoom.status === "open" && (
//                 <>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={handleUnassignStaff}
//                     disabled={unassignStaffMutation.isPending}
//                     className="h-8 px-2"
//                   >
//                     <UserMinus className="w-4 h-4 mr-1" />
//                     Bỏ gán
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={handleCloseRoom}
//                     disabled={closeChatRoomMutation.isPending}
//                     className="h-8 px-2 text-red-600 hover:text-red-700"
//                   >
//                     <X className="w-4 h-4 mr-1" />
//                     Đóng
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col p-0">
//         <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
//           {messages.length === 0 ? (
//             <div className="text-center py-8">
//               <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600">Chưa có tin nhắn nào</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn
//               </p>
//             </div>
//           ) : (
//             <div>
//               {Object.entries(messageGroups).map(([date, dateMessages]) => (
//                 <div key={date}>
//                   <div className="flex justify-center my-4">
//                     <Badge variant="outline" className="text-xs">
//                       {date}
//                     </Badge>
//                   </div>
//                   {dateMessages.map(renderMessage)}
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//           )}
//         </ScrollArea>

//         {/* Message input - only show if room is open and assigned */}
//         {selectedRoom.status === "open" && selectedRoom.isHandled && (
//           <div className="border-t p-4">
//             <div className="flex gap-2">
//               <Textarea
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 className="flex-1 min-h-[60px] max-h-[120px] resize-none"
//                 disabled={sendMessageMutation.isPending}
//               />
//               <Button
//                 onClick={handleSendMessage}
//                 disabled={!message.trim() || sendMessageMutation.isPending}
//                 className="bg-blue-600 hover:bg-blue-700 px-4"
//               >
//                 {sendMessageMutation.isPending ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 ) : (
//                   <Send className="w-4 h-4" />
//                 )}
//               </Button>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">
//               Nhấn Enter để gửi, Shift + Enter để xuống dòng mới
//             </p>
//           </div>
//         )}

//         {/* Info message when room is closed or unassigned */}
//         {(selectedRoom.status === "closed" || !selectedRoom.isHandled) && (
//           <div className="border-t p-4 bg-gray-50">
//             <div className="text-center text-gray-600">
//               {selectedRoom.status === "closed" ? (
//                 <p className="text-sm">Phòng chat này đã được đóng.</p>
//               ) : (
//                 <p className="text-sm">
//                   Phòng này chưa được gán cho bất kỳ nhân viên nào. Hãy gán bản
//                   thân để bắt đầu trả lời tin nhắn.
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import type React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  MessageCircle,
  User,
  Bot,
  AlertCircle,
  UserPlus,
  UserMinus,
  X,
  CheckCircle
} from "lucide-react";
import { format, isSameDay } from "date-fns";
import { toast } from "sonner";
import { IChatRoom, IMessage } from "@/interface/chat.interface";
import {
  useChatMessages,
  useSendMessage,
  useAssignStaff,
  useUnassignStaff,
  useCloseChatRoom,
} from "@/hooks/chat.hooks";

interface ChatWindowProps {
  selectedRoom?: IChatRoom;
}

export function ChatWindow({ selectedRoom }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data: messagesResponse,
    isLoading,
    error,
  } = useChatMessages(selectedRoom?._id || "");

  const sendMessageMutation = useSendMessage();

  // Room management mutations
  const assignStaffMutation = useAssignStaff();
  const unassignStaffMutation = useUnassignStaff();
  const closeChatRoomMutation = useCloseChatRoom();

  // ✅ SỬA: Wrap messages trong useMemo để tránh thay đổi reference không cần thiết
  const messages = useMemo(() => {
    return messagesResponse?.data || [];
  }, [messagesResponse?.data]);

  // ✅ SỬA: Auto-scroll to bottom when new messages arrive - giờ dependencies ổn định
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); 

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedRoom) return;

    try {
      await sendMessageMutation.mutateAsync({
        roomId: selectedRoom._id,
        content: message.trim(),
        senderId: "current-staff-id", 
      });

      setMessage("");
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Send message error:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Room action handlers
  const handleAssignStaff = () => {
    if (selectedRoom) {
      assignStaffMutation.mutate(selectedRoom._id);
    }
  };

  const handleUnassignStaff = () => {
    if (selectedRoom) {
      unassignStaffMutation.mutate(selectedRoom._id);
    }
  };

  const handleCloseRoom = () => {
    if (selectedRoom) {
      closeChatRoomMutation.mutate(selectedRoom._id);
    }
  };
  const formatMessageTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "HH:mm");
    } catch {
      return "";
    }
  };

  const formatMessageDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const today = new Date();

      if (isSameDay(date, today)) {
        return "Today";
      }

      return format(date, "MMM dd, yyyy");
    } catch {
      return "";
    }
  };

  // ✅ SỬA: Memoize groupMessagesByDate function để tránh tính toán lại không cần thiết
  const groupMessagesByDate = useMemo(() => {
    const groups: { [key: string]: IMessage[] } = {};

    messages.forEach((message) => {
      const dateKey = formatMessageDate(message.createdAt);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    return groups;
  }, [messages]); // Chỉ tính toán lại khi messages thay đổi

  const renderMessage = (message: IMessage) => {
    const isStaff = message.senderType === "staff";

    return (
      <div
        key={message._id}
        className={`flex ${isStaff ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`flex items-start gap-2 max-w-[70%] ${
            isStaff ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isStaff ? "bg-blue-600" : "bg-gray-500"
            }`}
          >
            {isStaff ? (
              <Bot className="w-4 h-4 text-white" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>

          <div
            className={`rounded-lg px-4 py-2 ${
              isStaff ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            <p
              className={`text-xs mt-1 ${
                isStaff ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {formatMessageTime(message.createdAt)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!selectedRoom) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Select a Chat Room
            </h3>
            <p className="text-gray-500">
              Choose a conversation from the left panel to start chatting
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 space-y-4 mb-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="flex items-start gap-2 max-w-[70%]">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-16 w-48 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Failed to Load Messages
            </h3>
            <p className="text-gray-500">Please try selecting the room again</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <User className="w-5 h-5" />
            {typeof selectedRoom.user === "object"
              ? selectedRoom.user.email
              : selectedRoom.user}
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* Room status badges */}
            <Badge
              variant={selectedRoom.status === "open" ? "default" : "secondary"}
              className={selectedRoom.status === "open" ? "bg-green-600" : ""}
            >
              {selectedRoom.status === "open" ? (
                <MessageCircle className="w-3 h-3 mr-1" />
              ) : (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              {selectedRoom.status}
            </Badge>
            
            {selectedRoom.isHandled ? (
              <Badge variant="outline" className="text-blue-600">
                {selectedRoom.staff ? `Staff: ${selectedRoom.staff}` : "Assigned"}
              </Badge>
            ) : (
              <Badge variant="destructive">
                <AlertCircle className="w-3 h-3 mr-1" />
                Unassigned
              </Badge>
            )}

            {/* Room action buttons */}
            <div className="flex items-center gap-1">
              {!selectedRoom.isHandled && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAssignStaff}
                  disabled={assignStaffMutation.isPending}
                  className="h-8 px-2"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Assign Me
                </Button>
              )}

              {selectedRoom.isHandled && selectedRoom.status === "open" && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleUnassignStaff}
                    disabled={unassignStaffMutation.isPending}
                    className="h-8 px-2"
                  >
                    <UserMinus className="w-4 h-4 mr-1" />
                    Unassign
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCloseRoom}
                    disabled={closeChatRoomMutation.isPending}
                    className="h-8 px-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Close
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No messages yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Start the conversation by sending a message
              </p>
            </div>
          ) : (
            <div>
              {/* ✅ SỬA: Sử dụng memoized groupMessagesByDate */}
              {Object.entries(groupMessagesByDate).map(([date, dateMessages]) => (
                <div key={date}>
                  <div className="flex justify-center my-4">
                    <Badge variant="outline" className="text-xs">
                      {date}
                    </Badge>
                  </div>
                  {dateMessages.map(renderMessage)}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Message input - only show if room is open and assigned */}
        {selectedRoom.status === "open" && selectedRoom.isHandled && (
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                disabled={sendMessageMutation.isPending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || sendMessageMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 px-4"
              >
                {sendMessageMutation.isPending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        )}

        {/* Info message when room is closed or unassigned */}
        {(selectedRoom.status === "closed" || !selectedRoom.isHandled) && (
          <div className="border-t p-4 bg-gray-50">
            <div className="text-center text-gray-600">
              {selectedRoom.status === "closed" ? (
                <p className="text-sm">This chat room has been closed.</p>
              ) : (
                <p className="text-sm">
                  This room is not assigned to any staff member. 
                  Assign yourself to start responding to messages.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}