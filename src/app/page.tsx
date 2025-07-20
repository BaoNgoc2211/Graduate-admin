"use client";

import { checkAuthAPI } from "@/api/admin.api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthAPI();
        if (!res?.data) {
          toast.error("Bạn cần đăng nhập để truy cập trang này.");
          router.push("/auth");
        }
      } catch {
        toast.error("Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        router.push("/admin/sign-in");
      }
    };
    checkAuth();
  }, [router]);
  return (
    <div className="flex flex-col">
      <h1> Home </h1>
    </div>
  );
};
export default HomePage;
