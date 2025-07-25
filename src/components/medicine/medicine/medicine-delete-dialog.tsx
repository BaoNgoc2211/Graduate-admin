"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IMedicine } from "@/interface/medicine/medicine.interface"

interface MedicineDeleteDialogProps {
  medicine: IMedicine
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isDeleting?: boolean
}

export function MedicineDeleteDialog({
  medicine,
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}: MedicineDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-lg">Xác nhận xóa thuốc</AlertDialogTitle>
          </div>

          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p className="text-gray-600">Bạn có chắc chắn muốn xóa thuốc này? Hành động này không thể hoàn tác.</p>

              {/* Medicine info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12 rounded-lg">
                  <AvatarImage
                    src={medicine.thumbnail || "/placeholder.svg"}
                    alt={medicine.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg bg-gray-100 text-gray-600">
                    {medicine.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{medicine.name}</h4>
                  <p className="text-sm text-gray-500">Mã: {medicine.code}</p>
                  <p className="text-sm text-gray-500">{medicine.dosageForm}</p>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isDeleting ? "Đang xóa..." : "Xóa thuốc"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
