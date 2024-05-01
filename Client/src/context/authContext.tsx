import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { useMutation } from "react-query";
import { postSignup } from "../services/api-services/auth/signup/endpoints";
import { SignupDTO } from "../services/api-services/auth/signup/types";
import { LoginDTO } from "../services/api-services/auth/login/types";
import {
  getEnable2FA,
  postLogin,
  postLoginGoogle,
  postValidate2FA,
} from "../services/api-services/auth/login/endpoints";
import useNotify from "../utils/notify/useNotify";

interface AuthContextType {
  handleSignup: (data: SignupDTO) => Promise<unknown>;
  handleLogin: (data: LoginDTO) => Promise<{ accessToken: string }>;
  getSecretKey: (accessToken: string) => Promise<string>;
  validate2FA: (data: { validateCode: string }) => Promise<boolean>;
  handleGoogleLogin: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const signupMutation = useMutation(postSignup);
  const loginMutation = useMutation(postLogin);
  const validate2FAMutation = useMutation(postValidate2FA);

  const { notify } = useNotify();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSignup = useMemo(
    () => async (data: SignupDTO) => {
      try {
        const response = await signupMutation.mutateAsync(data);
        notify({
          message: "You have successfully signed up!",
          type: "success",
        });
        return response.data;
      } catch (error) {
        console.error("Signup error:", error);
        notify({
          message: "An error occurred while signing up",
          type: "error",
        });
        throw error;
      }
    },
    [notify, signupMutation]
  );

  const handleLogin = useMemo(
    () => async (data: LoginDTO) => {
      try {
        localStorage.removeItem("access-token");
        const response = await loginMutation.mutateAsync(data);
        return response.data;
      } catch (error) {
        console.error("Login error:", error);
        notify({
          message: "An error occurred while logging in",
          type: "error",
        });
        throw error;
      }
    },
    [loginMutation, notify]
  );

  //2FA keyi elde eden fonksiyon
  const getSecretKey = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (accessToken: string): Promise<any> => {
        try {
          const secretKeyResponse = await getEnable2FA(accessToken);
          return secretKeyResponse;
        } catch (error) {
          console.error("Get secret key error:", error);
          throw error;
        }
      },
    []
  );

  //validate2FA fonksiyonu
  const validate2FA = useMemo(
    () =>
      async (data: { validateCode: string }): Promise<boolean> => {
        try {
          const response = await validate2FAMutation.mutateAsync({
            token: data.validateCode,
          });

          if (response.data.verified === true) {
            setIsAuthenticated(true);
            console.log("giriş başarılı");
            notify({
              message: "Welcome! You have successfully logged in.",
              type: "success",
            });
          } else {
            notify({
              message: "Invalid authentication code",
              type: "error",
            });
          }
          return response.data.verified;
        } catch (error) {
          console.error("Validation error:", error);
          throw error;
        }
      },
    [notify, validate2FAMutation]
  );

  const handleGoogleLogin = useMemo(
    () => async (): Promise<void> => {
      try {
        const response = await postLoginGoogle();
        const data = response.data.url;
        window.location.href = data;
      } catch (error) {
        console.error("Google login error:", error);
        throw error;
      }
    },
    []
  );
  const authContextValue = useMemo(
    () => ({
      handleSignup,
      handleLogin,
      getSecretKey,
      validate2FA,
      handleGoogleLogin,
      isAuthenticated,
    }),
    [
      handleSignup,
      handleLogin,
      getSecretKey,
      validate2FA,
      handleGoogleLogin,
      isAuthenticated,
    ]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
