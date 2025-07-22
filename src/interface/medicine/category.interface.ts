import type { IMedicine } from "./medicine.interface"

export interface IMedicineCategory {
  _id?: string
  name: string
  icon: string
  // description?: string
  medicine: IMedicine[]
  createdAt?: string
  updatedAt?: string
  isActive?: boolean
  medicineCount?: number
}

export interface IMedicineCategoryPayload {
  name: string
  icon: string
  // description?: string
  isActive?: boolean
}

export interface IMedicineCategoryFilter {
  search?: string
  isActive?: boolean
  sortBy?: "name" | "createdAt" | "medicineCount"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}

export interface IMedicineCategoryStats {
  totalCategories: number
  totalMedicines: number
  categoriesWithMedicines: number
  emptyCategories: number
}

export interface IMedicineCategoryFormData {
  name: string
  icon: string
  description?: string
  isActive: boolean
}
