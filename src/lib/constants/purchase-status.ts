// src/constants/purchaseStatus.ts
export enum PurchaseStatus {
  Draft = "Nháp",
  Debt = "Ghi nợ",
  Paid = "Đã thanh toán",
}
export const PurchaseStatusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "Nháp", label: "Nháp" },
  { value: "Ghi nợ", label: "Ghi nợ" },
  { value: "Đã thanh toán", label: "Đã thanh toán" },
];
// export const PurchaseStatusOptions = [
//   { label: "Tất cả trạng thái", value: "all" },
//   { label: "Nháp", value: PurchaseStatus.Draft },
//   { label: "Ghi nợ", value: PurchaseStatus.Debt },
//   { label: "Đã thanh toán", value: PurchaseStatus.Paid },
// ];
