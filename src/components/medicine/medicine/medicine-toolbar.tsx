"use client"

import { useState } from "react"
import { Search, Plus, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import Link from "next/link"
import { MedicineFilters } from "@/interface/medicine/medicine.interface"
import { useMedicineCategories } from "@/hooks/medicine/category.hooks"
import { useManufactures } from "@/hooks/inventory/manufacture.hooks"

interface MedicineToolbarProps {
  filters: MedicineFilters
  onFiltersChange: (filters: MedicineFilters) => void
  totalItems: number
}

export default function MedicineToolbar({ filters, onFiltersChange, totalItems }: MedicineToolbarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(filters.search || "")

  // Get data for filter dropdowns
  const { data: categoriesData } = useMedicineCategories()
  const { data: manufacturersData } = useManufactures()

  const categories = categoriesData?.data || []
  const manufacturers = manufacturersData?.data || []

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value)
    onFiltersChange({ ...filters, search: value })
  }

  // Handle filter changes
  const handleFilterChange = (key: keyof MedicineFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value || undefined })
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchValue("")
    onFiltersChange({})
  }

  // Count active filters
  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Main toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc mã thuốc..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="border-gray-300 hover:bg-gray-50 bg-transparent relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          <Link href="/medicine/create">
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="h-4 w-4 mr-2" />
              Thêm thuốc mới
            </Button>
          </Link>
        </div>
      </div>

      {/* Results summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Tìm thấy {totalItems} thuốc</span>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4 mr-1" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Advanced filters */}
      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <CollapsibleContent>
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Danh mục thuốc</label>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id!}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Manufacturer filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nhà sản xuất</label>
                  <Select
                    value={filters.manufacturer || "all"}
                    onValueChange={(value) => handleFilterChange("manufacturer", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn nhà sản xuất" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả nhà sản xuất</SelectItem>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer._id} value={manufacturer._id!}>
                          {manufacturer.nameCo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Age group filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nhóm tuổi</label>
                  <Select
                    value={filters.ageGroup || "all"}
                    onValueChange={(value) => handleFilterChange("ageGroup", value)}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn nhóm tuổi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả nhóm tuổi</SelectItem>
                      <SelectItem value="Người lớn">Người lớn</SelectItem>
                      <SelectItem value="Trẻ em">Trẻ em</SelectItem>
                      <SelectItem value="Tất cả">Tất cả</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active filters display */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</span>
                    {filters.search && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Tìm kiếm: {filters.search}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange("search", "")} />
                      </Badge>
                    )}
                    {filters.category && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Danh mục: {categories.find((c) => c._id === filters.category)?.name}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange("category", "")} />
                      </Badge>
                    )}
                    {filters.manufacturer && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        NSX: {manufacturers.find((m) => m._id === filters.manufacturer)?.nameCo}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => handleFilterChange("manufacturer", "")}
                        />
                      </Badge>
                    )}
                    {filters.ageGroup && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Nhóm tuổi: {filters.ageGroup}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleFilterChange("ageGroup", "")} />
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
