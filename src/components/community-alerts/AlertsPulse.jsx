import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiActivity,
  FiRadio,
  FiAlertCircle,
  FiZap,
  FiClock,
  FiWifiOff,
} from "react-icons/fi";

import { getReportStats } from "../../utils/api";

// Auto-refresh cadence for the "live" pulse. Fast enough to feel alive in a
// demo, gentle enough not to hammer the backend.
const POLL_MS = 20000;

// ── Smooth count-up animation: whenever `target` changes, this eases the
// displayed number from its previous value up/down to the new one instead
// of snapping — the thing that actually sells "live data" visually. ──────
const useCountUp = (target, duration = 900) => {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    const to = target;
    if (from === to) return;

    let raf;
    let start = null;

    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
      else fromRef.current = to;
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return display;
};

// Animated ECG-style waveform, purely decorative but gives the header a
// genuine "living system" heartbeat instead of a static pulse dot.
const HeartbeatLine = ({ ok }) => (
  <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="w-full h-6 sm:h-8">
    <motion.path
      d="M0,20 L60,20 L70,5 L80,35 L90,20 L140,20 L150,8 L160,32 L170,20 L300,20"
      fill="none"
      stroke={ok ? "#22c55e" : "#ef4444"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0.2 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

const RadarPing = ({ color }) => (
  <motion.span
    className="absolute inset-0 rounded-full"
    style={{ backgroundColor: color }}
    animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
  />
);

const AlertsPulse = ({ darkMode }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [tick, setTick] = useState(0); // forces re-render so "Xs ago" ticks live

  const fetchStats = useCallback(async () => {
    try {
      const data = await getReportStats();
      setStats(data);
      setOnline(true);
      setLastUpdated(Date.now());
    } catch (e) {
      setOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + auto-refresh polling — this is what actually makes it
  // "live" rather than a snapshot that only updates on page reload.
  useEffect(() => {
    fetchStats();
    const poll = setInterval(fetchStats, POLL_MS);
    return () => clearInterval(poll);
  }, [fetchStats]);

  // Ticks the "Updated Xs ago" label every second.
  useEffect(() => {
    const clock = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(clock);
  }, []);

  const stateName = stats?.state;
  const totalReports = stats?.totalReports ?? 0;
  const resolved = stats?.resolved ?? 0;
  const verified = stats?.verified ?? 0;
  const pending = stats?.pending ?? 0;
  const inProgress = stats?.inProgress ?? 0;

  const responseRate = totalReports > 0 ? Math.round((resolved / totalReports) * 100) : 0;
  const verificationRate = totalReports > 0 ? Math.round((verified / totalReports) * 100) : 0;

  // "System Health" is a computed composite (half response rate, half
  // verification rate) — not a stored field. If the last poll failed
  // outright, health reflects that the pipeline itself is down, since a
  // dashboard that can't reach its own API isn't "healthy" regardless of
  // the last-known numbers.
  const systemHealth = !online ? 0 : totalReports > 0 ? Math.round((responseRate + verificationRate) / 2) : 100;

  const secondsAgo = lastUpdated ? Math.max(0, Math.floor((Date.now() - lastUpdated) / 1000)) : null;
  const updatedLabel =
    secondsAgo === null ? "—" : secondsAgo < 1 ? "just now" : secondsAgo < 60 ? `${secondsAgo}s ago` : `${Math.floor(secondsAgo / 60)}m ago`;

  const pulses = [
    {
      label: "System Health",
      target: systemHealth,
      suffix: "%",
      icon: <FiActivity />,
      color: "text-green-500",
      dot: "#22c55e",
      bar: "from-green-500 to-emerald-600",
    },
    {
      label: "Live Reports",
      target: pending,
      suffix: "",
      icon: <FiRadio />,
      color: "text-red-500",
      dot: "#ef4444",
      bar: "from-red-500 to-red-600",
    },
    {
      label: "Processing Queue",
      target: inProgress,
      suffix: "",
      icon: <FiClock />,
      color: "text-yellow-500",
      dot: "#eab308",
      bar: "from-yellow-400 to-orange-500",
    },
    {
      label: "Response Rate",
      target: responseRate,
      suffix: "%",
      icon: <FiZap />,
      color: "text-emerald-500",
      dot: "#10b981",
      bar: "from-emerald-500 to-green-600",
    },
  ];

  const activeStreams = pending + inProgress;
  const footerText = online
    ? `${activeStreams} active civic data stream${activeStreams === 1 ? "" : "s"} being processed across ${
        stateName || "your state"
      } in real time.`
    : "Connection lost — retrying automatically...";

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
          relative overflow-hidden
          px-4 sm:px-5 py-3 sm:py-4 border-b
          ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }
        `}
      >
        {/* decorative heartbeat behind the header content */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none flex items-center">
          <HeartbeatLine ok={online} />
        </div>

        <div className="relative flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
            {online && <RadarPing color="#22c55e" />}
            <FiActivity className={`relative text-lg sm:text-xl ${online ? "text-green-500" : "text-red-500"}`} />
          </div>

          <div className="min-w-0">
            <h2 className="font-bold text-base sm:text-lg">Live Civic Pulse</h2>
            <p className="text-[11px] sm:text-xs opacity-60">
              Real-time system activity heartbeat
            </p>
          </div>

          <div className="ml-auto flex flex-col items-end gap-0.5 shrink-0">
            <div className={`flex items-center gap-2 text-[11px] sm:text-xs font-bold ${online ? "text-green-500" : "text-red-500"}`}>
              {online ? <FiRadio /> : <FiWifiOff />}
              {online ? "LIVE" : "OFFLINE"}
            </div>
            <span className="text-[10px] opacity-50">Updated {updatedLabel}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {pulses.map((item, i) => (
          <PulseCard key={item.label} item={item} loading={loading} darkMode={darkMode} index={i} />
        ))}
      </div>

      {/* FOOTER SIGNAL STRIP */}
      <div
        className={`
          px-4 sm:px-5 py-2.5 sm:py-3 border-t flex items-start sm:items-center gap-2 text-[11px] sm:text-xs
          ${
            darkMode
              ? "border-white/10 bg-white/5 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }
        `}
      >
        <FiZap className={`shrink-0 mt-0.5 sm:mt-0 ${online ? "text-yellow-500 animate-pulse" : "text-red-400"}`} />

        <span className="leading-relaxed">
          {loading ? "Connecting to live data stream..." : footerText}
        </span>
      </div>
    </motion.section>
  );
};

// Separate component so each card gets its own count-up hook instance and
// its own "flash on real data change" trigger (keyed on the raw target
// value, not the animating display value, so it only fires on genuine
// poll updates rather than every intermediate frame of the count-up).
const PulseCard = ({ item, loading, darkMode, index }) => {
  const displayValue = useCountUp(item.target);

  return (
    <motion.div
      key={item.target}
      initial={{ opacity: 0.4, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -5 }}
      className={`
        relative border p-3.5 sm:p-4 transition-all min-w-0
        ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-gray-50 border-gray-200"
        }
      `}
    >
      {/* ICON + LABEL */}
      <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
        <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
          {!loading && <RadarPing color={item.dot} />}
          <span className={`relative text-lg sm:text-xl ${item.color}`}>
            {item.icon}
          </span>
        </div>

        <p className="text-[11px] sm:text-xs opacity-60 truncate">{item.label}</p>
      </div>

      {/* VALUE */}
      <h3
        className={`text-xl sm:text-2xl font-black tabular-nums ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {loading ? "—" : `${displayValue}${item.suffix}`}
      </h3>

      {/* PULSE BAR */}
      <div
        className={`
          mt-2.5 sm:mt-3 h-2 w-full overflow-hidden
          ${darkMode ? "bg-white/10" : "bg-gray-200"}
        `}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`h-full bg-gradient-to-r ${item.bar}`}
        />
      </div>
    </motion.div>
  );
};

export default AlertsPulse;