"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle, Trash2 } from "lucide-react"
import Image from "next/image"
import { useDeleteMedicineUsage } from "@/hooks/medicine/usage.hooks"
import { IMedicineUsage } from "@/interface/medicine/usage.interface"

interface MedicineUsageDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  usage: IMedicineUsage | null
}

export function MedicineUsageDeleteDialog({ isOpen, onClose, usage }: MedicineUsageDeleteDialogProps) {
  const deleteMutation = useDeleteMedicineUsage()

  const handleDelete = async () => {
    if (!usage?._id) return

    try {
      await deleteMutation.mutateAsync(usage._id)
      onClose()
    } catch (error) {
      // Error handling is done in the mutation hook
      console.error("Delete error:", error)
    }
  }

  const handleClose = () => {
    if (!deleteMutation.isPending) {
      onClose()
    }
  }

  if (!usage) return null

  const medicineCount = usage.medicineCount || usage.medicine?.length || 0
  const hasRelatedMedicines = medicineCount > 0

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">Xóa danh mục thuốc</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 mt-1">
                Bạn có chắc chắn muốn xóa danh mục này không?
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Usage Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              {usage.icon && (
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg border overflow-hidden">
                  <Image
                    src={usage.icon || "/placeholder.svg"}
                    alt={usage.name}
                    className="w-full h-full object-cover"
                    width={48}
                    height={48}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {medicineCount} thuốc
                  </Badge>
                  <Badge
                    variant={usage.isActive !== false ? "default" : "secondary"}
                    className={
                      usage.isActive !== false ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }
                  >
                    {usage.isActive !== false ? "Hoạt động" : "Tạm dừng"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Warning for related medicines */}
          {hasRelatedMedicines && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Cảnh báo:</strong> Danh mục này hiện có {medicineCount} sản phẩm thuốc. Việc xóa danh mục có thể
                ảnh hưởng đến việc phân loại các sản phẩm này.
              </AlertDescription>
            </Alert>
          )}

          {/* Confirmation text */}
          <div className="text-sm text-gray-600">
            <p>Hành động này không thể hoàn tác. Danh mục sẽ bị xóa vĩnh viễn khỏi hệ thống.</p>
            {hasRelatedMedicines && (
              <p className="mt-2 font-medium text-amber-700">
                Các sản phẩm thuốc trong danh mục này sẽ không còn được phân loại.
              </p>
            )}
          </div>
        </div>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <AlertDialogCancel disabled={deleteMutation.isPending} className="w-full sm:w-auto order-2 sm:order-1">
            Hủy bỏ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white order-1 sm:order-2"
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa danh mục
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
