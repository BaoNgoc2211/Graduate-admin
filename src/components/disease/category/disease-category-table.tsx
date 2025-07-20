"use client";

import { useState } from "react";
import type { IDiseaseCategory } from "@/interface/disease/disease-category.interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { DiseaseCategoryForm } from "./disease-category-form";
import { DiseaseCategoryDeleteDialog } from "./disease-category-delete-dialog";

interface DiseaseCategoryTableProps {
  categories: IDiseaseCategory[];
  isLoading?: boolean;
}

export function DiseaseCategoryTable({
  categories,
  isLoading,
}: DiseaseCategoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<IDiseaseCategory | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const itemsPerPage = 10;

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEdit = (category: IDiseaseCategory) => {
    setSelectedCategory(category);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleDelete = (category: IDiseaseCategory) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCategory(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-blue-900">
              Quản lý Danh mục Bệnh
            </CardTitle>
            <Button
              onClick={handleAddNew}
              className="bg-blue-900 hover:bg-blue-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm danh mục
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="text-sm">
              Tổng: {filteredCategories.length} danh mục
            </Badge>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-16">STT</TableHead>
                  <TableHead className="w-20">Icon</TableHead>
                  <TableHead>Tên danh mục</TableHead>
                  <TableHead className="w-32 text-center">
                    Số bệnh liên quan
                  </TableHead>
                  <TableHead className="w-24 text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-500"
                    >
                      {searchTerm
                        ? "Không tìm thấy danh mục nào"
                        : "Chưa có danh mục nào"}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCategories.map((category, index) => (
                    <TableRow key={category._id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                          {category.icon ? (
                            <Image
                              src={category.icon || "/placeholder.svg"}
                              alt={category.name}
                              className="w-full h-full object-cover"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className="text-blue-700 border-blue-200"
                        >
                          {category.disease?.length || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(category)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(category)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xoá
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Hiển thị {startIndex + 1} -{" "}
                {Math.min(startIndex + itemsPerPage, filteredCategories.length)}{" "}
                trong tổng số {filteredCategories.length} danh mục
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Trước
                </Button>
                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className={
                        currentPage === i + 1
                          ? "bg-blue-900 hover:bg-blue-800"
                          : ""
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Sau
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <DiseaseCategoryForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        category={selectedCategory}
        mode={formMode}
      />

      {/* Delete Dialog */}
      <DiseaseCategoryDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        category={selectedCategory}
      />
    </div>
  );
}
