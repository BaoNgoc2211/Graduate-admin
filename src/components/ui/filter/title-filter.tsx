import React from "react";
interface TitleProps {
  title: string;
}
const TitleFilter = ({ title }: TitleProps) => {
  return (
    <>
      <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
        {title}
      </p>
    </>
  );
};
export default TitleFilter;
