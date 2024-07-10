export interface UsersDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  twoFASecret: string | null;
  enable2FA: boolean;
  googleId: string | null;
}
