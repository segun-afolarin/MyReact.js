// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [isReady, setIsReady] = useState(false);

  // ── On mount: verify token + fetch fresh user from backend ────────────────
  // We never trust localStorage for user data — only for the token.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsReady(true);
      return;
    }
    api
      .get("/user")
      .then(({ data }) => {
        setUser(data.user ?? data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setIsReady(true));
  }, []);

  // ── refreshUser: re-fetch user from backend ───────────────────────────────
  // Call this after any mutation that changes user fields (location, profile…)
  // so every component that reads `user` immediately gets the updated data.
  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get("/user");
      const fresh = data.user ?? data;
      setUser(fresh);
      return fresh;
    } catch {
      // Token expired mid-session — clear and redirect
      localStorage.removeItem("token");
      setUser(null);
      navigate("/Signup", { replace: true });
      return null;
    }
  }, [navigate]);

  // ── Extract the most useful error string from Laravel's response ──────────
  const extractError = (err) => {
    const data = err.response?.data;
    if (!data) return "Cannot reach the server. Is Laravel running?";
    if (data.errors) {
      const firstField = Object.values(data.errors)[0];
      if (Array.isArray(firstField) && firstField.length > 0) return firstField[0];
    }
    return data.message || "Something went wrong. Please try again.";
  };

  // ── Route guard after login/register ─────────────────────────────────────
  // replace: true so the auth page is NOT in browser history —
  // pressing Back after login won't take the user back to the login form.
  const redirectAfterAuth = useCallback((user) => {
    if (!user?.has_location) {
      navigate("/location-setup", { replace: true });
    } else {
      navigate("/CitizenDashboard", { replace: true });
    }
  }, [navigate]);

  // ── Register ──────────────────────────────────────────────────────────────
  // No page refresh — purely client-side state update then navigate.
  const register = useCallback(async ({ name, email, password, password_confirmation }) => {
    setLoading(true);
    setError(null);

    if (!password_confirmation || password !== password_confirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return { success: false };
    }

    try {
      const { data } = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);           // set in memory — no page reload
      redirectAfterAuth(data.user); // navigate() — no page reload
      return { success: true };
    } catch (err) {
      console.error("Register error:", err.response?.data);
      setError(extractError(err));
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [navigate, redirectAfterAuth]);

  // ── Login ─────────────────────────────────────────────────────────────────
  // No page refresh — purely client-side state update then navigate.
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/login", { email, password });

      localStorage.setItem("token", data.token);
      setUser(data.user);           // set in memory — no page reload
      redirectAfterAuth(data.user); // navigate() — no page reload
      return { success: true };
    } catch (err) {
      console.error("Login error:", err.response?.data);
      const msg =
        err.response?.status === 401
          ? "Incorrect email or password."
          : extractError(err);
      setError(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [navigate, redirectAfterAuth]);

  // ── Logout ────────────────────────────────────────────────────────────────
  // Best-effort server revocation, then always clears local state.
  // replace: true removes dashboard from history — Back won't re-enter the app.
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await api.post("/logout"); // revokes ALL tokens server-side
    } catch {
      // Server unreachable or token already expired — clear locally anyway
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
      navigate("/Signup", { replace: true }); // ← /Signup is your auth page
    }
  }, [navigate]);

  // ── Clear error ───────────────────────────────────────────────────────────
  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        isReady,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        refreshUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};