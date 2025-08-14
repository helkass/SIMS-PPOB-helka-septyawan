import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const publicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request (opsional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Misalnya mau pasang token auth
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response (opsional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bisa handle error global di sini
    return Promise.reject(error);
  }
);

export default axiosInstance;
