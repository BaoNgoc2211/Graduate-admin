import { z } from "zod"

export const diseaseFormSchema = z.object({
  code: z.string().min(1, "Mã bệnh là bắt buộc").max(20, "Mã bệnh không được quá 20 ký tự"),
  name: z.string().min(1, "Tên bệnh là bắt buộc").max(200, "Tên bệnh không được quá 200 ký tự"),
  nameDiff: z.string().optional(),
  image: z.string().optional(),
  common: z.string().min(1, "Tên thông thường là bắt buộc"),
  riskGroup: z.array(z.string()).min(1, "Phải chọn ít nhất một nhóm nguy cơ"),
  causes: z.string().min(1, "Nguyên nhân là bắt buộc"),
  diagnosis: z.string().min(1, "Chẩn đoán là bắt buộc"),
  prevention: z.string().min(1, "Phòng ngừa là bắt buộc"),
  severityLevel: z.enum(["low", "medium", "high"], {
    required_error: "Mức độ nghiêm trọng là bắt buộc",
  }),
  treatmentPlan: z.string().min(1, "Kế hoạch điều trị là bắt buộc"),
  notes: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  symptomIds: z.array(z.string()).default([]),
  diseaseCategory_id: z.array(z.string()).min(1, "Phải chọn ít nhất một danh mục bệnh"),
  diseaseUsageGroup_id: z.array(z.string()).default([]),
})

export type DiseaseFormData = z.infer<typeof diseaseFormSchema>
