// export interface IMedicine {
//   code: string;
//   name: string;
//   dosageForm: string;
//   quantity: number;
//   sellingPrice: number;
// }
/**
 * Interface định nghĩa cấu trúc dữ liệu của thuốc
 */
export interface IMedicine {
  _id?: string;
  code: string; // Mã thuốc
  name: string; // Tên thuốc
  dosageForm: string; // Dạng bào chế
  quantity: number; // Số lượng
  sellingPrice: number; // Giá bán
  thumbnail: string; // Ảnh đại diện
  image?: string[]; // Danh sách ảnh
  packaging: string; // Đóng gói
  use: string; // Cách dùng
  dosage?: string; // Liều dùng
  indication?: string; // Công dụng
  adverse?: string; // Tác dụng phụ
  contraindication?: string; // Chống chỉ định
  precaution?: string; // Thận trọng khi sử dụng
  ability?: string; // Khả năng lái xe và vận hành máy móc
  pregnancy?: string; // Thời kỳ mang thai và cho con bú
  drugInteractions?: string; // Tương tác thuốc
  storage?: string; // Bảo quản
  active: string; // Hoạt chất
  note: string; // Ghi chú
  age_group: string; // Nhóm tuổi
  medCategory_id: string[]; // Danh mục thuốc
  medUsage_id: string[]; // Cách sử dụng
  manufacturer_id:
    | string
    | {
        _id: string;
        nameCo: string;
        country: string;
      }; // ID nhà sản xuất hoặc object nhà sản xuất
}

/**
 * Interface cho form data (khi tạo/cập nhật chỉ cần gửi ID)
 */
export interface IMedicineFormData {
  _id?: string;
  code: string;
  name: string;
  dosageForm: string;
  quantity: number;
  sellingPrice: number;
  thumbnail: string;
  image?: string[];
  packaging: string;
  use: string;
  dosage?: string;
  indication?: string;
  adverse?: string;
  contraindication?: string;
  precaution?: string;
  ability?: string;
  pregnancy?: string;
  drugInteractions?: string;
  storage?: string;
  active: string;
  note: string;
  age_group: string;
  medCategory_id: string[];
  medUsage_id: string[];
  manufacturer_id: string; // Chỉ gửi ID khi submit form
}

/**
 * Props cho component MedicineForm
 */
export interface MedicineFormProps {
  defaultValue?: IMedicine; // nếu có thì là update, không thì là create
  onSuccess?: () => void; // gọi lại sau khi submit thành công
  onCancel?: () => void; // gọi khi hủy form
}

export interface IReview {
  user: string;
  rating: number;
  comment: string;
  medicine_id: string;
}
