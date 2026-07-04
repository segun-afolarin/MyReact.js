import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShield, FiAward, FiTrendingUp, FiCheckCircle,
  FiMapPin, FiActivity, FiArrowUpRight,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const ProfileHero = ({ darkMode }) => {
  const { user } = useAuth();

  // Build initials from the real name — e.g. "Ada Okafor" → "AO"
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "NA";

  // Avatar image URL from API
  const avatarUrl = user?.avatar || null;

  // If avatar fails to load, fall back to initials
  const [imgError, setImgError] = useState(false);

  // Reset error if avatar URL changes (e.g. after upload)
  useEffect(() => {
    setImgError(false);
  }, [avatarUrl]);

  const stats = [
    { label: "Reports Submitted", value: "128"   },
    { label: "Reports Resolved",  value: "87"    },
    { label: "Lives Impacted",    value: "1,247" },
    { label: "Trust Score",       value: "96%"   },
  ];

  const heroContent = [
    { paragraph: "Every report you submit has the power to improve lives, strengthen communities, and bring real change where it matters most." },
    { paragraph: "Your voice is creating a more transparent Nigeria. Keep reporting, keep engaging, and keep driving accountability." },
    { paragraph: "Communities become safer when citizens take action. Every verified report moves your community one step forward." },
    { paragraph: "Real impact starts with people who refuse to ignore problems. Your contributions are helping turn concerns into solutions." },
    { paragraph: "Leadership is not a title—it is action. Every issue you raise helps build a stronger and more responsive nation." },
    { paragraph: "The reports you submit today can influence decisions, improve services, and create lasting change for thousands tomorrow." },
    { paragraph: "You are part of a growing movement of citizens transforming communities through transparency, responsibility, and action." },
    { paragraph: "Small actions create powerful outcomes. Every photo, report, and verification strengthens trust and drives progress." },
    { paragraph: "Your civic impact continues to grow. Stay active, stay engaged, and keep helping communities achieve meaningful results." },
    { paragraph: "The future of Nigeria is shaped by citizens who take action. Thank you for being one of the people making a difference." },
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) =>
        prev === heroContent.length - 1 ? 0 : prev + 1
      );
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        relative overflow-hidden border
        ${darkMode ? "bg-[#081019] border-white/10" : "bg-white border-gray-200"}
      `}
    >
      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* GLOW */}
      <div className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] bg-green-500/10 blur-[120px]" />

      <div className="relative z-10 p-5 sm:p-7 lg:p-10">
        <div className="flex flex-col xl:flex-row gap-8 xl:items-center xl:justify-between">

          {/* LEFT */}
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center">

            {/* AVATAR — real photo or initials fallback */}
            <div className="relative">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.35)]">
                {avatarUrl && !imgError ? (
                  <img
                    src={avatarUrl}
                    alt={user?.name || "Profile"}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-500 via-emerald-400 to-green-700 flex items-center justify-center text-4xl font-black text-white">
                    {initials}
                  </div>
                )}
              </div>
              <div className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-green-500 border-4 border-white dark:border-[#081019] flex items-center justify-center">
                <FiCheckCircle className="text-white" />
              </div>
            </div>

            {/* INFO */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-[0.2em]">
                <FiShield />
                Verified Citizen
              </div>

              {/* REAL NAME from signup */}
              <h1
                className={`
                  mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.06em]
                  ${darkMode ? "text-white" : "text-black"}
                `}
              >
                {user?.name || "Citizen"}
              </h1>

              {/* EMAIL — shown as subtitle */}
              {user?.email && (
                <p className={`mt-1 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {user.email}
                </p>
              )}

              {/* ROTATING PARAGRAPH */}
              <div className="mt-3 min-h-[95px] max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentHero}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7 }}
                    className={`text-base sm:text-lg leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {heroContent[currentHero].paragraph}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 border border-green-500/20 bg-green-500/5">
                  <FiMapPin />
                  {user?.state ? `${user.state}, Nigeria` : "Nigeria"}
                </div>
                <div className="flex items-center gap-2 px-3 py-2 border border-green-500/20 bg-green-500/5">
                  <FiAward />
                  Top 2% Contributor
                </div>
              </div>
            </div>
          </div>

          {/* SCORE PANEL */}
          <div className="xl:w-[420px] border border-green-500/20 bg-green-500/[0.04] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-green-500 font-black">
              Nation Aura Score
            </p>
            <div className="mt-4 flex items-center gap-3">
              <FiTrendingUp className="text-green-500 text-3xl" />
              <h2 className="text-6xl font-black tracking-tight">8,750</h2>
            </div>
            <p className={`mt-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Built from evidence quality, community trust, successful resolutions and verified impact.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase">National Rank</p>
                <h4 className="text-2xl font-black">#324</h4>
              </div>
              <FiArrowUpRight className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-10 grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className={`
                border p-5
                ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#F8FAF9] border-gray-200"}
              `}
            >
              <p className={`text-xs uppercase tracking-[0.2em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {item.label}
              </p>
              <h3 className="mt-3 text-4xl font-black tracking-tight">
                {item.value}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* LEGACY MESSAGE */}
        <div className="mt-8 border-l-4 border-green-500 pl-5">
          <div className="flex items-center gap-2 text-green-500 font-bold">
            <FiActivity />
            Your Civic Legacy
          </div>
          <p className={`mt-3 text-base sm:text-lg leading-relaxed max-w-4xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Every report submitted, every photo uploaded and every issue verified helps
            communities become safer, more transparent and more accountable. Your actions are
            creating measurable impact across Nigeria.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileHero;