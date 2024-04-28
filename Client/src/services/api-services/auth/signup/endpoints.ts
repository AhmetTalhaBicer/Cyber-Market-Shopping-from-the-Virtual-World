import http from "../../../base";
import { AUTH_SIGNUP } from "./constants";
import { SignupDTO } from "./types";

export const postSignup = async (data: SignupDTO) => {
  try {
    const response = await http.post(AUTH_SIGNUP, data);
    return response;
  } catch (error: any) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};
