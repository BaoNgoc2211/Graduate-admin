//   export interface IMedicine {
//     _id?: string;
//     code: string; // Mã thuốc
//     name: string; // Tên thuốc
//     thumbnail: string; // Ảnh đại diện
//     image?: string[]; // Danh sách ảnh
//     packaging: string; // Đóng gói
//     dosageForm: string; // Dạng bào chế
//     use: string; // Cách dùng
//     dosage?: string; // Liều dùng
//   indication?: string; // Công dụng
//   adverse?: string; // Tác dụng phụ
//   contraindication?: string; // Chống chỉ định
//   precaution?: string; // Thận trọng khi sử dụng
//   ability?: string; // Khả năng lái xe và vận hành máy móc
//   pregnancy?: string; // Thời kỳ mang thai và cho con bú
//   drugInteractions?: string; // Tương tác thuốc
//   storage?: string; // Bảo quản
//   note: string; // Ghi chú
//   age_group: string; // Nhóm tuổi
//   medCategory_id: string[]; // Danh mục thuốc
//   medUsage_id: string[]; // Cách sử dụng
//   manufacturer_id: {
//     _id: string; // ID của nhà sản xuất
//     nameCo: string; // Tên công ty sản xuất
//     country?: string; // Quốc gia
//   };
//   importBatch_id?: [
//     {
//       _id: string; // ID của lô nhập
//       importDate: string; // Ngày nhập
//       quantity: number; // Số lượng nhập
//       price: number; // Giá nhập
//       expiryDate: string; // Ngày hết hạn
//       manufacturer_id: {
//         _id: string; // ID của nhà sản xuất
//         nameCo: string; // Tên công ty sản xuất
//       };
//     }
//   ];
//   active: "active" | "inactive"; // Trạng thái thuốc
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface IMedicinePayload {
//   code: string;
//   name: string;
//   thumbnail: string;
//   image?: string[];
//   packaging: string;
//   dosageForm: string;
//   use: string;
//   dosage?: string;
//   indication?: string;
//   adverse?: string;
//   contraindication?: string;
//   precaution?: string;
//   ability?: string;
//   pregnancy?: string;
//   drugInteractions?: string;
//   storage?: string;
//   note: string;
//   age_group: string;
//   medCategory_id: string[];
//   medUsage_id: string[];
//   manufacturer_id: {
//     _id: string;
//     nameCo: string;
//   };
//   importBatch_id?: [
//     {
//       _id: string; // ID của lô nhập
//       importDate: string; // Ngày nhập
//       quantity: number; // Số lượng nhập
//       price: number; // Giá nhập
//       expiryDate: string; // Ngày hết hạn
//       manufacturer_id: {
//         _id: string; // ID của nhà sản xuất
//         nameCo: string; // Tên công ty sản xuất
//       };
//     }
//   ];
//   active: "active" | "inactive"; // Trạng thái thuốc
// }

// export interface IMedicineFormData {
//   _id?: string;
//   code: string;
//   name: string;
//   thumbnail: string;
//   image?: string[];
//   packaging: string;
//   dosageForm: string;
//   use: string;
//   dosage?: string;
//   indication?: string;
//   adverse?: string;
//   contraindication?: string;
//   precaution?: string;
//   ability?: string;
//   pregnancy?: string;
//   drugInteractions?: string;
//   storage?: string;
//   note: string;
//   age_group: string;
//   medCategory_id: string[];
//   medUsage_id: string[];
//   manufacturer_id: {
//     _id: string;
//     nameCo: string;
//   };
//   active: "active" | "inactive"; // Trạng thái thuốc
// }

// export interface MedicineFormProps {
//   defaultValue?: IMedicine;
//   onSuccess?: () => void;
//   onCancel?: () => void;
// }

// export interface MedicineApiResponse {
//   message: string;
//   data: {
//     currentPage: number;
//     totalPages: number;
//     totalItems: number;
//     limit: number;
//     data: IMedicine[];
//   };
// }

// export interface MedicineFilters {
//   search?: string;
//   category?: string;
//   manufacturer?: string;
//   ageGroup?: string;
// }
export interface IMedicine {
  _id?: string;
  code: string; // Mã thuốc
  name: string; // Tên thuốc
  thumbnail: string; // Ảnh đại diện
  image?: string[]; // Danh sách ảnh
  packaging: string; // Đóng gói
  dosageForm: string; // Dạng bào chế
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
  note: string; // Ghi chú
  age_group: string | string[]; // Nhóm tuổi - có thể là string hoặc array
  medCategory_id: string[]; // Danh mục thuốc
  medUsage_id: string[]; // Cách sử dụng
  manufacturer_id: {
    _id: string; // ID của nhà sản xuất
    nameCo: string; // Tên công ty sản xuất
    country?: string; // Quốc gia
  };
  importBatch_id?: string[] | Array<{
    _id: string; // ID của lô nhập
    importDate: string; // Ngày nhập
    quantity: number; // Số lượng nhập
    price: number; // Giá nhập
    expiryDate: string; // Ngày hết hạn
    manufacturer_id: {
      _id: string; // ID của nhà sản xuất
      nameCo: string; // Tên công ty sản xuất
    };
  }>; // Có thể là array string hoặc array object
  active: "TRUE" | "FALSE" | "active" | "inactive"; // Trạng thái thuốc
  createdAt?: string;
  updatedAt?: string;
}

export interface IMedicinePayload {
  code: string;
  name: string;
  thumbnail: string;
  image?: string[];
  packaging: string;
  dosageForm: string;
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
  note: string;
  age_group: string | string[];
  medCategory_id: string[];
  medUsage_id: string[];
  manufacturer_id: {
    _id: string;
    nameCo: string;
  } | string; // Có thể là object hoặc string ID
  importBatch_id?: string[]; // Array của batch IDs
  active: "TRUE" | "FALSE" | "active" | "inactive";
}

export interface IMedicineFormData {
  _id?: string;
  code: string;
  name: string;
  thumbnail: string;
  image?: string[];
  packaging: string;
  dosageForm: string;
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
  note: string;
  age_group: string | string[];
  medCategory_id: string[];
  medUsage_id: string[];
  manufacturer_id: {
    _id: string;
    nameCo: string;
  };
  active: "TRUE" | "FALSE" | "active" | "inactive";
}

export interface MedicineFormProps {
  defaultValue?: IMedicine;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export interface MedicineApiResponse {
  message: string;
  data: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    data: IMedicine[];
  };
}

export interface MedicineFilters {
  search?: string;
  category?: string;
  manufacturer?: string;
  ageGroup?: string;
}