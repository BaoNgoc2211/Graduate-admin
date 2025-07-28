import type { IMedicine } from "./medicine.interface";

export interface IMedicineUsage {
  _id?: string;
  name: string;
  icon: string;
  // description?: string
  medicine: IMedicine[];
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  medicineCount?: number;
}

export interface IMedicineUsagePayload {
  name: string;
  icon: string;
  // description?: string
  isActive?: boolean;
}

export interface IMedicineUsageFilter {
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "createdAt" | "medicineCount";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface IMedicineUsageStats {
  totalCategories: number;
  totalMedicines: number;
  categoriesWithMedicines: number;
  emptyCategories: number;
}

export interface IMedicineUsageFormData {
  name: string;
  icon: string;
  description?: string;
  isActive: boolean;
}
