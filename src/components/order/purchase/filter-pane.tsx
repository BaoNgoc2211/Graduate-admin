"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import { IPurchaseFilter } from "@/interface/order/purchase.interface"
import { useSuppliers } from "@/hooks/order/purchase.hooks"

interface FilterPanelProps {
  filters: IPurchaseFilter
  onFiltersChange: (filters: IPurchaseFilter) => void
  onClearFilters: () => void
}

export function FilterPanel({ filters, onFiltersChange, onClearFilters }: FilterPanelProps) {
  const { data: suppliersData } = useSuppliers()
  const suppliers = suppliersData?.data || []

  const handleFilterChange = (key: keyof IPurchaseFilter, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value && value !== "")

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Bộ lọc
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Tìm kiếm</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Tìm theo mã phiếu, nhà cung cấp..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateFrom">Từ ngày</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filters.dateFrom || ""}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateTo">Đến ngày</Label>
            <Input
              id="dateTo"
              type="date"
              value={filters.dateTo || ""}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            />
          </div>
        </div>

        {/* Supplier */}
        <div className="space-y-2">
          <Label>Nhà cung cấp</Label>
          <Select value={filters.supplier || "all"} onValueChange={(value) => handleFilterChange("supplier", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn nhà cung cấp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả nhà cung cấp</SelectItem>
              {suppliers.map((supplier) => (
                <SelectItem key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Trạng thái</Label>
          <Select value={filters.status || "all"} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="draft">Nháp</SelectItem>
              <SelectItem value="pending">Chờ duyệt</SelectItem>
              <SelectItem value="approved">Đã duyệt</SelectItem>
              <SelectItem value="rejected">Từ chối</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters} className="w-full flex items-center gap-2 bg-transparent">
            <X className="h-4 w-4" />
            Xóa bộ lọc
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
