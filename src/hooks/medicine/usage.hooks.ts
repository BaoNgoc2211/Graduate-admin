import {
  createMedicineUsageAPI,
  deleteMedicineUsageAPI,
  getAllMedicineUsageAPI,
  getMedicineUsageByIdAPI,
  getMedicineUsageStatsAPI,
  updateMedicineUsageAPI,
} from "@/api/medicine/usage.api";
import { IMedicineUsageFilter, IMedicineUsagePayload } from "@/interface/medicine/usage.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMedicineUsages = (filter?: IMedicineUsageFilter) => {
  return useQuery({
    queryKey: ["medicine-usage", filter],
    queryFn: getAllMedicineUsageAPI,
  });
};

export const useMedicineUsageById = (id: string) => {
  return useQuery({
    queryKey: ["medicine-usage", id],
    queryFn: () => getMedicineUsageByIdAPI(id),
    enabled: !!id,
  });
};

export const useCreateMedicineUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedicineUsageAPI,
    onSuccess: () => {
      toast.success("Tạo nhóm thuốc thành công!");
      queryClient.invalidateQueries({ queryKey: ["medicine-usage"] });
      queryClient.invalidateQueries({ queryKey: ["medicine-usage-stats"] });
    },
    onError: (error) => {
      console.error("Lỗi tạo nhóm thuốc:", error);
      toast.error("Tạo nhóm thuốc thất bại!");
    },
  });
};

export const useUpdateMedicineUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IMedicineUsagePayload;
    }) => updateMedicineUsageAPI(id, data),
    onSuccess: (_, { id }) => {
      toast.success("Cập nhật nhóm thuốc thành công!");
      queryClient.invalidateQueries({ queryKey: ["medicine-usage"] });
      queryClient.invalidateQueries({ queryKey: ["medicine-usage", id] });
      queryClient.invalidateQueries({ queryKey: ["medicine-usage-stats"] });
    },
    onError: (error) => {
      console.error("Lỗi cập nhật nhóm thuốc:", error);
      toast.error("Cập nhật nhóm thuốc thất bại!");
    },
  });
};

export const useDeleteMedicineUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedicineUsageAPI,
    onSuccess: () => {
      toast.success("Xóa danh mục thuốc thành công!");
      queryClient.invalidateQueries({ queryKey: ["medicine-usage"] });
      queryClient.invalidateQueries({ queryKey: ["medicine-usage-stats"] });
    },
    onError: (error) => {
      console.error("Lỗi xóa danh mục thuốc:", error);
      toast.error("Xóa danh mục thuốc thất bại!");
    },
  });
};

// Hook lấy thống kê danh mục thuốc
export const useMedicineUsageStatus = () => {
  return useQuery({
    queryKey: ["medicine-usage-stats"],
    queryFn: getMedicineUsageStatsAPI,
  });
};

// Hook tổng hợp cho quản lý danh mục thuốc
export const useMedicineCategory = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery({
    queryKey: ["medicine-usage"],
    queryFn: getAllMedicineUsageAPI,
  });

  const create = useMutation({
    mutationFn: createMedicineUsageAPI,
    onSuccess: () => {
      toast.success("Tạo nhóm thuốc thành công!");
      queryClient.invalidateQueries({ queryKey: ["medicine-usage"] });
    },
    onError: () => {
      toast.error("Tạo nhóm thuốc thất bại!");
    },
  });

  const update = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IMedicineUsagePayload;
    }) => updateMedicineUsageAPI(id, payload),
    onSuccess: () => {
      toast.success("Cập nhật nhóm thuốc thành công!");
      queryClient.invalidateQueries({ queryKey: ["medicine-usage"] });
    },
    onError: () => {
      toast.error("Cập nhật nhóm thuốc thất bại!");
    },
  });

  const remove = useMutation({
    mutationFn: deleteMedicineUsageAPI,
    onSuccess: () => {
      toast.success("Xóa nhóm thuốc thành công!");
      queryClient.invalidateQueries({ queryKey: ["medicine-usage"] });
    },
    onError: () => {
      toast.error("Xóa nhóm thuốc thất bại!");
    },
  });

  return { getAll, create, update, remove };
};
