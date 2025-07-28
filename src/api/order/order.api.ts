import { IOrder, IOrderItem, BACKEND_STATUS_MAPPING } from "@/interface/order/order.interface";
import APIConfig from "../api.config";

interface BackendOrderData {
  _id: string;
  orderId?: string;
  user_id: string;
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
  medicine_id: string;
  stock_id: string;
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

const mapBackendToFrontend = (backendStatus: string): IOrder["status"] => {
  return BACKEND_STATUS_MAPPING[backendStatus as keyof typeof BACKEND_STATUS_MAPPING] as IOrder["status"] || backendStatus as IOrder["status"];
};

const mapFrontendToBackend = (frontendStatus: IOrder["status"]): string => {
  return BACKEND_STATUS_MAPPING[frontendStatus] || frontendStatus;
};

const transformOrderFromBackend = (order: BackendOrderData): IOrder => {
  return {
    _id: order._id || order.orderId || "",
    user_id: {
      _id: "",
      name: "Chưa có thông tin",
      email: "",
      phone: "",
      address: ""
    }, 
    orderItems: [], 
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

const fetchUserInfo = async (userId: string): Promise<BackendUser> => {
  try {
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
          const userInfo = await fetchUserInfo(order.user_id);
          const transformedOrder = transformOrderFromBackend(order);
          transformedOrder.user_id = userInfo;
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

// Lọc đơn hàng theo trạng thái
export const fetchOrdersByStatus = async (status: string): Promise<IOrder[]> => {
  try {
    console.log("Fetching orders by status:", status);
    
    const backendStatus = mapFrontendToBackend(status as IOrder["status"]);
    console.log("Mapped status:", status, "->", backendStatus);
    
    const res = await APIConfig.get(`/api/order/admin/status/${backendStatus}`);
    console.log("API Response for status", status, ":", res.data);
    
    const responseData = res.data.data || res.data;
    
    if (Array.isArray(responseData)) {
      const ordersWithUserInfo = await Promise.all(
        responseData.map(async (order: BackendOrderData) => {
          const userInfo = await fetchUserInfo(order.user_id);
          const transformedOrder = transformOrderFromBackend(order);
          transformedOrder.user_id = userInfo;
          return transformedOrder;
        })
      );
      
      return ordersWithUserInfo;
    }
    return [];
  } catch (error) {
    console.error("Error in fetchOrdersByStatus:", error);
    throw error;
  }
};

// Transform backend order item to frontend format
const transformOrderItem = (item: BackendOrderItem, index: number): IOrderItem => {
  return {
    _id: `${item.medicine_id}_${item.stock_id}_${index}`, // Generate unique ID
    medicine_id: {
      _id: item.medicine_id,
      name: item.name || "Sản phẩm",
      code: item.medicine_id, 
      thumbnail: item.thumbnail || "",
      dosageForm: "Viên" 
    },
    stock_id: {
      _id: item.stock_id,
      sellingPrice: item.price || 0
    },
    quantity: item.quantity || 0,
    price: item.price || 0,
    totalAmount: item.totalAmount || 0,
    note: item.note || ""
  };
};

// Xem chi tiết đơn hàng với order details
export const fetchOrderById = async (id: string): Promise<IOrder> => {
  try {
    console.log("=== FETCH ORDER BY ID ===");
    console.log("Fetching order by ID:", id);
    
    // Step 1: Fetch basic order info
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
    
    // Step 2: Fetch user info
    try {
      console.log("Fetching user info for user_id:", orderData.user_id);
      const userInfo = await fetchUserInfo(orderData.user_id);
      console.log("User info response:", userInfo);
      
      transformedOrder.user_id = userInfo;
    } catch (userError) {
      console.error("Error fetching user info:", userError);
      transformedOrder.user_id = {
        _id: orderData.user_id,
        name: "Chưa có thông tin",
        email: "",
        phone: "",
        address: ""
      };
    }
    
    // Step 3: Fetch order details using orderDetail field
    try {
      const orderDetailId = orderData.orderDetail || id;
      console.log("Fetching order detail for ID:", orderDetailId);
      
      const detailRes = await APIConfig.get(`/api/order/orderdetail/${orderDetailId}`);
      console.log("Order detail response:", detailRes.data);
      
      const detailData: BackendOrderDetail = detailRes.data.data;
      if (detailData && detailData.order_items && Array.isArray(detailData.order_items)) {
        console.log("Processing order items:", detailData.order_items);
        
        // Transform order items to match interface
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
    
    console.log("Final transformed order:", transformedOrder);
    console.log("=== END FETCH ORDER BY ID ===");
    
    return transformedOrder;
  } catch (error) {
    console.error("Error in fetchOrderById:", error);
    throw error;
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
      status: "huỷ",
      cancelReason: reason 
    });
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    throw error;
  }
};

// Lấy thống kê đơn hàng
export const fetchOrderStats = async () => {
  const res = await APIConfig.get("/api/order/stats");
  return res.data;
};