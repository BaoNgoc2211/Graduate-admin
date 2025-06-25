import {} from "@/api/inventory/distributor.api";
import {
  createManufactureAPI,
  getAllManufactureAPI,
  updateManufactureAPI,
} from "@/api/inventory/manufacture.api";
import { IManufacturer } from "@/interface/inventory/manufacture.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useManufactures = () => {
  return useQuery<{ data: IManufacturer[] }>({
    queryKey: ["distributors"],
    queryFn: getAllManufactureAPI,
  });
};
// export const useDistributorById = (distributor_id: string) => {
//   return useQuery({
//     queryKey: ["distributor", distributor_id],
//     queryFn: () => getAllDistributorAPI(distributor_id),
//     enabled: !!distributor_id,
//   });
// };

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

