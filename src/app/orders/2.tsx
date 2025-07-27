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
} from "@/interface/order/order.interface";
import { toast } from "sonner";
import {
  useCancelOrder,
  useOrders,
  useOrderStats,
  useRefreshOrderData,
  useUpdateOrderStatus,
} from "@/hooks/orders/order.-2hooks";
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

  const combinedFilters = {
    ...filters,
    status: activeTab === "all" ? undefined : activeTab,
  };

  // Hooks
  const { data: orders, isLoading: ordersLoading } = useOrders(combinedFilters);
  console.log("Orders data:", orders);
  const { data: stats, isLoading: statsLoading } = useOrderStats();
  const updateStatusMutation = useUpdateOrderStatus();
  const cancelOrderMutation = useCancelOrder();
  const refreshData = useRefreshOrderData();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleFiltersChange = (newFilters: IOrderFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    updateStatusMutation.mutate({ orderId, status: status as any });
  };

  const handleCancelOrder = (orderId: string) => {
    setCancelOrderId(orderId);
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (cancelOrderId && cancelReason.trim()) {
      cancelOrderMutation.mutate(
        { orderId: cancelOrderId, reason: cancelReason },
        {
          onSuccess: () => {
            setIsCancelDialogOpen(false);
            setCancelOrderId(null);
            setCancelReason("");
          },
        }
      );
    } else {
      toast.error("Vui lòng nhập lý do hủy đơn hàng");
    }
  };

  const handleExportOrders = () => {
    toast.info("Chức năng xuất dữ liệu đang được phát triển");
  };

  const getTabCount = (status: string) => {
    if (!stats) return 0;
    switch (status) {
      case "all":
        return stats.total;
      case "Pending Confirmation":
        return stats.pending;
      case "Awaiting Shipment":
        return stats.awaiting;
      case "Shipping":
        return stats.shipping;
      case "Completed":
        return stats.completed;
      case "Cancelled":
        return stats.cancelled;
      default:
        return 0;
    }
  };

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
                onClick={refreshData}
                disabled={ordersLoading || statsLoading}
                className="bg-transparent"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    ordersLoading || statsLoading ? "animate-spin" : ""
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
                {statsLoading ? "..." : stats?.total || 0}
              </div>
              <div className="text-sm text-blue-700">Tổng đơn hàng</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-800">
                {statsLoading ? "..." : stats?.pending || 0}
              </div>
              <div className="text-sm text-yellow-700">Chờ xác nhận</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-800">
                {statsLoading ? "..." : stats?.awaiting || 0}
              </div>
              <div className="text-sm text-blue-700">Chờ giao hàng</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-800">
                {statsLoading ? "..." : stats?.shipping || 0}
              </div>
              <div className="text-sm text-purple-700">Đang giao</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-800">
                {statsLoading ? "..." : stats?.completed || 0}
              </div>
              <div className="text-sm text-green-700">Hoàn thành</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-800">
                {statsLoading ? "..." : stats?.cancelled || 0}
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
                  orders={orders || []}
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
                    orders={orders || []}
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
              disabled={cancelOrderMutation.isPending || !cancelReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {cancelOrderMutation.isPending ? "Đang hủy..." : "Xác nhận hủy"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
