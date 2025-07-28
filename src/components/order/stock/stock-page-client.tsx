"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Package } from "lucide-react";

import { useAllStock } from "@/hooks/orders/stock.hooks";
import type { IStockFilters } from "@/interface/order/stock.interface";
import WarehouseLayout from "@/components/order/stock/warehouse-Layout";
import StockTableSkeleton from "@/components/order/stock/stock-table-skeleton";
import SearchBar from "@/components/order/stock/searchbar";
import StockTable from "@/components/order/stock/stock-table";
import Pagination from "@/components/order/stock/pagination";
import LowStockCard from "./stock-low-card";

const StockPageClient: React.FC = () => {
  /* ------------------------- local state & hooks ------------------------ */
  const [filters, setFilters] = useState<IStockFilters>({
    search: "",
    minQty: 0,
    maxQty: 1000,
    lowStockThreshold: 10,
  });
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isLoading, isError } = useAllStock();

  /* ---------------------------- keyboard esc ---------------------------- */
  useEffect(() => {
    const fn = (e: KeyboardEvent) =>
      e.key === "Escape" && setFilters((f) => ({ ...f, search: "" }));
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  /* --------------------------- filter & paging -------------------------- */
  const filtered = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((s) => {
      const searchMatch =
        s.medicine.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.medicine.code.toLowerCase().includes(filters.search.toLowerCase());
      const qtyMatch =
        s.quantity >= filters.minQty && s.quantity <= filters.maxQty;
      return searchMatch && qtyMatch;
    });
  }, [data?.data, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => setPage(1), [filters]); // reset page khi đổi filter

  /* ------------------------------ render ------------------------------- */
  if (isError) {
    return (
      <WarehouseLayout>
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Có lỗi xảy ra khi tải dữ liệu tồn kho. Vui lòng thử lại sau.
            </AlertDescription>
          </Alert>
        </section>
      </WarehouseLayout>
    );
  }

  return (
    <WarehouseLayout>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        {/* ---------- header ---------- */}
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Quản lý Tồn kho
              </h1>
              <p className="mt-2 text-gray-600">
                Theo dõi và quản lý tồn kho thuốc trong hệ thống
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-blue-900 text-blue-900"
              >
                {filtered.length} sản phẩm
              </Badge>
              <Button className="bg-blue-900 hover:bg-blue-800">
                Nhập hàng mới
              </Button>
            </div>
          </div>
        </header>

        {/* ---------- content grid ---------- */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* table + search */}
          <div className="space-y-6 lg:col-span-8">
            <SearchBar filters={filters} onFiltersChange={setFilters} />

            {isLoading ? (
              <StockTableSkeleton />
            ) : (
              <>
                <StockTable
                  stocks={filtered}
                  currentPage={page}
                  itemsPerPage={perPage}
                />

                {filtered.length > 0 && (
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    totalItems={filtered.length}
                    itemsPerPage={perPage}
                  />
                )}

                {filtered.length === 0 && (
                  <div className="py-12 text-center">
                    <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-2 text-lg font-medium">
                      Không tìm thấy sản phẩm
                    </h3>
                    <p className="text-gray-500">
                      Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            <LowStockCard threshold={filters.lowStockThreshold} />
          </aside>
        </div>
      </section>
    </WarehouseLayout>
  );
};

export default StockPageClient;
