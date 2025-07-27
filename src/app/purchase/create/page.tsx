"use client";

import type { IPurchaseOrderPayload } from "@/interface/order/purchase.interface";
import { useCreatePurchaseOrder } from "@/hooks/orders/purchase.hooks";
import { PurchaseOrderForm } from "@/components/order/purchase/New/form";

export default function CreatePurchaseOrderPage() {
  const createOrderMutation = useCreatePurchaseOrder();

  const handleSubmit = async (data: IPurchaseOrderPayload) => {
    try {
      await createOrderMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error creating purchase order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PurchaseOrderForm
          onSubmit={handleSubmit}
          isLoading={createOrderMutation.isPending}
          submitLabel="Tạo đơn mua hàng"
        />
      </div>
    </div>
  );
}
