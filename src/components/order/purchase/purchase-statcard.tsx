import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  loading?: boolean
}

export function StatCard({ title, value, icon: Icon, trend, loading }: StatCardProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className={`text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.isPositive ? "+" : ""}
                {trend.value}% so với tháng trước
              </p>
            )}
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-900" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
