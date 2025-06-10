import { LoaderCircle } from "lucide-react";

interface IButtonComponent {
  name: string;
  isLoading?: boolean;
  onClick?: () => void;
}

const Button04 = (props: IButtonComponent) => {
  return (
    <>
      <button
        className="bg-black text-white font-light px-8 py-2 mt-4 w-full"
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
    </>
  );
};

export default Button04;
