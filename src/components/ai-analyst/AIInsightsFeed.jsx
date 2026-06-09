import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiAlertTriangle,
  FiActivity,
  FiShield,
  FiArrowUpRight,
  FiCpu,
} from "react-icons/fi";

const AIInsightsFeed = ({ darkMode }) => {
  const insights = [
    {
      icon: FiTrendingUp,
      title: "Road Conditions Improving",
      insight:
        "Reports related to damaged roads decreased by 18% over the last 30 days, suggesting successful interventions in several communities.",
      confidence: "96%",
    },

    {
      icon: FiAlertTriangle,
      title: "Flood Risk Increasing",
      insight:
        "Drainage-related reports have risen sharply in recent weeks. AI predicts a higher likelihood of flooding incidents if trends continue.",
      confidence: "91%",
    },

    {
      icon: FiShield,
      title: "Government Responsiveness Up",
      insight:
        "Average response times have improved compared to the previous reporting cycle, indicating stronger engagement with citizen concerns.",
      confidence: "94%",
    },

    {
      icon: FiActivity,
      title: "Community Participation Growth",
      insight:
        "Support and verification activity continues to rise, showing stronger public involvement in accountability efforts.",
      confidence: "98%",
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
          w-[320px]
          h-[320px]
          bg-green-500/10
          blur-[120px]
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
            AI Intelligence Feed
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
            Latest Community Insights
          </h2>

          <p
            className={`
              mt-3
              max-w-3xl
              text-base
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Nation Aura AI continuously analyzes
            community reports, citizen activity,
            and government progress to identify
            important trends and emerging patterns.
          </p>
        </div>

        {/* INSIGHTS */}
        <div className="flex flex-col gap-5">
          {insights.map(
            (
              item,
              index
            ) => {
              const Icon =
                item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  className={`
                    border-l-4
                    border-green-500
                    ${
                      darkMode
                        ? "bg-white/[0.03]"
                        : "bg-[#F8FAF9]"
                    }
                  `}
                >
                  <div className="p-5 sm:p-6">
                    <div
                      className="
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-4
                      "
                    >
                      <div className="flex gap-4">
                        <div
                          className="
                            flex-shrink-0
                            mt-1
                          "
                        >
                          <Icon
                            className="
                              text-green-500
                              text-xl
                            "
                          />
                        </div>

                        <div>
                          <h3
                            className="
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
                              item.insight
                            }
                          </p>
                        </div>
                      </div>

                      <div
                        className="
                          lg:min-w-[140px]
                          border
                          border-green-500/20
                          bg-green-500/5
                          p-4
                        "
                      >
                        <p
                          className="
                            text-xs
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
                            mt-2
                            text-3xl
                            font-black
                          "
                        >
                          {
                            item.confidence
                          }
                        </h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* FOOTER INSIGHT */}
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
            <FiArrowUpRight />
            AI Strategic Observation
          </div>

          <p
            className={`
              mt-3
              text-base
              sm:text-lg
              leading-relaxed
              max-w-4xl
              ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }
            `}
          >
            Communities with higher citizen
            participation consistently achieve
            faster issue resolution and receive
            more government updates. Engagement
            remains one of the strongest predictors
            of positive outcomes across Nation Aura.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AIInsightsFeed;