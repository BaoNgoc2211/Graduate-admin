// type Props = {
//   title: string;
//   children: React.ReactNode;
// };

// const SidebarSection = ({ title, children }: Props) => (
//   <div>
//     <h4 className="uppercase text-xs text-gray-400 mb-2">{title}</h4>
//     <div className="space-y-1">{children}</div>
//   </div>
// );

type Props = {
  title: string;
  children: React.ReactNode;
};

const SidebarSection = ({ title, children }: Props) => (
  <div>
    {title && <h4 className="uppercase text-xs text-gray-400 mb-2">{title}</h4>}
    <div className="space-y-1">{children}</div>
  </div>
);

export default SidebarSection;
