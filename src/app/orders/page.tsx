//#region version 01
// "use client";

// import { useState } from "react";
// import { Package, RefreshCw, Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   type IOrderFilters,
//   ORDER_STATUS_OPTIONS,
//   type IOrder,
// } from "@/interface/order/order.interface";
// import { toast } from "sonner";
// import OrderTable from "@/components/order/order/order-table";
// import OrderDetailDrawer from "@/components/order/order/order-detail-drawer";
// import {
//   useOrders,
//   useOrdersByStatus,
//   useUpdateOrderStatus,
// } from "@/hooks/order/order.hook";
// import OrderFilterForm from "@/components/order/order/order-fillter-form";

// export default function AdminOrdersPage() {
//   const [activeTab, setActiveTab] = useState<string>("all");
//   const [filters, setFilters] = useState<IOrderFilters>({});
//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
//   const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
//   const [cancelReason, setCancelReason] = useState("");

//   // Hooks cho việc lấy dữ liệu
//   const {
//     data: allOrders,
//     isLoading: allOrdersLoading,
//     refetch: refetchAllOrders,
//   } = useOrders();
//   const {
//     data: filteredOrders,
//     isLoading: filteredOrdersLoading,
//     refetch: refetchFilteredOrders,
//   } = useOrdersByStatus(activeTab === "all" ? "" : activeTab);

//   const updateStatusMutation = useUpdateOrderStatus();
//   const orders = Array.isArray(activeTab === "all" ? allOrders : filteredOrders)
//     ? activeTab === "all"
//       ? allOrders
//       : filteredOrders
//     : [];
//   const ordersLoading =
//     activeTab === "all" ? allOrdersLoading : filteredOrdersLoading;
//   const stats = Array.isArray(allOrders)
//     ? {
//         total: allOrders.length,
//         pending: allOrders.filter((order) => order.status === "Chờ xác nhận")
//           .length,
//         awaiting: allOrders.filter((order) => order.status === "Chờ giao hàng")
//           .length,
//         shipping: allOrders.filter((order) => order.status === "Đang giao")
//           .length,
//         completed: allOrders.filter((order) => order.status === "Hoàn thành")
//           .length,
//         cancelled: allOrders.filter((order) => order.status === "Đã hủy")
//           .length,
//       }
//     : null;

//   const handleTabChange = (value: string) => {
//     setActiveTab(value);
//   };

//   const handleFiltersChange = (newFilters: IOrderFilters) => {
//     setFilters(newFilters);
//   };

//   const handleResetFilters = () => {
//     setFilters({});
//   };

//   const handleViewDetails = (orderId: string) => {
//     setSelectedOrderId(orderId);
//     setIsDetailOpen(true);
//   };

//   const handleUpdateStatus = (orderId: string, status: string) => {
//     updateStatusMutation.mutate(
//       { id: orderId, status: status as IOrder["status"] },
//       {
//         onSuccess: () => {
//           toast.success("Cập nhật trạng thái đơn hàng thành công");
//           // Refresh data
//           refetchAllOrders();
//           if (activeTab !== "all") {
//             refetchFilteredOrders();
//           }
//         },
//         onError: () => {
//           toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
//         },
//       }
//     );
//   };

//   const handleCancelOrder = (orderId: string) => {
//     setCancelOrderId(orderId);
//     setIsCancelDialogOpen(true);
//   };

//   const handleConfirmCancel = () => {
//     if (cancelOrderId && cancelReason.trim()) {
//       updateStatusMutation.mutate(
//         { id: cancelOrderId, status: "Đã hủy" },
//         {
//           onSuccess: () => {
//             toast.success("Đã hủy đơn hàng thành công");
//             setIsCancelDialogOpen(false);
//             setCancelOrderId(null);
//             setCancelReason("");
//             // Refresh data
//             refetchAllOrders();
//             if (activeTab !== "all") {
//               refetchFilteredOrders();
//             }
//           },
//           onError: () => {
//             toast.error("Có lỗi xảy ra khi hủy đơn hàng");
//           },
//         }
//       );
//     } else {
//       toast.error("Vui lòng nhập lý do hủy đơn hàng");
//     }
//   };

//   const handleRefreshData = () => {
//     refetchAllOrders();
//     if (activeTab !== "all") {
//       refetchFilteredOrders();
//     }
//     toast.success("Đã làm mới dữ liệu");
//   };

//   const handleExportOrders = () => {
//     toast.info("Chức năng xuất dữ liệu đang được phát triển");
//   };
 
//   const getTabCount = (status: string) => {
//     if (!stats) return 0;
//     switch (status) {
//       case "all":
//         return stats.total;
//       case " Chờ xác nhận":
//         return stats.pending;
//       case "Chờ giao hàng":
//         return stats.awaiting;
//       case "Đang giao":
//         return stats.shipping;
//       case "Hoàn thành":
//         return stats.completed;
//       case "Đã hủy":
//         return stats.cancelled;
//       default:
//         return 0;
//     }
//   };

//   // Filter orders based on filters state
//   const filteredOrdersByFilters =
//     orders?.filter((order) => {
//       if (filters.search) {
//         const searchTerm = filters.search.toLowerCase();
//         const matchesSearch =
//           order._id.toLowerCase().includes(searchTerm) ||
//           order.user_id.name.toLowerCase().includes(searchTerm) ||
//           order.user_id.email.toLowerCase().includes(searchTerm) ||
//           order.user_id.phone.includes(searchTerm);

//         if (!matchesSearch) return false;
//       }

//       if (
//         filters.paymentMethod &&
//         order.paymentMethod !== filters.paymentMethod
//       ) {
//         return false;
//       }

//       if (
//         filters.shippingMethod &&
//         order.shippingMethod !== filters.shippingMethod
//       ) {
//         return false;
//       }

//       if (filters.dateFrom) {
//         const orderDate = new Date(order.orderDate);
//         const fromDate = new Date(filters.dateFrom);
//         if (orderDate < fromDate) return false;
//       }

//       if (filters.dateTo) {
//         const orderDate = new Date(order.orderDate);
//         const toDate = new Date(filters.dateTo);
//         if (orderDate > toDate) return false;
//       }

//       return true;
//     }) || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-3">
//               <Package className="h-6 w-6 text-blue-900" />
//               <h1 className="text-xl font-semibold text-gray-900">
//                 Quản lý đơn hàng
//               </h1>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Button
//                 variant="outline"
//                 onClick={handleRefreshData}
//                 disabled={ordersLoading}
//                 className="bg-transparent"
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 mr-2 ${
//                     ordersLoading ? "animate-spin" : ""
//                   }`}
//                 />
//                 Làm mới
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={handleExportOrders}
//                 className="bg-transparent"
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Xuất dữ liệu
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
//           <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-blue-900">
//                 {allOrdersLoading ? "..." : stats?.total || 0}
//               </div>
//               <div className="text-sm text-blue-700">Tổng đơn hàng</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-yellow-800">
//                 {allOrdersLoading ? "..." : stats?.pending || 0}
//               </div>
//               <div className="text-sm text-yellow-700">Chờ xác nhận</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-blue-800">
//                 {allOrdersLoading ? "..." : stats?.awaiting || 0}
//               </div>
//               <div className="text-sm text-blue-700">Chờ giao hàng</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-purple-800">
//                 {allOrdersLoading ? "..." : stats?.shipping || 0}
//               </div>
//               <div className="text-sm text-purple-700">Đang giao</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-green-800">
//                 {allOrdersLoading ? "..." : stats?.completed || 0}
//               </div>
//               <div className="text-sm text-green-700">Hoàn thành</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-red-800">
//                 {allOrdersLoading ? "..." : stats?.cancelled || 0}
//               </div>
//               <div className="text-sm text-red-700">Đã hủy</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <OrderFilterForm
//           filters={filters}
//           onFiltersChange={handleFiltersChange}
//           onReset={handleResetFilters}
//         />

//         {/* Orders Table with Tabs */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Danh sách đơn hàng</CardTitle>
//             <CardDescription>
//               Quản lý và theo dõi tất cả đơn hàng trong hệ thống
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs
//               value={activeTab}
//               onValueChange={handleTabChange}
//               className="space-y-6"
//             >
//               <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-100">
//                 <TabsTrigger
//                   value="all"
//                   className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
//                 >
//                   Tất cả ({getTabCount("all")})
//                 </TabsTrigger>
//                 {ORDER_STATUS_OPTIONS.map((status) => (
//                   <TabsTrigger
//                     key={status.value}
//                     value={status.value}
//                     className="data-[state=active]:bg-blue-900 data-[state=active]:text-white text-xs lg:text-sm"
//                   >
//                     <span className="hidden sm:inline">{status.label}</span>
//                     <span className="sm:hidden">
//                       {status.label.split(" ")[0]}
//                     </span>
//                     <span className="ml-1 lg:ml-2">
//                       ({getTabCount(status.value)})
//                     </span>
//                   </TabsTrigger>
//                 ))}
//               </TabsList>

//               <TabsContent value="all" className="space-y-4">
//                 <OrderTable
//                   orders={filteredOrdersByFilters}
//                   isLoading={ordersLoading}
//                   onViewDetails={handleViewDetails}
//                   onUpdateStatus={handleUpdateStatus}
//                   onCancelOrder={handleCancelOrder}
//                 />
//               </TabsContent>

//               {ORDER_STATUS_OPTIONS.map((status) => (
//                 <TabsContent
//                   key={status.value}
//                   value={status.value}
//                   className="space-y-4"
//                 >
//                   <OrderTable
//                     orders={filteredOrdersByFilters}
//                     isLoading={ordersLoading}
//                     onViewDetails={handleViewDetails}
//                     onUpdateStatus={handleUpdateStatus}
//                     onCancelOrder={handleCancelOrder}
//                   />
//                 </TabsContent>
//               ))}
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Order Detail Drawer */}
//       <OrderDetailDrawer
//         orderId={selectedOrderId}
//         isOpen={isDetailOpen}
//         onClose={() => {
//           setIsDetailOpen(false);
//           setSelectedOrderId(null);
//         }}
//       />

//       {/* Cancel Order Dialog */}
//       <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Hủy đơn hàng</DialogTitle>
//             <DialogDescription>
//               Bạn có chắc chắn muốn hủy đơn hàng #{cancelOrderId}? Vui lòng cho
//               biết lý do hủy.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="cancelReason">Lý do hủy đơn hàng</Label>
//               <Textarea
//                 id="cancelReason"
//                 placeholder="Nhập lý do hủy đơn hàng..."
//                 value={cancelReason}
//                 onChange={(e) => setCancelReason(e.target.value)}
//                 className="mt-2"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsCancelDialogOpen(false)}
//             >
//               Không hủy
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleConfirmCancel}
//               disabled={updateStatusMutation.isPending || !cancelReason.trim()}
//               className="bg-red-600 hover:bg-red-700"
//             >
//               {updateStatusMutation.isPending ? "Đang hủy..." : "Xác nhận hủy"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
//#endregion
//#region version version new
// "use client";

// import { useState } from "react";
// import { Package, RefreshCw, Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   type IOrderFilters,
//   ORDER_STATUS_OPTIONS,
//   type IOrder,
// } from "@/interface/order/order.interface";
// import { toast } from "sonner";
// import {
//   useOrders,
//   useOrdersByStatus,
//   useUpdateOrderStatus,
// } from "@/hooks/orders/order.hooks";
// // import OrderFilterForm from "@/components/order/orders/order-filter-form";
// import OrderTable from "@/components/order/order/order-table";
// import OrderDetailDrawer from "@/components/order/order/order-detail-drawer";
// import OrderFilterForm from "@/components/order/order/order-fillter-form";

// export default function AdminOrdersPage() {
//   const [activeTab, setActiveTab] = useState<string>("all");
//   const [filters, setFilters] = useState<IOrderFilters>({});
//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
//   const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
//   const [cancelReason, setCancelReason] = useState("");

//   // Hooks cho việc lấy dữ liệu
//   const { data: allOrders, isLoading: allOrdersLoading, refetch: refetchAllOrders } = useOrders();
//   const { data: filteredOrders, isLoading: filteredOrdersLoading, refetch: refetchFilteredOrders } = useOrdersByStatus(
//     activeTab === "all" ? "" : activeTab
//   );
  
//   const updateStatusMutation = useUpdateOrderStatus();

//   // Xác định orders và loading state dựa trên tab hiện tại
//   const orders = Array.isArray(activeTab === "all" ? allOrders : filteredOrders)
//     ? activeTab === "all"
//       ? allOrders
//       : filteredOrders
//     : [];
//   const ordersLoading = activeTab === "all" ? allOrdersLoading : filteredOrdersLoading;

//   // Debug logs
//   console.log("Current tab:", activeTab);
//   console.log("All orders:", allOrders?.length || 0);
//   console.log("Filtered orders:", filteredOrders?.length || 0);
//   console.log("Current orders:", orders?.length || 0);
//   console.log("Loading state:", ordersLoading);

//   // Tính toán stats từ allOrders
//   const stats = Array.isArray(allOrders) ? {
//     total: allOrders.length,
//     pending: allOrders.filter(order => order.status === "Chờ xác nhận").length,
//     awaiting: allOrders.filter(order => order.status === "Chờ giao hàng").length,
//     shipping: allOrders.filter(order => order.status === "Đang giao").length,
//     completed: allOrders.filter(order => order.status === "Hoàn thành").length,
//     cancelled: allOrders.filter(order => order.status === "Đã hủy").length,
//   } : null;

//   const handleTabChange = (value: string) => {
//     setActiveTab(value);
//   };

//   const handleFiltersChange = (newFilters: IOrderFilters) => {
//     setFilters(newFilters);
//     // Có thể implement logic filter ở đây nếu cần
//   };

//   const handleResetFilters = () => {
//     setFilters({});
//   };

//   const handleViewDetails = (orderId: string) => {
//     setSelectedOrderId(orderId);
//     setIsDetailOpen(true);
//   };

//   const handleUpdateStatus = (orderId: string, status: string) => {
//     updateStatusMutation.mutate(
//       { id: orderId, status: status as IOrder["status"] },
//       {
//         onSuccess: () => {
//           toast.success("Cập nhật trạng thái đơn hàng thành công");
//           // Refresh data
//           refetchAllOrders();
//           if (activeTab !== "all") {
//             refetchFilteredOrders();
//           }
//         },
//         onError: () => {
//           toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
//         }
//       }
//     );
//   };

//   const handleCancelOrder = (orderId: string) => {
//     setCancelOrderId(orderId);
//     setIsCancelDialogOpen(true);
//   };

//   const handleConfirmCancel = () => {
//     if (cancelOrderId && cancelReason.trim()) {
//       updateStatusMutation.mutate(
//         { id: cancelOrderId, status: "Đã hủy" },
//         {
//           onSuccess: () => {
//             toast.success("Đã hủy đơn hàng thành công");
//             setIsCancelDialogOpen(false);
//             setCancelOrderId(null);
//             setCancelReason("");
//             // Refresh data
//             refetchAllOrders();
//             if (activeTab !== "all") {
//               refetchFilteredOrders();
//             }
//           },
//           onError: () => {
//             toast.error("Có lỗi xảy ra khi hủy đơn hàng");
//           }
//         }
//       );
//     } else {
//       toast.error("Vui lòng nhập lý do hủy đơn hàng");
//     }
//   };

//   const handleRefreshData = () => {
//     refetchAllOrders();
//     if (activeTab !== "all") {
//       refetchFilteredOrders();
//     }
//     toast.success("Đã làm mới dữ liệu");
//   };

//   const handleExportOrders = () => {
//     toast.info("Chức năng xuất dữ liệu đang được phát triển");
//   };

//   const getTabCount = (status: string) => {
//     if (!stats) return 0;
//     switch (status) {
//       case "all":
//         return stats.total;
//       case "Chờ xác nhận":
//         return stats.pending;
//       case "Chờ giao hàng":
//         return stats.awaiting;
//       case "Đang giao":
//         return stats.shipping;
//       case "Hoàn thành":
//         return stats.completed;
//       case "Đã hủy":
//         return stats.cancelled;
//       default:
//         return 0;
//     }
//   };

//   // Filter orders based on filters state
//   const filteredOrdersByFilters = orders?.filter((order) => {
//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase();
//       const matchesSearch = 
//         order._id.toLowerCase().includes(searchTerm) ||
//         order.user_id.name.toLowerCase().includes(searchTerm) ||
//         order.user_id.email.toLowerCase().includes(searchTerm) ||
//         order.user_id.phone.includes(searchTerm);
      
//       if (!matchesSearch) return false;
//     }

//     if (filters.paymentMethod && order.paymentMethod !== filters.paymentMethod) {
//       return false;
//     }

//     if (filters.shippingMethod && order.shippingMethod !== filters.shippingMethod) {
//       return false;
//     }

//     if (filters.dateFrom) {
//       const orderDate = new Date(order.orderDate);
//       const fromDate = new Date(filters.dateFrom);
//       if (orderDate < fromDate) return false;
//     }

//     if (filters.dateTo) {
//       const orderDate = new Date(order.orderDate);
//       const toDate = new Date(filters.dateTo);
//       if (orderDate > toDate) return false;
//     }

//     return true;
//   }) || [];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-3">
//               <Package className="h-6 w-6 text-blue-900" />
//               <h1 className="text-xl font-semibold text-gray-900">
//                 Quản lý đơn hàng
//               </h1>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Button
//                 variant="outline"
//                 onClick={handleRefreshData}
//                 disabled={ordersLoading}
//                 className="bg-transparent"
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 mr-2 ${
//                     ordersLoading ? "animate-spin" : ""
//                   }`}
//                 />
//                 Làm mới
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={handleExportOrders}
//                 className="bg-transparent"
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Xuất dữ liệu
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
//           <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-blue-900">
//                 {allOrdersLoading ? "..." : stats?.total || 0}
//               </div>
//               <div className="text-sm text-blue-700">Tổng đơn hàng</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-yellow-800">
//                 {allOrdersLoading ? "..." : stats?.pending || 0}
//               </div>
//               <div className="text-sm text-yellow-700">Chờ xác nhận</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-blue-800">
//                 {allOrdersLoading ? "..." : stats?.awaiting || 0}
//               </div>
//               <div className="text-sm text-blue-700">Chờ giao hàng</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-purple-800">
//                 {allOrdersLoading ? "..." : stats?.shipping || 0}
//               </div>
//               <div className="text-sm text-purple-700">Đang giao</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-green-800">
//                 {allOrdersLoading ? "..." : stats?.completed || 0}
//               </div>
//               <div className="text-sm text-green-700">Hoàn thành</div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-red-800">
//                 {allOrdersLoading ? "..." : stats?.cancelled || 0}
//               </div>
//               <div className="text-sm text-red-700">Đã hủy</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <OrderFilterForm
//           filters={filters}
//           onFiltersChange={handleFiltersChange}
//           onReset={handleResetFilters}
//         />

//         {/* Orders Table with Tabs */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Danh sách đơn hàng</CardTitle>
//             <CardDescription>
//               Quản lý và theo dõi tất cả đơn hàng trong hệ thống
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs
//               value={activeTab}
//               onValueChange={handleTabChange}
//               className="space-y-6"
//             >
//               <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-100">
//                 <TabsTrigger
//                   value="all"
//                   className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
//                 >
//                   Tất cả ({getTabCount("all")})
//                 </TabsTrigger>
//                 {ORDER_STATUS_OPTIONS.map((status) => (
//                   <TabsTrigger
//                     key={status.value}
//                     value={status.value}
//                     className="data-[state=active]:bg-blue-900 data-[state=active]:text-white text-xs lg:text-sm"
//                   >
//                     <span className="hidden sm:inline">{status.label}</span>
//                     <span className="sm:hidden">
//                       {status.label.split(" ")[0]}
//                     </span>
//                     <span className="ml-1 lg:ml-2">
//                       ({getTabCount(status.value)})
//                     </span>
//                   </TabsTrigger>
//                 ))}
//               </TabsList>

//               <TabsContent value="all" className="space-y-4">
//                 <OrderTable
//                   orders={filteredOrdersByFilters}
//                   isLoading={ordersLoading}
//                   onViewDetails={handleViewDetails}
//                   onUpdateStatus={handleUpdateStatus}
//                   onCancelOrder={handleCancelOrder}
//                 />
//               </TabsContent>

//               {ORDER_STATUS_OPTIONS.map((status) => (
//                 <TabsContent
//                   key={status.value}
//                   value={status.value}
//                   className="space-y-4"
//                 >
//                   <OrderTable
//                     orders={filteredOrdersByFilters}
//                     isLoading={ordersLoading}
//                     onViewDetails={handleViewDetails}
//                     onUpdateStatus={handleUpdateStatus}
//                     onCancelOrder={handleCancelOrder}
//                   />
//                 </TabsContent>
//               ))}
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Order Detail Drawer */}
//       <OrderDetailDrawer
//         orderId={selectedOrderId}
//         isOpen={isDetailOpen}
//         onClose={() => {
//           setIsDetailOpen(false);
//           setSelectedOrderId(null);
//         }}
//       />

//       {/* Cancel Order Dialog */}
//       <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Hủy đơn hàng</DialogTitle>
//             <DialogDescription>
//               Bạn có chắc chắn muốn hủy đơn hàng #{cancelOrderId}? Vui lòng cho
//               biết lý do hủy.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="cancelReason">Lý do hủy đơn hàng</Label>
//               <Textarea
//                 id="cancelReason"
//                 placeholder="Nhập lý do hủy đơn hàng..."
//                 value={cancelReason}
//                 onChange={(e) => setCancelReason(e.target.value)}
//                 className="mt-2"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsCancelDialogOpen(false)}
//             >
//               Không hủy
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleConfirmCancel}
//               disabled={updateStatusMutation.isPending || !cancelReason.trim()}
//               className="bg-red-600 hover:bg-red-700"
//             >
//               {updateStatusMutation.isPending ? "Đang hủy..." : "Xác nhận hủy"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
//#endregion
"use client";

import { useState } from "react";
import { Package, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  type IOrderFilters,
  ORDER_STATUS_OPTIONS,
  type IOrder,
} from "@/interface/order/order.interface";
import { toast } from "sonner";
import {
  useOrders,
  useOrdersByStatus,
  useUpdateOrderStatus,
} from "@/hooks/orders/order.hooks";
import OrderFilterForm from "@/components/order/order/order-filter-form";
import OrderTable from "@/components/order/order/order-table";
import OrderDetailDrawer from "@/components/order/order/order-detail-drawer";

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filters, setFilters] = useState<IOrderFilters>({});
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Hooks cho việc lấy dữ liệu
  const { data: allOrders, isLoading: allOrdersLoading, refetch: refetchAllOrders } = useOrders();
  const { data: filteredOrders, isLoading: filteredOrdersLoading, refetch: refetchFilteredOrders } = useOrdersByStatus(
    activeTab === "all" ? "" : activeTab
  );
  
  const updateStatusMutation = useUpdateOrderStatus();

  // Xác định orders và loading state dựa trên tab hiện tại
  const orders = Array.isArray(activeTab === "all" ? allOrders : filteredOrders)
    ? activeTab === "all"
      ? allOrders
      : filteredOrders
    : [];
  const ordersLoading = activeTab === "all" ? allOrdersLoading : filteredOrdersLoading;

  // Debug logs
  console.log("Current tab:", activeTab);
  // console.log("All orders:", allOrders?.length || 0);
  // console.log("All orders sample:", allOrders?.[0]); // ✅ Thêm log để xem cấu trúc data
  // console.log("Filtered orders:", filteredOrders?.length || 0);
  // console.log("Current orders:", orders?.length || 0);
  // console.log("Loading state:", ordersLoading);
  // console.log("Stats:", status); // ✅ Thêm log để debug stats

  // ✅ Safety check cho orders
  const safeOrders = orders?.filter(order => order && order._id) || [];
  console.log("Safe orders count:", safeOrders.length);

  // Tính toán stats từ allOrders với mapping mới
  const stats = Array.isArray(allOrders) ? {
    total: allOrders.length,
    pending: allOrders.filter(order => order.status === "Chờ xác nhận").length, // PENDING
    awaiting: allOrders.filter(order => order.status === "Chờ giao hàng").length, // CONFIRMED
    shipping: allOrders.filter(order => order.status === "Đang giao").length, // DELIVERING
    completed: allOrders.filter(order => order.status === "Hoàn thành").length, // COMPLETED
    cancelled: allOrders.filter(order => order.status === "Đã hủy").length, // CANCELLED
  } : null;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleFiltersChange = (newFilters: IOrderFilters) => {
    setFilters(newFilters);
    // Có thể implement logic filter ở đây nếu cần
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    updateStatusMutation.mutate(
      { id: orderId, status: status as IOrder["status"] },
      {
        onSuccess: () => {
          toast.success("Cập nhật trạng thái đơn hàng thành công");
          // Refresh data
          refetchAllOrders();
          if (activeTab !== "all") {
            refetchFilteredOrders();
          }
        },
        onError: () => {
          toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
        }
      }
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setCancelOrderId(orderId);
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (cancelOrderId && cancelReason.trim()) {
      updateStatusMutation.mutate(
        { id: cancelOrderId, status: "Đã hủy" },
        {
          onSuccess: () => {
            toast.success("Đã hủy đơn hàng thành công");
            setIsCancelDialogOpen(false);
            setCancelOrderId(null);
            setCancelReason("");
            // Refresh data
            refetchAllOrders();
            if (activeTab !== "all") {
              refetchFilteredOrders();
            }
          },
          onError: () => {
            toast.error("Có lỗi xảy ra khi hủy đơn hàng");
          }
        }
      );
    } else {
      toast.error("Vui lòng nhập lý do hủy đơn hàng");
    }
  };

  const handleRefreshData = () => {
    refetchAllOrders();
    if (activeTab !== "all") {
      refetchFilteredOrders();
    }
    toast.success("Đã làm mới dữ liệu");
  };

  const handleExportOrders = () => {
    toast.info("Chức năng xuất dữ liệu đang được phát triển");
  };

  const getTabCount = (status: string) => {
    if (!stats) return 0;
    switch (status) {
      case "all":
        return stats.total;
      case "Chờ xác nhận":
        return stats.pending;
      case "Chờ giao hàng":
        return stats.awaiting;
      case "Đang giao":
        return stats.shipping;
      case "Hoàn thành":
        return stats.completed;
      case "Đã hủy":
        return stats.cancelled;
      default:
        return 0;
    }
  };

  // Filter orders based on filters state
  const filteredOrdersByFilters = orders?.filter((order) => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        order._id.toLowerCase().includes(searchTerm) ||
        order.user_id.name.toLowerCase().includes(searchTerm) ||
        order.user_id.email.toLowerCase().includes(searchTerm) ||
        order.user_id.phone.includes(searchTerm);
      
      if (!matchesSearch) return false;
    }

    if (filters.paymentMethod && order.paymentMethod !== filters.paymentMethod) {
      return false;
    }

    if (filters.shippingMethod && order.shippingMethod !== filters.shippingMethod) {
      return false;
    }

    if (filters.dateFrom) {
      const orderDate = new Date(order.orderDate);
      const fromDate = new Date(filters.dateFrom);
      if (orderDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const orderDate = new Date(order.orderDate);
      const toDate = new Date(filters.dateTo);
      if (orderDate > toDate) return false;
    }

    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-900" />
              <h1 className="text-xl font-semibold text-gray-900">
                Quản lý đơn hàng
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefreshData}
                disabled={ordersLoading}
                className="bg-transparent"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    ordersLoading ? "animate-spin" : ""
                  }`}
                />
                Làm mới
              </Button>
              <Button
                variant="outline"
                onClick={handleExportOrders}
                className="bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" />
                Xuất dữ liệu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-900">
                {allOrdersLoading ? "..." : stats?.total || 0}
              </div>
              <div className="text-sm text-blue-700">Tổng đơn hàng</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-800">
                {allOrdersLoading ? "..." : stats?.pending || 0}
              </div>
              <div className="text-sm text-yellow-700">Chờ xác nhận</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-800">
                {allOrdersLoading ? "..." : stats?.awaiting || 0}
              </div>
              <div className="text-sm text-blue-700">Chờ giao hàng</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-800">
                {allOrdersLoading ? "..." : stats?.shipping || 0}
              </div>
              <div className="text-sm text-purple-700">Đang giao</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-800">
                {allOrdersLoading ? "..." : stats?.completed || 0}
              </div>
              <div className="text-sm text-green-700">Hoàn thành</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-800">
                {allOrdersLoading ? "..." : stats?.cancelled || 0}
              </div>
              <div className="text-sm text-red-700">Đã hủy</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <OrderFilterForm
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        {/* Orders Table with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn hàng</CardTitle>
            <CardDescription>
              Quản lý và theo dõi tất cả đơn hàng trong hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-gray-100">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-blue-900 data-[state=active]:text-white"
                >
                  Tất cả ({getTabCount("all")})
                </TabsTrigger>
                {ORDER_STATUS_OPTIONS.map((status) => (
                  <TabsTrigger
                    key={status.value}
                    value={status.value}
                    className="data-[state=active]:bg-blue-900 data-[state=active]:text-white text-xs lg:text-sm"
                  >
                    <span className="hidden sm:inline">{status.label}</span>
                    <span className="sm:hidden">
                      {status.label.split(" ")[0]}
                    </span>
                    <span className="ml-1 lg:ml-2">
                      ({getTabCount(status.value)})
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <OrderTable
                  orders={filteredOrdersByFilters}
                  isLoading={ordersLoading}
                  onViewDetails={handleViewDetails}
                  onUpdateStatus={handleUpdateStatus}
                  onCancelOrder={handleCancelOrder}
                />
              </TabsContent>

              {ORDER_STATUS_OPTIONS.map((status) => (
                <TabsContent
                  key={status.value}
                  value={status.value}
                  className="space-y-4"
                >
                  <OrderTable
                    orders={filteredOrdersByFilters}
                    isLoading={ordersLoading}
                    onViewDetails={handleViewDetails}
                    onUpdateStatus={handleUpdateStatus}
                    onCancelOrder={handleCancelOrder}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        orderId={selectedOrderId}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedOrderId(null);
        }}
      />

      {/* Cancel Order Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hủy đơn hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn hủy đơn hàng #{cancelOrderId}? Vui lòng cho
              biết lý do hủy.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="cancelReason">Lý do hủy đơn hàng</Label>
              <Textarea
                id="cancelReason"
                placeholder="Nhập lý do hủy đơn hàng..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
            >
              Không hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmCancel}
              disabled={updateStatusMutation.isPending || !cancelReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {updateStatusMutation.isPending ? "Đang hủy..." : "Xác nhận hủy"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}