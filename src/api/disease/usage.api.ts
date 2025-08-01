import APIConfig from "@/api/api.config";
import { IDiseaseCategory } from "@/interface/disease/disease-category.interface";

export const getAllDiseaseUsageAPI = async (
  page: number = 1,
  pageSize: number = 5
): Promise<{
  data: IDiseaseCategory[];
}> => {
  const response = await APIConfig.get(
    `/api/disUsage/get-all?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const getByIdDiseaseUsageAPI = async (
  id: string
): Promise<{ data: IDiseaseCategory }> => {
  const response = await APIConfig.get(`/api/disUsage/${id}`);
  return response.data;
};

export const createDiseaseUsageAPI = async (payload: {
  name: string;
  icon: string;
}) => {
  const response = await APIConfig.post("/api/disUsage/create", payload);
  return response.data;
};

export const updateDiseaseUsageAPI = async (
  id: string,
  payload: {
    name?: string;
    icon?: string;
  }
): Promise<IDiseaseCategory> => {
  const response = await APIConfig.put(`/api/disUsage/update/${id}`, payload);
  return response.data;
};

export const deleteDiseaseUsageAPI = async (id: string) => {
  const response = await APIConfig.delete(`/api/disUsage/delete/${id}`);
  return response.data;
};
