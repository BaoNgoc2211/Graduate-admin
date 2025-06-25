import APIConfig from "../api.config";
import { IMedicine } from "@/interface/medicine/medicine.interface";

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
