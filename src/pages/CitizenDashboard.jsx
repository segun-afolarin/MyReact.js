import { useState, useEffect } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FloatingBottomNav from "../components/dashboard/FloatingBottomNav";

import DashboardWelcome from "../components/dashboard/DashboardWelcome";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardMap from "../components/dashboard/DashboardMap";
import DashboardReports from "../components/dashboard/DashboardReports";
import DashboardInsights from "../components/dashboard/DashboardInsights";
import DashboardActivity from "../components/dashboard/DashboardActivity";

const CitizenDashboard = () => {
  const [darkMode, setDarkMode] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  /* DARK MODE */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );
    }
  }, [darkMode]);

  return (
    <div
      className={`
      relative
      min-h-screen
      overflow-hidden
      transition-all
      duration-500
      ${
        darkMode
          ? "bg-[#071017] text-white"
          : "bg-[#F3F5F7] text-black"
      }
      `}
    >
      {/* GLOBAL BACKGROUND */}
      <div
        className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
        "
      >
        {/* TOP GLOW */}
        <div
          className="
          absolute
          top-[-200px]
          left-[-120px]
          w-[420px]
          h-[420px]
          bg-green-500/10
          blur-3xl
          rounded-full
          "
        />

        {/* RIGHT GLOW */}
        <div
          className="
          absolute
          top-[20%]
          right-[-140px]
          w-[360px]
          h-[360px]
          bg-emerald-500/10
          blur-3xl
          rounded-full
          "
        />

        {/* GRID */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:80px_80px]
          "
        />
      </div>

      {/* HEADER */}
      <DashboardHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* SIDEBAR */}
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
      />

      {/* MAIN */}
      <main
        className={`
        relative
        z-10
        transition-all
        duration-500
        pt-28
        pb-32
        px-4
        sm:px-6
        lg:px-8
        ${
          sidebarOpen
            ? "lg:ml-[290px]"
            : "lg:ml-[110px]"
        }
        `}
      >
        {/* WRAPPER */}
        <div
          className="
          max-w-[1700px]
          mx-auto
          space-y-8
          "
        >
          {/* HERO */}
          <DashboardWelcome
            darkMode={darkMode}
          />

          {/* STATS */}
          <DashboardStats
            darkMode={darkMode}
          />

          {/* MAP + INSIGHTS */}
          <section
            className="
            grid
            grid-cols-1
            2xl:grid-cols-[1.35fr_0.65fr]
            gap-6
            items-start
            "
          >
            {/* MAP */}
            <div className="min-w-0">
              <DashboardMap
                darkMode={darkMode}
              />
            </div>

            {/* INSIGHTS */}
            <div
              className="
              min-w-0
              2xl:sticky
              2xl:top-28
              self-start
              "
            >
              <DashboardInsights
                darkMode={darkMode}
              />
            </div>
          </section>

          {/* REPORTS + ACTIVITY */}
          <section
            className="
            grid
            grid-cols-1
            2xl:grid-cols-[1fr_0.42fr]
            gap-6
            items-start
            "
          >
            {/* REPORTS */}
            <div className="min-w-0">
              <DashboardReports
                darkMode={darkMode}
              />
            </div>

            {/* ACTIVITY */}
            <div
              className="
              min-w-0
              self-start
              "
            >
              <DashboardActivity
                darkMode={darkMode}
              />
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE NAV */}
      <FloatingBottomNav
        darkMode={darkMode}
      />
    </div>
  );
};

export default CitizenDashboard;