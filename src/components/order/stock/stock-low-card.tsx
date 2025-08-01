// "use client";
// import React from "react";
// import Image from "next/image";
// import { useLowStock } from "@/hooks/orders/stock.hooks";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertTriangle } from "lucide-react";
// import { TrendingDown } from "lucide-react";

// const LowStockCard: React.FC<{ threshold: number }> = ({ threshold }) => {
//   const { data, isLoading, isError } = useLowStock();

//   // const lowStocks = data?.data.filter((s) => s.quantity < threshold) ?? [];
//   const lowStocks = (data?.data ?? []).filter(
//     (s) => s.quantity < threshold && s.medicine
//   );

//   if (isLoading) {
//     return (
//       <Card>
//         <CardHeader>
//           <Skeleton className="h-5 w-32" />
//           <Skeleton className="h-4 w-48" />
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {[...Array(3)].map((_, i) => (
//             <Skeleton key={i} className="h-12 w-full" />
//           ))}
//         </CardContent>
//       </Card>
//     );
//   }

//   if (isError) {
//     return (
//       <Alert>
//         <AlertTriangle className="h-4 w-4" />
//         <AlertDescription>Không thể tải dữ liệu tồn kho thấp.</AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <Card className="border-red-200">
//       <CardHeader className="pb-3">
//         <CardTitle className="flex items-center gap-2 text-red-700">
//           <TrendingDown className="h-5 w-5" />
//           Tồn kho thấp
//         </CardTitle>
//         <CardDescription>
//           {lowStocks.length} sản phẩm dưới {threshold} đơn vị
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {lowStocks.length === 0 ? (
//           <p className="py-4 text-center text-sm text-gray-500">
//             Không có sản phẩm nào có tồn kho thấp
//           </p>
//         ) : (
//           <>
//             {lowStocks.slice(0, 5).map((s) => (
//               <div
//                 key={s._id}
//                 className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3"
//               >
//                 <div className="flex items-center space-x-3">
//                   <Image
//                     src={s.medicine.thumbnail || "/placeholder.svg"}
//                     alt={s.medicine?.name || "Ảnh thuốc"}
//                     width={32}
//                     height={32}
//                     className="h-8 w-8 rounded object-cover"
//                   />
//                   <div>
//                     <p className="text-sm font-medium">{s.medicine.name}</p>
//                     <p className="text-xs text-gray-500">{s.medicine.code}</p>
//                   </div>
//                 </div>
//                 <Badge variant="destructive" className="font-bold">
//                   {s.quantity}
//                 </Badge>
//               </div>
//             ))}
//             {lowStocks.length > 5 && (
//               <p className="pt-2 text-center text-xs text-gray-500">
//                 +{lowStocks.length - 5} sản phẩm khác
//               </p>
//             )}
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// };
// export default LowStockCard;
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLowStock } from "@/hooks/orders/stock.hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LowStockCardProps {
  threshold: number;
}

const LowStockCard: React.FC<LowStockCardProps> = ({ threshold }) => {
  const { data, isLoading, isError } = useLowStock();

  const lowStocks = React.useMemo(() => {
    if (!data?.success || !data.data) return [];
    
    return data.data.filter((stock) => {
      // Check if stock has medicine and meets threshold
      return (
        stock.medicine && 
        stock.quantity < threshold &&
        stock.medicine.name &&
        stock.medicine.code
      );
    });
  }, [data, threshold]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-6 w-8" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Không thể tải dữ liệu tồn kho thấp. Vui lòng thử lại sau.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-red-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <TrendingDown className="h-5 w-5" />
          Tồn kho thấp
        </CardTitle>
        <CardDescription>
          {lowStocks.length} sản phẩm dưới {threshold} đơn vị
        </CardDescription>
      </CardHeader>
      <CardContent>
        {lowStocks.length === 0 ? (
          <div className="py-8 text-center">
            <TrendingDown className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-1">
              Không có sản phẩm nào có tồn kho thấp
            </p>
            <p className="text-xs text-gray-400">
              Ngưỡng cảnh báo: {threshold} đơn vị
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStocks.slice(0, 5).map((stock) => (
              <div
                key={stock._id}
                className="group flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3 hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <Image
                    src={stock.medicine.thumbnail || "/placeholder.svg"}
                    alt={stock.medicine.name || "Medicine image"}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded object-cover border border-red-200"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {stock.medicine.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {stock.medicine.code}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="font-bold text-xs">
                    {stock.quantity}
                  </Badge>
                  
                  <Link href={`/stock/${stock.medicine._id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            
            {lowStocks.length > 5 && (
              <div className="pt-2 text-center">
                <p className="text-xs text-gray-500 mb-2">
                  +{lowStocks.length - 5} sản phẩm khác có tồn kho thấp
                </p>
                <Link href="/stock?filter=low-stock">
                  <Button variant="outline" size="sm" className="text-xs">
                    Xem tất cả
                  </Button>
                </Link>
              </div>
            )}
            
            {lowStocks.length > 0 && (
              <div className="pt-3 border-t border-red-200">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white" 
                  size="sm"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Nhập hàng khẩn cấp
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LowStockCard;