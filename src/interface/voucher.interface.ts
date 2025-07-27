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



