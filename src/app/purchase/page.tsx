"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { IPurchaseOrderFilters } from "@/interface/order/purchase.interface";
import { usePurchaseOrders, useSuppliers } from "@/hooks/orders/purchase.hooks";
import { PurchaseOrderTable } from "@/components/order/purchase/New/table";
import { PurchaseStatusOptions } from "@/constants/purchase-status";
export default function PurchaseOrderListPage() {
  const [filters, setFilters] = useState<IPurchaseOrderFilters>({
    page: 1,
    limit: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const { data: ordersData, isLoading } = usePurchaseOrders(filters);
  const { data: suppliersData } = useSuppliers();

  const orders = ordersData?.data || [];
  const suppliers = suppliersData?.data || [];
  const totalPages = ordersData?.totalPages || 1;
  const currentPage = ordersData?.page || 1;

  const handleSearch = () => {
    setFilters({
      ...filters,
      search: searchTerm,
      startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
      endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
      page: 1,
    });
  };

  const handleStatusFilter = (note: string) => {
    setFilters({
      ...filters,
      note: note === "all" ? undefined : note,
      page: 1,
    });
  };

  const handleSupplierFilter = (supplierId: string) => {
    setFilters({
      ...filters,
      supplierId: supplierId === "all" ? undefined : supplierId,
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page,
    });
  };

  const clearFilters = () => {
    setFilters({ page: 1, limit: 10 });
    setSearchTerm("");
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Đơn mua hàng</h1>
              <p className="text-sm text-gray-600 mt-1">
                Quản lý và theo dõi tất cả đơn mua hàng
              </p>
            </div>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              <Link href="/purchase/create">
                <Plus className="h-4 w-4 mr-2" />
                Tạo đơn mới
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tìm kiếm
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Mã đơn hoặc nhà cung cấp..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Khoảng thời gian
                  </label>
                  <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate
                            ? format(startDate, "dd/MM/yyyy", { locale: vi })
                            : "Từ ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate
                            ? format(endDate, "dd/MM/yyyy", { locale: vi })
                            : "Đến ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Status Filter */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Trạng thái
                  </label>
                  <Select onValueChange={handleStatusFilter} defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Đẫ thanh toán</SelectItem>
                      <SelectItem value="draft">Ghi nợ</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Trạng thái
                  </label>
                  <Select onValueChange={handleStatusFilter} defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {PurchaseStatusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Supplier Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Nhà cung cấp
                  </label>
                  <Select
                    onValueChange={handleSupplierFilter}
                    defaultValue="all"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả nhà cung cấp</SelectItem>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier._id} value={supplier._id}>
                          {supplier.nameCo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Áp dụng bộ lọc
                  </Button>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <PurchaseOrderTable
              data={orders}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
