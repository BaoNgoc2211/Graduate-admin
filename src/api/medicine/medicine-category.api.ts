import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";
import APIConfig from "../api.config";

export const getMedCategoryAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/medicine/cate/${id}`);
  return res.data;
};
export const getALLMedCategoryAPI = async () => {
  const res = await APIConfig.get(`/api/medicine/cate`);
  return res.data;
};
export const createMedCategoryAPI = async (data: IMedicineCategory) => {
  const res = await APIConfig.post(`/api/medicine/cate`, data);
  return res.data;
};
