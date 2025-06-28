"use client";

import { useState, useMemo } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  Package,
  FileText,
} from "lucide-react";
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
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { IPurchaseOrder } from "@/interface/order/purchase.interface";
import {
  useDeletePurchaseOrder,
  usePurchaseOrders,
} from "@/hooks/order/purchase.hooks";
import { formatPrice } from "@/lib/format-price";

export default function PurchaseOrderListPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState<
    IPurchaseOrder | undefined
  >();
  const itemsPerPage = 10;

  // Lấy dữ liệu
  const { data: ordersData, isLoading, refetch } = usePurchaseOrders();
  const orders = ordersData?.data || [];

  // Hook xóa
  const deleteMutation = useDeletePurchaseOrder();

  // Lọc và phân trang
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order._id?.toLowerCase().includes(searchLower) ||
        order.note?.toLowerCase().includes(searchLower) ||
        format(new Date(order.date_in), "dd/MM/yyyy").includes(searchLower)
      );
    });
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Handlers
  const handleCreate = () => router.push("/purchase/create");
  const handleEdit = (order: IPurchaseOrder) =>
    router.push(`/purchase/edit/${order._id}`);
  const handleView = (order: IPurchaseOrder) => {
    console.log("Xem chi tiết:", order);
    // TODO: Implement view details
  };

  const handleDeleteClick = (order: IPurchaseOrder) => {
    setDeletingOrder(order);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingOrder?._id) {
      deleteMutation.mutate(deletingOrder._id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setDeletingOrder(undefined);
          refetch();
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">
                Quản lý phiếu nhập hàng
              </h1>
            </div>
            <Button
              onClick={handleCreate}
              className="bg-blue-900 hover:bg-blue-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo phiếu mới
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="bg-blue-50 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-blue-900 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Danh sách phiếu nhập hàng
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo mã phiếu, ghi chú hoặc ngày..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
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
                      Mã phiếu
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Ngày nhập
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Số loại thuốc
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Tổng tiền
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Ghi chú
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Ngày tạo
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900 text-center">
                      Hành động
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrders.map((order) => (
                    <TableRow key={order._id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{order._id}</TableCell>
                      <TableCell>
                        {/* {format(new Date(order.date_in), "dd/MM/yyyy", {
                          locale: vi,
                        })} */}
                        {order.date_in &&
                        !isNaN(new Date(order.date_in).getTime())
                          ? format(new Date(order.date_in), "dd/MM/yyyy", {
                              locale: vi,
                            })
                          : "Không rõ"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {order.medicines?.length || 0} loại
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatPrice(order.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={order.note}>
                          {order.note || "Không có ghi chú"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.createdAt
                          ? format(
                              new Date(order.createdAt),
                              "dd/MM/yyyy HH:mm",
                              { locale: vi }
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            onClick={() => handleView(order)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                            onClick={() => handleEdit(order)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            onClick={() => handleDeleteClick(order)}
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
                {currentOrders.map((order) => (
                  <Card key={order._id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-blue-900">
                              Mã: {order._id}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Ngày:{" "}
                              {/* {format(new Date(order.date_in), "dd/MM/yyyy", {
                                locale: vi,
                              })} */}
                              {order.date_in &&
                              !isNaN(new Date(order.date_in).getTime())
                                ? format(
                                    new Date(order.date_in),
                                    "dd/MM/yyyy",
                                    { locale: vi }
                                  )
                                : "Không rõ"}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800"
                          >
                            {order.medicines?.length || 0} loại
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Tổng tiền:</span>{" "}
                            <span className="text-green-600 font-medium">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Ghi chú:</span>{" "}
                            {order.note || "Không có ghi chú"}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex-1"
                            onClick={() => handleView(order)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex-1"
                            onClick={() => handleEdit(order)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 flex-1"
                            onClick={() => handleDeleteClick(order)}
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
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Không tìm thấy phiếu nhập hàng nào
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Thử thay đổi từ khóa tìm kiếm hoặc tạo phiếu nhập hàng mới
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t bg-gray-50 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Hiển thị {startIndex + 1} đến{" "}
                    {Math.min(endIndex, filteredOrders.length)} trong tổng số{" "}
                    {filteredOrders.length} kết quả
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa phiếu nhập hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa phiếu nhập hàng &ldquo;
              {deletingOrder?._id}&rdquo;? Hành động này không thể hoàn tác.
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
