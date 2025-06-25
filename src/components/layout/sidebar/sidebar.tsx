import SidebarSection from "./sidebar-section";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";

// import {
//   Layers,
//   History,
//   Star,
//   Settings,
//   Box,
//   BookOpen,
//   Sliders,
//   PlusCircle,
//   Clock,
// } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="border-[#00416A] w-60 h-fit bg-white text-[#00416A] pt-4 space-y-6">
      {/* Platform Section */}
      <SidebarSection title="">
        <SidebarGroup
          // icon="Layers" icon: "History", icon: "Star", icon: "Settings"
          title="Thông tin thuốc"
          items={[
            { label: "Thuốc" },
            { label: "Quản lý Loại thuốc" },
            { label: "Quản lý Nhà sản xuất" },
            { label: "Quản lý Nhà phân phối" },
            { label: "Quản lý Kho" },
          ]}
        />
        <SidebarGroup
          // icon="Layers" icon: "History", icon: "Star", icon: "Settings"
          title="Thông tin bệnh"
          items={[
            { label: "Quản lý bệnh" },
            { label: "Quản lý nhóm bệnh" },
            { label: "Dược liệu" },
          ]}
        />
        <SidebarGroup
          // icon="Layers" icon: "History", icon: "Star", icon: "Settings"
          title="Đơn hàng"
          items={[
            { label: "Quản lý đơn hàng" },
            { label: "Quản lý nhập hàng" },
          ]}
        />
        <SidebarGroup
          // icon="Layers" icon: "History", icon: "Star", icon: "Settings"
          title="Doanh thu"
          items={[]}
        />
        {/* <SidebarItem icon={Box} label="Models" expandable /> */}
        <SidebarItem label="Thiết bị y tế" expandable />
      </SidebarSection>

      {/* Projects Section */}
      <SidebarSection title="Projects">
        <SidebarItem label="Đăng xuất" />
      </SidebarSection>
    </aside>
  );
};

export default Sidebar;
