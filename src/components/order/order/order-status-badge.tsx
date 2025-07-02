import { Badge } from "@/components/ui/badge"
import { ORDER_STATUS_OPTIONS } from "@/interface/order/order.interface"
import type { IOrder } from "@/interface/order/order.interface"

interface OrderStatusBadgeProps {
  status: IOrder["status"]
  className?: string
}

export default function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const statusOption = ORDER_STATUS_OPTIONS.find((option) => option.value === status)

  if (!statusOption) {
    return (
      <Badge variant="secondary" className={className}>
        {status}
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className={`${statusOption.color} border-0 font-medium ${className}`}>
      {statusOption.label}
    </Badge>
  )
}
