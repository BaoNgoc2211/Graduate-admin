import {
  createDiseaseCategoryAPI,
  deleteDiseaseCategoryAPI,
  updateDiseaseCategoryAPI,
  getAllDiseaseCategoryAPI,
  getByIdDiseaseCategoryAPI,
} from "@/api/disease/category.api";

import { IDiseaseCategory } from "@/interface/disease/disease-category.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateCategoryPayload {
  name: string;
  icon: string;
}

interface UpdatePayload {
  id: string;
  data: {
    name?: string;
    icon?: string;
  };
}

export const useDiseaseCategories = () => {
  return useQuery<{ data: IDiseaseCategory[] }>({
    queryKey: ["disease-categories"],
    queryFn: getAllDiseaseCategoryAPI,
    staleTime: 5 * 60 * 1000, // cache 5 phút
  });
};

export const useDiseaseCategoryById = () => {
  const params = useParams<{ id: string }>();
  const categoryId = params.id;
  const isIdReady = !!categoryId;

  return useQuery({
    queryKey: ["disease-category", categoryId],
    queryFn: () => getByIdDiseaseCategoryAPI(categoryId),
    enabled: isIdReady,
  });
};

export const useCreateDiseaseCategory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      createDiseaseCategoryAPI(payload),
    onSuccess: () => {
      toast.success("Tạo danh mục thành công!");
      queryClient.invalidateQueries({ queryKey: ["disease-categories"] });
      router.push("/disease-category");
    },
    onError: () => {
      toast.error("Tạo danh mục thất bại!");
    },
  });
};

export const useUpdateDiseaseCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePayload) =>
      updateDiseaseCategoryAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật danh mục thành công!");
      queryClient.invalidateQueries({ queryKey: ["disease-categories"] });
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật danh mục thất bại!");
    },
  });
};

export const useDeleteDiseaseCategory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiseaseCategoryAPI(id),
    onSuccess: () => {
      toast.success("Xoá danh mục thành công!");
      queryClient.invalidateQueries({ queryKey: ["disease-categories"] });
      router.push("/disease-category");
    },
    onError: () => {
      toast.error("Xoá danh mục thất bại!");
    },
  });
};
