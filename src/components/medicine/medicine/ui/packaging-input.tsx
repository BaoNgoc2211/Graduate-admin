"use client";
import React from "react";

const PACKAGING_TYPE_OPTIONS = [
  { value: "Hộp", label: "Hộp" },
  { value: "Vỉ", label: "Vỉ" },
  { value: "Lọ", label: "Lọ" },
  { value: "Chai", label: "Chai" },
  { value: "Ống", label: "Ống" },
  { value: "Gói", label: "Gói" },
  { value: "Khác", label: "Khác" },
];
const PACKAGING_UNIT_OPTIONS = [
  { value: "vỉ", label: "vỉ" },
  { value: "lọ", label: "lọ" },
  { value: "chai", label: "chai" },
  { value: "ống", label: "ống" },
  { value: "gói", label: "gói" },
  { value: "viên", label: "viên" },
  { value: "ml", label: "ml" },
  { value: "Khác", label: "Khác" },
];

interface PackagingInputProps {
  value: {
    type: string;
    bigQty: string;
    bigUnit: string;
    smallQty: string;
    smallUnit: string;
  };
  onChange: (val: PackagingInputProps["value"]) => void;
}

export const PackagingInput: React.FC<PackagingInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        <select
          className="border rounded-md px-2 py-1"
          value={value.type}
          onChange={e => onChange({ ...value, type: e.target.value })}
        >
          {PACKAGING_TYPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          className="border rounded-md px-2 py-1 w-16"
          placeholder="10"
          value={value.bigQty}
          onChange={e => onChange({ ...value, bigQty: String(e.target.value) })}
        />
        <select
          className="border rounded-md px-2 py-1"
          value={value.bigUnit}
          onChange={e => onChange({ ...value, bigUnit: e.target.value })}
        >
          {PACKAGING_UNIT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span>x</span>
        <input
          type="number"
          min={1}
          className="border rounded-md px-2 py-1 w-16"
          placeholder="10"
          value={value.smallQty}
          onChange={e => onChange({ ...value, smallQty: String(e.target.value) })}
        />
        <select
          className="border rounded-md px-2 py-1"
          value={value.smallUnit}
          onChange={e => onChange({ ...value, smallUnit: e.target.value })}
        >
          {PACKAGING_UNIT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="text-xs text-gray-500 mt-1">Ví dụ: Hộp 10 vỉ x 10 viên</div>
    </div>
  );
};