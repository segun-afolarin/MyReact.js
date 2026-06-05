import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiArrowUpRight,
  FiActivity,
  FiZap,
  FiMapPin,
} from "react-icons/fi";

const AlertsHero = ({ darkMode }) => {
  const stats = [
    {
      title: "Active Alerts",
      value: "6",
    },
    {
      title: "Resolved",
      value: "18",
    },
    {
      title: "Response",
      value: "89%",
    },
  ];

  const heroContent = [
    {
      title1: "Community",
      title2: "Alerts Live",
      paragraph:
        "Real-time civic alerts from Gwange, Maiduguri. Track emergencies, infrastructure issues, and community reports as they happen around your location.",
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

      <div className="relative z-10 p-5 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

          {/* LEFT SIDE */}
          <div>

            {/* LIVE BADGE */}
            <motion.div
              className={`
                inline-flex items-center gap-3 px-4 py-2 mb-5 border
                ${
                  darkMode
                    ? "bg-green-500/10 border-green-500/20 text-green-300"
                    : "bg-green-50 border-green-200 text-green-700"
                }
              `}
            >
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                Live Community Alerts
              </span>
            </motion.div>

            {/* TITLE */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h1
                    className={`text-[42px] sm:text-[60px] lg:text-[72px] font-black leading-[0.92] ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <span className="block">
                      {heroContent[currentHero].title1}
                    </span>

                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-green-600">
                      {heroContent[currentHero].title2}
                    </span>
                  </h1>

                  <p
                    className={`mt-5 max-w-2xl text-sm sm:text-base ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {heroContent[currentHero].paragraph}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STATS */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className={`
                    border p-4 transition
                    ${
                      darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-gray-50 border-gray-200"
                    }
                  `}
                >
                  <h3
                    className={`text-2xl font-black ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {item.value}
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="mt-7 flex flex-col sm:flex-row gap-4">
              <Link
                to="/report"
                className="px-6 py-3 bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
              >
                Report Alert <FiArrowUpRight />
              </Link>

              <Link
                to="/track"
                className={`
                  px-6 py-3 border font-semibold flex items-center justify-center
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
              border p-5
              ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-60">
                  System Status
                </p>
                <h3 className="text-xl font-bold mt-1">
                  Community Health
                </h3>
              </div>

              <FiActivity className="text-green-500 text-2xl" />
            </div>

            {/* SCORE */}
            <div className="mt-6">
              <h2 className="text-5xl font-black">88%</h2>
              <p className="text-sm opacity-60 mt-1">
                Alert Response Efficiency
              </p>

              <div className="h-3 mt-4 bg-gray-200 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "88%" }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>

            {/* AI INSIGHT */}
            <div className="mt-6 p-4 border bg-green-500/10 border-green-500/20">
              <div className="flex gap-3">
                <FiZap className="text-green-500 text-xl" />
                <div>
                  <h4 className="font-bold">AI Insight</h4>
                  <p className="text-sm opacity-70 mt-1">
                    Road-related alerts increased in Gwange this week.
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