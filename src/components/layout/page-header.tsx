import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-blue-100">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
