"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import type {
  IManufacturer,
  ManufacturerFormProps,
} from "@/interface/inventory/manufacture.interface";
import { useCreateManufacture, useUpdateManufacture } from "@/hooks/inventory/manufacture.hooks";
export default function ManufacturerForm({
  defaultValue,
  onSuccess,
  onCancel,
}: ManufacturerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Omit<IManufacturer, "_id">>({
    defaultValues: {
      nameCo: defaultValue?.nameCo || "",
      country: defaultValue?.country || "",
      branch: defaultValue?.branch || "",
    },
  });

  const isEditMode = !!defaultValue?._id;
  const formTitle = isEditMode
    ? "Cập nhật nhà sản xuất"
    : "Thêm mới nhà sản xuất";
  const createMutation = useCreateManufacture();
  const updateMutation = useUpdateManufacture();

  const currentMutation = isEditMode ? updateMutation : createMutation;
  const isLoading = currentMutation.isPending;

  const onSubmit = (data: Omit<IManufacturer, "_id">) => {
    if (isEditMode && defaultValue?._id) {
      updateMutation.mutate(
        {
          id: defaultValue._id,
          data: data as IManufacturer,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      createMutation.mutate(data as IManufacturer, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };
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

            {/* Tên thương hiệu */}
            <div className="space-y-2">
              <Label
                htmlFor="branch"
                className="text-sm font-medium text-gray-700"
              >
                Tên thương hiệu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch"
                {...register("branch", {
                  required: "Tên thương hiệu là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên thương hiệu phải có ít nhất 2 ký tự",
                  },
                })}
                placeholder="Nhập tên thương hiệu"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.branch && (
                <p className="text-sm text-red-600">{errors.branch.message}</p>
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
