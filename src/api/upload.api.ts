import APIConfig from "./api.config";
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await APIConfig.post("/api/upload/single", formData);

  if (!res.data || !res.data.data) throw new Error("Upload failed");
  return res.data.data as string;
};
export const uploadMultipleToCloudinary = async (file: File): Promise<string[]> => {
  const formData = new FormData();
  formData.append("images", file); 

  const res = await APIConfig.post("/api/upload/multiple", formData); // <-- sửa ở đây
  if (!res.data || !res.data.data) throw new Error("Upload failed");
  return res.data.data as string[];
}
// export const uploadMultipleToCloudinary = async (
//   file: IUploadImageResponse
// ): Promise<string[]> => {
//   const res = await APIConfig.post("/api/upload/multiple", file);
//   if (!res.data) throw new Error("Upload failed");
//   return res.data as string[];
// };
