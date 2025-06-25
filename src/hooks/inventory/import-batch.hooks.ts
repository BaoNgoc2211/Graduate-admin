// import {} from "@/api/inventory/distributor.api";
// import {
//   createImportBatchAPI,
//   getAllImportBatchAPI,
//   updateImportBatchAPI,
//   updateImportBatchStatusAPI,
// } from "@/api/inventory/import-batch.api";
// import { IImportBatch } from "@/interface/inventory/import-batch.interface";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export const useImportBatch = () => {
//   return useQuery<{ data: IImportBatch[] }>({
//     queryKey: ["import-batches"],
//     queryFn: getAllImportBatchAPI,
//   });
// };
// // export const useDistributorById = (distributor_id: string) => {
// //   return useQuery({
// //     queryKey: ["distributor", distributor_id],
// //     queryFn: () => getAllDistributorAPI(distributor_id),
// //     enabled: !!distributor_id,
// //   });
// // };

// export const useCreateImportBatch = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationKey: ["create-import-batch"],
//     mutationFn: (payload: IImportBatch) => createImportBatchAPI(payload),
//     onSuccess: () => {
//       toast.success("Tạo lô hàng thành công!");
//       router.push("/import-batch");
//     },
//     onError: () => {
//       toast.error("Tạo lô hàng thất bại!");
//     },
//   });
// };
// export const useUpdateImportBatch = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationKey: ["update-import-batch"],
//     mutationFn: ({ id, data }: { id: string; data: IImportBatch }) =>
//       updateImportBatchAPI(id, data),
//     onSuccess: () => {
//       toast.success("Cập nhật lô hàng thành công!");
//       router.push("/import-batch");
//     },
//     onError: (error) => {
//       console.error("Lỗi cập nhật:", error);
//       toast.error("Cập nhật lô hàng thất bại!");
//     },
//   });
// };
// export const useUpdateImportBatchStatus = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationKey: ["update-import-batch-status"],
//     mutationFn: ({ id, status }: { id: string; status: string }) =>
//       updateImportBatchStatusAPI(id, status),
//     onSuccess: () => {
//       toast.success("Cập nhật trạng thái lô hàng thành công!");
//       router.push("/import-batch");
//     },
//     onError: (error) => {
//       console.error("Lỗi cập nhật trạng thái:", error);
//       toast.error("Cập nhật trạng thái lô hàng thất bại!");
//     },
//   });
// };
"use client";

import {
  createImportBatchAPI,
  getAllImportBatchAPI,
  updateImportBatchAPI,
  updateImportBatchStatusAPI,
} from "@/api/inventory/import-batch.api";
import type {
  IImportBatch,
  IImportBatchFormData,
} from "@/interface/inventory/import-batch.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useImportBatch = () => {
  return useQuery<{ data: IImportBatch[] }>({
    queryKey: ["import-batches"],
    queryFn: getAllImportBatchAPI,
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
