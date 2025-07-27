// import { Badge } from "@/components/ui/badge"
// import { ORDER_STATUS_OPTIONS } from "@/interface/order/order.interface"
// import type { IOrder } from "@/interface/order/order.interface"

// interface OrderStatusBadgeProps {
//   status: IOrder["status"]
//   className?: string
// }

// export default function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
//   const statusOption = ORDER_STATUS_OPTIONS.find((option) => option.value === status)

//   if (!statusOption) {
//     return (
//       <Badge variant="secondary" className={className}>
//         {status}
//       </Badge>
//     )
//   }

//   return (
//     <Badge variant="secondary" className={`${statusOption.color} border-0 font-medium ${className}`}>
//       {statusOption.label}
//     </Badge>
//   )
// }
"use client";

import { Badge } from "@/components/ui/badge";
import { type IOrder, ORDER_STATUS_OPTIONS } from "@/interface/order/order.interface";

interface OrderStatusBadgeProps {
  status: IOrder["status"];
  className?: string;
}

export default function OrderStatusBadge({ status, className = "" }: OrderStatusBadgeProps) {
  const statusOption = ORDER_STATUS_OPTIONS.find((option) => option.value === status);
  
  if (!statusOption) {
    return (
      <Badge variant="secondary" className={className}>
        {status}
      </Badge>
    );
  }

  // Chuyển đổi class color thành variant phù hợp
  const getVariantClass = (color: string) => {
    if (color.includes("yellow")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (color.includes("blue")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (color.includes("purple")) return "bg-purple-100 text-purple-800 border-purple-200";
    if (color.includes("green")) return "bg-green-100 text-green-800 border-green-200";
    if (color.includes("red")) return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <Badge 
      className={`${getVariantClass(statusOption.color)} font-medium ${className}`}
      variant="outline"
    >
      {statusOption.label}
    </Badge>
  );
}