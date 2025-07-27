// import { IMedicine } from "../../interface/medicine/medicine.interface";
// import APIConfig from "../api.config";
// // Lấy tất cả đơn hơn
// export const getAllOrderAPI = async (): Promise<{ data: IMedicine[] }> => {
//   const response = await APIConfig.get(`/api/medicine/`);
//   return response.data as Promise<{ data: IMedicine[] }>;
// };
// // Lấy chi tiết đơn hàng
// export const getByIdOrderAPI = async (
//   id: string
// ): Promise<{ data: IMedicine }> => {
//   try {
//     const res = await APIConfig.get<{ data: IMedicine }>(`/api/medicine/${id}`);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching medicine:", error);
//     throw error;
//   }
// };
// export const createOrderAPI = async (
//   medicine: IMedicine
// ): Promise<{ data: IMedicine }> => {
//   const response = await APIConfig.post(`/api/medicine/`, medicine);
//   return response.data as Promise<{ data: IMedicine }>;
// };
// // Cập nhật trạng thái đơn hàng từng đơn hàng 
// export const updateOrderAPI = async (
//   id: string,
//   medicine: IMedicine
// ): Promise<{ data: IMedicine }> => {
//   const response = await APIConfig.put(`/api/medicine/${id}`, medicine);
//   return response.data as Promise<{ data: IMedicine }>;
// };
// // Hủy đơn hàng ở giai đoạn chờ xác nhận 
// export const deleteOrderAPI = async (
//   id: string
// ): Promise<{ data: IMedicine }> => {
//   const response = await APIConfig.delete(`/api/medicine/${id}`);
//   return response.data as Promise<{ data: IMedicine }>;
// };
// // Tìm kiếm Mã đơn, khách tạo, ngày tạo 
// //Báo cáo doanh số theo: Thời gian (ngày, tuần, tháng)
// // Trạng thái đơn hàng theo (ngày, tuần, tháng)
// // Biểu đồ: doanh thu, số lượng đơn, trung bình giá trị đơn hàng
import APIConfig from "../api.config"
import type {
  ICheckoutPayload,
  IOrderReview,
  IOrder,
  IOrderStats,
  IOrderFilters,
  IRevenueStats,
} from "@/interface/order/order.interface"


// Mock data for demonstration
const MOCK_ORDERS: IOrder[] = [
  {
    _id: "ORD001",
    user_id: {
      _id: "USER001",
      name: "Nguyễn Văn An",
      email: "nguyenvanan@email.com",
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM001",
        medicine_id: {
          _id: "MED001",
          name: "Paracetamol 500mg",
          code: "PAR500",
          thumbnail: "/placeholder.svg?height=60&width=60",
          dosageForm: "Viên nén",
        },
        stock_id: {
          _id: "STOCK001",
          sellingPrice: 25000,
        },
        quantity: 2,
        price: 25000,
        totalAmount: 50000,
        note: "Uống sau ăn",
      },
      {
        _id: "ITEM002",
        medicine_id: {
          _id: "MED002",
          name: "Vitamin C 1000mg",
          code: "VTC1000",
          thumbnail: "/placeholder.svg?height=60&width=60",
          dosageForm: "Viên sủi",
        },
        stock_id: {
          _id: "STOCK002",
          sellingPrice: 150000,
        },
        quantity: 1,
        price: 150000,
        totalAmount: 150000,
      },
    ],
    totalAmount: 200000,
    shippingFee: 30000,
    discount: 20000,
    finalAmount: 210000,
    status: "Pending Confirmation",
    paymentMethod: "COD",
    shippingMethod: "Standard",
    shippingAddress: {
      name: "Nguyễn Văn An",
      phone: "0901234567",
      address: "456 Đường XYZ",
      city: "TP.HCM",
      district: "Quận 3",
      ward: "Phường 5",
    },
    orderDate: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-18T17:00:00Z",
    trackingNumber: "TN001234567",
    isReviewed: false,
    notes: "Giao hàng trong giờ hành chính",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "ORD002",
    user_id: {
      _id: "USER002",
      name: "Trần Thị Bình",
      email: "tranthibinh@email.com",
      phone: "0912345678",
      address: "789 Đường DEF, Quận 2, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM003",
        medicine_id: {
          _id: "MED003",
          name: "Amoxicillin 250mg",
          code: "AMX250",
          thumbnail: "/placeholder.svg?height=60&width=60",
          dosageForm: "Viên nang",
        },
        stock_id: {
          _id: "STOCK003",
          sellingPrice: 45000,
        },
        quantity: 3,
        price: 45000,
        totalAmount: 135000,
        note: "Uống đúng liều",
      },
    ],
    totalAmount: 135000,
    shippingFee: 25000,
    discount: 0,
    finalAmount: 160000,
    status: "Shipping",
    paymentMethod: "Bank Transfer",
    shippingMethod: "Express",
    shippingAddress: {
      name: "Trần Thị Bình",
      phone: "0912345678",
      address: "789 Đường DEF",
      city: "TP.HCM",
      district: "Quận 2",
      ward: "Phường 1",
    },
    orderDate: "2024-01-14T14:20:00Z",
    estimatedDelivery: "2024-01-16T16:00:00Z",
    trackingNumber: "TN001234568",
    isReviewed: false,
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    _id: "ORD003",
    user_id: {
      _id: "USER003",
      name: "Lê Văn Cường",
      email: "levancuong@email.com",
      phone: "0923456789",
      address: "321 Đường GHI, Quận 7, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM004",
        medicine_id: {
          _id: "MED004",
          name: "Ibuprofen 400mg",
          code: "IBU400",
          thumbnail: "/placeholder.svg?height=60&width=60",
          dosageForm: "Viên nén",
        },
        stock_id: {
          _id: "STOCK004",
          sellingPrice: 35000,
        },
        quantity: 2,
        price: 35000,
        totalAmount: 70000,
      },
      {
        _id: "ITEM005",
        medicine_id: {
          _id: "MED005",
          name: "Omeprazole 20mg",
          code: "OME20",
          thumbnail: "/placeholder.svg?height=60&width=60",
          dosageForm: "Viên nang",
        },
        stock_id: {
          _id: "STOCK005",
          sellingPrice: 80000,
        },
        quantity: 1,
        price: 80000,
        totalAmount: 80000,
      },
    ],
    totalAmount: 150000,
    shippingFee: 30000,
    discount: 15000,
    finalAmount: 165000,
    status: "Completed",
    paymentMethod: "Credit Card",
    shippingMethod: "Standard",
    shippingAddress: {
      name: "Lê Văn Cường",
      phone: "0923456789",
      address: "321 Đường GHI",
      city: "TP.HCM",
      district: "Quận 7",
      ward: "Phường 3",
    },
    orderDate: "2024-01-12T09:45:00Z",
    estimatedDelivery: "2024-01-15T17:00:00Z",
    deliveredDate: "2024-01-15T15:30:00Z",
    trackingNumber: "TN001234569",
    isReviewed: true,
    createdAt: "2024-01-12T09:45:00Z",
    updatedAt: "2024-01-15T15:30:00Z",
  },
  {
    _id: "ORD004",
    user_id: {
      _id: "USER004",
      name: "Phạm Thị Dung",
      email: "phamthidung@email.com",
      phone: "0934567890",
      address: "654 Đường JKL, Quận 5, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM006",
        medicine_id: {
          _id: "MED006",
          name: "Cetirizine 10mg",
          code: "CET10",
          thumbnail: "/placeholder.svg?height=60&width=60",
          dosageForm: "Viên nén",
        },
        stock_id: {
          _id: "STOCK006",
          sellingPrice: 55000,
        },
        quantity: 1,
        price: 55000,
        totalAmount: 55000,
      },
    ],
    totalAmount: 55000,
    shippingFee: 25000,
    discount: 5000,
    finalAmount: 75000,
    status: "Cancelled",
    paymentMethod: "COD",
    shippingMethod: "Standard",
    shippingAddress: {
      name: "Phạm Thị Dung",
      phone: "0934567890",
      address: "654 Đường JKL",
      city: "TP.HCM",
      district: "Quận 5",
      ward: "Phường 8",
    },
    orderDate: "2024-01-13T16:15:00Z",
    cancelledDate: "2024-01-14T10:00:00Z",
    cancelReason: "Khách hàng thay đổi ý định",
    trackingNumber: "TN001234570",
    isReviewed: false,
    createdAt: "2024-01-13T16:15:00Z",
    updatedAt: "2024-01-14T10:00:00Z",
  },
  {
    _id: "ORD005",
    user_id: {
      _id: "USER005",
      name: "Hoàng Văn Em",
      email: "hoangvanem@email.com",
      phone: "0945678901",
      address: "987 Đường MNO, Quận 10, TP.HCM",
    },
    orderItems: [
      {
        _id: "ITEM007",
        medicine_id: {
          _id: "MED007",
          name: "Metformin 500mg",
          code: "MET500",
          thumbnail: "/placeholder.svg?height=60&width=60",
          dosageForm: "Viên nén",
        },
        stock_id: {
          _id: "STOCK007",
          sellingPrice: 120000,
        },
        quantity: 2,
        price: 120000,
        totalAmount: 240000,
      },
    ],
    totalAmount: 240000,
    shippingFee: 35000,
    discount: 24000,
    finalAmount: 251000,
    status: "Awaiting Shipment",
    paymentMethod: "E-Wallet",
    shippingMethod: "Express",
    shippingAddress: {
      name: "Hoàng Văn Em",
      phone: "0945678901",
      address: "987 Đường MNO",
      city: "TP.HCM",
      district: "Quận 10",
      ward: "Phường 12",
    },
    orderDate: "2024-01-16T11:00:00Z",
    estimatedDelivery: "2024-01-18T14:00:00Z",
    trackingNumber: "TN001234571",
    isReviewed: false,
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T11:00:00Z",
  },
]

// API Functions
export const getAllOrdersAPI = async (filters?: IOrderFilters): Promise<IOrder[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredOrders = [...MOCK_ORDERS]

  if (filters) {
    if (filters.status && filters.status !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.status === filters.status)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredOrders = filteredOrders.filter(
        (order) =>
          order._id.toLowerCase().includes(searchLower) ||
          order.user_id.name.toLowerCase().includes(searchLower) ||
          order.user_id.email.toLowerCase().includes(searchLower) ||
          order.user_id.phone.includes(filters.search),
      )
    }

    if (filters.dateFrom) {
      filteredOrders = filteredOrders.filter((order) => new Date(order.orderDate) >= new Date(filters.dateFrom!))
    }

    if (filters.dateTo) {
      filteredOrders = filteredOrders.filter((order) => new Date(order.orderDate) <= new Date(filters.dateTo!))
    }

    if (filters.paymentMethod) {
      filteredOrders = filteredOrders.filter((order) => order.paymentMethod === filters.paymentMethod)
    }

    if (filters.shippingMethod) {
      filteredOrders = filteredOrders.filter((order) => order.shippingMethod === filters.shippingMethod)
    }
  }

  return filteredOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
}

export const getOrderByIdAPI = async (orderId: string): Promise<IOrder> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const order = MOCK_ORDERS.find((order) => order._id === orderId)
  if (!order) {
    throw new Error(`Không tìm thấy đơn hàng với ID: ${orderId}`)
  }

  return order
}

export const getOrderStatsAPI = async (): Promise<IOrderStats> => {
  await new Promise((resolve) => setTimeout(resolve, 200))

  const stats = MOCK_ORDERS.reduce(
    (acc, order) => {
      acc.total++
      switch (order.status) {
        case "Pending Confirmation":
          acc.pending++
          break
        case "Awaiting Shipment":
          acc.awaiting++
          break
        case "Shipping":
          acc.shipping++
          break
        case "Completed":
          acc.completed++
          break
        case "Cancelled":
          acc.cancelled++
          break
      }
      return acc
    },
    {
      total: 0,
      pending: 0,
      awaiting: 0,
      shipping: 0,
      completed: 0,
      cancelled: 0,
    },
  )

  return stats
}

export const updateOrderStatusAPI = async (
  orderId: string,
  status: IOrder["status"],
  notes?: string,
): Promise<IOrder> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const orderIndex = MOCK_ORDERS.findIndex((order) => order._id === orderId)
  if (orderIndex === -1) {
    throw new Error(`Không tìm thấy đơn hàng với ID: ${orderId}`)
  }

  const updatedOrder = {
    ...MOCK_ORDERS[orderIndex],
    status,
    notes: notes || MOCK_ORDERS[orderIndex].notes,
    updatedAt: new Date().toISOString(),
  }

  // Add specific date fields based on status
  if (status === "Completed") {
    updatedOrder.deliveredDate = new Date().toISOString()
  } else if (status === "Cancelled") {
    updatedOrder.cancelledDate = new Date().toISOString()
  }

  MOCK_ORDERS[orderIndex] = updatedOrder
  return updatedOrder
}

export const cancelOrderAPI = async (orderId: string, reason: string): Promise<IOrder> => {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const orderIndex = MOCK_ORDERS.findIndex((order) => order._id === orderId)
  if (orderIndex === -1) {
    throw new Error(`Không tìm thấy đơn hàng với ID: ${orderId}`)
  }

  if (MOCK_ORDERS[orderIndex].status !== "Pending Confirmation") {
    throw new Error("Chỉ có thể hủy đơn hàng ở trạng thái 'Chờ xác nhận'")
  }

  const cancelledOrder = {
    ...MOCK_ORDERS[orderIndex],
    status: "Cancelled" as const,
    cancelReason: reason,
    cancelledDate: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  MOCK_ORDERS[orderIndex] = cancelledOrder
  return cancelledOrder
}

export const getRevenueStatsAPI = async (period: "day" | "week" | "month" = "day"): Promise<IRevenueStats> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const completedOrders = MOCK_ORDERS.filter((order) => order.status === "Completed")
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.finalAmount, 0)
  const totalOrders = completedOrders.length
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Mock growth data
  const revenueGrowth = 12.5
  const ordersGrowth = 8.3

  // Generate mock daily revenue data
  const dailyRevenue = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return {
      date: date.toISOString().split("T")[0],
      revenue: Math.floor(Math.random() * 500000) + 100000,
      orders: Math.floor(Math.random() * 20) + 5,
    }
  })

  // Generate mock weekly revenue data
  const weeklyRevenue = Array.from({ length: 4 }, (_, i) => ({
    week: `Tuần ${i + 1}`,
    revenue: Math.floor(Math.random() * 2000000) + 500000,
    orders: Math.floor(Math.random() * 100) + 30,
  }))

  // Generate mock monthly revenue data
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    return {
      month: date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" }),
      revenue: Math.floor(Math.random() * 8000000) + 2000000,
      orders: Math.floor(Math.random() * 400) + 100,
    }
  })

  // Mock top products
  const topProducts = [
    {
      _id: "MED001",
      name: "Paracetamol 500mg",
      code: "PAR500",
      thumbnail: "/placeholder.svg?height=60&width=60",
      totalSold: 150,
      revenue: 3750000,
    },
    {
      _id: "MED002",
      name: "Vitamin C 1000mg",
      code: "VTC1000",
      thumbnail: "/placeholder.svg?height=60&width=60",
      totalSold: 120,
      revenue: 18000000,
    },
    {
      _id: "MED003",
      name: "Amoxicillin 250mg",
      code: "AMX250",
      thumbnail: "/placeholder.svg?height=60&width=60",
      totalSold: 95,
      revenue: 4275000,
    },
    {
      _id: "MED004",
      name: "Ibuprofen 400mg",
      code: "IBU400",
      thumbnail: "/placeholder.svg?height=60&width=60",
      totalSold: 80,
      revenue: 2800000,
    },
    {
      _id: "MED005",
      name: "Omeprazole 20mg",
      code: "OME20",
      thumbnail: "/placeholder.svg?height=60&width=60",
      totalSold: 75,
      revenue: 6000000,
    },
  ]

  // Status distribution
  const statusDistribution = [
    { status: "Completed", count: 2, percentage: 40 },
    { status: "Pending Confirmation", count: 1, percentage: 20 },
    { status: "Awaiting Shipment", count: 1, percentage: 20 },
    { status: "Shipping", count: 1, percentage: 20 },
    { status: "Cancelled", count: 1, percentage: 20 },
  ]

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    revenueGrowth,
    ordersGrowth,
    dailyRevenue,
    weeklyRevenue,
    monthlyRevenue,
    topProducts,
    statusDistribution,
  }
}
