"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Edit, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface Props {
  medicine: any;
  medicineId: string;
  expiringSoon: number;
}

const StockHeader: React.FC<Props> = ({ medicine, medicineId, expiringSoon }) => (
  <>
    {/* Breadcrumb */}
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/stock">Tồn kho</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{medicine?.name || medicineId}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    {/* Header */}
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Link href="/stock">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        </Link>

        <div className="flex items-center gap-4">
          <Image
            src={medicine?.thumbnail || "/placeholder.svg"}
            alt={medicine?.name || "Ảnh thuốc"}
            width={64}
            height={64}
            className="h-16 w-16 rounded-lg border object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{medicine?.name}</h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <span>{medicine?.code}</span>
              <span className="text-gray-300">•</span>
              <span>{medicine?.dosageForm}</span>
              {expiringSoon > 0 && (
                <>
                  <span className="text-gray-300">•</span>
                  <Badge variant="destructive" className="text-xs">
                    {expiringSoon} lô sắp hết hạn
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
        </Button>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Package className="mr-2 h-4 w-4" /> Nhập thêm
        </Button>
      </div>
    </header>
  </>
);

export default StockHeader;
