const MedicineLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="md:max-w-full">{children}</div>;
};

export default MedicineLayout;
