// src/components/dashboard/DashboardStats.jsx

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { getReportStats } from "../../utils/api";

import {
  FiAlertTriangle,
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowUpRight,
  FiActivity,
  FiRadio,
  FiZap,
} from "react-icons/fi";

const DashboardStats = ({ darkMode }) => {
  const { user } = useAuth();

  // Read directly from the backend-hydrated user object in AuthContext.
  // AuthContext.refreshUser() re-fetches /user after LocationSetup saves,
  // so these values are always current — no localStorage involved.
  const userState   = user?.state?.trim();
  const userCountry = user?.country?.trim() || "Nigeria";
  const userAddress = user?.address?.trim();

  const regionLabel = userState
    ? `${userState}, ${userCountry}`
    : userAddress
    ? userAddress
    : "Setting up...";

  const locationReady = !!(userState || userAddress);

  // ── Live stats from /api/reports/stats ─────────────────────────────────
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReportStats();
      setStats(data);
    } catch (e) {
      // Stats are a nice-to-have for this hero section — fail quietly to
      // zeros rather than breaking the whole dashboard header.
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const totalReports    = stats?.totalReports ?? 0;
  const totalGrowth     = stats?.totalGrowth ?? 0;
  const activeLocations = stats?.activeLocations ?? 0;
  const resolved        = stats?.resolved ?? 0;
  const resolvedGrowth  = stats?.resolvedGrowth ?? 0;
  const pending         = stats?.pending ?? 0;
  const pendingGrowth   = stats?.pendingGrowth ?? 0;
  const topCategory     = stats?.topCategory;

  const weeklyTrend = stats?.weeklyTrend?.length ? stats.weeklyTrend : [0, 0, 0, 0, 0, 0, 0];
  const maxTrend = Math.max(...weeklyTrend, 1);
  const barHeights = weeklyTrend.map((v) =>
    v > 0 ? Math.max(Math.round((v / maxTrend) * 100), 15) : 4
  );

  const statsData = [
    {
      title: "Reports In Your Area",
      value: totalReports,
      growth: totalGrowth,
      description: userState
        ? `Infrastructure issues reported around ${userState}.`
        : "Infrastructure issues reported around your nearby communities.",
      icon: <FiAlertTriangle />,
    },
    {
      title: "Active Locations",
      value: activeLocations,
      growth: null,
      description: "Distinct communities with active reports in your state.",
      icon: <FiMapPin />,
    },
    {
      title: "Resolved Near You",
      value: resolved,
      growth: resolvedGrowth,
      description: "Successfully resolved infrastructure problems verified by citizens.",
      icon: <FiCheckCircle />,
    },
    {
      title: "Pending Reviews",
      value: pending,
      growth: pendingGrowth,
      description: "Reports currently under investigation and verification.",
      icon: <FiClock />,
    },
  ];

  const displayValue = (n) => (loading ? "—" : n.toLocaleString());

  return (
    <section className="relative mt-10 sm:mt-14 overflow-hidden bg-transparent">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${darkMode ? "opacity-[0.03]" : "opacity-[0.02]"}`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,197,94,${darkMode ? "0.12" : "0.08"}) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,197,94,${darkMode ? "0.12" : "0.08"}) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-[-250px] left-[-150px] w-[500px] h-[500px] bg-green-500/10 blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-[-250px] right-[-150px] w-[520px] h-[520px] bg-emerald-400/10 blur-[150px]"
        />
      </div>

      {/* HERO */}
      <div className="relative grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">

        {/* LEFT */}
        <div className="min-w-0">

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-3 px-5 py-3 border backdrop-blur-2xl ${
              darkMode ? "bg-white/[0.03] border-white/10" : "bg-white/80 border-gray-200"
            }`}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-green-500" />
            </span>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-black text-green-500">
              LIVE CIVIC INTELLIGENCE
            </p>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className={`mt-8 text-[38px] sm:text-[54px] lg:text-[72px] xl:text-[72px] leading-[0.82] tracking-[-0.1em] font-black pr-3 sm:pr-5 lg:pr-8 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <span className="block mb-2">Smarter</span>
            <span className="block mb-2 text-green-500">Cities.</span>
            <span className="block mb-2">Powered</span>
            <span className="block text-green-500">By Citizens.</span>
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
            className={`mt-7 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            NationAura transforms citizen reports into real-time infrastructure intelligence —
            helping communities detect, track, and solve civic problems faster using AI-powered monitoring.
          </motion.p>

          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden mt-9 border p-5 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_25px_120px_rgba(0,0,0,0.35)] ${
              darkMode
                ? "bg-[#050A07]/95 border-white/10"
                : "bg-white/95 border-gray-200"
            }`}
          >
            <div
              className="absolute top-0 right-0 w-24 h-24 bg-green-500 opacity-90"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-green-500" />
            <div
              className="absolute inset-0 opacity-[0.06] bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop')" }}
            />
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-[-20%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30"
            />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.05 }}
                    className="w-16 h-16 bg-green-500 flex items-center justify-center text-white text-2xl shadow-[0_20px_50px_rgba(34,197,94,0.4)]"
                  >
                    <FiActivity />
                  </motion.div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] font-black text-green-500">LIVE MONITORING</p>
                    <h3 className={`mt-1 text-xl sm:text-2xl font-black tracking-[-0.05em] uppercase ${darkMode ? "text-white" : "text-black"}`}>
                      Infrastructure Activity
                    </h3>
                  </div>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-3 border border-green-500/20 bg-green-500/10 text-green-500 text-[10px] uppercase tracking-[0.18em] font-black"
                >
                  <FiRadio />
                  SYSTEM ONLINE
                </motion.div>
              </div>

              <div className="mt-10">
                <motion.h2
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`text-[2.6rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-none tracking-[-0.08em] font-black ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {displayValue(totalReports)}
                </motion.h2>
                <div className="mt-5 inline-flex items-center gap-2 bg-green-500 px-5 py-3 text-white text-[10px] uppercase tracking-[0.2em] font-black shadow-[0_15px_40px_rgba(34,197,94,0.35)]">
                  {totalGrowth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                  {loading ? "—" : `${totalGrowth >= 0 ? "+" : ""}${totalGrowth}% THIS WEEK`}
                </div>
              </div>

              <p className={`mt-7 max-w-xl text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {userState
                  ? `Citizens across ${userState} are actively reporting road damage, flooding, power outages, and unsafe infrastructure conditions in real-time.`
                  : "Citizens across nearby communities are actively reporting road damage, flooding, power outages, and unsafe infrastructure conditions in real-time."}
              </p>

              <motion.a
                href="/live-intelligence"
                whileHover={{ x: 6, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-9 inline-flex items-center gap-3 bg-green-500 px-7 py-4 text-white text-sm font-black uppercase tracking-[0.08em] shadow-[0_20px_50px_rgba(34,197,94,0.35)]"
              >
                Open Live Intelligence
                <FiArrowUpRight className="text-lg" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 gap-6">

          {/* AI CARD */}
          <motion.div
            whileHover={{ y: -8 }}
            className={`relative overflow-hidden border p-7 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] ${
              darkMode ? "bg-[#050A07]/95 border-white/10" : "bg-white/95 border-gray-200"
            }`}
          >
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-green-500 opacity-90"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-16 h-16 bg-green-500 flex items-center justify-center text-white text-2xl"
                >
                  <FiZap />
                </motion.div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] font-black text-green-500">AI INSIGHT</p>
                  <h3 className={`mt-1 text-2xl font-black uppercase tracking-[-0.05em] ${darkMode ? "text-white" : "text-black"}`}>
                    Smart Detection
                  </h3>
                </div>
              </div>
              <p className={`mt-7 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {topCategory
                  ? `AI predicts a rising increase in ${topCategory.toLowerCase()} reports around your location based on real-time citizen activity.`
                  : "AI is monitoring real-time citizen activity to detect emerging infrastructure issues around your location."}
              </p>
              <div className="mt-10 flex items-end gap-2 h-28">
                {barHeights.map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    whileHover={{ scaleY: 1.08 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex-1 bg-gradient-to-t from-green-700 to-green-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* LOCATION CARD — reads live from AuthContext user */}
          <motion.div
            whileHover={{ y: -8 }}
            className="relative overflow-hidden bg-green-500 p-7 text-white shadow-[0_25px_100px_rgba(34,197,94,0.35)]"
          >
            <div
              className="absolute bottom-0 right-0 w-28 h-28 bg-black/20"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop')" }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-xl flex items-center justify-center text-2xl">
                  <FiMapPin />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/80">
                    CONNECTED REGION
                  </p>
                  {/* regionLabel comes straight from the backend-hydrated user object */}
                  <h3 className="mt-1 text-3xl font-black uppercase tracking-[-0.06em]">
                    {regionLabel}
                  </h3>
                </div>
              </div>

              <p className="mt-7 text-sm text-white/90 leading-relaxed">
                {locationReady
                  ? "GPS location synced successfully. Your dashboard is connected to nearby reports and real-time civic intelligence streams."
                  : "Complete your location setup to connect to nearby civic reports and intelligence streams."}
              </p>

              <motion.a
                href="/location-setup"
                whileHover={{ x: 5, scale: 1.03 }}
                className="mt-9 inline-flex items-center gap-3 bg-white px-6 py-4 text-sm font-black uppercase text-green-600"
              >
                {locationReady ? "Change Active Location" : "Set Up Location"}
                <FiArrowUpRight />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -10 }}
            className={`relative overflow-hidden border p-6 sm:p-7 min-h-[290px] transition-all duration-500 group backdrop-blur-2xl ${
              darkMode
                ? "bg-[#050A07]/95 border-white/10 hover:border-green-500/40"
                : "bg-white/95 border-gray-200 hover:border-green-300"
            }`}
          >
            <div
              className="absolute top-0 right-0 w-20 h-20 bg-green-500/80 opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-green-500 transition-all duration-700 group-hover:w-full" />
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-green-500/10 blur-[100px] opacity-0 transition-all duration-700 group-hover:opacity-100" />

            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.08 }}
                className="w-16 h-16 bg-green-500 flex items-center justify-center text-white text-2xl shadow-[0_15px_40px_rgba(34,197,94,0.35)]"
              >
                {stat.icon}
              </motion.div>

              <h2 className={`mt-8 text-[3.5rem] sm:text-[4.3rem] leading-none tracking-[-0.1em] font-black ${
                darkMode ? "text-white" : "text-black"
              }`}>
                {displayValue(stat.value)}
              </h2>

              {stat.growth !== null && (
                <div className="mt-4 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-3 text-green-500 text-[10px] uppercase tracking-[0.16em] font-black">
                  {stat.growth >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                  {loading ? "—" : `${stat.growth >= 0 ? "+" : ""}${stat.growth}% THIS WEEK`}
                </div>
              )}

              <h3 className={`mt-6 text-xl font-black uppercase tracking-[-0.05em] ${darkMode ? "text-white" : "text-black"}`}>
                {stat.title}
              </h3>

              <p className={`mt-4 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {stat.description}
              </p>
            </div>

            <div className="absolute bottom-0 right-4 text-[6rem] leading-none font-black text-green-500/[0.04]">
              0{index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;