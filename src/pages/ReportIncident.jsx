import { useState, useEffect } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FloatingBottomNav from "../components/dashboard/FloatingBottomNav";

import CitizenReportHeader from "../components/report/CitizenReportHeader";
import SmartDetectionBanner from "../components/report/SmartDetectionBanner";
import ReportFormPanel from "../components/report/ReportFormPanel";
import ReportSuccessCard from "../components/report/ReportSuccessCard";
import AIReportAnalysis from "../components/report/AIReportAnalysis";

const ReportIncident = () => {
  /* DARK MODE */
  const [darkMode, setDarkMode] = useState(false);

  /* DESKTOP SIDEBAR */
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1280 : true
  );

  /* MOBILE SIDEBAR */
  const [mobileSidebar, setMobileSidebar] = useState(false);

  /* REPORT SUBMISSION */
  const [submitted, setSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleClose = () => {
    setSubmitted(false);
    setFormKey((k) => k + 1); // remounts ReportFormPanel, resetting all state
  };

  /* DARK MODE EFFECT */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  /* RESPONSIVE SIDEBAR */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`
        relative min-h-screen overflow-hidden transition-all duration-500
        ${darkMode ? "bg-[#071017] text-white" : "bg-[#F3F5F7] text-black"}
      `}
    >
      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-220px] left-[-140px] w-[460px] h-[460px] bg-green-500/10 blur-3xl rounded-full" />
        <div className="absolute top-[15%] right-[-160px] w-[400px] h-[400px] bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-200px] left-[20%] w-[320px] h-[320px] bg-green-400/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* HEADER */}
      <DashboardHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />

      {/* SIDEBAR */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
        darkMode={darkMode}
      />

      {/* MAIN CONTENT */}
      <main
        className={`
          relative z-10 transition-all duration-500
          pt-24 md:pt-28 pb-32 px-4 sm:px-6 lg:px-8
          ${sidebarOpen ? "xl:ml-[290px]" : "xl:ml-[96px]"}
        `}
      >
        <div className="max-w-[1700px] mx-auto space-y-8">
          <CitizenReportHeader darkMode={darkMode} />
          <SmartDetectionBanner darkMode={darkMode} />

          {/* FORM ONLY — no right-side drop-in cards */}
          <section>
            <ReportFormPanel
              key={formKey}
              darkMode={darkMode}
              submitted={submitted}
              setSubmitted={setSubmitted}
            />
          </section>
        </div>
      </main>

      {/* MOBILE NAVIGATION */}
      <FloatingBottomNav darkMode={darkMode} />

      {/* SUCCESS MODAL — rendered at root so it overlays everything */}
      {submitted && (
        <ReportSuccessCard
          darkMode={darkMode}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ReportIncident;