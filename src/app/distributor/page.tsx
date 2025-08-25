"use client";
import { useState } from "react";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IDistributor } from "@/interface/inventory/distributor.interface";
import {
  useDeleteDistributor,
  useDistributors,
} from "@/hooks/inventory/distributor.hooks";
import { useRouter } from "next/navigation";
import DistributorForm from "@/components/inventory/distributor/distributor-form";
import PageHeader from "@/components/layout/page-header";

export default function DistributorPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDistributor, setEditingDistributor] = useState<
    IDistributor | undefined
  >();
  const itemsPerPage = 5;
  const deleteDistributor = useDeleteDistributor();
  const { data: distributorsData, isLoading, refetch } = useDistributors();
  const distributors = distributorsData?.data || [];
  const filteredDistributors = distributors.filter(
    (distributor) =>
      distributor.nameCo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.nameRep.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDistributors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDistributors = filteredDistributors.slice(startIndex, endIndex);

  const handleCreate = () => {
    setEditingDistributor(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (distributor: IDistributor) => {
    router.push(`/distributor/edit/${distributor._id}`);
  };
  const handleViewDetails = (id: string) => {
    console.log("View details for distributor:", id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa nhà phân phối này không?")) {
      deleteDistributor.mutate(id, {
        onSuccess: () => {
          refetch(); // Làm mới danh sách sau khi xoá
          alert("Xoá thành công!");
        },
        onError: () => {
          alert("Đã có lỗi xảy ra khi xoá.");
        },
      });
    }
  };
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingDistributor(undefined);
    refetch(); // Refresh danh sách
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingDistributor(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Quản lý Nhà Phân Phối"
        subtitle="Danh sách và quản lý các nhà phân phối"
      />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl text-blue-900">
                Danh sách Nhà phân phối
              </CardTitle>
              <div className="flex flex-col lg:flex-row lg:gap-5 sm:flex-col gap-3 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm distributor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button
                  className="bg-blue-900 hover:bg-blue-800"
                  onClick={handleCreate}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm mới
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-blue-900">
                      Tên công ty
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Người đại diện
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Email
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Số điện thoại
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Địa chỉ
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900">
                      Quốc gia
                    </TableHead>
                    <TableHead className="font-semibold text-blue-900 text-center">
                      Hành động
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDistributors.map((distributor) => (
                    <TableRow
                      key={distributor._id}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {distributor.nameCo}
                      </TableCell>
                      <TableCell>{distributor.nameRep}</TableCell>
                      <TableCell>{distributor.email}</TableCell>
                      <TableCell>{distributor.phone}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {distributor.address}
                      </TableCell>
                      <TableCell>{distributor.country}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            onClick={() => handleViewDetails(distributor._id!)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Chi tiết
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                            onClick={() => handleEdit(distributor)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            onClick={() => handleDelete(distributor._id!)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xoá
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              <div className="space-y-4 p-4">
                {currentDistributors.map((distributor) => (
                  <Card
                    key={distributor._id}
                    className="border border-gray-200"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-blue-900">
                            {distributor.nameCo}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {distributor.nameRep}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Email:</span>{" "}
                            {distributor.email}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Phone:</span>{" "}
                            {distributor.phone}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Địa chỉ:</span>{" "}
                            {distributor.address}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Quốc gia:</span>{" "}
                            {distributor.country}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex-1"
                            onClick={() => handleViewDetails(distributor._id!)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Chi tiết
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex-1"
                            onClick={() => handleEdit(distributor)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 flex-1"
                            onClick={() => handleDelete(distributor._id!)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xoá
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t bg-gray-50 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Hiển thị {startIndex + 1} đến{" "}
                    {Math.min(endIndex, filteredDistributors.length)} trong tổng
                    số {filteredDistributors.length} kết quả
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                              className={
                                currentPage === page
                                  ? "bg-blue-900 text-white"
                                  : ""
                              }
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingDistributor
                ? "Cập nhật nhà phân phối"
                : "Thêm mới nhà phân phối"}
            </DialogTitle>
          </DialogHeader>
          <DistributorForm
            defaultValue={editingDistributor}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
