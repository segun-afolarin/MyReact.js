// src/api/axios.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-production-89f5.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthCall =
        error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/register");

      if (!isAuthCall) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/Signup";
      }
    }
    return Promise.reject(error);
  }
);

export default api;