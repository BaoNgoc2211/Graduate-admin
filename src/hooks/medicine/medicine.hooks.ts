import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createMedicineAPI,
  deleteMedicineAPI,
  getAllMedicineAPI,
  getByIdMedicineAPI,
  updateMedicineAPI,
} from "@/api/medicine/medicine.api";
import { IMedicine } from "@/interface/medicine/medicine.interface";

export const useMedicines = () => {
  return useQuery<{ data: IMedicine[] }>({
    queryKey: ["medicine"],
    queryFn: getAllMedicineAPI,
  });
};
export const useMedicineById = () => {
  const params = useParams<{ _id: string }>();
  const medicineId = params._id;
  console.log("Medicine ID:", medicineId);
  const isIdReady = !!medicineId;
  return useQuery({
    queryKey: ["medicine-by-id", medicineId],
    queryFn: () => getByIdMedicineAPI(medicineId),
    enabled: isIdReady,
  });
};
export const useCreateMedicine = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-medicine"],
    mutationFn: (payload: IMedicine) => createMedicineAPI(payload),
    onSuccess: () => {
      toast.success("Tạo thuốc thành công!");
      router.push("/medicine");
    },
    onError: () => {
      toast.error("Tạo thuốc thất bại!");
    },
  });
};
export const useUpdateMedicine = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IMedicine }) =>
      updateMedicineAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật thuốc thành công!");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật thuốc thất bại!");
    },
  });
};
export const useDeleteMedicine = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["delete-medicine"],
    mutationFn: (medicine_id: string) => deleteMedicineAPI(medicine_id),
    onSuccess: () => {
      toast.success("Xoá thuốc thành công!");
      router.push("/medicine");
    },
    onError: () => {
      toast.error("Xoá thuốc thất bại!");
    },
  });
};
