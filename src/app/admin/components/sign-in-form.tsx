"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import Input from "@/components/ui/input-01";
import Button from "@/components/ui/button-01";
import { Lock, Phone } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { IApiError } from "@/interface/error.interface";
import { loginSchema } from "@/schema/auth.schema";
import { z } from "zod";
import { ISignIn } from "@/interface/auth/admin.interface";
import { signInAPI } from "@/api/auth.api";
const SignInForm = () => {
  const router = useRouter();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<ISignIn>>({});
  const validateForm = () => {
    try {
      loginSchema.parse(signIn);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ISignIn> = {};
        error.errors.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as keyof ISignIn;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };
  const mutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: () => signInAPI(signIn),
    onSuccess: () => {
      toast.success(`Welcome ${signIn.email}`, {
        description: "Đăng nhập thành công!",
        duration: 1500,
      });
      router.push("/");
    },
    onError: (error: IApiError) => {
      toast.error("Đăng nhập không thành công!", {
        description: error.response?.data?.message || "Đã xảy ra lỗi!",
        duration: 1500,
      });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-[#00416A] px-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
          <h2 className="font-bold text-center text-2xl text-[#132540] mb-1">
            Sign In
          </h2>
          <p className="text-center text-sm text-[#628CA9] mb-6">
            Join the community today!
          </p>
          <button className="w-full py-2 rounded-full font-bold border border-gray-300 text-[#1850a3]  flex items-center justify-center gap-1 mb-4 shadow-sm hover:bg-gray-100 transition">
            <Image
              src="/image/logo/logo_google.jpeg"
              alt="Google"
              width={20}
              height={20}
            />
            <span>Use Google account</span>
          </button>
          <div className="text-center text-[#628CA9] text-sm mb-4">or</div>
          <div className="mb-2">
            <div className="mb-3">
              {" "}
              <Input
                placeholder="Enter your mobile or email"
                type="text"
                label="Mobile number or Email"
                value={signIn.email}
                onChange={(text) =>
                  setSignIn({ ...signIn, email: text.target.value })
                }
                icon={<Phone size={16} className="text-[#628CA9] opacity-80" />}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              {" "}
              <Input
                placeholder="Enter your password"
                type="password"
                label="Password"
                value={signIn.password}
                onChange={(password) =>
                  setSignIn({ ...signIn, password: password.target.value })
                }
                icon={<Lock size={16} className="text-[#628CA9] opacity-80" />}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <Button name="Sign In" isLoading={mutation.isPending} />
          </div>
          <p className="text-sm text text-center text-gray-700 mb-4">
            Join the community today!
            <span className="ml-1 text-[#628CA9] hover:underline cursor-pointer">
              Sign Up
            </span>{" "}
          </p>
        </div>
      </div>
    </form>
  );
};
export default SignInForm;
