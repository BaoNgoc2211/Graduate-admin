"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import Image from "next/image"
import { toast } from "sonner"
import { useRevenueStats } from "@/hooks/orders/order.hooks"

const COLORS = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"]

export default function OrderReportChart() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("day")
  const { data: stats, isLoading, error, refetch, isFetching } = useRevenueStats(period)

  const handleRefresh = async () => {
    try {
      await refetch()
      toast.success("Đã cập nhật dữ liệu báo cáo")
    } catch  {
      toast.error("Không thể cập nhật dữ liệu")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không thể tải dữ liệu báo cáo</h3>
          <p className="text-gray-500 mb-4">{error?.message || "Có lỗi xảy ra khi tải dữ liệu"}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Thử lại
          </Button>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value)
  }

  const getPeriodLabel = () => {
    switch (period) {
      case "day":
        return "7 ngày qua"
      case "week":
        return "4 tuần qua"
      case "month":
        return "6 tháng qua"
      default:
        return ""
    }
  }

  const getChartData = () => {
    switch (period) {
      case "day":
        return stats.dailyRevenue
      case "week":
        return stats.weeklyRevenue
      case "month":
        return stats.monthlyRevenue
      default:
        return []
    }
  }

  const getDataKey = () => {
    switch (period) {
      case "day":
        return "date"
      case "week":
        return "week"
      case "month":
        return "month"
      default:
        return "date"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Báo cáo doanh thu</h2>
          <p className="text-gray-600">Dữ liệu {getPeriodLabel()}</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isFetching}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
          Làm mới
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatCurrency(stats.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.revenueGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              )}
              <span className={stats.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(stats.revenueGrowth).toFixed(1)}%
              </span>
              <span className="ml-1">so với kỳ trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatNumber(stats.totalOrders)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.ordersGrowth >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
              )}
              <span className={stats.ordersGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(stats.ordersGrowth).toFixed(1)}%
              </span>
              <span className="ml-1">so với kỳ trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá trị đơn hàng TB</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{formatCurrency(stats.averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">Trung bình mỗi đơn hàng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ hoàn thành</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {(stats.statusDistribution.find((s) => s.status === "Hoàn thành")?.percentage || 0).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Đơn hàng hoàn thành</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Biểu đồ doanh thu</CardTitle>
              <CardDescription>Theo dõi doanh thu và số lượng đơn hàng theo thời gian</CardDescription>
            </div>
            <Tabs value={period} onValueChange={(value) => setPeriod(value as "day" | "week" | "month")}>
              <TabsList>
                <TabsTrigger value="day">Ngày</TabsTrigger>
                <TabsTrigger value="week">Tuần</TabsTrigger>
                <TabsTrigger value="month">Tháng</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={getDataKey()} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? formatCurrency(Number(value)) : formatNumber(Number(value)),
                  name === "revenue" ? "Doanh thu" : "Số đơn hàng",
                ]}
                labelFormatter={(label) =>
                  `${period === "day" ? "Ngày" : period === "week" ? "Tuần" : "Tháng"}: ${label}`
                }
              />
              <Area type="monotone" dataKey="revenue" stroke="#1e40af" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 sản phẩm bán chạy</CardTitle>
            <CardDescription>Sản phẩm có doanh thu cao nhất trong kỳ</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.topProducts.length > 0 ? (
              <div className="space-y-4">
                {stats.topProducts.map((product, index) => (
                  <div key={product._id} className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={product.thumbnail || "/placeholder.svg?height=48&width=48"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">Mã: {product.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-900 text-sm">{formatCurrency(product.revenue)}</p>
                      <p className="text-xs text-gray-500">{formatNumber(product.totalSold)} đã bán</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chưa có dữ liệu sản phẩm</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố trạng thái đơn hàng</CardTitle>
            <CardDescription>Tỷ lệ đơn hàng theo từng trạng thái</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.statusDistribution.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [formatNumber(Number(value)), "Số đơn hàng"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {stats.statusDistribution.map((item, index) => (
                    <Badge
                      key={item.status}
                      variant="secondary"
                      className="flex items-center space-x-1"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length] + "20",
                        color: COLORS[index % COLORS.length],
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>
                        {item.status}: {item.count}
                      </span>
                    </Badge>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chưa có dữ liệu đơn hàng</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
