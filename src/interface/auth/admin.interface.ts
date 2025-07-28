export interface ISignUp {
  name: string;
  email: string;
  password: string;
  phone: number;
}
export interface ISignIn {
  email: string;
  password: string;
}
export interface IVerify {
  email: string;
  otp: string;
}

export interface IInfo {
  name?: string;
  phone?: string;
  avatar?: string;
  gender?: string;
  point?: number;
  birthday?: Date;
  address?: string;
}
export interface ICheckAuth {
  message: string;
  data: string;
}
export interface IForgotPassword {
  email: string;
}
export interface IReset {
  email: string;
  otp: string;
  newPassword: string;
}
export interface Province {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
}

export interface Ward {
  code: number;
  name: string;
}
