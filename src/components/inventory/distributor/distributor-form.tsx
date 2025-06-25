import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import type {
  IDistributor,
  DistributorFormProps,
} from "@/interface/inventory/distributor.interface";
import {
  useCreateDistributor,
  useUpdateDistributor,
} from "@/hooks/inventory/distributor.hooks";
export default function DistributorForm({
  defaultValue,
  onSuccess,
  onCancel,
}: DistributorFormProps) {
  // Khởi tạo form với react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Omit<IDistributor, "_id">>({
    defaultValues: {
      nameCo: defaultValue?.nameCo || "",
      nameRep: defaultValue?.nameRep || "",
      email: defaultValue?.email || "",
      phone: defaultValue?.phone || "",
      address: defaultValue?.address || "",
      country: defaultValue?.country || "",
    },
  });

  // Xác định chế độ form (tạo mới hoặc cập nhật)
  const isEditMode = !!defaultValue?._id;
  const formTitle = isEditMode
    ? "Cập nhật nhà phân phối"
    : "Thêm mới nhà phân phối";

  // Khởi tạo mutations với custom hooks
  const createMutation = useCreateDistributor();
  const updateMutation = useUpdateDistributor();

  // Xác định mutation hiện tại và trạng thái loading
  const currentMutation = isEditMode ? updateMutation : createMutation;
  const isLoading = currentMutation.isPending;

  /**
   * Xử lý submit form
   */
  const onSubmit = (data: Omit<IDistributor, "_id">) => {
    if (isEditMode && defaultValue?._id) {
      // Cập nhật nhà phân phối
      updateMutation.mutate(
        {
          id: defaultValue._id,
          data: data as IDistributor,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      // Tạo mới nhà phân phối
      createMutation.mutate(data as IDistributor, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    }
  };

  /**
   * Xử lý nút quay lại/hủy
   */
  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  // Auto focus vào input đầu tiên khi component mount
  useEffect(() => {
    setFocus("nameCo");
  }, [setFocus]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-blue-900 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold">{formTitle}</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tên công ty */}
            <div className="space-y-2">
              <Label
                htmlFor="nameCo"
                className="text-sm font-medium text-gray-700"
              >
                Tên công ty <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nameCo"
                {...register("nameCo", {
                  required: "Tên công ty là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên công ty phải có ít nhất 2 ký tự",
                  },
                })}
                placeholder="Nhập tên công ty"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.nameCo && (
                <p className="text-sm text-red-600">{errors.nameCo.message}</p>
              )}
            </div>

            {/* Người đại diện */}
            <div className="space-y-2">
              <Label
                htmlFor="nameRep"
                className="text-sm font-medium text-gray-700"
              >
                Người đại diện <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nameRep"
                {...register("nameRep", {
                  required: "Người đại diện là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên người đại diện phải có ít nhất 2 ký tự",
                  },
                })}
                placeholder="Nhập tên người đại diện"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.nameRep && (
                <p className="text-sm text-red-600">{errors.nameRep.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ",
                  },
                })}
                placeholder="Nhập địa chỉ email"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                {...register("phone", {
                  required: "Số điện thoại là bắt buộc",
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                  minLength: {
                    value: 10,
                    message: "Số điện thoại phải có ít nhất 10 số",
                  },
                })}
                placeholder="Nhập số điện thoại"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Địa chỉ <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                {...register("address", {
                  required: "Địa chỉ là bắt buộc",
                  minLength: {
                    value: 10,
                    message: "Địa chỉ phải có ít nhất 10 ký tự",
                  },
                })}
                placeholder="Nhập địa chỉ chi tiết"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                disabled={isLoading}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* Quốc gia */}
            <div className="space-y-2">
              <Label
                htmlFor="country"
                className="text-sm font-medium text-gray-700"
              >
                Quốc gia <span className="text-red-500">*</span>
              </Label>
              <Input
                id="country"
                {...register("country", {
                  required: "Quốc gia là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên quốc gia phải có ít nhất 2 ký tự",
                  },
                })}
                placeholder="Nhập tên quốc gia"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.country && (
                <p className="text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                {isEditMode ? "Hủy" : "Quay lại"}
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white flex-1 sm:flex-none"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Lưu thông tin
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

