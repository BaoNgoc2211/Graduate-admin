// import { IManufacturer } from "@/interface/inventory/manufacture.interface";
// import APIConfig from "../api.config";
// import { IImportBatch } from "@/interface/inventory/import-batch.interface";
// export const getAllImportBatchAPI = async (): Promise<{
//   data: IImportBatch[];
// }> => {
//   const response = await APIConfig.get(`/api/import-batch/`);
//   return response.data as Promise<{ data: IImportBatch[] }>;
// };
// // export const getByIdDistributorAPI = async (
// //   distributor_id: string
// // ): Promise<{ data: IDistributor }> => {
// //   const response = await APIConfig.get<{ data: IDistributor }>(
// //     `/api/medicine/cate/${distributor_id}`
// //   );
// //   return response.data;
// // };
// export const createImportBatchAPI = async (payload: IImportBatch) => {
//   const res = await APIConfig.post(
//     `/api/import-batch/add-import-batch`,
//     payload
//   );
//   return res.data;
// };
// export const updateImportBatchAPI = async (
//   importBatch_id: string,
//   payload: IImportBatch
// ): Promise<IManufacturer> => {
//   const res = await APIConfig.put(
//     `/api/import-batch/update-import-batch/${importBatch_id}`,
//     payload
//   );
//   return res.data;
// };
// export const updateImportBatchStatusAPI = async (
//   importBatch_id: string,
//   status: string
// ) => {
//   const res = await APIConfig.put(
//     `/api/import-batch/update-import-batch-status/${importBatch_id}`,
//     { status }
//   );
//   return res.data;
// };
// export const deleteImportBatchAPI = async (importBatch_id: string) =>
//   await APIConfig.delete(
//     `/api/import-batch/delete-import-batch/${importBatch_id}`
//   );
import APIConfig from "../api.config"
import type { IImportBatch, IImportBatchFormData } from "@/interface/inventory/import-batch.interface"

export const getAllImportBatchAPI = async (): Promise<{
  data: IImportBatch[]
}> => {
  const response = await APIConfig.get(`/api/import-batch/`)
  return response.data as Promise<{ data: IImportBatch[] }>
}

export const createImportBatchAPI = async (payload: IImportBatchFormData) => {
  const res = await APIConfig.post(`/api/import-batch/add-import-batch`, payload)
  return res.data
}

export const updateImportBatchAPI = async (batch_id: string, payload: IImportBatchFormData): Promise<IImportBatch> => {
  const res = await APIConfig.put(`/api/import-batch/update-import-batch/${batch_id}`, payload)
  return res.data
}

export const updateImportBatchStatusAPI = async (batch_id: string, status: string): Promise<IImportBatch> => {
  const res = await APIConfig.put(`/api/import-batch/update-status/${batch_id}`, { status })
  return res.data
}

export const deleteImportBatchAPI = async (batch_id: string) =>
  await APIConfig.delete(`/api/import-batch/delete-import-batch/${batch_id}`)
