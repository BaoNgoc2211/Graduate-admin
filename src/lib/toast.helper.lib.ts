import { toast } from "sonner";
import { AxiosError } from "axios";
// --- Thông báo tạo mới ---
export const toastImageRequired = () => toast.error("Vui lòng chọn ảnh");
export const toastCreateSuccess = () =>
  toast.success("Tạo danh mục thành công!");
export const toastCreateError = (err: unknown) => {
  const error = err as AxiosError<{ message: string }>;
  const message = error?.response?.data?.message || "Tạo danh mục thất bại!";
  toast.error(message);
  console.error("Lỗi chi tiết:", err);
};
// --- Thông báo cập nhật ---
export const toastUpdateSuccess = () => toast.success("Cập nhật thành công!");

export const toastUpdateError = (err?: unknown) => {
  const message =
    (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
    "Cập nhật thất bại!";
  toast.error(message);
  console.error("Lỗi cập nhật:", err);
};
