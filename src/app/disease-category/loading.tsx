
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DiseaseCategoryLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="space-y-2">
          <div className="h-9 bg-gray-200 rounded-lg w-64 animate-pulse" />
          <div className="h-5 bg-gray-100 rounded w-96 animate-pulse" />
        </div>

        {/* Table Skeleton */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            {/* Search Bar Skeleton */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-10 bg-gray-100 rounded w-80 animate-pulse" />
              <div className="h-6 bg-gray-100 rounded w-24 animate-pulse" />
            </div>

            {/* Table Skeleton */}
            <div className="border rounded-lg">
              <div className="p-4 border-b bg-gray-50">
                <div className="grid grid-cols-5 gap-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 border-b last:border-b-0">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-10 w-10 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    <div className="h-6 bg-gray-100 rounded w-12 mx-auto animate-pulse" />
                    <div className="h-8 w-8 bg-gray-100 rounded mx-auto animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
