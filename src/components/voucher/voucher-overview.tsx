"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TicketIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { IVoucher, IVoucherStats } from "@/interface/voucher.interface";

interface VoucherOverviewProps {
  vouchers: IVoucher[];
  isLoading: boolean;
}

export default function VoucherOverview({
  vouchers,
  isLoading,
}: VoucherOverviewProps) {
  const calculateStats = (vouchers: IVoucher[]): IVoucherStats => {
    const now = new Date();

    return {
      totalVouchers: vouchers.length,
      activeVouchers: vouchers.filter(
        (v) => v.isActive && new Date(v.endDate) > now
      ).length,
      expiredVouchers: vouchers.filter((v) => new Date(v.endDate) <= now)
        .length,
      totalUsage: vouchers.reduce((sum, v) => sum + v.usedCount, 0),
    };
  };

  const stats = calculateStats(vouchers);

  const cards = [
    {
      title: "Tổng số voucher",
      value: stats.totalVouchers,
      icon: TicketIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Tất cả voucher trong hệ thống",
    },
    {
      title: "Voucher còn hiệu lực",
      value: stats.activeVouchers,
      icon: CheckCircleIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Đang hoạt động và chưa hết hạn",
    },
    {
      title: "Voucher đã hết hạn",
      value: stats.expiredVouchers,
      icon: XCircleIcon,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Đã qua ngày kết thúc",
    },
    {
      title: "Tổng lượt sử dụng",
      value: stats.totalUsage,
      icon: ChartBarIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Tổng số lần voucher được sử dụng",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const percentage =
          stats.totalVouchers > 0
            ? (card.value / stats.totalVouchers) * 100
            : 0;

        return (
          <Card
            key={index}
            className="hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-gray-900">
                  {card.value.toLocaleString()}
                </div>
                {index < 3 && stats.totalVouchers > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {percentage.toFixed(1)}%
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 mb-2">{card.description}</p>
              {index < 3 && stats.totalVouchers > 0 && (
                <Progress value={percentage} className="h-1" />
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
