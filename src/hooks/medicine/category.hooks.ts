import {
  getAllMedicineCategoryAPI,
  getByIdMedicineCategoryAPI,
  createMedicineCategoryAPI,
  updateMedicineCategoryAPI,
  deleteMedicineCategoryAPI,
} from "@/api/medicine/category.api";
import { IMedicineCategory } from "@/interface/medicine/category.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
interface CreateCategoryPayload {
  name: string;
  icon: string;
}

interface UpdatePayload {
  id: string;
  data: Omit<IMedicineCategory, "_id" | "medicine">;
}
export const useMedicineCategories = () => {
  return useQuery<{ data: IMedicineCategory[] }>({
    queryKey: ["medicine-categories"],
    queryFn: getAllMedicineCategoryAPI,
  });
};
export const useMedicineCategoryById = () => {
  const params = useParams<{ _id: string }>();
  const categoryId = params._id;
  console.log("Category ID:", categoryId);
  const isIdReady = !!categoryId;
  return useQuery({
    queryKey: ["medicine-category-by-id", categoryId],
    queryFn: () => getByIdMedicineCategoryAPI(categoryId),
    enabled: isIdReady,
  });
};
export const useCreateMedicineCategory = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-medicine-category"],
    mutationFn: (payload: CreateCategoryPayload) =>
      createMedicineCategoryAPI(payload),
    onSuccess: () => {
      toast.success("Tạo danh mục thành công!");
      router.push("/medicine-category");
    },
    onError: () => {
      toast.error("Tạo danh mục thất bại!");
    },
  });
};
export const useUpdateMedicineCategory = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdatePayload) =>
      updateMedicineCategoryAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật danh mục thành công!");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật danh mục thất bại!");
    },
  });
};
export const useDeleteMedicineCategory = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["delete-medicine-category"],
    mutationFn: (medCategory_id: string) =>
      deleteMedicineCategoryAPI(medCategory_id),
    onSuccess: () => {
      toast.success("Xoá danh mục thành công!");
      router.push("/medicine-category");
    },
    onError: () => {
      toast.error("Xoá danh mục thất bại!");
    },
  });

}