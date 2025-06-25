// "use client";
// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { IMedicine } from "@/interface/medicine/medicine.interface";
// import { Pencil, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface MedicineTableProps {
//   data: IMedicine[];
//   isLoading: boolean;
//   isError: boolean;
//   onDelete: (id: string) => void;
//   isDeleting?: boolean;
// }

// // Hàm giả lập lấy tên category từ id (bạn có thể thay bằng map thực tế)
// const getCategoryName = (id: string | string[]) => {
//   if (Array.isArray(id)) return id.map((i) => `Category ${i}`).join(", ");
//   return `Category ${id}`;
// };

// const MedicineTable: React.FC<MedicineTableProps> = ({
//   data,
//   isLoading,
//   isError,
//   onDelete,
//   isDeleting,
// }) => {
//   const router = useRouter();

//   if (isLoading) {
//     return (
//       <div className="text-center py-10 text-[#00416A] font-semibold text-sm">
//         Loading medicines...
//       </div>
//     );
//   }
//   if (isError) {
//     return (
//       <div className="text-center py-10 text-red-500 font-semibold text-sm">
//         Failed to load medicines.
//       </div>
//     );
//   }
//   if (!data || data.length === 0) {
//     return (
//       <div className="text-center py-10 text-gray-500 text-sm">
//         No medicine found.
//       </div>
//     );
//   }
//   return (
//     <div className="overflow-x-auto rounded-md shadow border border-gray-200">
//       <table className="min-w-full bg-white text-sm font-normal">
//         <thead className="bg-[#00416A] text-white">
//           <tr>
//             <th className="px-3 py-2 text-center font-semibold">Code</th>
//             <th className="px-3 py-2 text-left font-semibold">Name</th>
//             <th className="px-3 py-2 text-left font-semibold">Dosage Form</th>
//             <th className="px-3 py-2 text-left font-semibold">Price</th>
//             <th className="px-3 py-2 text-left font-semibold w-32">Category</th>
//             <th className="px-3 py-2 text-center font-semibold">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((med: IMedicine, idx: number) => (
//             <tr
//               key={med.code}
//               className={`transition-colors cursor-pointer ${
//                 idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//               } hover:bg-blue-50/40`}
//               style={{ fontSize: "0.95em" }}
//               onClick={() => router.push(`/medicine/${med.code}`)}
//             >
//               <td className="px-3 py-2 text-center font-mono align-middle">
//                 {med.code}
//               </td>
//               <td className="px-3 py-2 align-middle">{med.name}</td>
//               <td className="px-3 py-2 align-middle">{med.dosageForm}</td>
//               <td className="px-3 py-2 align-middle">${med.sellingPrice}</td>
//               <td className="px-3 py-2 align-middle w-32 truncate">
//                 {getCategoryName(med.medCategory_id)}
//               </td>
//               <td
//                 className="px-3 py-2 text-center align-middle"
//                 onClick={(e) => e.stopPropagation()} // Ngăn click row khi bấm action
//               >
//                 <div className="flex gap-1 justify-center">
//                   <Link href={`/medicine/${med.code}?edit=1`}>
//                     <Button
//                       variant="outline"
//                       className="border-[#00416A] text-[#00416A] rounded-md p-1.5 hover:bg-[#00416A]/90 hover:text-white transition-colors h-8 w-8 flex items-center justify-center"
//                     >
//                       <span title="Edit">
//                         <Pencil size={15} />
//                       </span>
//                     </Button>
//                   </Link>
//                   <Button
//                     variant="outline"
//                     className="border-red-300 text-red-500 rounded-md p-1.5 hover:bg-red-100 hover:text-red-700 transition-colors h-8 w-8 flex items-center justify-center"
//                     onClick={() => onDelete(med.code)}
//                     disabled={isDeleting}
//                   >
//                     <span title="Delete">
//                       <Trash2 size={15} />
//                     </span>
//                   </Button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MedicineTable;

// // --- Chú thích ---
// // - Giao diện nhẹ nhàng, chữ nhỏ, bo nhẹ, button nhỏ gọn, hover dịu
// // - Click vào dòng sẽ chuyển sang trang view chi tiết
// // - Cột Code căn giữa, bỏ Quantity
// // - Category hiển thị name (placeholder)
// // - Button Edit/Delete đẹp, có icon, bo nhẹ, hover nổi bật
// // - Bảng có shadow, hover row nhẹ nhàng
// // - Cột Code căn giữa, bỏ Quantity
// // - Category hiển thị name (placeholder)
// // - Button Edit/Delete đẹp, có icon, bo tròn, hover nổi bật
// // - Bảng có shadow-md, hover row
