import { motion } from "framer-motion";

import {
  FiActivity,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";

const AIHealthOverview = ({ darkMode }) => {
  const stats = [
    {
      label: "Community Health Score",
      value: "84%",
      icon: FiActivity,
      hint: "Overall civic data health",
    },
    {
      label: "Citizen Participation",
      value: "High",
      icon: FiUsers,
      hint: "Engagement level across reports",
    },
    {
      label: "Government Response",
      value: "Good",
      icon: FiShield,
      hint: "Average response performance",
    },
    {
      label: "Resolved Issues",
      value: "78%",
      icon: FiCheckCircle,
      hint: "Successfully completed reports",
    },
    {
      label: "Emerging Risks",
      value: "Moderate",
      icon: FiAlertTriangle,
      hint: "Detected problem patterns",
    },
    {
      label: "Trend Direction",
      value: "Improving",
      icon: FiTrendingUp,
      hint: "Overall trajectory of community",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        relative
        border
        overflow-hidden
        ${
          darkMode
            ? "bg-[#081019] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* GRID BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          top-[-100px]
          left-[-100px]
          w-[280px]
          h-[280px]
          bg-green-500/10
          blur-[120px]
        "
      />

      <div className="relative z-10 p-5 sm:p-7 lg:p-10">
        {/* HEADER */}
        <div className="mb-8">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              border
              border-green-500/20
              bg-green-500/5
              text-green-500
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
            "
          >
            <FiActivity />
            AI Community Overview
          </div>

          <h2
            className={`
              mt-4
              text-3xl
              sm:text-4xl
              font-black
              tracking-[-0.05em]
              ${darkMode ? "text-white" : "text-black"}
            `}
          >
            Real-Time Community Intelligence
          </h2>

          <p
            className={`
              mt-2
              max-w-2xl
              text-sm
              sm:text-base
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            AI continuously evaluates citizen reports,
            government actions, and community engagement
            to generate live infrastructure intelligence.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className={`
                  border
                  p-5
                  transition
                  ${
                    darkMode
                      ? "bg-white/[0.03] border-white/10"
                      : "bg-[#F8FAF9] border-gray-200"
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <Icon
                    className="text-green-500"
                    size={18}
                  />
                </div>

                <h3 className="mt-3 text-3xl font-black">
                  {item.value}
                </h3>

                <p
                  className={`
                    mt-1
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                  `}
                >
                  {item.label}
                </p>

                <p
                  className={`
                    mt-3
                    text-xs
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-600"
                    }
                  `}
                >
                  {item.hint}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default AIHealthOverview;
