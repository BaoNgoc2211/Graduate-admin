//#region version 01
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { IPurchase } from "@/interface/order/purchase.interface";
// import {
//   createPurchaseAPI,
//   deletePurchase,
//   getAllPurchaseAPI,
//   getByIdPurchaseAPI,
//   updatePurchase,
// } from "@/api/order/purchase.api";

// export const usePurchases = () => {
//   return useQuery<{ data: IPurchase[] }>({
//     queryKey: ["purchase"],
//     queryFn: getAllPurchaseAPI,
//   });
// };
// export const usePurchaseById = () => {
//   const params = useParams<{ _id: string }>();
//   const purchaseId = params._id;
//   console.log("Purchase ID:", purchaseId);
//   const isIdReady = !!purchaseId;
//   return useQuery({
//     queryKey: ["purchase-by-id", purchaseId],
//     queryFn: () => getByIdPurchaseAPI(purchaseId),
//     enabled: isIdReady,
//   });
// };
// export const useCreatePurchase = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationKey: ["create-purchase"],
//     mutationFn: (payload: IPurchase) => createPurchaseAPI(payload),
//     onSuccess: () => {
//       toast.success("Tạo phiếu nhập hàng thành công!");
//       router.push("/purchase");
//     },
//     onError: () => {
//       toast.error("Tạo phiếu nhập hàng thất bại!");
//     },
//   });
// };
// export const useUpdatePurchase = () => {
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: IPurchase }) =>
//       updatePurchase(id, data),
//     onSuccess: () => {
//       toast.success("Cập nhật phiếu nhập hàng thành công!");
//     },
//     onError: (error) => {
//       console.error("Lỗi cập nhật:", error);
//       toast.error("Cập nhật phiếu nhập hàng thất bại!");
//     },
//   });
// };
// export const useDeletePurchase = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationKey: ["delete-purchase"],
//     mutationFn: (purchase_id: string) => deletePurchase(purchase_id),
//     onSuccess: () => {
//       toast.success("Xoá phiếu nhập hàng thành công!");
//       router.push("/purchase");
//     },
//     onError: () => {
//       toast.error("Xoá phiếu nhập hàng thất bại!");
//     },
//   });
// };
//#endregion
//#region version 02 chuaư lất tổng
// import {
//   createPurchaseOrderAPI,
//   deletePurchaseOrderAPI,
//   updatePurchaseOrderAPI,
//   getAllPurchaseOrdersAPI,
//   getPurchaseOrderByIdAPI,
// } from "@/api/order/purchase.api";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { IPurchaseOrderPayload } from "@/interface/order/purchase.interface";
// export const usePurchaseOrders = () => {
//   return useQuery({
//     queryKey: ["purchase-orders"],
//     queryFn: getAllPurchaseOrdersAPI,
//   });
// };

// /**
//  * Hook lấy phiếu nhập hàng theo ID
//  */
// export const usePurchaseOrderById = (id: string) => {
//   return useQuery({
//     queryKey: ["purchase-order", id],
//     queryFn: () => getPurchaseOrderByIdAPI(id),
//     enabled: !!id,
//   });
// };

// /**
//  * Hook tạo mới phiếu nhập hàng
//  */
// export const useCreatePurchaseOrder = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createPurchaseOrderAPI,
//     onSuccess: () => {
//       toast.success("Tạo phiếu nhập hàng thành công!");
//       queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
//       router.push("/purchase");
//     },
//     onError: (error) => {
//       console.error("Lỗi tạo phiếu nhập hàng:", error);
//       toast.error("Tạo phiếu nhập hàng thất bại!");
//     },
//   });
// };

// /**
//  * Hook cập nhật phiếu nhập hàng
//  */
// export const useUpdatePurchaseOrder = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: IPurchaseOrderPayload }) =>
//       updatePurchaseOrderAPI(id, data),
//     onSuccess: () => {
//       toast.success("Cập nhật phiếu nhập hàng thành công!");
//       queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
//       router.push("/purchase");
//     },
//     onError: (error) => {
//       console.error("Lỗi cập nhật phiếu nhập hàng:", error);
//       toast.error("Cập nhật phiếu nhập hàng thất bại!");
//     },
//   });
// };

// export const useDeletePurchaseOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deletePurchaseOrderAPI,
//     onSuccess: () => {
//       toast.success("Xóa phiếu nhập hàng thành công!");
//       queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
//     },
//     onError: (error) => {
//       console.error("Lỗi xóa phiếu nhập hàng:", error);
//       toast.error("Xóa phiếu nhập hàng thất bại!");
//     },
//   });
// };
//#endregion
"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  getAllPurchaseOrdersAPI,
  getPurchaseOrderByIdAPI,
  createPurchaseOrderAPI,
  updatePurchaseOrderAPI,
  deletePurchaseOrderAPI,
} from  "@/api/order/purchase.api"
import { IPurchaseOrderPayload } from "@/interface/order/purchase.interface"

export const usePurchaseOrders = () => {
  return useQuery({
    queryKey: ["purchase-orders"],
    queryFn: getAllPurchaseOrdersAPI,
  })
}

export const usePurchaseOrderById = (id: string) => {
  return useQuery({
    queryKey: ["purchase-order", id],
    queryFn: () => getPurchaseOrderByIdAPI(id),
    enabled: !!id,
  })
}

/**
 * Hook tạo mới phiếu nhập hàng
 */
export const useCreatePurchaseOrder = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPurchaseOrderAPI,
    onSuccess: () => {
      toast.success("Tạo phiếu nhập hàng thành công!")
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] })
      router.push("/purchase")
    },
    onError: (error) => {
      console.error("Lỗi tạo phiếu nhập hàng:", error)
      toast.error("Tạo phiếu nhập hàng thất bại!")
    },
  })
}

/**
 * Hook cập nhật phiếu nhập hàng
 */
export const useUpdatePurchaseOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IPurchaseOrderPayload }) => updatePurchaseOrderAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật phiếu nhập hàng thành công!")
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] })
      // Không redirect ngay lập tức, để component tự xử lý
    },
    onError: (error) => {
      console.error("Lỗi cập nhật phiếu nhập hàng:", error)
      toast.error("Cập nhật phiếu nhập hàng thất bại!")
    },
  })
}

/**
 * Hook xóa phiếu nhập hàng
 */
export const useDeletePurchaseOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePurchaseOrderAPI,
    onSuccess: () => {
      toast.success("Xóa phiếu nhập hàng thành công!")
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] })
    },
    onError: (error) => {
      console.error("Lỗi xóa phiếu nhập hàng:", error)
      toast.error("Xóa phiếu nhập hàng thất bại!")
    },
  })
}

