/**
 * Component chọn phân loại và nhà sản xuất thuốc
 * Tách từ MedicineForm.tsx - phần categories and manufacturer section
 */

"use client"

import { type Control, Controller, type UseFormSetValue, type FieldErrors } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { MedicineFormData } from "@/schema/medicine/medicine.schema"

interface MedicineCategorySelectorProps {
  control: Control<MedicineFormData>
  setValue: UseFormSetValue<MedicineFormData>
  errors: FieldErrors<MedicineFormData>
  isLoading: boolean
  isOpen: boolean
  onToggle: () => void
  // Data
  categories: any[]
  usages: any[]
  manufacturers: any[]
  // Watched values
  watchedCategories: string[]
  watchedUsages: string[]
  // Handlers
  onCategoryChange: (categoryId: string, checked: boolean) => void
  onUsageChange: (usageId: string, checked: boolean) => void
}

export default function MedicineCategorySelector({
  control,
  setValue,
  errors,
  isLoading,
  isOpen,
  onToggle,
  categories,
  usages,
  manufacturers,
  watchedCategories,
  watchedUsages,
  onCategoryChange,
  onUsageChange,
}: MedicineCategorySelectorProps) {
  return (
    <Card className="border-gray-200">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Phân loại và nhà sản xuất</CardTitle>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-6 space-y-6">
            {/* Manufacturer */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Nhà sản xuất <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="manufacturer_id._id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      const manufacturer = manufacturers.find((m) => m._id === value)
                      setValue("manufacturer_id.nameCo", manufacturer?.nameCo || "")
                    }}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn nhà sản xuất" />
                    </SelectTrigger>
                    <SelectContent>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer._id} value={manufacturer._id!}>
                          {manufacturer.nameCo} - {manufacturer.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.manufacturer_id?._id && (
                <p className="text-sm text-red-600">{errors.manufacturer_id._id.message}</p>
              )}
            </div>

            {/* Medicine Categories */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Danh mục thuốc <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={watchedCategories.includes(category._id!)}
                      onCheckedChange={(checked) => onCategoryChange(category._id!, checked as boolean)}
                      disabled={isLoading}
                    />
                    <Label htmlFor={`category-${category._id}`} className="text-sm font-normal cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
              {watchedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedCategories.map((categoryId) => {
                    const category = categories.find((c) => c._id === categoryId)
                    return category ? (
                      <Badge key={categoryId} variant="secondary" className="bg-blue-100 text-blue-800">
                        {category.name}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => onCategoryChange(categoryId, false)}
                        />
                      </Badge>
                    ) : null
                  })}
                </div>
              )}
              {errors.medCategory_id && <p className="text-sm text-red-600">{errors.medCategory_id.message}</p>}
            </div>

            {/* Medicine Usages */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Cách sử dụng <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {usages.map((usage) => (
                  <div key={usage._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`usage-${usage._id}`}
                      checked={watchedUsages.includes(usage._id!)}
                      onCheckedChange={(checked) => onUsageChange(usage._id!, checked as boolean)}
                      disabled={isLoading}
                    />
                    <Label htmlFor={`usage-${usage._id}`} className="text-sm font-normal cursor-pointer">
                      {usage.name}
                    </Label>
                  </div>
                ))}
              </div>
              {watchedUsages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedUsages.map((usageId) => {
                    const usage = usages.find((u) => u._id === usageId)
                    return usage ? (
                      <Badge key={usageId} variant="secondary" className="bg-green-100 text-green-800">
                        {usage.name}
                        <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => onUsageChange(usageId, false)} />
                      </Badge>
                    ) : null
                  })}
                </div>
              )}
              {errors.medUsage_id && <p className="text-sm text-red-600">{errors.medUsage_id.message}</p>}
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="note" className="text-sm font-medium text-gray-700">
                Ghi chú <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="note"
                    placeholder="Ghi chú thêm về thuốc"
                    className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                )}
              />
              {errors.note && <p className="text-sm text-red-600">{errors.note.message}</p>}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
