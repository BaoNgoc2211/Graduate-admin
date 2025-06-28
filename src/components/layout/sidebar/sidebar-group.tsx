"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ElementType } from "react";
import SidebarItem from "./sidebar-item";

type GroupItem = {
  label: string;
  href?: string;
  icon?: ElementType;
  collapsed?: boolean;
};

type Props = {
  title: string;
  icon?: ElementType;
  items: GroupItem[];
  collapsed?: boolean;
};
const SidebarGroup = ({ title, items }: Props) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between px-2 py-2 rounded cursor-pointer bg-transparent hover:bg-[#00416A] group"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#00416A] group-hover:text-white">
            {title}
          </span>
        </div>
        {expanded ? (
          <ChevronDown size={16} className="text-gray-400" />
        ) : (
          <ChevronRight size={16} className="text-gray-400" />
        )}
      </div>

      {expanded && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              collapsed={item.collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarGroup;
// const SidebarGroup = ({ title, items }: Props) => {
//   const [expanded, setExpanded] = useState(true);

//   return (
//     <div>
//       <div
//         onClick={() => setExpanded(!expanded)}
//         // hover:bg-zinc-800
//         className="flex items-center justify-between px-2 py-2 rounded cursor-pointer bg-transparent hover:bg-[#00416A] group"
//       >
//         <div className="flex items-center gap-3">
//           {/* <Icon size={16} className="text-gray-300" /> */}
//           <span className="text-sm text-[#00416A] group-hover:text-white">
//             {title}
//           </span>
//         </div>
//         {expanded ? (
//           <ChevronDown size={16} className="text-gray-400" />
//         ) : (
//           <ChevronRight size={16} className="text-gray-400" />
//         )}
//       </div>

//       {expanded && (
//         <div className="ml-6 mt-1 space-y-1">
//           {items.map((item) => (
//             <SidebarItem
//               key={item.label}
//               // icon={item.icon || Icon}
//               label={item.label}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SidebarGroup;
