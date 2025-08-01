"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMedicines } from "@/hooks/medicine/medicine.hooks";
import MedicineForm from "@/components/medicine/medicine/medicine-form/MedicineForm";
import { useEffect, useState } from "react";
import { IMedicine } from "@/interface/medicine/medicine.interface";

export default function EditMedicinePage() {
  const router = useRouter();
  const params = useParams();
  const { useMedicine } = useMedicines();
  const id = params?.id as string;
  const { data: medicineData, isLoading, error } = useMedicine(id);
  const [processedData, setProcessedData] = useState<IMedicine | null>(null);

  useEffect(() => {
    if (medicineData?.data) {
      const medicine = medicineData.data;
      
      const processed: IMedicine = {
        ...medicine,
        age_group: Array.isArray(medicine.age_group) 
          ? medicine.age_group[0] || "Tất cả" 
          : medicine.age_group || "Tất cả",
        
        // Ensure arrays are properly formatted
        medCategory_id: Array.isArray(medicine.medCategory_id) 
          ? medicine.medCategory_id 
          : [],
        
        medUsage_id: Array.isArray(medicine.medUsage_id) 
          ? medicine.medUsage_id 
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

      console.log("Original medicine data:", medicine);
      console.log("Processed medicine data:", processed);
      
      setProcessedData(processed);
    }
  }, [medicineData]);

  const handleSuccess = () => {
    router.push("/medicine");
  };

  const handleCancel = () => {
    router.push("/medicine");
  };

  if (isLoading) {
    return <EditMedicinePageSkeleton />;
  }

  if (error || !medicineData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-12 w-12 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy thuốc
            </h3>
            <p className="text-gray-500 mb-6">
              Thuốc bạn đang tìm không tồn tại hoặc đã bị xóa.{" "}
              {error && `Chi tiết lỗi: ${error}`}
            </p>
            <Button
              onClick={() => router.push("/medicine")}
              className="bg-blue-900 hover:bg-blue-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Wait for processed data
  if (!processedData) {
    return <EditMedicinePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/medicine")}
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Chỉnh sửa thuốc
                </h1>
                <p className="text-gray-600 mt-1">
                  Cập nhật thông tin thuốc: {processedData.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-white border-b border-gray-200">
            <CardTitle className="text-xl text-gray-900">
              Thông tin thuốc
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <MedicineForm
              defaultValue={processedData}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Loading skeleton component
function EditMedicinePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-8 w-20" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </div>
        </div>

        {/* Form skeleton */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-white border-b border-gray-200">
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {/* Basic info skeleton */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-20 w-20 rounded-lg" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <div className="flex gap-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 w-20 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details skeleton */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions skeleton */}
              <div className="flex justify-end gap-4">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



