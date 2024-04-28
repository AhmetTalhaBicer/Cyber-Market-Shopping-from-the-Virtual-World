import http from "../../../base";
import { ServerResponse } from "../../../base/types";
import {
  Auth_Enable2FA,
  Auth_Login,
  Auth_LoginGoogle,
  Auth_Validate2FA,
} from "./constants";
import { LoginDTO, validate2FA_DTO, enable2FA_DTO } from "./types";

export const postLogin = async (data: LoginDTO) => {
  return http.post(Auth_Login, data);
};

export const getEnable2FA = async (accessToken: string) => {
  try {
    const response = await http.get<ServerResponse<enable2FA_DTO>>(
      Auth_Enable2FA,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get enable 2FA error:", error);
    throw error;
  }
};

export const postValidate2FA = async (data: validate2FA_DTO) => {
  return http.post(Auth_Validate2FA, data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDisable2FA = async ({ queryKey }: any) => {
  const { params } = queryKey[1];
  return await http.get<ServerResponse<unknown>>(Auth_Enable2FA, {
    params,
  });
};

export const postLoginGoogle = async () => {
  return await http.post(Auth_LoginGoogle);
};
