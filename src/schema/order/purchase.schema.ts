import { z } from "zod";

export const purchaseOrderSchema = z.object({
  supplierId: z.string().optional(),
  date_in: z
    .date({ required_error: "Vui lòng chọn ngày tạo đơn" })
    .refine((date) => date <= new Date()),
  expectedDeliveryDate: z.date().optional(),
  note: z.enum(["Nháp", "Ghi nợ", "Đã thanh toán"]).optional().default("Nháp"),
  medicines: z
    .array(
      z.object({
        medicine_id: z.string().min(1, "Vui lòng chọn thuốc"),
        quantity: z
          .number()
          .min(1, "Số lượng phải lớn hơn 0")
          .max(10000, "Số lượng không được quá 10.000 sản phẩm"),
        price: z
          .number()
          .min(0, "Đơn giá không thể âm")
          .max(1000000000, "Đơn giá không được quá 1 tỷ đồng"),
        CK_Rate: z.number().min(0).max(100).default(0),
        VAT_Rate: z.number().min(0).max(100).default(0),
        batch_id: z.string().optional(),
      })
    )
    .min(1, "Phải có ít nhất 1 thuốc"),
  totalAmount: z
    .number()
    .min(0, "Tổng tiền không được âm")
    .max(1000000000, "Tổng tiền không được quá 1 tỷ đồng")
    .optional(),
});

export type PurchaseOrderFormData = z.infer<typeof purchaseOrderSchema>;
