import {
  getAllMedicineUsageAPI,
  getByIdMedicineUsageAPI,
  createMedicineUsageAPI,
  updateMedicineUsageAPI,
} from "@/api/medicine/usage.api";
import { IMedicineUsageGroup } from "@/interface/medicine/usage.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
interface CreateCategoryPayload {
  name: string;
  icon: string;
}
interface UpdatePayload {
  id: string;
  data: Omit<IMedicineUsageGroup, "_id" | "medicine">;
}
export const useMedicineUsages = () => {
  return useQuery<{ data: IMedicineUsageGroup[] }>({
    queryKey: ["medicine-usage"],
    queryFn: getAllMedicineUsageAPI,
  });
};
export const useMedicineUsageById = () => {
  const params = useParams<{ _id: string }>();
  const usageId = params._id;
  console.log("Usage ID:", usageId);
  const isIdReady = !!usageId;
  return useQuery({
    queryKey: ["medicine-category-by-id", usageId],
    queryFn: () => getByIdMedicineUsageAPI(usageId),
    enabled: isIdReady,
  });
};
export const useCreateMedicineUsage = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-medicine-category"],
    mutationFn: (payload: CreateCategoryPayload) =>
      createMedicineUsageAPI(payload),
    onSuccess: () => {
      toast.success("Tạo nhóm thuốc thành công!");
      router.push("/medicine-usage");
    },
    onError: () => {
      toast.error("Tạo nhóm thuốc thất bại!");
    },
  });
};
export const useUpdateMedicineUsage = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdatePayload) =>
      updateMedicineUsageAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhóm thuốc thành công!");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhóm thuốc thất bại!");
    },
  });
};
