// src/api/axios.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── REQUEST INTERCEPTOR ──────────────────────────────────────────────────────
// Injects Bearer token into every outgoing request automatically
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
// Watches for 401 — clears storage and redirects to /Signup (not /auth)
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we're NOT already on the login page
      // (prevents redirect loop when login itself returns 401)
      const isAuthCall =
        error.config?.url?.includes("/login") ||
        error.config?.url?.includes("/register");

      if (!isAuthCall) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/Signup"; // ← matches your route
      }
    }
    return Promise.reject(error);
  }
);

export default api;