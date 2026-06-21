// src/App.jsx

import { Routes, Route } from "react-router-dom";

/* LAYOUT */
import MainLayout from "./layouts/MainLayout";

/* AUTH GUARDS */
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute     from "./components/auth/GuestRoute";

/* ── PAGES ───────────────────────────────────────────────────────────────── */

// Public / marketing pages
import Home                from "./pages/Home";
import AboutPage           from "./pages/AboutPage";
import Mission             from "./pages/Mission";
import Impact              from "./pages/Impact";
import PolicyPage          from "./pages/PolicyPage";
import Contact             from "./pages/Contact";
import HelpCenter          from "./pages/help-center";
import FAQPage             from "./pages/FAQ";
import Documentation       from "./pages/Documentation";
import NotFound            from "./pages/NotFound";
import Signup              from "./pages/Signup";

// Protected pages (require a valid token)
import CitizenDashboard    from "./pages/CitizenDashboard";
import MyReportsDashboard  from "./pages/MyReportsDashboard";
import ReportIncident      from "./pages/ReportIncident";
import SubmitReport        from "./pages/SubmitReport";
import CommunityVoicesPage from "./pages/CommunityVoicesPage";
import CommunityAlert      from "./pages/CommunityAlert";
import AIAnalyst           from "./pages/AIAnalyst";
import Government          from "./pages/government";
import LocationSetup       from "./pages/LocationSetup";
import Profile             from "./pages/Profile";
import Settings            from "./pages/Settings";
import Logout              from "./pages/Logout";

/* ── App ─────────────────────────────────────────────────────────────────── */

function App() {
  return (
    <Routes>

      {/* ================================================================
          GUEST-ONLY ROUTES
          Logged-in users who visit /Signup are redirected to /CitizenDashboard
          ================================================================ */}
      <Route element={<GuestRoute />}>
        <Route path="/Signup" element={<Signup />} />
      </Route>

      {/* ================================================================
          MAIN LAYOUT — public + protected pages share the same shell
          ================================================================ */}
      <Route element={<MainLayout />}>

        {/* ── PUBLIC ROUTES (no login required) ───────────────────────── */}
        <Route path="/"              element={<Home />} />
        <Route path="/about"         element={<AboutPage />} />
        <Route path="/mission"       element={<Mission />} />
        <Route path="/impact"        element={<Impact />} />
        <Route path="/policy"        element={<PolicyPage />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/help-center"   element={<HelpCenter />} />
        <Route path="/faqs"          element={<FAQPage />} />
        <Route path="/Documentation" element={<Documentation />} />
         <Route path="/government"   element={<Government />} />

        {/* ── PROTECTED ROUTES (valid token required) ──────────────────
            All routes inside <ProtectedRoute> redirect to /Signup
            if the user is not logged in.
            ─────────────────────────────────────────────────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/CitizenDashboard"    element={<CitizenDashboard />} />
          <Route path="/reports"             element={<MyReportsDashboard />} />
          <Route path="/report"              element={<ReportIncident />} />
          <Route path="/SubmitReport"        element={<SubmitReport />} />
          <Route path="/CommunityVoicesPage" element={<CommunityVoicesPage />} />
          <Route path="/CommunityAlert"      element={<CommunityAlert />} />
          <Route path="/AIAnalyst"           element={<AIAnalyst />} />
          <Route path="/Profile"             element={<Profile />} />
          <Route path="/Settings"            element={<Settings />} />
          <Route path="/logout"              element={<Logout />} />
          <Route path="/location-setup"      element={<LocationSetup />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>

    </Routes>
  );
}

export default App;