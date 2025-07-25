import { IDistributor } from "@/interface/inventory/distributor.interface";
import APIConfig from "../api.config";
export const getAllDistributorAPI = async (
  page: number = 1,
  pageSize: number = 5
): Promise<{
  data: IDistributor[];
}> => {
  const response = await APIConfig.get(
    `/api/distributor?page=${page}&pageSize=${pageSize}`
  );
  return response.data.data;
};
export const getByIdDistributorAPI = async (
  distributor_id: string
): Promise<{ data: IDistributor }> => {
  const response = await APIConfig.get<{ data: IDistributor }>(
    `/api/distributor/${distributor_id}`
  );
  return response.data;
};
export const createDistributorAPI = async (payload: IDistributor) => {
  const res = await APIConfig.post(`/api/distributor/add-distributor`, payload);
  return res.data;
};
export const updateDistributorAPI = async (
  distributor_id: string,
  payload: IDistributor
): Promise<IDistributor> => {
  const res = await APIConfig.put(
    `/api/distributor/update-distributor/${distributor_id}`,
    payload
  );
  return res.data;
};
export const deleteDistributorAPI = (id: string) => {
  return APIConfig.delete(`/api/distributor/delete-distributor/${id}`);
};
