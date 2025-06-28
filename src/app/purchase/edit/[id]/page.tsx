"use client";
import PurchaseOrderForm from "@/components/order/purchase/purchase-order-form";
import { usePurchaseOrderById } from "@/hooks/order/purchase.hooks";
import { useRouter, useParams } from "next/navigation";

export default function EditPurchaseOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const { data: orderData, isLoading, error } = usePurchaseOrderById(orderId);
  const order = orderData?.data;

  const handleSuccess = () => {
    // Delay để admin thấy toast success
    setTimeout(() => {
      router.push("/purchase");
    }, 1500);
  };

  const handleCancel = () => {
    router.push("/purchase");
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

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Không tìm thấy phiếu nhập hàng</p>
          <button
            onClick={() => router.push("/purchase")}
            className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <PurchaseOrderForm
      mode="edit"
      defaultValue={order}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
