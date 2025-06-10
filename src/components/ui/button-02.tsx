import { LoaderCircle } from "lucide-react";
import React from "react";

interface IButtonProps {
  name: string;
  isLoading?: boolean;
  onClick?: () => void;
}
//bg-gradient-to-r from-indigo-600 to-blue-600
const Button = (props: IButtonProps) => {
  return (
    <button
      className={`w-fit px-2 py-2 rounded-b-md 
      bg-white text-[#00416A] border border-[#00416A] 
      font-bold transition-all duration-300 
      hover:bg-[#00416A] hover:text-white 
      shadow-sm hover:shadow-md active:translate-y-[1px]`}
      disabled={props.isLoading}
      onClick={props.onClick}
    >
      {props.isLoading ? (
        <div className="flex gap-x-2 w-full items-center justify-center">
          <LoaderCircle className="animate-spin text-white" />
          Please wait
        </div>
      ) : (
        props.name
      )}
    </button>
  );
};

export default Button;
