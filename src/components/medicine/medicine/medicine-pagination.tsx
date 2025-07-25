"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicinePaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export default function MedicinePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: MedicinePaginationProps) {
  // Generate page numbers with ellipsis
  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      // Show all pages if total pages <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 4) {
        // Show pages 2, 3, 4, 5, ..., last
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i)
        }
        if (totalPages > 5) {
          pages.push("...")
        }
      } else if (currentPage >= totalPages - 3) {
        // Show 1, ..., last-4, last-3, last-2, last-1, last
        pages.push("...")
        for (let i = Math.max(2, totalPages - 4); i <= totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        // Show 1, ..., current-1, current, current+1, ..., last
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
      }

      // Always show last page (if not already included)
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        Hiển thị {startItem} - {endItem} trong tổng số {totalItems} thuốc
      </div>

      <div className="flex items-center gap-4">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">Hiển thị:</span>
          <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(Number(value))}>
            <SelectTrigger className="w-20 h-8 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-1">
          {/* First page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page numbers */}
          {pageNumbers.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-2 py-1 text-gray-400">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === page
                      ? "bg-blue-900 hover:bg-blue-800 text-white"
                      : "border-gray-300 hover:bg-gray-50 bg-transparent"
                  }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
