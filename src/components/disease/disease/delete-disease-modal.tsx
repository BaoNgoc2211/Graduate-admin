"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteDisease } from "@/hooks/disease/disease.hook";
// import { useDeleteDisease } from "@/hooks/disease/disease.hooks"
import type { IDisease } from "@/interface/disease/disease.interface";
import { Trash2 } from "lucide-react";

interface DeleteDiseaseModalProps {
  disease: IDisease | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteDiseaseModal({
  disease,
  isOpen,
  onClose,
}: DeleteDiseaseModalProps) {
  const deleteDisease = useDeleteDisease();

  const handleDelete = () => {
    if (disease) {
      deleteDisease.mutate(disease._id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  if (!disease) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-red-600">
            <Trash2 className="h-5 w-5 mr-2" />
            Xác nhận xóa bệnh
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Bạn có chắc chắn muốn xóa bệnh này không?</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">Mã bệnh: {disease.code}</p>
              <p className="font-medium">Tên bệnh: {disease.name}</p>
            </div>
            <p className="text-red-600 font-medium">
              Hành động này không thể hoàn tác!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteDisease.isPending}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteDisease.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteDisease.isPending ? "Đang xóa..." : "Xóa"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
