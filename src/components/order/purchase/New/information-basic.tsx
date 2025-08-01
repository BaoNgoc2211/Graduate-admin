// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { vi } from "date-fns/locale";
// import { cn } from "@/lib/utils";
// import type {
//   IPurchaseOrder,
//   IPurchaseOrderPayload,
// } from "@/interface/order/purchase.interface";
// import {
//   PurchaseOrderFormData,
//   purchaseOrderSchema,
// } from "@/schema/order/purchase.schema";
// import { useSuppliers } from "@/hooks/orders/purchase.hooks";
// interface PurchaseOrderFormProps {
//   defaultValues?: IPurchaseOrder;
//   onSubmit: (data: IPurchaseOrderPayload) => Promise<void>;
//   isLoading?: boolean;
//   submitLabel?: string;
// }
// const InformationBasic = ({
//   defaultValues,
//   isLoading = false,
// }: PurchaseOrderFormProps) => {
//   const { data: suppliersData } = useSuppliers();
//   const suppliers = suppliersData?.data || [];
//   const form = useForm<PurchaseOrderFormData>({
//     resolver: zodResolver(purchaseOrderSchema),
//     defaultValues: {
//       supplierId: defaultValues?.supplierId || "",
//       date_in: defaultValues ? new Date(defaultValues.date_in) : new Date(),
//       expectedDeliveryDate: defaultValues?.expectedDeliveryDate
//         ? new Date(defaultValues.expectedDeliveryDate)
//         : undefined,
//       // status: defaultValues?.status || "Nháp",
//       note: defaultValues?.note || "Nháp",
//       medicines: defaultValues?.medicines?.map((item) => ({
//         medicine_id: item.medicine_id,
//         quantity: item.quantity,
//         price: item.price,
//         CK_Rate: item.CK_Rate || 0,
//         VAT_Rate: item.VAT_Rate || 0,
//         batch_id: item.batch_id || "",
//         // notes: item.notes || "",
//       })) || [
//         {
//           medicine_id: "",
//           quantity: 1,
//           price: 0,
//           CK_Rate: 0,
//           VAT_Rate: 0,
//           batch_id: "",
//           // notes: "",
//         },
//       ],
//     },
//   });
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
//       </CardHeader>
//       <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <FormField
//           control={form.control}
//           name="supplierId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Nhà cung cấp</FormLabel>
//               <Select
//                 onValueChange={field.onChange}
//                 value={field.value}
//                 disabled={isLoading}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Chọn nhà cung cấp" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {suppliers.map((supplier) => (
//                     <SelectItem key={supplier._id} value={supplier._id}>
//                       <div className="flex flex-col">
//                         <span className="font-medium">{supplier.nameCo}</span>
//                         <span className="text-xs text-gray-500">
//                           {supplier.status === "active"}
//                         </span>
//                       </div>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//           T
//         />

//         <FormField
//           control={form.control}
//           name="note"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Trạng thái</FormLabel>
//               <Select
//                 onValueChange={field.onChange}
//                 value={field.value}
//                 disabled={isLoading}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Chọn trạng thái" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="Nháp">Nháp</SelectItem>
//                   <SelectItem value="Ghi nợ">Ghi nợ</SelectItem>
//                   <SelectItem value="Đã thanh toán">Đã thanh toán</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="date_in"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Ngày nhập hàng *</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full pl-3 text-left font-normal",
//                         !field.value && "text-muted-foreground"
//                       )}
//                       disabled={isLoading}
//                     >
//                       {field.value ? (
//                         format(field.value, "dd/MM/yyyy", { locale: vi })
//                       ) : (
//                         <span>Chọn ngày</span>
//                       )}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     initialFocus
//                     locale={vi}
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* <FormField
//           control={form.control}
//           name="expectedDeliveryDate"
//           render={({ field }) => (
//             <FormItem className="min-h-[50px]">
//               <FormLabel>Ngày giao dự kiến</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full pl-3 text-left font-normal",
//                         !field.value && "text-muted-foreground"
//                       )}
//                       disabled={isLoading}
//                     >
//                       {field.value ? (
//                         format(field.value, "dd/MM/yyyy", { locale: vi })
//                       ) : (
//                         <span>Chọn ngày</span>
//                       )}
//                       <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={field.value}
//                     onSelect={field.onChange}
//                     initialFocus
//                     locale={vi}
//                   />
//                 </PopoverContent>
//               </Popover>
//               <FormMessage className="min-h-[20px]" />
//             </FormItem>
//           )}
//         /> */}

//         {/* <FormField
//           control={form.control}
//           name="note"
//           render={({ field }) => (
//             <FormItem className="md:col-span-2 min-h-[50px]">
//               <FormLabel>Ghi chú</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Nhập ghi chú cho đơn mua hàng..."
//                   {...field}
//                   disabled={isLoading}
//                 />
//               </FormControl>
//               <FormMessage className="min-h-[20px]" />
//             </FormItem>
//           )}
//         /> */}
//       </CardContent>
//     </Card>
//   );
// };
// export default InformationBasic;
"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { IPurchaseOrder } from "@/interface/order/purchase.interface";
import { PurchaseOrderFormData } from "@/schema/order/purchase.schema";
import { useSuppliers } from "@/hooks/orders/purchase.hooks";

interface InformationBasicProps {
  form: UseFormReturn<PurchaseOrderFormData>;
  defaultValues?: IPurchaseOrder;
  isLoading?: boolean;
}

const InformationBasic = ({
  form,
  // defaultValues,
  isLoading = false,
}: InformationBasicProps) => {
  const { data: suppliersData } = useSuppliers();
  const suppliers = suppliersData?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="supplierId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhà cung cấp</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhà cung cấp" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier._id} value={supplier._id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{supplier.nameCo}</span>
                        <span className="text-xs text-gray-500">
                          {supplier.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trạng thái</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Nháp">Nháp</SelectItem>
                  <SelectItem value="Ghi nợ">Ghi nợ</SelectItem>
                  <SelectItem value="Đã thanh toán">Đã thanh toán</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_in"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày nhập hàng *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isLoading}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy", { locale: vi })
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default InformationBasic;