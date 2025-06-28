// import { IPurchase } from "@/interface/order/purchase.interface";
// import APIConfig from "../api.config";
// import type { IPurchaseOrder, IPurchaseOrderPayload } from "@/interface/purchase/purchase.interface"

import {
  IPurchaseOrder,
  IPurchaseOrderPayload,
} from "@/interface/order/purchase.interface";
import APIConfig from "../api.config";

// export const getAllPurchaseAPI = async (): Promise<{data: IPurchase[]}> => {
//   const response = await APIConfig.get("/api/purchase-order");
//   return response.data.data as Promise<{data: IPurchase[]}>;
// };

// export const getByIdPurchaseAPI = async (purchase_id: string): Promise<{data: IPurchase[]}> => {
//   const response = await APIConfig.get(`/api/purchase-order/${purchase_id}`);
//   return response.data.data;
// };
// export const createPurchaseOrderAPI = async (payload: IPurchaseOrderPayload): Promise<{ data: IPurchaseOrder }> => {
//   const response = await APIConfig.post(`/api/purchase-orders/`, payload)
//   return response.data
// }
// export const createPurchaseAPI = async (
//   data: Partial<IPurchase>
// ): Promise<IPurchase> => {
//   const response = await APIConfig.post("/api/purchase-order", data);
//   return response.data.data;
// };

// export const updatePurchase = async (
//   purchase_id: string,
//   data: Partial<IPurchase>
// ): Promise<IPurchase> => {
//   const response = await APIConfig.put(`/api/purchase-order/${purchase_id}`, data);
//   return response.data.data;
// };

// export const deletePurchase = async (purchase_id: string): Promise<void> => {
//   await APIConfig.delete(`/api/purchase-order/${purchase_id}`);
// };
// import APIConfig from "../api.config"
// import type { IPurchaseOrder, IPurchaseOrderPayload } from "@/interface/purchase/purchase.interface"

/**
 * Lấy danh sách tất cả phiếu nhập hàng
 */
export const getAllPurchaseOrdersAPI = async (): Promise<{
  data: IPurchaseOrder[];
}> => {
  const response = await APIConfig.get(`/api/purchase-order/`);
  return response.data;
};

/**
 * Lấy phiếu nhập hàng theo ID
 */
export const getPurchaseOrderByIdAPI = async (
  id: string
): Promise<{ data: IPurchaseOrder }> => {
  const response = await APIConfig.get(`/api/purchase-order/${id}`);
  return response.data;
};

/**
 * Tạo mới phiếu nhập hàng
 */
export const createPurchaseOrderAPI = async (
  payload: IPurchaseOrderPayload
): Promise<{ data: IPurchaseOrder }> => {
  const response = await APIConfig.post(`/api/purchase-order/`, payload);
  return response.data;
};

/**
 * Cập nhật phiếu nhập hàng
 */
export const updatePurchaseOrderAPI = async (
  id: string,
  payload: IPurchaseOrderPayload
): Promise<{ data: IPurchaseOrder }> => {
  const response = await APIConfig.put(`/api/purchase-order/${id}`, payload);
  return response.data;
};

/**
 * Xóa phiếu nhập hàng
 */
export const deletePurchaseOrderAPI = async (id: string): Promise<void> => {
  await APIConfig.delete(`/api/purchase-order/${id}`);
};
