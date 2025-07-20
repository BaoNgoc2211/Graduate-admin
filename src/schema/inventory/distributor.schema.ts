import { z } from "zod";

// Không cho phép chữ số và ký tự đặc biệt
const noDigitsRegex = /^[^\d]*$/;
const noSpecialCharsRegex = /^[\p{L}\s]+$/u;
export const distributorSchema = z.object({
  nameCo: z
    .string()
    .min(1, "Tên công ty không được để trống")
    .max(100, "Tên công ty không được quá 100 ký tự")
    .regex(noDigitsRegex, "Không được chứa chữ số")
    .refine((val) => val.trim() !== "", "Không được chỉ toàn khoảng trắng"),

  nameRep: z
    .string()
    .nonempty("Không được để trống")
    .max(50, "Tên đại diện không được quá 50 ký tự")
    .regex(noDigitsRegex, "Không được chứa chữ số")
    .regex(noSpecialCharsRegex, "Không được chứa ký tự đặc biệt"),

  email: z
    .string()
    .email("Email không hợp lệ")
    .max(100, "Email không được quá 100 ký tự"),

  // ^ — Bắt đầu chuỗi.
  // 0 — Bắt buộc bắt đầu bằng số 0.
  // [0-9\s]* — Cho phép các ký tự tiếp theo là số (0–9) hoặc khoảng trắng (\s), lặp lại 0 hoặc nhiều lần.
  // $ — Kết thúc chuỗi.
  phone: z
    .string()
    .min(10, "Số điện thoại không được ngắn hơn 10 ký tự")
    .max(15, "Số điện thoại không được quá 15 ký tự")
    .trim()
    .regex(
      /^0\d{9,14}$/,
      "Số điện thoại phải bắt đầu bằng 0 và chỉ được chứa chữ số"
    ),

  address: z
    .string()
    .nonempty("Không được để trống")
    .max(500, "Địa chỉ không được quá 500 ký tự")
    .trim(),

  country: z
    .string()
    .min(1, "Quốc gia không được để trống")
    .max(50, "Quốc gia không được quá 50 ký tự")
    .regex(noDigitsRegex, "Không được chứa chữ số")
    .regex(noSpecialCharsRegex, "Không được chứa ký tự đặc biệt"),
});
export type DistributorFormType = z.infer<typeof distributorSchema>;
