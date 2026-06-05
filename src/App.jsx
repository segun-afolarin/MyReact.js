import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* LAYOUT */
import MainLayout from "./layouts/MainLayout";

/* PAGES */

import Home from "./pages/Home";
import CommunityVoicesPage  from "./pages/CommunityVoicesPage"
import PolicyPage from "./pages/PolicyPage";
import CitizenDashboard from "./pages/CitizenDashboard"
import AboutPage from "./pages/AboutPage";
import SubmitReport from "./pages/SubmitReport";
import Contact from "./pages/Contact";
import CommunityAlert from "./pages/CommunityAlert"
import Mission from "./pages/Mission";
import ReportIncident from"./pages/ReportIncident";
import Profile from "./pages/Profile";
import Impact from "./pages/Impact";
import Government from "./pages/government";
import HelpCenter from "./pages/help-center";
import FAQPage from "./pages/FAQ";
import MyReportsDashboard from "./pages/MyReportsDashboard";
import Documentation from "./pages/Documentation";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Import } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* POLICY */}
          <Route
            path="/policy"
            element={<PolicyPage />}
          />
          <Route
            path="/report"
            element={<ReportIncident />}
          />
          <Route
            path="/government"
            element={<Government />}
          />
            <Route
            path="/reports"
            element={<MyReportsDashboard />}
          />
            <Route
            path="/CommunityAlert"
            element={<CommunityAlert />}
          />
          
          

          {/* ABOUT */}
          <Route
            path="/about"
            element={<AboutPage />}
          />
          <Route
            path="/SubmitReport"
            element={<SubmitReport />}
          />

          {/* MISSION */}
          <Route
            path="/mission"
            element={<Mission />}
          />

          {/* IMPACT */}
          <Route
            path="/impact"
            element={<Impact />}
          />

          {/* HELP CENTER */}
          <Route
            path="/help-center"
            element={<HelpCenter />}
          />
          <Route
            path="/Profile"
            element={<Profile />}
          />

          {/* FAQ */}
          <Route
            path="/faqs"
            element={<FAQPage />}
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/CitizenDashboard"
            element={<CitizenDashboard />}
          />
          <Route
            path="/Signup"
            element={<Signup />}
          />
          <Route
            path="/Documentation"
            element={<Documentation />}
          />
          <Route
            path="/CommunityVoicesPage"
            element={<CommunityVoicesPage />}
          />

          {/* 404 PAGE */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;