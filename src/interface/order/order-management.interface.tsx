export interface IOrderItem {
  _id: string
  medicine_id: {
    _id: string
    name: string
    code: string
    thumbnail: string
    dosageForm: string
  }
  stock_id: {
    _id: string
    sellingPrice: number
  }
  quantity: number
  price: number
  totalAmount: number
  note?: string
}

export interface IOrder {
  _id: string
  user_id: {
    _id: string
    name: string
    email: string
    phone: string
    address: string
  }
  orderItems: IOrderItem[]
  totalAmount: number
  shippingFee: number
  discount: number
  finalAmount: number
  status: "Pending Confirmation" | "Awaiting Shipment" | "Shipping" | "Completed" | "Cancelled"
  paymentMethod: string
  shippingMethod: string
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
    district: string
    ward: string
  }
  orderDate: string
  estimatedDelivery?: string
  deliveredDate?: string
  cancelledDate?: string
  cancelReason?: string
  trackingNumber?: string
  isReviewed?: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface IOrderStats {
  total: number
  pending: number
  awaiting: number
  shipping: number
  completed: number
  cancelled: number
}

export type OrderStatus = "Pending Confirmation" | "Awaiting Shipment" | "Shipping" | "Completed" | "Cancelled"

export const ORDER_STATUSES: { value: OrderStatus; label: string; color: string }[] = [
  { value: "Pending Confirmation", label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
  { value: "Awaiting Shipment", label: "Chờ giao hàng", color: "bg-blue-100 text-blue-800" },
  { value: "Shipping", label: "Đang giao", color: "bg-purple-100 text-purple-800" },
  { value: "Completed", label: "Hoàn thành", color: "bg-green-100 text-green-800" },
  { value: "Cancelled", label: "Đã hủy", color: "bg-red-100 text-red-800" },
]
