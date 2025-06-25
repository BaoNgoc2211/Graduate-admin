"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, ArrowLeft, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type {
  ImportBatchFormProps,
  IImportBatchFormData,
} from "@/interface/inventory/import-batch.interface";
import { IMPORT_BATCH_STATUS } from "@/interface/inventory/import-batch.interface";
import {
  useCreateImportBatch,
  useUpdateImportBatch,
} from "@/hooks/inventory/import-batch.hooks";
// import { useCreateImportBatch, useUpdateImportBatch } from "@/hooks/useImportBatch"

export default function ImportBatchForm({
  defaultValue,
  onSuccess,
  onCancel,
}: ImportBatchFormProps) {
  // Khởi tạo form với react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    watch,
  } = useForm<Omit<IImportBatchFormData, "_id">>({
    defaultValues: {
      batchNumber: defaultValue?.batchNumber || "",
      distributor_id:
        typeof defaultValue?.distributor_id === "object"
          ? defaultValue.distributor_id._id
          : defaultValue?.distributor_id || "",
      importDate: defaultValue?.importDate || new Date(),
      expiryDate: defaultValue?.expiryDate || new Date(),
      importPrice: defaultValue?.importPrice || 0,
      status: defaultValue?.status || "in_stock",
    },
  });

  // Watch các giá trị date để hiển thị trong calendar
  const importDate = watch("importDate");
  const expiryDate = watch("expiryDate");

  // Xác định chế độ form (tạo mới hoặc cập nhật)
  const isEditMode = !!defaultValue?._id;
  const formTitle = isEditMode
    ? "Cập nhật lô hàng nhập"
    : "Thêm mới lô hàng nhập";

  // Khởi tạo mutations với custom hooks
  const createMutation = useCreateImportBatch();
  const updateMutation = useUpdateImportBatch();

  // Xác định mutation hiện tại và trạng thái loading
  const currentMutation = isEditMode ? updateMutation : createMutation;
  const isLoading = currentMutation.isPending;

  /**
   * Xử lý submit form
   */
  const onSubmit = (data: Omit<IImportBatchFormData, "_id">) => {
    if (isEditMode && defaultValue?._id) {
      // Cập nhật lô hàng nhập
      updateMutation.mutate(
        {
          id: defaultValue._id,
          data: data as IImportBatchFormData,
        },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      // Tạo mới lô hàng nhập
      createMutation.mutate(data as IImportBatchFormData, {
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
    setFocus("batchNumber");
  }, [setFocus]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-blue-900 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold">{formTitle}</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Mã lô hàng */}
            <div className="space-y-2">
              <Label
                htmlFor="batchNumber"
                className="text-sm font-medium text-gray-700"
              >
                Mã lô hàng <span className="text-red-500">*</span>
              </Label>
              <Input
                id="batchNumber"
                {...register("batchNumber", {
                  required: "Mã lô hàng là bắt buộc",
                  minLength: {
                    value: 3,
                    message: "Mã lô hàng phải có ít nhất 3 ký tự",
                  },
                })}
                placeholder="Nhập mã lô hàng (VD: BATCH001)"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.batchNumber && (
                <p className="text-sm text-red-600">
                  {errors.batchNumber.message}
                </p>
              )}
            </div>

            {/* Nhà phân phối */}
            <div className="space-y-2">
              <Label
                htmlFor="distributor_id"
                className="text-sm font-medium text-gray-700"
              >
                ID Nhà phân phối <span className="text-red-500">*</span>
              </Label>
              <Input
                id="distributor_id"
                {...register("distributor_id", {
                  required: "ID nhà phân phối là bắt buộc",
                })}
                placeholder="Nhập ID nhà phân phối"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.distributor_id && (
                <p className="text-sm text-red-600">
                  {errors.distributor_id.message}
                </p>
              )}

              {/* Hiển thị tên nhà phân phối hiện tại nếu đang edit */}
              {isEditMode &&
                defaultValue?.distributor_id &&
                typeof defaultValue.distributor_id === "object" && (
                  <p className="text-sm text-gray-600">
                    Nhà phân phối hiện tại:{" "}
                    <span className="font-medium">
                      {defaultValue.distributor_id.name}
                    </span>
                  </p>
                )}
            </div>

            {/* Ngày nhập */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Ngày nhập <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal focus:ring-2 focus:ring-blue-500",
                      !importDate && "text-muted-foreground"
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {importDate
                      ? format(importDate, "dd/MM/yyyy", { locale: vi })
                      : "Chọn ngày nhập"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={importDate}
                    onSelect={(date) =>
                      setValue("importDate", date || new Date())
                    }
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Hạn sử dụng */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Hạn sử dụng <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal focus:ring-2 focus:ring-blue-500",
                      !expiryDate && "text-muted-foreground"
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate
                      ? format(expiryDate, "dd/MM/yyyy", { locale: vi })
                      : "Chọn hạn sử dụng"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={(date) =>
                      setValue("expiryDate", date || new Date())
                    }
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Giá nhập */}
            <div className="space-y-2">
              <Label
                htmlFor="importPrice"
                className="text-sm font-medium text-gray-700"
              >
                Giá nhập (VNĐ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="importPrice"
                type="number"
                step="0.01"
                min="0"
                {...register("importPrice", {
                  required: "Giá nhập là bắt buộc",
                  min: {
                    value: 0,
                    message: "Giá nhập phải lớn hơn 0",
                  },
                  valueAsNumber: true,
                })}
                placeholder="Nhập giá nhập"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
              {errors.importPrice && (
                <p className="text-sm text-red-600">
                  {errors.importPrice.message}
                </p>
              )}
            </div>

            {/* Trạng thái */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Trạng thái <span className="text-red-500">*</span>
              </Label>
              <Select
                defaultValue={defaultValue?.status || "in_stock"}
                onValueChange={(value) =>
                  setValue("status", value as IImportBatchFormData["status"])
                }
                disabled={isLoading}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {IMPORT_BATCH_STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            status.color.split(" ")[0]
                          }`}
                        />
                        {status.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
