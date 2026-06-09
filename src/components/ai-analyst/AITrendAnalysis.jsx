import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiActivity,
  FiUsers,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";

const AITrendAnalysis = ({ darkMode }) => {
  const trends = [
    {
      title: "Citizen Reports",
      value: "+18%",
      description:
        "Report submissions increased compared to the previous month.",
      icon: FiActivity,
    },

    {
      title: "Community Support",
      value: "+32%",
      description:
        "Citizens are engaging more with verification and support activities.",
      icon: FiUsers,
    },

    {
      title: "Issue Resolution",
      value: "+14%",
      description:
        "Resolved cases continue to rise across monitored communities.",
      icon: FiCheckCircle,
    },

    {
      title: "Government Response",
      value: "+9%",
      description:
        "Average response performance improved over the last cycle.",
      icon: FiTrendingUp,
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
            <FiTrendingUp />
            Trend Analysis
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
            Community Trend Intelligence
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
            AI continuously monitors reporting
            activity, community engagement,
            government responsiveness, and
            resolution performance to identify
            meaningful trends.
          </p>
        </div>

        {/* TREND GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {trends.map((trend, index) => {
            const Icon = trend.icon;

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
                    text-5xl
                    font-black
                    tracking-tight
                    text-green-500
                  "
                >
                  {trend.value}
                </h3>

                <h4
                  className="
                    mt-3
                    text-lg
                    font-bold
                  "
                >
                  {trend.title}
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
                  {trend.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* STRATEGIC SUMMARY */}
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
            <FiTrendingUp />
            AI Trend Summary
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
            Analysis indicates a positive
            relationship between citizen
            participation and issue resolution.
            Communities with consistent reporting
            and verification activity continue to
            achieve stronger outcomes and faster
            responses from relevant authorities.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AITrendAnalysis;