"use client"

import PurchaseOrderForm from "@/components/order/purchase/purchase-order-form"
import { useRouter } from "next/navigation"

export default function CreatePurchaseOrderPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/purchase")
  }

  const handleCancel = () => {
    router.push("/purchase")
  }

  return <PurchaseOrderForm mode="create" onSuccess={handleSuccess} onCancel={handleCancel} />
}
