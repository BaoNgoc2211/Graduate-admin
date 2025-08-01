// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertTriangle, Package } from "lucide-react";

// import { useAllStock } from "@/hooks/orders/stock.hooks";
// import type { IStockFilters } from "@/interface/order/stock.interface";
// import WarehouseLayout from "@/components/order/stock/warehouse-Layout";
// import StockTableSkeleton from "@/components/order/stock/";
// import SearchBar from "@/components/order/stock/searchbar";
// import StockTable from "@/components/order/stock/stock-table";
// import Pagination from "@/components/order/stock/pagination";
// import LowStockCard from "./stock-low-card";

// const StockPageClient: React.FC = () => {
//   /* ------------------------- local state & hooks ------------------------ */
//   const [filters, setFilters] = useState<IStockFilters>({
//     search: "",
//     minQty: 0,
//     maxQty: 1000,
//     lowStockThreshold: 10,
//   });
//   const [page, setPage] = useState(1);
//   const perPage = 10;

//   const { data, isLoading, isError } = useAllStock();
//   console.log("Stock data:", data);

//   /* ---------------------------- keyboard esc ---------------------------- */
//   useEffect(() => {
//     const fn = (e: KeyboardEvent) =>
//       e.key === "Escape" && setFilters((f) => ({ ...f, search: "" }));
//     document.addEventListener("keydown", fn);
//     return () => document.removeEventListener("keydown", fn);
//   }, []);

//   /* --------------------------- filter & paging -------------------------- */
//   // const filtered = useMemo(() => {
//   //   if (!data?.data) return [];
//   //   return data.data.filter((s) => {
//   //     const searchMatch =
//   //       s.medicine.name.toLowerCase().includes(filters.search.toLowerCase()) ||
//   //       s.medicine.code.toLowerCase().includes(filters.search.toLowerCase());
//   //     const qtyMatch =
//   //       s.quantity >= filters.minQty && s.quantity <= filters.maxQty;
//   //     return searchMatch && qtyMatch;
//   //   });
//   // }, [data?.data, filters]);
//   const filtered = useMemo(() => {
//     return () => {
//       if (!data?.data) return [];
//       return data.data
//         .filter((s) => s.medicine) // bỏ các phần tử có medicine === null
//         .filter((s) => {
//           const searchMatch =
//             s
//               .medicine!.name.toLowerCase()
//               .includes(filters.search.toLowerCase()) ||
//             s
//               .medicine!.code.toLowerCase()
//               .includes(filters.search.toLowerCase());

//           const qtyMatch =
//             s.quantity >= filters.minQty && s.quantity <= filters.maxQty;
//           return searchMatch && qtyMatch;
//         });
//     };
//   });
//   // const filtered = useMemo(() => {
//   //   if (!data?.data) return [];

//   //   return data.data
//   //     .filter((s) => s.medicine) // bỏ các phần tử có medicine === null
//   //     .filter((s) => {
//   //       const searchMatch =
//   //         s
//   //           .medicine!.name.toLowerCase()
//   //           .includes(filters.search.toLowerCase()) ||
//   //         s.medicine!.code.toLowerCase().includes(filters.search.toLowerCase());

//   //       const qtyMatch =
//   //         s.quantity >= filters.minQty && s.quantity <= filters.maxQty;
//   //       return searchMatch && qtyMatch;
//   //     });
//   // }, [data?.data, filters]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
//   useEffect(() => setPage(1), [filters]); // reset page khi đổi filter

//   /* ------------------------------ render ------------------------------- */
//   if (isError) {
//     return (
//       <WarehouseLayout>
//         <section className="px-4 py-8 sm:px-6 lg:px-8">
//           <Alert>
//             <AlertTriangle className="h-4 w-4" />
//             <AlertDescription>
//               Có lỗi xảy ra khi tải dữ liệu tồn kho. Vui lòng thử lại sau.
//             </AlertDescription>
//           </Alert>
//         </section>
//       </WarehouseLayout>
//     );
//   }

//   return (
//     <WarehouseLayout>
//       <section className="px-4 py-8 sm:px-6 lg:px-8">
//         {/* ---------- header ---------- */}
//         <header className="mb-8">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold sm:text-3xl">
//                 Quản lý Tồn kho
//               </h1>
//               <p className="mt-2 text-gray-600">
//                 Theo dõi và quản lý tồn kho thuốc trong hệ thống
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               <Badge
//                 variant="outline"
//                 className="border-blue-900 text-blue-900"
//               >
//                 {filtered.length} sản phẩm
//               </Badge>
//               <Button className="bg-blue-900 hover:bg-blue-800">
//                 Nhập hàng mới
//               </Button>
//             </div>
//           </div>
//         </header>

//         {/* ---------- content grid ---------- */}
//         <div className="grid gap-8 lg:grid-cols-12">
//           {/* table + search */}
//           <div className="space-y-6 lg:col-span-8">
//             <SearchBar filters={filters} onFiltersChange={setFilters} />

//             {isLoading ? (
//               <StockTableSkeleton />
//             ) : (
//               <>
//                 <StockTable
//                   stocks={filtered}
//                   currentPage={page}
//                   itemsPerPage={perPage}
//                 />

//                 {filtered.length > 0 && (
//                   <Pagination
//                     currentPage={page}
//                     totalPages={totalPages}
//                     onPageChange={setPage}
//                     totalItems={filtered.length}
//                     itemsPerPage={perPage}
//                   />
//                 )}

//                 {filtered.length === 0 && (
//                   <div className="py-12 text-center">
//                     <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
//                     <h3 className="mb-2 text-lg font-medium">
//                       Không tìm thấy sản phẩm
//                     </h3>
//                     <p className="text-gray-500">
//                       Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
//                     </p>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* sidebar */}
//           <aside className="space-y-6 lg:col-span-4">
//             <LowStockCard threshold={filters.lowStockThreshold} />
//           </aside>
//         </div>
//       </section>
//     </WarehouseLayout>
//   );
// };

// export default StockPageClient;
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Package, 
  Search, 
  AlertTriangle, 
  Plus,
  Filter,
  Download
} from "lucide-react";
import { useAllStock, useLowStock } from "@/hooks/orders/stock.hooks";
import StockTable from "./stock-table";
import StockTableSkeleton from "./stock-table-skeleton";
import { IStock } from "@/interface/order/stock.interface";

const StockPageClient: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLowStock, setShowLowStock] = useState(false);
  const itemsPerPage = 10;

  // Fetch data
  const { data: stockData, isLoading, isError } = useAllStock(currentPage, itemsPerPage);
  const { data: lowStockData } = useLowStock();

  // Process data
  const stocks = stockData?.data || [];
  const lowStockItems = lowStockData?.data || [];
  const totalPages = stockData?.totalPages || 1;
  const totalItems = stockData?.totalItems || 0;

  // Filter stocks based on search term
  const filteredStocks = stocks.filter((stock: IStock) => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      stock.medicine?.name?.toLowerCase().includes(searchLower) ||
      stock.medicine?.code?.toLowerCase().includes(searchLower) ||
      stock.packaging?.toLowerCase().includes(searchLower)
    );
  });

  // Display stocks (filtered or low stock)
  const displayStocks = showLowStock ? lowStockItems : filteredStocks;

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleLowStock = () => {
    setShowLowStock(!showLowStock);
    setCurrentPage(1);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const calculateTotalValue = (stocks: IStock[]) =>
    stocks.reduce((total, stock) => total + (stock.quantity * stock.sellingPrice), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Tồn kho</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Theo dõi và quản lý tồn kho thuốc trong hệ thống
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Xuất Excel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nhập hàng mới
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng sản phẩm</p>
                  <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                </div>
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng số lượng</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stocks.reduce((sum, stock) => sum + stock.quantity, 0)}
                  </p>
                </div>
                <Package className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Giá trị tồn kho</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPrice(calculateTotalValue(stocks))}
                  </p>
                </div>
                <Package className="h-5 w-5 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tồn kho thấp</p>
                  <p className={`text-2xl font-bold ${
                    lowStockItems.length > 0 ? "text-red-600" : "text-gray-900"
                  }`}>
                    {lowStockItems.length}
                  </p>
                </div>
                <AlertTriangle className={`h-5 w-5 ${
                  lowStockItems.length > 0 ? "text-red-600" : "text-gray-400"
                }`} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên thuốc, mã thuốc..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={showLowStock ? "default" : "outline"}
                  onClick={toggleLowStock}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Tồn kho thấp
                  {lowStockItems.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {lowStockItems.length}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && !showLowStock && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Có {lowStockItems.length} sản phẩm có số lượng tồn kho thấp. 
              <Button 
                variant="link" 
                className="p-0 h-auto text-orange-800 underline ml-1"
                onClick={toggleLowStock}
              >
                Xem ngay
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stock Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {showLowStock ? "Tồn kho thấp" : "Danh sách tồn kho"} 
                ({displayStocks.length} sản phẩm)
              </span>
              {showLowStock && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={toggleLowStock}
                >
                  Xem tất cả
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <StockTableSkeleton />
            ) : isError ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Không thể tải dữ liệu tồn kho. Vui lòng thử lại sau.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <StockTable 
                  stocks={displayStocks}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                />
                
                {/* Pagination */}
                {!showLowStock && totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">
                      Trang {currentPage} / {totalPages} - Tổng {totalItems} sản phẩm
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Trước
                      </Button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page: number;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        );
                      })}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Sau
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockPageClient;