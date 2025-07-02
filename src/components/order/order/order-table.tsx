"use client"

import { useState } from "react"
import { Eye, Edit, X, MoreHorizontal, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { IOrder } from "@/interface/order/order.interface"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import OrderStatusBadge from "./order-status-badge"

interface OrderTableProps {
  orders: IOrder[]
  isLoading?: boolean
  onViewDetails: (orderId: string) => void
  onUpdateStatus: (orderId: string, status: IOrder["status"]) => void
  onCancelOrder: (orderId: string) => void
}

export default function OrderTable({
  orders,
  isLoading,
  onViewDetails,
  onUpdateStatus,
  onCancelOrder,
}: OrderTableProps) {
  const [sortField, setSortField] = useState<keyof IOrder>("orderDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof IOrder) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const getStatusIcon = (status: IOrder["status"]) => {
    switch (status) {
      case "Pending Confirmation":
        return <Clock className="h-4 w-4" />
      case "Awaiting Shipment":
        return <Package className="h-4 w-4" />
      case "Shipping":
        return <Truck className="h-4 w-4" />
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getNextStatus = (currentStatus: IOrder["status"]): IOrder["status"] | null => {
    switch (currentStatus) {
      case "Pending Confirmation":
        return "Awaiting Shipment"
      case "Awaiting Shipment":
        return "Shipping"
      case "Shipping":
        return "Completed"
      default:
        return null
    }
  }

  const getNextStatusLabel = (currentStatus: IOrder["status"]): string => {
    const nextStatus = getNextStatus(currentStatus)
    switch (nextStatus) {
      case "Awaiting Shipment":
        return "Xác nhận đơn hàng"
      case "Shipping":
        return "Bắt đầu giao hàng"
      case "Completed":
        return "Hoàn thành đơn hàng"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn hàng</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
                <TableCell>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Không có đơn hàng nào</h3>
        <p className="text-gray-500">Chưa có đơn hàng nào phù hợp với bộ lọc hiện tại</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="cursor-pointer hover:bg-gray-100 font-semibold" onClick={() => handleSort("_id")}>
              Mã đơn hàng
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-100 font-semibold" onClick={() => handleSort("user_id")}>
              Khách hàng
            </TableHead>
            <TableHead className="font-semibold">Sản phẩm</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 font-semibold text-right"
              onClick={() => handleSort("finalAmount")}
            >
              Tổng tiền
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-100 font-semibold" onClick={() => handleSort("status")}>
              Trạng thái
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-gray-100 font-semibold"
              onClick={() => handleSort("orderDate")}
            >
              Ngày đặt
            </TableHead>
            <TableHead className="font-semibold">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order._id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="text-blue-900 font-semibold">#{order._id}</span>
                  {order.trackingNumber && (
                    <span className="text-xs text-gray-500">Mã vận đơn: {order.trackingNumber}</span>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-900 text-xs">
                      {order.user_id.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{order.user_id.name}</span>
                    <span className="text-xs text-gray-500">{order.user_id.phone}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{order.orderItems.length} sản phẩm</span>
                  <span className="text-xs text-gray-500">
                    {order.orderItems[0]?.medicine_id.name}
                    {order.orderItems.length > 1 && ` +${order.orderItems.length - 1} khác`}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex flex-col">
                  <span className="font-semibold text-blue-900">{order.finalAmount.toLocaleString("vi-VN")}đ</span>
                  {order.discount > 0 && (
                    <span className="text-xs text-green-600">Giảm {order.discount.toLocaleString("vi-VN")}đ</span>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <OrderStatusBadge status={order.status} />
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{format(new Date(order.orderDate), "dd/MM/yyyy", { locale: vi })}</span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(order.orderDate), "HH:mm", { locale: vi })}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(order._id)}
                    className="bg-transparent"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => onViewDetails(order._id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>

                      {getNextStatus(order.status) && (
                        <DropdownMenuItem onClick={() => onUpdateStatus(order._id, getNextStatus(order.status)!)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {getNextStatusLabel(order.status)}
                        </DropdownMenuItem>
                      )}

                      {order.status === "Pending Confirmation" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onCancelOrder(order._id)} className="text-red-600">
                            <X className="mr-2 h-4 w-4" />
                            Hủy đơn hàng
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
