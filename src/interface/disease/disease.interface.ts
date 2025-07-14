export interface IDisease {
  _id: string;
  code: string;
  name: string;
  nameDiff?: string;
  image?: string;
  common: string;
  riskGroup: string[];
  causes: string;
  diagnosis: string;
  prevention: string;
  severityLevel: string;
  treatmentPlan: string;
  notes?: string;
  status?: string;
  symptomIds: string[];
  diseaseCategory_id: string[];
  diseaseUsageGroup_id: string[];
}
