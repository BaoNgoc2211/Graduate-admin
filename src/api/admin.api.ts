import { ISignIn, ISignUp } from "@/interface/auth/admin.interface";
import APIConfig from "./api.config";

export const signInAPI = async (data: ISignIn) => {
  const res = await APIConfig.post("/api/admin/sign-in", data);
  return res.data;
};
export const signUpAPI = async (data: ISignUp) => {
  const res = await APIConfig.post("/api/admin/sign-up", data);
  return res.data;
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
