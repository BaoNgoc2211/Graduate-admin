import { BarChart3 } from "lucide-react"

export default function AdminReportsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          <span className="ml-3 text-gray-600">Đang tải dữ liệu báo cáo...</span>
        </div>
      </div>
    </div>
  )
}
