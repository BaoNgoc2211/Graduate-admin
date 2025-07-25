import * as z from "zod";

export const voucherSchema = z
  .object({
    code: z
      .string()
      .min(3, "Mã voucher phải có ít nhất 3 ký tự")
      .max(20, "Mã voucher không được quá 20 ký tự"),
    name: z
      .string()
      .min(5, "Tên voucher phải có ít nhất 5 ký tự")
      .max(100, "Tên voucher không được quá 100 ký tự"),
    description: z
      .string()
      .min(10, "Mô tả phải có ít nhất 10 ký tự")
      .max(500, "Mô tả không được quá 500 ký tự"),
    discountType: z.enum(["PERCENTAGE", "FIXED"], {
      required_error: "Vui lòng chọn loại giảm giá",
    }),
    discountValue: z.number().min(1, "Giá trị giảm giá phải lớn hơn 0"),
    minOrderValue: z
      .number()
      .min(0, "Giá trị đơn hàng tối thiểu không được âm"),
    maxDiscountValue: z
      .number()
      .min(0, "Giá trị giảm giá tối đa không được âm"),
    usageLimit: z.number().min(1, "Giới hạn sử dụng phải lớn hơn 0"),
    startDate: z.date({
      required_error: "Vui lòng chọn ngày bắt đầu",
    }),
    endDate: z.date({
      required_error: "Vui lòng chọn ngày kết thúc",
    }),
    isActive: z.boolean(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      if (data.discountType === "PERCENTAGE") {
        return data.discountValue <= 100;
      }
      return true;
    },
    {
      message: "Phần trăm giảm giá không được vượt quá 100%",
      path: ["discountValue"],
    }
  );

export type VoucherFormData = z.infer<typeof voucherSchema>;
