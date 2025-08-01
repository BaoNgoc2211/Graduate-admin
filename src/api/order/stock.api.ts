// import APIConfig from "../api.config";
// import { IStock } from "@/interface/order/stock.interface";

// export const getAllStockAPI = async (): Promise<{
//   data: IStock[];
// }> => {
//   const response = await APIConfig.get(`/api/stock`);
//   // return response.data as Promise<{ data: IStock[] }>;
//   return response.data.data;
// };
// export const getLowStockAPI = async (): Promise<{
//   data: IStock[];
// }> => {
//   const response = await APIConfig.get<{ data: IStock[] }>(`/api/stock/lowstock`);
//   return response.data;
// };
// // export const getByMedicineStockAPI = async (
// //   medicine_id: string
// // ): Promise<{ data: IStock }> => {
// //   const response = await APIConfig.get<{ data: IStock }>(
// //     `/api/stock/medicine/${medicine_id}`
// //   );
// //   return response.data;
// // };
// export const getByMedicineStockAPI = async (
//   medicineId: string
// ): Promise<{ data: IStock[] }> => {
//   const res = await APIConfig.get<{ data: IStock[] }>(
//     `/api/stock/medicine/${medicineId}`
//   );
//   return res.data;
// };
import { IStockApiResponse, IStock } from "@/interface/order/stock.interface";
import APIConfig from "../api.config";

// Get all stocks with pagination
export const getAllStockAPI = async (
  page: number = 1, 
  limit: number = 10
): Promise<IStockApiResponse> => {
  try {
    const response = await APIConfig.get(`/api/stock?page=${page}&limit=${limit}`);
    
    // Handle nested data structure from your API
    if (response.data.data && response.data.data.data) {
      return {
        success: true,
        message: response.data.message || "Success",
        data: response.data.data.data, // Extract nested data
        totalItems: response.data.data.totalItems,
        totalPages: response.data.data.totalPages,
        currentPage: response.data.data.currentPage || page,
      };
    }
    
    // Handle direct data structure
    if (response.data.success !== undefined) {
      return response.data as IStockApiResponse;
    }
    
    // Fallback for other structures
    return {
      success: true,
      message: "Success",
      data: Array.isArray(response.data) ? response.data : response.data.data || [],
      totalItems: response.data.totalItems,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage || page,
    };
  } catch (error) {
    console.error("getAllStockAPI error:", error);
    throw error;
  }
};

// Get stock by medicine ID
export const getByMedicineStockAPI = async (
  medicineId: string
): Promise<IStockApiResponse> => {
  try {
    const response = await APIConfig.get(`/api/stock/medicine/${medicineId}`);
    
    // Handle nested data structure
    if (response.data.data && response.data.data.data) {
      return {
        success: true,
        message: response.data.message || "Success",
        data: response.data.data.data,
      };
    }
    
    // Handle direct data structure
    if (response.data.success !== undefined) {
      return response.data as IStockApiResponse;
    }
    
    // Fallback
    return {
      success: true,
      message: "Success",
      data: Array.isArray(response.data) ? response.data : response.data.data || [],
    };
  } catch (error) {
    console.error("getByMedicineStockAPI error:", error);
    throw error;
  }
};

// Get low stock items
export const getLowStockAPI = async (): Promise<IStockApiResponse> => {
  try {
    const response = await APIConfig.get("/api/stock/lowstock");
    
    // Handle nested data structure
    if (response.data.data && response.data.data.data) {
      return {
        success: true,
        message: response.data.message || "Success",
        data: response.data.data.data,
      };
    }
    
    if (response.data.success !== undefined) {
      return response.data as IStockApiResponse;
    }
    
    return {
      success: true,
      message: "Success",
      data: Array.isArray(response.data) ? response.data : response.data.data || [],
    };
  } catch (error) {
    console.error("getLowStockAPI error:", error);
    throw error;
  }
};

// Create new stock
export const createStockAPI = async (stockData: Partial<IStock>): Promise<IStockApiResponse> => {
  try {
    const response = await APIConfig.post("/api/stock", stockData);
    return response.data as IStockApiResponse;
  } catch (error) {
    console.error("createStockAPI error:", error);
    throw error;
  }
};

// Update stock
export const updateStockAPI = async (
  stockId: string, 
  stockData: Partial<IStock>
): Promise<IStockApiResponse> => {
  try {
    const response = await APIConfig.put(`/api/stock/${stockId}`, stockData);
    return response.data as IStockApiResponse;
  } catch (error) {
    console.error("updateStockAPI error:", error);
    throw error;
  }
};

// Delete stock
export const deleteStockAPI = async (stockId: string): Promise<IStockApiResponse> => {
  try {
    const response = await APIConfig.delete(`/api/stock/${stockId}`);
    return response.data as IStockApiResponse;
  } catch (error) {
    console.error("deleteStockAPI error:", error);
    throw error;
  }
};

// Get stock statistics
export const getStockStatsAPI = async (): Promise<{
  success: boolean;
  data: {
    totalItems: number;
    totalQuantity: number;
    averagePrice: number;
    lowStockItems: number;
    expiringSoonItems: number;
  };
}> => {
  try {
    const response = await APIConfig.get("/api/stock/stats");
    return response.data;
  } catch (error) {
    console.error("getStockStatsAPI error:", error);
    throw error;
  }
};