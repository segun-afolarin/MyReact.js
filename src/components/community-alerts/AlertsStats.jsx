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

const AlertsStats = ({ darkMode }) => {
  const stats = [
    {
      title: "Active Alerts",
      value: "6",
      icon: <FiAlertCircle />,
      color: "text-red-500",
    },
    {
      title: "Resolved Cases",
      value: "18",
      icon: <FiCheckCircle />,
      color: "text-green-500",
    },
    {
      title: "Citizens Reached",
      value: "2.4K",
      icon: <FiUsers />,
      color: "text-blue-500",
    },
    {
      title: "Verified Reports",
      value: "91%",
      icon: <FiActivity />,
      color: "text-emerald-500",
    },
    {
      title: "Response Time",
      value: "12 min",
      icon: <FiClock />,
      color: "text-yellow-500",
    },
    {
      title: "Areas Covered",
      value: "Gwange + 4",
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
        p-5 sm:p-6 lg:p-7
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
      <div className="relative z-10 mb-6">
        <h2
          className={`text-xl sm:text-2xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Community Intelligence Overview
        </h2>

        <p
          className={`text-sm mt-1 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Real-time civic analytics based on live community reports and
          verified incident data.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`
              border p-4 transition-all duration-300
              ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-gray-50 border-gray-200 hover:bg-white"
              }
            `}
          >
            {/* ICON (LIVE UI ICON ONLY) */}
            <div className={`text-2xl mb-3 ${item.color}`}>
              {item.icon}
            </div>

            {/* VALUE */}
            <h3
              className={`text-2xl font-black ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {item.value}
            </h3>

            {/* TITLE */}
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

      {/* LIVE INSIGHT BAR */}
      <div
        className={`
          relative z-10 mt-6 p-4 border flex items-center gap-3
          ${
            darkMode
              ? "bg-green-500/10 border-green-500/20"
              : "bg-green-50 border-green-200"
          }
        `}
      >
        <FiTrendingUp className="text-green-500 text-xl" />

        <p
          className={`text-sm ${
            darkMode ? "text-green-300" : "text-green-700"
          }`}
        >
          Most reported issues are infrastructure-related in Gwange and
          surrounding communities this week.
        </p>
      </div>
    </motion.section>
  );
};

export default AlertsStats;