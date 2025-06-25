import { IManufacturer } from "@/interface/inventory/manufacture.interface";
import APIConfig from "../api.config";
export const getAllManufactureAPI = async (): Promise<{
  data: IManufacturer[];
}> => {
  const response = await APIConfig.get(`/api/manufacture/`);
  return response.data as Promise<{ data: IManufacturer[] }>;
};
// export const getByIdDistributorAPI = async (
//   distributor_id: string
// ): Promise<{ data: IDistributor }> => {
//   const response = await APIConfig.get<{ data: IDistributor }>(
//     `/api/medicine/cate/${distributor_id}`
//   );
//   return response.data;
// };
export const createManufactureAPI = async (payload: IManufacturer) => {
  const res = await APIConfig.post(`/api/manufacture/add-manufacture`, payload);
  return res.data;
};
export const updateManufactureAPI = async (
  manufacture_id: string,
  payload: IManufacturer
): Promise<IManufacturer> => {
  const res = await APIConfig.put(
    `/api/manufacture/update-manufacture/${manufacture_id}`,
    payload
  );
  return res.data;
};
export const deleteManufactureAPI = async (manufacture_id: string) =>
  await APIConfig.delete(
    `/api/manufacture/delete-manufacture/${manufacture_id}`
  );
