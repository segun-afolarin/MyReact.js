import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiTarget,
  FiActivity,
  FiUsers,
  FiAward,
  FiArrowUpRight,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";

const ProfileInsights = ({
  darkMode,
}) => {
  const insights = [
    {
      icon: FiActivity,
      title:
        "Reports Increased",
      value: "+23",
      description:
        "More reports submitted compared to last month.",
    },

    {
      icon: FiCheckCircle,
      title:
        "Issues Resolved",
      value: "+12",
      description:
        "Additional cases successfully completed.",
    },

    {
      icon: FiUsers,
      title:
        "Citizens Reached",
      value: "+184",
      description:
        "More people engaged with your reports.",
    },

    {
      icon: FiTrendingUp,
      title:
        "Influence Growth",
      value: "+37%",
      description:
        "Overall civic impact growth this month.",
    },
  ];

  return (
    <section
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
          bg-[size:55px_55px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          left-[-120px]
          top-[-120px]
          w-[320px]
          h-[320px]
          bg-green-500/10
          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10
          p-5
          sm:p-7
          lg:p-8
        "
      >
        {/* HEADER */}
        <div className="max-w-4xl">
          <p
            className={`
              text-[11px]
              uppercase
              tracking-[0.35em]
              font-black
              ${
                darkMode
                  ? "text-green-400"
                  : "text-green-700"
              }
            `}
          >
            Personal Intelligence
          </p>

          <h2
            className={`
              mt-3
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              tracking-[-0.06em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            Performance Insights
          </h2>

          <p
            className={`
              mt-4
              max-w-3xl
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            AI-powered analysis of your
            reporting activity, community
            engagement, and civic impact
            over time.
          </p>
        </div>

        {/* MAIN INSIGHT */}
        <div
          className={`
            mt-8
            border
            overflow-hidden
            ${
              darkMode
                ? `
                  bg-green-500/[0.05]
                  border-green-500/20
                `
                : `
                  bg-green-50
                  border-green-200
                `
            }
          `}
        >
          <div className="p-6 lg:p-8">
            <div
              className="
                flex
                items-center
                gap-2
                text-green-500
                uppercase
                tracking-[0.25em]
                text-xs
                font-black
              "
            >
              <FiZap />
              Monthly Analysis
            </div>

            <h3
              className="
                mt-4
                text-3xl
                lg:text-5xl
                font-black
                tracking-tight
              "
            >
              You're Performing
              37% Better Than
              Last Month
            </h3>

            <p
              className={`
                mt-4
                max-w-3xl
                leading-relaxed
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
              `}
            >
              Increased reporting
              consistency, stronger
              evidence quality, and
              higher community engagement
              contributed significantly
              to your growth this month.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-green-500
                font-bold
              "
            >
              <FiArrowUpRight />
              Top Growth Contributor
            </div>
          </div>
        </div>

        {/* INSIGHT CARDS */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {insights.map(
            (item, index) => {
              const Icon =
                item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
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
                      h-12
                      w-12
                      rounded-xl
                      bg-green-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon
                      className="
                        text-green-500
                        text-xl
                      "
                    />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-4xl
                      font-black
                    "
                  >
                    {item.value}
                  </h3>

                  <p
                    className={`
                      mt-2
                      font-semibold
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                  >
                    {item.title}
                  </p>

                  <p
                    className={`
                      mt-3
                      text-sm
                      leading-relaxed
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {
                      item.description
                    }
                  </p>
                </motion.div>
              );
            }
          )}
        </div>

        {/* NEXT MILESTONE */}
        <div
          className={`
            mt-8
            border
            p-6
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
              gap-3
            "
          >
            <div
              className="
                h-14
                w-14
                rounded-xl
                bg-green-500/10
                flex
                items-center
                justify-center
              "
            >
              <FiTarget
                className="
                  text-green-500
                  text-2xl
                "
              />
            </div>

            <div>
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-green-500
                  font-black
                "
              >
                Next Milestone
              </p>

              <h3
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                "
              >
                National Top 100
              </h3>
            </div>
          </div>

          <div className="mt-6">
            <div
              className={`
                h-4
                overflow-hidden
                ${
                  darkMode
                    ? "bg-white/10"
                    : "bg-gray-200"
                }
              `}
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "72%",
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.5,
                }}
                className="
                  h-full
                  bg-gradient-to-r
                  from-green-500
                  via-emerald-400
                  to-green-600
                "
              />
            </div>

            <div
              className="
                mt-3
                flex
                justify-between
                text-sm
              "
            >
              <span
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
              >
                Progress
              </span>

              <span
                className="
                  text-green-500
                  font-bold
                "
              >
                72%
              </span>
            </div>
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
            Continue submitting
            high-quality reports and
            helping communities verify
            issues to unlock your next
            recognition milestone.
          </p>
        </div>

        {/* AI OBSERVATION */}
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
            <FiAward />
            AI Observation
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
            Your strongest area is
            evidence quality and report
            verification. Citizens with
            similar performance patterns
            often become top national
            contributors within a few
            months of consistent activity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInsights;