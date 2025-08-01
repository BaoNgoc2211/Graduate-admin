import { z } from "zod";

// Hàm cộng thêm 6 tháng
const addMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const importBatchSchema = z
  .object({
    batchNumber: z
      .string()
      .min(1, "Mã lô hàng không được để trống")
      .max(50, "Mã lô hàng không được quá 50 ký tự")
      .regex(/^[a-zA-Z0-9]+$/, "Chỉ gồm chữ và số")
      .toUpperCase()
      .transform((val) => val.trim()),

    distributor_id: z.string().min(1, "Nhà phân phối là bắt buộc"),
    importDate: z
      .date(),
      // .refine((date) => date <= new Date(), "Ngày nhập không được sau ngày hiện tại"),
    expiryDate: z
      .date()
      .refine((date) => date > new Date(), "Hạn sử dụng phải sau ngày nhập"),

    importPrice: z
      .number()
      .min(1000, "Giá nhập tối thiểu 1.000 VNĐ")
      .max(1_000_000_000, "Không vượt quá 1 tỷ")
      .refine((val) => !isNaN(val), "Giá phải là số hợp lệ"),

    status: z.enum(["expired", "out_of_stock", "discontinued", "in_stock"]),
  })
  .superRefine((data, ctx) => {
    const sixMonthsLater = addMonths(data.importDate, 6);
    if (data.expiryDate <= sixMonthsLater) {
      ctx.addIssue({
        path: ["expiryDate"],
        code: z.ZodIssueCode.custom,
        message: "Hạn sử dụng phải ít nhất sau ngày nhập 6 tháng",
      });
    }
  });
