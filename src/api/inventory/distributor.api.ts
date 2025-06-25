// import { IDistributor } from "@/interface/inventory/distributor.interface";
import { IDistributor } from "@/interface/inventory/distributor.interface";
import APIConfig from "../api.config";
export const getAllDistributorAPI = async (): Promise<{
  data: IDistributor[];
}> => {
  const response = await APIConfig.get(`/api/distributor/`);
  return response.data as Promise<{ data: IDistributor[] }>;
};
// export const getByIdDistributorAPI = async (
//   distributor_id: string
// ): Promise<{ data: IDistributor }> => {
//   const response = await APIConfig.get<{ data: IDistributor }>(
//     `/api/medicine/cate/${distributor_id}`
//   );
//   return response.data;
// };
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
export const deleteDistributorAPI = async (distributor_id: string) =>
  await APIConfig.delete(
    `/api/distributor/delete-distributor/${distributor_id}`
  );
