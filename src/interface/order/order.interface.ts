// export interface IOrderItem {
//   _id: string;
//   medicine_id: {
//     _id: string;
//     name: string;
//     code: string;
//     thumbnail: string;
//     dosageForm: string;
//   };
//   stock_id: {
//     _id: string;
//     sellingPrice: number;
//   };
//   quantity: number;
//   price: number;
//   totalAmount: number;
//   note?: string;
// }

// export interface IOrder {
//   _id: string;
//   user_id: {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//   };
//   orderItems: IOrderItem[];
//   totalAmount: number;
//   shippingFee: number;
//   discount: number;
//   finalAmount: number;

//   status:
//     | "Chờ xác nhận"
//     | "Chờ giao hàng"
//     | "Đang giao"
//     | "Hoàn thành"
//     | "Đã hủy";
//   paymentMethod: string;
//   shippingMethod: string;
//   shippingAddress: {
//     name: string;
//     phone: string;
//     address: string;
//     city: string;
//     district: string;
//     ward: string;
//   };
//   orderDate: string;
//   estimatedDelivery?: string;
//   deliveredDate?: string;
//   cancelledDate?: string;
//   cancelReason?: string;
//   trackingNumber?: string;
//   isReviewed?: boolean;
//   notes?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IOrderStats {
//   total: number;
//   pending: number;
//   awaiting: number;
//   shipping: number;
//   completed: number;
//   cancelled: number;
// }

// export interface IOrderFilters {
//   status?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   search?: string;
//   paymentMethod?: string;
//   shippingMethod?: string;
// }

// export interface IRevenueStats {
//   totalRevenue: number;
//   totalOrders: number;
//   averageOrderValue: number;
//   revenueGrowth: number;
//   ordersGrowth: number;
//   dailyRevenue: Array<{
//     date: string;
//     revenue: number;
//     orders: number;
//   }>;
//   weeklyRevenue: Array<{
//     week: string;
//     revenue: number;
//     orders: number;
//   }>;
//   monthlyRevenue: Array<{
//     month: string;
//     revenue: number;
//     orders: number;
//   }>;
//   topProducts: Array<{
//     _id: string;
//     name: string;
//     code: string;
//     thumbnail: string;
//     totalSold: number;
//     revenue: number;
//   }>;
//   statusDistribution: Array<{
//     status: string;
//     count: number;
//     percentage: number;
//   }>;
// }

// // ✅ Backend status mapping theo thực tế
// export const BACKEND_STATUS_MAPPING = {
//   // Frontend -> Backend (cho API calls)
//   "Chờ xác nhận": "pending",
//   "Chờ giao hàng": "confirmed", 
//   "Đang giao": "delivering",
//   "Hoàn thành": "completed",
//   "Đã hủy": "huỷ", // ✅ Backend dùng "huỷ" không phải "cancelled"
  
//   // Backend -> Frontend (cho display)
//   "pending": "Chờ xác nhận",
//   "confirmed": "Chờ giao hàng",
//   "delivering": "Đang giao",
//   "completed": "Hoàn thành",
//   "huỷ": "Đã hủy"
// } as const;
// export interface IOrderStats {
//   total: number;
//   pending: number;
//   awaiting: number;
//   shipping: number;
//   completed: number;
//   cancelled: number;
// }

// export interface IOrderFilters {
//   status?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   search?: string;
//   paymentMethod?: string;
//   shippingMethod?: string;
// }

// export interface IRevenueStats {
//   totalRevenue: number;
//   totalOrders: number;
//   averageOrderValue: number;
//   revenueGrowth: number;
//   ordersGrowth: number;
//   dailyRevenue: Array<{
//     date: string;
//     revenue: number;
//     orders: number;
//   }>;
//   weeklyRevenue: Array<{
//     week: string;
//     revenue: number;
//     orders: number;
//   }>;
//   monthlyRevenue: Array<{
//     month: string;
//     revenue: number;
//     orders: number;
//   }>;
//   topProducts: Array<{
//     _id: string;
//     name: string;
//     code: string;
//     thumbnail: string;
//     totalSold: number;
//     revenue: number;
//   }>;
//   statusDistribution: Array<{
//     status: string;
//     count: number;
//     percentage: number;
//   }>;
// }

// // ✅ Status mapping constants
// export const ORDER_STATUS_MAPPING = {
//   VI_TO_EN: {
//     "Chờ xác nhận": "Pending Confirmation",
//     "Chờ giao hàng": "Awaiting Shipment",
//     "Đang giao": "Shipping",
//     "Hoàn thành": "Completed",
//     "Đã hủy": "Cancelled"
//   },
//   EN_TO_VI: {
//     "Pending Confirmation": "Chờ xác nhận",
//     "Awaiting Shipment": "Chờ giao hàng", 
//     "Shipping": "Đang giao",
//     "Completed": "Hoàn thành",
//     "Cancelled": "Đã hủy"
//   }
// } as const;

// export const ORDER_STATUS_OPTIONS = [
//   {
//     value: "Chờ xác nhận",
//     label: "Chờ xác nhận",
//     color: "bg-yellow-100 text-yellow-800",
//     englishValue: "Pending Confirmation" // ✅ Thêm giá trị tiếng Anh
//   },
//   {
//     value: "Chờ giao hàng",
//     label: "Chờ giao hàng",
//     color: "bg-blue-100 text-blue-800",
//     englishValue: "Awaiting Shipment"
//   },
//   {
//     value: "Đang giao",
//     label: "Đang giao",
//     color: "bg-purple-100 text-purple-800",
//     englishValue: "Shipping"
//   },
//   {
//     value: "Hoàn thành",
//     label: "Hoàn thành",
//     color: "bg-green-100 text-green-800",
//     englishValue: "Completed"
//   },
//   { 
//     value: "Đã hủy", 
//     label: "Đã hủy", 
//     color: "bg-red-100 text-red-800",
//     englishValue: "Cancelled"
//   },
// ];

// export const PAYMENT_METHODS = [
//   { value: "COD", label: "Thanh toán khi nhận hàng" },
//   { value: "Bank Transfer", label: "Chuyển khoản ngân hàng" },
//   { value: "Credit Card", label: "Thẻ tín dụng" },
//   { value: "E-Wallet", label: "Ví điện tử" },
// ];

// export const SHIPPING_METHODS = [
//   { value: "Standard", label: "Giao hàng tiêu chuẩn" },
//   { value: "Express", label: "Giao hàng nhanh" },
//   { value: "Same Day", label: "Giao trong ngày" },
//   { value: "Pickup", label: "Nhận tại cửa hàng" },
// ];

export interface IOrderItem {
  _id: string;
  medicine_id: {
    _id: string;
    name: string;
    code: string;
    thumbnail: string;
    dosageForm: string;
  };
  stock_id: {
    _id: string;
    sellingPrice: number;
  };
  quantity: number;
  price: number;
  totalAmount: number;
  note?: string;
}

export interface IOrder {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orderItems: IOrderItem[];
  totalAmount: number;
  shippingFee: number;
  discount: number;
  finalAmount: number;

  status:
    | "Chờ xác nhận"
    | "Chờ giao hàng"
    | "Đang giao"
    | "Hoàn thành"
    | "Đã hủy";
  paymentMethod: string;
  shippingMethod: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
  };
  orderDate: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  cancelledDate?: string;
  cancelReason?: string;
  trackingNumber?: string;
  isReviewed?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderStats {
  total: number;
  pending: number;
  awaiting: number;
  shipping: number;
  completed: number;
  cancelled: number;
}

export interface IOrderFilters {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  paymentMethod?: string;
  shippingMethod?: string;
}

// export interface IRevenueStats {
//   totalRevenue: number;
//   totalOrders: number;
//   averageOrderValue: number;
//   revenueGrowth: number;
//   ordersGrowth: number;
//   topProducts: Array<{
//     _id: string;
//     name: string;
//     code: string;
//     thumbnail: string;
//     totalSold: number;
//     revenue: number;
//   }>;
//   statusDistribution: Array<{
//     status: string;
//     count: number;
//     percentage: number;
//   }>;
// }
export interface IRevenueStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
  // ✅ Thêm các property bị thiếu
  dailyRevenue: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  weeklyRevenue: Array<{
    week: string;
    revenue: number;
    orders: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
  topProducts: Array<{
    _id: string;
    name: string;
    code: string;
    thumbnail: string;
    totalSold: number;
    revenue: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
}

// ✅ Cập nhật mapping theo backend enum OrderStatus
export const BACKEND_STATUS_MAPPING = {
  // Frontend -> Backend (cho API calls)
  "Chờ xác nhận": "PENDING",
  "Chờ giao hàng": "CONFIRMED", 
  "Đang giao": "DELIVERING",
  "Hoàn thành": "COMPLETED",
  "Đã hủy": "CANCELLED",
  
  // Backend -> Frontend (cho display)
  "PENDING": "Chờ xác nhận",
  "CONFIRMED": "Chờ giao hàng",
  "DELIVERING": "Đang giao",
  "COMPLETED": "Hoàn thành",
  "CANCELLED": "Đã hủy"
} as const;

// ✅ Cập nhật ORDER_STATUS_OPTIONS
export const ORDER_STATUS_OPTIONS = [
  {
    value: "Chờ xác nhận",
    label: "Chờ xác nhận",
    color: "bg-yellow-100 text-yellow-800",
    backendValue: "PENDING"
  },
  {
    value: "Chờ giao hàng",
    label: "Chờ giao hàng",
    color: "bg-blue-100 text-blue-800",
    backendValue: "CONFIRMED"
  },
  {
    value: "Đang giao",
    label: "Đang giao",
    color: "bg-purple-100 text-purple-800",
    backendValue: "DELIVERING"
  },
  {
    value: "Hoàn thành",
    label: "Hoàn thành",
    color: "bg-green-100 text-green-800",
    backendValue: "COMPLETED"
  },
  { 
    value: "Đã hủy", 
    label: "Đã hủy", 
    color: "bg-red-100 text-red-800",
    backendValue: "CANCELLED"
  },
];

export const PAYMENT_METHODS = [
  { value: "COD", label: "Thanh toán khi nhận hàng" },
  { value: "Bank Transfer", label: "Chuyển khoản ngân hàng" },
  { value: "Credit Card", label: "Thẻ tín dụng" },
  { value: "E-Wallet", label: "Ví điện tử" },
];

export const SHIPPING_METHODS = [
  { value: "Standard", label: "Giao hàng tiêu chuẩn" },
  { value: "Express", label: "Giao hàng nhanh" },
  { value: "Same Day", label: "Giao trong ngày" },
  { value: "Pickup", label: "Nhận tại cửa hàng" },
];
// export interface IOrderItem {
//   _id: string;
//   medicine_id: {
//     _id: string;
//     name: string;
//     code: string;
//     thumbnail: string;
//     dosageForm: string;
//   };
//   stock_id: {
//     _id: string;
//     sellingPrice: number;
//   };
//   quantity: number;
//   price: number;
//   totalAmount: number;
//   note?: string;
// }

// export interface IOrder {
//   _id: string;
//   user_id: {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//   };
//   orderItems: IOrderItem[];
//   totalAmount: number;
//   shippingFee: number;
//   discount: number;
//   finalAmount: number;

//   status:
//     | "Chờ xác nhận"
//     | "Chờ giao hàng"
//     | "Đang giao"
//     | "Hoàn thành"
//     | "Đã hủy";
//   paymentMethod: string;
//   shippingMethod: string;
//   shippingAddress: {
//     name: string;
//     phone: string;
//     address: string;
//     city: string;
//     district: string;
//     ward: string;
//   };
//   orderDate: string;
//   estimatedDelivery?: string;
//   deliveredDate?: string;
//   cancelledDate?: string;
//   cancelReason?: string;
//   trackingNumber?: string;
//   isReviewed?: boolean;
//   notes?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IOrderStats {
//   total: number;
//   pending: number;
//   awaiting: number;
//   shipping: number;
//   completed: number;
//   cancelled: number;
// }

// export interface IOrderFilters {
//   status?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   search?: string;
//   paymentMethod?: string;
//   shippingMethod?: string;
// }

// export interface IRevenueStats {
//   totalRevenue: number;
//   totalOrders: number;
//   averageOrderValue: number;
//   revenueGrowth: number;
//   ordersGrowth: number;
//   dailyRevenue: Array<{
//     date: string;
//     revenue: number;
//     orders: number;
//   }>;
//   weeklyRevenue: Array<{
//     week: string;
//     revenue: number;
//     orders: number;
//   }>;
//   monthlyRevenue: Array<{
//     month: string;
//     revenue: number;
//     orders: number;
//   }>;
//   topProducts: Array<{
//     _id: string;
//     name: string;
//     code: string;
//     thumbnail: string;
//     totalSold: number;
//     revenue: number;
//   }>;
//   statusDistribution: Array<{
//     status: string;
//     count: number;
//     percentage: number;
//   }>;
// }

// // ✅ Cập nhật mapping theo backend enum OrderStatus
// export const BACKEND_STATUS_MAPPING = {
//   // Frontend -> Backend (cho API calls)
//   "Chờ xác nhận": "PENDING",
//   "Chờ giao hàng": "CONFIRMED", 
//   "Đang giao": "DELIVERING",
//   "Hoàn thành": "COMPLETED",
//   "Đã hủy": "CANCELLED",
  
//   // Backend -> Frontend (cho display)
//   "PENDING": "Chờ xác nhận",
//   "CONFIRMED": "Chờ giao hàng",
//   "DELIVERING": "Đang giao",
//   "COMPLETED": "Hoàn thành",
//   "CANCELLED": "Đã hủy"
// } as const;

// // ✅ Cập nhật ORDER_STATUS_OPTIONS
// export const ORDER_STATUS_OPTIONS = [
//   {
//     value: "Chờ xác nhận",
//     label: "Chờ xác nhận",
//     color: "bg-yellow-100 text-yellow-800",
//     backendValue: "PENDING"
//   },
//   {
//     value: "Chờ giao hàng",
//     label: "Chờ giao hàng",
//     color: "bg-blue-100 text-blue-800",
//     backendValue: "CONFIRMED"
//   },
//   {
//     value: "Đang giao",
//     label: "Đang giao",
//     color: "bg-purple-100 text-purple-800",
//     backendValue: "DELIVERING"
//   },
//   {
//     value: "Hoàn thành",
//     label: "Hoàn thành",
//     color: "bg-green-100 text-green-800",
//     backendValue: "COMPLETED"
//   },
//   { 
//     value: "Đã hủy", 
//     label: "Đã hủy", 
//     color: "bg-red-100 text-red-800",
//     backendValue: "CANCELLED"
//   },
// ];

// export const PAYMENT_METHODS = [
//   { value: "COD", label: "Thanh toán khi nhận hàng" },
//   { value: "Bank Transfer", label: "Chuyển khoản ngân hàng" },
//   { value: "Credit Card", label: "Thẻ tín dụng" },
//   { value: "E-Wallet", label: "Ví điện tử" },
// ];

// export const SHIPPING_METHODS = [
//   { value: "Standard", label: "Giao hàng tiêu chuẩn" },
//   { value: "Express", label: "Giao hàng nhanh" },
//   { value: "Same Day", label: "Giao trong ngày" },
//   { value: "Pickup", label: "Nhận tại cửa hàng" },
// ];