import { uploadPrescriptionImage } from "@/api/upload.api";
import { IPrescriptionMedicine } from "@/interface/upload-purchase.interface";
import { useMutation } from "@tanstack/react-query";

// Upload 1 ảnh thường (trả về url)
// export const useUploadSingleImage = () => {
//   return useMutation({
//     mutationFn: useUploadSingleImage,
//   });
// };

// // Upload nhiều ảnh thường
// export const useUploadMultipleImages = () => {
//   return useMutation({
//     mutationFn: useUploadMultipleImages,
//   });
// };

// Upload đơn thuốc & nhận thông tin thuốc
export const useUploadPrescription = () => {
  return useMutation<IPrescriptionMedicine[], Error, File>({
    mutationFn: uploadPrescriptionImage,
  });
};
