export interface IImportBatch {
  _id: string
  batchNumber: string // Mã lô hàng
  distributor_id:
    | string
    | {
        _id: string
        nameCo: string
        nameRep?: string
        email?: string
        phone?: string
        address?: string
        country?: string
      } // Thông tin nhà phân phối - có thể là ID hoặc object đầy đủ
  importDate: Date // Ngày nhập
  expiryDate: Date // Hạn sử dụng
  importPrice: number // Giá nhập
  status: "expired" | "out_of_stock" | "discontinued" | "in_stock" // Trạng thái
}

/**
 * Interface cho form data (khi tạo/cập nhật chỉ cần gửi ID)
 */
export interface IImportBatchFormData {
  _id?: string
  batchNumber: string
  distributor_id: string // Chỉ gửi ID khi submit form
  importDate: Date
  expiryDate: Date
  importPrice: number
  status: "expired" | "out_of_stock" | "discontinued" | "in_stock"
}

/**
 * Props cho component ImportBatchForm
 */
export interface ImportBatchFormProps {
  defaultValue?: IImportBatch // nếu có thì là update, không thì là create
  onSuccess?: () => void // gọi lại sau khi submit thành công
  onCancel?: () => void // gọi khi hủy form
}

/**
 * Status options cho dropdown
 */
export const IMPORT_BATCH_STATUS = [
  { value: "in_stock", label: "Còn hàng", color: "bg-green-100 text-green-800" },
  { value: "out_of_stock", label: "Hết hàng", color: "bg-red-100 text-red-800" },
  { value: "expired", label: "Hết hạn", color: "bg-orange-100 text-orange-800" },
  { value: "discontinued", label: "Ngừng cung cấp", color: "bg-gray-100 text-gray-800" },
] as const
