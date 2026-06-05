import { motion } from "framer-motion";
import {
  FiActivity,
  FiRadio,
  FiAlertCircle,
  FiZap,
  FiClock,
} from "react-icons/fi";

const AlertsPulse = ({ darkMode }) => {
  const pulseData = {
    systemHealth: 94,
    liveReports: 12,
    processing: 5,
    responseRate: 89,
  };

  const pulses = [
    {
      label: "System Health",
      value: pulseData.systemHealth,
      icon: <FiActivity />,
      color: "text-green-500",
      bar: "from-green-500 to-emerald-600",
    },
    {
      label: "Live Reports",
      value: pulseData.liveReports,
      icon: <FiRadio />,
      color: "text-red-500",
      bar: "from-red-500 to-red-600",
    },
    {
      label: "Processing Queue",
      value: pulseData.processing,
      icon: <FiClock />,
      color: "text-yellow-500",
      bar: "from-yellow-400 to-orange-500",
    },
    {
      label: "Response Rate",
      value: `${pulseData.responseRate}%`,
      icon: <FiZap />,
      color: "text-emerald-500",
      bar: "from-emerald-500 to-green-600",
    },
  ];

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
          flex items-center gap-3 px-5 py-4 border-b
          ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }
        `}
      >
        <FiActivity className="text-green-500 animate-pulse text-xl" />

        <div>
          <h2 className="font-bold text-lg">Live Civic Pulse</h2>
          <p className="text-xs opacity-60">
            Real-time system activity heartbeat
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-green-500">
          <FiRadio />
          LIVE
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pulses.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`
              border p-4 transition-all
              ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >
            {/* ICON + LABEL */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xl ${item.color}`}>
                {item.icon}
              </span>

              <p className="text-xs opacity-60">{item.label}</p>
            </div>

            {/* VALUE */}
            <h3
              className={`text-2xl font-black ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {item.value}
            </h3>

            {/* PULSE BAR */}
            <div
              className={`
                mt-3 h-2 w-full overflow-hidden
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
        ))}
      </div>

      {/* FOOTER SIGNAL STRIP */}
      <div
        className={`
          px-5 py-3 border-t flex items-center gap-2 text-xs
          ${
            darkMode
              ? "border-white/10 bg-white/5 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }
        `}
      >
        <FiZap className="text-yellow-500 animate-pulse" />

        <span>
          System actively processing civic data streams across Maiduguri
          region in real time
        </span>
      </div>
    </motion.section>
  );
};

export default AlertsPulse;