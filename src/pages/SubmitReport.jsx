import { useState, useEffect } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FloatingBottomNav from "../components/dashboard/FloatingBottomNav";

import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";
import QuickReportActions from "../components/dashboard/QuickReportActions";
import UserReportsQueue from "../components/dashboard/UserReportsQueue";
import ReportsMap from "../components/dashboard/ReportsMap";
import NearbyIssues from "../components/dashboard/NearbyIssues";
import RecentReports from "../components/dashboard/RecentReports";


const SubmitReport = () => {
  /* DARK MODE */
  const [darkMode, setDarkMode] =
    useState(false);

  /* DESKTOP SIDEBAR */
  const [sidebarOpen, setSidebarOpen] =
    useState(
      typeof window !== "undefined"
        ? window.innerWidth >= 1280
        : true
    );

  /* MOBILE SIDEBAR */
  const [mobileSidebar, setMobileSidebar] =
    useState(false);

  /* DARK MODE EFFECT */
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
      {/* GLOBAL BACKGROUND */}
      <div
        className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
        "
      >
        {/* MAIN GLOW */}
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

        {/* RIGHT GLOW */}
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

        {/* BOTTOM GLOW */}
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

        {/* GRID */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:70px_70px]
          "
        />

        {/* TOP LINE */}
        <div
          className="
          absolute
          top-0
          left-0
          h-[1px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-green-500/40
          to-transparent
          "
        />
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

      {/* MAIN */}
      <main
        className={`
        relative
        z-10
        transition-all
        duration-500
        pt-24
        md:pt-28
        pb-32
        px-3
        sm:px-5
        lg:px-7
        ${
          sidebarOpen
            ? "xl:ml-[290px]"
            : "xl:ml-[96px]"
        }
        `}
      >
        {/* WRAPPER */}
        <div
          className="
          max-w-[1850px]
          mx-auto
          "
        >
          {/* PAGE FLOW */}
          <div
            className="
            flex
            flex-col
            gap-5
            sm:gap-6
            "
          >
            {/* HERO */}
            <DashboardPageHeader
              darkMode={darkMode}
            />

            {/* QUICK REPORT TYPES */}
            <QuickReportActions
              darkMode={darkMode}
            />

            {/* SECTION DIVIDER */}
            <div
              className="
              flex
              items-center
              gap-4
              py-1
              "
            >
              <div
                className="
                h-[1px]
                flex-1
                bg-gradient-to-r
                from-transparent
                via-green-500/30
                to-transparent
                "
              />

              <span
                className={`
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.35em]
                font-bold
                ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                `}
              >
                Citizen Reporting Pipeline
              </span>

              <div
                className="
                h-[1px]
                flex-1
                bg-gradient-to-r
                from-transparent
                via-green-500/30
                to-transparent
                "
              />
            </div>

            {/* USER REPORTS */}
            <section
              className="
              grid
              grid-cols-1
              gap-5
              "
            >
              <div className="min-w-0">
                <UserReportsQueue
                  darkMode={darkMode}
                />
              </div>
            </section>

            {/* MAP + ISSUES */}
            <section
              className="
              grid
              grid-cols-1
              2xl:grid-cols-[1.15fr_0.85fr]
              gap-5
              items-start
              "
            >
              {/* MAP */}
              <div
                className="
                min-w-0
                h-full
                "
              >
                <ReportsMap
                  darkMode={darkMode}
                />
              </div>

              {/* ISSUES */}
              <div
                className="
                min-w-0
                h-full
                "
              >
                <NearbyIssues
                  darkMode={darkMode}
                />
              </div>
            </section>

            {/* ANALYTICS */}
            <section
              className="
              grid
              grid-cols-1
              xl:grid-cols-[1fr_0.42fr]
              gap-5
              items-start
              "
            >
            </section>

            {/* FOOT STATUS */}
            <section
              className={`
              relative
              overflow-hidden
              border
              p-5
              sm:p-6
              ${
                darkMode
                  ? `
                    bg-[#081019]
                    border-white/10
                  `
                  : `
                    bg-white
                    border-gray-200
                  `
              }
              `}
            >
              {/* GRID */}
              <div
                className="
                absolute
                inset-0
                opacity-[0.03]
                bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
                bg-[size:45px_45px]
                "
              />

              <div
                className="
                relative
                z-10
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-6
                "
              >
                {/* LEFT */}
                <div className="max-w-2xl">
                  <p
                    className={`
                    text-[10px]
                    sm:text-xs
                    uppercase
                    tracking-[0.3em]
                    font-bold
                    ${
                      darkMode
                        ? "text-green-400"
                        : "text-green-700"
                    }
                    `}
                  >
                    NationAura Monitoring
                  </p>

                  <h3
                    className={`
                    mt-3
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl
                    leading-[1]
                    tracking-[-0.05em]
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    Every Report Creates
                    Real Civic Pressure
                  </h3>

                  <p
                    className={`
                    mt-4
                    text-sm
                    sm:text-base
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }
                    `}
                  >
                    Your reports are tracked,
                    verified by citizens,
                    analyzed by AI, and pushed
                    toward public visibility to
                    drive faster government
                    response.
                  </p>
                </div>

                {/* RIGHT */}
                <div
                  className="
                  grid
                  grid-cols-2
                  gap-4
                  w-full
                  lg:w-auto
                  "
                >
                  {[
                    {
                      title: "Pending Review",
                      value: "18",
                    },

                    {
                      title: "Verified Reports",
                      value: "42",
                    },

                    {
                      title: "AI Detection",
                      value: "98%",
                    },

                    {
                      title: "Response Rate",
                      value: "91%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`
                      border
                      p-4
                      min-w-[140px]
                      ${
                        darkMode
                          ? `
                            bg-white/[0.03]
                            border-white/10
                          `
                          : `
                            bg-[#F8FAF9]
                            border-gray-200
                          `
                      }
                      `}
                    >
                      <p
                        className={`
                        text-[11px]
                        uppercase
                        tracking-[0.18em]
                        ${
                          darkMode
                            ? "text-gray-500"
                            : "text-gray-400"
                        }
                        `}
                      >
                        {item.title}
                      </p>

                      <h4
                        className={`
                        mt-3
                        text-3xl
                        font-black
                        tracking-tight
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        `}
                      >
                        {item.value}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <FloatingBottomNav
        darkMode={darkMode}
      />
    </div>
  );
};

export default SubmitReport;