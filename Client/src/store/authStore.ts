import { create } from "zustand";

type AuthState = {
  authData: string | null;
  setAuthData: (newAuthData: string | null) => void;
};

export const authStore = create<AuthState>((set) => {
  const authDataFromStorage = localStorage.getItem("authData");
  let parsedAuthData = null;

  if (authDataFromStorage && authDataFromStorage !== "undefined") {
    try {
      parsedAuthData = JSON.parse(authDataFromStorage);
    } catch (error) {
      console.error("Error parsing authData from localStorage:", error);
    }
  }

  return {
    authData: parsedAuthData,
    setAuthData: (newAuthData: string | null) => set({ authData: newAuthData }),
  };
});
