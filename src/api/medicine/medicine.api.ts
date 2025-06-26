import { IMedicine } from "../../interface/medicine/medicine.interface";
import APIConfig from "../api.config";

export const getAllMedicineAPI = async (): Promise<{ data: IMedicine[] }> => {
  const response = await APIConfig.get(`/api/medicine/`);
  return response.data as Promise<{ data: IMedicine[] }>;
};
export const getByIdMedicineAPI = async (
  id: string
): Promise<{ data: IMedicine }> => {
  try {
    const res = await APIConfig.get<{ data: IMedicine }>(`/api/medicine/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching medicine:", error);
    throw error;
  }
};
export const createMedicineAPI = async (
  medicine: IMedicine
): Promise<{ data: IMedicine }> => {
  const response = await APIConfig.post(`/api/medicine/`, medicine);
  return response.data as Promise<{ data: IMedicine }>;
};
export const updateMedicineAPI = async (
  id: string,
  medicine: IMedicine
): Promise<{ data: IMedicine }> => {
  const response = await APIConfig.put(`/api/medicine/${id}`, medicine);
  return response.data as Promise<{ data: IMedicine }>;
};
export const deleteMedicineAPI = async (
  id: string
): Promise<{ data: IMedicine }> => {
  const response = await APIConfig.delete(`/api/medicine/${id}`);
  return response.data as Promise<{ data: IMedicine }>;
};
