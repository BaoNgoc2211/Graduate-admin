"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Edit,
  Trash2,
  Search,
  Plus,
  ImageIcon,
  Eye,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { IMedicineUsage } from "@/interface/medicine/usage.interface";
import { useMedicineUsages } from "@/hooks/medicine/usage.hooks";

interface MedicineUsageTableProps {
  onEdit: (usage: IMedicineUsage) => void;
  onDelete: (usage: IMedicineUsage) => void;
  onView: (usage: IMedicineUsage) => void;
  onAdd: () => void;
}

export function MedicineUSageTable({
  onEdit,
  onDelete,
  onView,
  onAdd,
}: MedicineUsageTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: paginatedData, isLoading, error } = useMedicineUsages();

  const usageList = paginatedData?.data ?? [];

  const filteredCategories = usageList.filter((usage) =>
    usage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Nhóm thuốc
            </CardTitle>
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-10 w-full max-w-sm" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>Không thể tải danh sách nhóm thuốc</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <CardTitle className="text-xl font-semibold text-gray-900">
            nhóm thuốc
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredCategories.length} nhóm)
            </span>
          </CardTitle>

          <Button
            onClick={onAdd}
            className="bg-blue-900 hover:bg-blue-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm nhóm
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm nhóm.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "Không tìm thấy nhóm" : "Chưa có nhóm nào"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Thử tìm kiếm với từ khóa khác"
                : "Bắt đầu bằng cách tạo dnhóm thuốc đầu tiên"}
            </p>
            {!searchTerm && (
              <Button
                onClick={onAdd}
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm nhóm đầu tiên
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Ảnh</TableHead>
                    <TableHead>Tên nhóm</TableHead>
                    <TableHead className="w-24">Số thuốc</TableHead>
                    <TableHead className="w-20">Trạng thái</TableHead>
                    <TableHead className="w-32 text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((usage) => (
                    <TableRow key={usage._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              
                          {usage.icon && usage.icon.startsWith("http") ? (
                            <Image
                              src={usage.icon}
                              alt={usage.name}
                              className="h-full w-full object-cover"
                              width={48}
                              height={48}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.nextElementSibling?.classList.remove(
                                  "hidden"
                                );
                              }}
                            />
                          ) : null}
                          <ImageIcon
                            className={`h-6 w-6 text-gray-400 ${
                              usage.icon && usage.icon.startsWith("http")
                                ? "hidden"
                                : ""
                            }`}
                          />
                          <ImageIcon
                            className={`h-6 w-6 text-gray-400 ${
                              usage.icon ? "hidden" : ""
                            }`}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">
                            {usage.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {usage._id?.slice(-8)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700"
                        >
                          {usage.medicineCount || usage.medicine?.length || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            usage.isActive !== false ? "default" : "secondary"
                          }
                          className={
                            usage.isActive !== false
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {usage.isActive !== false ? "Hoạt động" : "Tạm dừng"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(usage)}
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(usage)}
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(usage)}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* #region Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredCategories.map((usage) => (
                <Card key={usage._id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {usage.icon &&
                        (usage.icon.startsWith("http") ||
                          usage.icon.startsWith("/")) ? (
                          <Image
                            src={usage.icon}
                            alt={usage.name}
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              target.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                        ) : null}
                        <ImageIcon
                          className={`h-8 w-8 text-gray-400 ${
                            usage.icon &&
                            (usage.icon.startsWith("http") ||
                              usage.icon.startsWith("/"))
                              ? "hidden"
                              : ""
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant="secondary"
                              className="bg-blue-50 text-blue-700"
                            >
                              {usage.medicineCount ||
                                usage.medicine?.length ||
                                0}{" "}
                              thuốc
                            </Badge>
                            <Badge
                              variant={
                                usage.isActive !== false
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                usage.isActive !== false
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-600"
                              }
                            >
                              {usage.isActive !== false
                                ? "Hoạt động"
                                : "Tạm dừng"}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onView(usage)}
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(usage)}
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(usage)}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* #endregion */}
          </>
        )}
      </CardContent>
    </Card>
  );
}
