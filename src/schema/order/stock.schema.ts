// schema/stock.schema.ts
import { z } from "zod";

// Base schema for medicine reference
export const medicineReferenceSchema = z.object({
  _id: z.string().min(1, "Medicine ID is required"),
  code: z.string().min(1, "Medicine code is required"),
  name: z.string().min(1, "Medicine name is required"),
  thumbnail: z.string().optional(),
  dosageForm: z.string().min(1, "Dosage form is required"),
  packaging: z.string().min(1, "Packaging is required"),
  manufacturer: z.object({
    _id: z.string().optional(),
    nameCo: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

// Base schema for import batch reference
export const importBatchReferenceSchema = z.object({
  _id: z.string(),
  batchCode: z.string().optional(),
  expiryDate: z.string().optional(),
  manufacturingDate: z.string().optional(),
});

// Main stock schema
export const stockSchema = z.object({
  _id: z.string(),
  medicine: medicineReferenceSchema,
  purchaseOrder: z.union([
    z.string(),
    z.object({
      _id: z.string(),
      orderCode: z.string().optional(),
      createdAt: z.string(),
    })
  ]),
  importBatch: z.union([
    z.string(),
    importBatchReferenceSchema
  ]).optional(),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  packaging: z.string().optional(),
  sellingPrice: z.number().min(0, "Selling price must be non-negative"),
  originalPrice: z.number().min(0).optional(),
  profitMargin: z.number().min(0).max(1).optional(),
  isExpiringSoon: z.boolean().optional(),
  status: z.enum(['active', 'expired', 'recalled', 'sold_out']).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  // UI computed fields
  expiryDate: z.string().optional(),
  batchNumber: z.string().optional(),
});

// Stock filters schema
export const stockFiltersSchema = z.object({
  search: z.string().default(""),
  minQty: z.number().min(0).default(0),
  maxQty: z.number().min(0).default(1000),
  lowStockThreshold: z.number().min(0).default(10),
  status: z.string().optional(),
  expiringSoon: z.boolean().optional(),
  sortBy: z.enum(['name', 'quantity', 'price', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Create stock schema (for POST requests)
export const createStockSchema = z.object({
  medicine: z.string().min(1, "Medicine ID is required"),
  purchaseOrder: z.string().min(1, "Purchase Order ID is required"),
  importBatch: z.string().optional(),
  quantity: z.number().min(0, "Quantity must be non-negative"),
  packaging: z.string().min(1, "Packaging is required"),
  sellingPrice: z.number().min(0, "Selling price must be non-negative"),
  originalPrice: z.number().min(0).optional(),
  profitMargin: z.number().min(0).max(1).optional(),
});

// Update stock schema (for PUT requests)
export const updateStockSchema = createStockSchema.partial().omit({
  medicine: true,
  purchaseOrder: true,
});

// Stock batch summary schema
export const stockBatchSchema = z.object({
  _id: z.string(),
  batchCode: z.string(),
  expiryDate: z.date(),
  manufacturingDate: z.date().optional(),
  totalQuantity: z.number().min(0),
  sellingPrice: z.number().min(0),
  stocks: z.array(stockSchema),
});

// API Response schemas
export const stockApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(stockSchema),
  totalItems: z.number().optional(),
  totalPages: z.number().optional(),
  currentPage: z.number().optional(),
});

// Pagination params schema
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Stock statistics schema
export const stockStatsSchema = z.object({
  totalItems: z.number().min(0),
  totalQuantity: z.number().min(0),
  averagePrice: z.number().min(0),
  lowStockItems: z.number().min(0),
  expiringSoonItems: z.number().min(0),
});

// Export types
export type Stock = z.infer<typeof stockSchema>;
export type StockFilters = z.infer<typeof stockFiltersSchema>;
export type CreateStockData = z.infer<typeof createStockSchema>;
export type UpdateStockData = z.infer<typeof updateStockSchema>;
export type StockBatch = z.infer<typeof stockBatchSchema>;
export type StockApiResponse = z.infer<typeof stockApiResponseSchema>;
export type StockStats = z.infer<typeof stockStatsSchema>;
export type Pagination = z.infer<typeof paginationSchema>;

// Validation functions
export const validateStock = (data: unknown) => stockSchema.parse(data);
export const validateStockFilters = (data: unknown) => stockFiltersSchema.parse(data);
export const validateCreateStock = (data: unknown) => createStockSchema.parse(data);
export const validateUpdateStock = (data: unknown) => updateStockSchema.parse(data);
export const validatePagination = (data: unknown) => paginationSchema.parse(data);

// Utility validation functions
export const isValidStock = (data: unknown): data is Stock => {
  try {
    stockSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const isValidStockArray = (data: unknown): data is Stock[] => {
  try {
    z.array(stockSchema).parse(data);
    return true;
  } catch {
    return false;
  }
};