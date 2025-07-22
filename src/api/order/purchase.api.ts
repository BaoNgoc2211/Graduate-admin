import { IImportBatch } from "@/interface/inventory/import-batch.interface";
import APIConfig from "../api.config";
import type {
  IPurchaseOrder,
  IPurchaseOrderPayload,
  IPurchaseOrderFilters,
  IPurchaseOrderResponse,
  ISupplier,
  IMedicine,
} from "@/interface/order/purchase.interface";

export const getAllPurchaseOrdersAPI = async (
  filters?: IPurchaseOrderFilters
): Promise<IPurchaseOrderResponse> => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.note && filters.note !== "all") params.append("note", filters.note);
  if (filters?.supplierId) params.append("supplierId", filters.supplierId);
  if (filters?.startDate) params.append("startDate", filters.startDate);
  if (filters?.endDate) params.append("endDate", filters.endDate);
  if (filters?.page) params.append("page", filters.page.toString());
  if (filters?.limit) params.append("limit", filters.limit.toString());

  const response = await APIConfig.get(
    `/api/purchase-order?${params.toString()}`
  );
  return response.data as IPurchaseOrderResponse;
};

export const getByIdPurchaseOrderAPI = async (
  id: string
): Promise<{ data: IPurchaseOrder }> => {
  const response = await APIConfig.get(`/api/purchase-order/${id}`);
  return response.data as { data: IPurchaseOrder };
};

export const createPurchaseOrderAPI = async (
  data: IPurchaseOrderPayload
): Promise<{ data: IPurchaseOrder }> => {
  const response = await APIConfig.post(`/api/purchase-order`, data);
  return response.data as { data: IPurchaseOrder };
};

export const updatePurchaseOrderAPI = async (
  id: string,
  data: IPurchaseOrderPayload
): Promise<{ data: IPurchaseOrder }> => {
  const response = await APIConfig.put(`/api/purchase-order/${id}`, data);
  return response.data as { data: IPurchaseOrder };
};

export const deletePurchaseOrderAPI = async (
  id: string
): Promise<{ data: IPurchaseOrder }> => {
  const response = await APIConfig.delete(`/api/purchase-order/${id}`);
  return response.data as { data: IPurchaseOrder };
};

export const getSuppliersAPI = async (): Promise<{ data: ISupplier[] }> => {
  const response = await APIConfig.get(`/api/distributor`);
  return response.data as { data: ISupplier[] };
};

export const getMedicinesAPI = async (
  search?: string
): Promise<{ data: IMedicine[] }> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);

  const response = await APIConfig.get(`/api/medicine?${params.toString()}`);
  return response.data as { data: IMedicine[] };
};
export const getAllImportBatchAPI = async (): Promise<{
  data: IImportBatch[];
}> => {
  const response = await APIConfig.get(`/api/import-batch`);
  return response.data;
};
