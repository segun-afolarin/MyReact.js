import { useState, useEffect } from "react";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import FloatingBottomNav from "../components/dashboard/FloatingBottomNav";

import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";
import QuickReportActions from "../components/dashboard/QuickReportActions";
import UserReportsQueue from "../components/dashboard/UserReportsQueue";

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
              gap-6
            "
          >
            {/* HERO */}
            <DashboardPageHeader
              darkMode={darkMode}
            />

            {/* COMMUNITY STATS */}
            <section
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-4
              "
            >
              {[
                {
                  title:
                    "Reports Awaiting Verification",
                  value: "214",
                  desc:
                    "Live community reports",
                },

                {
                  title:
                    "Reports Escalated",
                  value: "1,482",
                  desc:
                    "Forwarded to agencies",
                },

                {
                  title:
                    "Citizen Confirmations",
                  value: "9.4K",
                  desc:
                    "Community verifications",
                },

                {
                  title:
                    "AI Detection Accuracy",
                  value: "98%",
                  desc:
                    "Fraud prevention active",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                    relative
                    overflow-hidden
                    border
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
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
                  <div
                    className="
                      absolute
                      top-0
                      left-0
                      h-[2px]
                      w-full
                      bg-gradient-to-r
                      from-green-500
                      via-emerald-400
                      to-transparent
                    "
                  />

                  <p
                    className={`
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      font-bold
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {item.title}
                  </p>

                  <h3
                    className={`
                      mt-4
                      text-4xl
                      sm:text-5xl
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
                  </h3>

                  <p
                    className={`
                      mt-3
                      text-sm
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </section>

            {/* DIVIDER */}
            <div
              className="
                flex
                items-center
                gap-4
                py-2
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
                Community Reports
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

            {/* COMMUNITY REPORTS */}
            <UserReportsQueue
              darkMode={darkMode}
            />

            {/* QUICK ACTIONS */}
            <QuickReportActions
              darkMode={darkMode}
            />

            {/* COMMUNITY FOOTER */}
            <section
              className={`
                relative
                overflow-hidden
                border
                p-5
                sm:p-7
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

              {/* GLOW */}
              <div
                className="
                  absolute
                  right-[-100px]
                  top-[-100px]
                  w-[240px]
                  h-[240px]
                  bg-green-500/10
                  blur-[100px]
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  xl:flex-row
                  xl:items-center
                  xl:justify-between
                  gap-8
                "
              >
                {/* LEFT */}
                <div className="max-w-3xl">
                  <p
                    className={`
                      text-[10px]
                      sm:text-xs
                      uppercase
                      tracking-[0.3em]
                      font-black
                      ${
                        darkMode
                          ? "text-green-400"
                          : "text-green-700"
                      }
                    `}
                  >
                    Community Accountability
                  </p>

                  <h3
                    className={`
                      mt-4
                      text-3xl
                      sm:text-4xl
                      lg:text-5xl
                      leading-[0.95]
                      tracking-[-0.06em]
                      font-black
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                  >
                    Verified Reports
                    Drive Faster Action
                  </h3>

                  <p
                    className={`
                      mt-5
                      text-sm
                      sm:text-base
                      leading-relaxed
                      max-w-2xl
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                    `}
                  >
                    Citizens confirm
                    real-world incidents before
                    escalation. Stronger public
                    verification increases
                    transparency, visibility,
                    and government response.
                  </p>
                </div>

                {/* RIGHT */}
                <div
                  className="
                    grid
                    grid-cols-2
                    sm:grid-cols-4
                    xl:grid-cols-2
                    gap-4
                    w-full
                    xl:w-auto
                  "
                >
                  {[
                    {
                      title:
                        "Active Verifiers",
                      value: "5,284",
                    },

                    {
                      title:
                        "Reports Resolved",
                      value: "842",
                    },

                    {
                      title:
                        "Pending Escalation",
                      value: "129",
                    },

                    {
                      title:
                        "Trust Score",
                      value: "96%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`
                        border
                        p-4
                        min-w-[150px]
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
                          text-[10px]
                          uppercase
                          tracking-[0.2em]
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