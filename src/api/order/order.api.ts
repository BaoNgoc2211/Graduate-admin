// import { IOrder, IOrderItem, BACKEND_STATUS_MAPPING } from "@/interface/order/order.interface";
// import APIConfig from "../api.config";

// interface BackendOrderData {
//   _id: string;
//   orderId?: string;
//   user_id: string;
//   totalAmount?: number;
//   shippingFee?: number;
//   discount?: number;
//   finalAmount?: number;
//   status: string;
//   paymentMethod?: string;
//   shippingMethod?: string;
//   shippingAddress?: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     city?: string;
//     district?: string;
//     ward?: string;
//   };
//   orderDate?: string;
//   estimatedDelivery?: string;
//   deliveredDate?: string;
//   cancelledDate?: string;
//   cancelReason?: string;
//   trackingNumber?: string;
//   isReviewed?: boolean;
//   notes?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   orderDetail?: string;
// }

// interface BackendOrderItem {
//   medicine_id: string;
//   stock_id: string;
//   quantity: number;
//   price: number;
//   totalAmount: number;
//   name?: string;
//   thumbnail?: string;
//   note?: string;
// }

// interface BackendOrderDetail {
//   _id: string;
//   order_items: BackendOrderItem[];
//   totalOrder: number;
// }

// interface BackendUser {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// }

// const mapBackendToFrontend = (backendStatus: string): IOrder["status"] => {
//   return BACKEND_STATUS_MAPPING[backendStatus as keyof typeof BACKEND_STATUS_MAPPING] as IOrder["status"] || backendStatus as IOrder["status"];
// };

// const mapFrontendToBackend = (frontendStatus: IOrder["status"]): string => {
//   return BACKEND_STATUS_MAPPING[frontendStatus] || frontendStatus;
// };

// const transformOrderFromBackend = (order: BackendOrderData): IOrder => {
//   return {
//     _id: order._id || order.orderId || "",
//     user_id: {
//       _id: "",
//       name: "Chưa có thông tin",
//       email: "",
//       phone: "",
//       address: ""
//     },
//     orderItems: [],
//     totalAmount: order.totalAmount || 0,
//     shippingFee: order.shippingFee || 0,
//     discount: order.discount || 0,
//     finalAmount: order.finalAmount || 0,
//     status: mapBackendToFrontend(order.status),
//     paymentMethod: order.paymentMethod || "COD",
//     shippingMethod: order.shippingMethod || "Standard",
//     shippingAddress: {
//       name: order.shippingAddress?.name || "",
//       phone: order.shippingAddress?.phone || "",
//       address: order.shippingAddress?.address || "",
//       city: order.shippingAddress?.city || "",
//       district: order.shippingAddress?.district || "",
//       ward: order.shippingAddress?.ward || ""
//     },
//     orderDate: order.orderDate || order.createdAt || new Date().toISOString(),
//     estimatedDelivery: order.estimatedDelivery,
//     deliveredDate: order.deliveredDate,
//     cancelledDate: order.cancelledDate,
//     cancelReason: order.cancelReason,
//     trackingNumber: order.trackingNumber,
//     isReviewed: order.isReviewed || false,
//     notes: order.notes,
//     createdAt: order.createdAt || new Date().toISOString(),
//     updatedAt: order.updatedAt || new Date().toISOString()
//   };
// };

// const fetchUserInfo = async (userId: string): Promise<BackendUser> => {
//   try {
//     const userRes = await APIConfig.get(`/api/user/${userId}`);
//     return userRes.data.data || {
//       _id: userId,
//       name: "Chưa có thông tin",
//       email: "",
//       phone: "",
//       address: ""
//     };
//   } catch (error) {
//     console.error("Error fetching user info for user:", userId, error);
//     return {
//       _id: userId,
//       name: "Chưa có thông tin",
//       email: "",
//       phone: "",
//       address: ""
//     };
//   }
// };

// export const fetchAllOrders = async (): Promise<IOrder[]> => {
//   try {
//     console.log("Fetching all orders...");
//     const res = await APIConfig.get("/api/order/admin");
//     console.log("API Response:", res.data);

//     const responseData = res.data.data || res.data;
//     console.log("Response data:", responseData);

//     if (Array.isArray(responseData)) {
//       const ordersWithUserInfo = await Promise.all(
//         responseData.map(async (order: BackendOrderData) => {
//           const userInfo = await fetchUserInfo(order.user_id);
//           const transformedOrder = transformOrderFromBackend(order);
//           transformedOrder.user_id = userInfo;
//           return transformedOrder;
//         })
//       );

//       console.log("Transformed orders with user info:", ordersWithUserInfo[0]);
//       return ordersWithUserInfo;
//     }

//     console.warn("API response data is not an array:", responseData);
//     return [];
//   } catch (error) {
//     console.error("Error in fetchAllOrders:", error);
//     throw error;
//   }
// };

// // Lọc đơn hàng theo trạng thái
// export const fetchOrdersByStatus = async (status: string): Promise<IOrder[]> => {
//   try {
//     console.log("Fetching orders by status:", status);

//     const backendStatus = mapFrontendToBackend(status as IOrder["status"]);
//     console.log("Mapped status:", status, "->", backendStatus);

//     const res = await APIConfig.get(`/api/order/admin/status/${backendStatus}`);
//     console.log("API Response for status", status, ":", res.data);

//     const responseData = res.data.data || res.data;

//     if (Array.isArray(responseData)) {
//       const ordersWithUserInfo = await Promise.all(
//         responseData.map(async (order: BackendOrderData) => {
//           const userInfo = await fetchUserInfo(order.user_id);
//           const transformedOrder = transformOrderFromBackend(order);
//           transformedOrder.user_id = userInfo;
//           return transformedOrder;
//         })
//       );

//       return ordersWithUserInfo;
//     }
//     return [];
//   } catch (error) {
//     console.error("Error in fetchOrdersByStatus:", error);
//     throw error;
//   }
// };

// // Transform backend order item to frontend format
// const transformOrderItem = (item: BackendOrderItem, index: number): IOrderItem => {
//   return {
//     _id: `${item.medicine_id}_${item.stock_id}_${index}`, // Generate unique ID
//     medicine_id: {
//       _id: item.medicine_id,
//       name: item.name || "Sản phẩm",
//       code: item.medicine_id,
//       thumbnail: item.thumbnail || "",
//       dosageForm: "Viên"
//     },
//     stock_id: {
//       _id: item.stock_id,
//       sellingPrice: item.price || 0
//     },
//     quantity: item.quantity || 0,
//     price: item.price || 0,
//     totalAmount: item.totalAmount || 0,
//     note: item.note || ""
//   };
// };

// // Xem chi tiết đơn hàng với order details
// export const fetchOrderById = async (id: string): Promise<IOrder> => {
//   try {
//     console.log("=== FETCH ORDER BY ID ===");
//     console.log("Fetching order by ID:", id);

//     // Step 1: Fetch basic order info
//     const orderRes = await APIConfig.get(`/api/order/admin`);
//     console.log("All orders response:", orderRes.data);

//     const allOrders = orderRes.data.data || orderRes.data;
//     const orderData = Array.isArray(allOrders)
//       ? allOrders.find((order: BackendOrderData) => order._id === id)
//       : null;

//     if (!orderData) {
//       throw new Error(`Order with ID ${id} not found`);
//     }

//     console.log("Found order data:", orderData);
//     const transformedOrder = transformOrderFromBackend(orderData);

//     // Step 2: Fetch user info
//     try {
//       console.log("Fetching user info for user_id:", orderData.user_id);
//       const userInfo = await fetchUserInfo(orderData.user_id);
//       console.log("User info response:", userInfo);

//       transformedOrder.user_id = userInfo;
//     } catch (userError) {
//       console.error("Error fetching user info:", userError);
//       transformedOrder.user_id = {
//         _id: orderData.user_id,
//         name: "Chưa có thông tin",
//         email: "",
//         phone: "",
//         address: ""
//       };
//     }

//     // Step 3: Fetch order details using orderDetail field
//     try {
//       const orderDetailId = orderData.orderDetail || id;
//       console.log("Fetching order detail for ID:", orderDetailId);

//       const detailRes = await APIConfig.get(`/api/order/orderdetail/${orderDetailId}`);
//       console.log("Order detail response:", detailRes.data);

//       const detailData: BackendOrderDetail = detailRes.data.data;
//       if (detailData && detailData.order_items && Array.isArray(detailData.order_items)) {
//         console.log("Processing order items:", detailData.order_items);

//         // Transform order items to match interface
//         transformedOrder.orderItems = detailData.order_items.map((item: BackendOrderItem, index: number) => {
//           console.log(`Processing item ${index}:`, item);
//           return transformOrderItem(item, index);
//         });

//         // Update total amounts from detail
//         transformedOrder.totalAmount = detailData.totalOrder || transformedOrder.totalAmount;
//         transformedOrder.finalAmount = detailData.totalOrder || transformedOrder.finalAmount;

//         console.log("Transformed order items:", transformedOrder.orderItems);
//       } else {
//         console.warn("No order items found in detail response");
//         transformedOrder.orderItems = [];
//       }
//     } catch (detailError) {
//       console.error("Error fetching order detail:", detailError);
//       transformedOrder.orderItems = [];
//     }

//     console.log("Final transformed order:", transformedOrder);
//     console.log("=== END FETCH ORDER BY ID ===");

//     return transformedOrder;
//   } catch (error) {
//     console.error("Error in fetchOrderById:", error);
//     throw error;
//   }
// };

// // Cập nhật trạng thái đơn hàng
// export const updateOrderStatus = async (
//   id: string,
//   status: IOrder["status"]
// ): Promise<void> => {
//   try {
//     const backendStatus = mapFrontendToBackend(status);
//     console.log("Updating order status:", status, "->", backendStatus);

//     await APIConfig.put(`/api/order/admin/updatestatus/${id}`, {
//       status: backendStatus
//     });
//   } catch (error) {
//     console.error("Error in updateOrderStatus:", error);
//     throw error;
//   }
// };

// // Cập nhật trạng thái đơn hàng chi tiết (alias)
// export const updateOrderDetailStatus = async (
//   id: string,
//   status: IOrder["status"]
// ): Promise<void> => {
//   return updateOrderStatus(id, status);
// };

// // Hủy đơn hàng với lý do
// export const cancelOrder = async (
//   id: string,
//   reason: string
// ): Promise<void> => {
//   try {
//     console.log("Cancelling order:", id, "with reason:", reason);

//     await APIConfig.put(`/api/order/admin/cancel/${id}`, {
//       status: "huỷ",
//       cancelReason: reason
//     });
//   } catch (error) {
//     console.error("Error in cancelOrder:", error);
//     throw error;
//   }
// };

// // Lấy thống kê đơn hàng
// export const fetchOrderStats = async () => {
//   const res = await APIConfig.get("/api/order/stats");
//   return res.data;
// };
import { IOrder, IOrderItem } from "@/interface/order/order.interface";
import APIConfig from "../api.config";
import { isNoOrdersError } from "@/utils/error-types";

interface BackendOrderData {
  _id: string;
  orderId?: string;
  user_id: string | {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  totalAmount?: number;
  shippingFee?: number;
  discount?: number;
  finalAmount?: number;
  status: string;
  paymentMethod?: string;
  shippingMethod?: string;
  shippingAddress?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    district?: string;
    ward?: string;
  };
  orderDate?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
  cancelledDate?: string;
  cancelReason?: string;
  trackingNumber?: string;
  isReviewed?: boolean;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  orderDetail?: string;
}

interface BackendOrderItem {
  medicine_id: string | {
    _id: string;
    name: string;
    code: string;
    thumbnail: string;
    dosageForm: string;
  };
  stock_id: string | {
    _id: string;
    sellingPrice: number;
  };
  quantity: number;
  price: number;
  totalAmount: number;
  name?: string;
  thumbnail?: string;
  note?: string;
}

interface BackendOrderDetail {
  _id: string;
  order_items: BackendOrderItem[];
  totalOrder: number;
}

interface BackendUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Cập nhật mapping theo backend enum
const mapBackendToFrontend = (backendStatus: string): IOrder["status"] => {
  const mapping: Record<string, IOrder["status"]> = {
    'PENDING': 'Chờ xác nhận',
    'CONFIRMED': 'Chờ giao hàng', 
    'DELIVERING': 'Đang giao',
    'COMPLETED': 'Hoàn thành',
    'CANCELLED': 'Đã hủy'
  };
  return mapping[backendStatus] || 'Chờ xác nhận';
};

const mapFrontendToBackend = (frontendStatus: IOrder["status"]): string => {
  const mapping: Record<IOrder["status"], string> = {
    'Chờ xác nhận': 'PENDING',
    'Chờ giao hàng': 'CONFIRMED',
    'Đang giao': 'DELIVERING', 
    'Hoàn thành': 'COMPLETED',
    'Đã hủy': 'CANCELLED'
  };
  return mapping[frontendStatus] || 'PENDING';
};

const transformOrderFromBackend = (order: BackendOrderData): IOrder => {
  // Handle user_id - có thể là string hoặc object
  let user_id;
  if (typeof order.user_id === 'string') {
    user_id = {
      _id: order.user_id,
      name: "Chưa có thông tin",
      email: "",
      phone: "", 
      address: ""
    };
  } else {
    user_id = order.user_id;
  }

  return {
    _id: order._id || order.orderId || "",
    user_id: user_id,
    orderItems: [], // Will be populated later if needed
    totalAmount: order.totalAmount || 0,
    shippingFee: order.shippingFee || 0,
    discount: order.discount || 0,
    finalAmount: order.finalAmount || 0,
    status: mapBackendToFrontend(order.status),
    paymentMethod: order.paymentMethod || "COD",
    shippingMethod: order.shippingMethod || "Standard",
    shippingAddress: {
      name: order.shippingAddress?.name || "",
      phone: order.shippingAddress?.phone || "",
      address: order.shippingAddress?.address || "",
      city: order.shippingAddress?.city || "",
      district: order.shippingAddress?.district || "",
      ward: order.shippingAddress?.ward || ""
    },
    orderDate: order.orderDate || order.createdAt || new Date().toISOString(),
    estimatedDelivery: order.estimatedDelivery,
    deliveredDate: order.deliveredDate,
    cancelledDate: order.cancelledDate,
    cancelReason: order.cancelReason,
    trackingNumber: order.trackingNumber,
    isReviewed: order.isReviewed || false,
    notes: order.notes,
    createdAt: order.createdAt || new Date().toISOString(),
    updatedAt: order.updatedAt || new Date().toISOString()
  };
};

// Cải tiến fetchUserInfo với error handling
const fetchUserInfo = async (userId: string): Promise<BackendUser> => {
  // Kiểm tra userId hợp lệ trước khi gọi API
  if (!userId || userId === 'undefined' || userId === 'null') {
    console.warn("Invalid userId provided:", userId);
    return {
      _id: userId || "",
      name: "Chưa có thông tin",
      email: "",
      phone: "",
      address: ""
    };
  }

  try {
    console.log("Fetching user info for userId:", userId);
    const userRes = await APIConfig.get(`/api/user/${userId}`);
    return userRes.data.data || {
      _id: userId,
      name: "Chưa có thông tin", 
      email: "",
      phone: "",
      address: ""
    };
  } catch (error) {
    console.error("Error fetching user info for user:", userId, error);
    return {
      _id: userId,
      name: "Chưa có thông tin",
      email: "",
      phone: "",
      address: ""
    };
  }
};

export const fetchAllOrders = async (): Promise<IOrder[]> => {
  try {
    console.log("Fetching all orders...");
    const res = await APIConfig.get("/api/order/admin");
    console.log("API Response:", res.data);
    
    const responseData = res.data.data || res.data;
    console.log("Response data:", responseData);
    
    if (Array.isArray(responseData)) {
      const ordersWithUserInfo = await Promise.all(
        responseData.map(async (order: BackendOrderData) => {
          const transformedOrder = transformOrderFromBackend(order);
          
          // Chỉ fetch user info nếu user_id là string và hợp lệ
          if (typeof order.user_id === 'string' && order.user_id && order.user_id !== 'undefined') {
            const userInfo = await fetchUserInfo(order.user_id);
            transformedOrder.user_id = userInfo;
          }
          
          return transformedOrder;
        })
      );
      
      console.log("Transformed orders with user info:", ordersWithUserInfo[0]);
      return ordersWithUserInfo;
    }
    
    console.warn("API response data is not an array:", responseData);
    return [];
  } catch (error) {
    console.error("Error in fetchAllOrders:", error);
    throw error;
  }
};

// Cải tiến fetchOrdersByStatus để handle empty result
export const fetchOrdersByStatus = async (status: string): Promise<IOrder[]> => {
  try {
    console.log("Fetching orders by status:", status);
    
    const backendStatus = mapFrontendToBackend(status as IOrder["status"]);
    console.log("Mapped status:", status, "->", backendStatus);
    
    const res = await APIConfig.get(`/api/order/admin/status/${backendStatus}`);
    console.log("API Response for status", status, ":", res.data);
    
    const responseData = res.data.data || res.data;
    
    // Handle case when no orders found - return empty array instead of throwing error
    if (!responseData) {
      console.log("No orders found for status:", status);
      return [];
    }
    
    if (Array.isArray(responseData)) {
      const ordersWithUserInfo = await Promise.all(
        responseData.map(async (order: BackendOrderData) => {
          const transformedOrder = transformOrderFromBackend(order);
          
          // Chỉ fetch user info nếu user_id là string và hợp lệ
          if (typeof order.user_id === 'string' && order.user_id && order.user_id !== 'undefined') {
            const userInfo = await fetchUserInfo(order.user_id);
            transformedOrder.user_id = userInfo;
          }
          
          return transformedOrder;
        })
      );
      
      return ordersWithUserInfo;
    }
    
    return [];
  } catch (error: unknown) {
    console.error("Error in fetchOrdersByStatus:", error);
    
    // Nếu API trả về message "Người dùng chưa có đơn hàng nào", return empty array
    if (isNoOrdersError(error)) {
      console.log("No orders found for status:", status, "- returning empty array");
      return [];
    }
    
    throw error;
  }
};

// Transform backend order item to frontend format
const transformOrderItem = (item: BackendOrderItem, index: number): IOrderItem => {
  // Handle medicine_id - có thể là string hoặc object
  let medicine_id;
  if (typeof item.medicine_id === 'string') {
    medicine_id = {
      _id: item.medicine_id,
      name: item.name || "Sản phẩm",
      code: item.medicine_id,
      thumbnail: item.thumbnail || "",
      dosageForm: "Viên"
    };
  } else {
    medicine_id = item.medicine_id;
  }

  // Handle stock_id - có thể là string hoặc object
  let stock_id;
  if (typeof item.stock_id === 'string') {
    stock_id = {
      _id: item.stock_id,
      sellingPrice: item.price || 0
    };
  } else {
    stock_id = item.stock_id;
  }

  return {
    _id: `${typeof item.medicine_id === 'string' ? item.medicine_id : item.medicine_id._id}_${typeof item.stock_id === 'string' ? item.stock_id : item.stock_id._id}_${index}`,
    medicine_id: medicine_id,
    stock_id: stock_id,
    quantity: item.quantity || 0,
    price: item.price || 0,
    totalAmount: item.totalAmount || 0,
    note: item.note || ""
  };
};

// Cải tiến fetchOrderById - tìm trực tiếp bằng API endpoint
export const fetchOrderById = async (id: string): Promise<IOrder> => {
  try {
    console.log("=== FETCH ORDER BY ID ===");
    console.log("Fetching order by ID:", id);
    
    // Kiểm tra ID hợp lệ
    if (!id || id === 'undefined' || id === 'null') {
      throw new Error(`Invalid order ID: ${id}`);
    }
    
    // Thử gọi API endpoint trực tiếp trước
    try {
      const directRes = await APIConfig.get(`/api/order/admin/${id}`);
      if (directRes.data && directRes.data.data) {
        const orderData = directRes.data.data;
        console.log("Found order via direct API:", orderData);
        
        const transformedOrder = transformOrderFromBackend(orderData);
        
        // Fetch user info nếu cần
        if (typeof orderData.user_id === 'string' && orderData.user_id && orderData.user_id !== 'undefined') {
          const userInfo = await fetchUserInfo(orderData.user_id);
          transformedOrder.user_id = userInfo;
        }
        
        // Fetch order details
        await fetchAndSetOrderDetails(transformedOrder, orderData.orderDetail || id);
        
        return transformedOrder;
      }
    } catch (directError) {
      console.log("Direct API failed, trying fallback method:", directError);
    }
    
    // Fallback: Tìm trong danh sách tất cả orders
    const orderRes = await APIConfig.get(`/api/order/admin`);
    console.log("All orders response:", orderRes.data);
    
    const allOrders = orderRes.data.data || orderRes.data;
    const orderData = Array.isArray(allOrders) 
      ? allOrders.find((order: BackendOrderData) => order._id === id)
      : null;
    
    if (!orderData) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    console.log("Found order data:", orderData);
    const transformedOrder = transformOrderFromBackend(orderData);
    
    // Step 2: Fetch user info nếu cần
    try {
      if (typeof orderData.user_id === 'string' && orderData.user_id && orderData.user_id !== 'undefined') {
        console.log("Fetching user info for user_id:", orderData.user_id);
        const userInfo = await fetchUserInfo(orderData.user_id);
        console.log("User info response:", userInfo);
        transformedOrder.user_id = userInfo;
      }
    } catch (userError) {
      console.error("Error fetching user info:", userError);
      // Keep default user info
    }
    
    // Step 3: Fetch order details
    await fetchAndSetOrderDetails(transformedOrder, orderData.orderDetail || id);
    
    console.log("Final transformed order:", transformedOrder);
    console.log("=== END FETCH ORDER BY ID ===");
    
    return transformedOrder;
  } catch (error) {
    console.error("Error in fetchOrderById:", error);
    throw error;
  }
};

// Helper function để fetch order details
const fetchAndSetOrderDetails = async (transformedOrder: IOrder, orderDetailId: string) => {
  try {
    console.log("Fetching order detail for ID:", orderDetailId);
    
    const detailRes = await APIConfig.get(`/api/order/orderdetail/${orderDetailId}`);
    console.log("Order detail response:", detailRes.data);
    
    const detailData: BackendOrderDetail = detailRes.data.data;
    if (detailData && detailData.order_items && Array.isArray(detailData.order_items)) {
      console.log("Processing order items:", detailData.order_items);
      
      transformedOrder.orderItems = detailData.order_items.map((item: BackendOrderItem, index: number) => {
        console.log(`Processing item ${index}:`, item);
        return transformOrderItem(item, index);
      });
      
      // Update total amounts from detail
      transformedOrder.totalAmount = detailData.totalOrder || transformedOrder.totalAmount;
      transformedOrder.finalAmount = detailData.totalOrder || transformedOrder.finalAmount;
      
      console.log("Transformed order items:", transformedOrder.orderItems);
    } else {
      console.warn("No order items found in detail response");
      transformedOrder.orderItems = [];
    }
  } catch (detailError) {
    console.error("Error fetching order detail:", detailError);
    transformedOrder.orderItems = [];
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (
  id: string,
  status: IOrder["status"]
): Promise<void> => {
  try {
    const backendStatus = mapFrontendToBackend(status);
    console.log("Updating order status:", status, "->", backendStatus);
    
    await APIConfig.put(`/api/order/admin/updatestatus/${id}`, { 
      status: backendStatus 
    });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    throw error;
  }
};

// Cập nhật trạng thái đơn hàng chi tiết (alias)
export const updateOrderDetailStatus = async (
  id: string,
  status: IOrder["status"]
): Promise<void> => {
  return updateOrderStatus(id, status);
};

// Hủy đơn hàng với lý do
export const cancelOrder = async (
  id: string,
  reason: string
): Promise<void> => {
  try {
    console.log("Cancelling order:", id, "with reason:", reason);
    
    await APIConfig.put(`/api/order/admin/cancel/${id}`, {
      status: "CANCELLED",
      cancelReason: reason 
    });
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    throw error;
  }
};

// Lấy thống kê đơn hàng với API riêng
export const fetchOrderStats = async () => {
  try {
    const res = await APIConfig.get("/api/order/stats");
    return res.data;
  } catch {
    console.warn("Stats API not available, calculating from orders...");
    // Fallback: Calculate từ all orders
    const orders = await fetchAllOrders();
    return calculateStatsFromOrders(orders);
  }
};

// Helper để calculate stats từ orders
const calculateStatsFromOrders = (orders: IOrder[]) => {
  if (!Array.isArray(orders)) {
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      delivering: 0,
      completed: 0,
      cancelled: 0
    };
  }

  return {
    total: orders.length,
    pending: orders.filter(order => order.status === "Chờ xác nhận").length,
    confirmed: orders.filter(order => order.status === "Chờ giao hàng").length,
    delivering: orders.filter(order => order.status === "Đang giao").length,
    completed: orders.filter(order => order.status === "Hoàn thành").length,
    cancelled: orders.filter(order => order.status === "Đã hủy").length,
  };
};