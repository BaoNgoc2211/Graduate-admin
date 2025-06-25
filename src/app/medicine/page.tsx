// import DataTableDemo from "./components/layout/data-table";

// const MedicineDetail = () => {
//   return (
//     <div>
//       <DataTableDemo />
//     </div>
//   );
// };
// export default MedicineDetail;
"use client";
import React from "react";
import Link from "next/link";
import MedicineTable from "@/components/medicine/medicine/table/medicine-table";
import { useDeleteMedicine, useGetAllMedicine } from "@/hooks/medicine/medicine.hooks";
// import { useGetAllMedicine, useDeleteMedicine } from '@/hooks/medicine/medicine';

// Trang danh sách thuốc
const MedicineListPage: React.FC = () => {
  // Lấy danh sách thuốc từ API
  const { data: medicines, isLoading, isError } = useGetAllMedicine();
  const deleteMedicine = useDeleteMedicine();

  // Xử lý xóa thuốc
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      deleteMedicine.mutate(id);
    }
  };

  // Đảm bảo luôn truyền vào Table một mảng
  const medData = medicines as any;
  let medicineArray: any[] = [];
  if (Array.isArray(medData)) {
    medicineArray = medData;
  } else if (medData && Array.isArray(medData.data)) {
    medicineArray = medData.data;
  } else if (medData && Array.isArray(medData.medicines)) {
    medicineArray = medData.medicines;
  }

  return (
    <div className="min-h-screen bg-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#00416A]">Medicine List</h1>
          <Link href="/medicine/create">
            <button className="bg-[#00416A] text-white px-6 py-2 rounded-md font-medium hover:bg-[#005a8b]">
              Create Medicine
            </button>
          </Link>
        </div>
        <MedicineTable
          data={medicineArray}
          isLoading={isLoading}
          isError={isError}
          onDelete={handleDelete}
          isDeleting={deleteMedicine.isPending}
        />
      </div>
    </div>
  );
};

export default MedicineListPage;

// --- Chú thích ---
// Trang này hiển thị danh sách thuốc với các action: View, Edit, Delete
// Sử dụng React Query để lấy dữ liệu, shadcn/ui cho button/table
// Màu chủ đạo #00416A, giao diện hiện đại, tiếng Anh
// Có loading, error, empty state rõ ràng
