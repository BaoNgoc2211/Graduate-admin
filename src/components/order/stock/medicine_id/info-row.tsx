
"use client";
import React from "react";

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex items-center">
    <span className="w-40 text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default InfoRow;
