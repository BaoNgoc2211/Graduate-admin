import { z } from "zod";

export const diseaseFormSchema = z.object({
  code: z.string().min(1, "Mã bệnh không được để trống"),
  name: z.string().min(1, "Tên bệnh không được để trống"),
  nameDiff: z.string().optional(),
  image: z.string().optional(),
  common: z.string().optional(),
  riskGroup: z.array(z.string()).min(1, "Phải chọn ít nhất một nhóm nguy cơ"),
  causes: z.string().min(1, "Nguyên nhân không được để trống"),
  diagnosis: z.string().min(1, "Chẩn đoán không được để trống"),
  prevention: z.string().min(1, "Phòng ngừa không được để trống"),
  severityLevel: z.enum(["Nhẹ", "Trung bình", "Nặng", "Rất nặng", "Tử vong"]),
  treatmentPlan: z.string().min(1, "Kế hoạch điều trị không được để trống"),
  notes: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  symptomIds: z.array(z.string()).optional(),
  diseaseCategory_id: z.array(z.string()).min(1, "Phải chọn ít nhất một danh mục bệnh"),
  diseaseUsageGroup_id: z.array(z.string()).min(1, "Phải chọn ít nhất một nhóm bệnh"),
});

export type DiseaseFormData = z.infer<typeof diseaseFormSchema>;