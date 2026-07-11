import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiRadio,
  FiAlertTriangle,
  FiMapPin,
  FiClock,
  FiActivity,
  FiLoader,
} from "react-icons/fi";

import { getNearbyReports } from "../../utils/api";

const timeAgo = (iso) => {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

// AI score (e.g. "72%") → same low/medium/high bands used across the app.
const severityFromScore = (scoreStr) => {
  const n = parseInt(scoreStr, 10) || 0;
  if (n >= 80) return "high";
  if (n >= 50) return "medium";
  return "low";
};

// "BREAKING" if it landed in the last 15 min, otherwise reflects real status.
const deriveType = (report) => {
  const minsAgo = report.createdAt
    ? (Date.now() - new Date(report.createdAt).getTime()) / 60000
    : Infinity;
  if (minsAgo <= 15) return "BREAKING";
  if (report.status === "Resolved") return "UPDATE";
  if (report.status === "In Progress") return "LIVE";
  return "ALERT";
};

const AlertsFeed = ({ darkMode }) => {
  // ── Real nearby reports from /api/reports/nearby — same source as
  // AlertsMap, capped to the 8 most recent for the ticker. ────────────
  const [rawReports, setRawReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  const fetchNearby = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNearbyReports();
      setRawReports((data.reports || []).slice(0, 8));
    } catch (e) {
      setError(e.message || "Failed to load alerts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  const alerts = rawReports.map((r) => ({
    type: deriveType(r),
    title: r.title,
    location: r.location,
    time: timeAgo(r.createdAt),
    severity: severityFromScore(r.score),
  }));

  useEffect(() => {
    if (alerts.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % alerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [alerts.length]);

  useEffect(() => {
    if (index >= alerts.length) setIndex(0);
  }, [alerts.length, index]);

  const current = alerts[index];

  const getColor = (type) => {
    switch (type) {
      case "BREAKING":
        return "text-red-500";
      case "LIVE":
        return "text-green-500";
      case "ALERT":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <section
      className={`
        relative border overflow-hidden
        ${
          darkMode
            ? "bg-[#0B1218] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* HEADER BAR */}
      <div
        className={`
          flex flex-wrap items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 border-b
          ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }
        `}
      >
        <FiRadio className="text-red-500 animate-pulse shrink-0" />

        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-red-500">
          Live Breaking Feed
        </span>

        <div className="ml-auto flex items-center gap-2 text-[10px] sm:text-xs opacity-70 shrink-0">
          <FiActivity className="text-green-500" />
          <span className="hidden sm:inline">Updating in real-time</span>
        </div>
      </div>

      {/* MAIN TICKER */}
      <div className="relative min-h-[150px] sm:min-h-[130px] overflow-hidden">
        {loading ? (
          <div className="min-h-[150px] sm:min-h-[130px] flex items-center justify-center gap-2 text-sm opacity-70 px-4 text-center">
            <FiLoader className="animate-spin shrink-0" />
            Loading live alerts...
          </div>
        ) : error ? (
          <div className="min-h-[150px] sm:min-h-[130px] flex flex-col items-center justify-center gap-2 text-sm opacity-70 px-4 text-center">
            <FiAlertTriangle className="text-red-400" />
            Couldn't load alerts.
            <button
              onClick={fetchNearby}
              className="text-green-500 underline text-xs font-semibold"
            >
              Try again
            </button>
          </div>
        ) : alerts.length === 0 ? (
          <div className="min-h-[150px] sm:min-h-[130px] flex flex-col items-center justify-center gap-2 text-sm opacity-70 px-4 text-center">
            <FiRadio className="text-green-500" />
            No active alerts right now — all clear.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-4 sm:p-5 lg:p-6 flex flex-col gap-2.5 sm:gap-3"
            >
              {/* TYPE + TIME */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`text-[11px] sm:text-xs font-bold tracking-[0.15em] ${getColor(
                    current.type
                  )}`}
                >
                  {current.type}
                </span>

                <div className="flex items-center gap-1 text-[11px] sm:text-xs opacity-60">
                  <FiClock />
                  {current.time}
                </div>
              </div>

              {/* TITLE */}
              <h2
                className={`text-base sm:text-lg lg:text-xl font-bold leading-snug break-words ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {current.title}
              </h2>

              {/* FOOTER INFO */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs opacity-70">
                <div className="flex items-center gap-1 min-w-0">
                  <FiMapPin className="shrink-0" />
                  <span className="truncate">{current.location}</span>
                </div>

                <div
                  className={`
                    px-2 py-1 border text-[10px] sm:text-xs shrink-0
                    ${
                      current.severity === "high"
                        ? "text-red-500 border-red-500/30"
                        : current.severity === "medium"
                        ? "text-yellow-500 border-yellow-500/30"
                        : "text-green-500 border-green-500/30"
                    }
                  `}
                >
                  {current.severity.toUpperCase()} PRIORITY
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* MINI TICKER STRIP */}
      {alerts.length > 0 && (
        <div
          className={`
            px-3.5 sm:px-4 py-2.5 sm:py-3 border-t flex gap-2 overflow-x-auto
            ${
              darkMode ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
            }
          `}
        >
          {alerts.map((a, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`
                cursor-pointer whitespace-nowrap px-2.5 sm:px-3 py-1 border text-[10px] sm:text-xs
                transition-all shrink-0
                ${
                  i === index
                    ? "bg-green-500 text-white border-green-500"
                    : darkMode
                    ? "border-white/10 text-gray-300"
                    : "border-gray-300 text-gray-600"
                }
              `}
            >
              {a.type}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AlertsFeed;