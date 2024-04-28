import { CUSTOM_AUTH_KEY } from "./constants";

export function clearTokenFromStorage() {
  localStorage.removeItem(CUSTOM_AUTH_KEY);
  return null;
}
