import {
  createDistributorAPI,
  deleteDistributorAPI,
  getAllDistributorAPI,
  getByIdDistributorAPI,
  updateDistributorAPI,
} from "@/api/inventory/distributor.api";
import { IDistributor } from "@/interface/inventory/distributor.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDistributors = (page: number = 1, pageSize: number = 5) => {
  return useQuery<{ data: IDistributor[] }>({
    queryKey: ["distributors"],
    queryFn: () => getAllDistributorAPI(page, pageSize),
  });
};
export const useDistributorById = (distributor_id: string) => {
  return useQuery({
    queryKey: ["distributor", distributor_id],
    queryFn: () => getByIdDistributorAPI(distributor_id),
    enabled: !!distributor_id,
  });
};

export const useCreateDistributor = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-distributor"],
    mutationFn: (payload: IDistributor) => createDistributorAPI(payload),
    onSuccess: () => {
      toast.success("Tạo nhà phân phối thành công!");
      router.push("/distributor");
    },
    onError: () => {
      toast.error("Tạo nhà phân phối thất bại!");
    },
  });
};
export const useUpdateDistributor = () => {
  return useMutation({
    mutationKey: ["update-distributor"],
    mutationFn: ({ id, data }: { id: string; data: IDistributor }) =>
      updateDistributorAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật nhà phân phối thành công!");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật nhà phân phối thất bại!");
    },
  });
};
export const useDeleteDistributor = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["delete-distributor"],
    mutationFn: (id: string) => deleteDistributorAPI(id),
    onSuccess: () => {
      toast.success("Xóa nhà phân phối thành công!");
      router.push("/distributor");
    },
    onError: (error) => {
      console.error("Lỗi xóa:", error);
      toast.error("Xóa nhà phân phối thất bại!");
    },
  });
};
