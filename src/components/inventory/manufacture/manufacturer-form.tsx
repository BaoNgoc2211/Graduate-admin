"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";

import type {
  IManufacturer,
  ManufacturerFormProps,
} from "@/interface/inventory/manufacture.interface";

import {
  useCreateManufacture,
  useUpdateManufacture,
} from "@/hooks/inventory/manufacture.hooks";

import {
  manufacturerSchema,
  ManufacturerFormType,
} from "@/schema/inventory/manufacturer.schema";

export default function ManufacturerForm({
  defaultValue,
  onSuccess,
  onCancel,
}: ManufacturerFormProps) {
  const isEditMode = !!defaultValue?._id;
  const formTitle = isEditMode
    ? "Cập nhật nhà sản xuất"
    : "Thêm mới nhà sản xuất";

  const createMutation = useCreateManufacture();
  const updateMutation = useUpdateManufacture();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<ManufacturerFormType>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      nameCo: defaultValue?.nameCo ?? "",
      country: defaultValue?.country ?? "",
      branch: defaultValue?.branch ?? "",
    },
  });

  const onSubmit = (data: ManufacturerFormType) => {
    const payload: Omit<IManufacturer, "_id"> = data;

    if (isEditMode && defaultValue?._id) {
      updateMutation.mutate(
        {
          id: defaultValue._id,
          data: payload,
        },
        {
          onSuccess: () => onSuccess?.(),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => onSuccess?.(),
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
            {[
              { label: "Tên công ty", name: "nameCo", placeholder: "Nhập tên công ty" },
              { label: "Quốc gia", name: "country", placeholder: "Nhập tên quốc gia" },
              { label: "Tên thương hiệu", name: "branch", placeholder: "Nhập thương hiệu" },
            ].map(({ label, name, placeholder }) => (
              <div className="space-y-2" key={name}>
                <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                  {label} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={name}
                  {...register(name as keyof ManufacturerFormType)}
                  placeholder={placeholder}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={createMutation.isPending || updateMutation.isPending}
                />
                {errors[name as keyof ManufacturerFormType] && (
                  <p className="text-sm text-red-600">
                    {errors[name as keyof ManufacturerFormType]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                {isEditMode ? "Hủy" : "Quay lại"}
              </Button>

              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white flex-1 sm:flex-none"
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                Lưu thông tin
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
