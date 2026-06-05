import { motion } from "framer-motion";
import { FiMapPin, FiAlertTriangle, FiNavigation } from "react-icons/fi";

const AlertsMap = ({ darkMode }) => {
  const locations = [
    {
      name: "Gwange",
      type: "high",
      alerts: 3,
      color: "red",
    },
    {
      name: "Bolori",
      type: "medium",
      alerts: 2,
      color: "yellow",
    },
    {
      name: "Maiduguri North",
      type: "low",
      alerts: 1,
      color: "green",
    },
    {
      name: "Custom Area",
      type: "medium",
      alerts: 2,
      color: "yellow",
    },
  ];

  const getColorClass = (color) => {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-500";
      case "green":
        return "bg-green-500";
      default:
        return "bg-blue-500";
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
          flex items-center justify-between px-5 py-4 border-b
          ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }
        `}
      >
        <div className="flex items-center gap-3">
          <FiMapPin className="text-green-500 text-xl" />
          <div>
            <h2 className="font-bold text-lg">Community Alert Map</h2>
            <p className="text-xs opacity-60">
              Live incident distribution across your area
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-500">
          <FiNavigation />
          Live Tracking Enabled
        </div>
      </div>

      {/* MAP AREA (SIMULATED INTELLIGENCE GRID) */}
      <div className="relative h-[420px] sm:h-[480px] overflow-hidden">

        {/* GRID BACKGROUND */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #22c55e 1px, transparent 1px),
              linear-gradient(to bottom, #22c55e 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* CENTER PULSE */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/20"
        />

        {/* LOCATION POINTS */}
        {locations.map((loc, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="absolute"
            style={{
              top: `${20 + i * 18}%`,
              left: `${20 + i * 15}%`,
            }}
          >
            {/* PING EFFECT */}
            <span
              className={`
                absolute inline-flex h-6 w-6 rounded-full opacity-75 animate-ping
                ${getColorClass(loc.color)}
              `}
            />

            {/* DOT */}
            <span
              className={`
                relative flex h-4 w-4 rounded-full
                ${getColorClass(loc.color)}
              `}
            />

            {/* LABEL */}
            <div
              className={`
                mt-2 px-2 py-1 border text-xs whitespace-nowrap
                ${
                  darkMode
                    ? "bg-[#0B1218] border-white/10 text-white"
                    : "bg-white border-gray-200 text-black"
                }
              `}
            >
              <div className="flex items-center gap-1 font-semibold">
                <FiAlertTriangle className="text-xs" />
                {loc.name}
              </div>

              <p className="opacity-70 text-[10px] mt-1">
                {loc.alerts} active alerts
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER LEGEND */}
      <div
        className={`
          px-5 py-4 border-t flex flex-wrap gap-4 text-xs
          ${
            darkMode
              ? "border-white/10 bg-white/5 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          High Risk
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          Medium Risk
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Low Risk
        </div>

        <div className="ml-auto opacity-70">
          Real-time civic intelligence mapping system
        </div>
      </div>
    </motion.section>
  );
};

export default AlertsMap;