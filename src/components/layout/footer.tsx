import Link from "next/link";
import Image from "next/image";
import { assets } from "../../../public/image/logo/assets";
const Footer = () => {
  return (
    <div className="">
      <div className=" px-5 py-3 bg-blue-950">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm ">
          <div>
            <h2 className="font-bold text-white text-3xl mb-5">MEDIGO</h2>
            <p className="w-full md:w-2/3 text-gray-300 mb-5">
              {" "}
              Sức khỏe của bạn là sứ mệnh của chúng tôi — với hệ thống bán thuốc
              thông minh, tiện lợi và an toàn, chúng tôi cam kết mang đến sản
              phẩm chất lượng, thông tin rõ ràng, hỗ trợ tận tâm và trải nghiệm
              mua thuốc trực tuyến đáng tin cậy mọi lúc, mọi nơi
            </p>
            <ul className="flex flex-col gap-1 text-white">
              <li>
                <span className="mr-2 font-bold">Contact:</span>(+89) 0123 456
                789
              </li>
              <li>
                <span className="mr-2 font-bold">Email:</span> MediGo@gmail.com
              </li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <div className="mb-4">
              <p className="text-xl mb-4 text-white font-bold">Kênh theo dõi</p>
              <ul className="flex flex-col gap-1 text-white">
                <li>
                  <Link href="/" className="flex flex-row">
                    <p className=" text-gray-300">Facebook</p>
                  </Link>
                </li>
                <li>
                  <Link href="/" className="flex flex-row">
                    <p className=" text-gray-300">Zalo</p>
                  </Link>
                </li>
                <li>
                  <Link href="/" className="flex flex-row ">
                    <p className=" text-gray-300">Youtube</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xl mb-4 text-white font-bold">
                Hỗ trợ thanh toán
              </p>
              {/* text-[#00416A] */}
              <ul className="flex flex-row gap-1 text-gray-600">
                <li>
                  <Link href="/" className="flex flex-row">
                    <Image
                      src={assets.logo_vnpay}
                      alt="Logo VN Pay"
                      width={30}
                      height={20}
                      className="justify-between"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="/" className="flex flex-row">
                    <Image
                      src={assets.logoMoMo}
                      alt="Logo MoMo"
                      width={30}
                      height={20}
                      className="justify-between ml-5"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-white ">
            <p className="font-bold mb-4">DANH MỤC</p>
            <p className="mb-2 text-gray-300">Bệnh tim mạch</p>
            <p className="mb-2 text-gray-300">Bệnh tim mạch</p>
            <p className="mb-2 text-gray-300">Bệnh tim mạch</p>
          </div>
        </div>
        <div className="px-3 py-2 ">
          <hr />
          <ul className=" flex flex-row justify-center text-white">
            <li className="">Trang Chủ</li>
            <li className="ml-5">Thông Tin Tra Cứu Thuốc</li>
            <li className="ml-5">Thông Tin Tra Cứu Bệnh</li>
          </ul>
        </div>
        <div>
          <hr />
          <p className="text-sm text-center text-gray-300">
            Copyright 2025@ forever.com - All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
