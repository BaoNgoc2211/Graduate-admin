export interface IDisease {
  _id: string;
  code: string;
  name: string;
  nameDiff?: string;
  image?: string;
  common?: string;
  riskGroup: string[];
  causes: string;
  diagnosis: string;
  prevention: string;
  severityLevel: "Nhẹ" | "Trung bình" | "Nặng" | "Rất nặng" | "Tử vong";
  treatmentPlan: string;
  notes?: string;
  status: "active" | "inactive";
  symptomIds?: string[];
  diseaseCategoryIds: string[]; // Backend uses this name
  diseaseUsageGroupIds: string[]; // Backend uses this name
  diseaseCategory_id?: string[];
  diseaseUsageGroup_id?: string[];
  createdAt?: string;
  updatedAt?: string;
}