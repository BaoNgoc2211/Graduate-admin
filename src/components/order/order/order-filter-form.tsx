"use client"

import { useState } from "react"
import { Search, Filter, X, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import {
  type IOrderFilters,
  ORDER_STATUS_OPTIONS,
  PAYMENT_METHODS,
  SHIPPING_METHODS,
} from "@/interface/order/order.interface"

interface OrderFilterFormProps {
  filters: IOrderFilters
  onFiltersChange: (filters: IOrderFilters) => void
  onReset: () => void
}

export default function OrderFilterForm({ filters, onFiltersChange, onReset }: OrderFilterFormProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | undefined>(filters.dateFrom ? new Date(filters.dateFrom) : undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(filters.dateTo ? new Date(filters.dateTo) : undefined)

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value === "all" ? undefined : value })
  }

  const handlePaymentMethodChange = (value: string) => {
    onFiltersChange({ ...filters, paymentMethod: value === "all" ? undefined : value })
  }

  const handleShippingMethodChange = (value: string) => {
    onFiltersChange({ ...filters, shippingMethod: value === "all" ? undefined : value })
  }

  const handleDateFromChange = (date: Date | undefined) => {
    setDateFrom(date)
    onFiltersChange({
      ...filters,
      dateFrom: date ? date.toISOString().split("T")[0] : undefined,
    })
  }

  const handleDateToChange = (date: Date | undefined) => {
    setDateTo(date)
    onFiltersChange({
      ...filters,
      dateTo: date ? date.toISOString().split("T")[0] : undefined,
    })
  }

  const hasActiveFilters =
    filters.status || filters.paymentMethod || filters.shippingMethod || filters.dateFrom || filters.dateTo

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search and Toggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, email hoặc số điện thoại..."
                value={filters.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Bộ lọc nâng cao
                {hasActiveFilters && (
                  <span className="ml-2 bg-blue-900 text-white text-xs px-2 py-0.5 rounded-full">
                    {Object.values(filters).filter(Boolean).length}
                  </span>
                )}
              </Button>
              {hasActiveFilters && (
                <Button variant="outline" onClick={onReset} size="sm">
                  <X className="h-4 w-4 mr-1" />
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    {ORDER_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Method Filter */}
              <div className="space-y-2">
                <Label>Phương thức thanh toán</Label>
                <Select value={filters.paymentMethod || "all"} onValueChange={handlePaymentMethodChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả phương thức</SelectItem>
                    {PAYMENT_METHODS.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Shipping Method Filter */}
              <div className="space-y-2">
                <Label>Phương thức vận chuyển</Label>
                <Select value={filters.shippingMethod || "all"} onValueChange={handleShippingMethodChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả phương thức</SelectItem>
                    {SHIPPING_METHODS.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label>Khoảng thời gian</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: vi }) : "Từ ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={dateFrom}
                        onSelect={handleDateFromChange}
                        // disabled={(date) => date > new Date() || (dateTo && date > dateTo)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: vi }) : "Đến ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={dateTo}
                        onSelect={handleDateToChange}
                        // disabled={(date) => date > new Date() || (dateFrom && date < dateFrom)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
