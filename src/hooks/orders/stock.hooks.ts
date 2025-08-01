// // import {
// //   getAllStockAPI,
// //   getByMedicineStockAPI,
// //   getLowStockAPI,
// // } from "@/api/order/stock.api";
// // import { IStock } from "@/interface/order/stock.interface";
// // import { useQuery } from "@tanstack/react-query";

// // export const useAllStock = () => {
// //   return useQuery<{ data: IStock[] }>({
// //     queryKey: ["stock-list"],
// //     queryFn: getAllStockAPI,
// //   });
// // };
// // export const useLowStock = () => {
// //   return useQuery<{ data: IStock }>({
// //     queryKey: ["stock-low"],
// //     queryFn: getLowStockAPI,
// //   });
// // };
// // export const useByMedicineStock = () => {
// //   const params = useParams<{ _id: string }>();
// //   const medicineId = params._id;
// //   console.log("Medicine ID:", medicineId);
// //   const isIdReady = !!medicineId;
// //   return useQuery({
// //     queryKey: ["stock-by-medicine", medicineId],
// //     queryFn: () => getByMedicineStockAPI(medicineId),
// //     enabled: isIdReady,
// //   });
// // };
// import {
//   getAllStockAPI,
//   getByMedicineStockAPI,
//   getLowStockAPI,
// } from "@/api/order/stock.api";
// import { IStock } from "@/interface/order/stock.interface";
// import { useQuery } from "@tanstack/react-query";
// export const useAllStock = () =>
//   useQuery<{ data: IStock[] }>({
//     queryKey: ["stock-list"],
//     queryFn: getAllStockAPI,
//     staleTime: 5 * 60 * 1000,
//   });
// export const useLowStock = () => {
//   return useQuery<{ data: IStock[] }>({
//     queryKey: ["stock-low"],
//     queryFn: getLowStockAPI,
//   });
// };
// // export const useLowStock = (threshold = 10) => {
// //   return useQuery({
// //     queryKey: ["low-stock", threshold],
// //     queryFn: async (): Promise<{ data: IStock[] }> => {
// //       await new Promise((resolve) => setTimeout(resolve, 800));
// //       const lowStockItems = mockStocks.filter(
// //         (stock) => stock.quantity < threshold
// //       );
// //       return { data: lowStockItems };
// //     },
// //     staleTime: 5 * 60 * 1000,
// //   });
// // };

// // export const useByMedicineStock = (medicineId: string) => {
// //   return useQuery({
// //     queryKey: ["medicine-stock", medicineId],
// //     queryFn: async (): Promise<{ data: IStock[] }> => {
// //       await new Promise((resolve) => setTimeout(resolve, 1200));
// //       const medicineStocks = mockStocks.filter(
// //         (stock) => stock.medicine_id._id === medicineId
// //       );
// //       return { data: medicineStocks };
// //     },
// //     enabled: !!medicineId,
// //     staleTime: 5 * 60 * 1000,
// //   });
// // };
// // export const useByMedicineStock = () => {
// //   const params = useParams<{ medicine_id: string }>(); 
// //   const medicineId = params?.medicine_id;
// //   const isReady = !!medicineId;

// //   return useQuery({
// //     queryKey: ["stock-by-medicine", medicineId],
// //     queryFn: () => getByMedicineStockAPI(medicineId),
// //     enabled: isReady,
// //   });
// // };
// export const useByMedicineStock = (medicineId: string) =>
//   useQuery<{ data: IStock[] }>({          
//     queryKey: ["stock-by-medicine", medicineId],
//     queryFn: () => getByMedicineStockAPI(medicineId),
//     enabled: !!medicineId,
//   });
// hooks/orders/stock.hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllStockAPI,
  getByMedicineStockAPI,
  getLowStockAPI,
  createStockAPI,
  deleteStockAPI,
  updateStockAPI,
} from "@/api/order/stock.api";
import { IStock, IStockApiResponse } from "@/interface/order/stock.interface";
import { toast } from "sonner";

// Hook lấy tất cả stock
export const useAllStock = (page: number = 1, limit: number = 10) => {
  return useQuery<IStockApiResponse>({
    queryKey: ["stock-list", page, limit],
    queryFn: () => getAllStockAPI(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Hook lấy stock có số lượng thấp
export const useLowStock = () => {
  return useQuery<IStockApiResponse>({
    queryKey: ["stock-low"],
    queryFn: getLowStockAPI,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

// Hook lấy stock theo medicine ID
export const useByMedicineStock = (medicineId: string) => {
  return useQuery<IStockApiResponse>({
    queryKey: ["stock-by-medicine", medicineId],
    queryFn: () => getByMedicineStockAPI(medicineId),
    enabled: !!medicineId, // Chỉ chạy khi có medicineId
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
};

// Hook tạo stock mới
export const useCreateStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createStockAPI,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["stock-list"] });
        queryClient.invalidateQueries({ queryKey: ["stock-low"] });
        queryClient.invalidateQueries({ queryKey: ["stock-by-medicine"] });
        toast.success("Tạo stock thành công!");
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi tạo stock");
      }
    },
    onError: (error) => {
      console.error("Create stock error:", error);
      toast.error("Có lỗi xảy ra khi tạo stock");
    },
  });
};

// Hook cập nhật stock
export const useUpdateStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<IStock> }) =>
      updateStockAPI(id, data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["stock-list"] });
        queryClient.invalidateQueries({ queryKey: ["stock-low"] });
        queryClient.invalidateQueries({ queryKey: ["stock-by-medicine"] });
        toast.success("Cập nhật stock thành công!");
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi cập nhật stock");
      }
    },
    onError: (error) => {
      console.error("Update stock error:", error);
      toast.error("Có lỗi xảy ra khi cập nhật stock");
    },
  });
};

// Hook xóa stock
export const useDeleteStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteStockAPI,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["stock-list"] });
        queryClient.invalidateQueries({ queryKey: ["stock-low"] });
        queryClient.invalidateQueries({ queryKey: ["stock-by-medicine"] });
        toast.success("Xóa stock thành công!");
      } else {
        toast.error(data.message || "Có lỗi xảy ra khi xóa stock");
      }
    },
    onError: (error) => {
      console.error("Delete stock error:", error);
      toast.error("Có lỗi xảy ra khi xóa stock");
    },
  });
};

// Hook utility để tính toán thống kê stock - KHÔNG phải React Query hook
export const useStockStats = (stocks: IStock[]) => {
  // Đây không phải là hook React Query, chỉ là utility function
  // được đặt tên với prefix "use" để nhất quán
  if (!stocks || stocks.length === 0) {
    return {
      totalItems: 0,
      totalQuantity: 0,
      averagePrice: 0,
      lowStockItems: 0,
      expiringSoonItems: 0,
    };
  }

  const totalItems = stocks.length;
  const totalQuantity = stocks.reduce((sum, stock) => sum + stock.quantity, 0);
  const totalValue = stocks.reduce((sum, stock) => sum + (stock.quantity * stock.sellingPrice), 0);
  const averagePrice = totalQuantity > 0 ? totalValue / totalQuantity : 0;
  
  const lowStockItems = stocks.filter(stock => stock.quantity <= 10).length;
  const expiringSoonItems = stocks.filter(stock => {
    if (!stock.expiryDate) return false;
    const diffDays = (new Date(stock.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 60;
  }).length;

  return {
    totalItems,
    totalQuantity,
    averagePrice,
    lowStockItems,
    expiringSoonItems,
  };
};