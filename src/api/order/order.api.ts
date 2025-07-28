//#region version 1
// import { IOrder } from "@/interface/order/order.interface";
// import APIConfig from "../api.config";

// // Lấy tất cả đơn hàng (có thể truyền filter nếu muốn sau này)
// export const fetchAllOrders = async (): Promise<IOrder[]> => {
//   const res = await APIConfig.get("/api/order");
//   return res.data;
// };

// // Lọc đơn hàng theo trạng thái
// export const fetchOrdersByStatus = async (
//   status: string
// ): Promise<IOrder[]> => {
//   const res = await APIConfig.get(`/api/order/status/${status}`);
//   return res.data;
// };

// // Xem chi tiết đơn hàng
// export const fetchOrderById = async (id: string): Promise<IOrder> => {
//   const res = await APIConfig.get(`/api/order/orderdetail/${id}`);
//   return res.data;
// };

// // Cập nhật trạng thái đơn hàng (order chi tiết)
// export const updateOrderDetailStatus = async (
//   id: string,
//   status: IOrder["status"]
// ): Promise<void> => {
//   await APIConfig.put(`/api/order/orderdetail/${id}`, { status });
// };

// // Cập nhật trạng thái đơn hàng tổng
// export const updateOrderStatus = async (
//   id: string,
//   status: IOrder["status"]
// ): Promise<void> => {
//   await APIConfig.put(`/api/order/updatestatus/${id}`, { status });
// };
//#endregion
//#region version 3
// import { IOrder } from "@/interface/order/order.interface";
// import APIConfig from "../api.config";

// // Lấy tất cả đơn hàng (có thể truyền filter nếu muốn sau này)
// export const fetchAllOrders = async (): Promise<IOrder[]> => {
//   const res = await APIConfig.get("/api/order");
//   return res.data;
// };

// // Lọc đơn hàng theo trạng thái
// export const fetchOrdersByStatus = async (
//   status: string
// ): Promise<IOrder[]> => {
//   const res = await APIConfig.get(`/api/order/status/${status}`);
//   return res.data;
// };

// // Xem chi tiết đơn hàng
// export const fetchOrderById = async (id: string): Promise<IOrder> => {
//   const res = await APIConfig.get(`/api/order/orderdetail/${id}`);
//   return res.data;
// };

// // Cập nhật trạng thái đơn hàng (order chi tiết)
// export const updateOrderDetailStatus = async (
//   id: string,
//   status: IOrder["status"]
// ): Promise<void> => {
//   await APIConfig.put(`/api/order/orderdetail/${id}`, { status });
// };

// // Cập nhật trạng thái đơn hàng tổng
// export const updateOrderStatus = async (
//   id: string,
//   status: IOrder["status"]
// ): Promise<void> => {
//   await APIConfig.put(`/api/order/updatestatus/${id}`, { status });
// };

// // Hủy đơn hàng với lý do
// export const cancelOrder = async (
//   id: string,
//   reason: string
// ): Promise<void> => {
//   await APIConfig.put(`/api/order/cancel/${id}`, {
//     status: "Cancelled",
//     cancelReason: reason
//   });
// };

// // Lấy thống kê đơn hàng (nếu backend hỗ trợ)
// export const fetchOrderStats = async () => {
//   try {
//     const res = await APIConfig.get("/api/order/stats");
//     return res.data;
//   } catch ( error ) {
//     console.error("Lỗi khi lấy thống kê đơn hàng:", error);
//     // Nếu API không hỗ trợ, trả về null để tính toán ở client
//     return null;
//   }
// };
//#endregion
import { IOrder, BACKEND_STATUS_MAPPING } from "@/interface/order/order.interface";
import APIConfig from "../api.config";

// Helper functions để mapping status theo backend thực tế
const mapBackendToFrontend = (backendStatus: string): IOrder["status"] => {
  return BACKEND_STATUS_MAPPING[backendStatus as keyof typeof BACKEND_STATUS_MAPPING] as IOrder["status"] || backendStatus as IOrder["status"];
};

const mapFrontendToBackend = (frontendStatus: IOrder["status"]): string => {
  return BACKEND_STATUS_MAPPING[frontendStatus] || frontendStatus;
};

// Function để transform order object từ backend (handle response structure khác nhau)
const transformOrderFromBackend = (order: any): IOrder => {
  return {
    _id: order._id || order.orderId, // Backend có thể dùng orderId
    user_id: order.user_id || {
      _id: "",
      name: "Unknown User",
      email: "",
      phone: "",
      address: ""
    }, 
    orderItems: order.orderDetails || order.orderItems || [],
    totalAmount: order.totalAmount || 0,
    shippingFee: order.shippingFee || 0,
    discount: order.discount || 0,
    finalAmount: order.finalAmount || 0,
    status: mapBackendToFrontend(order.status), // Convert backend status
    paymentMethod: order.paymentMethod || "COD",
    shippingMethod: order.shippingMethod || "Standard",
    shippingAddress: order.shippingAddress || {
      name: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: ""
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

// Lấy tất cả đơn hàng (có thể truyền filter nếu muốn sau này)
export const fetchAllOrders = async (): Promise<IOrder[]> => {
  try {
    console.log("Fetching all orders...");
    const res = await APIConfig.get("/api/order/admin"); // Sửa endpoint theo backend
    console.log("API Response:", res.data);
    
    // Handle response structure {message, data}
    const responseData = res.data.data || res.data; // Backend có thể wrap trong data
    console.log("Response data:", responseData);
    
    if (Array.isArray(responseData)) {
      const transformedData = responseData.map(transformOrderFromBackend);
      console.log("Transformed data sample:", transformedData[0]);
      return transformedData;
    }
    
    console.warn("API response data is not an array:", responseData);
    return [];
  } catch (error) {
    console.error("Error in fetchAllOrders:", error);
    throw error;
  }
};

// Lọc đơn hàng theo trạng thái
export const fetchOrdersByStatus = async (
  status: string
): Promise<IOrder[]> => {
  try {
    console.log("Fetching orders by status:", status);
    
    // Chuyển đổi frontend status sang backend value theo mapping
    const backendStatus = mapFrontendToBackend(status as IOrder["status"]);
    console.log("Mapped status:", status, "->", backendStatus);
    
    // ✅ Sử dụng đúng endpoint admin và backend status
    const res = await APIConfig.get(`/api/order/admin/status/${backendStatus}`);
    console.log("API Response for status", status, ":", res.data);
    
    // ✅ Handle response structure {message, data}
    const responseData = res.data.data || res.data;
    
    if (Array.isArray(responseData)) {
      const transformedData = responseData.map(transformOrderFromBackend);
      console.log("Transformed orders by status:", transformedData);
      return transformedData;
    }
    return [];
  } catch (error) {
    console.error("Error in fetchOrdersByStatus:", error);
    throw error;
  }
};

// Xem chi tiết đơn hàng
export const fetchOrderById = async (id: string): Promise<IOrder> => {
  try {
    console.log("Fetching order by ID:", id);
    const res = await APIConfig.get(`/api/order/admin/${id}`); // ✅ Sửa endpoint
    console.log("Order detail response:", res.data);
    
    // Handle response structure
    const orderData = res.data.data || res.data;
    
    return transformOrderFromBackend(orderData);
  } catch (error) {
    console.error("Error in fetchOrderById:", error);
    throw error;
  }
};

// Cập nhật trạng thái đơn hàng (order chi tiết)
export const updateOrderDetailStatus = async (
  id: string,
  status: IOrder["status"]
): Promise<void> => {
  try {
    const backendStatus = mapFrontendToBackend(status);
    console.log("Updating order detail status:", status, "->", backendStatus);
    
    await APIConfig.put(`/api/order/admin/updatestatus/${id}`, { status: backendStatus }); // ✅ Sửa endpoint
  } catch (error) {
    console.error("Error in updateOrderDetailStatus:", error);
    throw error;
  }
};

// Cập nhật trạng thái đơn hàng tổng
export const updateOrderStatus = async (
  id: string,
  status: IOrder["status"]
): Promise<void> => {
  try {
    // ✅ Chuyển đổi frontend status sang backend value
    const backendStatus = mapFrontendToBackend(status);
    console.log("Updating order status:", status, "->", backendStatus);
    
    await APIConfig.put(`/api/order/admin/updatestatus/${id}`, { status: backendStatus }); // ✅ Sửa endpoint
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    throw error;
  }
};

// Hủy đơn hàng với lý do
export const cancelOrder = async (
  id: string,
  reason: string
): Promise<void> => {
  try {
    console.log("Cancelling order:", id, "with reason:", reason);
    
    await APIConfig.put(`/api/order/admin/cancel/${id}`, { // ✅ Sửa endpoint
      status: "huỷ", // ✅ Sử dụng backend value thực tế
      cancelReason: reason 
    });
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    throw error;
  }
};

// Lấy thống kê đơn hàng (nếu backend hỗ trợ)
export const fetchOrderStats = async () => {
  try {
    const res = await APIConfig.get("/api/order/stats");
    return res.data;
  } catch (error) {
    // Nếu API không hỗ trợ, trả về null để tính toán ở client
    return null;
  }
};