import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiShield, FiAlertTriangle, FiActivity } from "react-icons/fi";

import { getReportStats } from "../../utils/api";

const AlertsStatus = ({ darkMode }) => {
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

  const totalReports = stats?.totalReports ?? 0;
  const pending        = stats?.pending ?? 0;
  const resolved        = stats?.resolved ?? 0;
  const todayTotal       = stats?.todayTotal ?? 0;

  // There's no stored "risk score" field — this is a computed approximation,
  // not an extracted ground-truth value. Weighting: 70% how much of the
  // state's report backlog is still unresolved, 30% how much fresh report
  // activity came in today (capped once today's volume hits 10+, so a
  // single unusually busy day doesn't dominate the score). Adjust the
  // weights/cap here if you want the score to mean something different.
  const pendingRatio = totalReports > 0 ? pending / totalReports : 0;
  const activityFactor = Math.min(todayTotal / 10, 1);
  const riskScore = totalReports > 0 ? Math.round(pendingRatio * 70 + activityFactor * 30) : 0;

  const responseRate = totalReports > 0 ? Math.round((resolved / totalReports) * 100) : 0;

  const getStatus = () => {
    if (loading) return "—";
    if (riskScore <= 30) return "Low Risk";
    if (riskScore <= 70) return "Moderate Risk";
    return "High Risk";
  };

  const getColor = () => {
    if (riskScore <= 30) return "text-green-500";
    if (riskScore <= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getBarColor = () => {
    if (riskScore <= 30) return "from-green-500 to-emerald-600";
    if (riskScore <= 70) return "from-yellow-400 to-orange-500";
    return "from-red-500 to-red-700";
  };

  const displayValue = (n) => (loading ? "—" : `${n}`);
  const displayPercent = (n) => (loading ? "—%" : `${n}%`);

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

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        {/* LEFT SIDE */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center
                ${darkMode ? "bg-white/10" : "bg-gray-100"}
              `}
            >
              <FiShield className="text-green-500 text-lg sm:text-xl" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60">
                Community Safety Status
              </p>

              <h2 className="text-xl sm:text-2xl font-bold truncate">
                {getStatus()}
              </h2>
            </div>
          </div>

          <p
            className={`mt-3 sm:mt-4 text-[13px] sm:text-sm leading-relaxed ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            This score represents real-time risk levels in your community
            based on active alerts, citizen reports, and verified incidents
            within your location radius.
          </p>

          {/* WARNING TEXT */}
          {!loading && riskScore > 70 && (
            <div className="mt-4 flex items-start sm:items-center gap-2 text-red-500 text-[13px] sm:text-sm">
              <FiAlertTriangle className="shrink-0 mt-0.5 sm:mt-0" />
              <span>High alert activity detected in your area</span>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - SCORE VISUAL */}
        <div className="flex flex-col gap-4 min-w-0">

          {/* SCORE */}
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h1 className={`text-4xl sm:text-5xl font-black ${loading ? (darkMode ? "text-white" : "text-black") : getColor()}`}>
                {displayValue(riskScore)}
              </h1>
              <p className="text-xs sm:text-sm opacity-60">Risk Score / 100</p>
            </div>

            <div className="flex items-center gap-2 text-green-500 font-semibold text-sm sm:text-base shrink-0">
              <FiActivity />
              Live
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div
            className={`
              h-2.5 sm:h-3 w-full overflow-hidden
              ${darkMode ? "bg-white/10" : "bg-gray-200"}
            `}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${loading ? 0 : riskScore}%` }}
              transition={{ duration: 1.2 }}
              className={`h-full bg-gradient-to-r ${getBarColor()}`}
            />
          </div>

          {/* BREAKDOWN */}
          <div className="grid grid-cols-3 gap-2 mt-2">

            <div
              className={`p-2.5 sm:p-3 border min-w-0 ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="text-[10px] sm:text-xs opacity-60">Alerts</p>
              <p className="font-bold text-sm sm:text-base truncate">{displayValue(pending)}</p>
            </div>

            <div
              className={`p-2.5 sm:p-3 border min-w-0 ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="text-[10px] sm:text-xs opacity-60">Resolved</p>
              <p className="font-bold text-sm sm:text-base truncate">{displayValue(resolved)}</p>
            </div>

            <div
              className={`p-2.5 sm:p-3 border min-w-0 ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="text-[10px] sm:text-xs opacity-60">Response</p>
              <p className="font-bold text-sm sm:text-base truncate">{displayPercent(responseRate)}</p>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AlertsStatus;