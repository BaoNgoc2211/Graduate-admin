"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { useAdmins } from "@/hooks/admin.hooks";
import UserManagementHeader from "@/components/admin/user-management-header";
import UserStatsCards from "@/components/admin/user-stats-cards";
import UserManagementTable from "@/components/admin/user-management-table";
import Pagination from "@/components/admin/pagination";
import { IAdmin } from "@/interface/auth/admin.interface";

const AdminManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch admins data
  const { data: adminsData, isLoading, refetch } = useAdmins(currentPage, pageSize);
  // const admins = adminsData?.data || [];
  const admins = useMemo(() => adminsData?.data || [], [adminsData]);

  // Filter admins based on search term
  const filteredAdmins = useMemo(() => {
    if (!searchTerm.trim()) return admins;
    
    const searchLower = searchTerm.toLowerCase();
    return admins.filter((admin) =>
      admin.name.toLowerCase().includes(searchLower) ||
      admin.email.toLowerCase().includes(searchLower) ||
      admin._id.toLowerCase().includes(searchLower)
    );
  }, [admins, searchTerm]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredAdmins.length;
    // Mock data for demonstration - in real app, these would come from API
    const active = Math.floor(total * 0.85);
    const inactive = total - active;
    const newThisMonth = Math.floor(total * 0.1);

    return {
      total,
      active,
      inactive,
      newThisMonth,
    };
  }, [filteredAdmins]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAdmins.length / pageSize);
  const paginatedAdmins = filteredAdmins.slice(
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
    } catch {
      toast.error("Có lỗi xảy ra khi làm mới dữ liệu");
    }
  };

  const handleAddNew = () => {
    toast.info("Chức năng thêm quản trị viên mới đang được phát triển");
    // TODO: Implement add new admin functionality
  };

  const handleEdit = (admin: IAdmin) => {
    toast.info(`Chỉnh sửa quản trị viên: ${admin.name}`);
    // TODO: Implement edit admin functionality
  };

  const handleDelete = (adminId: string) => {
    toast.info(`Xóa quản trị viên với ID: ${adminId}`);
    // TODO: Implement delete admin functionality
  };

  const handleView = (admin: IAdmin) => {
    toast.info(`Xem chi tiết quản trị viên: ${admin.name}`);
    // TODO: Implement view admin details functionality
  };

  const handleToggleStatus = (adminId: string, currentStatus: boolean) => {
    const action = currentStatus ? "vô hiệu hóa" : "kích hoạt";
    toast.info(`${action} quản trị viên với ID: ${adminId}`);
    // TODO: Implement toggle admin status functionality
  };

  const handleExport = () => {
    toast.info("Xuất danh sách quản trị viên ra file Excel");
    // TODO: Implement export functionality
  };

  const handleImport = () => {
    toast.info("Nhập danh sách quản trị viên từ file");
    // TODO: Implement import functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <UserManagementHeader
            userType="admin"
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onAddNew={handleAddNew}
            onRefresh={handleRefresh}
            onExport={handleExport}
            onImport={handleImport}
            totalCount={filteredAdmins.length}
            isLoading={isLoading}
          />

          {/* Stats Cards */}
          <UserStatsCards
            userType="admin"
            totalCount={stats.total}
            activeCount={stats.active}
            inactiveCount={stats.inactive}
            newThisMonth={stats.newThisMonth}
            isLoading={isLoading}
          />

          {/* Main Table */}
          <UserManagementTable
            users={paginatedAdmins}
            userType="admin"
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
              totalItems={filteredAdmins.length}
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

export default AdminManagementPage;