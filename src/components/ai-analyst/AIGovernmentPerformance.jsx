import { motion } from "framer-motion";

import {
  FiShield,
  FiClock,
  FiTrendingUp,
  FiCheckCircle,
  FiActivity,
  FiArrowUpRight,
} from "react-icons/fi";

const AIGovernmentPerformance = ({
  darkMode,
}) => {
  const metrics = [
    {
      title: "Average Response Time",
      value: "9 Days",
      icon: FiClock,
      description:
        "Average time taken before official action or update is recorded.",
    },

    {
      title: "Resolution Rate",
      value: "78%",
      icon: FiCheckCircle,
      description:
        "Percentage of reported issues successfully resolved.",
    },

    {
      title: "Responsiveness Score",
      value: "84%",
      icon: FiTrendingUp,
      description:
        "AI-calculated score based on updates, actions, and completion rates.",
    },

    {
      title: "Active Monitoring",
      value: "24/7",
      icon: FiActivity,
      description:
        "Continuous tracking of public issue progress and updates.",
    },
  ];

  const departments = [
    {
      name: "Road Infrastructure",
      performance: "Excellent",
      score: "92%",
    },

    {
      name: "Public Works",
      performance: "Strong",
      score: "87%",
    },

    {
      name: "Water Services",
      performance: "Moderate",
      score: "71%",
    },

    {
      name: "Environmental Services",
      performance: "Improving",
      score: "76%",
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
            <FiShield />
            Government Performance
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
            Accountability Intelligence
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
            AI evaluates response times,
            completion rates, and progress
            updates to measure public sector
            performance objectively.
          </p>
        </div>

        {/* PERFORMANCE METRICS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {metrics.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className={`
                  border
                  p-5
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
                      text-xl
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
                    text-4xl
                    font-black
                    tracking-tight
                  "
                >
                  {item.value}
                </h3>

                <h4
                  className="
                    mt-3
                    text-lg
                    font-bold
                  "
                >
                  {item.title}
                </h4>

                <p
                  className={`
                    mt-3
                    text-sm
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }
                  `}
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* DEPARTMENT ANALYSIS */}
        <div className="mt-10">
          <h3
            className="
              text-xl
              font-black
              mb-5
            "
          >
            Department Performance Analysis
          </h3>

          <div className="flex flex-col gap-4">
            {departments.map(
              (
                department,
                index
              ) => (
                <motion.div
                  key={index}
                  whileHover={{
                    x: 5,
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
                  <div className="p-5">
                    <div
                      className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-4
                      "
                    >
                      <div>
                        <h4
                          className="
                            text-lg
                            font-bold
                          "
                        >
                          {
                            department.name
                          }
                        </h4>

                        <p
                          className={`
                            mt-1
                            ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                          `}
                        >
                          {
                            department.performance
                          }{" "}
                          performance
                        </p>
                      </div>

                      <div
                        className="
                          border
                          border-green-500/20
                          bg-green-500/5
                          px-4
                          py-3
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
                          Score
                        </p>

                        <h4
                          className="
                            text-2xl
                            font-black
                          "
                        >
                          {
                            department.score
                          }
                        </h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* AI SUMMARY */}
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
            <FiShield />
            AI Accountability Summary
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
            AI analysis indicates that
            communities receiving frequent
            progress updates generally achieve
            higher resolution rates and stronger
            public trust. Consistent engagement
            remains a key driver of successful
            outcomes.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AIGovernmentPerformance;