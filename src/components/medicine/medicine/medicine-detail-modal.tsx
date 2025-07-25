"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package, Calendar, FileText, Shield, Pill } from "lucide-react"
// import type { IMedicine } from "@/interfaces/medicine.interface"
import Image from "next/image"
import { IMedicine } from "@/interface/medicine/medicine.interface"

interface MedicineDetailModalProps {
  medicine: IMedicine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MedicineDetailModal({ medicine, open, onOpenChange }: MedicineDetailModalProps) {
  const manufacturerName = typeof medicine.manufacturer_id === "object" ? medicine.manufacturer_id.nameCo : "N/A"

  const InfoSection = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon: any }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="pl-7">{children}</div>
    </div>
  )

  const InfoItem = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null
    return (
      <div className="grid grid-cols-3 gap-4 py-2">
        <dt className="text-sm font-medium text-gray-500">{label}:</dt>
        <dd className="text-sm text-gray-900 col-span-2">{value}</dd>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage
                src={medicine.thumbnail || "/placeholder.svg"}
                alt={medicine.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg bg-gray-100 text-gray-600">
                {medicine.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{medicine.name}</h2>
              <p className="text-sm text-gray-500">Mã: {medicine.code}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Basic Information */}
            <InfoSection title="Thông tin cơ bản" icon={Package}>
              <dl className="divide-y divide-gray-100">
                <InfoItem label="Dạng bào chế" value={medicine.dosageForm} />
                <InfoItem label="Đóng gói" value={medicine.packaging} />
                <InfoItem label="Nhóm tuổi" value={medicine.age_group} />
                <InfoItem label="Liều dùng" value={medicine.dosage} />
                <InfoItem label="Nhà sản xuất" value={manufacturerName} />
              </dl>
            </InfoSection>

            <Separator />

            {/* Usage Information */}
            <InfoSection title="Cách sử dụng" icon={Pill}>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Cách dùng:</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.use}</p>
                </div>
                {medicine.indication && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Công dụng:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.indication}</p>
                  </div>
                )}
              </div>
            </InfoSection>

            <Separator />

            {/* Safety Information */}
            <InfoSection title="Thông tin an toàn" icon={Shield}>
              <div className="space-y-4">
                {medicine.adverse && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tác dụng phụ:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.adverse}</p>
                  </div>
                )}
                {medicine.contraindication && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Chống chỉ định:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.contraindication}</p>
                  </div>
                )}
                {medicine.precaution && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Thận trọng:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.precaution}</p>
                  </div>
                )}
                {medicine.pregnancy && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Thai kỳ và cho con bú:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.pregnancy}</p>
                  </div>
                )}
                {medicine.drugInteractions && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tương tác thuốc:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.drugInteractions}</p>
                  </div>
                )}
                {medicine.ability && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Lái xe và vận hành máy móc:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.ability}</p>
                  </div>
                )}
                {medicine.storage && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Bảo quản:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.storage}</p>
                  </div>
                )}
              </div>
            </InfoSection>

            <Separator />

            {/* Additional Images */}
            {medicine.image && medicine.image.length > 0 && (
              <>
                <InfoSection title="Hình ảnh bổ sung" icon={FileText}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {medicine.image.map((img, index) => (
                      <Image
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`${medicine.name} - Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        width={200}
                        height={150}
                      />
                    ))}
                  </div>
                </InfoSection>
                <Separator />
              </>
            )}

            {/* Notes */}
            <InfoSection title="Ghi chú" icon={FileText}>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{medicine.note}</p>
            </InfoSection>

            {/* Timestamps */}
            {(medicine.createdAt || medicine.updatedAt) && (
              <>
                <Separator />
                <InfoSection title="Thông tin hệ thống" icon={Calendar}>
                  <dl className="divide-y divide-gray-100">
                    {medicine.createdAt && (
                      <InfoItem label="Ngày tạo" value={new Date(medicine.createdAt).toLocaleString("vi-VN")} />
                    )}
                    {medicine.updatedAt && (
                      <InfoItem
                        label="Cập nhật lần cuối"
                        value={new Date(medicine.updatedAt).toLocaleString("vi-VN")}
                      />
                    )}
                  </dl>
                </InfoSection>
              </>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)} className="bg-blue-900 hover:bg-blue-800">
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
