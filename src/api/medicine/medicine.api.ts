import APIConfig from "../api.config";

export const getMedicineAPI = async (id: string) => {
  const res = await APIConfig.get(`/api/medicine/${id}`);
  return res.data;
};
export const getALLMedicineAPI = async () => {
  const res = await APIConfig.get(`/api/medicine/`);
  return res.data;
};
