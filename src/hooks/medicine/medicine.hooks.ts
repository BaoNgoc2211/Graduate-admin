import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import axios from "axios";

// Địa chỉ API backend
const API_URL = "http://localhost:8888/api/medicine";

// Lấy danh sách tất cả thuốc
export const useGetAllMedicine = () => {
  return useQuery<IMedicine[]>({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      return res.data;
    },
  });
};

// Lấy thông tin thuốc theo id
export const useGetMedicineById = (id: string) => {
  return useQuery<IMedicine>({
    queryKey: ["medicine", id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// Tạo mới thuốc
export const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
  });
};

// Cập nhật thuốc
export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await axios.put(`${API_URL}/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
  });
};

// Xóa thuốc
export const useDeleteMedicine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${API_URL}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
    },
  });
};

// --- Chú thích ---
// Các hook trên sử dụng React Query để quản lý trạng thái gọi API CRUD cho thuốc (medicine)
// Sử dụng FormData cho create/update để hỗ trợ upload ảnh
// invalidateQueries giúp tự động refetch lại danh sách khi có thay đổi
