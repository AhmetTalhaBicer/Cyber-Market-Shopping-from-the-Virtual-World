export interface LoginDTO {
  email: string;
  password: string;
}

export interface enable2FA_DTO {
  secret: string;
}

export interface validate2FA_DTO {
  token: string;
}
