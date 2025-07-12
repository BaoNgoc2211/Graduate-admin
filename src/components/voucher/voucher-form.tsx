"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, PlusIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { ICreateVoucherPayload, IVoucher } from "@/interface/voucher.interface";
import { useCreateVoucher, useUpdateVoucher } from "@/hooks/voucher.hooks";
// import { useCreateVoucher, useUpdateVoucher } from "@/hooks/voucher/useVouchers"
// import type { IVoucher, ICreateVoucherPayload } from "@/interface/voucher/voucher.interface"

const voucherSchema = z
  .object({
    code: z
      .string()
      .min(3, "Mã voucher phải có ít nhất 3 ký tự")
      .max(20, "Mã voucher không được quá 20 ký tự"),
    name: z
      .string()
      .min(5, "Tên voucher phải có ít nhất 5 ký tự")
      .max(100, "Tên voucher không được quá 100 ký tự"),
    description: z
      .string()
      .min(10, "Mô tả phải có ít nhất 10 ký tự")
      .max(500, "Mô tả không được quá 500 ký tự"),
    discountType: z.enum(["PERCENTAGE", "FIXED"], {
      required_error: "Vui lòng chọn loại giảm giá",
    }),
    discountValue: z.number().min(1, "Giá trị giảm giá phải lớn hơn 0"),
    minOrderValue: z
      .number()
      .min(0, "Giá trị đơn hàng tối thiểu không được âm"),
    maxDiscountValue: z
      .number()
      .min(0, "Giá trị giảm giá tối đa không được âm"),
    usageLimit: z.number().min(1, "Giới hạn sử dụng phải lớn hơn 0"),
    startDate: z.date({
      required_error: "Vui lòng chọn ngày bắt đầu",
    }),
    endDate: z.date({
      required_error: "Vui lòng chọn ngày kết thúc",
    }),
    isActive: z.boolean(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      if (data.discountType === "PERCENTAGE") {
        return data.discountValue <= 100;
      }
      return true;
    },
    {
      message: "Phần trăm giảm giá không được vượt quá 100%",
      path: ["discountValue"],
    }
  );

type VoucherFormData = z.infer<typeof voucherSchema>;

interface VoucherFormProps {
  voucher?: IVoucher;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export default function VoucherForm({
  voucher,
  trigger,
  onSuccess,
}: VoucherFormProps) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const createVoucherMutation = useCreateVoucher();
  const updateVoucherMutation = useUpdateVoucher();

  const isEditing = !!voucher;
  const isLoading =
    createVoucherMutation.isPending || updateVoucherMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<VoucherFormData>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      discountType: "PERCENTAGE",
      discountValue: 0,
      minOrderValue: 0,
      maxDiscountValue: 0,
      usageLimit: 1,
      isActive: true,
    },
  });

  const discountType = watch("discountType");

  // Set form values when editing
  useEffect(() => {
    if (voucher && open) {
      reset({
        code: voucher.code,
        name: voucher.name,
        description: voucher.description,
        discountType: voucher.discountType,
        discountValue: voucher.discountValue,
        minOrderValue: voucher.minOrderValue,
        maxDiscountValue: voucher.maxDiscountValue,
        usageLimit: voucher.usageLimit,
        startDate: new Date(voucher.startDate),
        endDate: new Date(voucher.endDate),
        isActive: voucher.isActive,
      });
      setStartDate(new Date(voucher.startDate));
      setEndDate(new Date(voucher.endDate));
    }
  }, [voucher, open, reset]);

  // Update form values when dates change
  useEffect(() => {
    if (startDate) {
      setValue("startDate", startDate);
    }
  }, [startDate, setValue]);

  useEffect(() => {
    if (endDate) {
      setValue("endDate", endDate);
    }
  }, [endDate, setValue]);

  const onSubmit = async (data: VoucherFormData) => {
    try {
      const payload: ICreateVoucherPayload = {
        code: data.code,
        name: data.name,
        description: data.description,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderValue: data.minOrderValue,
        maxDiscountValue: data.maxDiscountValue,
        usageLimit: data.usageLimit,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        isActive: data.isActive,
      };

      if (isEditing && voucher) {
        await updateVoucherMutation.mutateAsync({
          id: voucher._id,
          data: payload,
        });
      } else {
        await createVoucherMutation.mutateAsync(payload);
      }

      setOpen(false);
      reset();
      setStartDate(undefined);
      setEndDate(undefined);
      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-900 hover:bg-blue-800 text-white">
            <PlusIcon className="h-4 w-4 mr-2" />
            Tạo voucher mới
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {isEditing ? "Chỉnh sửa voucher" : "Tạo voucher mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Thông tin cơ bản
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Mã voucher *</Label>
                <Input
                  id="code"
                  {...register("code")}
                  placeholder="VD: SUMMER2024"
                  className={cn(errors.code && "border-red-500")}
                />
                {errors.code && (
                  <p className="text-sm text-red-600">{errors.code.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Tên voucher *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="VD: Giảm giá mùa hè 2024"
                  className={cn(errors.name && "border-red-500")}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả *</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Mô tả chi tiết về voucher..."
                rows={3}
                className={cn(errors.description && "border-red-500")}
              />
              {errors.description && (
                <p className="text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Discount Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Cài đặt giảm giá
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Loại giảm giá *</Label>
                <Select
                  value={discountType}
                  onValueChange={(value: "PERCENTAGE" | "FIXED") =>
                    setValue("discountType", value)
                  }
                >
                  <SelectTrigger
                    className={cn(errors.discountType && "border-red-500")}
                  >
                    <SelectValue placeholder="Chọn loại giảm giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Phần trăm (%)</SelectItem>
                    <SelectItem value="FIXED">Số tiền cố định (VNĐ)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.discountType && (
                  <p className="text-sm text-red-600">
                    {errors.discountType.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountValue">
                  Giá trị giảm giá *{" "}
                  {discountType === "PERCENTAGE" ? "(%)" : "(VNĐ)"}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  {...register("discountValue", { valueAsNumber: true })}
                  placeholder={
                    discountType === "PERCENTAGE" ? "VD: 20" : "VD: 50000"
                  }
                  className={cn(errors.discountValue && "border-red-500")}
                />
                {errors.discountValue && (
                  <p className="text-sm text-red-600">
                    {errors.discountValue.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minOrderValue">
                  Giá trị đơn hàng tối thiểu (VNĐ)
                </Label>
                <Input
                  id="minOrderValue"
                  type="number"
                  {...register("minOrderValue", { valueAsNumber: true })}
                  placeholder="VD: 500000"
                  className={cn(errors.minOrderValue && "border-red-500")}
                />
                {errors.minOrderValue && (
                  <p className="text-sm text-red-600">
                    {errors.minOrderValue.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxDiscountValue">
                  Giá trị giảm giá tối đa (VNĐ)
                </Label>
                <Input
                  id="maxDiscountValue"
                  type="number"
                  {...register("maxDiscountValue", { valueAsNumber: true })}
                  placeholder="VD: 100000"
                  className={cn(errors.maxDiscountValue && "border-red-500")}
                />
                {errors.maxDiscountValue && (
                  <p className="text-sm text-red-600">
                    {errors.maxDiscountValue.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Usage & Time Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Cài đặt sử dụng & thời gian
            </h3>

            <div className="space-y-2">
              <Label htmlFor="usageLimit">Giới hạn số lần sử dụng *</Label>
              <Input
                id="usageLimit"
                type="number"
                {...register("usageLimit", { valueAsNumber: true })}
                placeholder="VD: 1000"
                className={cn(errors.usageLimit && "border-red-500")}
              />
              {errors.usageLimit && (
                <p className="text-sm text-red-600">
                  {errors.usageLimit.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày bắt đầu *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                        errors.startDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate
                        ? format(startDate, "dd/MM/yyyy", { locale: vi })
                        : "Chọn ngày bắt đầu"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && (
                  <p className="text-sm text-red-600">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Ngày kết thúc *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                        errors.endDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate
                        ? format(endDate, "dd/MM/yyyy", { locale: vi })
                        : "Chọn ngày kết thúc"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < (startDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && (
                  <p className="text-sm text-red-600">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                {...register("isActive")}
                onCheckedChange={(checked) => setValue("isActive", checked)}
              />
              <Label htmlFor="isActive">Kích hoạt voucher ngay</Label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 sm:flex-none"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 sm:flex-none bg-blue-900 hover:bg-blue-800 text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? "Đang cập nhật..." : "Đang tạo..."}
                </>
              ) : (
                <>{isEditing ? "Cập nhật voucher" : "Tạo voucher"}</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
