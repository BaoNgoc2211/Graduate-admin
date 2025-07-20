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
//#region version 03 chua lất tổng
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
//#endregion
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import {
//   getPurchaseEntries,
//   getPurchaseEntry,
//   createPurchaseEntry,
//   updatePurchaseEntry,
//   deletePurchaseEntry,
//   approvePurchaseEntry,
//   rejectPurchaseEntry,
//   getPurchaseStats,
//   getMedicines,
//   createMedicine,
//   getImportBatches,
//   createImportBatch,
//   getSuppliers,
//   exportPurchaseEntries,
// } from "@/api/order/purchase.api";
// import type {
//   IPurchaseFilter,
//   ICreatePurchaseEntry,
// } from "@/interface/order/purchase.interface";

// // Purchase Entries
// export const usePurchaseEntries = (filters?: IPurchaseFilter) => {
//   return useQuery({
//     queryKey: ["purchase-entries", filters],
//     queryFn: () => getPurchaseEntries(filters),
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

// export const usePurchaseEntry = (id: string) => {
//   return useQuery({
//     queryKey: ["purchase-entry", id],
//     queryFn: () => getPurchaseEntry(id),
//     enabled: !!id,
//   });
// };

// export const useCreatePurchaseEntry = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createPurchaseEntry,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["purchase-entries"] });
//       queryClient.invalidateQueries({ queryKey: ["purchase-stats"] });
//       toast.success("Tạo phiếu nhập kho thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi tạo phiếu nhập kho");
//     },
//   });
// };

// export const useUpdatePurchaseEntry = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       id,
//       data,
//     }: {
//       id: string;
//       data: Partial<ICreatePurchaseEntry>;
//     }) => updatePurchaseEntry(id, data),
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({ queryKey: ["purchase-entries"] });
//       queryClient.invalidateQueries({
//         queryKey: ["purchase-entry", variables.id],
//       });
//       queryClient.invalidateQueries({ queryKey: ["purchase-stats"] });
//       toast.success("Cập nhật phiếu nhập kho thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi cập nhật phiếu nhập kho");
//     },
//   });
// };

// export const useDeletePurchaseEntry = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deletePurchaseEntry,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["purchase-entries"] });
//       queryClient.invalidateQueries({ queryKey: ["purchase-stats"] });
//       toast.success("Xóa phiếu nhập kho thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi xóa phiếu nhập kho");
//     },
//   });
// };

// export const useApprovePurchaseEntry = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: approvePurchaseEntry,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["purchase-entries"] });
//       queryClient.invalidateQueries({ queryKey: ["purchase-stats"] });
//       toast.success("Duyệt phiếu nhập kho thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi duyệt phiếu nhập kho!");
//     },
//   });
// };

// export const useRejectPurchaseEntry = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
//       rejectPurchaseEntry(id, reason),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["purchase-entries"] });
//       queryClient.invalidateQueries({ queryKey: ["purchase-stats"] });
//       toast.success("Từ chối phiếu nhập kho thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi từ chối phiếu nhập kho");
//     },
//   });
// };

// // Statistics
// export const usePurchaseStats = () => {
//   return useQuery({
//     queryKey: ["purchase-stats"],
//     queryFn: getPurchaseStats,
//     staleTime: 10 * 60 * 1000, // 10 minutes
//   });
// };

// // Medicines
// export const useMedicines = (search?: string) => {
//   return useQuery({
//     queryKey: ["medicines", search],
//     queryFn: () => getMedicines(search),
//     staleTime: 5 * 60 * 1000,
//   });
// };

// export const useCreateMedicine = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createMedicine,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["medicines"] });
//       toast.success("Tạo thuốc mới thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi tạo thuốc mới");
//     },
//   });
// };

// // Import Batches
// export const useImportBatches = (medicineId?: string) => {
//   return useQuery({
//     queryKey: ["import-batches", medicineId],
//     queryFn: () => getImportBatches(medicineId),
//     enabled: !!medicineId,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// export const useCreateImportBatch = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createImportBatch,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["import-batches"] });
//       toast.success("Tạo lô hàng mới thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi tạo lô hàng mới");
//     },
//   });
// };

// // Suppliers
// export const useSuppliers = () => {
//   return useQuery({
//     queryKey: ["suppliers"],
//     queryFn: getSuppliers,
//     staleTime: 10 * 60 * 1000,
//   });
// };

// // Export
// export const useExportPurchaseEntries = () => {
//   return useMutation({
//     mutationFn: exportPurchaseEntries,
//     onSuccess: (blob) => {
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `purchase-entries-${
//         new Date().toISOString().split("T")[0]
//       }.xlsx`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       toast.success("Xuất file Excel thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi xuất file Excel");
//     },
//   });
// };
