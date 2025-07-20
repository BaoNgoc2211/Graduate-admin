"use client";

import {
  createImportBatchAPI,
  deleteImportBatchAPI,
  getAllImportBatchAPI,
  updateImportBatchAPI,
  updateImportBatchStatusAPI,
} from "@/api/inventory/import-batch.api";
import type {
  // IImportBatch,
  IImportBatchFormData,
} from "@/interface/inventory/import-batch.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// export const useImportBatch = () => {
//   return useQuery<{ data: IImportBatch[] }>({
//     queryKey: ["import-batches"],
//     queryFn: getAllImportBatchAPI,
//     select: (data) => {
//       data.data.sort(
//         (a, b) =>
//           new Date(b.importDate).getTime() - new Date(a.importDate).getTime()
//       );
//       data.data = data.data.slice(0, 5); // lấy 20 dòng đầu
//       return data;
//     },
//   });
// };
export const useImportBatch = (page: number = 1, pageSize: number = 20) => {
  return useQuery({
    queryKey: ["import-batches", page],
    queryFn: () => getAllImportBatchAPI(page, pageSize),
    // keepPreviousData: true, // giữ dữ liệu cũ khi chuyển trang
  });
};
export const useCreateImportBatch = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-import-batch"],
    mutationFn: (payload: IImportBatchFormData) =>
      createImportBatchAPI(payload),
    onSuccess: () => {
      toast.success("Tạo lô hàng nhập thành công!");
      router.push("/import-batch");
    },
    onError: () => {
      toast.error("Tạo lô hàng nhập thất bại!");
    },
  });
};

export const useUpdateImportBatch = () => {
  return useMutation({
    mutationKey: ["update-import-batch"],
    mutationFn: ({ id, data }: { id: string; data: IImportBatchFormData }) =>
      updateImportBatchAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật lô hàng nhập thành công!");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật lô hàng nhập thất bại!");
    },
  });
};

export const useUpdateImportBatchStatus = () => {
  return useMutation({
    mutationKey: ["update-import-batch-status"],
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "expired" | "out_of_stock" | "discontinued" | "in_stock";
    }) => updateImportBatchStatusAPI(id, status),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công!");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật trạng thái:", error);
      toast.error("Cập nhật trạng thái thất bại!");
    },
  });
};
export const useDeleteImportBatch = () => {
  return useMutation({
    mutationKey: ["delete-import-batch"],
    mutationFn: (batch_id: string) => deleteImportBatchAPI(batch_id),
    onSuccess: () => {
      toast.success("Xóa lô hàng nhập thành công!");
    },
    onError: (error) => {
      console.error("Lỗi xóa:", error);
      toast.error("Xóa lô hàng nhập thất bại!");
    },
  });
};
