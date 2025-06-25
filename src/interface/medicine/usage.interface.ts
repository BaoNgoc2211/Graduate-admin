import { IMedicine } from "./medicine.interface";

export interface IMedicineUsageGroup {
  _id?: string;
  name: string;
  icon: string;
  medicine: IMedicine[];
}
