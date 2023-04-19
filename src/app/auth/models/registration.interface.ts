
export interface IRegistrationData {
  mail: string;
  phoneNumber: string;
  login: string;
  password: string;
  confirmPassword: string;
  marketingAgreement: boolean;
}

export type VerificationMethodType = 'email' | 'sms';
