"use client"

import OrderReportChart from "@/components/order/order/order-report-chart"
import { BarChart3 } from "lucide-react"

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">Báo cáo doanh thu</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tổng quan doanh thu</h2>
          <p className="text-gray-600">Theo dõi hiệu suất kinh doanh và xu hướng doanh thu của cửa hàng</p>
        </div>

        <OrderReportChart />
      </div>
    </div>
  )
}
