
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield, 
  User,
  Mail,
  Calendar,
  Eye,
  UserCheck,
  UserX
} from "lucide-react";
import { IAdmin, IUser } from "@/interface/auth/admin.interface";

interface UserManagementTableProps {
  users: (IUser | IAdmin)[];
  userType: "admin" | "user";
  isLoading?: boolean;
  onEdit?: (user: IUser | IAdmin) => void;
  onDelete?: (userId: string) => void;
  onView?: (user: IUser | IAdmin) => void;
  onToggleStatus?: (userId: string, currentStatus: boolean) => void;
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({
  users,
  userType,
  isLoading = false,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const getInitials = (name?: string): string => {
    if (!name) return "??";
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "N/A";
    try {
      return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "short", 
        day: "numeric",
      }).format(new Date(dateString));
    } catch {
      return "N/A";
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user._id));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length && users.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                  />
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  {userType === "admin" ? "Quản trị viên" : "Khách hàng"}
                </TableHead>
                <TableHead className="font-semibold text-gray-900">Email</TableHead>
                <TableHead className="font-semibold text-gray-900">Trạng thái</TableHead>
                <TableHead className="font-semibold text-gray-900">Ngày tạo</TableHead>
                <TableHead className="font-semibold text-gray-900 text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-2">
                      {userType === "admin" ? (
                        <Shield className="h-12 w-12 text-gray-400" />
                      ) : (
                        <User className="h-12 w-12 text-gray-400" />
                      )}
                      <p className="text-gray-500">
                        Chưa có {userType === "admin" ? "quản trị viên" : "khách hàng"} nào
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow 
                    key={user._id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleSelectUser(user._id)}
                        className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/api/placeholder/40/40`} />
                          <AvatarFallback className="bg-blue-900 text-white">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user._id.slice(-8)}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {userType === "admin" ? (
                          <>
                            <Shield className="h-3 w-3 mr-1" />
                            Hoạt động
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-3 w-3 mr-1" />
                            Kích hoạt
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {formatDate((user as IUser).createdAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            onClick={() => onView?.(user)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onEdit?.(user)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => onToggleStatus?.(user._id, true)}
                            className="cursor-pointer"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Vô hiệu hóa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => onDelete?.(user._id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              {userType === "admin" ? (
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              ) : (
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              )}
              <p className="text-gray-500">
                Chưa có {userType === "admin" ? "quản trị viên" : "khách hàng"} nào
              </p>
            </CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                      className="rounded border-gray-300 text-blue-900 focus:ring-blue-900 mt-1"
                    />
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/api/placeholder/48/48`} />
                      <AvatarFallback className="bg-blue-900 text-white">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {user.email}
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge 
                          variant="outline" 
                          className="bg-green-50 text-green-700 border-green-200 text-xs"
                        >
                          {userType === "admin" ? "Admin" : "User"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate((user as IUser).createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem 
                        onClick={() => onView?.(user)}
                        className="cursor-pointer"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onEdit?.(user)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete?.(user._id)}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Selected Users Actions */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="shadow-lg border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Đã chọn {selectedUsers.length} {userType === "admin" ? "quản trị viên" : "khách hàng"}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa hàng loạt
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa đã chọn
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;