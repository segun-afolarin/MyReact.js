import { motion } from "framer-motion";

import {
  FiCpu,
  FiTarget,
  FiTrendingUp,
  FiShield,
  FiActivity,
  FiArrowUpRight,
  FiCheckCircle,
} from "react-icons/fi";

const AIRecommendations = ({
  darkMode,
}) => {
  const recommendations = [
    {
      icon: FiTarget,
      title:
        "Prioritize Drainage Maintenance",
      impact: "High Impact",
      description:
        "AI analysis indicates a growing concentration of drainage-related reports. Proactive maintenance could significantly reduce future flooding incidents.",
    },

    {
      icon: FiTrendingUp,
      title:
        "Increase Progress Updates",
      impact: "Trust Building",
      description:
        "Communities receiving regular progress updates show stronger citizen engagement and higher confidence in issue resolution efforts.",
    },

    {
      icon: FiShield,
      title:
        "Focus On Repeat Locations",
      impact: "Efficiency Gain",
      description:
        "Several locations continue generating similar reports. Addressing root causes in these areas could reduce recurring complaints.",
    },

    {
      icon: FiActivity,
      title:
        "Strengthen Community Verification",
      impact: "Data Quality",
      description:
        "Increasing verification activity can improve report accuracy and help decision-makers prioritize resources more effectively.",
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
          bottom-[-120px]
          left-[-120px]
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
            AI Recommendations
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
            Recommended Actions
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
            Based on community reports,
            engagement patterns, and
            historical outcomes, AI has
            identified the actions most
            likely to improve results.
          </p>
        </div>

        {/* RECOMMENDATIONS */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
          "
        >
          {recommendations.map(
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
                    y: -4,
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

                    <div
                      className="
                        mt-3
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
                        tracking-[0.15em]
                      "
                    >
                      {item.impact}
                    </div>

                    <p
                      className={`
                        mt-4
                        leading-relaxed
                        ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {
                        item.description
                      }
                    </p>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* STRATEGIC BRIEF */}
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
            <FiCheckCircle />
            AI Strategic Brief
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
            Historical analysis shows that
            communities achieve better
            outcomes when recurring issues
            are addressed early, progress
            updates remain transparent,
            and citizens actively verify
            reported information. These
            recommendations are designed
            to maximize measurable impact
            while strengthening public
            trust and accountability.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AIRecommendations;