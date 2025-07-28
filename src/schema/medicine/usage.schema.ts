import { z } from "zod";
export const MedicineUsageSchema = z.object({
  name: z
    .string()
    .min(1, "Tên loại thuốc không được để trống")
    .min(2, "Tên danh mục phải có ít nhất 2 ký tự")
    .max(100, "Tên loại thuốc không được quá 100 ký tự")
    .regex(
      /^[\p{L}\s]+$/u,
      "Tên loại thuốc chỉ được chứa chữ cái và khoảng trắng"
    )
    .trim(),
  icon: z
    .string()
    .min(1, "Ảnh danh mục là bắt buộc")
    .url("Đường dẫn ảnh không hợp lệ"),
  isActive: z.boolean(),
});

export type MedicineUsageFormData = z.infer<typeof MedicineUsageSchema>;
