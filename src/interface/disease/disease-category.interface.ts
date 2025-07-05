import { IDisease } from "./disease.interface";

export interface IDiseaseCategory {
  _id?: string;
  name: string;
  icon: string; // là URL Cloudinary
  disease: IDisease[];
}
