import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DiseasesLoading() {
  return (
    <div className="container mx-auto py-4 px-4 sm:py-8">
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 sm:h-10 bg-gray-200 rounded animate-pulse w-48" />
          <div className="h-4 sm:h-5 bg-gray-100 rounded animate-pulse w-64" />
        </div>

        {/* Main Content Skeleton */}
        <Card className="w-full">
          <CardHeader className="pb-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="h-6 sm:h-8 bg-gray-200 rounded animate-pulse w-48" />
              <div className="h-9 sm:h-10 bg-gray-200 rounded animate-pulse w-full sm:w-32" />
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 space-y-6">
            {/* Filters Skeleton */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <div className="h-10 bg-gray-100 rounded animate-pulse flex-1 max-w-sm" />
              <div className="h-10 bg-gray-100 rounded animate-pulse w-full sm:w-[180px]" />
              <div className="h-10 bg-gray-100 rounded animate-pulse w-full sm:w-[180px]" />
            </div>

            {/* Results count skeleton */}
            <div className="h-4 bg-gray-100 rounded animate-pulse w-32" />

            {/* Desktop Table Skeleton */}
            <div className="hidden md:block border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4">
                <div className="grid grid-cols-6 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        <div className="h-3 bg-gray-50 rounded animate-pulse w-3/4" />
                      </div>
                      <div className="h-6 bg-gray-100 rounded animate-pulse w-16" />
                      <div className="h-6 bg-gray-100 rounded animate-pulse w-20" />
                      <div className="flex space-x-1">
                        <div className="h-5 bg-gray-100 rounded animate-pulse w-12" />
                        <div className="h-5 bg-gray-100 rounded animate-pulse w-8" />
                      </div>
                      <div className="h-8 w-8 bg-gray-100 rounded animate-pulse ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Cards Skeleton */}
            <div className="md:hidden space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-5 bg-gray-100 rounded animate-pulse w-16" />
                          <div className="h-5 bg-gray-100 rounded animate-pulse w-12" />
                        </div>
                        <div className="space-y-1">
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-32" />
                          <div className="h-3 bg-gray-50 rounded animate-pulse w-24" />
                        </div>
                        <div className="h-5 bg-gray-100 rounded animate-pulse w-20" />
                        <div className="flex space-x-1">
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-16" />
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-12" />
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-8" />
                        </div>
                      </div>
                      <div className="h-8 w-8 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
