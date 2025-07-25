import { IManufacturer } from "@/interface/inventory/manufacture.interface";
import APIConfig from "../api.config";
export const getAllManufactureAPI = async (
  page: number = 1,
  pageSize: number = 20
): Promise<{
  data: IManufacturer[];
}> => {
  const response = await APIConfig.get(
    `/api/manufacture?page=${page}&pageSize=${pageSize}`
  );
  return response.data.data;
};
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
