"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import {
  Form, FormControl, FormDescription, FormField,
  FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"

import type { IMedicineCategory } from "@/interface/medicine/category.interface"
import { useCreateMedicineCategory, useUpdateMedicineCategory } from "@/hooks/medicine/category.hooks"
import { CategoryImageUpload } from "./sfc"
import { MedicineCategoryFormData, MedicineCategorySchema } from "@/schema/medicine/category.schema"

interface MedicineCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category?: IMedicineCategory | null
  mode: "create" | "edit"
}

export function MedicineCategoryModal({ isOpen, onClose, category, mode }: MedicineCategoryModalProps) {
  const createMutation = useCreateMedicineCategory()
  const updateMutation = useUpdateMedicineCategory()

  const form = useForm<MedicineCategoryFormData>({
    resolver: zodResolver(MedicineCategorySchema),
    defaultValues: {
      name: "",
      icon: "",
      isActive: true,
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && category) {
        form.reset({
          name: category.name || "",
          icon: category.icon || "",
          isActive: category.isActive !== false,
        })
      } else {
        form.reset({
          name: "",
          icon: "",
          isActive: true,
        })
      }
    }
  }, [isOpen, mode, category, form])

  const isLoading = createMutation.isPending || updateMutation.isPending

  const onSubmit = async (data: MedicineCategoryFormData) => {
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(data)
      } else if (mode === "edit" && category?._id) {
        await updateMutation.mutateAsync({ id: category._id, data })
      }
      handleClose()
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      form.reset()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Thêm danh mục thuốc mới" : "Chỉnh sửa danh mục thuốc"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {mode === "create"
              ? "Tạo danh mục thuốc mới để phân loại các sản phẩm thuốc."
              : "Cập nhật thông tin danh mục thuốc đã chọn."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Icon Upload */}
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh danh mục *</FormLabel>
                  <FormControl>
                    <CategoryImageUpload value={field.value} onChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <FormDescription>
                    Tải ảnh đại diện cho danh mục. Nên chọn ảnh vuông.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên danh mục *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên danh mục thuốc..." disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50">
                  <div>
                    <FormLabel>Trạng thái hoạt động</FormLabel>
                    <FormDescription>Danh mục hoạt động sẽ được hiển thị.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-blue-900 text-white hover:bg-blue-800">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {mode === "create" ? "Đang tạo..." : "Đang cập nhật..."}
                  </>
                ) : (
                  <>{mode === "create" ? "Tạo danh mục" : "Cập nhật danh mục"}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
