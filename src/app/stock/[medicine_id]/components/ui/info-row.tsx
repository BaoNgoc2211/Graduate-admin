"use client";

import React from "react";

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex items-center">
      <span className="w-40 text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
};

export default InfoRow;
