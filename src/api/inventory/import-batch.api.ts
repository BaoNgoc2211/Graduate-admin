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
