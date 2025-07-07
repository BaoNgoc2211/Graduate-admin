// import {
//   getAllStockAPI,
//   getByMedicineStockAPI,
//   getLowStockAPI,
// } from "@/api/order/stock.api";
// import { IStock } from "@/interface/order/stock.interface";
// import { useQuery } from "@tanstack/react-query";

// export const useAllStock = () => {
//   return useQuery<{ data: IStock[] }>({
//     queryKey: ["stock-list"],
//     queryFn: getAllStockAPI,
//   });
// };
// export const useLowStock = () => {
//   return useQuery<{ data: IStock }>({
//     queryKey: ["stock-low"],
//     queryFn: getLowStockAPI,
//   });
// };
// export const useByMedicineStock = () => {
//   const params = useParams<{ _id: string }>();
//   const medicineId = params._id;
//   console.log("Medicine ID:", medicineId);
//   const isIdReady = !!medicineId;
//   return useQuery({
//     queryKey: ["stock-by-medicine", medicineId],
//     queryFn: () => getByMedicineStockAPI(medicineId),
//     enabled: isIdReady,
//   });
// };
import {
  getAllStockAPI,
  getByMedicineStockAPI,
  getLowStockAPI,
} from "@/api/order/stock.api";
import { IStock } from "@/interface/order/stock.interface";
import { useQuery } from "@tanstack/react-query";
export const useAllStock = () =>
  useQuery<{ data: IStock[] }>({
    queryKey: ["stock-list"],
    queryFn: getAllStockAPI,
    staleTime: 5 * 60 * 1000,
  });
export const useLowStock = () => {
  return useQuery<{ data: IStock }>({
    queryKey: ["stock-low"],
    queryFn: getLowStockAPI,
  });
};
// export const useLowStock = (threshold = 10) => {
//   return useQuery({
//     queryKey: ["low-stock", threshold],
//     queryFn: async (): Promise<{ data: IStock[] }> => {
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       const lowStockItems = mockStocks.filter(
//         (stock) => stock.quantity < threshold
//       );
//       return { data: lowStockItems };
//     },
//     staleTime: 5 * 60 * 1000,
//   });
// };

// export const useByMedicineStock = (medicineId: string) => {
//   return useQuery({
//     queryKey: ["medicine-stock", medicineId],
//     queryFn: async (): Promise<{ data: IStock[] }> => {
//       await new Promise((resolve) => setTimeout(resolve, 1200));
//       const medicineStocks = mockStocks.filter(
//         (stock) => stock.medicine_id._id === medicineId
//       );
//       return { data: medicineStocks };
//     },
//     enabled: !!medicineId,
//     staleTime: 5 * 60 * 1000,
//   });
// };
// export const useByMedicineStock = () => {
//   const params = useParams<{ medicine_id: string }>(); 
//   const medicineId = params?.medicine_id;
//   const isReady = !!medicineId;

//   return useQuery({
//     queryKey: ["stock-by-medicine", medicineId],
//     queryFn: () => getByMedicineStockAPI(medicineId),
//     enabled: isReady,
//   });
// };
export const useByMedicineStock = (medicineId: string) =>
  useQuery<{ data: IStock[] }>({          
    queryKey: ["stock-by-medicine", medicineId],
    queryFn: () => getByMedicineStockAPI(medicineId),
    enabled: !!medicineId,
  });