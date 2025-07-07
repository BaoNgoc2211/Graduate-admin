"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Eye,
  Edit,
  // Clock,
  History,
} from "lucide-react";

import { useByMedicineStock } from "@/hooks/order/stock.hooks";
import type { IStock } from "@/interface/order/stock.interface";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                              Warehouse Layout                              */
/* -------------------------------------------------------------------------- */
const WarehouseLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="min-h-screen flex flex-col bg-white">
    {/* Header */}
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8 text-blue-900" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Quản lý Kho
              </h1>
              <p className="text-sm text-gray-500">
                Hệ thống nhà thuốc thông minh
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/stock" className="text-blue-900 font-medium">
              Tồn kho
            </Link>
            <Link
              href="/purchase"
              className="text-gray-600 hover:text-gray-900"
            >
              Nhập hàng
            </Link>
            <Link href="/reports" className="text-gray-600 hover:text-gray-900">
              Báo cáo
            </Link>
          </nav>
        </div>
      </div>
    </header>

    {/* Main */}
    <main className="flex-1">{children}</main>

    {/* Footer */}
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          © 2024&nbsp;Smart Pharmacy System. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                             Helper Components                              */
/* -------------------------------------------------------------------------- */

// Table hiển thị lô hàng
const BatchTable: React.FC<{ batches: IStock[] }> = ({ batches }) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const formatDate = (d: Date | string | undefined) =>
    d ? new Intl.DateTimeFormat("vi-VN").format(new Date(d)) : "—";

  const isExpiringSoon = (expiry?: Date | string) => {
    if (!expiry) return false;
    const diffDays =
      (new Date(expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays < 60;
  };
  const isExpired = (expiry?: Date | string) =>
    expiry ? new Date(expiry) < new Date() : false;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Lô hàng",
                  "Số lượng",
                  "Giá bán",
                  "Hạn sử dụng",
                  "Ngày nhập",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 ${
                      h === "" ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {batches.map((b) => (
                <tr
                  key={b._id}
                  className={`group hover:bg-gray-50 transition-colors ${
                    isExpired(b.expiryDate)
                      ? "bg-red-50"
                      : isExpiringSoon(b.expiryDate)
                      ? "bg-orange-50"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {b.batchNumber || `Lô ${b._id?.slice(-6)}`}
                      </span>
                      {isExpired(b.expiryDate) && (
                        <Badge variant="destructive">Hết hạn</Badge>
                      )}
                      {isExpiringSoon(b.expiryDate) &&
                        !isExpired(b.expiryDate) && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800"
                          >
                            Sắp hết hạn
                          </Badge>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {b.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {formatPrice(b.sellingPrice)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatDate(b.expiryDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(b.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {batches.map((b) => (
          <Card
            key={b._id}
            className={`${
              isExpired(b.expiryDate)
                ? "border-red-200 bg-red-50"
                : isExpiringSoon(b.expiryDate)
                ? "border-orange-200 bg-orange-50"
                : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">
                    {b.batchNumber || `Lô ${b._id?.slice(-6)}`}
                  </h3>
                  {isExpired(b.expiryDate) && (
                    <Badge variant="destructive">Hết hạn</Badge>
                  )}
                  {isExpiringSoon(b.expiryDate) && !isExpired(b.expiryDate) && (
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800"
                    >
                      Sắp hết hạn
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Số lượng:</span>{" "}
                  <span>{b.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-500">Giá bán:</span>{" "}
                  <span>{formatPrice(b.sellingPrice)}</span>
                </div>
                <div>
                  <span className="text-gray-500">HSD:</span>{" "}
                  <span
                    className={isExpired(b.expiryDate) ? "text-red-600" : ""}
                  >
                    {formatDate(b.expiryDate)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Ngày nhập:</span>{" "}
                  <span>{formatDate(b.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                           Skeleton (Loading state)                         */
/* -------------------------------------------------------------------------- */
const StockDetailSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader>
        <Skeleton className="h-10 w-60" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </CardContent>
    </Card>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                           Main Stock Detail Page                           */
/* -------------------------------------------------------------------------- */
const StockDetailPage: React.FC = () => {
  const params = useParams<{ medicine_id: string }>();
  const medicineId = params.medicine_id;
  const [activeTab, setActiveTab] = useState<
    "overview" | "batches" | "history"
  >("overview");

  const { data, isLoading, isError } = useByMedicineStock(medicineId);

  if (isLoading) {
    return (
      <WarehouseLayout>
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <StockDetailSkeleton />
        </section>
      </WarehouseLayout>
    );
  }

  if (isError || !data?.data || data.data.length === 0) {
    return (
      <WarehouseLayout>
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Không thể tải thông tin chi tiết tồn kho. Vui lòng thử lại sau.
            </AlertDescription>
          </Alert>
        </section>
      </WarehouseLayout>
    );
  }

  const stocks = data.data;
  const medicine: any = stocks[0]?.medicine; // Giả sử API populate
  const totalQty = stocks.reduce((acc, s) => acc + s.quantity, 0);
  const avgPrice =
    stocks.reduce((acc, s) => acc + s.sellingPrice, 0) /
    Math.max(stocks.length, 1);
  const expiringSoon = stocks.filter((s) => {
    if (!s.expiryDate) return false;
    const diff =
      (new Date(s.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff < 60;
  }).length;

  const formatPrice = (v: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(v);

  return (
    <WarehouseLayout>
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/stock">Tồn kho</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{medicine?.name || medicineId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/stock">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Image
                src={medicine?.thumbnail || "/placeholder.svg"}
                alt={medicine?.name || "Ảnh thuốc"}
                className="h-16 w-16 rounded-lg object-cover border"
                width={64}
                height={64}
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {medicine?.name}
                </h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <span>{medicine?.code}</span>
                  <span className="text-gray-300">•</span>
                  <span>{medicine?.dosageForm}</span>
                  {expiringSoon > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <Badge variant="destructive" className="text-xs">
                        {expiringSoon} lô sắp hết hạn
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Package className="h-4 w-4 mr-2" />
              Nhập thêm
            </Button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Tổng tồn kho" value={totalQty} icon={<Package />} />
          <StatCard
            label="Số lô hàng"
            value={stocks.length}
            icon={<TrendingUp />}
          />
          <StatCard
            label="Giá trung bình"
            value={formatPrice(avgPrice)}
            icon={<Calendar />}
          />
          <StatCard
            label="Sắp hết hạn"
            value={expiringSoon}
            icon={<AlertTriangle className="text-red-600" />}
            valueClass="text-red-600"
          />
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="batches">Lô hàng</TabsTrigger>
                <TabsTrigger value="history">Lịch sử</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
            >
              {/* OVERVIEW */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Thông tin chung</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <InfoRow
                        label="Hoạt chất"
                        value={medicine?.ingredient || "—"}
                      />
                      <InfoRow
                        label="Nhà sản xuất"
                        value={medicine?.manufacturer_id?.nameCo || "—"}
                      />
                      <InfoRow
                        label="Đơn vị"
                        value={medicine?.dosageForm || "—"}
                      />
                      <InfoRow
                        label="Quy cách đóng gói"
                        value={medicine?.packaging || "—"}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* BATCHES */}
              <TabsContent value="batches">
                <BatchTable batches={stocks} />
              </TabsContent>

              {/* HISTORY */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <History className="h-5 w-5 text-blue-900" />
                      <h3 className="font-semibold">Lịch sử nhập / xuất</h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      Phần log lịch sử sẽ hiển thị ở đây (đang trong quá trình
                      phát triển).
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </WarehouseLayout>
  );
};

/* -------------------------------------------------------------------------- */
/*                       Small Reusable Presentation bits                     */
/* -------------------------------------------------------------------------- */

const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  icon: React.ReactElement;
  valueClass?: string;
}> = ({ label, value, valueClass }) => (
  // , icon
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`text-2xl font-bold ${valueClass ?? "text-gray-900"}`}>
            {value}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex items-center">
    <span className="w-40 text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default StockDetailPage;
