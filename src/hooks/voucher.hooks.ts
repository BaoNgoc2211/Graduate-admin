import {
  createVoucherAPI,
  deleteVoucherAPI,
  getAllVoucherAPI,
  getByIdVoucherAPI,
  getValidVoucherAPI,
  updateVoucherAPI,
} from "@/api/voucher.api";
import {
  ICreateVoucherPayload,
  IVoucher,
  IVoucherResponse,
} from "@/interface/voucher.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const useVouchers = (page: number = 1, pageSize: number = 10) => {
  return useQuery<IVoucherResponse>({
    queryKey: ["voucher", page, pageSize],
    queryFn: () => getAllVoucherAPI(page, pageSize),
    refetchOnWindowFocus: false,
  });
};
export const useVouchersValidate = () => {
  return useQuery<{ data: IVoucher[] }>({
    queryKey: ["voucher-validate"],
    queryFn: getValidVoucherAPI,
  });
};

export const useVoucherById = () => {
  const params = useParams<{ _id: string }>();
  const voucherId = params._id;
  const isIdReady = !!voucherId;
  return useQuery({
    queryKey: ["voucher-by-id", voucherId],
    queryFn: () => getByIdVoucherAPI(voucherId),
    enabled: isIdReady,
  });
};

export const useCreateVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-voucher"],
    mutationFn: (payload: ICreateVoucherPayload) => createVoucherAPI(payload),
    onSuccess: () => {
      toast.success("Tạo voucher thành công!");
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
    onError: () => {
      toast.error("Tạo voucher thất bại!");
    },
  });
};

export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ICreateVoucherPayload }) =>
      updateVoucherAPI(id, data),
    onSuccess: () => {
      toast.success("Cập nhật voucher thành công!");
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật voucher thất bại!");
    },
  });
};

export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-voucher"],
    mutationFn: (voucher_id: string) => deleteVoucherAPI(voucher_id),
    onSuccess: () => {
      toast.success("Xoá voucher thành công!");
      queryClient.invalidateQueries({ queryKey: ["voucher"] });
    },
    onError: () => {
      toast.error("Xoá voucher thất bại!");
    },
  });
};
