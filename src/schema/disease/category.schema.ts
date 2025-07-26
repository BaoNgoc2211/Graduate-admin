import { z } from "zod";
// Không cho phép chữ số và ký tự đặc biệt
const noDigitsRegex = /^[^\d]*$/;
const noSpecialCharsRegex = /^[\p{L}\s]+$/u;
export const diseaseCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Tên nhóm bệnh không được để trống")
    .max(100, "Tên nhóm bệnh không được quá 100 ký tự")
    .regex(noDigitsRegex, "Tên nhóm bệnh không được chứa chữ số")
    .regex(noSpecialCharsRegex, "Tên nhóm bệnh không được chứa ký tự đặc biệt")
    .trim(),

  icon: z
    .string()
    .min(1, "Icon không được để trống")
    .max(500, "Icon không được quá 500 ký tự")
    .trim(),
});
