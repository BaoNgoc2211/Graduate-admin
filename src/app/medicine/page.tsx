"use client";

import { useState, useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useDeleteMedicine,
  useMedicines,
} from "@/hooks/medicine/medicine.hooks";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import Image from "next/image";
import MedicineForm from "@/components/medicine/medicine/medicine-form";
import PageHeader from "@/components/layout/page-header";
// import { useMedicines, useDeleteMedicine } from "@/hooks/useMedicine"
// import type { IMedicine } from "@/interface/medicine/medicine.interface"
// import MedicineForm from "@/components/medicine-form"

export default function MedicinePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<
    IMedicine | undefined
  >();
  const [deletingMedicine, setDeletingMedicine] = useState<
    IMedicine | undefined
  >();
  const itemsPerPage = 10;

  // Lấy danh sách medicines từ API
  const { data: medicinesData, isLoading, refetch } = useMedicines();
  const medicines = medicinesData?.data || [];

  // Hook để xóa medicine
  const deleteMutation = useDeleteMedicine();

  // Lọc medicines theo từ khóa tìm kiếm (theo tên thuốc)
  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        medicine.name?.toLowerCase().includes(searchLower) ||
        medicine.code?.toLowerCase().includes(searchLower) ||
        medicine.dosageForm?.toLowerCase().includes(searchLower)
      );
    });
  }, [medicines, searchTerm]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, endIndex);

  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("vi-VN", {
  //     style: "currency",
  //     currency: "VND",
  //   }).format(price)
  // }

  // Helper function để lấy thông tin manufacturer
  const getManufacturerInfo = (
    manufacturer_id: string | { _id: string; nameCo: string; country: string }
  ) => {
    if (typeof manufacturer_id === "object" && manufacturer_id) {
      return {
        id: manufacturer_id._id || "N/A",
        name: manufacturer_id.nameCo || "N/A",
        country: manufacturer_id.country || "N/A",
      };
    }
    return {
      id: manufacturer_id || "N/A",
      name: "N/A",
      country: "N/A",
    };
  };

  // Xử lý mở form tạo mới
  const handleCreate = () => {
    setEditingMedicine(undefined);
    setIsFormOpen(true);
  };

  // Xử lý mở form chỉnh sửa
  const handleEdit = (medicine: IMedicine) => {
    setEditingMedicine(medicine);
    setIsFormOpen(true);
  };

  // Xử lý xem chi tiết
  const handleViewDetails = (medicine: IMedicine) => {
    console.log("Chi tiết thuốc:", medicine);
  };

  // Xử lý mở dialog xác nhận xóa
  const handleDeleteClick = (medicine: IMedicine) => {
    setDeletingMedicine(medicine);
    setIsDeleteOpen(true);
  };

  // Xử lý xác nhận xóa
  const handleConfirmDelete = () => {
    if (deletingMedicine?._id) {
      deleteMutation.mutate(deletingMedicine._id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setDeletingMedicine(undefined);
          refetch(); 
        },
      });
    }
  };

  // Xử lý thành công form (tạo mới hoặc cập nhật) 
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingMedicine(undefined);
    refetch(); 
  };

  // Xử lý hủy form
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingMedicine(undefined);
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
      <PageHeader title="Quản lý Thuốc" subtitle="Danh sách và quản lý các loại thuốc"/>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl text-blue-900">
                Danh sách Thuốc
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm theo tên, mã thuốc hoặc dạng bào chế..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-80"
                  />
                </div>
                <Button
                  className="bg-blue-900 hover:bg-blue-800"
                  onClick={handleCreate}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thuốc
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
                      Mã thuốc
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Tên thuốc
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Dạng bào chế
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Số lượng
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Nhà sản xuất
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900 text-center">
                      Hành động
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMedicines.map((medicine) => (
                    <TableRow key={medicine._id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {medicine.code}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              medicine.thumbnail ||
                              "/placeholder.svg?height=40&width=40"
                            }
                            alt={medicine.name}
                            className="w-10 h-10 rounded-md object-cover"
                            width={40}
                            height={40}
                          />
                          <div className="min-w-0 flex-1">
                            <div
                              className="font-medium truncate max-w-[200px]"
                              title={medicine.name}
                            >
                              {medicine.name}
                            </div>
                            <div
                              className="text-sm text-gray-500 truncate max-w-[200px]"
                              title={medicine.active}
                            >
                              {medicine.active}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{medicine.dosageForm}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            medicine.quantity > 0 ? "default" : "destructive"
                          }
                          className="bg-blue-100 text-blue-800"
                        >
                          {medicine.quantity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const manufacturerInfo = getManufacturerInfo(
                            medicine.manufacturer_id
                          );
                          return manufacturerInfo.name;
                        })()}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            onClick={() => handleViewDetails(medicine)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                            onClick={() => handleEdit(medicine)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            onClick={() => handleDeleteClick(medicine)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              <div className="space-y-4 p-4">
                {currentMedicines.map((medicine) => (
                  <Card key={medicine._id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Image
                            src={
                              medicine.thumbnail ||
                              "/placeholder.svg?height=60&width=60"
                            }
                            alt={medicine.name}
                            className="w-15 h-15 rounded-md object-cover flex-shrink-0"
                            width={60}
                            height={60}
                          />
                          <div className="flex-1 min-w-0">
                            <h3
                              className="font-semibold text-blue-900 truncate"
                              title={medicine.name}
                            >
                              {medicine.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Mã: {medicine.code}
                            </p>
                            <p className="text-sm text-gray-600">
                              {medicine.dosageForm}
                            </p>
                          </div>
                          <Badge
                            variant={
                              medicine.quantity > 0 ? "default" : "destructive"
                            }
                            className="bg-blue-100 text-blue-800"
                          >
                            {medicine.quantity}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Hoạt chất:</span>{" "}
                            {medicine.active}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Nhà sản xuất:</span>{" "}
                            {(() => {
                              const manufacturerInfo = getManufacturerInfo(
                                medicine.manufacturer_id
                              );
                              return manufacturerInfo.name;
                            })()}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex-1"
                            onClick={() => handleViewDetails(medicine)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex-1"
                            onClick={() => handleEdit(medicine)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 flex-1"
                            onClick={() => handleDeleteClick(medicine)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredMedicines.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy thuốc nào
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Thử thay đổi từ khóa tìm kiếm hoặc thêm mới thuốc
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t bg-gray-50 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Hiển thị {startIndex + 1} đến{" "}
                    {Math.min(endIndex, filteredMedicines.length)} trong tổng số{" "}
                    {filteredMedicines.length} kết quả
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
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMedicine ? "Cập nhật thuốc" : "Thêm mới thuốc"}
            </DialogTitle>
          </DialogHeader>
          <MedicineForm
            defaultValue={editingMedicine}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa thuốc</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa thuốc &ldquo;{deletingMedicine?.name}
              &rdquo; ? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
