import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiAlertCircle,
  FiCheckCircle,
  FiUsers,
  FiActivity,
  FiClock,
  FiMapPin,
  FiTrendingUp,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import { getReportStats } from "../../utils/api";

const formatCompact = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
};

const AlertsStats = ({ darkMode }) => {
  const { user } = useAuth();
  const userState = user?.state?.trim();
  const regionName = userState || "your area";

  // ── Live, state-scoped stats from /api/reports/stats ────────────────
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

  const totalReports    = stats?.totalReports ?? 0;
  const pending           = stats?.pending ?? 0;
  const resolved           = stats?.resolved ?? 0;
  const verified            = stats?.verified ?? 0;
  const activeLocations     = stats?.activeLocations ?? 0;
  const activeVerifiers     = stats?.activeVerifiers ?? 0;
  const avgResponseHours    = stats?.avgResponseHours;
  const topCategory          = stats?.topCategory;

  const verificationRate = totalReports > 0 ? Math.round((verified / totalReports) * 100) : 0;

  const avgResponseLabel =
    avgResponseHours === null || avgResponseHours === undefined
      ? "—"
      : avgResponseHours < 1
      ? "<1h"
      : `${avgResponseHours}h`;

  const displayValue = (n) => (loading ? "—" : formatCompact(n));
  const displayPercent = (n) => (loading ? "—%" : `${n}%`);

  const insightText = topCategory
    ? `Most reported issues are ${topCategory.toLowerCase()} in ${regionName} this week.`
    : `Monitoring reported issues across ${regionName} this week.`;

  const statsList = [
    {
      title: "Active Alerts",
      value: displayValue(pending),
      icon: <FiAlertCircle />,
      color: "text-red-500",
    },
    {
      title: "Resolved Cases",
      value: displayValue(resolved),
      icon: <FiCheckCircle />,
      color: "text-green-500",
    },
    {
      // Nearest real metric to "reach" — distinct citizens who've actually
      // confirmed a report in-state, not impressions/views (nothing in the
      // schema tracks that).
      title: "Citizens Involved",
      value: displayValue(activeVerifiers),
      icon: <FiUsers />,
      color: "text-blue-500",
    },
    {
      title: "Verified Reports",
      value: displayPercent(verificationRate),
      icon: <FiActivity />,
      color: "text-emerald-500",
    },
    {
      title: "Avg. Resolution Time",
      value: loading ? "—" : avgResponseLabel,
      icon: <FiClock />,
      color: "text-yellow-500",
    },
    {
      title: "Areas Covered",
      value: loading ? "—" : `${activeLocations} Location${activeLocations === 1 ? "" : "s"}`,
      icon: <FiMapPin />,
      color: "text-purple-500",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative
        border
        p-4 sm:p-6 lg:p-7
        overflow-hidden
        ${
          darkMode
            ? "bg-[#0B1218] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* GRID BACKGROUND */}
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

      {/* HEADER */}
      <div className="relative z-10 mb-5 sm:mb-6">
        <h2
          className={`text-lg sm:text-2xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Community Intelligence Overview
        </h2>

        <p
          className={`text-[13px] sm:text-sm mt-1 leading-relaxed ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Real-time civic analytics based on live community reports and
          verified incident data.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {statsList.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`
              border p-3 sm:p-4 transition-all duration-300 min-w-0
              ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-gray-50 border-gray-200 hover:bg-white"
              }
            `}
          >
            {/* ICON (LIVE UI ICON ONLY) */}
            <div className={`text-xl sm:text-2xl mb-2 sm:mb-3 ${item.color}`}>
              {item.icon}
            </div>

            {/* VALUE */}
            <h3
              className={`text-lg sm:text-2xl font-black leading-tight break-words ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {item.value}
            </h3>

            {/* TITLE */}
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

      {/* LIVE INSIGHT BAR */}
      <div
        className={`
          relative z-10 mt-5 sm:mt-6 p-3.5 sm:p-4 border flex items-start sm:items-center gap-3
          ${
            darkMode
              ? "bg-green-500/10 border-green-500/20"
              : "bg-green-50 border-green-200"
          }
        `}
      >
        <FiTrendingUp className="text-green-500 text-lg sm:text-xl shrink-0 mt-0.5 sm:mt-0" />

        <p
          className={`text-[13px] sm:text-sm leading-relaxed ${
            darkMode ? "text-green-300" : "text-green-700"
          }`}
        >
          {loading ? "Analyzing recent activity..." : insightText}
        </p>
      </div>
    </motion.section>
  );
};

export default AlertsStats;