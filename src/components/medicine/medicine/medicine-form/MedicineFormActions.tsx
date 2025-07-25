// /**
//  * Component các nút action của form thuốc
//  * Tách từ MedicineForm.tsx - phần action buttons
//  */

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowLeft, Save, Loader2 } from "lucide-react";

// interface MedicineFormActionsProps {
//   isLoading: boolean;
//   isEditMode: boolean;
//   onCancel?: () => void;
//   onSubmit?: () => void;
// }

// export default function MedicineFormActions({
//   isLoading,
//   isEditMode,
//   onCancel,
// }: // onSubmit,
// MedicineFormActionsProps) {
//   return (
//     <Card className="border-gray-200">
//       <CardContent className="p-6">
//         <div className="flex flex-col sm:flex-row gap-4 justify-end">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onCancel}
//             disabled={isLoading}
//             className="sm:w-auto border-gray-300 hover:bg-gray-50 bg-transparent"
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Hủy
//           </Button>
//           {/* <Button
//             type="submit"
//             disabled={isLoading}
//             className="bg-blue-900 hover:bg-blue-800 sm:w-auto"
//             // onClick={onSubmit}
//           >
//             {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
//             <Save className="h-4 w-4 mr-2" />
//             {isLoading
//               ? "Đang xử lý..."
//               : isEditMode
//               ? "Cập nhật thuốc"
//               : "Tạo thuốc mới"}
//           </Button> */}
//           <Button
//             type="submit" // ✅ Để form tự xử lý submit
//             disabled={isLoading}
//             className="bg-blue-900 hover:bg-blue-800 sm:w-auto"
//           >
//             {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
//             <Save className="h-4 w-4 mr-2" />
//             {isLoading
//               ? "Đang xử lý..."
//               : isEditMode
//               ? "Cập nhật thuốc"
//               : "Tạo thuốc mới"}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface MedicineFormActionsProps {
  isLoading: boolean;
  isEditMode: boolean;
  onCancel?: () => void;
}

export default function MedicineFormActions({
  isLoading,
  isEditMode,
  onCancel,
}: MedicineFormActionsProps) {
  return (
    <Card className="border-gray-200 sticky bottom-0 bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Thông tin trạng thái */}
          <div className="text-sm text-gray-500">
            {isLoading && "Đang xử lý..."}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="min-w-[120px] border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Hủy
            </Button>

            <Button
              type="submit" // ✅ Quan trọng: type="submit" để form có thể submit
              disabled={isLoading}
              className="min-w-[160px] bg-blue-900 hover:bg-blue-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditMode ? "Cập nhật thuốc" : "Tạo thuốc mới"}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
