// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { IVoucher } from "@/interface/voucher.interface";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";
// interface VoucherChartProps {
//   vouchers: IVoucher[];
//   isLoading: boolean;
// }

// export default function VoucherChart({
//   vouchers,
//   isLoading,
// }: VoucherChartProps) {
//   const prepareChartData = (vouchers: IVoucher[]) => {
//     return vouchers
//       .map((voucher) => ({
//         code: voucher.code,
//         name: voucher.name,
//         usedCount: voucher.usedCount,
//         usageLimit: voucher.usageLimit,
//         usagePercentage:
//           voucher.usageLimit > 0
//             ? (voucher.usedCount / voucher.usageLimit) * 100
//             : 0,
//       }))
//       .sort((a, b) => b.usedCount - a.usedCount)
//       .slice(0, 10); // Top 10 vouchers
//   };

//   const chartData = prepareChartData(vouchers);

//   const getBarColor = (percentage: number) => {
//     if (percentage >= 80) return "#ef4444"; // red-500
//     if (percentage >= 60) return "#f59e0b"; // amber-500
//     if (percentage >= 40) return "#3b82f6"; // blue-500
//     return "#10b981"; // emerald-500
//   };

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
//           <p className="font-medium text-gray-900">{data.name}</p>
//           <p className="text-sm text-gray-600 font-mono">{data.code}</p>
//           <div className="mt-2 space-y-1">
//             <p className="text-sm">
//               <span className="text-gray-600">Đã sử dụng:</span>{" "}
//               <span className="font-medium">
//                 {data.usedCount.toLocaleString()}
//               </span>
//             </p>
//             <p className="text-sm">
//               <span className="text-gray-600">Giới hạn:</span>{" "}
//               <span className="font-medium">
//                 {data.usageLimit.toLocaleString()}
//               </span>
//             </p>
//             <p className="text-sm">
//               <span className="text-gray-600">Tỷ lệ:</span>{" "}
//               <span className="font-medium">
//                 {data.usagePercentage.toFixed(1)}%
//               </span>
//             </p>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   if (isLoading) {
//     return (
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Thống kê sử dụng voucher</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-80 animate-pulse bg-gray-200 rounded"></div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (chartData.length === 0) {
//     return (
//       <Card className="mb-8">
//         <CardHeader>
//           <CardTitle>Thống kê sử dụng voucher</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-80 flex items-center justify-center text-gray-500">
//             Không có dữ liệu để hiển thị biểu đồ
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="mb-8">
//       <CardHeader>
//         <CardTitle>Thống kê sử dụng voucher</CardTitle>
//         <p className="text-sm text-gray-600">
//           Top 10 voucher được sử dụng nhiều nhất (màu sắc theo tỷ lệ sử dụng)
//         </p>
//       </CardHeader>
//       <CardContent>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={chartData}
//               margin={{
//                 top: 20,
//                 right: 30,
//                 left: 20,
//                 bottom: 60,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
//               <XAxis
//                 dataKey="code"
//                 angle={-45}
//                 textAnchor="end"
//                 height={80}
//                 fontSize={12}
//                 stroke="#6b7280"
//               />
//               <YAxis fontSize={12} stroke="#6b7280" />
//               <Tooltip content={<CustomTooltip />} />
//               <Bar dataKey="usedCount" radius={[4, 4, 0, 0]}>
//                 {chartData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={getBarColor(entry.usagePercentage)}
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Legend */}
//         <div className="flex flex-wrap gap-4 mt-4 text-xs">
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-emerald-500 rounded"></div>
//             <span className="text-gray-600">{"< 40% sử dụng"}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-blue-500 rounded"></div>
//             <span className="text-gray-600">40-60% sử dụng</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-amber-500 rounded"></div>
//             <span className="text-gray-600">60-80% sử dụng</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-red-500 rounded"></div>
//             <span className="text-gray-600">{"≥ 80% sử dụng"}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IVoucher } from "@/interface/voucher.interface";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface VoucherChartProps {
  vouchers: IVoucher[];
  isLoading: boolean;
}

// ✅ FIX: Define proper types for chart data
interface ChartDataItem {
  code: string;
  name: string;
  usedCount: number;
  usageLimit: number;
  usagePercentage: number;
}

// ✅ FIX: Define proper types for Tooltip props instead of using 'any'
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
    value: number;
  }>;
  label?: string;
}

export default function VoucherChart({
  vouchers,
  isLoading,
}: VoucherChartProps) {
  const prepareChartData = (vouchers: IVoucher[]): ChartDataItem[] => {
    return vouchers
      .map((voucher) => ({
        code: voucher.code,
        name: voucher.name,
        usedCount: voucher.usedCount,
        usageLimit: voucher.usageLimit,
        usagePercentage:
          voucher.usageLimit > 0
            ? (voucher.usedCount / voucher.usageLimit) * 100
            : 0,
      }))
      .sort((a, b) => b.usedCount - a.usedCount)
      .slice(0, 10); // Top 10 vouchers
  };

  const chartData = prepareChartData(vouchers);

  const getBarColor = (percentage: number): string => {
    if (percentage >= 80) return "#ef4444"; // red-500
    if (percentage >= 60) return "#f59e0b"; // amber-500
    if (percentage >= 40) return "#3b82f6"; // blue-500
    return "#10b981"; // emerald-500
  };

  // ✅ FIX: Use proper TypeScript types instead of 'any'
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600 font-mono">{data.code}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="text-gray-600">Đã sử dụng:</span>{" "}
              <span className="font-medium">
                {data.usedCount.toLocaleString()}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Giới hạn:</span>{" "}
              <span className="font-medium">
                {data.usageLimit.toLocaleString()}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Tỷ lệ:</span>{" "}
              <span className="font-medium">
                {data.usagePercentage.toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Thống kê sử dụng voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 animate-pulse bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Thống kê sử dụng voucher</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-gray-500">
            Không có dữ liệu để hiển thị biểu đồ
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Thống kê sử dụng voucher</CardTitle>
        <p className="text-sm text-gray-600">
          Top 10 voucher được sử dụng nhiều nhất (màu sắc theo tỷ lệ sử dụng)
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="code"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
                stroke="#6b7280"
              />
              <YAxis fontSize={12} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="usedCount" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.usagePercentage)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
            <span className="text-gray-600">{"< 40% sử dụng"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">40-60% sử dụng</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span className="text-gray-600">60-80% sử dụng</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">{"≥ 80% sử dụng"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}