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
      router.push("/disease");
    },
    onError: (error) => {
      console.error("Lỗi tạo bệnh:", error);
      toast.error("Tạo bệnh thất bại!");
    },
  });
};

export const useUpdateDisease = () => {
  const router = useRouter();
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
      router.push("/disease");
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
