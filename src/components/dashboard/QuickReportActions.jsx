import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FiCloudRain,
  FiAlertTriangle,
  FiDroplet,
  FiZap,
  FiArrowUpRight,
  FiRadio,
  FiMapPin,
  FiActivity,
} from "react-icons/fi";

import { getReportStats } from "../../utils/api";

// Category definitions kept separate from live counts: title, icon, status
// badge, and the phrasing suffix are all stable design choices — only the
// number in front of each suffix is real data from the backend.
const REPORT_TYPE_DEFS = [
  {
    title: "Flooding",
    category: "Flooding",
    description:
      "Report flooded roads, rising water levels, and dangerous drainage overflow instantly.",
    icon: FiCloudRain,
    reportsSuffix: "Reports Today",
    status: "HIGH PRIORITY",
  },
  {
    title: "Bad Roads",
    category: "Bad Roads",
    description:
      "Help authorities detect potholes, damaged roads, and unsafe transport routes faster.",
    icon: FiAlertTriangle,
    reportsSuffix: "Active Reports",
    status: "URGENT",
  },
  {
    title: "Drain Blockage",
    category: "Drain Blockage",
    description:
      "Prevent environmental damage by reporting blocked drainage systems in your area.",
    icon: FiDroplet,
    reportsSuffix: "Monitoring Alerts",
    status: "LIVE TRACKING",
  },
  {
    title: "Power Failure",
    category: "Power Failure",
    description:
      "Track blackout zones, damaged poles, and unstable electricity infrastructure.",
    icon: FiZap,
    reportsSuffix: "Grid Issues",
    status: "CRITICAL",
  },
];

const QuickReportActions = ({
  darkMode,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userState = user?.state?.trim();
  const locationLabel = userState || "Nigeria";

  // ── Live today's counts from /api/reports/stats — scoped to the
  // user's own state, same as every other stats-driven component. ──────
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReportStats();
      setStats(data);
    } catch (e) {
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const todayTotal      = stats?.todayTotal ?? 0;
  const todayByCategory = stats?.todayByCategory ?? {};

  const reportTypes = REPORT_TYPE_DEFS.map((def) => ({
    ...def,
    count: todayByCategory[def.category] ?? 0,
  }));

  const displayCompact = (n) => {
    if (loading) return "—";
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return `${n}`;
  };

  return (
    <section className="relative mt-8 sm:mt-10">
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        xl:flex-row
        xl:items-end
        xl:justify-between
        gap-6
        mb-6
        sm:mb-8
        "
      >
        {/* LEFT */}
        <div className="max-w-2xl">
          {/* BADGE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className={`
            inline-flex
            items-center
            gap-3
            border
            px-3
            sm:px-4
            py-2
            mb-4
            backdrop-blur-xl
            ${
              darkMode
                ? `
                  bg-green-500/10
                  border-green-500/20
                  text-green-400
                `
                : `
                  bg-green-50
                  border-green-200
                  text-green-700
                `
            }
            `}
          >
            <div className="relative flex">
              <span
                className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                bg-green-400
                opacity-75
                "
              />

              <span
                className="
                relative
                inline-flex
                w-2
                h-2
                bg-green-500
                "
              />
            </div>

            <span
              className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              "
            >
              Smart Civic Reporting
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className={`
            text-[2rem]
            sm:text-[2.7rem]
            lg:text-[3.6rem]
            leading-[0.92]
            tracking-[-0.06em]
            font-black
            uppercase
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Report Issues
            <span
              className="
              block
              text-green-500
              "
            >
              Make Real Impact
            </span>
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.1,
            }}
            className={`
            mt-4
            max-w-xl
            text-[13px]
            sm:text-sm
            lg:text-base
            leading-relaxed
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
            `}
          >
            Every report helps improve
            safety, infrastructure, and
            emergency response across
            communities.
          </motion.p>
        </div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          className={`
          relative
          overflow-hidden
          border
          p-4
          sm:p-5
          w-full
          xl:max-w-[320px]
          backdrop-blur-xl
          ${
            darkMode
              ? `
                bg-[#09131B]
                border-white/10
              `
              : `
                bg-white
                border-gray-200
              `
          }
          `}
        >
          {/* TOP LINE */}
          <div
            className="
            absolute
            top-0
            left-0
            h-[2px]
            w-full
            bg-gradient-to-r
            from-green-500
            to-transparent
            "
          />

          {/* GLOW */}
          <div
            className="
            absolute
            top-[-40px]
            right-[-40px]
            w-[120px]
            h-[120px]
            bg-green-500/10
            blur-3xl
            "
          />

          <div
            className="
            relative
            z-10
            flex
            items-center
            justify-between
            gap-4
            "
          >
            <div>
              <p
                className={`
                text-[10px]
                uppercase
                tracking-[0.18em]
                ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                `}
              >
                Live Activity
              </p>

              <h3
                className={`
                mt-2
                text-[2rem]
                sm:text-[2.5rem]
                font-black
                tracking-[-0.05em]
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                {displayCompact(todayTotal)}
              </h3>

              <div
                className="
                mt-2
                flex
                items-center
                gap-2
                text-green-500
                text-xs
                font-semibold
                "
              >
                <FiRadio />

                Reports Submitted Today
              </div>
            </div>

            <div
              className="
              relative
              w-14
              h-14
              sm:w-16
              sm:h-16
              border
              border-green-500/20
              bg-green-500/10
              flex
              items-center
              justify-center
              text-green-400
              text-xl
              sm:text-2xl
              shrink-0
              "
            >
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="
                absolute
                inset-0
                bg-green-500/10
                "
              />

              <FiActivity className="relative z-10" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* GRID */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        2xl:grid-cols-4
        gap-4
        sm:gap-5
        "
      >
        {reportTypes.map(
          (item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                className={`
                group
                relative
                overflow-hidden
                border
                p-5
                sm:p-6
                transition-all
                duration-500
                cursor-pointer
                ${
                  darkMode
                    ? `
                      bg-[#09131B]
                      border-white/10
                      hover:border-green-500/20
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
                  bg-[size:40px_40px]
                  "
                />

                {/* HOVER GLOW */}
                <div
                  className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
                  bg-gradient-to-br
                  from-green-500/5
                  via-transparent
                  to-transparent
                  "
                />

                {/* TOP */}
                <div
                  className="
                  relative
                  z-10
                  flex
                  items-start
                  justify-between
                  gap-4
                  "
                >
                  {/* ICON */}
                  <motion.div
                    whileHover={{
                      rotate: -6,
                    }}
                    className={`
                    relative
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    border
                    flex
                    items-center
                    justify-center
                    text-green-400
                    text-2xl
                    sm:text-3xl
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                        `
                        : `
                          bg-gray-50
                          border-gray-200
                        `
                    }
                    `}
                  >
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.45, 0.2],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                      }}
                      className="
                      absolute
                      inset-0
                      bg-green-500/10
                      blur-2xl
                      "
                    />

                    <Icon className="relative z-10" />
                  </motion.div>

                  {/* STATUS */}
                  <div
                    className={`
                    px-3
                    py-1.5
                    border
                    text-[9px]
                    sm:text-[10px]
                    font-black
                    tracking-[0.18em]
                    uppercase
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                          text-gray-300
                        `
                        : `
                          bg-gray-100
                          border-gray-200
                          text-gray-700
                        `
                    }
                    `}
                  >
                    {item.status}
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className="
                  relative
                  z-10
                  mt-7
                  "
                >
                  <h3
                    className={`
                    text-[1.9rem]
                    sm:text-[2.2rem]
                    font-black
                    tracking-[-0.05em]
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`
                    mt-3
                    text-[13px]
                    sm:text-sm
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }
                    `}
                  >
                    {item.description}
                  </p>
                </div>

                {/* INFO */}
                <div
                  className="
                  relative
                  z-10
                  mt-6
                  flex
                  items-center
                  justify-between
                  gap-3
                  flex-wrap
                  "
                >
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-green-500
                    text-xs
                    sm:text-sm
                    font-semibold
                    "
                  >
                    <FiRadio />

                    {displayCompact(item.count)} {item.reportsSuffix}
                  </div>

                  <div
                    className={`
                    flex
                    items-center
                    gap-2
                    text-[11px]
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                    `}
                  >
                    <FiMapPin />

                    {locationLabel}
                  </div>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    navigate("/report", {
                      state: {
                        selectedCategory:
                          item.category,
                      },
                    })
                  }
                  className="
                  relative
                  z-10
                  mt-7
                  w-full
                  h-12
                  sm:h-14
                  overflow-hidden
                  bg-green-500
                  hover:bg-green-400
                  text-white
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-[11px]
                  sm:text-xs
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition-all
                  duration-300
                  "
                >
                  {/* SHINE */}
                  <motion.div
                    animate={{
                      x: [
                        "-100%",
                        "100%",
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                    }}
                    className="
                    absolute
                    inset-0
                    bg-white/10
                    skew-x-12
                    "
                  />

                  <span className="relative z-10">
                    Start Report
                  </span>

                  <FiArrowUpRight className="relative z-10 text-base" />
                </motion.button>

                {/* BOTTOM LINE */}
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "100%",
                  }}
                  transition={{
                    delay:
                      0.4 + index * 0.08,
                    duration: 1,
                  }}
                  className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  bg-gradient-to-r
                  from-green-500
                  to-transparent
                  "
                />
              </motion.div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default QuickReportActions;