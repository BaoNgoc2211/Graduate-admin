"use client";

import { useState } from "react";
import { Eye, Edit, Trash2, MoreHorizontal, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MedicineDetailModal } from "./medicine-detail-modal";
import { MedicineDeleteDialog } from "./medicine-delete-dialog";
import Link from "next/link";
import { IMedicine } from "@/interface/medicine/medicine.interface";

interface MedicineTableProps {
  medicines: IMedicine[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
  isDeleting?: boolean;
}

export default function MedicineTable({
  medicines,
  onDelete,
  isLoading,
  isDeleting,
}: MedicineTableProps) {
  const [selectedMedicine, setSelectedMedicine] = useState<IMedicine | null>(
    null
  );
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleViewDetails = (medicine: IMedicine) => {
    setSelectedMedicine(medicine);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (medicine: IMedicine) => {
    setSelectedMedicine(medicine);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedMedicine?._id) {
      onDelete(selectedMedicine._id);
    }
  };

  if (isLoading) {
    return <MedicineTableSkeleton />;
  }

  if (medicines.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không có thuốc nào
        </h3>
        <p className="text-gray-500 mb-6">
          Bắt đầu bằng cách thêm thuốc mới vào hệ thống
        </p>
        <Link href="/medicine/create">
          <Button className="bg-blue-900 hover:bg-blue-800">
            Thêm thuốc mới
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-16">Ảnh</TableHead>
              <TableHead className="min-w-[200px] text-start">
                Thông tin thuốc
              </TableHead>
              <TableHead className="min-w-[150px] text-start">
                Dạng bào chế
              </TableHead>
              <TableHead className="min-w-[150px] text-start">
                Nhà sản xuất
              </TableHead>
              <TableHead className="w-[100px] text-start">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((medicine) => {
              const manufacturerName =
                medicine.manufacturer_id &&
                typeof medicine.manufacturer_id === "object"
                  ? medicine.manufacturer_id.nameCo
                  : "N/A";

              return (
                <TableRow key={medicine._id} className="hover:bg-gray-50">
                  <TableCell>
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
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900 line-clamp-1">
                        {medicine.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Mã: {medicine.code}
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-1">
                        {medicine.packaging}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="flex justify-between">
                    <span className="text-sm text-gray-900">
                      {medicine.dosageForm}
                    </span>
                  </TableCell>

                  <TableCell className="px-10 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {manufacturerName}
                    </span>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(medicine)}
                          className="cursor-pointer"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <Link href={`/medicine/${medicine._id}/edit`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(medicine)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa thuốc
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      {selectedMedicine && (
        <>
          <MedicineDetailModal
            medicine={selectedMedicine}
            open={showDetailModal}
            onOpenChange={setShowDetailModal}
          />

          <MedicineDeleteDialog
            medicine={selectedMedicine}
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onConfirm={handleDeleteConfirm}
            isDeleting={isDeleting}
          />
        </>
      )}
    </>
  );
}

// Loading skeleton component
function MedicineTableSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-16">Ảnh</TableHead>
            <TableHead className="min-w-[200px]">Thông tin thuốc</TableHead>
            <TableHead className="min-w-[150px]">Dạng bào chế</TableHead>
            <TableHead className="min-w-[150px]">Nhà sản xuất</TableHead>
            <TableHead className="w-[100px] text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-12 w-12 rounded-lg" />
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              {/* <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell> */}
              <TableCell className="text-right">
                <Skeleton className="h-8 w-8 rounded ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
