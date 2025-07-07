"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

import WarehouseLayout from "@/components/layouts/WarehouseLayout";
import StockDetailSkeleton from "./StockDetailSkeleton";
import StockHeader from "./StockHeader";
import StatsGrid from "./StatsGrid";
import OverviewTab from "./OverviewTab";
import BatchesTab from "./BatchesTab";
import HistoryTab from "./HistoryTab";

import { useByMedicineStock } from "@/hooks/order/stock.hooks";

const StockDetailClient: React.FC = () => {
  /* ------------ fetch data ------------ */
  const { medicine_id } = useParams<{ medicine_id: string }>();
  const { data, isLoading, isError } = useByMedicineStock(medicine_id);
  const [activeTab, setActiveTab] = useState<"overview" | "batches" | "history">("overview");

  /* ------------ loading / error ------------ */
  if (isLoading)
    return (
      <WarehouseLayout>
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <StockDetailSkeleton />
        </section>
      </WarehouseLayout>
    );

  if (isError || !data?.data.length)
    return (
      <WarehouseLayout>
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Không thể tải thông tin chi tiết tồn kho. Vui lòng thử lại sau.
            </AlertDescription>
          </Alert>
        </section>
      </WarehouseLayout>
    );

  /* ------------ derive stats ------------ */
  const stocks = data.data;
  const medicine = stocks[0].medicine;
  const totalQty = stocks.reduce((sum, s) => sum + s.quantity, 0);
  const avgPrice =
    stocks.reduce((sum, s) => sum + s.sellingPrice, 0) / Math.max(stocks.length, 1);
  const expiringSoon = stocks.filter((s) => {
    if (!s.expiryDate) return false;
    const diff = (new Date(s.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff < 60;
  }).length;

  return (
    <WarehouseLayout>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <StockHeader
          medicine={medicine}
          medicineId={medicine_id}
          expiringSoon={expiringSoon}
        />

        <StatsGrid
          totalQty={totalQty}
          batchCount={stocks.length}
          avgPrice={avgPrice}
          expiringSoon={expiringSoon}
        />

        {/* Tabs */}
        <BatchesTab.Provider value={{ activeTab, setActiveTab }}>
          <OverviewTab medicine={medicine} />
          <BatchesTab stocks={stocks} />
          <HistoryTab />
        </BatchesTab.Provider>
      </section>
    </WarehouseLayout>
  );
};

export default StockDetailClient;
