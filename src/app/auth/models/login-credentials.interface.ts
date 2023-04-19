export interface ILoginCredentials {
  login: string;
  password: string;
  rememberPassword: boolean;
}

export interface IResetPasswordData {
  email: string;
  phoneNumber: string;
}

export interface IChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
