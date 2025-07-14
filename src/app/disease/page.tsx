"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import type { IDisease } from "@/interface/disease/disease.interface";
import { useDiseases } from "@/hooks/disease/disease.hook";
import { DiseaseTable } from "@/components/disease/disease/disease-table";
import { DiseaseForm } from "@/components/disease/disease/disease-form";
import { DiseaseDetailModal } from "@/components/disease/disease/disease-detail-modal";

type ViewMode = "table" | "form" | "detail";

export default function DiseasesPage() {
  const { data, isLoading, error } = useDiseases();
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedDisease, setSelectedDisease] = useState<IDisease | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleAdd = () => {
    setSelectedDisease(null);
    setViewMode("form");
  };

  const handleEdit = (disease: IDisease) => {
    setSelectedDisease(disease);
    setViewMode("form");
  };

  const handleView = (disease: IDisease) => {
    setSelectedDisease(disease);
    setShowDetailModal(true);
  };

  const handleBackToTable = () => {
    setSelectedDisease(null);
    setViewMode("table");
  };

  const handleCloseDetail = () => {
    setSelectedDisease(null);
    setShowDetailModal(false);
  };

  if (error) {
    return (
      <div className="container mx-auto py-4 px-4 sm:py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4 max-w-md">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Không thể tải dữ liệu
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  Đã xảy ra lỗi khi tải danh sách bệnh. Vui lòng thử lại sau.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4 sm:py-8">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            {viewMode === "form" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToTable}
                className="text-blue-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
                {viewMode === "form"
                  ? selectedDisease
                    ? "Chỉnh sửa bệnh"
                    : "Thêm bệnh mới"
                  : "Quản lý Bệnh"}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {viewMode === "form"
                  ? "Điền thông tin chi tiết về bệnh"
                  : "Quản lý thông tin các bệnh trong hệ thống"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === "table" && (
          <DiseaseTable
            diseases={data?.data || []}
            isLoading={isLoading}
            onEdit={handleEdit}
            onView={handleView}
            onAdd={handleAdd}
          />
        )}

        {viewMode === "form" && (
          <DiseaseForm
            disease={selectedDisease || undefined}
            onCancel={handleBackToTable}
          />
        )}

        {/* Detail Modal */}
        <DiseaseDetailModal
          disease={selectedDisease}
          isOpen={showDetailModal}
          onClose={handleCloseDetail}
        />
      </div>
    </div>
  );
}
