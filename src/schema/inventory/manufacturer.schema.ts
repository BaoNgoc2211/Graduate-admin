import { z } from "zod";

// Không cho phép chữ số và ký tự đặc biệt
const noDigitsRegex = /^[^\d]*$/;
const noSpecialCharsRegex = /^[\p{L}\s]+$/u;

export const manufacturerSchema = z.object({
  nameCo: z
    .string()
    .min(1, "Tên công ty không được để trống")
    .max(100, "Tên công ty không được quá 100 ký tự")
    .regex(noDigitsRegex, "Không được chứa chữ số")
    .regex(noSpecialCharsRegex, "Không được chứa ký tự đặc biệt")
    .refine((val) => val.trim() !== "", "Không được chỉ toàn khoảng trắng"),

  country: z
    .string()
    .min(1, "Quốc gia không được để trống")
    .max(50, "Quốc gia không được quá 50 ký tự")
    .regex(noDigitsRegex, "Không được chứa chữ số")
    .regex(noSpecialCharsRegex, "Không được chứa ký tự đặc biệt"),

  branch: z
    .string()
    .min(1, "Tên thương hiệu không được để trống")
    .max(50, "Tên thương hiệu không được quá 50 ký tự")
    .regex(noDigitsRegex, "Không được chứa chữ số")
    .regex(noSpecialCharsRegex, "Không được chứa ký tự đặc biệt"),
});

export type ManufacturerFormType = z.infer<typeof manufacturerSchema>;
