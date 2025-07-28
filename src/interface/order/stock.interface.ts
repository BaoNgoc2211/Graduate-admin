export interface IStock {
  _id: string;
  medicine: {
    _id: string;
    code: string;
    name: string;
    thumbnail?: string;
    dosageForm: string;
    packaging: string
    manufacturer?: {
      _id?: string;
      nameCo?: string;
    };
  };
  purchaseOrder: string;
  quantity: number;
  packaging?: string;
  sellingPrice: number;
  createdAt: string;
  updatedAt: string;
  expiryDate?: string;
  batchNumber?: string;
}
export interface IStockFilters {
  search: string;
  minQty: number;
  maxQty: number;
  lowStockThreshold: number;
}

export interface IStockBatch {
  _id: string;
  batchNumber: string;
  quantity: number;
  expiryDate: Date;
  purchaseOrder_id: string;
  sellingPrice: number;
  createdAt: Date;
}
