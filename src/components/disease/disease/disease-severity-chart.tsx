"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { IDisease } from "@/interface/disease/disease.interface"
import { BarChart3, TrendingUp } from "lucide-react"

interface DiseaseSeverityChartProps {
  diseases: IDisease[]
}

export function DiseaseSeverityChart({ diseases }: DiseaseSeverityChartProps) {
  // Calculate severity distribution
  const severityStats = diseases.reduce(
    (acc, disease) => {
      const severity = disease.severityLevel || "low"
      acc[severity] = (acc[severity] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const total = diseases.length
  const stats = [
    {
      level: "high",
      label: "Cao",
      count: severityStats.high || 0,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      level: "medium",
      label: "Trung bình",
      count: severityStats.medium || 0,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
    {
      level: "low",
      label: "Thấp",
      count: severityStats.low || 0,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
  ]

  const maxCount = Math.max(...stats.map((s) => s.count))

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-blue-900 text-lg">
          <BarChart3 className="h-5 w-5 mr-2" />
          Phân bố mức độ nghiêm trọng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Tổng số bệnh:</span>
          <Badge variant="outline" className="font-semibold">
            {total}
          </Badge>
        </div>

        {/* Bar Chart */}
        <div className="space-y-3">
          {stats.map((stat) => {
            const percentage = total > 0 ? (stat.count / total) * 100 : 0
            const barWidth = maxCount > 0 ? (stat.count / maxCount) * 100 : 0

            return (
              <div key={stat.level} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className="font-medium">{stat.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{stat.count}</span>
                    <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${stat.color}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Status Summary */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-gray-600">Mức độ cao nhất:</span>
            </div>
            <Badge className={stats.find((s) => s.count === maxCount)?.bgColor}>
              <span className={stats.find((s) => s.count === maxCount)?.textColor}>
                {stats.find((s) => s.count === maxCount)?.label} ({maxCount})
              </span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
