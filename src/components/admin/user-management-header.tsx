"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  RefreshCw,
  Users,
  Shield
} from "lucide-react";

interface UserManagementHeaderProps {
  userType: "admin" | "user";
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddNew: () => void;
  onRefresh: () => void;
  onExport?: () => void;
  onImport?: () => void;
  totalCount: number;
  isLoading?: boolean;
}

const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  userType,
  searchTerm,
  onSearchChange,
  onAddNew,
  onRefresh,
  onExport,
  onImport,
  totalCount,
  isLoading = false,
}) => {
  const title = userType === "admin" ? "Quản lý Quản trị viên" : "Quản lý Khách hàng";
  const description = userType === "admin" 
    ? "Quản lý tài khoản và quyền hạn của các quản trị viên hệ thống"
    : "Quản lý thông tin và trạng thái của khách hàng trong hệ thống";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-900 rounded-lg">
            {userType === "admin" ? (
              <Shield className="h-6 w-6 text-white" />
            ) : (
              <Users className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={onRefresh}
            disabled={isLoading}
            className="bg-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          
          <Button 
            onClick={onAddNew}
            className="bg-blue-900 hover:bg-blue-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm {userType === "admin" ? "Quản trị viên" : "Khách hàng"}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Tìm kiếm theo tên, email${userType === "admin" ? ", vai trò..." : "..."}`}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-900 focus:ring-blue-900"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px] border-gray-300">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                  <SelectItem value="pending">Chờ xác thực</SelectItem>
                </SelectContent>
              </Select>

              {userType === "admin" && (
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300">
                    <SelectValue placeholder="Vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả vai trò</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-[180px] border-gray-300">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="name_asc">Tên A-Z</SelectItem>
                  <SelectItem value="name_desc">Tên Z-A</SelectItem>
                  <SelectItem value="email_asc">Email A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onExport}
                className="bg-white border-gray-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Xuất
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={onImport}
                className="bg-white border-gray-300"
              >
                <Upload className="h-4 w-4 mr-2" />
                Nhập
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white border-gray-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                Lọc nâng cao
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Hiển thị <span className="font-medium text-gray-900">{totalCount}</span> {' '}
              {userType === "admin" ? "quản trị viên" : "Khách hàng"}
              {searchTerm && (
                <span>
                  {' '}cho từ khóa &quot;<span className="font-medium text-blue-900">{searchTerm}</span>&quot;
                </span>
              )}
            </div>
            
            {searchTerm && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onSearchChange("")}
                className="text-blue-900 hover:text-blue-800"
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementHeader;