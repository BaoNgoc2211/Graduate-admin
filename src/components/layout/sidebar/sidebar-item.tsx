// import { ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { ElementType } from "react";

// type Props = {
//   icon: ElementType;
//   label: string;
//   href?: string;
//   expandable?: boolean;
// };

// // const SidebarItem = ({ label, expandable = false }: Props) => (
// //   <div className="flex items-center justify-between px-2 py-2 rounded cursor-pointer bg-transparent hover:bg-[#00416A] group">
// //     <div className="flex items-center gap-3">
// //       {/* <Icon size={16} className="text-gray-300" /> */}
// //       <span className="text-sm text-[#00416A] group-hover:text-white">
// //         {label}
// //       </span>
// //     </div>
// //     {expandable && <ChevronRight size={16} className="text-gray-400" />}
// //   </div>
// // );

// // export default SidebarItem;
// const SidebarItem = ({ label, href, icon, expandable = false }: Props) => {
//   const content = (
//     <div className="flex items-center justify-between px-2 py-2 rounded cursor-pointer bg-transparent hover:bg-[#00416A] group">
//       <div className="flex items-center gap-3">
//         {/* {Icon && <Icon size={16} className="text-gray-400" />} */}
//         <span className="text-sm text-[#00416A] group-hover:text-white">
//           {label}
//         </span>
//       </div>
//       {expandable && <ChevronRight size={16} className="text-gray-400" />}
//     </div>
//   );

//   return href ? <Link href={href}>{content}</Link> : content;
// };

// export default SidebarItem;
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ElementType } from "react";

type Props = {
  icon?: ElementType;
  label: string;
  href?: string;
  expandable?: boolean;
  collapsed?: boolean;
};

const SidebarItem = ({
  label,
  href,
  icon: Icon,
  expandable = false,
  collapsed = false,
}: Props) => {
  const content = (
    <div className="flex items-center justify-between px-2 py-2 rounded cursor-pointer bg-transparent hover:bg-[#00416A] group">
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon size={20} className="text-gray-400 group-hover:text-white" />
        )}
        {!collapsed && (
          <span className="text-sm text-[#00416A] group-hover:text-white">
            {label}
          </span>
        )}
      </div>
      {!collapsed && expandable && (
        <ChevronRight size={16} className="text-gray-400" />
      )}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default SidebarItem;
