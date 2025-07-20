import z from "zod";

export const purchaseSchema = z.object({
  purchaseId: z.string().min(1, "Mã đơn hàng không được để trống"),
  productId: z.string().min(1, "ID sản phẩm không được để trống"),
  date: z.date().refine((date) => date <= new Date()),
  quantity: z
    .number()
    .min(1, "Số lượng phải lớn hơn 0")
    .max(10000, "Số lượng không được quá 10.000"),
  purchaseDate: z.date().refine((date) => date <= new Date(), {
    message: "Ngày mua không được sau ngày hiện tại",
  }),
  totalPrice: z
    .number()
    .min(0, "Tổng giá không được âm")
    .max(1000000000, "Tổng giá không được quá 1 tỷ đồng"),
  status: z.enum(["pending", "completed", "cancelled"]),
});
