// /**
//  * Format giá tiền theo định dạng Việt Nam
//  */
// export const formatPrice = (price: number): string => {
//   return new Intl.NumberFormat("vi-VN", {
//     style: "currency",
//     currency: "VND",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(price)
// }

// /**
//  * Parse giá tiền từ string về number
//  */
// export const parsePrice = (priceString: string): number => {
//   return Number.parseFloat(priceString.replace(/[^\d.-]/g, "")) || 0
// }

// /**
//  * Tính thành tiền cho một dòng thuốc
//  * Công thức: price * quantity * (1 + VAT/100) * (1 - CK/100)
//  */
// export const calculateLineTotal = (price: number, quantity: number, vatRate: number, ckRate: number): number => {
//   if (!price || !quantity) return 0
//   const subtotal = price * quantity
//   const vatMultiplier = 1 + (vatRate || 0) / 100
//   const discountMultiplier = 1 - (ckRate || 0) / 100
//   return subtotal * vatMultiplier * discountMultiplier
// }
/**
 * Format giá tiền theo định dạng Việt Nam
 */
/**
 * Format giá tiền theo định dạng Việt Nam
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Parse giá tiền từ string về number
 */
export const parsePrice = (priceString: string): number => {
  return Number.parseFloat(priceString.replace(/[^\d.-]/g, "")) || 0;
};

/**
 * Tính thành tiền cho một dòng thuốc
 * Công thức: price * quantity * (1 + VAT/100) * (1 - CK/100)
 */
export const calculateLineTotal = (
  price: number,
  quantity: number,
  vatRate: number,
  ckRate: number
): number => {
  // Kiểm tra input hợp lệ
  if (!price || price <= 0 || !quantity || quantity <= 0) return 0;

  // Đảm bảo vatRate và ckRate là số hợp lệ
  const validVatRate = Number.isFinite(vatRate) ? vatRate : 0;
  const validCkRate = Number.isFinite(ckRate) ? ckRate : 0;

  // Tính subtotal
  const subtotal = price * quantity;

  // Tính VAT (cộng thêm)
  const vatMultiplier = 1 + validVatRate / 100;

  // Tính chiết khấu (trừ đi)
  const discountMultiplier = 1 - validCkRate / 100;

  // Kết quả cuối cùng
  const result = subtotal * vatMultiplier * discountMultiplier;

  // Làm tròn đến 2 chữ số thập phân
  return Math.round(result * 100) / 100;
};
