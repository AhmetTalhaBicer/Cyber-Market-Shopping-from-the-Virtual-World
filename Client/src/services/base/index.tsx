import axios, { AxiosError, AxiosResponse } from "axios";
import qs from "qs";
import { clearTokenFromStorage } from "../../utils/storage";

const baseURL = import.meta.env.VITE_API_URL;

const http = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-store",
    "Accept-Language": "tr-TR",
  },
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  },
});

http.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("access-token");
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return error;
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      clearTokenFromStorage();
    }
    return Promise.reject(err.response?.data);
  }
);
export default http;
