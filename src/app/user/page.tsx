"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { useUsers } from "@/hooks/admin.hooks";
// import { IUser } from "@/interface/admin.interface";
import UserManagementHeader from "@/components/admin/user-management-header";
import UserStatsCards from "@/components/admin/user-stats-cards";
import UserManagementTable from "@/components/admin/user-management-table";
import Pagination from "@/components/admin/pagination";
import { IUser } from "@/interface/auth/admin.interface";

const UserManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users data
  const { data: usersData, isLoading, refetch } = useUsers(currentPage, pageSize);
  
  // Handle different response structures
  const users = useMemo(() => {
    if (!usersData) return [];
    
    // If usersData has nested data structure
    if (usersData.data && Array.isArray(usersData.data.data)) {
      return usersData.data.data;
    }
    
    // If usersData.data is directly an array
    if (Array.isArray(usersData.data)) {
      return usersData.data;
    }
    
    // If usersData is directly an array
    if (Array.isArray(usersData)) {
      return usersData;
    }
    
    return [];
  }, [usersData]);

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    const searchLower = searchTerm.toLowerCase();
    return users.filter((user: IUser) =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user._id.toLowerCase().includes(searchLower)
    );
  }, [users, searchTerm]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredUsers.length;
    // Mock data for demonstration - in real app, these would come from API
    const active = Math.floor(total * 0.9);
    const inactive = total - active;
    const newThisMonth = Math.floor(total * 0.15);

    return {
      total,
      active,
      inactive,
      newThisMonth,
    };
  }, [filteredUsers]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Event handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success("Dữ liệu đã được làm mới!");
    } catch{
      toast.error("Có lỗi xảy ra khi làm mới dữ liệu");
    }
  };

  const handleAddNew = () => {
    toast.info("Chức năng thêm khách hàng mới đang được phát triển");
    // TODO: Implement add new user functionality
  };

  const handleEdit = (user: IUser) => {
    toast.info(`Chỉnh sửa khách hàng: ${user.name}`);
    // TODO: Implement edit user functionality
  };

  const handleDelete = (userId: string) => {
    toast.info(`Xóa khách hàng với ID: ${userId}`);
    // TODO: Implement delete user functionality
  };

  const handleView = (user: IUser) => {
    toast.info(`Xem chi tiết khách hàng: ${user.name}`);
    // TODO: Implement view user details functionality
  };

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    const action = currentStatus ? "vô hiệu hóa" : "kích hoạt";
    toast.info(`${action} khách hàng với ID: ${userId}`);
    // TODO: Implement toggle user status functionality
  };

  const handleExport = () => {
    toast.info("Xuất danh sách khách hàng ra file Excel");
    // TODO: Implement export functionality
  };

  const handleImport = () => {
    toast.info("Nhập danh sách khách hàng từ file");
    // TODO: Implement import functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <UserManagementHeader
            userType="user"
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onAddNew={handleAddNew}
            onRefresh={handleRefresh}
            onExport={handleExport}
            onImport={handleImport}
            totalCount={filteredUsers.length}
            isLoading={isLoading}
          />

          {/* Stats Cards */}
          <UserStatsCards
            userType="user"
            totalCount={stats.total}
            activeCount={stats.active}
            inactiveCount={stats.inactive}
            newThisMonth={stats.newThisMonth}
            isLoading={isLoading}
          />

          {/* Main Table */}
          <UserManagementTable
            users={paginatedUsers}
            userType="user"
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onToggleStatus={handleToggleStatus}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredUsers.length}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;