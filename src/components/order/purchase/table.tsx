"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Check,
  X,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  usePurchaseEntries,
  useDeletePurchaseEntry,
  useApprovePurchaseEntry,
  useRejectPurchaseEntry,
  useExportPurchaseEntries,
} from "@/hooks/order/purchase.hooks";
// import { formatPrice } from "@/lib/formatPrice"
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  IPurchaseEntry,
  IPurchaseFilter,
} from "@/interface/order/purchase.interface";
import { formatPrice } from "@/lib/format-price";

interface PurchaseTableProps {
  filters: IPurchaseFilter;
  onEdit: (entry: IPurchaseEntry) => void;
  onView: (entry: IPurchaseEntry) => void;
}

const ITEMS_PER_PAGE = 10;

export function PurchaseTable({ filters, onEdit, onView }: PurchaseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof IPurchaseEntry>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [deleteEntry, setDeleteEntry] = useState<IPurchaseEntry | null>(null);

  const { data: entriesData, isLoading, error } = usePurchaseEntries(filters);
  const deleteEntryMutation = useDeletePurchaseEntry();
  const approveEntryMutation = useApprovePurchaseEntry();
  const rejectEntryMutation = useRejectPurchaseEntry();
  const exportMutation = useExportPurchaseEntries();

  const entries = entriesData?.data || [];

  // Sorting
  const sortedEntries = [...entries].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedEntries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEntries = sortedEntries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSort = (field: keyof IPurchaseEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = async () => {
    if (deleteEntry) {
      await deleteEntryMutation.mutateAsync(deleteEntry._id);
      setDeleteEntry(null);
    }
  };

  const handleApprove = async (id: string) => {
    await approveEntryMutation.mutateAsync(id);
  };

  const handleReject = async (id: string) => {
    await rejectEntryMutation.mutateAsync({
      id,
      reason: "Từ chối từ giao diện quản trị",
    });
  };

  const handleExport = async () => {
    await exportMutation.mutateAsync(filters);
  };

  const getStatusBadge = (status: IPurchaseEntry["status"]) => {
    const statusConfig = {
      draft: { label: "Nháp", variant: "secondary" as const },
      pending: { label: "Chờ duyệt", variant: "default" as const },
      approved: { label: "Đã duyệt", variant: "default" as const },
      rejected: { label: "Từ chối", variant: "destructive" as const },
    };

    const config = statusConfig[status];
    return (
      <Badge
        variant={config.variant}
        className={
          status === "approved"
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : ""
        }
      >
        {config.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-blue-900">
            Danh sách phiếu nhập kho ({entries.length})
          </CardTitle>
          <Button
            onClick={handleExport}
            disabled={exportMutation.isPending}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
          >
            <Download className="h-4 w-4" />
            {exportMutation.isPending ? "Đang xuất..." : "Xuất Excel"}
          </Button>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Không có phiếu nhập kho nào.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("code")}
                      >
                        <div className="flex items-center gap-2">
                          Mã phiếu
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center gap-2">
                          Ngày tạo
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Nhà cung cấp</TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-gray-50 text-right"
                        onClick={() => handleSort("totalAmount")}
                      >
                        <div className="flex items-center justify-end gap-2">
                          Tổng tiền
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEntries.map((entry) => (
                      <TableRow key={entry._id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {entry.code}
                        </TableCell>
                        <TableCell>
                          {format(new Date(entry.createdAt), "dd/MM/yyyy", {
                            locale: vi,
                          })}
                        </TableCell>
                        <TableCell>{entry.supplier.name}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatPrice(entry.totalAmount)}
                        </TableCell>
                        <TableCell>{getStatusBadge(entry.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onView(entry)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              {entry.status === "draft" && (
                                <DropdownMenuItem onClick={() => onEdit(entry)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                              )}
                              {entry.status === "pending" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => handleApprove(entry._id)}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Duyệt phiếu
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleReject(entry._id)}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Từ chối
                                  </DropdownMenuItem>
                                </>
                              )}
                              {(entry.status === "draft" ||
                                entry.status === "rejected") && (
                                <DropdownMenuItem
                                  onClick={() => setDeleteEntry(entry)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {paginatedEntries.map((entry) => (
                  <Card key={entry._id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-blue-900">
                            {entry.code}
                          </p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(entry.createdAt), "dd/MM/yyyy", {
                              locale: vi,
                            })}
                          </p>
                        </div>
                        {getStatusBadge(entry.status)}
                      </div>
                      <div className="space-y-2 mb-3">
                        <p className="text-sm">
                          <span className="font-medium">Nhà cung cấp:</span>{" "}
                          {entry.supplier.name}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Tổng tiền:</span>{" "}
                          {formatPrice(entry.totalAmount)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onView(entry)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Xem
                        </Button>
                        {entry.status === "draft" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onEdit(entry)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa
                          </Button>
                        )}
                        {(entry.status === "draft" ||
                          entry.status === "rejected") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteEntry(entry)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Xóa
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">
                    Hiển thị {startIndex + 1}-
                    {Math.min(startIndex + ITEMS_PER_PAGE, entries.length)}
                    trong tổng số {entries.length} phiếu
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      Trang {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteEntry}
        onOpenChange={() => setDeleteEntry(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa phiếu nhập kho</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa phiếu nhập kho &lquot;
              {deleteEntry?.code}&rquot;? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteEntryMutation.isPending}
            >
              {deleteEntryMutation.isPending ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
