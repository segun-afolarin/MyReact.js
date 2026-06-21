// src/components/auth/GuestRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = () => {
  const { isLoggedIn, isReady, user } = useAuth();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8F7]">
        <div className="w-8 h-8 border-4 border-[#0E7A53] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Already logged in → send to the right place, NOT always the dashboard.
  // This was the bug: a hardcoded redirect here was racing against
  // AuthContext's redirectAfterAuth() right after register/login, and
  // since this fires unconditionally, it always won — overriding the
  // intended /location-setup redirect for brand-new accounts.
  if (isLoggedIn) {
    return (
      <Navigate
        to={user?.has_location ? "/CitizenDashboard" : "/location-setup"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default GuestRoute;