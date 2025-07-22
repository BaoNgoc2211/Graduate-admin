"use client";

import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { IPurchaseOrderPayload } from "@/interface/order/purchase.interface";
import {
  usePurchaseOrderById,
  useUpdatePurchaseOrder,
} from "@/hooks/order/purchase.hooks";
import { PurchaseOrderForm } from "@/components/order/purchase/New/form";

export default function EditPurchaseOrderPage() {
  const router = useRouter();
  const { data: orderData, isLoading } = usePurchaseOrderById();
  const updateOrderMutation = useUpdatePurchaseOrder();

  const order = orderData?.data;

  const handleSubmit = async (data: IPurchaseOrderPayload) => {
    if (!order) return;

    try {
      await updateOrderMutation.mutateAsync({ id: order._id, data });
      router.push(`/purchase/${order._id}`);
    } catch (error) {
      console.error("Error updating purchase order:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Không tìm thấy đơn mua hàng
            </h1>
            <p className="text-gray-600 mt-2">
              Đơn mua hàng bạn đang chỉnh sửa không tồn tại.
            </p>
            <Button asChild className="mt-4">
              <Link href="/purchase">Quay lại danh sách đơn hàng</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Check if order can be edited
  // if (order.status && order.status !== "Ghi nợ" && order.status !== "Đã thanh toán") {
    if (order.note && order.note !== "Đã thanh toán") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Không thể chỉnh sửa đơn mua hàng
            </h1>
            <p className="text-gray-600 mt-2">
              Đơn mua hàng này không thể chỉnh sửa vì trạng thái hiện tại là
              &quot;{order.note}&quot;.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Chỉ có thể chỉnh sửa đơn ở trạng thái nháp hoặc ghi nợ.
            </p>
            <Button asChild className="mt-4">
              <Link href={`/purchase/${order._id}`}>
                Xem chi tiết đơn hàng
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PurchaseOrderForm
          defaultValues={order}
          onSubmit={handleSubmit}
          isLoading={updateOrderMutation.isPending}
          submitLabel="Cập nhật đơn mua hàng"
        />
      </div>
    </div>
  );
}
