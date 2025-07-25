"use client";

import { useState } from "react";
import { Eye, Edit, Trash2, Package, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import { MedicineDetailModal } from "./MedicineDetailModal"
// import { MedicineDeleteDialog } from "./MedicineDeleteDialog"
// import type { IMedicine } from "@/interfaces/medicine.interface"
import Link from "next/link";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { MedicineDetailModal } from "./medicine-detail-modal";
import { MedicineDeleteDialog } from "./medicine-delete-dialog";
// import MedicineDetailModal from "./MedicineDetailModal";
// import MedicineDeleteDialog from "./MedicineDeleteDialog";

interface MedicineCardProps {
  medicine: IMedicine;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export default function MedicineCard({
  medicine,
  onDelete,
  isDeleting,
}: MedicineCardProps) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const manufacturerName =
    typeof medicine.manufacturer_id === "object"
      ? medicine.manufacturer_id.nameCo
      : "N/A";

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-200 border-gray-200 bg-white">
        <CardContent className="p-4">
          {/* Header with thumbnail and basic info */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-16 w-16 rounded-lg">
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
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 truncate text-sm">
                    {medicine.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Mã: {medicine.code}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 text-xs shrink-0"
                >
                  {medicine.age_group}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Medicine details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="text-gray-600 truncate">
                {medicine.dosageForm} - {medicine.packaging}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-gray-400 shrink-0" />
              <span className="text-gray-600 truncate">{manufacturerName}</span>
            </div>

            {medicine.createdAt && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="text-gray-500 text-xs">
                  {new Date(medicine.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            )}
          </div>

          {/* Usage note */}
          {medicine.note && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600 line-clamp-2">
                {medicine.note}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetailModal(true)}
              className="flex-1 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-1" />
              Xem
            </Button>

            <Link href={`/medicine/${medicine._id}/edit`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <Edit className="h-4 w-4 mr-1" />
                Sửa
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              className="flex-1 border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Xóa
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Modals */}
      <MedicineDetailModal
        medicine={medicine}
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
      />

      <MedicineDeleteDialog
        medicine={medicine}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => onDelete(medicine._id!)}
        isDeleting={isDeleting}
      />
    </>
  );
}
