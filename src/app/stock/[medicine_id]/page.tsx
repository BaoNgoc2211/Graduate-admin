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
  Plus,
  Layers,
} from "lucide-react";
import { useByMedicineStock, useStockStats } from "@/hooks/orders/stock.hooks";
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
import EditMedicineModal from "@/components/order/stock/medicine_id/edit-medicine-modal";
import BatchSelectorModal from "@/components/order/stock/medicine_id/batch-selector-modal";
import Image from "next/image";
import StockDetailSkeleton from "@/components/order/stock/medicine_id/stock-detail-skeleton";
import BatchTable from "@/components/order/stock/medicine_id/batch-table";
import StatCard from "@/components/order/stock/medicine_id/stat-card";
import InfoRow from "@/components/order/stock/medicine_id/info-row";
import WarehouseLayout from "./ware-house-layout";
import { IMedicine } from "@/interface/medicine/medicine.interface";

type TabType = "overview" | "batches" | "history";
export interface IMedicineUpdate {
  _id?: string;
  code: string;
  name: string;
  thumbnail: string;
  image?: string[];
  packaging: string;
  dosageForm: string;
  use: string;
  dosage?: string;
  indication?: string;
  adverse?: string;
  contraindication?: string;
  precaution?: string;
  ability?: string;
  pregnancy?: string;
  drugInteractions?: string;
  storage?: string;
  note: string;
  age_group: string;
  medCategory_id: string[];
  medUsage_id: string[];
  manufacturer_id: {
    _id: string;
    nameCo: string;
  };
  importBatch_id: [
    {
      _id: string;
      batchCode: string;
      quantity: number;
      sellingPrice: number;
      expiryDate?: string; 
    }
  ];
  active: "active" | "inactive";
}
const StockDetailPage: React.FC = () => {
  const params = useParams<{ medicine_id: string }>();
  const medicineId = params.medicine_id;
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBatchSelectorOpen, setIsBatchSelectorOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useByMedicineStock(medicineId);

  const stocks = data?.success && data.data ? data.data : [];
  const stats = useStockStats(stocks); // Hook này luôn được gọi

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  const handleMedicineUpdate = (
    medicineId: string,
    updatedData: Partial<IMedicine>
  ) => {
    console.log("Update:", medicineId, updatedData);
    refetch(); 
  };
  

  const handleBatchSelectionChange = (selectedBatchIds: string[]) => {
    console.log("Selected batch IDs:", selectedBatchIds);
    refetch();
  };

  // Render loading state
  if (isLoading) {
    return (
      <WarehouseLayout>
        <section className="px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto">
          <StockDetailSkeleton />
        </section>
      </WarehouseLayout>
    );
  }

  // Render error state
  if (isError || !data?.success || !data.data || data.data.length === 0) {
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

  // Get medicine info
  const medicine = stocks[0]?.medicine;

  if (!medicine) {
    return (
      <WarehouseLayout>
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Không tìm thấy thông tin thuốc</AlertDescription>
          </Alert>
        </section>
      </WarehouseLayout>
    );
  }

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
              <BreadcrumbPage>{medicine.name}</BreadcrumbPage>
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
                src={medicine.thumbnail || "/placeholder.svg"}
                alt={medicine.name || "Ảnh thuốc"}
                className="h-16 w-16 rounded-lg object-cover border"
                width={64}
                height={64}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {medicine.name}
                </h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <span>{medicine.code}</span>
                  <span className="text-gray-300">•</span>
                  <span>{medicine.dosageForm}</span>
                  {stats.expiringSoonItems > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <Badge variant="destructive" className="text-xs">
                        {stats.expiringSoonItems} lô sắp hết hạn
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsBatchSelectorOpen(true)}
            >
              <Layers className="h-4 w-4 mr-2" />
              Quản lý lô
            </Button>
            <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </Button>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="h-4 w-4 mr-2" />
              Nhập thêm
            </Button>
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Tổng tồn kho"
            value={stats.totalQuantity}
            icon={<Package className="h-5 w-5 text-blue-600" />}
          />
          <StatCard
            label="Số lô hàng"
            value={stats.totalItems}
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          />
          <StatCard
            label="Giá trung bình"
            value={formatPrice(stats.averagePrice)}
            icon={<Calendar className="h-5 w-5 text-orange-600" />}
          />
          <StatCard
            label="Sắp hết hạn"
            value={stats.expiringSoonItems}
            icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
            valueClass={
              stats.expiringSoonItems > 0 ? "text-red-600" : "text-gray-900"
            }
          />
        </div>

        {/* Tabs Content */}
        <Card>
          <CardHeader>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as TabType)}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="batches">
                  Lô hàng ({stocks.length})
                </TabsTrigger>
                <TabsTrigger value="history">Lịch sử</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as TabType)}
            >
              {/* OVERVIEW TAB */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Thông tin chung</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <InfoRow
                        label="Nhà sản xuất"
                        value={medicine.manufacturer?.nameCo || "—"}
                      />
                      <InfoRow
                        label="Dạng bào chế"
                        value={medicine.dosageForm || "—"}
                      />
                      <InfoRow
                        label="Quy cách đóng gói"
                        value={medicine.packaging || "—"}
                      />
                      <InfoRow
                        label="Tổng số lượng"
                        value={stats.totalQuantity.toString()}
                      />
                      <InfoRow
                        label="Tồn kho thấp"
                        value={
                          stats.lowStockItems > 0
                            ? `${stats.lowStockItems} lô`
                            : "Không có"
                        }
                      />
                      <InfoRow
                        label="Trạng thái"
                        value={
                          stats.totalQuantity > 0 ? "Còn hàng" : "Hết hàng"
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      Thao tác nhanh
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Cập nhật giá
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsBatchSelectorOpen(true)}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Quản lý lô
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Báo cáo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* BATCHES TAB */}
              <TabsContent value="batches">
                <BatchTable batches={stocks} />
              </TabsContent>

              {/* HISTORY TAB */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <History className="h-5 w-5 text-blue-900" />
                      <h3 className="font-semibold">Lịch sử nhập / xuất</h3>
                    </div>
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500 mb-2">
                        Tính năng lịch sử giao dịch đang được phát triển
                      </p>
                      <p className="text-xs text-gray-400">
                        Sẽ hiển thị các giao dịch nhập kho, xuất kho, và điều
                        chỉnh tồn kho
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Edit Medicine Modal */}
      <EditMedicineModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        medicine={medicine}
        stocks={stocks}
        onUpdate={handleMedicineUpdate}
      />

      {/* Batch Selector Modal */}
      <BatchSelectorModal
        isOpen={isBatchSelectorOpen}
        onClose={() => setIsBatchSelectorOpen(false)}
        medicineId={medicineId}
        currentStocks={stocks}
        onSelectionChange={handleBatchSelectionChange}
      />
    </WarehouseLayout>
  );
};

export default StockDetailPage;
