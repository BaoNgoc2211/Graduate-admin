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
import { useDeleteDiseaseUsageGroup } from "@/hooks/disease/usage.hook";
import { IDiseaseUsage } from "@/interface/disease/disease-usage.interface";
import { Loader2, AlertTriangle } from "lucide-react";

interface DiseaseUsageDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  usage: IDiseaseUsage | null;
}

export function DiseaseUsageDeleteDialog({
  isOpen,
  onClose,
  usage,
}: DiseaseUsageDeleteDialogProps) {
  const deleteMutation = useDeleteDiseaseUsageGroup();

  const handleDelete = () => {
    if (!usage?._id) return;

    deleteMutation.mutate(usage._id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!usage) return null;

  const hasRelatedDiseases = usage.disease && usage.disease.length > 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                Xác nhận xoá danh mục
              </AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-gray-600 space-y-3">
          <p>
            Bạn có chắc chắn muốn xoá danh mục{" "}
            <span className="font-semibold text-gray-900">
              &ldquo{usage.name}&rdquo
            </span>{" "}
            không?
          </p>

          {hasRelatedDiseases && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>Cảnh báo:</strong> Danh mục này có{" "}
                {usage.disease.length} bệnh liên quan. Việc xoá danh mục có thể
                ảnh hưởng đến dữ liệu bệnh tương ứng.
              </p>
            </div>
          )}

          <p className="text-sm">Hành động này không thể hoàn tác.</p>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            disabled={deleteMutation.isPending}
          >
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {deleteMutation.isPending && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            Xoá danh mục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
