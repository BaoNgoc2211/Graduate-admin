// "use client"

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { useDeleteMedicineCategory, useMedicineCategoryById } from "@/hooks/medicine/category.hooks"
// // import { useDeleteMedicineCategory, useMedicineCategoryById } from "@/hooks/useMedicineCategory"
// import { Loader2, AlertTriangle } from "lucide-react"

// interface MedicineCategoryDeleteDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   categoryId: string | null
// }

// export function MedicineCategoryDeleteDialog({ isOpen, onClose, categoryId }: MedicineCategoryDeleteDialogProps) {
//   const deleteMutation = useDeleteMedicineCategory()
//   const { data: category } = useMedicineCategoryById(categoryId || "")

//   const handleDelete = async () => {
//     if (!categoryId) return

//     try {
//       await deleteMutation.mutateAsync(categoryId)
//       onClose()
//     } catch (error) {
//       console.error("Error deleting category:", error)
//     }
//   }

//   const medicineCount = category?.data?.medicine?.length || 0
//   const hasRelatedMedicines = medicineCount > 0

//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
//               <AlertTriangle className="w-6 h-6 text-red-600" />
//             </div>
//             <div>
//               <AlertDialogTitle className="text-lg font-semibold text-gray-900">Xác nhận xóa danh mục</AlertDialogTitle>
//             </div>
//           </div>
//         </AlertDialogHeader>

//         <AlertDialogDescription className="text-sm text-gray-600 space-y-3">
//           <p>
//             Bạn có chắc chắn muốn xóa danh mục{" "}
//             <span className="font-medium text-gray-900">&lquot; {category?.data?.name}&rquot;</span> không?
//           </p>

//           {hasRelatedMedicines && (
//             <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
//               <div className="flex items-start gap-2">
//                 <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
//                 <div className="text-amber-800">
//                   <p className="font-medium text-sm">Cảnh báo!</p>
//                   <p className="text-xs mt-1">
//                     Danh mục này hiện có <strong>{medicineCount}</strong> thuốc liên quan. Việc xóa danh mục có thể ảnh
//                     hưởng đến dữ liệu thuốc.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <p className="text-xs text-gray-500">
//             Hành động này không thể hoàn tác. Vui lòng cân nhắc kỹ trước khi thực hiện.
//           </p>
//         </AlertDialogDescription>

//         <AlertDialogFooter className="gap-3">
//           <AlertDialogCancel onClick={onClose} disabled={deleteMutation.isPending} className="flex-1 sm:flex-none">
//             Hủy
//           </AlertDialogCancel>
//           <AlertDialogAction
//             onClick={handleDelete}
//             disabled={deleteMutation.isPending}
//             className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
//           >
//             {deleteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
//             Xóa danh mục
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }
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
import type { IMedicineCategory } from "@/interface/medicine/category.interface"
import Image from "next/image"
import { useDeleteMedicineCategory } from "@/hooks/medicine/category.hooks"

interface MedicineCategoryDeleteDialogProps {
  isOpen: boolean
  onClose: () => void
  category: IMedicineCategory | null
}

export function MedicineCategoryDeleteDialog({ isOpen, onClose, category }: MedicineCategoryDeleteDialogProps) {
  const deleteMutation = useDeleteMedicineCategory()

  const handleDelete = async () => {
    if (!category?._id) return

    try {
      await deleteMutation.mutateAsync(category._id)
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

  if (!category) return null

  const medicineCount = category.medicineCount || category.medicine?.length || 0
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
          {/* Category Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              {category.icon && (
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg border overflow-hidden">
                  <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.name}
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
                {/* <h4 className="font-medium text-gray-900 truncate">{category.name}</h4>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                )} */}
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {medicineCount} thuốc
                  </Badge>
                  <Badge
                    variant={category.isActive !== false ? "default" : "secondary"}
                    className={
                      category.isActive !== false ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }
                  >
                    {category.isActive !== false ? "Hoạt động" : "Tạm dừng"}
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
