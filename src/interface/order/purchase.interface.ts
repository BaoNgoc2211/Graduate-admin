// export interface IMedicineDetail {
//   medicine_id: string // ID thuốc
//   batch_id: string // ID lô hàng
//   quantity: number // Số lượng
//   price: number // Đơn giá
//   VAT_Rate: number // VAT (%)
//   CK_Rate: number // Chiết khấu (%)
//   totalPrice: number // Thành tiền (tự động tính)
// }
// export interface IPurchase {
//   _id?: string
//   date_in: Date // Ngày nhập kho
//   note: string // Ghi chú
//   medicines: IMedicineDetail[] // Danh sách thuốc
//   totalAmount: number // Tổng tiền (tự động tính)
//   createdAt?: Date
//   updatedAt?: Date
// }
// export interface IPurchasePayload {
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

// export interface PurchaseOrderFormProps {
//   mode: "create" | "edit"
//   defaultValue?: IPurchase
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
export interface IPurchaseOrder {
  _id?: string
  date_in: Date // Ngày nhập kho
  note: string // Ghi chú
  medicines: IMedicineDetail[] // Danh sách thuốc
  totalAmount: number // Tổng tiền (tự động tính)
  createdAt?: Date
  updatedAt?: Date
}

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
