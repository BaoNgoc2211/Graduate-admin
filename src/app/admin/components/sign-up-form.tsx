"use client";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input-01";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button-01";
import { Mail, Lock, User } from "lucide-react";
import { registerSchema } from "@/schema/auth.schema";
import { z } from "zod";
import { ISignUp } from "@/interface/auth/admin.interface";
import { useMutation } from "@tanstack/react-query";
import { IApiError } from "@/interface/error.interface";
import { toast } from "sonner";
import { signUpAPI } from "@/api/auth.api";
const SignUpForm = () => {
  const router = useRouter();
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<ISignUp>>({});
  const validateForm = () => {
    try {
      registerSchema.parse(signUp);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ISignUp> = {};
        error.errors.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as keyof ISignUp;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };
  const mutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: () => signUpAPI(signUp),
    onSuccess: () => {
      toast.success(`Welcome ${signUp.name}`, {
        description: "Đăng kys thành công!",
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
      <div className="min-h-screen flex items-center justify-center bg-[#1850a3] px-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center text-[#67b448] mb-1">
            Create Account
          </h2>
          <p className="text-center text-sm text-[#70b678] mb-6">
            Join the community today!
          </p>

          <button className="w-full py-2 rounded-full font-extrabold border border-gray-300 text-sm text-[#67b448] flex items-center justify-center gap-2 mb-4 shadow-sm hover:bg-gray-100 transition">
            <Image
              src="/image/logo/logo_google.jpeg"
              alt="Google"
              width={28}
              height={28}
            />
            <span>Use Google account</span>
          </button>

          <div className="text-center text-[#70b678] text-sm mb-4">or</div>

          <div>
            <div className="mb-3">
              <Input
                placeholder="Nhập tên của Bạn"
                type="text"
                label="Your Name"
                value={signUp.name}
                onChange={(text) =>
                  setSignUp({ ...signUp, name: text.target.value })
                }
                icon={<User size={16} className="text-[#628CA9] opacity-80" />}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            <div className="mb-3">
              {" "}
              <Input
                placeholder="Nhập email của Bạn"
                type="text"
                label="Mobile number or Email"
                value={signUp.email}
                onChange={(text) =>
                  setSignUp({ ...signUp, email: text.target.value })
                }
                icon={<Mail size={16} className="text-[#628CA9] opacity-80" />}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="mb-3">
              {" "}
              <Input
                placeholder="Nhập password đây nè !!"
                type="password"
                label="Password"
                value={signUp.password}
                onChange={(password) =>
                  setSignUp({ ...signUp, password: password.target.value })
                }
                icon={<Lock size={16} className="text-[#628CA9] opacity-80" />}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>
            <Button name="Sign up" isLoading={mutation.isPending} />
          </div>

          <p className="text-sm text-center text-gray-400 mt-4">
            Already a member?{" "}
            <span className="text-[#628CA9] hover:underline cursor-pointer">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
