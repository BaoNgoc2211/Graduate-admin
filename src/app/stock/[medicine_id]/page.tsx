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
  Edit,
  History,
} from "lucide-react";
import { useByMedicineStock } from "@/hooks/orders/stock.hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import StockDetailSkeleton from "@/components/order/stock/medicine_id/stock-detail-skeleton";
import BatchTable from "@/components/order/stock/medicine_id/batch-table";
import WarehouseLayout from "@/components/order/stock/warehouse-Layout";
import StatCard from "@/components/order/stock/medicine_id/stat-card";
import InfoRow from "@/components/order/stock/medicine_id/info-row";

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
        {/* <section className="px-4 sm:px-4 lg:px-8 py-8"> */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto">
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
  const medicine: any = stocks[0]?.medicine;
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
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* <StatCard label="Tổng tồn kho" value={totalQty} icon={<Package />} />
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
          /> */}
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

export default StockDetailPage;
