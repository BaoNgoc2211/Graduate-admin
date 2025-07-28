import {
  ICreateVoucherPayload,
  IVoucher,
  IVoucherResponse,
} from "@/interface/voucher.interface";
import APIConfig from "./api.config";

export const getAllVoucherAPI = async (
  page: number,
  pageSize: number
): Promise<IVoucherResponse> => {
  const response = await APIConfig.get<{ message: string; data: IVoucherResponse }>(
    `/api/voucher/getallvoucher?page=${page}&limit=${pageSize}`
  );

  return response.data.data;
};

export const getValidVoucherAPI = async (): Promise<{
  data: IVoucher[];
}> => {
  const response = await APIConfig.get(`/api/voucher/getvoucher`);
  return response.data as Promise<{ data: IVoucher[] }>;
};

export const getByIdVoucherAPI = async (
  voucher_id: string
): Promise<{ data: IVoucher }> => {
  const response = await APIConfig.get<{ data: IVoucher }>(
    `/api/voucher/cate/${voucher_id}`
  );
  return response.data;
};

export const createVoucherAPI = async (
  voucher: ICreateVoucherPayload
): Promise<{ data: IVoucher }> => {
  const response = await APIConfig.post(`/api/voucher/create-voucher`, voucher);
  return response.data as Promise<{ data: IVoucher }>;
};

export const updateVoucherAPI = async (
  id: string,
  voucher: ICreateVoucherPayload
): Promise<{ data: IVoucher }> => {
  const response = await APIConfig.put(
    `/api/voucher/updatevoucher/${id}`,
    voucher
  );
  return response.data as Promise<{ data: IVoucher }>;
};

export const deleteVoucherAPI = async (
  id: string
): Promise<{ data: IVoucher }> => {
  const response = await APIConfig.delete(`/api/voucher/deletevoucher/${id}`);
  return response.data as Promise<{ data: IVoucher }>;
};
