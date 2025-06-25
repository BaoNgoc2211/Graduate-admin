import React from "react";
interface IInputFilter {
  type: "checkbox" | "radio";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputFilter = (props: IInputFilter) => {
  return (
    <>
      <input
        className="w-3"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

export default InputFilter;
