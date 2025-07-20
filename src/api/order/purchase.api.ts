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
//#region version new 
// import type {
//   IPurchaseEntry,
//   ICreatePurchaseEntry,
//   IPurchaseFilter,
//   IPurchaseStats,
//   IMedicine,
//   IImportBatch,
// } from "@/interface/order/purchase.interface"
// import APIConfig from "../api.config"

// // Purchase Entry APIs
// export const getPurchaseEntries = async (filters?: IPurchaseFilter): Promise<{ data: IPurchaseEntry[] }> => {
//   const params = new URLSearchParams()
//   if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom)
//   if (filters?.dateTo) params.append("dateTo", filters.dateTo)
//   if (filters?.supplier) params.append("supplier", filters.supplier)
//   if (filters?.status) params.append("status", filters.status)
//   if (filters?.search) params.append("search", filters.search)

//   const res = await APIConfig.get(`/api/purchase-order?${params.toString()}`)
//   return res.data
// }

// export const getPurchaseEntry = async (id: string): Promise<{ data: IPurchaseEntry }> => {
//   const res = await APIConfig.get(`/api/purchase-order/${id}`)
//   return res.data
// }

// export const createPurchaseEntry = async (data: ICreatePurchaseEntry): Promise<{ data: IPurchaseEntry }> => {
//   const res = await APIConfig.post("/api/purchase-order", data)
//   return res.data
// }

// export const updatePurchaseEntry = async (
//   id: string,
//   data: Partial<ICreatePurchaseEntry>,
// ): Promise<{ data: IPurchaseEntry }> => {
//   const res = await APIConfig.put(`/purchase/purchase-order/${id}`, data)
//   return res.data
// }

// export const deletePurchaseEntry = async (id: string): Promise<void> => {
//   await APIConfig.delete(`/purchase/purchase-order/${id}`)
// }

// export const approvePurchaseEntry = async (id: string): Promise<{ data: IPurchaseEntry }> => {
//   const res = await APIConfig.post(`/purchase/purchase-order/${id}/approve`)
//   return res.data
// }

// export const rejectPurchaseEntry = async (id: string, reason?: string): Promise<{ data: IPurchaseEntry }> => {
//   const res = await APIConfig.post(`/purchase/purchase-order/${id}/reject`, { reason })
//   return res.data
// }

// // Statistics API
// export const getPurchaseStats = async (): Promise<{ data: IPurchaseStats }> => {
//   const res = await APIConfig.get("/purchase/stats")
//   return res.data
// }

// // Medicine APIs
// export const getMedicines = async (search?: string): Promise<{ data: IMedicine[] }> => {
//   const params = search ? `?search=${encodeURIComponent(search)}` : ""
//   const res = await APIConfig.get(`/medicines${params}`)
//   return res.data
// }

// export const createMedicine = async (data: Omit<IMedicine, "_id">): Promise<{ data: IMedicine }> => {
//   const res = await APIConfig.post("/medicines", data)
//   return res.data
// }

// // Import Batch APIs
// export const getImportBatches = async (medicineId?: string): Promise<{ data: IImportBatch[] }> => {
//   const params = medicineId ? `?medicine=${medicineId}` : ""
//   const res = await APIConfig.get(`/import-batches${params}`)
//   return res.data
// }

// export const createImportBatch = async (data: Omit<IImportBatch, "_id">): Promise<{ data: IImportBatch }> => {
//   const res = await APIConfig.post("/import-batches", data)
//   return res.data
// }

// // Suppliers API
// export const getSuppliers = async (): Promise<{ data: Array<{ _id: string; name: string; contact?: string }> }> => {
//   const res = await APIConfig.get("/suppliers")
//   return res.data
// }

// // Export API
// export const exportPurchaseEntries = async (filters?: IPurchaseFilter): Promise<Blob> => {
//   const params = new URLSearchParams()
//   if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom)
//   if (filters?.dateTo) params.append("dateTo", filters.dateTo)
//   if (filters?.supplier) params.append("supplier", filters.supplier)
//   if (filters?.status) params.append("status", filters.status)

//   const res = await APIConfig.get(`/purchase/entries/export?${params.toString()}`, {
//     responseType: "blob",
//   })
//   return res.data
// }
//#endregion
