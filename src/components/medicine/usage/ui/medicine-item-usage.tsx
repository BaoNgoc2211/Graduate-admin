"use client";
import Image from "next/image";
import Link from "next/link";
import { IMedicine } from "@/interface/medicine/medicine.interface";
interface MedicineItemCateProps {
  _id: string;
  name: string;
  medicine: IMedicine;
}
const MedicineItemUsage: React.FC<Partial<MedicineItemCateProps>> = ({
  _id,
  name,
  medicine,
}) => {
  const thumbnailSrc = medicine?.thumbnail || "/images/default-thumbnail.jpg";
  return (
    <Link href={`/medicine/${_id}`}>
      <div className="text-gray-700 bg-white rounded-xl shadow-md p-4 w-full max-w-[260px] relative cursor-copy">
        <div className="overflow-hidden">
          <Image
            className="hover:scale-110 transition ease-in-out "
            src={thumbnailSrc}
            alt={name ?? "Medicine image"}
            width={260}
            height={260}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-800 font-medium truncate mb-2">
              {name}
            </p>
          </div>

          <div className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer transition shrink-0">
            <Image
              src="/image/icon/cart_icon.png"
              alt=""
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
export default MedicineItemUsage;
