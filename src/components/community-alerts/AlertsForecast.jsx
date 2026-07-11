import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiCloudRain,
  FiAlertTriangle,
  FiTrendingUp,
  FiWind,
  FiActivity,
  FiMap,
} from "react-icons/fi";

import { getReportStats } from "../../utils/api";

// Risk tiers derived from real daily report volume relative to the state's
// own weekly max — not a prediction, a classification of what already
// happened. Adjust the thresholds/icons here if you want different bands.
const tierFor = (pct) => {
  if (pct >= 75) return { label: "High Activity", color: "red", icon: <FiCloudRain /> };
  if (pct >= 50) return { label: "Elevated Activity", color: "orange", icon: <FiAlertTriangle /> };
  if (pct >= 25) return { label: "Moderate Activity", color: "yellow", icon: <FiActivity /> };
  return { label: "Low Activity", color: "green", icon: <FiWind /> };
};

const DAY_LABELS = ["Today", "Yesterday", "2 Days Ago", "3 Days Ago"];

const AlertsForecast = ({ darkMode }) => {
  // ── Live, state-scoped stats from /api/reports/stats. weeklyTrend is
  // 7 daily counts, oldest → newest, so the last 4 entries (reversed) give
  // us Today/Yesterday/2 Days Ago/3 Days Ago. ─────────────────────────
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

  const stateName = stats?.state;
  const topCategory = stats?.topCategory;
  const weeklyTrend = stats?.weeklyTrend?.length === 7 ? stats.weeklyTrend : [0, 0, 0, 0, 0, 0, 0];

  const last4 = [...weeklyTrend.slice(3)].reverse(); // [today, yesterday, 2d ago, 3d ago]
  const maxWeek = Math.max(...weeklyTrend, 1);

  const trend = last4.map((count, i) => {
    const pct = Math.round((count / maxWeek) * 100);
    const tier = tierFor(pct);
    const note =
      i === 0
        ? `${count} report${count === 1 ? "" : "s"} submitted today${
            topCategory ? `, most involving ${topCategory.toLowerCase()}` : ""
          }.`
        : `${count} report${count === 1 ? "" : "s"} submitted this day.`;

    return {
      day: DAY_LABELS[i],
      risk: pct,
      count,
      label: tier.label,
      icon: tier.icon,
      note,
      color: tier.color,
    };
  });

  const getBarColor = (color) => {
    switch (color) {
      case "red":
        return "from-red-500 to-red-700";
      case "orange":
        return "from-orange-400 to-red-500";
      case "yellow":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-green-500 to-emerald-600";
    }
  };

  const footerText = topCategory
    ? `${topCategory} reports have been the most common issue in ${stateName || "your state"} this week.`
    : `Monitoring recent civic report activity in ${stateName || "your state"}.`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative border overflow-hidden
        ${
          darkMode
            ? "bg-[#0B1218] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* HEADER */}
      <div
        className={`
          flex flex-wrap items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b
          ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }
        `}
      >
        <FiTrendingUp className="text-green-500 text-lg sm:text-xl animate-pulse shrink-0" />

        <div className="min-w-0">
          <h2 className="font-bold text-base sm:text-lg">Recent Civic Activity</h2>
          <p className="text-[11px] sm:text-xs opacity-60">
            Real daily report volume{stateName ? ` in ${stateName}` : ""}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-[11px] sm:text-xs text-green-500 shrink-0">
          <FiMap />
          Live Data
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {(loading ? DAY_LABELS.map((day) => ({ day, risk: 0, label: "—", icon: <FiActivity />, note: "Loading...", color: "green" })) : trend).map(
          (item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className={`
                border p-3.5 sm:p-4 transition-all min-w-0
                ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50 border-gray-200"
                }
              `}
            >
              {/* TOP */}
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <p className="text-[11px] sm:text-xs font-semibold opacity-60">
                  {item.day}
                </p>

                <span className="text-lg sm:text-xl text-green-500 shrink-0">
                  {item.icon}
                </span>
              </div>

              {/* RISK VALUE */}
              <h3
                className={`text-2xl sm:text-3xl font-black ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {loading ? "—" : `${item.risk}%`}
              </h3>

              {/* LABEL */}
              <p className="text-[13px] sm:text-sm font-semibold mt-1 opacity-80">
                {item.label}
              </p>

              {/* NOTE */}
              <p className="text-[11px] sm:text-xs mt-2 opacity-60 leading-relaxed">
                {item.note}
              </p>

              {/* BAR */}
              <div
                className={`
                  mt-3.5 sm:mt-4 h-2 w-full overflow-hidden
                  ${darkMode ? "bg-white/10" : "bg-gray-200"}
                `}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${loading ? 0 : item.risk}%` }}
                  transition={{ duration: 1.2 }}
                  className={`h-full bg-gradient-to-r ${getBarColor(
                    item.color
                  )}`}
                />
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* FOOTER INSIGHT */}
      <div
        className={`
          px-4 sm:px-5 py-3 sm:py-4 border-t flex items-start sm:items-center gap-3 text-[11px] sm:text-xs
          ${
            darkMode
              ? "border-white/10 bg-white/5 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }
        `}
      >
        <FiAlertTriangle className="text-yellow-500 animate-pulse shrink-0 mt-0.5 sm:mt-0" />

        <span className="leading-relaxed">
          {loading ? "Analyzing recent activity..." : footerText}
        </span>
      </div>
    </motion.section>
  );
};

export default AlertsForecast;