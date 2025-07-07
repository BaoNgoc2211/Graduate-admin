// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Search,
//   Filter,
//   Eye,
//   Edit,
//   Package,
//   AlertTriangle,
//   TrendingDown,
// } from "lucide-react";
// // import { useAllStock, useLowStock } from "@/hooks/stock.query"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";
// import Link from "next/link";
// import { IStock, IStockFilters } from "@/interface/order/stock.interface";
// import Image from "next/image";
// import { useAllStock, useLowStock } from "@/hooks/order/stock.hooks";

// // Warehouse Layout Component
// const WarehouseLayout: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Package className="h-8 w-8 text-blue-900" />
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">
//                   Quản lý Kho
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                   Hệ thống nhà thuốc thông minh
//                 </p>
//               </div>
//             </div>
//             <nav className="hidden md:flex items-center space-x-6">
//               <Link href="/stock" className="text-blue-900 font-medium">
//                 Tồn kho
//               </Link>
//               <Link
//                 href="/purchase"
//                 className="text-gray-600 hover:text-gray-900"
//               >
//                 Nhập hàng
//               </Link>
//               <Link
//                 href="/reports"
//                 className="text-gray-600 hover:text-gray-900"
//               >
//                 Báo cáo
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1">{children}</main>

//       {/* Footer */}
//       <footer className="border-t border-gray-200 bg-gray-50 py-8">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-sm text-gray-500">
//             © 2024 Smart Pharmacy System. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // Search Bar Component
// const SearchBar: React.FC<{
//   filters: IStockFilters;
//   onFiltersChange: (filters: IStockFilters) => void;
// }> = ({ filters, onFiltersChange }) => {
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//           <Input
//             placeholder="Tìm kiếm theo tên thuốc hoặc mã..."
//             value={filters.search}
//             onChange={(e) =>
//               onFiltersChange({ ...filters, search: e.target.value })
//             }
//             className="pl-10"
//             autoFocus
//           />
//         </div>
//         <Button
//           variant="outline"
//           onClick={() => setShowAdvanced(!showAdvanced)}
//           className="flex items-center gap-2"
//         >
//           <Filter className="h-4 w-4" />
//           Bộ lọc
//         </Button>
//       </div>

//       {showAdvanced && (
//         <Card>
//           <CardContent className="pt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Số lượng tối thiểu
//                 </label>
//                 <Input
//                   type="number"
//                   value={filters.minQty}
//                   onChange={(e) =>
//                     onFiltersChange({
//                       ...filters,
//                       minQty: Number(e.target.value),
//                     })
//                   }
//                   placeholder="0"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Số lượng tối đa
//                 </label>
//                 <Input
//                   type="number"
//                   value={filters.maxQty}
//                   onChange={(e) =>
//                     onFiltersChange({
//                       ...filters,
//                       maxQty: Number(e.target.value),
//                     })
//                   }
//                   placeholder="1000"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700 mb-2 block">
//                   Ngưỡng cảnh báo
//                 </label>
//                 <Input
//                   type="number"
//                   value={filters.lowStockThreshold}
//                   onChange={(e) =>
//                     onFiltersChange({
//                       ...filters,
//                       lowStockThreshold: Number(e.target.value),
//                     })
//                   }
//                   placeholder="10"
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// // Stock Table Component
// const StockTable: React.FC<{
//   stocks: IStock[];
//   currentPage: number;
//   itemsPerPage: number;
// }> = ({ stocks, currentPage, itemsPerPage }) => {
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentStocks = stocks.slice(startIndex, endIndex);

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(price);
//   };

//   const formatDate = (date: Date) => {
//     return new Intl.DateTimeFormat("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     }).format(new Date(date));
//   };

//   const isExpiringSoon = (expiryDate?: Date) => {
//     if (!expiryDate) return false;
//     const now = new Date();
//     const expiry = new Date(expiryDate);
//     const diffTime = expiry.getTime() - now.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays < 60 && diffDays > 0;
//   };

//   const isLowStock = (quantity: number) => quantity < 10;

//   return (
//     <div className="space-y-4">
//       {/* Desktop Table */}
//       <div className="hidden md:block">
//         <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                   Thuốc
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                   Đóng gói
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                   Số lượng
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                   Giá bán
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
//                   Cập nhật
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
//                   Thao tác
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 bg-white">
//               {currentStocks.map((stock) => (
//                 <tr
//                   key={stock._id}
//                   className={`group cursor-pointer transition-colors duration-150 ease-in-out hover:bg-gray-50 ${
//                     isLowStock(stock.quantity) ? "bg-red-50" : ""
//                   }`}
//                   role="button"
//                   tabIndex={0}
//                   onClick={() =>
//                     toast.info(`Xem chi tiết ${stock.medicine_id.name}`)
//                   }
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <Image
//                         className="h-10 w-10 rounded-lg object-cover"
//                         src={stock.medicine_id.thumbnail || "/placeholder.svg"}
//                         alt={stock.medicine_id.name}
//                         width={20}
//                         height={20}
//                       />
//                       <div className="ml-4">
//                         <div className="flex items-center gap-2">
//                           <div className="text-sm font-medium text-gray-900">
//                             {stock.medicine_id.name}
//                           </div>
//                           {isExpiringSoon(stock.expiryDate) && (
//                             <Badge variant="destructive" className="text-xs">
//                               Sắp hết hạn
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {stock.medicine_id.code} •{" "}
//                           {stock.medicine_id.dosageForm}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {stock.packaging}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <span
//                         className={`text-sm font-medium ${
//                           isLowStock(stock.quantity)
//                             ? "text-red-600"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         {stock.quantity}
//                       </span>
//                       {isLowStock(stock.quantity) && (
//                         <AlertTriangle className="h-4 w-4 text-red-500" />
//                       )}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                     {formatPrice(stock.sellingPrice)}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {formatDate(stock.updatedAt)}
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toast.info("Xem chi tiết");
//                         }}
//                         aria-label="Xem chi tiết"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toast.info("Chỉnh sửa");
//                         }}
//                         aria-label="Chỉnh sửa"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {currentStocks.map((stock) => (
//           <Card
//             key={stock._id}
//             className={`cursor-pointer transition-all duration-150 ease-in-out hover:shadow-md ${
//               isLowStock(stock.quantity) ? "border-red-200 bg-red-50" : ""
//             }`}
//             onClick={() => toast.info(`Xem chi tiết ${stock.medicine_id.name}`)}
//           >
//             <CardContent className="p-4">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center space-x-3 flex-1">
//                   <Image
//                     className="h-12 w-12 rounded-lg object-cover"
//                     // src={stock.medicine_id.thumbnail || "/placeholder.svg"}
//                     src={
//                       stock.medicine_id.thumbnail ||
//                       "/placeholder.svg?height=48&width=48"
//                     }
//                     alt={stock.medicine_id.name}
//                     width={48}
//                     height={48}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="text-sm font-medium text-gray-900 truncate">
//                         {stock.medicine_id.name}
//                       </h3>
//                       {isExpiringSoon(stock.expiryDate) && (
//                         <Badge variant="destructive" className="text-xs">
//                           Sắp hết hạn
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500 mb-2">
//                       {stock.medicine_id.code} • {stock.medicine_id.dosageForm}
//                     </p>
//                     <div className="grid grid-cols-2 gap-2 text-xs">
//                       <div>
//                         <span className="text-gray-500">Đóng gói:</span>
//                         <span className="ml-1 font-medium">
//                           {stock.packaging}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-500">Giá:</span>
//                         <span className="ml-1 font-medium">
//                           {formatPrice(stock.sellingPrice)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end space-y-2">
//                   <div className="flex items-center gap-1">
//                     <span
//                       className={`text-sm font-bold ${
//                         isLowStock(stock.quantity)
//                           ? "text-red-600"
//                           : "text-gray-900"
//                       }`}
//                     >
//                       {stock.quantity}
//                     </span>
//                     {isLowStock(stock.quantity) && (
//                       <AlertTriangle className="h-4 w-4 text-red-500" />
//                     )}
//                   </div>
//                   <div className="flex gap-1">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toast.info("Xem chi tiết");
//                       }}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toast.info("Chỉnh sửa");
//                       }}
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Low Stock Widget Component
// const LowStockCard: React.FC<{ threshold: number }> = ({ threshold }) => {
//   const { data: lowStockData, isLoading, isError } = useLowStock(threshold);

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-5 w-32" />
//           <Skeleton className="h-4 w-48" />
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {[...Array(3)].map((_, i) => (
//               <Skeleton key={i} className="h-12 w-full" />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (isError) {
//     return (
//       <Alert>
//         <AlertTriangle className="h-4 w-4" />
//         <AlertDescription>Không thể tải dữ liệu tồn kho thấp</AlertDescription>
//       </Alert>
//     );
//   }

//   const lowStockItems = lowStockData?.data || [];

//   return (
//     <Card className="border-red-200">
//       <CardHeader className="pb-3">
//         <CardTitle className="flex items-center gap-2 text-red-700">
//           <TrendingDown className="h-5 w-5" />
//           Tồn kho thấp
//         </CardTitle>
//         <CardDescription>
//           {lowStockItems.length} sản phẩm dưới {threshold} đơn vị
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {lowStockItems.length === 0 ? (
//           <p className="text-sm text-gray-500 text-center py-4">
//             Không có sản phẩm nào có tồn kho thấp
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {lowStockItems.slice(0, 5).map((stock) => (
//               <div
//                 key={stock._id}
//                 className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
//               >
//                 <div className="flex items-center space-x-3">
//                   <Image
//                     className="h-8 w-8 rounded object-cover"
//                     src={stock.medicine_id.thumbnail || "/placeholder.svg"}
//                     alt={stock.medicine_id.name}
//                     width={32}
//                     height={32}
//                   />
//                   <div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {stock.medicine_id.name}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {stock.medicine_id.code}
//                     </p>
//                   </div>
//                 </div>
//                 <Badge variant="destructive" className="font-bold">
//                   {stock.quantity}
//                 </Badge>
//               </div>
//             ))}
//             {lowStockItems.length > 5 && (
//               <p className="text-xs text-gray-500 text-center pt-2">
//                 +{lowStockItems.length - 5} sản phẩm khác
//               </p>
//             )}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// // Pagination Component
// const Pagination: React.FC<{
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   totalItems: number;
//   itemsPerPage: number;
// }> = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) {
//           pages.push(i);
//         }
//         pages.push("...");
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push("...");
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         pages.push(1);
//         pages.push("...");
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pages.push(i);
//         }
//         pages.push("...");
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   return (
//     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
//       <div className="text-sm text-gray-700">
//         Hiển thị <span className="font-medium">{startItem}</span> đến{" "}
//         <span className="font-medium">{endItem}</span> trong tổng số{" "}
//         <span className="font-medium">{totalItems}</span> kết quả
//       </div>

//       <div className="flex items-center gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Trước
//         </Button>

//         <div className="flex items-center gap-1">
//           {getPageNumbers().map((page, index) => (
//             <React.Fragment key={index}>
//               {page === "..." ? (
//                 <span className="px-2 py-1 text-gray-500">...</span>
//               ) : (
//                 <Button
//                   variant={currentPage === page ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => onPageChange(page as number)}
//                   className={
//                     currentPage === page ? "bg-blue-900 hover:bg-blue-800" : ""
//                   }
//                 >
//                   {page}
//                 </Button>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Sau
//         </Button>
//       </div>
//     </div>
//   );
// };

// // Loading Skeleton Component
// const StockTableSkeleton: React.FC = () => {
//   return (
//     <div className="space-y-4">
//       {/* Desktop Skeleton */}
//       <div className="hidden md:block">
//         <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
//           <div className="px-6 py-3 bg-gray-50">
//             <div className="flex justify-between">
//               {[...Array(6)].map((_, i) => (
//                 <Skeleton key={i} className="h-4 w-20" />
//               ))}
//             </div>
//           </div>
//           <div className="divide-y divide-gray-200">
//             {[...Array(10)].map((_, i) => (
//               <div key={i} className="px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <Skeleton className="h-10 w-10 rounded-lg" />
//                     <div className="space-y-2">
//                       <Skeleton className="h-4 w-32" />
//                       <Skeleton className="h-3 w-24" />
//                     </div>
//                   </div>
//                   <Skeleton className="h-4 w-16" />
//                   <Skeleton className="h-4 w-12" />
//                   <Skeleton className="h-4 w-20" />
//                   <Skeleton className="h-4 w-16" />
//                   <div className="flex gap-2">
//                     <Skeleton className="h-8 w-8" />
//                     <Skeleton className="h-8 w-8" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Skeleton */}
//       <div className="md:hidden space-y-4">
//         {[...Array(5)].map((_, i) => (
//           <Card key={i}>
//             <CardContent className="p-4">
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center space-x-3 flex-1">
//                   <Skeleton className="h-12 w-12 rounded-lg" />
//                   <div className="flex-1 space-y-2">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="h-3 w-24" />
//                     <div className="grid grid-cols-2 gap-2">
//                       <Skeleton className="h-3 w-16" />
//                       <Skeleton className="h-3 w-20" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end space-y-2">
//                   <Skeleton className="h-4 w-8" />
//                   <div className="flex gap-1">
//                     <Skeleton className="h-8 w-8" />
//                     <Skeleton className="h-8 w-8" />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main Stock List Page Component
// const StockListPage: React.FC = () => {
//   const [filters, setFilters] = useState<IStockFilters>({
//     search: "",
//     minQty: 0,
//     maxQty: 1000,
//     lowStockThreshold: 10,
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const { data: stockData, isLoading, isError } = useAllStock();

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setFilters((prev) => ({ ...prev, search: "" }));
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   // Filter stocks based on search and filters
//   const filteredStocks = useMemo(() => {
//     if (!stockData?.data) return [];

//     return stockData.data.filter((stock) => {
//       const matchesSearch =
//         stock.medicine_id.name
//           .toLowerCase()
//           .includes(filters.search.toLowerCase()) ||
//         stock.medicine_id.code
//           .toLowerCase()
//           .includes(filters.search.toLowerCase());

//       const matchesQtyRange =
//         stock.quantity >= filters.minQty && stock.quantity <= filters.maxQty;

//       return matchesSearch && matchesQtyRange;
//     });
//   }, [stockData?.data, filters]);

//   const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filters]);

//   if (isError) {
//     return (
//       <WarehouseLayout>
//         <div className="px-4 sm:px-6 lg:px-8 py-8">
//           <Alert>
//             <AlertTriangle className="h-4 w-4" />
//             <AlertDescription>
//               Có lỗi xảy ra khi tải dữ liệu tồn kho. Vui lòng thử lại sau.
//             </AlertDescription>
//           </Alert>
//         </div>
//       </WarehouseLayout>
//     );
//   }

//   return (
//     <WarehouseLayout>
//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                 Quản lý Tồn kho
//               </h1>
//               <p className="mt-2 text-gray-600">
//                 Theo dõi và quản lý tồn kho thuốc trong hệ thống
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <Badge
//                 variant="outline"
//                 className="text-blue-900 border-blue-900"
//               >
//                 {filteredStocks.length} sản phẩm
//               </Badge>
//               <Button className="bg-blue-900 hover:bg-blue-800">
//                 Nhập hàng mới
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-8 space-y-6">
//             {/* Search and Filters */}
//             <SearchBar filters={filters} onFiltersChange={setFilters} />

//             {/* Stock Table */}
//             {isLoading ? (
//               <StockTableSkeleton />
//             ) : (
//               <>
//                 <StockTable
//                   stocks={filteredStocks}
//                   currentPage={currentPage}
//                   itemsPerPage={itemsPerPage}
//                 />

//                 {filteredStocks.length > 0 && (
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                     totalItems={filteredStocks.length}
//                     itemsPerPage={itemsPerPage}
//                   />
//                 )}

//                 {filteredStocks.length === 0 && !isLoading && (
//                   <Card>
//                     <CardContent className="py-12 text-center">
//                       <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                       <h3 className="text-lg font-medium text-gray-900 mb-2">
//                         Không tìm thấy sản phẩm
//                       </h3>
//                       <p className="text-gray-500">
//                         Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
//                       </p>
//                     </CardContent>
//                   </Card>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-4 space-y-6">
//             <LowStockCard threshold={filters.lowStockThreshold} />

//             {/* Quick Stats */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Thống kê nhanh</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Tổng sản phẩm</span>
//                   <span className="font-semibold text-blue-900">
//                     {stockData?.data?.length || 0}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Tồn kho thấp</span>
//                   <span className="font-semibold text-red-600">
//                     {stockData?.data?.filter(
//                       (s) => s.quantity < filters.lowStockThreshold
//                     ).length || 0}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Sắp hết hạn</span>
//                   <span className="font-semibold text-orange-600">
//                     {stockData?.data?.filter((s) => {
//                       if (!s.expiryDate) return false;
//                       const now = new Date();
//                       const expiry = new Date(s.expiryDate);
//                       const diffTime = expiry.getTime() - now.getTime();
//                       const diffDays = Math.ceil(
//                         diffTime / (1000 * 60 * 60 * 24)
//                       );
//                       return diffDays < 60 && diffDays > 0;
//                     }).length || 0}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </WarehouseLayout>
//   );
// };

// export default StockListPage;
"use client";

import StockPageClient from "./components/stock-page-client";



// /* -------------------------------------------------------------------------- */
// /*                              Warehouse Layout                              */
// /* -------------------------------------------------------------------------- */
// const WarehouseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <div className="min-h-screen flex flex-col bg-white">
//     {/* Header */}
//     <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Package className="h-8 w-8 text-blue-900" />
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">Quản lý Kho</h1>
//               <p className="text-sm text-gray-500">Hệ thống nhà thuốc thông minh</p>
//             </div>
//           </div>
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="/stock" className="text-blue-900 font-medium">
//               Tồn kho
//             </Link>
//             <Link href="/purchase" className="text-gray-600 hover:text-gray-900">
//               Nhập hàng
//             </Link>
//             <Link href="/reports" className="text-gray-600 hover:text-gray-900">
//               Báo cáo
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </header>

//     {/* Main */}
//     <main className="flex-1">{children}</main>

//     {/* Footer */}
//     <footer className="border-t border-gray-200 bg-gray-50 py-8">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <p className="text-center text-sm text-gray-500">
//           © 2024 Smart Pharmacy System. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   </div>
// )



export default function StockPage() {
  return <StockPageClient />; }
