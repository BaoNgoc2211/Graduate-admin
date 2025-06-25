// "use client";
// import { useDeleteMedicineCategory } from "@/hooks/medicine/category.hooks";
// import { useState } from "react";
// import { toast } from "sonner";

// type Props = {
//   categoryId: string;
// };

// const DeleteMedicineConfirmButton: React.FC<Props> = ({ categoryId }) => {
//   const [isConfirming, setIsConfirming] = useState(false);
//   const { mutate } = useDeleteMedicineCategory();

//   const handleDelete = () => {
//     mutate(categoryId, {
//       onSuccess: () => {
//         toast.success("Xoá thành công danh mục!");
//         setIsConfirming(false);
//       },
//       onError: () => {
//         toast.error("Xoá thất bại. Vui lòng thử lại.");
//         setIsConfirming(false);
//       },
//     });
//   };
//   const isLoading = false;
//   return (
//     <>
//       {!isConfirming ? (
//         <button
//           className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
//           onClick={() => setIsConfirming(true)}
//         >
//           Xoá
//         </button>
//       ) : (
//         <div className="flex gap-2">
//           <span className="text-sm text-red-600">Xác nhận?</span>
//           <button
//             className="bg-red-600 text-white px-2 py-1 rounded"
//             onClick={handleDelete}
//             disabled={isLoading}
//           >
//             Có
//           </button>
//           <button
//             className="bg-gray-300 px-2 py-1 rounded"
//             onClick={() => setIsConfirming(false)}
//           >
//             Không
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default DeleteMedicineConfirmButton;
"use client";

import { useDeleteMedicineCategory } from "@/hooks/medicine/category.hooks";
import { toast } from "sonner";

type Props = {
  categoryId: string;
};

const DeleteMedicineConfirmButton: React.FC<Props> = ({ categoryId }) => {
  const { mutate } = useDeleteMedicineCategory();

  const handleDelete = (toastId: string) => {
    mutate(categoryId, {
      onSuccess: () => {
        toast.success("Xoá thành công danh mục!");
        toast.dismiss(toastId);
      },
      onError: () => {
        toast.error("Xoá thất bại. Vui lòng thử lại.");
        toast.dismiss(toastId);
      },
    });
  };

  const handleOpenConfirm = () => {
    const toastId = toast.custom((t) => (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl w-[90%] max-w-md p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold">
                Bạn có chắc muốn xoá danh mục này?
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Hành động này không thể hoàn tác. Hãy xác nhận nếu bạn chắc
                chắn.
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Huỷ
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDelete(t.id)}
                >
                  Xác nhận xoá
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <button
      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
      onClick={handleOpenConfirm}
    >
      Xoá
    </button>
  );
};

export default DeleteMedicineConfirmButton;
