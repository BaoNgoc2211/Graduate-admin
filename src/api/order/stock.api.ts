import APIConfig from "../api.config";
import { IStock } from "@/interface/order/stock.interface";

export const getAllStockAPI = async (): Promise<{
  data: IStock[];
}> => {
  const response = await APIConfig.get(`/api/stock`);
  // return response.data as Promise<{ data: IStock[] }>;
  return response.data.data;
};
export const getLowStockAPI = async (): Promise<{
  data: IStock;
}> => {
  const response = await APIConfig.get<{ data: IStock }>(`/api/stock/lowstock`);
  return response.data;
};
// export const getByMedicineStockAPI = async (
//   medicine_id: string
// ): Promise<{ data: IStock }> => {
//   const response = await APIConfig.get<{ data: IStock }>(
//     `/api/stock/medicine/${medicine_id}`
//   );
//   return response.data;
// };
export const getByMedicineStockAPI = async (
  medicineId: string
): Promise<{ data: IStock[] }> => {
  const res = await APIConfig.get<{ data: IStock[] }>(
    `/api/stock/medicine/${medicineId}`
  );
  return res.data;
};
