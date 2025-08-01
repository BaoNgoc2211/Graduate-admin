// utils/stock.utils.ts
import { IStock } from "@/interface/order/stock.interface";

/**
 * Format price in Vietnamese Dong
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

/**
 * Format date in Vietnamese format
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN").format(new Date(dateString));
  } catch {
    return "—";
  }
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  } catch {
    return "—";
  }
};

/**
 * Check if stock is expiring soon (within 60 days)
 */
export const isExpiringSoon = (expiryDate?: string, daysThreshold: number = 60): boolean => {
  if (!expiryDate) return false;
  const diffDays = getDaysUntilExpiry(expiryDate);
  return diffDays > 0 && diffDays <= daysThreshold;
};

/**
 * Check if stock is expired
 */
export const isExpired = (expiryDate?: string): boolean => {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
};

/**
 * Check if stock quantity is low
 */
export const isLowStock = (quantity: number, threshold: number = 10): boolean => {
  return quantity <= threshold;
};

/**
 * Get days until expiry
 */
export const getDaysUntilExpiry = (expiryDate: string): number => {
  return Math.floor((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
};

/**
 * Get stock status based on various conditions
 */
export const getStockStatus = (stock: IStock, lowStockThreshold: number = 10) => {
  if (isExpired(stock.expiryDate)) return "expired";
  if (isExpiringSoon(stock.expiryDate)) return "expiring";
  if (isLowStock(stock.quantity, lowStockThreshold)) return "low-stock";
  if (stock.quantity === 0) return "out-of-stock";
  return "normal";
};

/**
 * Get stock status color class
 */
export const getStockStatusColor = (status: string): string => {
  switch (status) {
    case "expired":
      return "text-red-600 bg-red-50 border-red-200";
    case "expiring":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "low-stock":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "out-of-stock":
      return "text-gray-600 bg-gray-50 border-gray-200";
    default:
      return "text-green-600 bg-green-50 border-green-200";
  }
};

/**
 * Get batch name from stock
 */
export const getBatchName = (stock: IStock): string => {
  return stock.batchNumber || `Lô ${stock._id.slice(-6)}`;
};

/**
 * Calculate profit margin percentage
 */
export const calculateProfitMargin = (sellingPrice: number, originalPrice: number): number => {
  if (originalPrice === 0) return 0;
  return ((sellingPrice - originalPrice) / originalPrice) * 100;
};

/**
 * Calculate total value of stocks
 */
export const calculateTotalValue = (stocks: IStock[]): number => {
  return stocks.reduce((total, stock) => total + (stock.quantity * stock.sellingPrice), 0);
};

/**
 * Group stocks by status
 */
export const groupStocksByStatus = (stocks: IStock[], lowStockThreshold: number = 10) => {
  return stocks.reduce((groups, stock) => {
    const status = getStockStatus(stock, lowStockThreshold);
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(stock);
    return groups;
  }, {} as Record<string, IStock[]>);
};

/**
 * Filter stocks by search query
 */
export const filterStocksBySearch = (stocks: IStock[], searchQuery: string): IStock[] => {
  if (!searchQuery.trim()) return stocks;
  
  const query = searchQuery.toLowerCase();
  return stocks.filter((stock) => {
    return (
      stock.medicine?.name?.toLowerCase().includes(query) ||
      stock.medicine?.code?.toLowerCase().includes(query) ||
      getBatchName(stock).toLowerCase().includes(query)
    );
  });
};

/**
 * Sort stocks by different criteria
 */
export const sortStocks = (
  stocks: IStock[],
  sortBy: 'name' | 'quantity' | 'price' | 'updatedAt' = 'updatedAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): IStock[] => {
  return [...stocks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = (a.medicine?.name || '').localeCompare(b.medicine?.name || '');
        break;
      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;
      case 'price':
        comparison = a.sellingPrice - b.sellingPrice;
        break;
      case 'updatedAt':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

/**
 * Calculate stock statistics
 */
export const calculateStockStats = (stocks: IStock[], lowStockThreshold: number = 10) => {
  const totalItems = stocks.length;
  const totalQuantity = stocks.reduce((sum, stock) => sum + stock.quantity, 0);
  const totalValue = calculateTotalValue(stocks);
  const averagePrice = totalItems > 0 ? totalValue / totalQuantity : 0;
  
  const lowStockItems = stocks.filter(stock => isLowStock(stock.quantity, lowStockThreshold)).length;
  const expiringSoonItems = stocks.filter(stock => isExpiringSoon(stock.expiryDate)).length;
  const expiredItems = stocks.filter(stock => isExpired(stock.expiryDate)).length;
  const outOfStockItems = stocks.filter(stock => stock.quantity === 0).length;
  
  return {
    totalItems,
    totalQuantity,
    totalValue,
    averagePrice,
    lowStockItems,
    expiringSoonItems,
    expiredItems,
    outOfStockItems,
  };
};

/**
 * Generate stock export data for CSV/Excel
 */
export const generateStockExportData = (stocks: IStock[]) => {
  return stocks.map((stock) => ({
    'Mã thuốc': stock.medicine?.code || '',
    'Tên thuốc': stock.medicine?.name || '',
    'Lô hàng': getBatchName(stock),
    'Số lượng': stock.quantity,
    'Đóng gói': stock.packaging || stock.medicine?.packaging || '',
    'Giá bán': stock.sellingPrice,
    'Hạn sử dụng': formatDate(stock.expiryDate),
    'Ngày nhập': formatDate(stock.createdAt),
    'Cập nhật': formatDate(stock.updatedAt),
    'Trạng thái': getStockStatus(stock),
    'Nhà sản xuất': stock.medicine?.manufacturer?.nameCo || '',
  }));
};

/**
 * Validate stock data
 */
export const validateStockData = (stock: Partial<IStock>): string[] => {
  const errors: string[] = [];
  
  if (!stock.medicine?._id) errors.push('Medicine ID is required');
  if (!stock.quantity || stock.quantity < 0) errors.push('Valid quantity is required');
  if (!stock.sellingPrice || stock.sellingPrice < 0) errors.push('Valid selling price is required');
  if (!stock.packaging) errors.push('Packaging information is required');
  
  return errors;
};

/**
 * Create stock search suggestions
 */
export const getStockSearchSuggestions = (stocks: IStock[], query: string): string[] => {
  if (!query.trim()) return [];
  
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();
  
  stocks.forEach((stock) => {
    const medicineName = stock.medicine?.name?.toLowerCase() || '';
    const medicineCode = stock.medicine?.code?.toLowerCase() || '';
    const batchName = getBatchName(stock).toLowerCase();
    
    if (medicineName.includes(queryLower)) suggestions.add(stock.medicine?.name || '');
    if (medicineCode.includes(queryLower)) suggestions.add(stock.medicine?.code || '');
    if (batchName.includes(queryLower)) suggestions.add(getBatchName(stock));
  });
  
  return Array.from(suggestions).slice(0, 5);
};