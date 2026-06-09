import { motion } from "framer-motion";

import {
  FiCpu,
  FiTrendingUp,
  FiAlertTriangle,
  FiActivity,
  FiTarget,
  FiArrowUpRight,
  FiShield,
} from "react-icons/fi";

const AIPredictions = ({ darkMode }) => {
  const predictions = [
    {
      title: "Road Infrastructure",
      prediction:
        "AI forecasts an increase in road-related reports over the next 30 days if maintenance activity remains unchanged.",
      confidence: "94%",
      impact: "High",
      icon: FiTrendingUp,
    },

    {
      title: "Flooding Risk",
      prediction:
        "Based on drainage reports and historical patterns, flood-related incidents may rise in vulnerable communities.",
      confidence: "91%",
      impact: "Critical",
      icon: FiAlertTriangle,
    },

    {
      title: "Community Engagement",
      prediction:
        "Citizen participation is expected to continue growing as more reports receive visible progress updates.",
      confidence: "97%",
      impact: "Positive",
      icon: FiActivity,
    },

    {
      title: "Government Response",
      prediction:
        "Resolution speed is projected to improve if current responsiveness trends continue.",
      confidence: "89%",
      impact: "Moderate",
      icon: FiShield,
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? "bg-[#081019] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* GRID */}
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
          top-[-120px]
          right-[-120px]
          w-[350px]
          h-[350px]
          bg-green-500/10
          blur-[140px]
        "
      />

      <div className="relative z-10 p-5 sm:p-7 lg:p-10">
        {/* HEADER */}
        <div className="mb-10">
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
            <FiCpu />
            Predictive Intelligence
          </div>

          <h2
            className={`
              mt-4
              text-3xl
              sm:text-4xl
              font-black
              tracking-[-0.05em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            AI Future Predictions
          </h2>

          <p
            className={`
              mt-3
              max-w-3xl
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Nation Aura AI analyzes historical
            reports, community behavior,
            government actions and emerging
            patterns to forecast what may
            happen next.
          </p>
        </div>

        {/* PREDICTIONS */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
          "
        >
          {predictions.map(
            (
              item,
              index
            ) => {
              const Icon =
                item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -5,
                  }}
                  className={`
                    border
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                        `
                        : `
                          bg-[#F8FAF9]
                          border-gray-200
                        `
                    }
                  `}
                >
                  <div className="p-5 sm:p-6">
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <Icon
                        className="
                          text-green-500
                          text-2xl
                        "
                      />

                      <FiArrowUpRight
                        className="
                          text-green-500
                        "
                      />
                    </div>

                    <h3
                      className="
                        mt-5
                        text-xl
                        font-black
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`
                        mt-3
                        leading-relaxed
                        ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {
                        item.prediction
                      }
                    </p>

                    <div
                      className="
                        mt-5
                        flex
                        gap-3
                        flex-wrap
                      "
                    >
                      <div
                        className="
                          px-3
                          py-2
                          border
                          border-green-500/20
                          bg-green-500/5
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-green-500
                            font-bold
                          "
                        >
                          Confidence
                        </p>

                        <h4
                          className="
                            mt-1
                            text-xl
                            font-black
                          "
                        >
                          {
                            item.confidence
                          }
                        </h4>
                      </div>

                      <div
                        className="
                          px-3
                          py-2
                          border
                          border-green-500/20
                          bg-green-500/5
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-green-500
                            font-bold
                          "
                        >
                          Impact
                        </p>

                        <h4
                          className="
                            mt-1
                            text-xl
                            font-black
                          "
                        >
                          {item.impact}
                        </h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* AI FORECAST */}
        <div
          className="
            mt-10
            border-l-4
            border-green-500
            pl-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-green-500
              font-bold
            "
          >
            <FiTarget />
            AI Forecast Summary
          </div>

          <p
            className={`
              mt-3
              text-base
              sm:text-lg
              leading-relaxed
              max-w-5xl
              ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }
            `}
          >
            Predictive models suggest that
            communities maintaining high
            reporting activity and strong
            citizen verification rates will
            continue to achieve better
            infrastructure outcomes. Early
            intervention in emerging issues
            remains the most effective strategy
            for preventing larger community
            challenges.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AIPredictions;