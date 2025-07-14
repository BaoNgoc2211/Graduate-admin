// "use client";

// import {
//   createDiseaseAPI,
//   deleteDiseaseAPI,
//   getAllDiseaseAPI,
//   getByIdDiseaseAPI,
//   updateDiseaseAPI,
// } from "@/api/disease/disease.api";
// import { IDisease } from "@/interface/disease/disease.interface";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { toast } from "sonner";

// export const useDiseases = () => {
//   return useQuery<{ data: IDisease[] }>({
//     queryKey: ["disease"],
//     queryFn: getAllDiseaseAPI,
//   });
// };

// export const useDiseaseById = () => {
//   const params = useParams<{ _id: string }>();
//   const diseaseId = params._id;
//   const isIdReady = !!diseaseId;
//   return useQuery({
//     queryKey: ["voucher-by-id", diseaseId],
//     queryFn: () => getByIdDiseaseAPI(diseaseId),
//     enabled: isIdReady,
//   });
// };

// export const useCreateDisease = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["create-disease"],
//     mutationFn: (payload: IDisease) => createDiseaseAPI(payload),
//     onSuccess: () => {
//       toast.success("Tạo disease thành công!");
//       queryClient.invalidateQueries({ queryKey: ["disease"] });
//     },
//     onError: () => {
//       toast.error("Tạo disease thất bại!");
//     },
//   });
// };

// export const useUpdateDisease = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: IDisease }) =>
//       updateDiseaseAPI(id, data),
//     onSuccess: () => {
//       toast.success("Cập nhật bệnh thành công!");
//       queryClient.invalidateQueries({ queryKey: ["disease"] });
//     },
//     onError: (error) => {
//       console.error("Lỗi cập nhật:", error);
//       toast.error("Cập nhật bệnh thất bại!");
//     },
//   });
// };

// export const useDeleteDisease = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["delete-disease"],
//     mutationFn: (disease_id: string) => deleteDiseaseAPI(disease_id),
//     onSuccess: () => {
//       toast.success("Xoá bệnh thành công!");
//       queryClient.invalidateQueries({ queryKey: ["disease"] });
//     },
//     onError: () => {
//       toast.error("Xoá bệnh thất bại!");
//     },
//   });
// };
"use client";

import {
  createDiseaseAPI,
  deleteDiseaseAPI,
  updateDiseaseAPI,
  getAllDiseasesAPI,
  getDiseaseByIdAPI,
} from "@/api/disease/disease.api";
import type { IDisease } from "@/interface/disease/disease.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDiseases = () => {
  return useQuery<{ data: IDisease[] }>({
    queryKey: ["diseases"],
    queryFn: getAllDiseasesAPI,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  });
};

export const useDiseaseById = (id: string) => {
  return useQuery({
    queryKey: ["disease", id],
    queryFn: () => getDiseaseByIdAPI(id),
    enabled: !!id,
  });
};

export const useCreateDisease = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<IDisease, "_id">) => createDiseaseAPI(payload),
    onSuccess: () => {
      toast.success("Tạo bệnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
      router.push("/admin/diseases");
    },
    onError: (error) => {
      console.error("Lỗi tạo bệnh:", error);
      toast.error("Tạo bệnh thất bại!");
    },
  });
};

export const useUpdateDisease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<IDisease, "_id">>;
    }) => updateDiseaseAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật bệnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật bệnh thất bại!");
    },
  });
};

export const useDeleteDisease = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiseaseAPI(id),
    onSuccess: () => {
      toast.success("Xóa bệnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
    },
    onError: (error) => {
      console.error("Lỗi xóa:", error);
      toast.error("Xóa bệnh thất bại!");
    },
  });
};
