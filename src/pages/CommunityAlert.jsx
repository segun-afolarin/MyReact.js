import { useState, useEffect } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FloatingBottomNav from "../components/dashboard/FloatingBottomNav";

import AlertsHero from "../components/community-alerts/AlertsHero";
import AlertsStatus from "../components/community-alerts/AlertsStatus";
import AlertsStats from "../components/community-alerts/AlertsStats";
import AlertsMap from "../components/community-alerts/AlertsMap";
import AlertsFeed from "../components/community-alerts/AlertsFeed";
import AlertsPulse from "../components/community-alerts/AlertsPulse";
import AlertsForecast from "../components/community-alerts/AlertsForecast";
import AlertsImprovements from "../components/community-alerts/AlertsImprovements";
import AlertsEmergency from "../components/community-alerts/AlertsEmergency";

const CommunityAlert = () => {
  const [darkMode, setDarkMode] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(
      typeof window !== "undefined"
        ? window.innerWidth >= 1280
        : true
    );

  const [mobileSidebar, setMobileSidebar] =
    useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

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
            ? "bg-[#050B11] text-white"
            : "bg-[#F4F7F6] text-black"
        }
      `}
    >
      {/* BACKGROUND EFFECTS */}
      <div
        className="
          absolute
          inset-0
          overflow-hidden
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            top-[-180px]
            left-[-120px]
            w-[420px]
            h-[420px]
            bg-green-500/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            top-[15%]
            right-[-180px]
            w-[420px]
            h-[420px]
            bg-green-400/10
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-220px]
            left-[20%]
            w-[350px]
            h-[350px]
            bg-emerald-500/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />
      </div>

      <DashboardHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
      />

      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
        darkMode={darkMode}
      />

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
          duration-500
          ${
            sidebarOpen
              ? "xl:ml-[290px]"
              : "xl:ml-[96px]"
          }
        `}
      >
        <div className="max-w-[1850px] mx-auto">
          <div className="flex flex-col gap-6">

            <AlertsHero
              darkMode={darkMode}
            />

            <AlertsStatus
              darkMode={darkMode}
            />

            <AlertsStats
              darkMode={darkMode}
            />

            <AlertsMap
              darkMode={darkMode}
            />

            <AlertsFeed
              darkMode={darkMode}
            />

            <AlertsPulse
              darkMode={darkMode}
            />

            <AlertsForecast
              darkMode={darkMode}
            />

            <AlertsImprovements
              darkMode={darkMode}
            />

            <AlertsEmergency
              darkMode={darkMode}
            />

          </div>
        </div>
      </main>

      <FloatingBottomNav
        darkMode={darkMode}
      />
    </div>
  );
};

export default CommunityAlert;