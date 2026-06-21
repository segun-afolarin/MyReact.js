// src/utils/auth.js
//
// WHERE TO PASTE: src/utils/auth.js
//
// Small helper functions you can import anywhere in the app.
// Useful for conditionally rendering UI based on auth state
// without needing to pull in the full context.

/**
 * Returns the raw token string from localStorage, or null if not present.
 */
export const getToken = () => localStorage.getItem("token") ?? null;

/**
 * Returns the parsed user object from localStorage, or null.
 */
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Returns true if a token is present in localStorage.
 * Note: this does NOT verify the token is still valid on the server —
 * use AuthContext.isLoggedIn for that (it calls GET /api/user on mount).
 */
export const hasToken = () => !!getToken();

/**
 * Wipes all auth data from localStorage.
 * Call this as a last resort (e.g. from an error boundary).
 * Prefer calling logout() from AuthContext in normal flows.
 */
export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Builds an Authorization header object — useful if you ever need
 * to make a one-off fetch() call outside of the axios instance.
 *
 * Usage:
 *   fetch("/api/something", { headers: { ...bearerHeader(), "Content-Type": "application/json" } })
 */
export const bearerHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};