import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiAlertTriangle,
  FiTrendingUp,
  FiTool,
  FiMapPin,
  FiZap,
} from "react-icons/fi";

const AlertsImprovements = ({ darkMode }) => {
  const improvements = [
    {
      title: "Fix Drainage Blockages",
      priority: "High Priority",
      impact: "Reduces flood risk by 40%",
      location: "Gwange / Custom Area",
      icon: <FiAlertTriangle />,
      color: "text-red-500",
    },
    {
      title: "Improve Road Patching System",
      priority: "Medium Priority",
      impact: "Reduces accident reports by 25%",
      location: "Maiduguri North",
      icon: <FiTool />,
      color: "text-yellow-500",
    },
    {
      title: "Deploy Faster Response Teams",
      priority: "High Priority",
      impact: "Improves response time by 18%",
      location: "City-wide",
      icon: <FiZap />,
      color: "text-red-500",
    },
    {
      title: "Upgrade Community Reporting Channels",
      priority: "Low Priority",
      impact: "Increases reporting accuracy by 30%",
      location: "All Wards",
      icon: <FiCheckCircle />,
      color: "text-green-500",
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
        <FiTrendingUp className="text-green-500 text-xl animate-pulse" />

        <div>
          <h2 className="font-bold text-lg">AI Civic Improvements</h2>
          <p className="text-xs opacity-60">
            System-generated recommendations for community optimization
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-green-500">
          <FiMapPin />
          Policy Suggestions
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {improvements.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`
              border p-5 transition-all
              ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }
            `}
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-2xl ${item.color}`}>
                  {item.icon}
                </span>

                <div>
                  <h3
                    className={`font-bold ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs opacity-60 mt-1">
                    {item.location}
                  </p>
                </div>
              </div>

              <span
                className={`
                  text-xs px-2 py-1 border whitespace-nowrap
                  ${
                    item.priority === "High Priority"
                      ? "text-red-500 border-red-500/30"
                      : item.priority === "Medium Priority"
                      ? "text-yellow-500 border-yellow-500/30"
                      : "text-green-500 border-green-500/30"
                  }
                `}
              >
                {item.priority}
              </span>
            </div>

            {/* IMPACT */}
            <div
              className={`
                mt-4 p-3 border
                ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }
              `}
            >
              <p className="text-xs opacity-60">Expected Impact</p>
              <p className="text-sm font-semibold mt-1">
                {item.impact}
              </p>
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
        <FiCheckCircle className="text-green-500 animate-pulse" />

        <span>
          AI has identified 4 priority civic improvements based on real-time
          incident clustering and response inefficiencies.
        </span>
      </div>
    </motion.section>
  );
};

export default AlertsImprovements;