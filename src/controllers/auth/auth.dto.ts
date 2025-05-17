export interface IAuthLoginDto {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  accessToken: string;
  isProfileCompleted: boolean;
}

export interface IAuthRegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthRegisterResponse {
  email: string;
  otpExpiry: Date;
}

export interface IAuthVerifyEmailDto {
  email: string;
  otp: string;
}

export interface IAuthForgotPasswordDto {
  email: string;
}

export interface IAuthResetPasswordDto {
  email: string;
  newPassword: string;
  confirmPassword: string;
}