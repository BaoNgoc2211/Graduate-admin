export interface ISignIn {
  email: string;
  password: string;
}
export interface ISignUp {
  name: string;
  email: string;
  password: string;
}
export interface IVerify {
  email: string;
  OTP: string;
}
export interface IForgotPassword {
  email: string;
}
export interface IReset {
  OTP: string;
  newPassword: string;
}
