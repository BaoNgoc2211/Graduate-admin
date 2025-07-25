"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MedicineForm from "@/components/medicine/medicine/medicine-form/MedicineForm";
// import MedicineForm from "@/components/medicine/medicine/medicine-form";
// import MedicineForm from "@/components/medicine/MedicineForm"

export default function CreateMedicinePage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/medicine");
  };

  const handleCancel = () => {
    router.push("/medicine");
  };

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
                  Thêm thuốc mới
                </h1>
                <p className="text-gray-600 mt-1">
                  Thêm thông tin thuốc mới vào hệ thống
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
            <MedicineForm onSuccess={handleSuccess} onCancel={handleCancel} />
            {/* <MedicineForm onSuccess={handleSuccess} onCancel={handleCancel} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
