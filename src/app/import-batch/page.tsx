"use client";

import { useState, useMemo } from "react";
import { Eye, Edit, RefreshCw, Search, Plus, Trash2 } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { IImportBatch } from "@/interface/inventory/import-batch.interface";
import { IMPORT_BATCH_STATUS } from "@/interface/inventory/import-batch.interface";
import {
  useDeleteImportBatch,
  useImportBatch,
  useUpdateImportBatchStatus,
} from "@/hooks/inventory/import-batch.hooks";
import ImportBatchForm from "@/components/inventory/import-batch/import-batch-form";
import { formatPrice } from "@/lib/format-price";
import PageHeader from "@/components/layout/page-header";
type ImportBatchStatus =
  | "expired"
  | "out_of_stock"
  | "discontinued"
  | "in_stock";

export default function ImportBatchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<IImportBatch | undefined>();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingBatch, setDeletingBatch] = useState<
    IImportBatch | undefined
  >();
  const itemsPerPage = 5;

  const { data: batchesData, isLoading, refetch } = useImportBatch();
  const batches = useMemo(() => {
    return batchesData?.data || [];
  }, [batchesData]);

  const updateStatusMutation = useUpdateImportBatchStatus();
  const deleteMutation = useDeleteImportBatch();

  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      const searchLower = searchTerm.toLowerCase();
      const batchNumberMatch =
        batch.batchNumber?.toLowerCase().includes(searchLower) || false;

      // Kiểm tra an toàn cho distributor_id
      const distributorNameMatch =
        batch.distributor_id &&
        typeof batch.distributor_id === "object" &&
        batch.distributor_id.nameCo
          ? batch.distributor_id.nameCo.toLowerCase().includes(searchLower)
          : false;

      return batchNumberMatch || distributorNameMatch;
    });
  }, [batches, searchTerm]);

  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBatches = filteredBatches.slice(startIndex, endIndex);

  const getStatusInfo = (status: string) => {
    return (
      IMPORT_BATCH_STATUS.find((s) => s.value === status) ||
      IMPORT_BATCH_STATUS[0]
    );
  };

  // Kiểm tra xem value có phải là ImportBatchStatus hợp lệ không
  const isValidStatus = (value: string): value is ImportBatchStatus => {
    return ["expired", "out_of_stock", "discontinued", "in_stock"].includes(
      value
    );
  };

  // Xử lý mở form tạo mới
  const handleCreate = () => {
    setEditingBatch(undefined);
    setIsFormOpen(true);
  };

  // Xử lý mở form chỉnh sửa
  const handleEdit = (batch: IImportBatch) => {
    setEditingBatch(batch);
    setIsFormOpen(true);
  };

  // Xử lý xem chi tiết
  const handleViewDetails = (batch: IImportBatch) => {
    console.log("Chi tiết lô hàng:", {
      ...batch,
      distributorName:
        batch.distributor_id && typeof batch.distributor_id === "object"
          ? batch.distributor_id.nameCo || "N/A"
          : batch.distributor_id || "N/A",
      distributorId:
        batch.distributor_id && typeof batch.distributor_id === "object"
          ? batch.distributor_id._id || "N/A"
          : batch.distributor_id || "N/A",
    });
  };

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = (batchId: string, newStatus: string) => {
    // Kiểm tra status hợp lệ trước khi gọi mutation
    if (isValidStatus(newStatus)) {
      updateStatusMutation.mutate(
        { id: batchId, status: newStatus },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  // Xử lý mở dialog xác nhận xóa
  const handleDeleteClick = (batch: IImportBatch) => {
    setDeletingBatch(batch);
    setIsDeleteOpen(true);
  };

  // Xử lý xác nhận xóa
  const handleConfirmDelete = () => {
    if (deletingBatch?._id) {
      deleteMutation.mutate(deletingBatch._id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setDeletingBatch(undefined);
          refetch();
        },
      });
    }
  };

  // Xử lý thành công form (tạo mới hoặc cập nhật)
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingBatch(undefined);
    refetch();
  };

  // Xử lý hủy form
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingBatch(undefined);
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
        title="Quản lý lô hàng nhập"
        subtitle="Danh sách và quản lý các lô hàng nhập kho"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl text-blue-900">
                Danh sách Lô hàng nhập
              </CardTitle>
              <div className="flex flex-col lg:flex-row lg:gap-5 sm:flex-col gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm theo mã lô hàng hoặc tên nhà phân phối..."
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
                  Tạo mới
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
                      Mã lô hàng
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Nhà phân phối
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Ngày nhập
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Hạn sử dụng
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Giá nhập
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Trạng thái
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900 text-center">
                      Hành động
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentBatches.map((batch) => {
                    const statusInfo = getStatusInfo(batch.status);
                    return (
                      <TableRow key={batch._id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {batch.batchNumber}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {batch.distributor_id &&
                              typeof batch.distributor_id === "object"
                                ? batch.distributor_id.nameCo || "N/A"
                                : batch.distributor_id || "N/A"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(batch.importDate), "dd/MM/yyyy", {
                            locale: vi,
                          })}
                        </TableCell>
                        <TableCell>
                          {format(new Date(batch.expiryDate), "dd/MM/yyyy", {
                            locale: vi,
                          })}
                        </TableCell>
                        <TableCell>{formatPrice(batch.importPrice)}</TableCell>
                        <TableCell>
                          <Badge className={`${statusInfo.color} border-0`}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              onClick={() => handleViewDetails(batch)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Xem
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                              onClick={() => handleEdit(batch)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Sửa
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                              onClick={() => handleDeleteClick(batch)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              <div className="space-y-4 p-4">
                {currentBatches.map((batch) => {
                  const statusInfo = getStatusInfo(batch.status);
                  return (
                    <Card key={batch._id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-blue-900">
                                {batch.batchNumber}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {batch.distributor_id &&
                                typeof batch.distributor_id === "object"
                                  ? batch.distributor_id.nameCo || "N/A"
                                  : batch.distributor_id || "N/A"}
                              </p>
                            </div>
                            <Badge className={`${statusInfo.color} border-0`}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Ngày nhập:</span>{" "}
                              {batch.importDate &&
                              !isNaN(new Date(batch.importDate).getTime())
                                ? format(
                                    new Date(batch.importDate),
                                    "dd/MM/yyyy",
                                    { locale: vi }
                                  )
                                : "Không rõ ngày"}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Hạn sử dụng:</span>{" "}
                              {batch.importDate &&
                              !isNaN(new Date(batch.importDate).getTime())
                                ? format(
                                    new Date(batch.importDate),
                                    "dd/MM/yyyy",
                                    { locale: vi }
                                  )
                                : "Không rõ ngày"}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Giá nhập:</span>{" "}
                              {formatPrice(batch.importPrice)}
                            </p>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex-1"
                              onClick={() => handleViewDetails(batch)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Xem
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex-1"
                              onClick={() => handleEdit(batch)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Sửa
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 flex-1"
                              onClick={() => handleDeleteClick(batch)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Xóa
                            </Button>
                          </div>
                          <div className="pt-2">
                            <Select
                              value={batch.status}
                              onValueChange={(value) =>
                                handleUpdateStatus(batch._id, value)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {IMPORT_BATCH_STATUS.map((status) => (
                                  <SelectItem
                                    key={status.value}
                                    value={status.value}
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`w-2 h-2 rounded-full ${
                                          status.color.split(" ")[0]
                                        }`}
                                      />
                                      {status.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Empty State */}
            {filteredBatches.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy lô hàng nào
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Thử thay đổi từ khóa tìm kiếm hoặc tạo mới lô hàng
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t bg-gray-50 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Hiển thị {startIndex + 1} đến{" "}
                    {Math.min(endIndex, filteredBatches.length)} trong tổng số{" "}
                    {filteredBatches.length} kết quả
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
              {editingBatch ? "Cập nhật lô hàng nhập" : "Thêm mới lô hàng nhập"}
            </DialogTitle>
          </DialogHeader>
          <ImportBatchForm
            defaultValue={editingBatch}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa lô hàng nhập</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa lô hàng &ldquo;
              {deletingBatch?.batchNumber}&rdquo;? Hành động này không thể hoàn
              tác.
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
