export interface IVoucher {
  _id: string
  code: string
  name: string
  description: string
  startDate: string
  endDate: string
  isActive: boolean
  discountType: "PERCENTAGE" | "FIXED"
  discountValue: number
  minOrderValue: number
  maxDiscountValue: number
  usageLimit: number
  usedCount: number

}

export interface IVoucherStats {
  totalVouchers: number
  activeVouchers: number
  expiredVouchers: number
  totalUsage: number
}

export interface ICreateVoucherPayload {
  code: string
  name: string
  description: string
  startDate: string
  endDate: string
  isActive: boolean
  discountType: "PERCENTAGE" | "FIXED"
  discountValue: number
  minOrderValue: number
  maxDiscountValue: number
  usageLimit: number
}

export interface IUpdateVoucherPayload extends ICreateVoucherPayload {
  _id: string
}

export interface IVoucherResponse {
  data: IVoucher[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface IVoucherFilters {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  discountType?: "PERCENTAGE" | "FIXED"
  sortBy?: "name" | "code" | "startDate" | "endDate" | "usedCount"
  sortOrder?: "asc" | "desc"
}

export interface IVoucherQueryParams extends IVoucherFilters {
  page?: number
  limit?: number
}

export interface ISimpleVoucherResponse {
  data: IVoucher[]
  currentPage?: number
  totalPages?: number
  // totalItems?: number
}

