import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiActivity,
  FiShield,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiMapPin,
  FiAlertTriangle,
  FiClock,
  FiLayers,
} from "react-icons/fi";

import { getReportStats } from "../../utils/api";

const formatCompact = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
};

const DashboardPageHeader = ({
  darkMode,
}) => {
  // ── Live stats from /api/reports/stats — same endpoint DashboardStats
  // and DashboardWelcome use, so all three panels stay in sync ──────────
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

  const stateName        = stats?.state;
  const totalReports     = stats?.totalReports ?? 0;
  const activeLocations  = stats?.activeLocations ?? 0;
  const resolved         = stats?.resolved ?? 0;
  const pending          = stats?.pending ?? 0;
  const verified         = stats?.verified ?? 0;
  const verifiedGrowth   = stats?.verifiedGrowth ?? 0;
  const avgResponseHours = stats?.avgResponseHours;
  const topCategory      = stats?.topCategory;

  // "Verification Accuracy" = share of this state's reports that have
  // passed the community-confirmation threshold (in_progress or resolved).
  const verificationRate = totalReports > 0 ? Math.round((verified / totalReports) * 100) : 0;

  const avgResponseLabel =
    avgResponseHours === null || avgResponseHours === undefined
      ? "—"
      : avgResponseHours < 1
      ? "<1h"
      : `${avgResponseHours}h`;

  const displayCompact = (n) => (loading ? "—" : formatCompact(n));
  const displayPercent = (n) => (loading ? "—%" : `${n}%`);

  const stats3 = [
    { title: "Reports",  value: displayCompact(totalReports) },
    { title: "Verified", value: displayCompact(verified) },
    { title: "Resolved", value: displayPercent(totalReports > 0 ? Math.round((resolved / totalReports) * 100) : 0) },
  ];

  const metrics = [
    { icon: <FiMapPin />,     label: "Active Zones",  value: loading ? "—" : `${activeLocations}` },
    { icon: <FiClock />,      label: "Avg Response",  value: loading ? "—" : avgResponseLabel },
    { icon: <FiCheckCircle />,label: "Resolved",      value: displayCompact(resolved) },
    { icon: <FiLayers />,     label: "Monitoring",    value: "Live" },
  ];

  // Priority alert reflects real pending load + the state's top category
  // this week, instead of a permanently-scary static message.
  const priorityAlert =
    !loading && pending > 0
      ? {
          text: topCategory
            ? `${pending} report${pending === 1 ? "" : "s"} — mostly ${topCategory.toLowerCase()} — ${pending === 1 ? "is" : "are"} still awaiting community verification before escalation to emergency response authorities.`
            : `${pending} report${pending === 1 ? "" : "s"} ${pending === 1 ? "is" : "are"} still awaiting community verification before escalation to emergency response authorities.`,
          calm: false,
        }
      : {
          text: stateName
            ? `No reports in ${stateName} are currently waiting on urgent verification.`
            : "No reports are currently waiting on urgent verification.",
          calm: true,
        };

  const heroContent = [
  {
    title1: "Community",
    title2: "Reports",
    paragraph:
      "View and confirm reports shared by people around your location. Help verify real community issues before they are officially forwarded to the government for awareness and action.",
  },

  {
    title1: "Live",
    title2: "Verification",
    paragraph:
      "Every report goes through a live community verification process and requires 5 user confirmations before it becomes fully verified and ready for government review.",
  },

  {
    title1: "Nearby",
    title2: "Incidents",
    paragraph:
      "Stay updated on flooding, damaged roads, power outages, abandoned projects, and other urgent incidents reported by citizens living around your area.",
  },

  {
    title1: "Citizens",
    title2: "Taking Action",
    paragraph:
      "Communities work together to confirm real incidents, improve transparency, and help important local problems reach the right authorities faster.",
  },
];

  const [currentHero, setCurrentHero] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) =>
        prev === heroContent.length - 1
          ? 0
          : prev + 1
      );
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className={`
      relative
      overflow-hidden
      border
      ${
        darkMode
          ? `
            bg-[#081018]
            border-white/10
          `
          : `
            bg-white
            border-gray-200
          `
      }
      `}
    >
      {/* GRID BACKGROUND */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        "
        style={{
          backgroundImage: `
          linear-gradient(to right, #22c55e 1px, transparent 1px),
          linear-gradient(to bottom, #22c55e 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
        absolute
        top-0
        right-0
        w-80
        h-80
        bg-green-500/10
        blur-3xl
        "
      />

      {/* TOP LINE */}
      <div
        className="
        absolute
        top-0
        left-0
        h-[2px]
        w-full
        bg-gradient-to-r
        from-transparent
        via-green-500
        to-transparent
        "
      />

      {/* CONTENT */}
      <div
        className="
        relative
        z-10
        p-5
        sm:p-6
        lg:p-8
        "
      >
        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-[1fr_360px]
          gap-6
          items-start
          "
        >
          {/* LEFT SIDE */}
          <div>
            {/* BADGE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className={`
              inline-flex
              items-center
              gap-3
              border
              px-4
              py-2
              mb-5
              ${
                darkMode
                  ? `
                    bg-green-500/10
                    border-green-500/20
                    text-green-300
                  `
                  : `
                    bg-green-50
                    border-green-200
                    text-green-700
                  `
              }
              `}
            >
              <span
                className="
                relative
                flex
                w-2.5
                h-2.5
                "
              >
                <span
                  className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  bg-green-400
                  "
                />

                <span
                  className="
                  relative
                  inline-flex
                  h-2.5
                  w-2.5
                  bg-green-500
                  "
                />
              </span>

              <span
                className="
                text-xs
                font-semibold
                tracking-[0.15em]
                uppercase
                "
              >
                Community Reports Network
              </span>
            </motion.div>

            {/* HERO CONTENT */}
            <div className="min-h-[230px] sm:min-h-[270px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                >
                  {/* TITLE */}
                  <motion.h1
                    className={`
                    text-[40px]
                    sm:text-[56px]
                    lg:text-[78px]
                    leading-[0.9]
                    tracking-[-0.07em]
                    font-black
                    break-words
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    <motion.span
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.1,
                      }}
                      className="block"
                    >
                      {
                        heroContent[currentHero]
                          .title1
                      }
                    </motion.span>

                    <motion.span
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.3,
                      }}
                      className="
                      block
                      mt-1
                      bg-gradient-to-r
                      from-green-400
                      via-emerald-500
                      to-green-600
                      bg-clip-text
                      text-transparent
                      "
                    >
                      {
                        heroContent[currentHero]
                          .title2
                      }
                    </motion.span>
                  </motion.h1>

                  {/* PARAGRAPH */}
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    className={`
                    mt-6
                    max-w-2xl
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
                    {
                      heroContent[currentHero]
                        .paragraph
                    }
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STATS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              className="
              mt-2
              grid
              grid-cols-3
              gap-3
              "
            >
              {stats3.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  className={`
                  relative
                  overflow-hidden
                  border
                  p-4
                  transition-all
                  duration-300
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                        hover:bg-white/[0.05]
                      `
                      : `
                        bg-[#FAFAFA]
                        border-gray-200
                        hover:bg-white
                      `
                  }
                  `}
                >
                  <div
                    className="
                    absolute
                    top-0
                    left-0
                    h-full
                    w-[2px]
                    bg-green-500
                    "
                  />

                  <h3
                    className={`
                    text-xl
                    sm:text-2xl
                    font-black
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
                    mt-1
                    text-xs
                    sm:text-sm
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }
                    `}
                  >
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.5,
            }}
            className={`
            relative
            overflow-hidden
            border
            p-5
            ${
              darkMode
                ? `
                  bg-white/[0.03]
                  border-white/10
                `
                : `
                  bg-[#FAFAFA]
                  border-gray-200
                `
            }
            `}
          >
            {/* PANEL GLOW */}
            <div
              className="
              absolute
              top-[-60px]
              right-[-40px]
              w-40
              h-40
              bg-green-500/10
              blur-3xl
              "
            />

            {/* HEADER */}
            <div
              className="
              relative
              z-10
              flex
              items-center
              justify-between
              "
            >
              <div>
                <p
                  className={`
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }
                  `}
                >
                  Oversight Analytics
                </p>

                <h3
                  className={`
                  mt-2
                  text-2xl
                  font-black
                  leading-tight
                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                  `}
                >
                  Civic Monitoring
                  <span className="block text-green-500">
                    Intelligence
                  </span>
                </h3>
              </div>

              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                w-14
                h-14
                bg-gradient-to-br
                from-green-600
                to-emerald-700
                text-white
                flex
                items-center
                justify-center
                text-xl
                shadow-[0_10px_30px_rgba(34,197,94,0.35)]
                "
              >
                <FiActivity />
              </motion.div>
            </div>

            {/* RESPONSE SCORE */}
            <div className="relative z-10 mt-8">
              <div
                className="
                flex
                items-end
                justify-between
                "
              >
                <div>
                  <h2
                    className={`
                    text-5xl
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    {loading ? "—" : `${verificationRate}%`}
                  </h2>

                  <p
                    className={`
                    mt-2
                    text-sm
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }
                    `}
                  >
                    Verification Accuracy
                  </p>
                </div>

                <div
                  className={`
                  flex
                  items-center
                  gap-2
                  font-semibold
                  ${verifiedGrowth >= 0 ? "text-green-500" : "text-red-400"}
                  `}
                >
                  {verifiedGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}

                  {loading ? "—" : `${verifiedGrowth >= 0 ? "+" : ""}${verifiedGrowth}%`}
                </div>
              </div>

              {/* BAR */}
              <div
                className={`
                mt-5
                h-3
                overflow-hidden
                ${
                  darkMode
                    ? "bg-white/10"
                    : "bg-gray-200"
                }
                `}
              >
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${loading ? 0 : verificationRate}%`,
                  }}
                  transition={{
                    duration: 1.3,
                    delay: 0.8,
                  }}
                  className="
                  h-full
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-600
                  "
                />
              </div>
            </div>

            {/* METRICS */}
            <div
              className="
              relative
              z-10
              mt-6
              grid
              grid-cols-2
              gap-3
              "
            >
              {metrics.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                  }}
                  className={`
                  border
                  p-4
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
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
                    flex
                    items-center
                    gap-2
                    text-green-500
                    mb-3
                    "
                  >
                    {item.icon}

                    <span
                      className="
                      text-[11px]
                      uppercase
                      tracking-[0.15em]
                      font-bold
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  <h4
                    className={`
                    text-2xl
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    {item.value}
                  </h4>
                </motion.div>
              ))}
            </div>

            {/* PRIORITY ALERT */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className={`
              relative
              z-10
              mt-6
              border
              p-4
              ${
                priorityAlert.calm
                  ? darkMode
                    ? `bg-green-500/10 border-green-500/20`
                    : `bg-green-50 border-green-200`
                  : darkMode
                  ? `bg-amber-500/10 border-amber-500/20`
                  : `bg-amber-50 border-amber-200`
              }
              `}
            >
              <div
                className="
                flex
                items-start
                gap-4
                "
              >
                <div
                  className={`
                  w-11
                  h-11
                  shrink-0
                  text-white
                  flex
                  items-center
                  justify-center
                  ${priorityAlert.calm ? "bg-green-500" : "bg-amber-500"}
                  `}
                >
                  {priorityAlert.calm ? <FiShield /> : <FiAlertTriangle />}
                </div>

                <div>
                  <h4
                    className={`
                    font-bold
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    {priorityAlert.calm ? "All Clear" : "High Priority Activity"}
                  </h4>

                  <p
                    className={`
                    mt-2
                    text-sm
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-600"
                    }
                    `}
                  >
                    {loading ? "Checking current activity..." : priorityAlert.text}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardPageHeader;