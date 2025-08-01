import APIConfig from "@/api/api.config";
import type { IDisease } from "@/interface/disease/disease.interface";

export const getAllDiseasesAPI = async (): Promise<{
  data: IDisease[];
}> => {
  const response = await APIConfig.get("/api/disease");
  return response.data.data;
};

export const getDiseaseByIdAPI = async (
  id: string
): Promise<{ data: IDisease }> => {
  const response = await APIConfig.get(`/api/disease/detail/${id}`);
  return response.data;
};

export const createDiseaseAPI = async (
  payload: Omit<IDisease, "_id">
): Promise<{ data: IDisease }> => {
  const response = await APIConfig.post("api/disease/create", payload);
  return response.data;
};

export const updateDiseaseAPI = async (
  id: string,
  payload: Partial<Omit<IDisease, "_id">>
): Promise<{ data: IDisease }> => {
  const response = await APIConfig.put(`/api/disease/update/${id}`, payload);
  return response.data;
};

export const deleteDiseaseAPI = async (id: string): Promise<void> => {
  const response = await APIConfig.delete(`/api/disease/delete/${id}`);
  return response.data;
};
