// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [isReady, setIsReady] = useState(false);

  // ── On mount: verify stored token is still valid server-side ──────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsReady(true);
      return;
    }
    api
      .get("/user")
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        // Token is invalid — clear everything
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => setIsReady(true)); // ← always set ready, even on failure
  }, []);

  // ── Helper: extract the most useful error message from Laravel's response ──
  // Laravel returns validation errors as:
  // { message: "Validation failed.", errors: { email: [...], password: [...] } }
  // This function picks the first specific field error, falling back to message.
  const extractError = (err) => {
    const data = err.response?.data;

    // No response at all (network error, server down)
    if (!data) return "Cannot reach the server. Is Laravel running?";

    // Pull the first error from any validation field
    if (data.errors) {
      const firstField = Object.values(data.errors)[0];
      if (Array.isArray(firstField) && firstField.length > 0) {
        return firstField[0];
      }
    }

    // Fall back to the top-level message
    if (data.message) return data.message;

    return "Something went wrong. Please try again.";
  };

  // ── Helper: send the user to the right place after auth ───────────────────
  // A user without a saved location must complete LocationSetup before
  // reaching the dashboard — this applies whether they just registered
  // OR logged into an old account that never finished setup.
  const redirectAfterAuth = (user) => {
    if (!user?.has_location) {
      navigate("/location-setup");
    } else {
      navigate("/CitizenDashboard");
    }
  };

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async ({ name, email, password, password_confirmation }) => {
    setLoading(true);
    setError(null);

    // Safety check — make sure password_confirmation is actually set
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
        password_confirmation, // Laravel's `confirmed` rule needs this exact key
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      redirectAfterAuth(data.user); // ← new accounts always go to location-setup
      return { success: true };
    } catch (err) {
      // Log full error in dev so you can see exactly what Laravel returned
      console.error("Register error response:", err.response?.data);
      setError(extractError(err));
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post("/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      redirectAfterAuth(data.user); // ← dashboard if location is set, else location-setup
      return { success: true };
    } catch (err) {
      console.error("Login error response:", err.response?.data);
      // For login, use a generic message — don't reveal which field was wrong
      const msg =
        err.response?.status === 401
          ? "Incorrect email or password."
          : extractError(err);
      setError(msg);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
    } catch {
      // Even if the server call fails, clear local state
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/Signup");
    }
  }, [navigate]);

  // ── Clear error ────────────────────────────────────────────────────────────
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