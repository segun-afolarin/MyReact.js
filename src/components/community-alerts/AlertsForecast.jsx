import { motion } from "framer-motion";

import {
  FiCloudRain,
  FiAlertTriangle,
  FiTrendingUp,
  FiWind,
  FiActivity,
  FiMap,
} from "react-icons/fi";

const AlertsForecast = ({ darkMode }) => {
  const forecast = [
    {
      day: "Today",
      risk: 42,
      label: "Moderate Activity",
      icon: <FiActivity />,
      note: "Minor infrastructure disruptions expected in Gwange area.",
      color: "yellow",
    },
    {
      day: "Tomorrow",
      risk: 68,
      label: "Rising Risk",
      icon: <FiAlertTriangle />,
      note: "Increased likelihood of flooding due to rainfall patterns.",
      color: "orange",
    },
    {
      day: "2 Days",
      risk: 78,
      label: "High Alert",
      icon: <FiCloudRain />,
      note: "Heavy rainfall may impact drainage systems and roads.",
      color: "red",
    },
    {
      day: "3 Days",
      risk: 55,
      label: "Unstable Conditions",
      icon: <FiWind />,
      note: "Weather fluctuations may affect transportation routes.",
      color: "yellow",
    },
  ];

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
        <FiTrendingUp className="text-green-500 text-xl animate-pulse" />

        <div>
          <h2 className="font-bold text-lg">AI Civic Forecast</h2>
          <p className="text-xs opacity-60">
            Predictive analysis of community risk trends
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-green-500">
          <FiMap />
          Predictive Mode
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {forecast.map((item, i) => (
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
            {/* TOP */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold opacity-60">
                {item.day}
              </p>

              <span className="text-xl text-green-500">
                {item.icon}
              </span>
            </div>

            {/* RISK VALUE */}
            <h3
              className={`text-3xl font-black ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {item.risk}%
            </h3>

            {/* LABEL */}
            <p className="text-sm font-semibold mt-1 opacity-80">
              {item.label}
            </p>

            {/* NOTE */}
            <p className="text-xs mt-2 opacity-60 leading-relaxed">
              {item.note}
            </p>

            {/* BAR */}
            <div
              className={`
                mt-4 h-2 w-full overflow-hidden
                ${darkMode ? "bg-white/10" : "bg-gray-200"}
              `}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.risk}%` }}
                transition={{ duration: 1.2 }}
                className={`h-full bg-gradient-to-r ${getBarColor(
                  item.color
                )}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER INSIGHT */}
      <div
        className={`
          px-5 py-4 border-t flex items-center gap-3 text-xs
          ${
            darkMode
              ? "border-white/10 bg-white/5 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }
        `}
      >
        <FiAlertTriangle className="text-yellow-500 animate-pulse" />

        <span>
          AI models indicate increased civic stress levels in coastal and
          low-drainage zones over the next 72 hours.
        </span>
      </div>
    </motion.section>
  );
};

export default AlertsForecast;