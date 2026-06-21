// src/components/auth/RequireLocation.jsx
//
// Wrap any route that should be blocked until the user has completed
// location setup — e.g. <CitizenDashboard>. Without this, a user could
// type /CitizenDashboard directly into the URL bar and skip the step
// entirely, even though AuthContext's redirect only fires right after
// register/login.
//
// Usage in your router:
//
//   <Route
//     path="/CitizenDashboard"
//     element={
//       <RequireLocation>
//         <CitizenDashboard />
//       </RequireLocation>
//     }
//   />

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // ← adjust path if needed

const RequireLocation = ({ children }) => {
  const { user, isReady, isLoggedIn } = useAuth();

  // Wait for the initial /user check to finish before deciding anything —
  // otherwise a logged-in user would flash-redirect on page refresh.
  if (!isReady) return null;

  if (!isLoggedIn) {
    return <Navigate to="/Signup" replace />;
  }

  if (!user?.has_location) {
    return <Navigate to="/location-setup" replace />;
  }

  return children;
};

export default RequireLocation;