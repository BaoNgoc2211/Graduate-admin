import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getAllOrdersAPI,
  getOrderByIdAPI,
  getOrderStatsAPI,
  updateOrderStatusAPI,
  cancelOrderAPI,
  getRevenueStatsAPI,
} from "@/api/order/order.api"
import type { IOrder, IOrderFilters } from "@/interface/order/order.interface"

// Get all orders with filters
export const useOrders = (filters?: IOrderFilters) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getAllOrdersAPI(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Get single order by ID
export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderByIdAPI(orderId),
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  })
}

// Get order statistics
export const useOrderStats = () => {
  return useQuery({
    queryKey: ["order-stats"],
    queryFn: getOrderStatsAPI,
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
  })
}

// Get revenue statistics
export const useRevenueStats = (period: "day" | "week" | "month" = "day") => {
  return useQuery({
    queryKey: ["revenue-stats", period],
    queryFn: () => getRevenueStatsAPI(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  })
}

// Update order status mutation
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, status, notes }: { orderId: string; status: IOrder["status"]; notes?: string }) =>
      updateOrderStatusAPI(orderId, status, notes),
    onSuccess: (updatedOrder) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order", updatedOrder._id] })
      queryClient.invalidateQueries({ queryKey: ["order-stats"] })
      queryClient.invalidateQueries({ queryKey: ["revenue-stats"] })

      toast.success("Cập nhật trạng thái đơn hàng thành công")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật trạng thái")
    },
  })
}

// Cancel order mutation
export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) => cancelOrderAPI(orderId, reason),
    onSuccess: (cancelledOrder) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["order", cancelledOrder._id] })
      queryClient.invalidateQueries({ queryKey: ["order-stats"] })
      queryClient.invalidateQueries({ queryKey: ["revenue-stats"] })

      toast.success("Hủy đơn hàng thành công")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Có lỗi xảy ra khi hủy đơn hàng")
    },
  })
}

// Refresh all order data
export const useRefreshOrderData = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] })
    queryClient.invalidateQueries({ queryKey: ["order-stats"] })
    queryClient.invalidateQueries({ queryKey: ["revenue-stats"] })
    toast.success("Đã làm mới dữ liệu")
  }
}
