"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { IDisease } from "@/interface/disease/disease.interface"
import { Calendar, Users, AlertTriangle, Stethoscope, Shield, FileText, Activity } from "lucide-react"

interface DiseaseDetailModalProps {
  disease: IDisease | null
  isOpen: boolean
  onClose: () => void
}

export function DiseaseDetailModal({ disease, isOpen, onClose }: DiseaseDetailModalProps) {
  if (!disease) return null

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }
    const labels = {
      low: "Thấp",
      medium: "Trung bình",
      high: "Cao",
    }
    return (
      <Badge className={variants[severity as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {labels[severity as keyof typeof labels] || severity}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "secondary"}>
        {status === "active" ? "Hoạt động" : "Không hoạt động"}
      </Badge>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-900 text-xl">Chi tiết bệnh: {disease.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Mã bệnh</label>
                  <p className="text-sm font-mono bg-gray-50 p-2 rounded">{disease.code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tên bệnh</label>
                  <p className="text-sm">{disease.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tên thông thường</label>
                  <p className="text-sm">{disease.common}</p>
                </div>
                {disease.nameDiff && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tên khác</label>
                    <p className="text-sm">{disease.nameDiff}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-600">Mức độ nghiêm trọng</label>
                  <div className="mt-1">{getSeverityBadge(disease.severityLevel)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                  <div className="mt-1">{getStatusBadge(disease.status || "active")}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="h-5 w-5 mr-2" />
                Nhóm nguy cơ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {disease.riskGroup.map((group, index) => (
                  <Badge key={index} variant="outline">
                    {group}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Causes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Nguyên nhân
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{disease.causes}</p>
              </CardContent>
            </Card>

            {/* Diagnosis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Chẩn đoán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{disease.diagnosis}</p>
              </CardContent>
            </Card>

            {/* Prevention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="h-5 w-5 mr-2" />
                  Phòng ngừa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{disease.prevention}</p>
              </CardContent>
            </Card>

            {/* Treatment Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="h-5 w-5 mr-2" />
                  Kế hoạch điều trị
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{disease.treatmentPlan}</p>
              </CardContent>
            </Card>
          </div>

          {/* Notes */}
          {disease.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2" />
                  Ghi chú
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{disease.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2" />
                Thông tin hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-600">ID</label>
                  <p className="font-mono text-xs bg-gray-50 p-1 rounded">{disease._id}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">Số triệu chứng</label>
                  <p>{disease.symptomIds?.length || 0}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-600">Số danh mục</label>
                  <p>{disease.diseaseCategory_id?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
