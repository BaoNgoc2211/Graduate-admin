//#region version 1
// import { IOrder } from "@/interface/order/order.interface";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchAllOrders,
//   fetchOrdersByStatus,
//   fetchOrderById,
//   updateOrderDetailStatus,
//   updateOrderStatus,
// } from "@/api/order/order.api";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// // Lấy tất cả đơn hàng
// export const useOrders = () => {
//   return useQuery<IOrder[]>({
//     queryKey: ["orders"],
//     queryFn: fetchAllOrders,
//   });
// };

// // Lấy đơn hàng theo trạng thái
// export const useOrdersByStatus = (status: string) => {
//   return useQuery<IOrder[]>({
//     queryKey: ["orders", status],
//     queryFn: () => fetchOrdersByStatus(status),
//     enabled: !!status,
//   });
// };

// // Xem chi tiết đơn hàng
// export const useOrderDetail = (id: string) => {
//   return useQuery<IOrder>({
//     queryKey: ["order-detail", id],
//     queryFn: () => fetchOrderById(id),
//     staleTime: 2 * 60 * 1000, // 2 minutes
//     enabled: !!id,
//   });
// };

// // Cập nhật trạng thái đơn hàng chi tiết
// export const useUpdateOrderDetailStatus = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, status }: { id: string; status: IOrder["status"] }) =>
//       updateOrderDetailStatus(id, status),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//       toast.success("Cập nhật trạng thái đơn hàng thành công");
//       router.push("/orders");
//     },
//   });
// };

// // Cập nhật trạng thái đơn hàng tổng
// export const useUpdateOrderStatus = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, status }: { id: string; status: IOrder["status"] }) =>
//       updateOrderStatus(id, status),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//     },
//   });
// };
//#endregion
//#region version 2
// import { IOrder } from "@/interface/order/order.interface";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import {
//   fetchAllOrders,
//   fetchOrdersByStatus,
//   fetchOrderById,
//   updateOrderDetailStatus,
//   updateOrderStatus,
// } from "@/api/order/order.api";
// import { toast } from "sonner";
// // import { useRouter } from "next/navigation";

// // Lấy tất cả đơn hàng
// export const useOrders = () => {
//   return useQuery<IOrder[]>({
//     queryKey: ["orders"],
//     queryFn: fetchAllOrders,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     refetchOnWindowFocus: false,
//   });
// };

// // Lấy đơn hàng theo trạng thái
// export const useOrdersByStatus = (status: string) => {
//   return useQuery<IOrder[]>({
//     queryKey: ["orders", "status", status],
//     queryFn: () => fetchOrdersByStatus(status),
//     enabled: !!status && status !== "all",
//     staleTime: 5 * 60 * 1000,
//     refetchOnWindowFocus: false,
//   });
// };

// // Xem chi tiết đơn hàng
// export const useOrderDetail = (id: string) => {
//   return useQuery<IOrder>({
//     queryKey: ["order-detail", id],
//     queryFn: () => fetchOrderById(id),
//     staleTime: 2 * 60 * 1000, // 2 minutes
//     enabled: !!id,
//     refetchOnWindowFocus: false,
//   });
// };

// // Cập nhật trạng thái đơn hàng chi tiết
// export const useUpdateOrderDetailStatus = () => {
//   // const router = useRouter();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, status }: { id: string; status: IOrder["status"] }) =>
//       updateOrderDetailStatus(id, status),
//     onSuccess: (_, variables) => {
//       // Invalidate tất cả queries liên quan đến orders
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//       queryClient.invalidateQueries({ queryKey: ["order-detail", variables.id] });

//       toast.success("Cập nhật trạng thái đơn hàng thành công");
//     },
//     onError: (error) => {
//       console.error("Error updating order detail status:", error);
//       toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
//     }
//   });
// };

// // Cập nhật trạng thái đơn hàng tổng
// export const useUpdateOrderStatus = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, status }: { id: string; status: IOrder["status"] }) =>
//       updateOrderStatus(id, status),
//     onSuccess: (_, variables) => {
//       // Invalidate tất cả queries liên quan đến orders
//       queryClient.invalidateQueries({ queryKey: ["orders"] });

//       // Invalidate queries theo status cụ thể
//       queryClient.invalidateQueries({
//         queryKey: ["orders", "status"],
//         exact: false
//       });

//       // Invalidate order detail nếu có
//       queryClient.invalidateQueries({ queryKey: ["order-detail", variables.id] });
//     },
//     onError: (error) => {
//       console.error("Error updating order status:", error);
//       toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
//     }
//   });
// };

// // Hook để refresh tất cả data liên quan đến orders
// export const useRefreshOrderData = () => {
//   const queryClient = useQueryClient();

//   return () => {
//     queryClient.invalidateQueries({ queryKey: ["orders"] });
//     queryClient.invalidateQueries({
//       queryKey: ["orders", "status"],
//       exact: false
//     });
//     toast.success("Đã làm mới dữ liệu");
//   };
// };
//#endregion
import { IOrder } from "@/interface/order/order.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllOrders,
  fetchOrdersByStatus,
  fetchOrderById,
  updateOrderDetailStatus,
  updateOrderStatus,
} from "@/api/order/order.api";
import { toast } from "sonner";

// Lấy tất cả đơn hàng
// export const useOrders = () => {
//   return useQuery<IOrder[]>({
//     queryKey: ["orders"],
//     queryFn: fetchAllOrders,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     refetchOnWindowFocus: false,
//     onError: (error: unknown) => {
//       console.error("Error fetching orders:", error);
//       toast.error("Có lỗi xảy ra khi tải danh sách đơn hàng");
//     },
//   });
// };
export const useOrders = () => {
  return useQuery<IOrder[], Error>({
    queryKey: ["orders"],
    queryFn: fetchAllOrders,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });
};
// Lấy đơn hàng theo trạng thái
export const useOrdersByStatus = (status: string) => {
  return useQuery<IOrder[]>({
    queryKey: ["orders", "status", status],
    queryFn: () => fetchOrdersByStatus(status),
    enabled: !!status && status !== "all" && status !== "",
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    
  });
};

// Xem chi tiết đơn hàng
export const useOrderDetail = (id: string) => {
  return useQuery<IOrder>({
    queryKey: ["order-detail", id],
    queryFn: () => fetchOrderById(id),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

// Cập nhật trạng thái đơn hàng chi tiết
export const useUpdateOrderDetailStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: IOrder["status"] }) =>
      updateOrderDetailStatus(id, status),
    onSuccess: (_, variables) => {
      // Invalidate tất cả queries liên quan đến orders
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({
        queryKey: ["order-detail", variables.id],
      });

      toast.success("Cập nhật trạng thái đơn hàng thành công");
    },
    onError: (error) => {
      console.error("Error updating order detail status:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
    },
  });
};

// Cập nhật trạng thái đơn hàng tổng
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: IOrder["status"] }) =>
      updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      // Invalidate tất cả queries liên quan đến orders
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      // Invalidate queries theo status cụ thể
      queryClient.invalidateQueries({
        queryKey: ["orders", "status"],
        exact: false,
      });

      // Invalidate order detail nếu có
      queryClient.invalidateQueries({
        queryKey: ["order-detail", variables.id],
      });
    },
    onError: (error) => {
      console.error("Error updating order status:", error);
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");
    },
  });
};

// Hook để refresh tất cả data liên quan đến orders
export const useRefreshOrderData = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    queryClient.invalidateQueries({
      queryKey: ["orders", "status"],
      exact: false,
    });
    toast.success("Đã làm mới dữ liệu");
  };
};

// Xem chi tiết đơn hàng - alias cho useOrderDetail
export const useOrderById = (id: string) => {
  return useOrderDetail(id);
};
