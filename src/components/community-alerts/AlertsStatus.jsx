import { motion } from "framer-motion";
import { FiShield, FiAlertTriangle, FiActivity } from "react-icons/fi";

const AlertsStatus = ({ darkMode }) => {
  // fake computed score (later you will connect API)
  const riskScore = 32; // lower = safer

  const getStatus = () => {
    if (riskScore <= 30) return "Low Risk";
    if (riskScore <= 70) return "Moderate Risk";
    return "High Risk";
  };

  const getColor = () => {
    if (riskScore <= 30) return "text-green-500";
    if (riskScore <= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getBarColor = () => {
    if (riskScore <= 30) return "from-green-500 to-emerald-600";
    if (riskScore <= 70) return "from-yellow-400 to-orange-500";
    return "from-red-500 to-red-700";
  };

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

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        {/* LEFT SIDE */}
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`
                w-12 h-12 flex items-center justify-center
                ${darkMode ? "bg-white/10" : "bg-gray-100"}
              `}
            >
              <FiShield className="text-green-500 text-xl" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60">
                Community Safety Status
              </p>

              <h2 className="text-2xl font-bold">
                {getStatus()}
              </h2>
            </div>
          </div>

          <p
            className={`mt-4 text-sm leading-relaxed ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            This score represents real-time risk levels in your community
            based on active alerts, citizen reports, and verified incidents
            within your location radius.
          </p>

          {/* WARNING TEXT */}
          {riskScore > 70 && (
            <div className="mt-4 flex items-center gap-2 text-red-500 text-sm">
              <FiAlertTriangle />
              High alert activity detected in your area
            </div>
          )}
        </div>

        {/* RIGHT SIDE - SCORE VISUAL */}
        <div className="flex flex-col gap-4">

          {/* SCORE */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className={`text-5xl font-black ${getColor()}`}>
                {riskScore}
              </h1>
              <p className="text-sm opacity-60">Risk Score / 100</p>
            </div>

            <div className="flex items-center gap-2 text-green-500 font-semibold">
              <FiActivity />
              Live
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div
            className={`
              h-3 w-full overflow-hidden
              ${darkMode ? "bg-white/10" : "bg-gray-200"}
            `}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ duration: 1.2 }}
              className={`h-full bg-gradient-to-r ${getBarColor()}`}
            />
          </div>

          {/* BREAKDOWN */}
          <div className="grid grid-cols-3 gap-2 mt-2">

            <div
              className={`p-3 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="text-xs opacity-60">Alerts</p>
              <p className="font-bold">6</p>
            </div>

            <div
              className={`p-3 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="text-xs opacity-60">Resolved</p>
              <p className="font-bold">18</p>
            </div>

            <div
              className={`p-3 border ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <p className="text-xs opacity-60">Response</p>
              <p className="font-bold">89%</p>
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AlertsStatus;