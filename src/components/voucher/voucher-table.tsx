"use client";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { IVoucher } from "@/interface/voucher.interface";
import VoucherForm from "./voucher-form";
import VoucherDeleteDialog from "./voucher-detail-dialog";

interface VoucherTableProps {
  vouchers: IVoucher[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function VoucherTable({
  vouchers,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: VoucherTableProps) {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch {
      return "Không xác định";
    }
  };

  const getVoucherStatus = (voucher: IVoucher) => {
    const now = new Date();
    const endDate = new Date(voucher.endDate);

    if (!voucher.isActive) {
      return { label: "Ngừng hoạt động", variant: "secondary" as const };
    }

    if (endDate <= now) {
      return { label: "Hết hạn", variant: "destructive" as const };
    }

    return { label: "Đang hoạt động", variant: "default" as const };
  };

  const getDiscountDisplay = (voucher: IVoucher) => {
    if (voucher.discountType === "PERCENTAGE") {
      return `${voucher.discountValue}%`;
    }
    return formatCurrency(voucher.discountValue);
  };

  const handleView = (voucherId: string) => {
    router.push(`/voucher/${voucherId}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Danh sách voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!vouchers || vouchers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Danh sách voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              Không có voucher nào trong hệ thống
            </div>
            <VoucherForm
              trigger={
                <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                  Tạo voucher đầu tiên
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách voucher</CardTitle>
        <p className="text-sm text-gray-600">
          Quản lý tất cả voucher trong hệ thống ({vouchers.length} voucher)
        </p>
      </CardHeader>
      <CardContent>
        {/* Mobile view - Cards */}
        <div className="block md:hidden space-y-4">
          {vouchers.map((voucher) => {
            const status = getVoucherStatus(voucher);
            const usagePercentage =
              voucher.usageLimit > 0
                ? (voucher.usedCount / voucher.usageLimit) * 100
                : 0;

            return (
              <Card key={voucher._id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {voucher.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-mono">
                      {voucher.code}
                    </p>
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại giảm giá:</span>
                    <span className="font-medium">
                      {voucher.discountType === "PERCENTAGE"
                        ? "Phần trăm"
                        : "Cố định"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giá trị:</span>
                    <span className="font-medium">
                      {getDiscountDisplay(voucher)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sử dụng:</span>
                    <span className="font-medium">
                      {voucher.usedCount?.toLocaleString() ?? 0} /{" "}
                      {voucher.usageLimit?.toLocaleString() ?? 0}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={usagePercentage} className="h-2" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium">
                      {formatDate(voucher.startDate)} -{" "}
                      {formatDate(voucher.endDate)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(voucher._id)}
                    className="flex-1"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    Xem
                  </Button>
                  <VoucherForm
                    voucher={voucher}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Sửa
                      </Button>
                    }
                  />
                  <VoucherDeleteDialog
                    voucher={voucher}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Desktop view - Table */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên chương trình</TableHead>
                <TableHead>Mã code</TableHead>
                <TableHead>Loại giảm giá</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Sử dụng</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vouchers.map((voucher) => {
                const status = getVoucherStatus(voucher);
                const usagePercentage =
                  voucher.usageLimit > 0
                    ? (voucher.usedCount / voucher.usageLimit) * 100
                    : 0;

                return (
                  <TableRow key={voucher._id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {voucher.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {voucher.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {voucher.code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {voucher.discountType === "PERCENTAGE"
                          ? "Phần trăm"
                          : "Cố định"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {getDiscountDisplay(voucher)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {voucher.usedCount?.toLocaleString() ?? 0} /{" "}
                          {voucher.usageLimit?.toLocaleString() ?? 0}
                        </div>
                        <Progress
                          value={usagePercentage}
                          className="h-2 w-20"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(voucher.startDate)}</div>
                        <div className="text-gray-500">
                          {formatDate(voucher.endDate)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(voucher._id)}
                          className="h-8 w-8 p-0"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <VoucherForm
                          voucher={voucher}
                          trigger={
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <VoucherDeleteDialog voucher={voucher} />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {/* {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Trang trước
            </Button>
            <div className="text-sm text-gray-600 flex items-center">
              Trang {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Trang sau →
            </Button>
          </div>
        )} */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Trang trước
            </Button>
            <div className="text-sm text-gray-600 flex items-center">
              Trang {currentPage} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Trang sau →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
