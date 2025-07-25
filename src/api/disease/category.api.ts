// import APIConfig from "../api.config";
// import { IDiseaseCategory } from "@/interface/disease/disease-category.interface";

// export const getAllDiseaseCategoryAPI = async (): Promise<{
//   data: IDiseaseCategory[];
// }> => {
//   const response = await APIConfig.get(`/api/disCategory/`);
//   return response.data as Promise<{ data: IDiseaseCategory[] }>;
// };

// export const getByIdDiseaseCategoryAPI = async (
//   disCategory_id: string
// ): Promise<{ data: IDiseaseCategory }> => {
//   const response = await APIConfig.get<{ data: IDiseaseCategory }>(
//     `/api/disCategory/${disCategory_id}`
//   );
//   return response.data;
// };
// export const createDiseaseCategoryAPI = async (payload: {
//   name: string;
//   icon: string;
// }) => {
//   const res = await APIConfig.post(`/api/disCategory`, payload);
//   return res.data;
// };
// export const updateDiseaseCategoryAPI = async (
//   disCategory_id: string,
//   payload: {
//     name: string;
//     icon: string;
//   }
// ): Promise<IDiseaseCategory> => {
//   const res = await APIConfig.put(
//     `/api/disCategory/${disCategory_id}`,
//     payload
//   );
//   return res.data;
// };
// export const deleteDiseaseCategoryAPI = async (disCategory_id: string) => {
//   const res = await APIConfig.delete(`/api/disCategory/${disCategory_id}`);
//   return res.data;
// };
import APIConfig from "@/api/api.config";
import { IDiseaseCategory } from "@/interface/disease/disease-category.interface";

export const getAllDiseaseCategoryAPI = async (): Promise<{
  data: IDiseaseCategory[];
}> => {
  const response = await APIConfig.get("/api/disCategory");
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
  const response = await APIConfig.post("/api/disCategory", payload);
  return response.data;
};

export const updateDiseaseCategoryAPI = async (
  id: string,
  payload: {
    name?: string;
    icon?: string;
  }
): Promise<IDiseaseCategory> => {
  const response = await APIConfig.put(`/api/disCategory/${id}`, payload);
  return response.data;
};

export const deleteDiseaseCategoryAPI = async (id: string) => {
  const response = await APIConfig.delete(`/api/disCategory/${id}`);
  return response.data;
};
