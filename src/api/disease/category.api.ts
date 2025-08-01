import APIConfig from "@/api/api.config";
import { IDiseaseCategory } from "@/interface/disease/disease-category.interface";

export const getAllDiseaseCategoryAPI = async (
  page: number = 1,
  pageSize: number = 5
): Promise<{
  data: IDiseaseCategory[];
}> => {
  const response = await APIConfig.get(
    `/api/disCategory/getAll?page=${page}&pageSize=${pageSize}`
  );
  return response.data.data;
};

export const getByIdDiseaseCategoryAPI = async (
  id: string
): Promise<{ data: IDiseaseCategory }> => {
  const response = await APIConfig.get(`/api/disCategory/${id}`);
  return response.data;
};

export const createDiseaseCategoryAPI = async (payload: {
  name: string;
  icon: string;
}) => {
  const response = await APIConfig.post("/api/disCategory/create", payload);
  return response.data;
};

export const updateDiseaseCategoryAPI = async (
  id: string,
  payload: {
    name?: string;
    icon?: string;
  }
): Promise<IDiseaseCategory> => {
  const response = await APIConfig.put(`/api/disCategory/update/${id}`, payload);
  return response.data;
};

export const deleteDiseaseCategoryAPI = async (id: string) => {
  const response = await APIConfig.delete(`/api/disCategory/delete/${id}`);
  return response.data;
};
