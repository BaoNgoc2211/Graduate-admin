import React from "react";
import InputFilter from "../input-filter";
interface TitleProps {
  titleFilter: string;
  filterDetail_01: string;
  filterDetail_02: string;
  filterDetail_03: string;
  filterDetail_04: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Filter: React.FC<TitleProps> = ({
  titleFilter,
  filterDetail_01,
  filterDetail_02,
  filterDetail_03,
  filterDetail_04,
  onChange,
}) => {
  return (
    <>
      <div className="border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block">
        <p className="mb-3 text-sm font-medium">{titleFilter}</p>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <p className="flex gap-2">
            <InputFilter type="checkbox" value={"A"} onChange={onChange} />
            {filterDetail_01}
          </p>
          <p className="flex gap-2">
            <InputFilter type="checkbox" value={"B"} onChange={onChange} />
            {filterDetail_02}
          </p>
          <p className="flex gap-2">
            <InputFilter type="checkbox" value={"C"} onChange={onChange} />
            {filterDetail_03}
          </p>
          <p className="flex gap-2">
            <InputFilter type="checkbox" value={"C"} onChange={onChange} />
            {filterDetail_04}
          </p>
        </div>
      </div>
    </>
  );
};

export default Filter;
