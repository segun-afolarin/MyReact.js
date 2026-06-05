import { useState, useEffect } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FloatingBottomNav from "../components/dashboard/FloatingBottomNav";

/* REPORT DASHBOARD COMPONENTS */
import ReportHero from "../components/reports/ReportHero";
import ImpactOverviewCards from "../components/reports/ImpactOverviewCards";
import ResolutionTimeline from "../components/reports/ResolutionTimeline";
import ReportCardsGrid from "../components/reports/ReportCardsGrid";
import CommunityVerificationFeed from "../components/reports/CommunityVerificationFeed";

const MyReportsDashboard = () => {
  /* DARK MODE */
  const [darkMode, setDarkMode] = useState(false);

  /* DESKTOP SIDEBAR */
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1280 : true
  );

  /* MOBILE SIDEBAR */
  const [mobileSidebar, setMobileSidebar] = useState(false);

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
    // ── ROOT: NO overflow-hidden — it would clip the fixed modal overlay ──
    <div
      className={`
        relative
        min-h-screen
        transition-all
        duration-500
        ${darkMode ? "bg-[#071017] text-white" : "bg-[#F3F5F7] text-black"}
      `}
    >
      {/* GLOBAL BACKGROUND — pointer-events-none so it never blocks the modal */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* TOP GLOW */}
        <div className="absolute top-[-220px] left-[-140px] w-[460px] h-[460px] bg-green-500/10 blur-3xl rounded-full" />
        {/* RIGHT GLOW */}
        <div className="absolute top-[15%] right-[-160px] w-[400px] h-[400px] bg-emerald-500/10 blur-3xl rounded-full" />
        {/* BOTTOM GLOW */}
        <div className="absolute bottom-[-200px] left-[20%] w-[320px] h-[320px] bg-green-400/10 blur-3xl rounded-full" />
        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#22c55e 1px,transparent 1px),linear-gradient(to bottom,#22c55e 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* HEADER — z-[60] keeps it below the modal overlay (z-[9999]) */}
      <DashboardHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />

      {/* SIDEBAR — z-[55] sits below header and well below modal */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
        darkMode={darkMode}
      />

      {/* MAIN CONTENT — z-10, shifted by sidebar width */}
      <main
        className={`
          relative
          z-10
          transition-all
          duration-500
          pt-24
          md:pt-28
          pb-32
          px-4
          sm:px-6
          lg:px-8
          ${sidebarOpen ? "xl:ml-[290px]" : "xl:ml-[96px]"}
        `}
      >
        {/* WRAPPER */}
        <div className="max-w-[1700px] mx-auto space-y-8">

          {/* HERO */}
          <ReportHero darkMode={darkMode} />

          {/* IMPACT OVERVIEW */}
          <ImpactOverviewCards darkMode={darkMode} />

          {/* REPORTS GRID — modal renders as fixed portal above everything */}
          <ReportCardsGrid darkMode={darkMode} />

          {/* TIMELINE */}
          <ResolutionTimeline darkMode={darkMode} />

          {/* AI + GOVERNMENT (placeholder grid kept for future sections) */}
          <section className="grid grid-cols-1 2xl:grid-cols-[0.8fr_1.2fr] gap-6 items-start" />

          {/* COMMUNITY FEED */}
          <CommunityVerificationFeed darkMode={darkMode} />
        </div>
      </main>

      {/* MOBILE NAVIGATION — z-[60] same as header, below modal */}
      <FloatingBottomNav darkMode={darkMode} />
    </div>
  );
};

export default MyReportsDashboard;