// src/components/auth/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F7]">
        <div className="w-8 h-8 border-4 border-[#0E7A53] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → send to your auth page
  if (!isLoggedIn) {
    return <Navigate to="/Signup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;