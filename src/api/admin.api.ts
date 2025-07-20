
import { ICheckAuth, IInfo, IReset, ISignIn, IVerify } from "@/interface/auth/admin.interface";
import APIConfig from "./api.config";
export const signupAPI = async (data: ISignIn) => {
  const response = await APIConfig.post("/api/auth/sign-up", data);
  return response.data;
};
export const verifyEmailAPI = async (data: IVerify) => {
  const response = await APIConfig.post("/api/auth/verify-otp", data);
  return response.data;
};
export const signInAPI = async (data: ISignIn) => {
  const response = await APIConfig.post("/api/admin/sign-in", data);
  return response.data;
};
export const logOutAPI = async () => {
  const response = await APIConfig.post("/api/auth/logout");
  return response.data;
};
export const checkAuthAPI = async () => {
  const response = await APIConfig.get("/api/auth/check-auth", {
    withCredentials: true,
  });
  return response.data as ICheckAuth;
};
export const updateInfo = async (data: IInfo) => {
  const response = await APIConfig.post("/api/auth/profile", data);
  return response.data;
};
export const forgotPasswordAPI = async (data: { email: string }) => {
  const response = await APIConfig.post("/api/auth/forgot-password", data);
  return response.data;
};
export const resetPasswordAPI = async (data: IReset) => {
  const response = await APIConfig.post("/api/auth/reset-password", data);
  return response.data;
};
