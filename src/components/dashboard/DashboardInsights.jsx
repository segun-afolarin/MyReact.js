import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiClock,
  FiMap,
  FiActivity,
  FiArrowUpRight,
  FiCpu,
  FiZap,
} from "react-icons/fi";

const insights = [
  {
    title: "Most Reported Issue",
    value: "Road Damage",
    description:
      "AI detected transportation infrastructure as the highest civic concern nationwide.",
    icon: <FiMap />,
    gradient: "from-green-500 to-emerald-700",
  },

  {
    title: "Fastest Response",
    value: "2h 14m",
    description:
      "Response time improved through smart report routing and live monitoring.",
    icon: <FiClock />,
    gradient: "from-emerald-500 to-green-700",
  },

  {
    title: "Weekly Activity",
    value: "+38%",
    description:
      "Community engagement and citizen participation increased this week.",
    icon: <FiTrendingUp />,
    gradient: "from-green-600 to-lime-600",
  },
];

const liveUpdates = [
  "Flooding report verified in Lagos",
  "Electricity issue resolved in Abuja",
  "AI classified 12 urgent reports",
  "Road damage trend detected in Kano",
];

const DashboardInsights = ({
  darkMode,
}) => {
  return (
    <section className="mt-8 sm:mt-10">
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-end
        lg:justify-between
        gap-4
        mb-6
        "
      >
        <div>
          <p
            className={`
            text-xs
            uppercase
            tracking-[0.25em]
            font-semibold
            ${
              darkMode
                ? "text-green-400"
                : "text-green-700"
            }
            `}
          >
            AI Civic Intelligence
          </p>

          <h2
            className={`
            mt-2
            text-3xl
            sm:text-4xl
            font-black
            tracking-[-0.04em]
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Smart Infrastructure Insights
          </h2>
        </div>

        <div
          className={`
          flex
          items-center
          gap-2
          text-sm
          font-medium
          ${
            darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }
          `}
        >
          <span
            className="
            w-2.5
            h-2.5
            bg-green-500
            animate-pulse
            "
          />

          AI Analysis Running Live
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        className="
        grid
        grid-cols-1
        2xl:grid-cols-[1.2fr_0.8fr]
        gap-5
        "
      >
        {/* LEFT */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          "
        >
          {insights.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className={`
              group
              relative
              overflow-hidden
              border
              p-5
              sm:p-6
              transition-all
              duration-500
              ${
                darkMode
                  ? `
                    bg-[#0F1720]
                    border-white/10
                    hover:border-green-500/30
                  `
                  : `
                    bg-white
                    border-gray-200
                    hover:border-green-300
                  `
              }
              `}
            >
              {/* TOP BAR */}
              <div
                className={`
                absolute
                top-0
                left-0
                w-full
                h-[2px]
                bg-gradient-to-r
                ${item.gradient}
                `}
              />

              {/* GLOW */}
              <div
                className={`
                absolute
                -top-24
                -right-24
                w-48
                h-48
                blur-3xl
                opacity-0
                group-hover:opacity-20
                transition-all
                duration-700
                bg-gradient-to-br
                ${item.gradient}
                `}
              />

              {/* TOP */}
              <div
                className="
                relative
                flex
                items-start
                justify-between
                gap-4
                "
              >
                <motion.div
                  whileHover={{
                    rotate: 6,
                    scale: 1.05,
                  }}
                  className={`
                  w-14
                  h-14
                  bg-gradient-to-br
                  ${item.gradient}
                  text-white
                  flex
                  items-center
                  justify-center
                  text-2xl
                  shadow-[0_15px_40px_rgba(34,197,94,0.25)]
                  `}
                >
                  {item.icon}
                </motion.div>

                <div
                  className={`
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  flex
                  items-center
                  gap-2
                  ${
                    darkMode
                      ? `
                        bg-white/[0.04]
                        text-green-400
                      `
                      : `
                        bg-green-50
                        text-green-700
                      `
                  }
                  `}
                >
                  <FiZap />

                  AI
                </div>
              </div>

              {/* VALUE */}
              <motion.h3
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                }}
                className={`
                mt-8
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
                {item.value}
              </motion.h3>

              {/* TITLE */}
              <h4
                className={`
                mt-3
                text-lg
                font-bold
                ${
                  darkMode
                    ? "text-gray-100"
                    : "text-gray-900"
                }
                `}
              >
                {item.title}
              </h4>

              {/* DESC */}
              <p
                className={`
                mt-3
                text-sm
                leading-relaxed
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
                `}
              >
                {item.description}
              </p>

              {/* BOTTOM LINE */}
              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "100%",
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                }}
                className={`
                mt-6
                h-[3px]
                bg-gradient-to-r
                ${item.gradient}
                `}
              />
            </motion.div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
          className={`
          relative
          overflow-hidden
          border
          p-5
          sm:p-6
          ${
            darkMode
              ? `
                bg-[#0B1218]
                border-white/10
              `
              : `
                bg-white
                border-gray-200
              `
          }
          `}
        >
          {/* GLOW */}
          <div
            className="
            absolute
            -top-20
            -right-20
            w-56
            h-56
            bg-green-500/10
            blur-3xl
            "
          />

          {/* TOP */}
          <div
            className="
            relative
            flex
            items-start
            justify-between
            gap-4
            "
          >
            <div>
              <p
                className={`
                text-xs
                uppercase
                tracking-[0.2em]
                font-semibold
                ${
                  darkMode
                    ? "text-green-400"
                    : "text-green-700"
                }
                `}
              >
                Live Feed
              </p>

              <h3
                className={`
                mt-2
                text-2xl
                font-black
                tracking-[-0.04em]
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                Real-Time Activity
              </h3>
            </div>

            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
              w-14
              h-14
              bg-gradient-to-br
              from-green-600
              to-emerald-700
              text-white
              flex
              items-center
              justify-center
              text-2xl
              shadow-[0_15px_40px_rgba(34,197,94,0.35)]
              "
            >
              <FiCpu />
            </motion.div>
          </div>

          {/* LIVE UPDATES */}
          <div className="relative mt-8 space-y-4">
            {liveUpdates.map(
              (update, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    x: 4,
                  }}
                  className={`
                  group
                  border
                  p-4
                  transition-all
                  duration-300
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                        hover:border-green-500/30
                      `
                      : `
                        bg-[#F8FAF9]
                        border-gray-200
                        hover:border-green-300
                      `
                  }
                  `}
                >
                  <div
                    className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    "
                  >
                    <div
                      className="
                      flex
                      items-start
                      gap-3
                      "
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="
                        mt-1.5
                        w-2.5
                        h-2.5
                        bg-green-500
                        "
                      />

                      <div>
                        <p
                          className={`
                          text-sm
                          leading-relaxed
                          font-medium
                          ${
                            darkMode
                              ? "text-gray-200"
                              : "text-gray-700"
                          }
                          `}
                        >
                          {update}
                        </p>

                        <span
                          className={`
                          mt-2
                          inline-block
                          text-xs
                          ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }
                          `}
                        >
                          Just now
                        </span>
                      </div>
                    </div>

                    <FiArrowUpRight
                      className={`
                      flex-shrink-0
                      text-lg
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                      `}
                    />
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* BOTTOM */}
          <div
            className={`
            relative
            mt-6
            border
            p-4
            flex
            items-center
            justify-between
            gap-4
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
            <div>
              <p
                className={`
                text-xs
                ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                `}
              >
                Civic Performance Score
              </p>

              <h4
                className={`
                mt-1
                text-3xl
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                94%
              </h4>
            </div>

            <div
              className="
              text-green-500
              text-sm
              font-bold
              flex
              items-center
              gap-2
              "
            >
              <FiTrendingUp />

              +12.4%
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardInsights;