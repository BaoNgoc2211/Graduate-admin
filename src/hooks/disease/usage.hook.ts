import {
  createDiseaseUsageAPI,
  deleteDiseaseUsageAPI,
  getAllDiseaseUsageAPI,
  getByIdDiseaseUsageAPI,
  updateDiseaseUsageAPI,
} from "@/api/disease/usage.api";
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

export const useDiseaseUsageGroups = (
  page: number = 1,
  pageSize: number = 5
) => {
  return useQuery<{ data: IDiseaseCategory[] }>({
    queryKey: ["disease-usage-groups", page, pageSize],
    queryFn: () => getAllDiseaseUsageAPI(page, pageSize),
    staleTime: 5 * 60 * 1000, // cache 5 phút
  });
};

export const useDiseaseUsageGroupById = () => {
  const params = useParams<{ id: string }>();
  const usageGroupId = params.id;
  const isIdReady = !!usageGroupId;

  return useQuery({
    queryKey: ["disease-usage", usageGroupId],
    queryFn: () => getByIdDiseaseUsageAPI(usageGroupId),
    enabled: isIdReady,
  });
};

export const useCreateDiseaseUsageGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) =>
      createDiseaseUsageAPI(payload),
    onSuccess: () => {
      toast.success("Tạo nhóm bệnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["disease-categories"] });
      router.push("/disease-usage");
    },
    onError: () => {
      toast.error("Tạo nhóm bệnh thất bại!");
    },
  });
};

export const useUpdateDiseaseUsageGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePayload) =>
      updateDiseaseUsageAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật nhóm bệnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["disease-categories"] });
      router.push("/disease-usage");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật nhóm bệnh thất bại!");
    },
  });
};

export const useDeleteDiseaseUsageGroup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDiseaseUsageAPI(id),
    onSuccess: () => {
      toast.success("Xoá nhóm bệnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["disease-categories"] });
      router.push("/disease-usage");
    },
    onError: () => {
      toast.error("Xoá nhóm bệnh thất bại!");
    },
  });
};
