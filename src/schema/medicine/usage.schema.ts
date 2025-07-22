import z from "zod";

export const MedicineUsageSchema = z.object({
  name: z
    .string()
    .min(1, "Tên cách dùng không được để trống")
    .min(2, "Tên cách dùng phải có ít nhất 2 ký tự")
    .max(100, "Tên cách dùng không được quá 100 ký tự")
    .regex(/^[\p{L}\s]+$/u, "Tên cách dùng chỉ được chứa chữ cái và khoảng trắng")
    .trim(),
  isActive: z.boolean(),
})
export type MedicineUsageFormData = z.infer<typeof MedicineUsageSchema>;