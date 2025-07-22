"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, FileText, Package, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useDeletePurchaseOrder,
  useMedicines,
  usePurchaseOrderById,
} from "@/hooks/order/purchase.hooks";
import { IPurchaseOrder } from "@/interface/order/purchase.interface";

export default function PurchaseOrderDetailPage() {
  const { data: orderData, isLoading } = usePurchaseOrderById();
  const deleteOrderMutation = useDeletePurchaseOrder();
  const { data: medicinesData } = useMedicines();

  const order = orderData?.data;
  const medicines = medicinesData?.data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };


  const canEdit = (order: IPurchaseOrder) => {
    const note = order.note?.toLowerCase() || "";
    return note === "nháp" || note === "ghi nợ";
  };

  const canDelete = (order: IPurchaseOrder) => {
    const note = order.note?.toLowerCase() || "";
    return note === "nháp";
  };

  const handleDelete = async () => {
    if (!order) return;

    try {
      await deleteOrderMutation.mutateAsync(order._id);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getMedicineName = (medicineId: string) => {
    const medicine = medicines.find((m) => m._id === medicineId);
    return medicine?.name || "Không xác định";
  };

  const getMedicineInfo = (medicineId: string) => {
    const medicine = medicines.find((m) => m._id === medicineId);
    return medicine ? `${medicine.code} • ${medicine.unit}` : "N/A";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Không tìm thấy đơn mua hàng
            </h1>
            <p className="text-gray-600 mt-2">
              Đơn mua hàng bạn đang tìm không tồn tại.
            </p>
            <Button asChild className="mt-4">
              <Link href="/purchase">Quay lại danh sách đơn hàng</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Đơn mua hàng {order.orderCode || order._id.slice(-8)}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Xem chi tiết đơn mua hàng
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {canEdit(order) && (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/purchase/${order._id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Link>
                </Button>
              )}
              {canDelete(order) && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Xác nhận xóa đơn mua hàng
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa đơn mua hàng &quot;{" "}
                        {order.orderCode || order._id.slice(-8)} &quot; ? Hành
                        động này không thể hoàn tác.
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
              )}
            </div>
          </div>

          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Ngày tạo đơn:
                    </span>
                    <p className="text-sm">
                      {format(new Date(order.date_in), "dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </p>
                  </div>
                </div>
                {order.expectedDeliveryDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Ngày giao dự kiến:
                      </span>
                      <p className="text-sm">
                        {format(
                          new Date(order.expectedDeliveryDate),
                          "dd/MM/yyyy",
                          { locale: vi }
                        )}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Nhà cung cấp:
                    </span>
                    <p className="text-sm font-medium">
                      {order.supplierName || "Chưa xác định"}
                    </p>
                    {order.supplierCode && (
                      <p className="text-xs text-gray-500">
                        {order.supplierCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {order.createdBy && (
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Người tạo:
                      </span>
                      <p className="text-sm">{order.createdBy}</p>
                    </div>
                  </div>
                )}
                {order.createdAt && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Thời gian tạo:
                      </span>
                      <p className="text-sm">
                        {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                          locale: vi,
                        })}
                      </p>
                    </div>
                  </div>
                )}
                {order.approvedBy && (
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        Người duyệt:
                      </span>
                      <p className="text-sm">{order.approvedBy}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Danh sách thuốc ({order.medicines.length} loại)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.medicines.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="border rounded-lg p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-blue-900">
                          {getMedicineName(item.medicine_id)}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {getMedicineInfo(item.medicine_id)}
                        </p>
                        {item.batch_id && (
                          <p className="text-sm text-gray-500">
                            Lô: {item.batch_id}
                          </p>
                        )}
                        {item.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            <FileText className="h-3 w-3 inline mr-1" />
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Số lượng
                        </p>
                        <p className="text-lg font-semibold text-blue-900">
                          {item.quantity}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Đơn giá
                        </p>
                        <p className="text-sm">{formatCurrency(item.price)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          CK / VAT
                        </p>
                        <p className="text-sm">
                          {item.CK_Rate}% / {item.VAT_Rate}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Thành tiền
                        </p>
                        <p className="text-lg font-semibold text-green-600">
                          {formatCurrency(
                            item.quantity *
                              item.price *
                              (1 + (item.CK_Rate || 0) / 100) *
                              (1 + (item.VAT_Rate || 0) / 100)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Tổng tiền</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {order.note && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ghi chú</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{order.note}</p>
              </CardContent>
            </Card>
          )}

          {/* Rejection Reason */}
          {order.note === "Đã thanh toán" && order.rejectionReason && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg text-red-800">
                  Lý do từ chối
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700">{order.rejectionReason}</p>
                {order.rejectedBy && (
                  <p className="text-xs text-red-600 mt-2">
                    Từ chối bởi {order.rejectedBy} vào{" "}
                    {order.rejectedAt &&
                      format(new Date(order.rejectedAt), "dd/MM/yyyy HH:mm", {
                        locale: vi,
                      })}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
