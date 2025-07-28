"use client";

import {
  ArrowLeft,
  CreditCard,
  Package,
  User,
  Phone,
  MapPin,
  Truck,
  Calculator,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format-price";
import Image from "next/image";

interface OrderReviewComponentProps {
  orderReview: IOrderReview;
  onBack: () => void;
  onPlaceOrder: () => void;
  isLoading: boolean;
}

export default function OrderReviewComponent({
  orderReview,
  onBack,
  onPlaceOrder,
  isLoading,
}: OrderReviewComponentProps) {
  const {
    orderItemsReview,
    totalAmount,
    shippingPrice,
    finalAmount,
    shippingMethod,
    userInfo,
  } = orderReview;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">
                Xem trước đơn hàng
              </h1>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Chi tiết đơn hàng ({orderItemsReview.length} sản phẩm)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItemsReview.map((item, index) => (
                    <div
                      key={`${item.medicine_id}-${index}`}
                      className="flex items-start space-x-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={
                          item.thumbnail ||
                          "/placeholder.svg?height=80&width=80"
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border"
                        width={20}
                        height={20}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{item.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          ID: {item.medicine_id}
                        </p>
                        {item.note && (
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Ghi chú:</span>{" "}
                            {item.note}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-blue-900">
                              {formatPrice(item.price)}
                            </span>
                            <Badge variant="secondary" className="bg-gray-100">
                              x{item.quantity}
                            </Badge>
                          </div>
                          <span className="text-xl font-bold text-green-600">
                            {formatPrice(item.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Thông tin người nhận
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Họ và tên</p>
                      <p className="font-medium">{userInfo.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-medium">{userInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                      <p className="font-medium">{userInfo.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Shipping Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Truck className="h-5 w-5 mr-2" />
                    Phương thức vận chuyển
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">
                      {shippingMethod}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Phí vận chuyển: {formatPrice(shippingPrice)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Calculator className="h-5 w-5 mr-2" />
                    Tóm tắt thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tổng tiền hàng:</span>
                      <span className="font-medium">
                        {formatPrice(totalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span className="font-medium">
                        {formatPrice(shippingPrice)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        Tổng thanh toán:
                      </span>
                      <span className="text-2xl font-bold text-blue-900">
                        {formatPrice(finalAmount)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Place Order Button */}
              <Button
                onClick={onPlaceOrder}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang đặt hàng...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Xác nhận đặt hàng
                  </>
                )}
              </Button>

              {/* Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Lưu ý:</span> Sau khi đặt hàng
                  thành công, bạn sẽ nhận được email xác nhận và có thể theo dõi
                  đơn hàng trong mục &quot;Đơn hàng của tôi&quot;.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
