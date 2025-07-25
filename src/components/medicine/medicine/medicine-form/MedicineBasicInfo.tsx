/**
 * Component thông tin cơ bản của thuốc
 * Tách từ MedicineForm.tsx - phần basic information section
 */

"use client"

import type { UseFormRegister, FieldErrors } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import MedicineImageUpload from "./MedicineImageUpload"
import { MedicineFormData } from "@/schema/medicine/medicine.schema"

interface MedicineBasicInfoProps {
  register: UseFormRegister<MedicineFormData>
  errors: FieldErrors<MedicineFormData>
  isLoading: boolean
  isOpen: boolean
  onToggle: () => void
  // Image upload props
  thumbnail: string
  images: string[]
  onThumbnailUpload: (file: File) => Promise<void>
  onImageUpload: (file: File) => Promise<void>
  onThumbnailRemove: () => void
  onImageRemove: (index: number) => void
  isUploading: boolean
}

export default function MedicineBasicInfo({
  register,
  errors,
  isLoading,
  isOpen,
  onToggle,
  thumbnail,
  images,
  onThumbnailUpload,
  onImageUpload,
  onThumbnailRemove,
  onImageRemove,
  isUploading,
}: MedicineBasicInfoProps) {
  return (
    <Card className="border-gray-200">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">Thông tin cơ bản</CardTitle>
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
                <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                  Mã thuốc <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  {...register("code")}
                  placeholder="Nhập mã thuốc"
                  disabled={isLoading}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.code && <p className="text-sm text-red-600">{errors.code.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Tên thuốc <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Nhập tên thuốc"
                  disabled={isLoading}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosageForm" className="text-sm font-medium text-gray-700">
                  Dạng bào chế <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dosageForm"
                  {...register("dosageForm")}
                  placeholder="VD: Viên nén, Viên nang, Siro..."
                  disabled={isLoading}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.dosageForm && <p className="text-sm text-red-600">{errors.dosageForm.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age_group" className="text-sm font-medium text-gray-700">
                  Nhóm tuổi <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="age_group"
                  {...register("age_group")}
                  placeholder="VD: Người lớn, Trẻ em, Tất cả"
                  disabled={isLoading}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.age_group && <p className="text-sm text-red-600">{errors.age_group.message}</p>}
              </div>
            </div>

            <Separator />

            <MedicineImageUpload
              thumbnail={thumbnail}
              images={images}
              onThumbnailUpload={onThumbnailUpload}
              onImageUpload={onImageUpload}
              onThumbnailRemove={onThumbnailRemove}
              onImageRemove={onImageRemove}
              isUploading={isUploading}
              isLoading={isLoading}
              thumbnailError={errors.thumbnail?.message}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
