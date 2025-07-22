export interface IPurchaseOrderItem {
  _id?: string;
  medicine_id: string;
  medicineName?: string;
  unit?: string;
  quantity: number;
  price: number;
  VAT_Rate: number;
  CK_Rate: number;
  batch_id?: string;
  notes?: string;
}

export interface IPurchaseOrder {
  _id: string;
  orderCode?: string;
  supplierId?: string;
  supplierName?: string;
  supplierCode?: string;
  medicines: IPurchaseOrderItem[];
  date_in: string;
  expectedDeliveryDate?: string;
  totalAmount: number;
  note?: "Đã thanh toán" | "Ghi nợ" | "Nháp";
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

export interface IPurchaseOrderPayload {
  supplierId?: string;
  date_in: string;
  expectedDeliveryDate?: string;
  note?: "Đã thanh toán" | "Ghi nợ" | "Nháp";
  medicines: {
    medicine_id: string;
    quantity: number;
    price: number;
    VAT_Rate: number;
    CK_Rate: number;
    batch_id?: string;
  }[];
}

export interface IPurchaseOrderFilters {
  search?: string;
  note?: string;
  supplierId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface IPurchaseOrderResponse {
  data: IPurchaseOrder[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ISupplier {
  _id: string;
  nameCo: string;
  status: "active" | "inactive";
}

export interface IMedicine {
  _id: string;
  name: string;
  code: string;
  unit: string;
  price: number;
  batch_id: IBatch;
  stockQuantity?: number;
  category: string;
  description?: string;
  status: "active" | "inactive";
}
export interface IBatch {
  _id: string;
  batchCode: string;
  importPrice: number;
}
