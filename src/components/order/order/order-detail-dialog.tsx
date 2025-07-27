"use client";

import {
  X,
  Package,
  User,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Calendar,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderById } from "@/hooks/orders/order.-2hooks";
import { ORDER_STATUSES } from "@/interface/order/order-management.interface";
import Image from "next/image";
// import { useOrderById } from "@/hooks/useOrderManagement"
// import { ORDER_STATUSES } from "@/interface/order/order-management.interface"

interface OrderDetailsDialogProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsDialog({
  orderId,
  isOpen,
  onClose,
}: OrderDetailsDialogProps) {
  const { data: order, isLoading, error } = useOrderById(orderId || "");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleTrackOrder = () => {
    if (order?.trackingNumber) {
      // In production, this would open tracking page or external tracking site
      window.open(
        `https://tracking.example.com/${order.trackingNumber}`,
        "_blank"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-blue-900" />
            <span>Chi tiết đơn hàng #{orderId}</span>
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
            <span className="ml-3 text-gray-600">
              ��ang tải thông tin đơn hàng...
            </span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">
              Không thể tải thông tin đơn hàng
            </p>
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </div>
        )}

        {order && (
          <div className="space-y-6">
            {/* Order Status & Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Thông tin đơn hàng
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Đặt hàng: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      ORDER_STATUSES.find((s) => s.value === order.status)
                        ?.color
                    } border-0 font-medium`}
                  >
                    {
                      ORDER_STATUSES.find((s) => s.value === order.status)
                        ?.label
                    }
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Thanh toán:</span>
                      <span className="font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Vận chuyển:</span>
                      <span className="font-medium">
                        {order.shippingMethod}
                      </span>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-800 font-medium">
                        Mã vận đơn: {order.trackingNumber}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Thông tin người nhận
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">
                      {order.shippingAddress.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <p>{order.shippingAddress.address}</p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.ward},{" "}
                        {order.shippingAddress.district},{" "}
                        {order.shippingAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Sản phẩm đã đặt ({order.orderItems.length} sản phẩm)
                </h3>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start space-x-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={item.medicine_id.thumbnail || "/placeholder.svg"}
                        alt={item.medicine_id.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                        width={20}
                        height={20}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.medicine_id.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Mã: {item.medicine_id.code}
                        </p>
                        <p className="text-sm text-gray-500">
                          Dạng: {item.medicine_id.dosageForm}
                        </p>
                        {item.note && (
                          <p className="text-sm text-blue-600 mt-1">
                            Ghi chú: {item.note}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(item.price)}
                        </p>
                        <p className="text-sm text-gray-500">
                          x{item.quantity}
                        </p>
                        <p className="font-semibold text-green-600 mt-1">
                          {formatCurrency(item.totalAmount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tóm tắt đơn hàng
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền hàng:</span>
                    <span className="font-medium">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-blue-600">
                      {order.shippingFee === 0
                        ? "Miễn phí"
                        : formatCurrency(order.shippingFee)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="font-medium text-green-600">
                        -{formatCurrency(order.discount)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      Tổng thanh toán:
                    </span>
                    <span className="text-2xl font-bold text-blue-900">
                      {formatCurrency(order.finalAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Đóng
              </Button>
              {order.trackingNumber && (
                <Button
                  onClick={handleTrackOrder}
                  className="flex-1 bg-blue-900 hover:bg-blue-800"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Theo dõi đơn hàng
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
