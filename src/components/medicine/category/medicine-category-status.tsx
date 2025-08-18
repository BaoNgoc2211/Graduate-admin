"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FolderOpen, Pill, CheckCircle, AlertCircle, TrendingUp, Database } from "lucide-react"
import { useMedicineCategoryStats } from "@/hooks/medicine/category.hooks"

export function MedicineCategoryStats() {
  const { data: stats, isLoading, error } = useMedicineCategoryStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats?.data) {
    return (
      <Card className="border-red-200 bg-red-50 mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Không thể tải thống kê danh mục. Vui lòng thử lại sau.</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { totalCategories, totalMedicines, categoriesWithMedicines, emptyCategories } = stats.data

  const statsCards = [
    {
      title: "Tổng danh mục",
      value: totalCategories,
      description: "Danh mục thuốc",
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Tổng thuốc",
      value: totalMedicines,
      description: "Sản phẩm thuốc",
      icon: Pill,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Danh mục có thuốc",
      value: categoriesWithMedicines,
      description: "Đang sử dụng",
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      title: "Danh mục trống",
      value: emptyCategories,
      description: "Chưa có thuốc",
      icon: Database,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className={`border-0 shadow-sm hover:shadow-md transition-shadow duration-200 ${stat.bgColor} ${stat.borderColor} border`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value.toLocaleString()}</div>
                {index === 1 && totalCategories > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {Math.round((totalMedicines / totalCategories) * 10) / 10}/danh mục
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}