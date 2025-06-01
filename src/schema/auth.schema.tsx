import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Vui lòng nhập email")
    .email("Địa chỉ email không hợp lệ"),
  password: z
    .string()
    .min(6, "Password phải ít nhất 6 ký tự")
    .max(20, "Password tối đa 20 ký tự"),
});
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
