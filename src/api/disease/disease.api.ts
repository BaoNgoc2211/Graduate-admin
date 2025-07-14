// import APIConfig from "../api.config";
// import { IDisease } from "@/interface/disease/disease.interface";

// export const getAllDiseaseAPI = async (): Promise<{
//   data: IDisease[];
// }> => {
//   const response = await APIConfig.get(`/api/disease`);
//   return response.data as Promise<{ data: IDisease[] }>;
// };

// export const getByIdDiseaseAPI = async (
//   disease_id: string
// ): Promise<{ data: IDisease }> => {
//   const response = await APIConfig.get<{ data: IDisease }>(
//     `/api/disease/${disease_id}`
//   );
//   return response.data;
// };

// export const createDiseaseAPI = async (
//   disease: IDisease
// ): Promise<{ data: IDisease }> => {
//   const response = await APIConfig.post(`/api/disease`, disease);
//   return response.data as Promise<{ data: IDisease }>;
// };

// export const updateDiseaseAPI = async (
//   id: string,
//   disease: IDisease
// ): Promise<{ data: IDisease }> => {
//   const response = await APIConfig.put(`/api/disease/${id}`, disease);
//   return response.data as Promise<{ data: IDisease }>;
// };

// export const deleteDiseaseAPI = async (
//   id: string
// ): Promise<{ data: IDisease }> => {
//   const response = await APIConfig.delete(`/api/disease/${id}`);
//   return response.data as Promise<{ data: IDisease }>;
// };
import APIConfig from "@/api/api.config"
import type { IDisease } from "@/interface/disease/disease.interface"

export const getAllDiseasesAPI = async (): Promise<{
  data: IDisease[]
}> => {
  const response = await APIConfig.get("/api/disease")
  return response.data
}

export const getDiseaseByIdAPI = async (id: string): Promise<{ data: IDisease }> => {
  const response = await APIConfig.get(`/api/disease/${id}`)
  return response.data
}

export const createDiseaseAPI = async (payload: Omit<IDisease, "_id">): Promise<{ data: IDisease }> => {
  const response = await APIConfig.post("/api/disease", payload)
  return response.data
}

export const updateDiseaseAPI = async (
  id: string,
  payload: Partial<Omit<IDisease, "_id">>,
): Promise<{ data: IDisease }> => {
  const response = await APIConfig.put(`/api/disease/${id}`, payload)
  return response.data
}

export const deleteDiseaseAPI = async (id: string): Promise<void> => {
  const response = await APIConfig.delete(`/api/disease/${id}`)
  return response.data
}
