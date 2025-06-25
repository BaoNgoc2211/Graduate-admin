import { IMedicineCategory } from "@/interface/medicine/category.interface";
import APIConfig from "../api.config";

export const getAllMedicineCategoryAPI = async (): Promise<{
  data: IMedicineCategory[];
}> => {
  const response = await APIConfig.get(`/api/medicine/cate`);
  return response.data as Promise<{ data: IMedicineCategory[] }>;
};

export const getByIdMedicineCategoryAPI = async (
  medCategory_id: string
): Promise<{ data: IMedicineCategory }> => {
  const response = await APIConfig.get<{ data: IMedicineCategory }>(
    `/api/medicine/cate/${medCategory_id}`
  );
  return response.data;
};
export const createMedicineCategoryAPI = async (payload: {
  name: string;
  icon: string;
}) => {
  const res = await APIConfig.post(`/api/medicine/cate`, payload);
  return res.data;
};
export const updateMedicineCategoryAPI = async (
  medCategory_id: string,
  payload: {
    name: string;
    icon: string;
  }
): Promise<IMedicineCategory> => {
  const res = await APIConfig.put(
    `/api/medicine/cate/${medCategory_id}`,
    payload
  );
  return res.data;
};
export const deleteMedicineCategoryAPI = async (
  medCategory_id: string
) => {
  const res = await APIConfig.delete(`/api/medicine/usage/remove/${medCategory_id}`);
  return res.data;
};
