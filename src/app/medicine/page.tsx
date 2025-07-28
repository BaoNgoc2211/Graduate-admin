"use client";
import MedicinePagination from "@/components/medicine/medicine/medicine-pagination";
import MedicineTable from "@/components/medicine/medicine/medicine-table";
import MedicineToolbar from "@/components/medicine/medicine/medicine-toolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMedicines } from "@/hooks/medicine/medicine.hooks";
import { Package } from "lucide-react";

export default function MedicinePage() {
  const {
    medicines,
    pagination,
    filters,
    isLoading,
    isDeleting,
    handlePageChange,
    handlePageSizeChange,
    handleFiltersChange,
    handleDelete,
  } = useMedicines();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản lý thuốc
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý thông tin thuốc trong hệ thống
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="text-xl text-gray-900">
              Danh sách thuốc
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Toolbar */}
            <MedicineToolbar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              totalItems={pagination.totalItems}
            />

            {/* Content */}
            <MedicineTable
              medicines={medicines}
              onDelete={handleDelete}
              isLoading={isLoading}
              isDeleting={isDeleting}
            />
            {/* <div className="mt-6">
              {isMobile ? (
                // Mobile: Card layout
                <div className="grid grid-cols-1 gap-4">
                  {medicines.map((medicine) => (
                    <MedicineCard
                      key={medicine._id}
                      medicine={medicine}
                      onDelete={handleDelete}
                      isDeleting={isDeleting}
                    />
                  ))}
                </div>
              ) : (
                // Desktop: Table layout
                <MedicineTable
                  medicines={medicines}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                  isDeleting={isDeleting}
                />
              )}
            </div> */}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-6 border-t border-gray-200">
                <MedicinePagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  totalItems={pagination.totalItems}
                  pageSize={pagination.limit}
                  onPageChange={handlePageChange}
                  onPageSizeChange={handlePageSizeChange}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
