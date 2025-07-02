"use client";

import { useState } from "react";
import {
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  FileText,
  Edit,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type IOrder,
  ORDER_STATUS_OPTIONS,
} from "@/interface/order/order.interface";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import OrderStatusBadge from "./order-status-badge";
import { useOrderById, useUpdateOrderStatus } from "@/hooks/order/order.hooks";

interface OrderDetailDrawerProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailDrawer({
  orderId,
  isOpen,
  onClose,
}: OrderDetailDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState<IOrder["status"]>();
  const [notes, setNotes] = useState("");

  const { data: order, isLoading, error } = useOrderById(orderId || "");
  const updateStatusMutation = useUpdateOrderStatus();

  const handleUpdateStatus = () => {
    if (orderId && newStatus) {
      updateStatusMutation.mutate(
        { orderId, status: newStatus, notes },
        {
          onSuccess: () => {
            setIsEditing(false);
            setNewStatus(undefined);
            setNotes("");
          },
        }
      );
    }
  };

  const getAvailableStatuses = (currentStatus: IOrder["status"]) => {
    const statusOrder = [
      "Pending Confirmation",
      "Awaiting Shipment",
      "Shipping",
      "Completed",
    ];
    const currentIndex = statusOrder.indexOf(currentStatus);

    if (currentIndex === -1) return [];

    return statusOrder.slice(currentIndex + 1).concat(["Cancelled"]);
  };

  if (!isOpen || !orderId) return null;

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            <span className="ml-3 text-gray-600">
              Đang tải chi tiết đơn hàng...
            </span>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (error || !order) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-2xl">
          <div className="flex flex-col items-center justify-center h-full">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không thể tải chi tiết đơn hàng
            </h3>
            <p className="text-gray-500 mb-4">
              {error?.message || "Có lỗi xảy ra"}
            </p>
            <Button onClick={onClose}>Đóng</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl font-bold text-blue-900">
                Chi tiết đơn hàng #{order._id}
              </SheetTitle>
              <SheetDescription className="mt-1">
                Đặt hàng lúc{" "}
                {format(new Date(order.orderDate), "HH:mm dd/MM/yyyy", {
                  locale: vi,
                })}
              </SheetDescription>
            </div>
            <div className="flex items-center space-x-2">
              <OrderStatusBadge status={order.status} />
              {!isEditing &&
                order.status !== "Completed" &&
                order.status !== "Cancelled" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="bg-transparent"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Cập nhật
                  </Button>
                )}
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Status Update Section */}
          {isEditing && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-900">
                  Cập nhật trạng thái đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Trạng thái mới</Label>
                  <Select
                    value={newStatus}
                    onValueChange={(value) =>
                      setNewStatus(value as IOrder["status"])
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Chọn trạng thái mới" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableStatuses(order.status).map((status) => {
                        const statusOption = ORDER_STATUS_OPTIONS.find(
                          (opt) => opt.value === status
                        );
                        return (
                          <SelectItem key={status} value={status}>
                            {statusOption?.label || status}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Nhập ghi chú về việc cập nhật trạng thái..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleUpdateStatus}
                    disabled={!newStatus || updateStatusMutation.isPending}
                    className="bg-blue-900 hover:bg-blue-800"
                  >
                    {updateStatusMutation.isPending
                      ? "Đang cập nhật..."
                      : "Cập nhật trạng thái"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setNewStatus(undefined);
                      setNotes("");
                    }}
                  >
                    Hủy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Customer Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <User className="h-5 w-5 mr-2 text-blue-900" />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-900">
                    {order.user_id.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.user_id.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.user_id.email}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Số điện thoại:</span>
                      <p className="font-medium">{order.user_id.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Địa chỉ:</span>
                      <p className="font-medium">{order.user_id.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <MapPin className="h-5 w-5 mr-2 text-blue-900" />
                Thông tin giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Người nhận:</span>
                  <p className="font-medium">{order.shippingAddress.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Số điện thoại:</span>
                  <p className="font-medium">{order.shippingAddress.phone}</p>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  Địa chỉ giao hàng:
                </span>
                <p className="font-medium">
                  {order.shippingAddress.address}, {order.shippingAddress.ward},{" "}
                  {order.shippingAddress.district}, {order.shippingAddress.city}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">
                    Phương thức vận chuyển:
                  </span>
                  <p className="font-medium">{order.shippingMethod}</p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <span className="text-sm text-gray-500">Mã vận đơn:</span>
                    <p className="font-medium text-blue-900">
                      {order.trackingNumber}
                    </p>
                  </div>
                )}
              </div>
              {order.estimatedDelivery && (
                <div>
                  <span className="text-sm text-gray-500">
                    Dự kiến giao hàng:
                  </span>
                  <p className="font-medium">
                    {format(
                      new Date(order.estimatedDelivery),
                      "HH:mm dd/MM/yyyy",
                      { locale: vi }
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Package className="h-5 w-5 mr-2 text-blue-900" />
                Sản phẩm đã đặt ({order.orderItems.length} sản phẩm)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={item._id}>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={item.medicine_id.thumbnail || "/placeholder.svg"}
                          alt={item.medicine_id.name}
                          className="w-full h-full object-cover"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {item.medicine_id.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Mã: {item.medicine_id.code} •{" "}
                              {item.medicine_id.dosageForm}
                            </p>
                            {item.note && (
                              <p className="text-sm text-blue-600 mt-1">
                                <FileText className="h-3 w-3 inline mr-1" />
                                {item.note}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {item.totalAmount.toLocaleString("vi-VN")}đ
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.price.toLocaleString("vi-VN")}đ ×{" "}
                              {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < order.orderItems.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <CreditCard className="h-5 w-5 mr-2 text-blue-900" />
                Thông tin thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">
                    {order.totalAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">
                    {order.shippingFee.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span className="font-medium">
                      -{order.discount.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-900">
                    {order.finalAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    Phương thức thanh toán:
                  </span>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2 text-blue-900" />
                Lịch sử đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Đơn hàng được tạo</p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(order.createdAt), "HH:mm dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </p>
                  </div>
                </div>

                {order.status !== "Pending Confirmation" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-900 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Đơn hàng được cập nhật</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(order.updatedAt), "HH:mm dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {order.deliveredDate && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-green-600">
                        Đơn hàng đã được giao
                      </p>
                      <p className="text-sm text-gray-600">
                        {format(
                          new Date(order.deliveredDate),
                          "HH:mm dd/MM/yyyy",
                          { locale: vi }
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {order.cancelledDate && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-red-600">
                        Đơn hàng đã bị hủy
                      </p>
                      <p className="text-sm text-gray-600">
                        {format(
                          new Date(order.cancelledDate),
                          "HH:mm dd/MM/yyyy",
                          { locale: vi }
                        )}
                      </p>
                      {order.cancelReason && (
                        <p className="text-sm text-red-600 mt-1">
                          Lý do: {order.cancelReason}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2 text-blue-900" />
                  Ghi chú
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
