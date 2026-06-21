// src/hooks/useLogout.js
//
// WHERE TO PASTE: src/hooks/useLogout.js
//
// A convenience hook that gives you a `handleLogout` function
// you can attach to any button anywhere in your app.
//
// Usage:
//   import useLogout from "../hooks/useLogout";
//   const { handleLogout, loading } = useLogout();
//   <button onClick={handleLogout}>Log out</button>

import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const { logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Redirect is handled inside AuthContext (goes to /auth)
  };

  return { handleLogout, loading };
};

export default useLogout;