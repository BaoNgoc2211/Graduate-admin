"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useVouchers } from "@/hooks/voucher.hooks";
import VoucherForm from "@/components/voucher/voucher-form";
import VoucherOverview from "@/components/voucher/voucher-overview";
import VoucherChart from "@/components/voucher/voucher-chart";
import VoucherTable from "@/components/voucher/voucher-table";
import PageHeader from "@/components/layout/page-header";
import { IVoucher } from "@/interface/voucher.interface";

export default function VoucherManagementPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useVouchers(page, pageSize);

  const [searchTerm, setSearchTerm] = useState("");
  const vouchers: IVoucher[] = data?.data || [];

  const filteredVouchers = vouchers.filter((voucher) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      voucher.name.toLowerCase().includes(searchLower) ||
      voucher.code.toLowerCase().includes(searchLower) ||
      voucher.description.toLowerCase().includes(searchLower)
    );
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <PageHeader
              title="Quản lý voucher"
              subtitle=" Quản lý và theo dõi tất cả voucher trong hệ thống"
            />
            <VoucherForm
              trigger={
                <Button className="bg-blue-900 hover:bg-blue-800 text-white w-full sm:w-auto">
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Tạo mới
                </Button>
              }
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Không thể tải danh sách voucher. Vui lòng thử lại sau.
            </AlertDescription>
          </Alert>
        )}

        <VoucherOverview vouchers={filteredVouchers} isLoading={isLoading} />
        <VoucherChart vouchers={filteredVouchers} isLoading={isLoading} />
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên, mã code hoặc mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Tìm thấy {filteredVouchers.length} voucher cho &lquot;{" "}
              {searchTerm} &rquot;
              {filteredVouchers.length !== vouchers.length && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="ml-2 p-0 h-auto text-blue-600"
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Voucher Table */}
        <VoucherTable
          vouchers={filteredVouchers}
          isLoading={isLoading}
          currentPage={data?.currentPage || 1}
          totalPages={data?.totalPages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}
