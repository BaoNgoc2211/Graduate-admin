"use client"

import type { UseFormRegister, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { MedicineFormData } from "@/schema/medicine/medicine.schema"

interface MedicineDetailsInfoProps {
  register: UseFormRegister<MedicineFormData>
  errors: FieldErrors<MedicineFormData>
  isLoading: boolean
  isOpen: boolean
  onToggle: () => void
}

export default function MedicineDetailsInfo({
  register,
  errors,
  isLoading,
  isOpen,
  onToggle,
}: MedicineDetailsInfoProps) {
  return (
    <Card className="border-gray-200">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900">Chi tiết thuốc</CardTitle>
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
                <Label htmlFor="packaging" className="text-sm font-medium text-gray-700">
                  Đóng gói <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="packaging"
                  {...register("packaging")}
                  placeholder="VD: Hộp 10 vỉ x 10 viên"
                  disabled={isLoading}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.packaging && <p className="text-sm text-red-600">{errors.packaging.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage" className="text-sm font-medium text-gray-700">
                  Liều dùng
                </Label>
                <Input
                  id="dosage"
                  {...register("dosage")}
                  placeholder="VD: 1-2 viên/lần, 2-3 lần/ngày"
                  disabled={isLoading}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="use" className="text-sm font-medium text-gray-700">
                  Cách dùng <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="use"
                  {...register("use")}
                  placeholder="Mô tả cách sử dụng thuốc"
                  className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
                {errors.use && <p className="text-sm text-red-600">{errors.use.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="indication" className="text-sm font-medium text-gray-700">
                    Công dụng
                  </Label>
                  <Textarea
                    id="indication"
                    {...register("indication")}
                    placeholder="Mô tả công dụng của thuốc"
                    className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adverse" className="text-sm font-medium text-gray-700">
                    Tác dụng phụ
                  </Label>
                  <Textarea
                    id="adverse"
                    {...register("adverse")}
                    placeholder="Mô tả các tác dụng phụ có thể xảy ra"
                    className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
