import { IMedicineUsage, IMedicineUsageFilter, IMedicineUsagePayload } from "@/interface/medicine/usage.interface";
import APIConfig from "../api.config";


export const getAllMedicineUsageAPI = async (): Promise<{
  data: IMedicineUsage[];
}> => {
  const response = await APIConfig.get("/api/medicine/usage/");
  return response.data.data;
};

export const getMedicineUsageByIdAPI = async (
  id: string
): Promise<{ data: IMedicineUsage }> => {
  const response = await APIConfig.get(`/api/medicine/usage/${id}`);
  return response.data;
};

export const createMedicineUsageAPI = async (
  payload: IMedicineUsagePayload
): Promise<{ data: IMedicineUsage }> => {
  const response = await APIConfig.post("/api/medicine/usage/add/", payload);
  return response.data;
};

export const updateMedicineUsageAPI = async (
  id: string,
  payload: IMedicineUsagePayload
): Promise<{ data: IMedicineUsage }> => {
  const response = await APIConfig.put(`/api/medicine/usage/edit/${id}`, payload);
  return response.data;
};

export const deleteMedicineUsageAPI = async (id: string): Promise<void> => {
  await APIConfig.delete(`/api/medicine/usage/remove/${id}`);
};

export const getMedicineUsageStatsAPI = async (): Promise<{
  data: {
    totalCategories: number;
    totalMedicines: number;
    categoriesWithMedicines: number;
    emptyCategories: number;
  };
}> => {
  // Dữ liệu ảo
  const mockData = {
    totalCategories: 8,
    totalMedicines: 65,
    categoriesWithMedicines: 6,
    emptyCategories: 2,
  };

  return Promise.resolve({ data: mockData });
};
/**
 * Tìm kiếm danh mục thuốc
 */
export const searchMedicineUsageAPI = async (
  filter: IMedicineUsageFilter
): Promise<{ data: IMedicineUsage[]; total: number }> => {
  const params = new URLSearchParams();

  if (filter.search) params.append("search", filter.search);
  if (filter.isActive !== undefined)
    params.append("isActive", filter.isActive.toString());
  if (filter.sortBy) params.append("sortBy", filter.sortBy);
  if (filter.sortOrder) params.append("sortOrder", filter.sortOrder);
  if (filter.page) params.append("page", filter.page.toString());
  if (filter.limit) params.append("limit", filter.limit.toString());

  const response = await APIConfig.get(
    `/api/medicine/usage/search?${params.toString()}`
  );
  return response.data;
};
