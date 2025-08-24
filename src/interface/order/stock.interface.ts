export interface IMedicine {
  _id?: string;
  code: string; // Mã thuốc
  name: string; // Tên thuốc
  thumbnail: string; // Ảnh đại diện
  image?: string[]; // Danh sách ảnh
  packaging: string; // Đóng gói
  dosageForm: string; // Dạng bào chế
  use: string;
  note: string;
  age_group: string;
  medCategory_id: string[];
  medUsage_id: string[];
  manufacturer_id: {
    _id: string;
    nameCo: string;
    country: string;
  };
  active: "TRUE" | "FALSE" | "active" | "inactive"; 
  // manufacturer?: {
  //   _id?: string;
  //   nameCo?: string;
  //   country?: string;
  // };
}

export interface IPurchaseOrder {
  _id: string;
  orderCode?: string;
  createdAt: string;
}

export interface IImportBatch {
  _id: string;
  batchCode?: string;
  expiryDate?: string;
  manufacturingDate?: string;
}

export interface IStock {
  _id: string;
  medicine: IMedicine;
  purchaseOrder: string | IPurchaseOrder;
  importBatch?: string | IImportBatch;
  quantity: number;
  packaging?: string;
  sellingPrice: number;
  originalPrice?: number;
  profitMargin?: number;
  isExpiringSoon?: boolean;
  status?: "active" | "expired" | "recalled" | "sold_out";
  createdAt: string;
  updatedAt: string;

  expiryDate?: string; // From importBatch
  batchNumber?: string; // From importBatch
}

export interface IStockFilters {
  search: string;
  minQty: number;
  maxQty: number;
  lowStockThreshold: number;
  status?: string;
  expiringSoon?: boolean;
}

export interface IStockBatch {
  _id: string;
  batchCode: string;
  expiryDate: Date;
  manufacturingDate?: Date;
  totalQuantity: number;
  sellingPrice: number;
  stocks: IStock[];
}

// Updated API Response interface to match actual API structure
export interface IStockApiResponse {
  success: boolean;
  message: string;
  data: IStock[];
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  // Additional fields that might come from API
  total?: number;
  page?: number;
  limit?: number;
}

export interface IStockFiltersState extends IStockFilters {
  sortBy?: "name" | "quantity" | "price" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

// Stats interface
export interface IStockStats {
  totalItems: number;
  totalQuantity: number;
  averagePrice: number;
  lowStockItems: number;
  expiringSoonItems: number;
}

// Create/Update interfaces
export interface ICreateStockData {
  medicine: string;
  purchaseOrder: string;
  importBatch?: string;
  quantity: number;
  packaging?: string;
  sellingPrice: number;
  originalPrice?: number;
  profitMargin?: number;
}

export interface IUpdateStockData extends Partial<ICreateStockData> {
  _id?: string;
}
