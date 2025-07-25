// import { z } from "zod";
// export const medicineSchema = z.object({
//   code: z
//     .string()
//     .min(1, "Mã thuốc không được để trống")
//     .max(50, "Mã thuốc không được quá 50 ký tự")
//     .nonempty("Mã thuốc không được để trống")
//     .trim(),
//   name: z
//     .string()
//     .min(1, "Tên thuốc không được để trống")
//     .min(2, "Tên thuốc phải có ít nhất 2 ký tự")
//     .max(100, "Tên thuốc không được quá 100 ký tự")
//     // .regex(/^[\p{L}\s]+$/u, "Tên thuốc chỉ được chứa chữ cái và khoảng trắng")
//     .trim(),
//   thumbnail: z.string().url("Đường dẫn ảnh không hợp lệ").optional(),
//   image: z.array(z.string().url()).optional(),
//   packaging: z.string().min(1, "Đóng gói không được để trống").trim(),
//   dosageForm: z.string().min(1, "Dạng bào chế không được để trống").trim(),
//   use: z.string().min(1, "Cách dùng không được để trống").trim(),
//   dosage: z.string(),
//   indication: z.string().optional(),
//   adverse: z.string().default(" Chưa có thông tin về tác dụng phụ").optional(),
//   contraindication: z
//     .string()
//     .default(" Chưa có thông tin về chống chỉ định")
//     .optional(),
//   precaution: z.string().optional(),
//   ability: z
//     .string()
//     .default(" Chưa có thông tin về khả năng lái xe và vận hành máy móc")
//     .optional(),
//   pregnancy: z
//     .string()
//     .default(" Chưa có thông tin về thời kỳ mang thai và cho con bú")
//     .optional(),
//   drugInteractions: z
//     .string()

//     .default(" Chưa có thông tin về tương tác thuốc")
//     .optional(),
//   storage: z.string().max(500, "Bảo quản không được quá 500 ký tự").optional(),
//   note: z.string().max(500, "Ghi chú không được quá 500 ký tự").optional(),
//   age_group: z.string(),
//   // array(z.string().min(1, "Nhóm tuổi không được để trống")),
//   medCategory_id: z
//     // .array(z.string())
//     .array(z.string().uuid("ID cách sử dụng nhom thuốc không hợp lệ"))
//     .min(1, "Phải chọn ít nhất một danh mục thuốc"),
//   medUsage_id: z
//     .array(z.string().uuid("ID cách sử dụng thuốc không hợp lệ"))
//     // .string()
//     .min(1, "Phải chọn ít nhất một cách sử dụng thuốc"),
//   // manufacturer_: z
//   //   .string()
//   //   .min(1, "Nhà sản xuất không được để trống")
//   //   .max(100, "Nhà sản xuất không được quá 100 ký tự")
//   //   .trim(),
//   manufacturer_id: z.object({
//     _id: z.string(),
//     nameCo: z
//       .string()
//       .min(1, "Tên công ty sản xuất không được để trống")
//       .max(100, "Tên công ty sản xuất không được quá 100 ký tự")
//       .trim(),
//   }),
// });

// export type MedicineFormData = z.infer<typeof medicineSchema>;
import { z } from "zod";

export const medicineSchema = z.object({
  code: z
    .string()
    .min(1, "Mã thuốc không được để trống")
    .max(50, "Mã thuốc không được quá 50 ký tự")
    .trim(),
  name: z
    .string()
    .min(1, "Tên thuốc không được để trống")
    .min(2, "Tên thuốc phải có ít nhất 2 ký tự")
    .max(100, "Tên thuốc không được quá 100 ký tự")
    .trim(),
  thumbnail: z.string().url("Đường dẫn ảnh không hợp lệ").optional().or(z.literal("")),
  image: z.array(z.string().url()).optional(),
  packaging: z.string().min(1, "Đóng gói không được để trống").trim(),
  dosageForm: z.string().min(1, "Dạng bào chế không được để trống").trim(),
  use: z.string().min(1, "Cách dùng không được để trống").trim(),
  dosage: z.string().optional(),
  indication: z.string().optional(),
  adverse: z.string().default("Chưa có thông tin về tác dụng phụ").optional(),
  contraindication: z
    .string()
    .default("Chưa có thông tin về chống chỉ định")
    .optional(),
  precaution: z.string().optional(),
  ability: z
    .string()
    .default("Chưa có thông tin về khả năng lái xe và vận hành máy móc")
    .optional(),
  pregnancy: z
    .string()
    .default("Chưa có thông tin về thời kỳ mang thai và cho con bú")
    .optional(),
  drugInteractions: z
    .string()
    .default("Chưa có thông tin về tương tác thuốc")
    .optional(),
  storage: z.string().max(500, "Bảo quản không được quá 500 ký tự").optional(),
  note: z.string().max(500, "Ghi chú không được quá 500 ký tự").optional(),
  age_group: z.string().default("Tất cả"),
  
  // Sửa lại validation cho medCategory_id và medUsage_id
  // Không sử dụng .uuid() nữa vì có thể ID không phải là UUID
  medCategory_id: z
    .array(
      z.string()
        .min(1, "ID danh mục thuốc không hợp lệ")
        .refine((val) => val.trim().length > 0, "ID danh mục thuốc không được để trống")
    )
    .min(1, "Phải chọn ít nhất một danh mục thuốc"),
    
  medUsage_id: z
    .array(
      z.string()
        .min(1, "ID cách sử dụng thuốc không hợp lệ")
        .refine((val) => val.trim().length > 0, "ID cách sử dụng thuốc không được để trống")
    )
    .min(1, "Phải chọn ít nhất một cách sử dụng thuốc"),
    
  manufacturer_id: z.object({
    _id: z.string().min(1, "ID nhà sản xuất không được để trống"),
    nameCo: z
      .string()
      .min(1, "Tên công ty sản xuất không được để trống")
      .max(100, "Tên công ty sản xuất không được quá 100 ký tự")
      .trim(),
  }),
});

export type MedicineFormData = z.infer<typeof medicineSchema>;