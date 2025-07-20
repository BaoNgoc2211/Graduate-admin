"use client";

import { useState } from "react";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IManufacturer } from "@/interface/inventory/manufacture.interface";
import {
  useDeleteManufacture,
  useManufactures,
} from "@/hooks/inventory/manufacture.hooks";
import ManufacturerForm from "@/components/inventory/manufacture/manufacturer-form";
import PageHeader from "@/components/layout/page-header";

export default function ManufacturePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState<
    IManufacturer | undefined
  >();
  const itemsPerPage = 5;
  const { data: manufacturersData, isLoading, refetch } = useManufactures();
  const deleteMutation = useDeleteManufacture();
  const manufacturers = manufacturersData?.data || [];
  const filteredManufacturers = manufacturers.filter(
    (manufacturer) =>
      manufacturer.nameCo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredManufacturers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentManufacturers = filteredManufacturers.slice(
    startIndex,
    endIndex
  );
  const handleCreate = () => {
    setEditingManufacturer(undefined);
    setIsFormOpen(true);
  };
  const handleEdit = (manufacturer: IManufacturer) => {
    setEditingManufacturer(manufacturer);
    setIsFormOpen(true);
  };
  const handleViewDetails = (id: string) => {
    console.log("View details for manufacturer:", id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xoá nhà sản xuất này không?")) {
      deleteMutation.mutate(id);
    }
  };
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingManufacturer(undefined);
    refetch(); // Refresh danh sách
  };
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingManufacturer(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PageHeader
        title="Quản lý Nhà sản xuất"
        subtitle="Danh sách và quản lý các nhà sản xuất"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl text-blue-900">
                Danh sách Nhà sản xuất
              </CardTitle>
              <div className="flex flex-col lg:flex-row lg:gap-5 sm:flex-col gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm theo tên công ty hoặc thương hiệu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button
                  className="bg-blue-900 hover:bg-blue-800"
                  onClick={handleCreate}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm mới
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-blue-900">
                      Tên công ty
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Quốc gia
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Thương hiệu
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900 text-center">
                      Hành động
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentManufacturers.map((manufacturer) => (
                    <TableRow
                      key={manufacturer._id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {manufacturer.nameCo}
                      </TableCell>
                      <TableCell>{manufacturer.country}</TableCell>
                      <TableCell>{manufacturer.branch}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            onClick={() => handleViewDetails(manufacturer._id!)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                            onClick={() => handleEdit(manufacturer)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            onClick={() => handleDelete(manufacturer._id!)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xoá
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Tablet View */}
            <div className="hidden md:block lg:hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-blue-900">
                      Thông tin chính
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Liên hệ
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900 text-center">
                      Hành động
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentManufacturers.map((manufacturer) => (
                    <TableRow
                      key={manufacturer._id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {manufacturer.nameCo}
                          </div>
                          <div className="text-sm text-gray-600">
                            {manufacturer.country}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {manufacturer.branch}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 px-2"
                            onClick={() => handleViewDetails(manufacturer._id!)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 px-2"
                            onClick={() => handleEdit(manufacturer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 px-2"
                            onClick={() => handleDelete(manufacturer._id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden">
              <div className="space-y-4 p-4">
                {currentManufacturers.map((manufacturer) => (
                  <Card
                    key={manufacturer._id}
                    className="border border-gray-200"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-blue-900">
                            {manufacturer.nameCo}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {manufacturer.country}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Thương hiệu:</span>{" "}
                            {manufacturer.branch}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex-1"
                            onClick={() => handleViewDetails(manufacturer._id!)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex-1"
                            onClick={() => handleEdit(manufacturer)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 flex-1"
                            onClick={() => handleDelete(manufacturer._id!)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xoá
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredManufacturers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy nhà sản xuất nào
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Thử thay đổi từ khóa tìm kiếm hoặc thêm mới nhà sản xuất
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t bg-gray-50 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Hiển thị {startIndex + 1} đến{" "}
                    {Math.min(endIndex, filteredManufacturers.length)} trong
                    tổng số {filteredManufacturers.length} kết quả
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                              className={
                                currentPage === page
                                  ? "bg-blue-900 text-white"
                                  : ""
                              }
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingManufacturer
                ? "Cập nhật nhà sản xuất"
                : "Thêm mới nhà sản xuất"}
            </DialogTitle>
          </DialogHeader>
          <ManufacturerForm
            defaultValue={editingManufacturer}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
