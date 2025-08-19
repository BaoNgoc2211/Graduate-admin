export interface IMedicine {
  _id: string;
  code: string;
  name: string;
  thumbnail?: string;
  dosageForm: string;
  packaging: string;
  manufacturer?: {
    _id?: string;
    nameCo?: string;
    country?: string;
  };
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
