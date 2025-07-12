"use client";
import SidebarSection from "./sidebar-section";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";

import {
  Layers,
  History,
  Star,
  Settings,
  Box,
  BookOpen,
  Sliders,
  PlusCircle,
  Clock,
  UserCog,
  Briefcase,
  Ticket,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [collapsed] = useState(false);
  return (
    <aside className="border-[#00416A] w-60 h-fit bg-white text-[#00416A] pt-4 space-y-6">
      {/* Platform Section */}
      <SidebarSection title="">
        <SidebarGroup
          title="Thông tin thuốc"
          icon={Layers}
          collapsed={collapsed}
          items={[
            { label: "Quản lý thuốc", href: "/medicine", icon: BookOpen },
            {
              label: "Quản lý loại thuốc",
              href: "/medicine-category",
              icon: Star,
            },
            {
              label: "Quản lý nhóm thuốc",
              href: "/medicine-usage",
              icon: Star,
            },
            {
              label: "Quản lý Nhà sản xuất",
              href: "/manufacture",
              icon: Settings,
            },
            { label: "Quản lý Nhà phân phối", href: "/distributor", icon: Box },
            { label: "Quản lý Kho", href: "/stock", icon: Layers },
          ]}
        />
        <SidebarGroup
          title="Thông tin bệnh"
          icon={History}
          items={[
            { label: "Quản lý bệnh", href: "/disease", icon: BookOpen },
            {
              label: "Quản lý danh mục bệnh",
              href: "/disease-category",
              icon: Sliders,
            },
            {
              label: "Quản lý nhóm bệnh",
              href: "/disease-group",
              icon: Sliders,
            },
            { label: "Dược liệu", href: "/herbs", icon: PlusCircle },
          ]}
        />
        <SidebarGroup
          title="Đơn hàng"
          icon={Star}
          items={[
            { label: "Quản lý đơn hàng", href: "/orders", icon: Clock },
            { label: "Quản lý nhập hàng", href: "/import-batch", icon: Clock },
            {
              label: "Quản lý doanh thu",
              href: "/reports",
              icon: Settings,
            },
            {
              label: "Quản lý voucher",
              href: "/voucher",
              icon: Ticket,
            },
          ]}
        />
        <SidebarGroup
          title="Người dùng"
          icon={Settings}
          items={[
            { label: "Quản lý nhân viên", href: "/orders", icon: UserCog },
            {
              label: "Quản lý khách hàng",
              href: "/import-orders",
              icon: Briefcase,
            },
          ]}
        />
      </SidebarSection>

      {/* Projects Section */}
      <SidebarSection title="Projects">
        <SidebarItem label="Đăng xuất" icon={Settings} />
      </SidebarSection>
    </aside>
  );
};

export default Sidebar;
