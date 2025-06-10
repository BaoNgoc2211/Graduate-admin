const MedicineLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="px-20 md:max-w-full">{children}</div>;
};

export default MedicineLayout;
