"use client"

import type { UseFormRegister, FieldErrors } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { MedicineFormData } from "@/schema/medicine/medicine.schema"

interface MedicineSafetyInfoProps {
  register: UseFormRegister<MedicineFormData>
  errors: FieldErrors<MedicineFormData>
  isLoading: boolean
  isOpen: boolean
  onToggle: () => void
}

export default function MedicineSafetyInfo({ register, isLoading, isOpen, onToggle }: MedicineSafetyInfoProps) {
  return (
    <Card className="border-gray-200">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Thông tin an toàn</CardTitle>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contraindication" className="text-sm font-medium text-gray-700">
                  Chống chỉ định
                </Label>
                <Textarea
                  id="contraindication"
                  {...register("contraindication")}
                  placeholder="Mô tả các trường hợp chống chỉ định"
                  className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precaution" className="text-sm font-medium text-gray-700">
                  Thận trọng khi sử dụng
                </Label>
                <Textarea
                  id="precaution"
                  {...register("precaution")}
                  placeholder="Các lưu ý thận trọng khi sử dụng"
                  className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ability" className="text-sm font-medium text-gray-700">
                  Khả năng lái xe và vận hành máy móc
                </Label>
                <Textarea
                  id="ability"
                  {...register("ability")}
                  placeholder="Ảnh hưởng đến khả năng lái xe và vận hành máy móc"
                  className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pregnancy" className="text-sm font-medium text-gray-700">
                  Thời kỳ mang thai và cho con bú
                </Label>
                <Textarea
                  id="pregnancy"
                  {...register("pregnancy")}
                  placeholder="Lưu ý khi sử dụng trong thời kỳ mang thai và cho con bú"
                  className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="drugInteractions" className="text-sm font-medium text-gray-700">
                  Tương tác thuốc
                </Label>
                <Textarea
                  id="drugInteractions"
                  {...register("drugInteractions")}
                  placeholder="Các tương tác với thuốc khác"
                  className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage" className="text-sm font-medium text-gray-700">
                  Bảo quản
                </Label>
                <Textarea
                  id="storage"
                  {...register("storage")}
                  placeholder="Hướng dẫn bảo quản thuốc"
                  className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
