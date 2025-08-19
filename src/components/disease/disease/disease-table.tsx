"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import type { IDisease } from "@/interface/disease/disease.interface";
// import { DiseaseFilters } from "./disease-filter";
import { DiseaseSeverityChart } from "./disease-severity-chart";
import { DeleteDiseaseModal } from "./delete-disease-modal";

interface DiseaseTableProps {
  diseases: IDisease[];
  isLoading: boolean;
  onEdit: (disease: IDisease) => void;
  onView: (disease: IDisease) => void;
  onAdd: () => void;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export function DiseaseTable({
  diseases,
  isLoading,
  onEdit,
  onAdd,
}: DiseaseTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [deleteDisease, setDeleteDisease] = useState<IDisease | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  // Filter diseases based on search and filters
  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.common?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || disease.status === statusFilter;
    
    const matchesSeverity =
      severityFilter === "all" || disease.severityLevel === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  // Pagination calculations
  const totalItems = filteredDiseases.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDiseases = filteredDiseases.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Updated severity badge mapping for Vietnamese values
  const getSeverityBadge = (severity: string) => {
    const severityMapping = {
      "Nhẹ": { color: "bg-green-100 text-green-800 border-green-200", label: "Nhẹ" },
      "Trung bình": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Trung bình" },
      "Nặng": { color: "bg-orange-100 text-orange-800 border-orange-200", label: "Nặng" },
      "Rất nặng": { color: "bg-red-100 text-red-800 border-red-200", label: "Rất nặng" },
      "Tử vong": { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Tử vong" },
      // Fallback for old enum values
      "low": { color: "bg-green-100 text-green-800 border-green-200", label: "Nhẹ" },
      "medium": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Trung bình" },
      "high": { color: "bg-red-100 text-red-800 border-red-200", label: "Cao" },
    };

    const mapping = severityMapping[severity as keyof typeof severityMapping] || 
                   { color: "bg-gray-100 text-gray-800 border-gray-200", label: severity };

    return (
      <Badge className={`border ${mapping.color}`}>
        {mapping.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge
        className={
          status === "active"
            ? "bg-blue-100 text-blue-800 border-blue-200 border"
            : "bg-gray-100 text-gray-800 border-gray-200 border"
        }
      >
        {status === "active" ? "Hoạt động" : "Không hoạt động"}
      </Badge>
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSeverityFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== "" || statusFilter !== "all" || severityFilter !== "all";

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Chart and Table Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      <div className="h-2 bg-gray-100 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <CardTitle className="text-blue-900">
                    Danh sách bệnh ({totalItems})
                  </CardTitle>
                  <Button onClick={onAdd} className="bg-blue-900 hover:bg-blue-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm bệnh mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm theo tên bệnh, mã bệnh..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleFilterChange();
                      }}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className={hasActiveFilters ? "border-blue-500 text-blue-600" : ""}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Bộ lọc
                      {hasActiveFilters && (
                        <Badge className="ml-2 bg-blue-100 text-blue-600">
                          {[searchTerm && "tìm kiếm", statusFilter !== "all" && "trạng thái", severityFilter !== "all" && "mức độ"]
                            .filter(Boolean).length}
                        </Badge>
                      )}
                    </Button>
                    {hasActiveFilters && (
                      <Button variant="ghost" onClick={clearFilters} size="sm">
                        <X className="h-4 w-4 mr-1" />
                        Xóa bộ lọc
                      </Button>
                    )}
                  </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <Card className="border border-blue-200 bg-blue-50/50">
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Trạng thái</label>
                          <Select 
                            value={statusFilter} 
                            onValueChange={(value) => {
                              setStatusFilter(value);
                              handleFilterChange();
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả</SelectItem>
                              <SelectItem value="active">Hoạt động</SelectItem>
                              <SelectItem value="inactive">Không hoạt động</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Mức độ nghiêm trọng</label>
                          <Select 
                            value={severityFilter} 
                            onValueChange={(value) => {
                              setSeverityFilter(value);
                              handleFilterChange();
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Tất cả</SelectItem>
                              <SelectItem value="Nhẹ">Nhẹ</SelectItem>
                              <SelectItem value="Trung bình">Trung bình</SelectItem>
                              <SelectItem value="Nặng">Nặng</SelectItem>
                              <SelectItem value="Rất nặng">Rất nặng</SelectItem>
                              <SelectItem value="Tử vong">Tử vong</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Results count and items per page */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Hiển thị {startIndex + 1}-{Math.min(endIndex, totalItems)} của {totalItems} bệnh
                    {hasActiveFilters && ` (lọc từ ${diseases.length} bệnh)`}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Số dòng:</span>
                    <Select 
                      value={itemsPerPage.toString()} 
                      onValueChange={(value) => {
                        setItemsPerPage(Number(value));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ITEMS_PER_PAGE_OPTIONS.map(option => (
                          <SelectItem key={option} value={option.toString()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Mã bệnh</TableHead>
                        <TableHead className="font-semibold">Tên bệnh</TableHead>
                        <TableHead className="font-semibold">Mức độ nghiêm trọng</TableHead>
                        <TableHead className="font-semibold">Nhóm nguy cơ</TableHead>
                        <TableHead className="font-semibold">Trạng thái</TableHead>
                        <TableHead className="text-right font-semibold">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedDiseases.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                            {hasActiveFilters
                              ? "Không tìm thấy bệnh nào phù hợp với bộ lọc"
                              : "Chưa có bệnh nào được thêm"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedDiseases.map((disease) => (
                          <TableRow key={disease._id} className="hover:bg-gray-50">
                            <TableCell className="font-mono text-sm font-medium">
                              {disease.code}
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs">
                                <div className="font-medium truncate">{disease.name}</div>
                                <div className="text-sm text-gray-500 truncate">
                                  {disease.common}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getSeverityBadge(disease.severityLevel)}</TableCell>
                            <TableCell>
                              <div className="max-w-32">
                                {disease.riskGroup && disease.riskGroup.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {disease.riskGroup.slice(0, 2).map((group, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {group}
                                      </Badge>
                                    ))}
                                    {disease.riskGroup.length > 2 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{disease.riskGroup.length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-400">Chưa xác định</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(disease.status || "active")}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => onEdit(disease)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => setDeleteDisease(disease)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {paginatedDiseases.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-12 text-gray-500">
                        {hasActiveFilters
                          ? "Không tìm thấy bệnh nào phù hợp với bộ lọc"
                          : "Chưa có bệnh nào được thêm"}
                      </CardContent>
                    </Card>
                  ) : (
                    paginatedDiseases.map((disease) => (
                      <Card key={disease._id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {disease.code}
                                </Badge>
                                {getSeverityBadge(disease.severityLevel)}
                              </div>
                              <div>
                                <h3 className="font-medium">{disease.name}</h3>
                                <p className="text-sm text-gray-500">{disease.common}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                {getStatusBadge(disease.status || "active")}
                                <div className="text-xs text-gray-500">
                                  {disease.riskGroup?.length || 0} nhóm nguy cơ
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onEdit(disease)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => setDeleteDisease(disease)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Trang {currentPage} / {totalPages} ({totalItems} bệnh)
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className="h-8"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="h-8"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center space-x-1">
                        {getPageNumbers().map((pageNum, index) => (
                          <div key={index}>
                            {pageNum === '...' ? (
                              <span className="px-2 text-gray-500">...</span>
                            ) : (
                              <Button
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(Number(pageNum))}
                                className={`h-8 w-8 p-0 ${
                                  currentPage === pageNum
                                    ? "bg-blue-900 hover:bg-blue-800"
                                    : ""
                                }`}
                              >
                                {pageNum}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="h-8"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className="h-8"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-1">
            <DiseaseSeverityChart diseases={filteredDiseases} />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteDiseaseModal
        disease={deleteDisease}
        isOpen={!!deleteDisease}
        onClose={() => setDeleteDisease(null)}
      />
    </>
  );
}
