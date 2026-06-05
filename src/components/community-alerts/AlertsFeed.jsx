import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiRadio,
  FiAlertTriangle,
  FiMapPin,
  FiClock,
  FiActivity,
} from "react-icons/fi";

const AlertsFeed = ({ darkMode }) => {
  const alerts = [
    {
      type: "BREAKING",
      title: "Flooding reported in Gwange due to heavy rainfall",
      location: "Gwange, Maiduguri",
      time: "Just now",
      severity: "high",
    },
    {
      type: "LIVE",
      title: "Power outage affecting multiple streets in Bolori",
      location: "Bolori Ward",
      time: "5 mins ago",
      severity: "medium",
    },
    {
      type: "UPDATE",
      title: "Road repair work started on Baga Road",
      location: "Maiduguri North",
      time: "12 mins ago",
      severity: "low",
    },
    {
      type: "ALERT",
      title: "Blocked drainage causing traffic delays",
      location: "Custom Area",
      time: "20 mins ago",
      severity: "medium",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % alerts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
          flex items-center gap-3 px-4 py-3 border-b
          ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }
        `}
      >
        <FiRadio className="text-red-500 animate-pulse" />

        <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-500">
          Live Breaking Feed
        </span>

        <div className="ml-auto flex items-center gap-2 text-xs opacity-70">
          <FiActivity className="text-green-500" />
          Updating in real-time
        </div>
      </div>

      {/* MAIN TICKER */}
      <div className="relative h-[140px] sm:h-[120px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="p-5 sm:p-6 flex flex-col gap-3"
          >
            {/* TYPE + TIME */}
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-bold tracking-[0.15em] ${getColor(
                  current.type
                )}`}
              >
                {current.type}
              </span>

              <div className="flex items-center gap-1 text-xs opacity-60">
                <FiClock />
                {current.time}
              </div>
            </div>

            {/* TITLE */}
            <h2
              className={`text-lg sm:text-xl font-bold leading-snug ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {current.title}
            </h2>

            {/* FOOTER INFO */}
            <div className="flex items-center justify-between text-xs opacity-70">
              <div className="flex items-center gap-1">
                <FiMapPin />
                {current.location}
              </div>

              <div
                className={`
                  px-2 py-1 border text-xs
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
      </div>

      {/* MINI TICKER STRIP */}
      <div
        className={`
          px-4 py-3 border-t flex gap-2 overflow-x-auto
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
              cursor-pointer whitespace-nowrap px-3 py-1 border text-xs
              transition-all
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
    </section>
  );
};

export default AlertsFeed;