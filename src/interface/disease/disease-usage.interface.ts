import { IDisease } from "./disease.interface";

export interface IDiseaseUsage {
  _id?: string;
  name: string;
  icon: string; // là URL Cloudinary
  disease: IDisease[];
}
