import { ChevronRight } from "lucide-react";
// import { ElementType } from "react";

type Props = {
  // icon: ElementType; icon: Icon,
  label: string;
  expandable?: boolean;
};

const SidebarItem = ({ label, expandable = false }: Props) => (
  <div className="flex items-center justify-between px-2 py-2 rounded cursor-pointer bg-transparent hover:bg-[#00416A] group">
    <div className="flex items-center gap-3">
      {/* <Icon size={16} className="text-gray-300" /> */}
      <span className="text-sm text-[#00416A] group-hover:text-white">{label}</span>
    </div>
    {expandable && <ChevronRight size={16} className="text-gray-400" />}
  </div>
);

export default SidebarItem;
