import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  getAllPurchaseOrdersAPI,
  getByIdPurchaseOrderAPI,
  createPurchaseOrderAPI,
  updatePurchaseOrderAPI,
  deletePurchaseOrderAPI,
  getSuppliersAPI,
  getMedicinesAPI,
  getAllImportBatchAPI,
} from "@/api/order/purchase.api";
import type {
  IPurchaseOrder,
  IPurchaseOrderFilters,
  IPurchaseOrderPayload,
} from "@/interface/order/purchase.interface";

// Get all purchase orders
export const usePurchaseOrders = (filters?: IPurchaseOrderFilters) => {
  return useQuery({
    queryKey: ["purchase-orders", filters],
    queryFn: () => getAllPurchaseOrdersAPI(filters),
    staleTime: 5 * 60 * 1000,
  });
};

// Get purchase order by ID
export const usePurchaseOrderById = () => {
  const params = useParams<{ _id: string }>();
  const purchaseOrderId = params._id;
  return useQuery<{ data: IPurchaseOrder }>({
    queryKey: ["purchase-order", purchaseOrderId],
    queryFn: () => getByIdPurchaseOrderAPI(purchaseOrderId),
    enabled: !!purchaseOrderId,
  });
};

// Get suppliers list
export const useSuppliers = () => {
  return useQuery({ queryKey: ["suppliers"], queryFn: getSuppliersAPI });
};

// Get medicines list
export const useMedicines = (search?: string) => {
  return useQuery({
    queryKey: ["medicines", search],
    queryFn: () => getMedicinesAPI(search),
  });
};
export const useImportBatch = () => {
  return useQuery({
    queryKey: ["batch"],
    queryFn: () => getAllImportBatchAPI(),
  });
};
// Create purchase order
export const useCreatePurchaseOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-purchase-order"],
    mutationFn: createPurchaseOrderAPI,
    onSuccess: () => {
      toast.success("Tạo đơn mua hàng thành công!");
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      router.push("/purchase");
    },
    onError: () => toast.error("Tạo đơn mua hàng thất bại!"),
  });
};

// Update purchase order
export const useUpdatePurchaseOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-purchase-order"],
    mutationFn: ({ id, data }: { id: string; data: IPurchaseOrderPayload }) =>
      updatePurchaseOrderAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật đơn mua hàng thành công!");
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      queryClient.invalidateQueries({ queryKey: ["purchase-order"] });
    },
    onError: () => toast.error("Cập nhật đơn mua hàng thất bại!"),
  });
};

// Delete purchase order
export const useDeletePurchaseOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-purchase-order"],
    mutationFn: deletePurchaseOrderAPI,
    onSuccess: () => {
      toast.success("Xoá đơn mua hàng thành công!");
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] });
      router.push("/purchase");
    },
    onError: () => toast.error("Xoá đơn mua hàng thất bại!"),
  });
};
