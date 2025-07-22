import APIConfig from "../api.config";
import type {
  IMedicineCategory,
  IMedicineCategoryPayload,
  IMedicineCategoryFilter,
} from "@/interface/medicine/category.interface";

export const getAllMedicineCategoryAPI = async (): Promise<{
  data: IMedicineCategory[];
}> => {
  const response = await APIConfig.get("/api/medicine/cate/");
  return response.data;
};

export const getMedicineCategoryByIdAPI = async (
  id: string
): Promise<{ data: IMedicineCategory }> => {
  const response = await APIConfig.get(`/api/medicine/cate/${id}`);
  return response.data;
};

export const createMedicineCategoryAPI = async (
  payload: IMedicineCategoryPayload
): Promise<{ data: IMedicineCategory }> => {
  const response = await APIConfig.post("/api/medicine/cate/", payload);
  return response.data;
};

export const updateMedicineCategoryAPI = async (
  id: string,
  payload: IMedicineCategoryPayload
): Promise<{ data: IMedicineCategory }> => {
  const response = await APIConfig.put(`/api/medicine/cate/${id}`, payload);
  return response.data;
};

export const deleteMedicineCategoryAPI = async (id: string): Promise<void> => {
  await APIConfig.delete(`/api/medicine/cate/${id}`);
};

export const getMedicineCategoryStatsAPI = async (): Promise<{
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
  // const response = await APIConfig.get("/api/medicine/cate/stats");
  // return response.data;
};
/**
 * Tìm kiếm danh mục thuốc
 */
export const searchMedicineCategoriesAPI = async (
  filter: IMedicineCategoryFilter
): Promise<{ data: IMedicineCategory[]; total: number }> => {
  const params = new URLSearchParams();

  if (filter.search) params.append("search", filter.search);
  if (filter.isActive !== undefined)
    params.append("isActive", filter.isActive.toString());
  if (filter.sortBy) params.append("sortBy", filter.sortBy);
  if (filter.sortOrder) params.append("sortOrder", filter.sortOrder);
  if (filter.page) params.append("page", filter.page.toString());
  if (filter.limit) params.append("limit", filter.limit.toString());

  const response = await APIConfig.get(
    `/api/medicine/cate/search?${params.toString()}`
  );
  return response.data;
};
