"use client";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { IDistributor } from "@/interface/inventory/distributor.interface";

interface DistributorFormUIProps {
  title: string;
  form: UseFormReturn<Omit<IDistributor, "_id">>;
  onSubmit: (data: Omit<IDistributor, "_id">) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DistributorFormUI({
  title,
  form,
  onSubmit,
  onCancel,
  isLoading,
}: DistributorFormUIProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-blue-900 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tên công ty */}
            <div className="space-y-2">
              <Label htmlFor="nameCo">Tên công ty <span className="text-red-500">*</span></Label>
              <Input
                id="nameCo"
                {...register("nameCo", {
                  required: "Tên công ty là bắt buộc",
                  minLength: { value: 2, message: "Tên công ty phải có ít nhất 2 ký tự" },
                })}
                placeholder="Nhập tên công ty"
                disabled={isLoading}
              />
              {errors.nameCo && <p className="text-sm text-red-600">{errors.nameCo.message}</p>}
            </div>

            {/* Người đại diện */}
            <div className="space-y-2">
              <Label htmlFor="nameRep">Người đại diện <span className="text-red-500">*</span></Label>
              <Input
                id="nameRep"
                {...register("nameRep", {
                  required: "Người đại diện là bắt buộc",
                  minLength: { value: 2, message: "Tên người đại diện phải có ít nhất 2 ký tự" },
                })}
                placeholder="Nhập tên người đại diện"
                disabled={isLoading}
              />
              {errors.nameRep && <p className="text-sm text-red-600">{errors.nameRep.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
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
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                {...register("phone", {
                  required: "Số điện thoại là bắt buộc",
                  pattern: { value: /^[0-9+\-\s()]+$/, message: "Số điện thoại không hợp lệ" },
                  minLength: { value: 10, message: "Số điện thoại phải có ít nhất 10 số" },
                })}
                placeholder="Nhập số điện thoại"
                disabled={isLoading}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ <span className="text-red-500">*</span></Label>
              <Textarea
                id="address"
                {...register("address", {
                  required: "Địa chỉ là bắt buộc",
                  minLength: { value: 10, message: "Địa chỉ phải có ít nhất 10 ký tự" },
                })}
                placeholder="Nhập địa chỉ chi tiết"
                className="min-h-[80px]"
                disabled={isLoading}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
            </div>

            {/* Quốc gia */}
            <div className="space-y-2">
              <Label htmlFor="country">Quốc gia <span className="text-red-500">*</span></Label>
              <Input
                id="country"
                {...register("country", {
                  required: "Quốc gia là bắt buộc",
                  minLength: { value: 2, message: "Tên quốc gia phải có ít nhất 2 ký tự" },
                })}
                placeholder="Nhập tên quốc gia"
                disabled={isLoading}
              />
              {errors.country && <p className="text-sm text-red-600">{errors.country.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="flex items-center gap-2 text-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white"
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
