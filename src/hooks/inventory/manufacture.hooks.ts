import {} from "@/api/inventory/distributor.api";
import {
  createManufactureAPI,
  deleteManufactureAPI,
  getAllManufactureAPI,
  updateManufactureAPI,
} from "@/api/inventory/manufacture.api";
import { IManufacturer } from "@/interface/inventory/manufacture.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useManufactures = (page: number = 1, pageSize: number = 5) => {
  return useQuery<{ data: IManufacturer[] }>({
    queryKey: ["manufacturers"],
    queryFn: () => getAllManufactureAPI(page, pageSize),
  });
};

export const useCreateManufacture = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-manufacture"],
    mutationFn: (payload: IManufacturer) => createManufactureAPI(payload),
    onSuccess: () => {
      toast.success("Tạo nhà sản xuất thành công!");
      router.push("/manufacture");
    },
    onError: () => {
      toast.error("Tạo nhà sản xuất thất bại!");
    },
  });
};
export const useUpdateManufacture = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["update-manufacture"],
    mutationFn: ({ id, data }: { id: string; data: IManufacturer }) =>
      updateManufactureAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật nhà sản xuất thành công!");
      router.push("/manufacture");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật nhà sản xuất thất bại!");
    },
  });
};
export const useDeleteManufacture = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["delete-manufacture"],
    mutationFn: (id: string) => deleteManufactureAPI(id),
    onSuccess: () => {
      toast.success("Xóa nhà sản xuất thành công!");
      router.push("/manufacture");
    },
    onError: (error) => {
      console.error("Lỗi xóa:", error);
      toast.error("Xóa nhà sản xuất thất bại!");
    },
  });
};
