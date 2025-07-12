"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useDeleteVoucher } from "@/hooks/voucher.hooks"
import { IVoucher } from "@/interface/voucher.interface"

interface VoucherDeleteDialogProps {
  voucher: IVoucher
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export default function VoucherDeleteDialog({ voucher, trigger, onSuccess }: VoucherDeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const deleteVoucherMutation = useDeleteVoucher()

  const handleDelete = async () => {
    try {
      await deleteVoucherMutation.mutateAsync(voucher._id)
      setOpen(false)
      onSuccess?.()
    } catch (error) {
      console.error("Delete voucher error:", error)
    }
  }

  const isUsed = voucher.usedCount > 0
  const isActive = voucher.isActive && new Date(voucher.endDate) > new Date()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">Xác nhận xóa voucher</AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-gray-900">{voucher.name}</div>
            <div className="text-sm text-gray-600 font-mono">{voucher.code}</div>
          </div>

          <div className="text-sm text-gray-700">
            Bạn có chắc chắn muốn xóa voucher này không? Hành động này không thể hoàn tác.
          </div>

          {/* Warning messages */}
          {isUsed && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <div className="font-medium">Cảnh báo:</div>
                  <div>
                    Voucher này đã được sử dụng {voucher.usedCount.toLocaleString()} lần. Việc xóa có thể ảnh hưởng đến
                    lịch sử đơn hàng.
                  </div>
                </div>
              </div>
            </div>
          )}

          {isActive && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <ExclamationTriangleIcon className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-800">
                  <div className="font-medium">Chú ý:</div>
                  <div>Voucher này đang hoạt động và có thể đang được khách hàng sử dụng.</div>
                </div>
              </div>
            </div>
          )}
        </AlertDialogDescription>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="flex-1 sm:flex-none">Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteVoucherMutation.isPending}
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteVoucherMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang xóa...
              </>
            ) : (
              "Xóa voucher"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
