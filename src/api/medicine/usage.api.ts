import { IMedicineUsageGroup } from "@/interface/medicine/usage.interface";
import APIConfig from "../api.config";

export const getAllMedicineUsageAPI = async (): Promise<{
  data: IMedicineUsageGroup[];
}> => {
  const res = await APIConfig.get(`/api/medicine/usage/`);
  return res.data.data;
};

export const getByIdMedicineUsageAPI = async (
  medUsageGroup_id: string
): Promise<{ data: IMedicineUsageGroup }> => {
  const response = await APIConfig.get<{ data: IMedicineUsageGroup }>(
    `/api/medicine/usage/${medUsageGroup_id}`
  );
  return response.data;
};

export const createMedicineUsageAPI = async (payload: {
  name: string;
  icon: string;
}) => {
  const res = await APIConfig.post(`/api/medicine/usage/add`, payload);
  return res.data;
};
export const updateMedicineUsageAPI = async (
  medUsage_id: string,
  payload: {
    name: string;
    icon: string;
  }
): Promise<IMedicineUsageGroup> => {
  const res = await APIConfig.put(
    `/api/medicine/usage/edit/${medUsage_id}`,
    payload
  );
  return res.data;
};
export const deleteMedUsageAPI = async (id: string) => {
  const res = await APIConfig.delete(`/api/medicine/usage/edit${id}`);
  return res.data;
};
