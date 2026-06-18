import { useState, useEffect } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FloatingBottomNav from "../components/dashboard/FloatingBottomNav";

import ReportsHero from "../components/reports/ReportsHero";
import ReportStats from "../components/reports/ReportStats";
import ReportSearch from "../components/reports/ReportSearch";
import ReportGrid from "../components/reports/ReportGrid";

const MyReportsDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= 1280
      : true
  );

  const [mobileSidebar, setMobileSidebar] = useState(false);

  // ✅ GLOBAL CONTROL STATE (FIXED SEARCH)
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`
        relative
        min-h-screen
        overflow-hidden
        transition-all
        duration-300

        ${
          darkMode
            ? "bg-[#050B11] text-white"
            : "bg-[#F4F7F6] text-black"
        }
      `}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-x-hidden">

        <div className="absolute top-[-180px] left-[-120px] w-[420px] h-[420px] bg-green-500/10 blur-[120px]" />

        <div className="absolute right-[-180px] top-[15%] w-[420px] h-[420px] bg-emerald-400/10 blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:70px_70px]" />

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

      {/* MAIN SCROLL AREA */}
      <main
        className={`
          relative
          z-10
          pt-24
          md:pt-28
          pb-32
          px-3
          sm:px-5
          lg:px-7

          transition-all

          ${
            sidebarOpen
              ? "xl:ml-[290px]"
              : "xl:ml-[96px]"
          }
        `}
      >
        <div className="max-w-[1850px] mx-auto">

          <div className="flex flex-col gap-6">

            {/* HERO */}
            <ReportsHero darkMode={darkMode} />

            {/* STATS */}
            <ReportStats darkMode={darkMode} />

            {/* 🔥 STICKY SEARCH WRAPPER (FIXED BEHAVIOUR) */}
            <div className="sticky top-[80px] z-50">
              <ReportSearch
                darkMode={darkMode}
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            {/* GRID */}
            <ReportGrid
              darkMode={darkMode}
              search={search}
              filter={filter}
            />

          </div>

        </div>
      </main>

      {/* MOBILE NAV */}
      <FloatingBottomNav darkMode={darkMode} />
    </div>
  );
};

export default MyReportsDashboard;