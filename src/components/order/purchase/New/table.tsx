"use client";

import { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import type { IPurchaseOrder } from "@/interface/order/purchase.interface";
import { useDeletePurchaseOrder } from "@/hooks/orders/purchase.hooks";

interface PurchaseOrderTableProps {
  data: IPurchaseOrder[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const statusConfig = {
  Nháp: { label: "Nháp", className: "bg-gray-100 text-gray-800" },
  "Ghi nợ": { label: "Ghi nợ", className: "bg-yellow-100 text-yellow-800" },
  "Đã thanh toán": {
    label: "Đã thanh toán",
    className: "bg-green-100 text-green-800",
  },
};

export function PurchaseOrderTable({
  data,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: PurchaseOrderTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IPurchaseOrder | null>(
    null
  );

  const deleteOrderMutation = useDeletePurchaseOrder();

  const handleDelete = async () => {
    if (!selectedOrder) return;

    try {
      await deleteOrderMutation.mutateAsync(selectedOrder._id);
      setDeleteDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const canEdit = (order: IPurchaseOrder) => {
    return !order.note || order.note === "Nháp" || order.note === "Ghi nợ";
  };

  const canDelete = (order: IPurchaseOrder) => {
    return !order.note || order.note === "Nháp";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Đơn mua hàng ({data.length} đơn)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">
                    Mã đơn
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Nhà cung cấp
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Ngày tạo
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Tổng tiền
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Trạng thái
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 w-[100px]">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      Không có đơn mua hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((order) => (
                    <TableRow key={order._id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-blue-600">
                        <Link
                          href={`/purchase/${order._id}`}
                          className="hover:underline"
                        >
                          {order.orderCode || order._id.slice(-8)}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.supplierName || "Chưa xác định"}
                      </TableCell>
                      <TableCell>
                        {format(new Date(order.date_in), "dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatCurrency(order.totalAmount)}
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`${
                            statusConfig[order.note || "Nháp"]?.className ??
                            "bg-gray-100 text-gray-800"
                          } border-0`}
                        >
                          {statusConfig[order.note || "Nháp"]?.label ?? "Nháp"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/purchase/${order._id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                Xem chi tiết
                              </Link>
                            </DropdownMenuItem>
                            {canEdit(order) && (
                              <DropdownMenuItem asChild>
                                <Link href={`/purchase/${order._id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Chỉnh sửa
                                </Link>
                              </DropdownMenuItem>
                            )}
                            {canDelete(order) && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-red-600 focus:text-red-600"
                                  disabled={deleteOrderMutation.isPending}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Xóa
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-gray-500">
                Trang {currentPage} / {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Trước
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let page: number;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Sau
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa đơn mua hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đơn mua hàng &quot;
              {selectedOrder?.orderCode || selectedOrder?._id.slice(-8)}&quot;?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteOrderMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteOrderMutation.isPending ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
