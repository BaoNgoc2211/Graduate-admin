"use client";

import { Package, TrendingUp, Calendar, AlertTriangle } from "lucide-react";
import StatCard from "./ui/StatCard";

interface Props {
  totalQty: number;
  batchCount: number;
  avgPrice: number;
  expiringSoon: number;
}

const StatsGrid: React.FC<Props> = ({ totalQty, batchCount, avgPrice, expiringSoon }) => {
  const formatPrice = (v: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(v);

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Tổng tồn kho" value={totalQty} icon={<Package />} />
      <StatCard label="Số lô hàng" value={batchCount} icon={<TrendingUp />} />
      <StatCard label="Giá trung bình" value={formatPrice(avgPrice)} icon={<Calendar />} />
      <StatCard
        label="Sắp hết hạn"
        value={expiringSoon}
        icon={<AlertTriangle className="text-red-600" />}
        valueClass="text-red-600"
      />
    </div>
  );
};

export default StatsGrid;
