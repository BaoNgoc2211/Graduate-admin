import {
  IMedicineUsage,
  IMedicineUsageFilter,
  IMedicineUsagePayload,
} from "@/interface/medicine/usage.interface";
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
  const response = await APIConfig.put(
    `/api/medicine/usage/edit/${id}`,
    payload
  );
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
  try {
    // lấy tất cả nhóm thuốc
    const response = await APIConfig.get("/api/medicine/usage/");

    console.log("Medicine Usage API Response:", response.data);

    const usages: IMedicineUsage[] =
      response.data?.data?.data || response.data?.data || [];

    // Kiểm tra xem usages có phải là array không
    if (!Array.isArray(usages)) {
      console.warn("Usage data is not an array:", usages);
      throw new Error("Invalid data format");
    }

    // Tính toán thống kê từ dữ liệu thật
    const totalCategories = usages.length;
    const totalMedicines = usages.reduce((sum, usage) => {
      return sum + (usage.medicine?.length || 0);
    }, 0);
    const categoriesWithMedicines = usages.filter(
      (usage) => usage.medicine && usage.medicine.length > 0
    ).length;
    const emptyCategories = totalCategories - categoriesWithMedicines;

    return {
      data: {
        totalCategories,
        totalMedicines,
        categoriesWithMedicines,
        emptyCategories,
      },
    };
  } catch (error) {
    console.error("Error fetching medicine usage stats:", error);
    const fallbackData = {
      totalCategories: 0,
      totalMedicines: 0,
      categoriesWithMedicines: 0,
      emptyCategories: 0,
    };
    return { data: fallbackData };
  }
};

// Tìm kiếm danh mục thuốc
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
