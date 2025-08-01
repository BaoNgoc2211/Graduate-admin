"use client";

import React from "react";
// , CardHeader, CardTitle
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Shield, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Activity
} from "lucide-react";

interface UserStatsCardsProps {
  userType: "admin" | "user";
  totalCount: number;
  activeCount?: number;
  inactiveCount?: number;
  newThisMonth?: number;
  isLoading?: boolean;
}

const UserStatsCards: React.FC<UserStatsCardsProps> = ({
  userType,
  totalCount,
  activeCount = 0,
  inactiveCount = 0,
  newThisMonth = 0,
  isLoading = false,
}) => {
  const statsData = [
    {
      title: userType === "admin" ? "Tổng Quản trị viên" : "Tổng Khách hàng",
      value: totalCount,
      icon: userType === "admin" ? Shield : Users,
      color: "text-blue-900",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Đang hoạt động",
      value: activeCount,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Không hoạt động",
      value: inactiveCount,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "Mới tháng này",
      value: newThisMonth,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("vi-VN").format(num);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className={`hover:shadow-lg transition-all duration-200 ${stat.borderColor} border-l-4`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatNumber(stat.value)}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Activity className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Cập nhật mới nhất
                    </span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default UserStatsCards;