import { Info } from "lucide-react";

const ErrorComponent = ({error}: {error:string}) => {
    return (
        <div className="flex items-center text-red-500 text-sm font-sans gap-x-[5px]">
            <Info size={18} />
            {error}
        </div>
    )
}

export default ErrorComponent;