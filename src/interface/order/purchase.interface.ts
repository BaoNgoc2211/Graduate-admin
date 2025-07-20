// export interface IMedicineDetail {
//   medicine_id: string // ID thuốc
//   batch_id: string // ID lô hàng
//   quantity: number // Số lượng
//   price: number // Đơn giá
//   VAT_Rate: number // VAT (%)
//   CK_Rate: number // Chiết khấu (%)
//   totalPrice: number // Thành tiền (tự động tính)
// }
// export interface IPurchaseOrder {
//   _id?: string
//   date_in: Date // Ngày nhập kho
//   note: string // Ghi chú
//   medicines: IMedicineDetail[] // Danh sách thuốc
//   totalAmount: number // Tổng tiền (tự động tính)
//   createdAt?: Date
//   updatedAt?: Date
// }

// export interface IPurchaseOrderPayload {
//   date_in: string // ISO string
//   note: string
//   medicines: {
//     medicine_id: string
//     batch_id: string
//     quantity: number
//     price: number
//     VAT_Rate: number
//     CK_Rate: number
//   }[]
// }

// /**
//  * Props cho form component
//  */
// export interface PurchaseOrderFormProps {
//   mode: "create" | "edit"
//   defaultValue?: IPurchaseOrder
//   onSuccess?: () => void
//   onCancel?: () => void
// }
/**
 * Interface cho chi tiết thuốc trong phiếu nhập
 */
export interface IMedicineDetail {
  medicine_id: string // ID thuốc
  batch_id: string // ID lô hàng
  quantity: number // Số lượng
  price: number // Đơn giá
  VAT_Rate: number // VAT (%)
  CK_Rate: number // Chiết khấu (%)
  totalPrice: number // Thành tiền (tự động tính)
}

/**
 * Interface cho phiếu nhập hàng
 */
export interface IPurchaseOrder {
  _id?: string
  date_in: Date // Ngày nhập kho
  note: string // Ghi chú
  medicines: IMedicineDetail[] // Danh sách thuốc
  totalAmount: number // Tổng tiền (tự động tính)
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Payload gửi về server
 */
export interface IPurchaseOrderPayload {
  date_in: string // ISO string
  note: string
  medicines: {
    medicine_id: string
    batch_id: string
    quantity: number
    price: number
    VAT_Rate: number
    CK_Rate: number
  }[]
}

/**
 * Props cho form component
 */
export interface PurchaseOrderFormProps {
  mode: "create" | "edit"
  defaultValue?: IPurchaseOrder
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Interface cho mục nhập hàng
 */
export interface IPurchaseItem {
  _id: string
  medicine: {
    _id: string
    name: string
    code: string
    unit: string
  }
  batch: {
    _id: string
    lotNumber: string
    expiryDate: string
    manufacturingDate: string
  }
  quantity: number
  unitPrice: number
  totalPrice: number
}

/**
 * Interface cho mục nhập hàng khi tạo mới
 */
export interface ICreatePurchaseItem {
  medicine: string
  batch: string
  quantity: number
  unitPrice: number
}

/**
 * Interface cho phiếu nhập hàng khi tạo mới
 */
export interface ICreatePurchaseEntry {
  supplier: string
  items: ICreatePurchaseItem[]
  notes?: string
}

/**
 * Interface cho phiếu nhập hàng
 */
export interface IPurchaseEntry {
  _id: string
  code: string
  supplier: {
    _id: string
    name: string
    contact?: string
  }
  createdDate: string
  status: "draft" | "pending" | "approved" | "rejected"
  totalAmount: number
  items: IPurchaseItem[]
  notes?: string
  createdBy: string
  approvedBy?: string
  approvedDate?: string
  createdAt: string
  updatedAt: string
}

/**
 * Interface cho bộ lọc phiếu nhập hàng
 */
export interface IPurchaseFilter {
  dateFrom?: string
  dateTo?: string
  supplier?: string
  status?: string
  search?: string
}

/**
 * Interface cho thống kê phiếu nhập hàng
 */
export interface IPurchaseStats {
  totalEntries: number
  totalAmount: number
  pendingEntries: number
  thisMonthEntries: number
  thisMonthAmount: number
}

/**
 * Interface cho thuốc
 */
export interface IMedicine {
  _id: string
  name: string
  code: string
  unit: string
  category: string
  manufacturer: string
}

/**
 * Interface cho nhập lô hàng
 */
export interface IImportBatch {
  _id: string
  lotNumber: string
  expiryDate: string
  manufacturingDate: string
  medicine: string
  quantity: number
}
