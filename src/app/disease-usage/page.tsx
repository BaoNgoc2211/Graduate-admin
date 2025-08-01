"use client";

import { DiseaseUsageTable } from "@/components/disease/usage/disease-usage-table";
import { Card, CardContent } from "@/components/ui/card";
import { useDiseaseUsageGroups } from "@/hooks/disease/usage.hook";
import { AlertCircle } from "lucide-react";

export default function DiseaseCategoryPage() {
  const { data, isLoading, error } = useDiseaseUsageGroups();
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Không thể tải dữ liệu
                </h3>
                <p className="text-gray-600 mt-1">
                  Đã xảy ra lỗi khi tải danh sách danh mục bệnh. Vui lòng thử
                  lại sau.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-blue-900">Nhóm Bệnh</h1>
          <p className="text-gray-600">
            Quản lý các nhóm bệnh trong hệ thống
          </p>
        </div>

        {/* Main Content */}
        <DiseaseUsageTable usages={data?.data || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
