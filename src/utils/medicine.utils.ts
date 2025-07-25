import { IMedicine } from "@/interface/medicine/medicine.interface";

export const processMedicineData = (medicine: any): IMedicine => {
  return {
    ...medicine,
    // Fix age_group - convert array to string if needed
    age_group: Array.isArray(medicine.age_group) 
      ? medicine.age_group[0] || "Tất cả" 
      : medicine.age_group || "Tất cả",
    
    // Ensure arrays are properly formatted
    medCategory_id: Array.isArray(medicine.medCategory_id) 
      ? medicine.medCategory_id.map((id: any) => typeof id === 'object' ? id._id : id)
      : [],
    
    medUsage_id: Array.isArray(medicine.medUsage_id) 
      ? medicine.medUsage_id.map((id: any) => typeof id === 'object' ? id._id : id)
      : [],
    
    image: Array.isArray(medicine.image) 
      ? medicine.image 
      : [],
    
    // Ensure manufacturer_id has proper structure
    manufacturer_id: typeof medicine.manufacturer_id === 'object' && medicine.manufacturer_id
      ? {
          _id: medicine.manufacturer_id._id || "",
          nameCo: medicine.manufacturer_id.nameCo || "",
        }
      : {
          _id: typeof medicine.manufacturer_id === 'string' ? medicine.manufacturer_id : "",
          nameCo: "",
        },
    
    // Ensure strings are not null/undefined
    code: medicine.code || "",
    name: medicine.name || "",
    thumbnail: medicine.thumbnail || "",
    packaging: medicine.packaging || "",
    dosageForm: medicine.dosageForm || "",
    use: medicine.use || "",
    dosage: medicine.dosage || "",
    indication: medicine.indication || "",
    adverse: medicine.adverse || "",
    contraindication: medicine.contraindication || "",
    precaution: medicine.precaution || "",
    ability: medicine.ability || "",
    pregnancy: medicine.pregnancy || "",
    drugInteractions: medicine.drugInteractions || "",
    storage: medicine.storage || "",
    note: medicine.note || "",
  };
};