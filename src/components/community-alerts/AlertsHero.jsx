import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiArrowUpRight,
  FiActivity,
  FiZap,
  FiMapPin,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { getReportStats } from "../../utils/api";

const AlertsHero = ({ darkMode }) => {
  const { user } = useAuth();
  const userState = user?.state?.trim();
  const regionName = userState || "your area";

  // ── Live, state-scoped stats from /api/reports/stats — same source
  // as the rest of the dashboard. ──────────────────────────────────────
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

  const totalReports = stats?.totalReports ?? 0;
  const resolved       = stats?.resolved ?? 0;
  const pending         = stats?.pending ?? 0; // "Active" = not yet resolved
  const topCategory     = stats?.topCategory;
  const totalGrowth     = stats?.totalGrowth ?? 0;

  // "Response" tile and the right-panel "Alert Response Efficiency" score
  // are the same underlying metric (resolved share of total) — kept as a
  // single source so the two numbers can never drift apart on screen.
  const responseRate = totalReports > 0 ? Math.round((resolved / totalReports) * 100) : 0;

  const displayValue = (n) => (loading ? "—" : `${n}`);
  const displayPercent = (n) => (loading ? "—%" : `${n}%`);

  const stats3 = [
    {
      title: "Active Alerts",
      value: displayValue(pending),
    },
    {
      title: "Resolved",
      value: displayValue(resolved),
    },
    {
      title: "Response",
      value: displayPercent(responseRate),
    },
  ];

  const aiInsightText =
    topCategory && totalGrowth !== 0
      ? `${topCategory} alerts ${totalGrowth >= 0 ? "increased" : "decreased"} by ${Math.abs(totalGrowth)}% in ${regionName} this week.`
      : topCategory
      ? `${topCategory} is the most common alert type in ${regionName} this week.`
      : `Monitoring community alerts across ${regionName}.`;

  const heroContent = [
    {
      title1: "Community",
      title2: "Alerts Live",
      paragraph: `Real-time civic alerts from ${regionName}. Track emergencies, infrastructure issues, and community reports as they happen around your location.`,
    },
    {
      title1: "Stay",
      title2: "Informed",
      paragraph:
        "Monitor verified reports, safety updates, and infrastructure issues happening within your community in real-time.",
    },
    {
      title1: "Your Area",
      title2: "Intelligence",
      paragraph:
        "AI-powered civic monitoring detects risks, highlights urgent issues, and improves response speed across your locality.",
    },
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) =>
        prev === heroContent.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? "bg-[#0B1218] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22c55e 1px, transparent 1px),
            linear-gradient(to bottom, #22c55e 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* GLOW */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl"
      />

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 sm:gap-6">

          {/* LEFT SIDE */}
          <div className="min-w-0">

            {/* LIVE BADGE */}
            <motion.div
              className={`
                inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 mb-4 sm:mb-5 border
                ${
                  darkMode
                    ? "bg-green-500/10 border-green-500/20 text-green-300"
                    : "bg-green-50 border-green-200 text-green-700"
                }
              `}
            >
              <span className="w-2.5 h-2.5 shrink-0 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em]">
                Live Community Alerts
              </span>
            </motion.div>

            {/* TITLE */}
            <div className="min-h-[170px] sm:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h1
                    className={`text-[34px] sm:text-[60px] lg:text-[72px] font-black leading-[0.95] sm:leading-[0.92] break-words ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <span className="block">
                      {heroContent[currentHero].title1}
                    </span>

                    <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                      {heroContent[currentHero].title2}
                    </span>
                  </h1>

                  <p
                    className={`mt-4 sm:mt-5 max-w-2xl text-[13px] sm:text-base leading-relaxed ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {heroContent[currentHero].paragraph}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STATS */}
            <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {stats3.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className={`
                    border p-2.5 sm:p-4 transition min-w-0
                    ${
                      darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-50 border-gray-200"
                    }
                  `}
                >
                  <h3
                    className={`text-lg sm:text-2xl font-black truncate ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {item.value}
                  </h3>
                  <p
                    className={`text-[10px] sm:text-xs mt-1 leading-tight ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/SubmitReport"
                className="w-full sm:w-auto min-h-[46px] px-6 py-3 bg-green-600 text-white font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Report Alert <FiArrowUpRight />
              </Link>

              <Link
                to="/track"
                className={`
                  w-full sm:w-auto min-h-[46px] px-6 py-3 border font-semibold flex items-center justify-center text-sm sm:text-base
                  ${
                    darkMode
                      ? "border-white/10 text-white"
                      : "border-gray-200 text-black"
                  }
                `}
              >
                Track Alerts
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            className={`
              border p-4 sm:p-5 min-w-0
              ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60">
                  System Status
                </p>
                <h3 className="text-lg sm:text-xl font-bold mt-1 truncate">
                  Community Health
                </h3>
              </div>

              <FiActivity className="text-green-500 text-xl sm:text-2xl shrink-0" />
            </div>

            {/* SCORE */}
            <div className="mt-5 sm:mt-6">
              <h2 className="text-4xl sm:text-5xl font-black">
                {loading ? "—" : `${responseRate}%`}
              </h2>
              <p className="text-xs sm:text-sm opacity-60 mt-1">
                Alert Response Efficiency
              </p>

              <div className="h-2.5 sm:h-3 mt-4 bg-gray-200 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${loading ? 0 : responseRate}%` }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>

            {/* AI INSIGHT */}
            <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 border bg-green-500/10 border-green-500/20">
              <div className="flex gap-3">
                <FiZap className="text-green-500 text-lg sm:text-xl shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base">AI Insight</h4>
                  <p className="text-[13px] sm:text-sm opacity-70 mt-1 leading-relaxed">
                    {loading ? "Analyzing recent activity..." : aiInsightText}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default AlertsHero;