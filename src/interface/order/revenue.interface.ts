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

export interface IOrderFilters {
  status?: string
  dateFrom?: string
  dateTo?: string
  search?: string
  paymentMethod?: string
  shippingMethod?: string
}

export interface IRevenueStats {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  revenueGrowth: number
  ordersGrowth: number
  dailyRevenue: Array<{
    date: string
    revenue: number
    orders: number
  }>
  weeklyRevenue: Array<{
    week: string
    revenue: number
    orders: number
  }>
  monthlyRevenue: Array<{
    month: string
    revenue: number
    orders: number
  }>
  topProducts: Array<{
    _id: string
    name: string
    code: string
    thumbnail: string
    totalSold: number
    revenue: number
  }>
  statusDistribution: Array<{
    status: string
    count: number
    percentage: number
  }>
}

export const ORDER_STATUS_OPTIONS = [
  { value: "Pending Confirmation", label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
  { value: "Awaiting Shipment", label: "Chờ giao hàng", color: "bg-blue-100 text-blue-800" },
  { value: "Shipping", label: "Đang giao", color: "bg-purple-100 text-purple-800" },
  { value: "Completed", label: "Hoàn thành", color: "bg-green-100 text-green-800" },
  { value: "Cancelled", label: "Đã hủy", color: "bg-red-100 text-red-800" },
]

export const PAYMENT_METHODS = [
  { value: "COD", label: "Thanh toán khi nhận hàng" },
  { value: "Bank Transfer", label: "Chuyển khoản ngân hàng" },
  { value: "Credit Card", label: "Thẻ tín dụng" },
  { value: "E-Wallet", label: "Ví điện tử" },
]

export const SHIPPING_METHODS = [
  { value: "Standard", label: "Giao hàng tiêu chuẩn" },
  { value: "Express", label: "Giao hàng nhanh" },
  { value: "Same Day", label: "Giao trong ngày" },
  { value: "Pickup", label: "Nhận tại cửa hàng" },
]
