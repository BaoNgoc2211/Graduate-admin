import { IMedicine } from "./medicine.interface";

export interface IMedicineCategory {
  _id?: string;
  name: string;
  icon: string;
  medicine: IMedicine[];
}
