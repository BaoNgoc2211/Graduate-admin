// "use client";
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Search, Filter } from "lucide-react";
// import { IStockFilters } from "@/interface/order/stock.interface";
// const SearchBar: React.FC<{
//   filters: IStockFilters;
//   onFiltersChange: (f: IStockFilters) => void;
// }> = ({ filters, onFiltersChange }) => {
//   const [showAdvanced, setShowAdvanced] = useState(false);

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//           <Input
//             autoFocus
//             placeholder="Tìm kiếm theo tên thuốc hoặc mã..."
//             value={filters.search}
//             onChange={(e) =>
//               onFiltersChange({ ...filters, search: e.target.value })
//             }
//             className="pl-10"
//           />
//         </div>
//         <Button
//           variant="outline"
//           className="flex items-center gap-2"
//           onClick={() => setShowAdvanced((s) => !s)}
//         >
//           <Filter className="h-4 w-4" />
//           Bộ lọc
//         </Button>
//       </div>

//       {showAdvanced && (
//         <Card>
//           <CardContent className="pt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[
//                 {
//                   label: "Số lượng tối thiểu",
//                   key: "minQty",
//                   placeholder: "0",
//                 },
//                 {
//                   label: "Số lượng tối đa",
//                   key: "maxQty",
//                   placeholder: "1000",
//                 },
//                 {
//                   label: "Ngưỡng cảnh báo",
//                   key: "lowStockThreshold",
//                   placeholder: "10",
//                 },
//               ].map((f) => (
//                 <div key={f.key}>
//                   <label className="mb-2 block text-sm font-medium text-gray-700">
//                     {f.label}
//                   </label>
//                   <Input
//                     type="number"
//                     value={filters[f.key as keyof IStockFilters]}
//                     onChange={(e) =>
//                       onFiltersChange({
//                         ...filters,
//                         [f.key]: Number(e.target.value),
//                       })
//                     }
//                     placeholder={f.placeholder}
//                   />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };
// export default SearchBar;
