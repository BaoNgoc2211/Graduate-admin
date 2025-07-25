"use client";

import { checkAuthAPI } from "@/api/admin.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Factory,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthAPI();
        if (!res?.data) {
          toast.error("Bạn cần đăng nhập để truy cập trang này.");
          router.push("/auth");
        }
      } catch {
        toast.error("Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        router.push("/admin/sign-in");
      }
    };
    checkAuth();
  }, [router]);
  const stats = [
    {
      title: "Nhà phân phối",
      value: "24",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/distributor",
    },
    {
      title: "Nhà sản xuất",
      value: "18",
      icon: Factory,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/manufacture",
    },
    {
      title: "Đơn hàng",
      value: "156",
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/orders",
    },
    {
      title: "Sản phẩm",
      value: "89",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "#",
    },
  ];

  const quickActions = [
    {
      title: "Quản lý nhà phân phối",
      description: "Thêm, sửa, xóa thông tin nhà phân phối",
      icon: Building2,
      href: "/distributor",
      color: "bg-blue-900 hover:bg-blue-800",
    },
    {
      title: "Quản lý nhà sản xuất",
      description: "Quản lý thông tin các nhà sản xuất",
      icon: Factory,
      href: "/manufacture",
      color: "bg-green-900 hover:bg-green-800",
    },
    {
      title: "Quản lý đơn hàng",
      description: "Theo dõi và xử lý đơn hàng",
      icon: ShoppingCart,
      href: "/orders",
      color: "bg-purple-900 hover:bg-purple-800",
    },
    {
      title: "Quản lý danh mục",
      description: "Phân loại và tổ chức sản phẩm",
      icon: Package,
      href: "/medicine-category",
      color: "bg-orange-900 hover:bg-orange-800",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Hệ thống Quản lý Dược phẩm
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Giải pháp toàn diện cho việc quản lý nhà phân phối, nhà sản xuất
              và đơn hàng dược phẩm
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Thao tác nhanh</h2>
            <Badge variant="outline" className="text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              Hoạt động
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-200 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                      <action.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 group-hover:text-blue-900 transition-colors">
                        {action.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {action.description}
                  </p>
                  <Link href={action.href}>
                    <Button
                      className={`w-full ${action.color} text-white font-semibold`}
                    >
                      Truy cập
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Thêm nhà phân phối mới
                    </p>
                    <p className="text-sm text-gray-500">
                      Công ty TNHH Dược phẩm ABC
                    </p>
                  </div>
                </div>
                <Badge variant="outline">2 giờ trước</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Factory className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Cập nhật thông tin nhà sản xuất
                    </p>
                    <p className="text-sm text-gray-500">Traphaco JSC</p>
                  </div>
                </div>
                <Badge variant="outline">5 giờ trước</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Đơn hàng mới</p>
                    <p className="text-sm text-gray-500">
                      Đơn hàng #DH-2024-001
                    </p>
                  </div>
                </div>
                <Badge variant="outline">1 ngày trước</Badge>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                Xem tất cả hoạt động
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default HomePage;
