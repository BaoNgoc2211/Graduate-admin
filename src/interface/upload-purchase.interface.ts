export interface IUploadImageResponse {
  url: string;
}

export interface IUploadPrescriptionPayload {
  file: File;
}

export interface IPrescriptionMedicine {
  medicineName: string;
  quantity: number;
  unit: string;
}