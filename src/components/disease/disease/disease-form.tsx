"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  diseaseFormSchema,
  type DiseaseFormData,
} from "@/schema/disease/disease.schema";
import { useDiseaseCategories } from "@/hooks/disease/category.hooks";
import type { IDisease } from "@/interface/disease/disease.interface";
import { Save, X } from "lucide-react";
import {
  useCreateDisease,
  useUpdateDisease,
} from "@/hooks/disease/disease.hook";
import { useDiseaseUsageGroups } from "@/hooks/disease/usage.hook";
import { toast } from "sonner";

interface DiseaseFormProps {
  disease?: IDisease;
  onCancel: () => void;
}

const RISK_GROUPS = [
  "Nhũ nhi",
  "Trẻ nhỏ",
  "Trẻ mẫu giáo",
  "Trẻ em",
  "Thiếu niên",
  "Người trưởng thành",
  "Người cao tuổi"
];

const SEVERITY_LEVELS = [
  { value: "Nhẹ", label: "Nhẹ" },
  { value: "Trung bình", label: "Trung bình" },
  { value: "Nặng", label: "Nặng" },
  { value: "Rất nặng", label: "Rất nặng" },
  { value: "Tử vong", label: "Tử vong" },
] as const;

const STATUS_OPTIONS = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Không hoạt động" },
] as const;

export function DiseaseForm({ disease, onCancel }: DiseaseFormProps) {
  const isEditing = !!disease;
  const createDisease = useCreateDisease();
  const updateDisease = useUpdateDisease();
  const { data: categoriesData } = useDiseaseCategories();
  const { data: usageGroupData } = useDiseaseUsageGroups();

  const form = useForm<DiseaseFormData>({
    resolver: zodResolver(diseaseFormSchema),
    defaultValues: {
      code: disease?.code ,
      name: disease?.name,
      nameDiff: disease?.nameDiff || "",
      image: disease?.image || "",
      common: disease?.common || "",
      riskGroup: disease?.riskGroup,
      causes: disease?.causes ,
      diagnosis: disease?.diagnosis ,
      prevention: disease?.prevention ,
      severityLevel: disease?.severityLevel,
      treatmentPlan: disease?.treatmentPlan ,
      notes: disease?.notes || "",
      status: disease?.status,
      symptomIds: disease?.symptomIds || [],
      diseaseCategory_id: disease?.diseaseCategory_id,
      diseaseUsageGroup_id: disease?.diseaseUsageGroup_id,
    },
  });

  const onSubmit = async (data: DiseaseFormData) => {
    try {
      console.log("Form data before submit:", data);

      // ✅ Map form data to API format
      const apiPayload = {
        code: data.code,
        name: data.name,
        nameDiff: data.nameDiff || "",
        image: data.image || "",
        common: data.common || "",
        riskGroup: data.riskGroup,
        causes: data.causes,
        diagnosis: data.diagnosis,
        prevention: data.prevention,
        severityLevel: data.severityLevel,
        treatmentPlan: data.treatmentPlan,
        notes: data.notes || "",
        status: data.status,
        symptomIds: data.symptomIds || [],
        // ✅ Map field names to match backend expectations
        diseaseCategoryIds: data.diseaseCategory_id, // Backend expects diseaseCategoryIds
        diseaseUsageGroupIds: data.diseaseUsageGroup_id, // Backend expects diseaseUsageGroupIds
      };

      console.log("API payload:", apiPayload);

      if (isEditing && disease?._id) {
        await updateDisease.mutateAsync({
          id: disease._id,
          data: apiPayload,
        });
        toast.success("Cập nhật bệnh thành công!");
      } else {
        await createDisease.mutateAsync(apiPayload);
        toast.success("Tạo bệnh mới thành công!");
      }
      onCancel();
    } catch {
      console.error("Form submission error:");
      toast.error(
          "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  const isLoading = createDisease.isPending || updateDisease.isPending;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-blue-900">
          {isEditing ? "Chỉnh sửa bệnh" : "Thêm bệnh mới"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã bệnh *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã bệnh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên bệnh *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên bệnh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameDiff"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khác</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khác (nếu có)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="common"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tình trạng phổ biến</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mô tả tình trạng phổ biến"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="severityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mức độ nghiêm trọng *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mức độ nghiêm trọng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SEVERITY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Risk Groups */}
            <FormField
              control={form.control}
              name="riskGroup"
              render={() => (
                <FormItem>
                  <FormLabel>Nhóm nguy cơ *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {RISK_GROUPS.map((group) => (
                      <FormField
                        key={group}
                        control={form.control}
                        name="riskGroup"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={group}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(group)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...(field.value || []),
                                        group,
                                      ]);
                                    } else {
                                      field.onChange(
                                        field.value?.filter(
                                          (value) => value !== group
                                        ) || []
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {group}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disease Categories */}
            <FormField
              control={form.control}
              name="diseaseCategory_id"
              render={() => (
                <FormItem>
                  <FormLabel>Danh mục bệnh *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categoriesData?.data?.map((category) => (
                      <FormField
                        key={category._id}
                        control={form.control}
                        name="diseaseCategory_id"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category._id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  // checked={field.value?.includes(category._id)}
                                  checked={field.value?.some(
                                    (id) => id === category._id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...(field.value || []),
                                        category._id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        field.value?.filter(
                                          (value) => value !== category._id
                                        ) || []
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {category.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disease Usage Groups */}
            <FormField
              control={form.control}
              name="diseaseUsageGroup_id"
              render={() => (
                <FormItem>
                  <FormLabel>Danh mục nhóm bệnh *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {usageGroupData?.data?.map((usage) => (
                      <FormField
                        key={usage._id}
                        control={form.control}
                        name="diseaseUsageGroup_id"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={usage._id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  // checked={field.value?.includes(usage._id)}
                                  checked={field.value?.some(
                                    (id) => id === usage._id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...(field.value || []),
                                        usage._id,
                                      ]);
                                    } else {
                                      field.onChange(
                                        field.value?.filter(
                                          (value) => value !== usage._id
                                        ) || []
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {usage.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Text Areas */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="causes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nguyên nhân *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả nguyên nhân gây bệnh"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chẩn đoán *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả phương pháp chẩn đoán"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prevention"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phòng ngừa *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả các biện pháp phòng ngừa"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="treatmentPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kế hoạch điều trị *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả kế hoạch điều trị"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ghi chú thêm (nếu có)"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-900 hover:bg-blue-800"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Đang lưu..." : isEditing ? "Cập nhật" : "Tạo mới"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
