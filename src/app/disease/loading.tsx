const MedicineCategoryLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="p-10 md:max-w-full">{children}</div>;
};

export default MedicineCategoryLayout;
