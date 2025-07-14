// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Eye, Edit, Trash2, MoreHorizontal, Plus } from "lucide-react";
// import type { IDisease } from "@/interface/disease/disease.interface";
// import { DiseaseFilters } from "./disease-filter";
// import { DeleteDiseaseModal } from "./delete-disease-modal";
// // import { DiseaseFilters } from "./DiseaseFilters"
// // import { DeleteDiseaseModal } from "./DeleteDiseaseModal"

// interface DiseaseTableProps {
//   diseases: IDisease[];
//   isLoading: boolean;
//   onEdit: (disease: IDisease) => void;
//   onView: (disease: IDisease) => void;
//   onAdd: () => void;
// }

// export function DiseaseTable({
//   diseases,
//   isLoading,
//   onEdit,
//   onView,
//   onAdd,
// }: DiseaseTableProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [severityFilter, setSeverityFilter] = useState("all");
//   const [deleteDisease, setDeleteDisease] = useState<IDisease | null>(null);

//   // Filter diseases based on search and filters
//   const filteredDiseases = diseases.filter((disease) => {
//     const matchesSearch =
//       disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       disease.code.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || disease.status === statusFilter;
//     const matchesSeverity =
//       severityFilter === "all" || disease.severityLevel === severityFilter;

//     return matchesSearch && matchesStatus && matchesSeverity;
//   });

//   const getSeverityBadge = (severity: string) => {
//     const variants = {
//       low: "bg-green-100 text-green-800",
//       medium: "bg-yellow-100 text-yellow-800",
//       high: "bg-red-100 text-red-800",
//     };
//     const labels = {
//       low: "Thấp",
//       medium: "Trung bình",
//       high: "Cao",
//     };
//     return (
//       <Badge
//         className={
//           variants[severity as keyof typeof variants] ||
//           "bg-gray-100 text-gray-800"
//         }
//       >
//         {labels[severity as keyof typeof labels] || severity}
//       </Badge>
//     );
//   };

//   const getStatusBadge = (status: string) => {
//     return (
//       <Badge variant={status === "active" ? "default" : "secondary"}>
//         {status === "active" ? "Hoạt động" : "Không hoạt động"}
//       </Badge>
//     );
//   };

//   const clearFilters = () => {
//     setSearchTerm("");
//     setStatusFilter("all");
//     setSeverityFilter("all");
//   };

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
//             <CardTitle className="text-blue-900">Danh sách bệnh</CardTitle>
//             <Button onClick={onAdd} className="bg-blue-900 hover:bg-blue-800">
//               <Plus className="h-4 w-4 mr-2" />
//               Thêm bệnh mới
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Filters */}
//           <DiseaseFilters
//             searchTerm={searchTerm}
//             onSearchChange={setSearchTerm}
//             statusFilter={statusFilter}
//             onStatusFilterChange={setStatusFilter}
//             severityFilter={severityFilter}
//             onSeverityFilterChange={setSeverityFilter}
//             onClearFilters={clearFilters}
//           />

//           {/* Results count */}
//           <div className="text-sm text-gray-600">
//             Hiển thị {filteredDiseases.length} / {diseases.length} bệnh
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden md:block border rounded-lg overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead>Mã bệnh</TableHead>
//                   <TableHead>Tên bệnh</TableHead>
//                   <TableHead>Mức độ nghiêm trọng</TableHead>
//                   <TableHead>Trạng thái</TableHead>
//                   <TableHead>Nhóm nguy cơ</TableHead>
//                   <TableHead className="text-right">Thao tác</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredDiseases.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={6}
//                       className="text-center py-8 text-gray-500"
//                     >
//                       {searchTerm ||
//                       statusFilter !== "all" ||
//                       severityFilter !== "all"
//                         ? "Không tìm thấy bệnh nào phù hợp với bộ lọc"
//                         : "Chưa có bệnh nào được thêm"}
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredDiseases.map((disease) => (
//                     <TableRow key={disease._id}>
//                       <TableCell className="font-medium">
//                         {disease.code}
//                       </TableCell>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{disease.name}</div>
//                           <div className="text-sm text-gray-500">
//                             {disease.common}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         {getSeverityBadge(disease.severityLevel)}
//                       </TableCell>
//                       <TableCell>
//                         {getStatusBadge(disease.status || "active")}
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex flex-wrap gap-1">
//                           {disease.riskGroup.slice(0, 2).map((group, index) => (
//                             <Badge
//                               key={index}
//                               variant="outline"
//                               className="text-xs"
//                             >
//                               {group}
//                             </Badge>
//                           ))}
//                           {disease.riskGroup.length > 2 && (
//                             <Badge variant="outline" className="text-xs">
//                               +{disease.riskGroup.length - 2}
//                             </Badge>
//                           )}
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                               <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem onClick={() => onView(disease)}>
//                               <Eye className="h-4 w-4 mr-2" />
//                               Xem chi tiết
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => onEdit(disease)}>
//                               <Edit className="h-4 w-4 mr-2" />
//                               Chỉnh sửa
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => setDeleteDisease(disease)}
//                               className="text-red-600"
//                             >
//                               <Trash2 className="h-4 w-4 mr-2" />
//                               Xóa
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden space-y-4">
//             {filteredDiseases.length === 0 ? (
//               <Card>
//                 <CardContent className="text-center py-8 text-gray-500">
//                   {searchTerm ||
//                   statusFilter !== "all" ||
//                   severityFilter !== "all"
//                     ? "Không tìm thấy bệnh nào phù hợp với bộ lọc"
//                     : "Chưa có bệnh nào được thêm"}
//                 </CardContent>
//               </Card>
//             ) : (
//               filteredDiseases.map((disease) => (
//                 <Card key={disease._id}>
//                   <CardContent className="p-4">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1 space-y-2">
//                         <div className="flex items-center space-x-2">
//                           <Badge variant="outline">{disease.code}</Badge>
//                           {getSeverityBadge(disease.severityLevel)}
//                         </div>
//                         <div>
//                           <h3 className="font-medium">{disease.name}</h3>
//                           <p className="text-sm text-gray-500">
//                             {disease.common}
//                           </p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           {getStatusBadge(disease.status || "active")}
//                         </div>
//                         <div className="flex flex-wrap gap-1">
//                           {disease.riskGroup.slice(0, 3).map((group, index) => (
//                             <Badge
//                               key={index}
//                               variant="outline"
//                               className="text-xs"
//                             >
//                               {group}
//                             </Badge>
//                           ))}
//                           {disease.riskGroup.length > 3 && (
//                             <Badge variant="outline" className="text-xs">
//                               +{disease.riskGroup.length - 3}
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => onView(disease)}>
//                             <Eye className="h-4 w-4 mr-2" />
//                             Xem chi tiết
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => onEdit(disease)}>
//                             <Edit className="h-4 w-4 mr-2" />
//                             Chỉnh sửa
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => setDeleteDisease(disease)}
//                             className="text-red-600"
//                           >
//                             <Trash2 className="h-4 w-4 mr-2" />
//                             Xóa
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Delete Confirmation Modal */}
//       <DeleteDiseaseModal
//         disease={deleteDisease}
//         isOpen={!!deleteDisease}
//         onClose={() => setDeleteDisease(null)}
//       />
//     </>
//   );
// }
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
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { IDisease } from "@/interface/disease/disease.interface";
import { DiseaseFilters } from "./disease-filter";
import { DiseaseSeverityChart } from "./disease-severity-chart";
import { DeleteDiseaseModal } from "./delete-disease-modal";
// import { DiseaseFilters } from "./DiseaseFilters";
// import { DeleteDiseaseModal } from "./DeleteDiseaseModal";
// import { DiseaseSeverityChart } from "./DiseaseSeverityChart";

interface DiseaseTableProps {
  diseases: IDisease[];
  isLoading: boolean;
  onEdit: (disease: IDisease) => void;
  onView: (disease: IDisease) => void;
  onAdd: () => void;
}

const ITEMS_PER_PAGE = 10;

export function DiseaseTable({
  diseases,
  isLoading,
  onEdit,
  onView,
  onAdd,
}: DiseaseTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [deleteDisease, setDeleteDisease] = useState<IDisease | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter diseases based on search and filters
  const filteredDiseases = diseases.filter((disease) => {
    const matchesSearch =
      disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || disease.status === statusFilter;
    const matchesSeverity =
      severityFilter === "all" || disease.severityLevel === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDiseases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDiseases = filteredDiseases.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "bg-green-100 text-green-800 border-green-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      high: "bg-red-100 text-red-800 border-red-200",
    };
    const labels = {
      low: "Thấp",
      medium: "Trung bình",
      high: "Cao",
    };
    return (
      <Badge
        className={`border ${
          variants[severity as keyof typeof variants] ||
          "bg-gray-100 text-gray-800"
        }`}
      >
        {labels[severity as keyof typeof labels] || severity}
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

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Chart Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-100 rounded animate-pulse"
                    />
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
                  {[...Array(3)].map((_, i) => (
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
                    Danh sách bệnh
                  </CardTitle>
                  <Button
                    onClick={onAdd}
                    className="bg-blue-900 hover:bg-blue-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm bệnh mới
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Filters */}
                <DiseaseFilters
                  searchTerm={searchTerm}
                  onSearchChange={(value) => {
                    setSearchTerm(value);
                    handleFilterChange();
                  }}
                  statusFilter={statusFilter}
                  onStatusFilterChange={(value) => {
                    setStatusFilter(value);
                    handleFilterChange();
                  }}
                  severityFilter={severityFilter}
                  onSeverityFilterChange={(value) => {
                    setSeverityFilter(value);
                    handleFilterChange();
                  }}
                  onClearFilters={clearFilters}
                />

                {/* Results count */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    Hiển thị {startIndex + 1}-
                    {Math.min(endIndex, filteredDiseases.length)} của{" "}
                    {filteredDiseases.length} bệnh
                  </span>
                  {totalPages > 1 && (
                    <span>
                      Trang {currentPage} / {totalPages}
                    </span>
                  )}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Mã bệnh</TableHead>
                        <TableHead className="font-semibold">
                          Tên bệnh
                        </TableHead>
                        <TableHead className="font-semibold">
                          Mức độ nghiêm trọng
                        </TableHead>
                        <TableHead className="font-semibold">
                          Trạng thái
                        </TableHead>
                        <TableHead className="text-right font-semibold">
                          Thao tác
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedDiseases.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center py-12 text-gray-500"
                          >
                            {searchTerm ||
                            statusFilter !== "all" ||
                            severityFilter !== "all"
                              ? "Không tìm thấy bệnh nào phù hợp với bộ lọc"
                              : "Chưa có bệnh nào được thêm"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedDiseases.map((disease) => (
                          <TableRow
                            key={disease._id}
                            className="hover:bg-gray-50"
                          >
                            <TableCell className="font-mono text-sm font-medium">
                              {disease.code}
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs">
                                <div className="font-medium truncate">
                                  {disease.name}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {disease.common}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getSeverityBadge(disease.severityLevel)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(disease.status || "active")}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => onEdit(disease)}
                                  >
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
                        {searchTerm ||
                        statusFilter !== "all" ||
                        severityFilter !== "all"
                          ? "Không tìm thấy bệnh nào phù hợp với bộ lọc"
                          : "Chưa có bệnh nào được thêm"}
                      </CardContent>
                    </Card>
                  ) : (
                    paginatedDiseases.map((disease) => (
                      <Card
                        key={disease._id}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className="font-mono text-xs"
                                >
                                  {disease.code}
                                </Badge>
                                {getSeverityBadge(disease.severityLevel)}
                              </div>
                              <div>
                                <h3 className="font-medium">{disease.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {disease.common}
                                </p>
                              </div>
                              <div>
                                {getStatusBadge(disease.status || "active")}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => onEdit(disease)}
                                >
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Trang {currentPage} / {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="h-8 bg-transparent"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center space-x-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  currentPage === pageNum
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={`h-8 w-8 p-0 ${
                                  currentPage === pageNum
                                    ? "bg-blue-900 hover:bg-blue-800"
                                    : ""
                                }`}
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="h-8 bg-transparent"
                      >
                        <ChevronRight className="h-4 w-4" />
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
