import { motion } from "framer-motion";

import {
  FiActivity,
  FiAlertTriangle,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiCpu,
  FiEye,
  FiMapPin,
  FiNavigation,
  FiRadio,
  FiShield,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const AIReportAnalysis = ({
  darkMode,
}) => {
  const analysisData = [
    {
      title:
        "Incident Severity",
      value: "High Risk",
      icon: FiAlertTriangle,
      color: "text-orange-400",
    },

    {
      title:
        "Location Confidence",
      value: "98.2%",
      icon: FiMapPin,
      color: "text-green-400",
    },

    {
      title:
        "Response Priority",
      value: "Immediate",
      icon: FiZap,
      color: "text-red-400",
    },

    {
      title:
        "Verification Status",
      value: "Confirmed",
      icon: FiShield,
      color: "text-emerald-400",
    },
  ];

  const aiSteps = [
    {
      title:
        "Image Evidence Scanned",
      description:
        "AI validated uploaded incident visuals and detected emergency indicators.",
      status: "completed",
    },

    {
      title:
        "Location & GPS Matched",
      description:
        "System matched incident coordinates with nearby infrastructure zones.",
      status: "completed",
    },

    {
      title:
        "Threat Pattern Analysis",
      description:
        "Predictive AI models analyzing severity and escalation risks.",
      status: "active",
    },

    {
      title:
        "Authority Routing Queue",
      description:
        "Emergency departments being prioritized based on incident type.",
      status: "pending",
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay: 0.2,
      }}
      className={`
      relative
      overflow-hidden
      border
      ${
        darkMode
          ? `
            bg-[#09131B]
            border-white/10
          `
          : `
            bg-white
            border-gray-200
          `
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
        bg-[size:40px_40px]
        "
      />

      {/* TOP GLOW */}
      <div
        className="
        absolute
        top-[-90px]
        right-[-90px]
        w-[240px]
        h-[240px]
        bg-green-500/10
        blur-3xl
        rounded-full
        "
      />

      {/* TOP LINE */}
      <div
        className="
        absolute
        top-0
        left-0
        h-[2px]
        w-full
        bg-gradient-to-r
        from-green-500
        via-emerald-400
        to-transparent
        "
      />

      <div
        className="
        relative
        z-10
        p-5
        sm:p-6
        "
      >
        {/* HEADER */}
        <div
          className="
          flex
          items-start
          justify-between
          gap-4
          flex-wrap
          "
        >
          <div>
            {/* BADGE */}
            <div
              className={`
              inline-flex
              items-center
              gap-3
              px-4
              py-2
              border
              ${
                darkMode
                  ? `
                    bg-green-500/10
                    border-green-500/20
                    text-green-400
                  `
                  : `
                    bg-green-50
                    border-green-200
                    text-green-700
                  `
              }
              `}
            >
              <div className="relative flex">
                <span
                  className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-green-400
                  opacity-75
                  "
                />

                <span
                  className="
                  relative
                  inline-flex
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-green-500
                  "
                />
              </div>

              <span
                className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                font-black
                "
              >
                AI Analysis Active
              </span>
            </div>

            {/* TITLE */}
            <h2
              className={`
              mt-5
              text-[2rem]
              sm:text-[2.5rem]
              leading-[0.92]
              tracking-[-0.06em]
              font-black
              uppercase
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              Intelligent
              Incident Analysis
            </h2>

            {/* DESCRIPTION */}
            <p
              className={`
              mt-4
              max-w-2xl
              text-sm
              sm:text-base
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
              `}
            >
              NationAura AI is
              analyzing emergency
              severity, validating
              evidence, identifying
              infrastructure threats,
              and routing response
              systems automatically.
            </p>
          </div>

          {/* AI CORE */}
          <div
            className="
            relative
            w-20
            h-20
            shrink-0
            "
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear",
              }}
              className="
              absolute
              inset-0
              border
              border-dashed
              border-green-500/30
              rounded-full
              "
            />

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="
              absolute
              inset-2
              rounded-full
              bg-green-500/10
              blur-xl
              "
            />

            <div
              className="
              relative
              w-full
              h-full
              rounded-full
              bg-green-500/10
              border
              border-green-500/20
              flex
              items-center
              justify-center
              text-green-400
              text-3xl
              "
            >
              <FiCpu />
            </div>
          </div>
        </div>

        {/* ANALYSIS CARDS */}
        <div
          className="
          mt-8
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
          "
        >
          {analysisData.map(
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
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className={`
                  relative
                  overflow-hidden
                  border
                  p-5
                  ${
                    darkMode
                      ? `
                        border-white/10
                        bg-white/[0.03]
                      `
                      : `
                        border-gray-200
                        bg-gray-50
                      `
                  }
                  `}
                >
                  {/* GLOW */}
                  <div
                    className="
                    absolute
                    top-[-30px]
                    right-[-30px]
                    w-[100px]
                    h-[100px]
                    bg-green-500/5
                    blur-2xl
                    rounded-full
                    "
                  />

                  <div
                    className="
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                    gap-4
                    "
                  >
                    <div>
                      <p
                        className={`
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        ${
                          darkMode
                            ? "text-gray-500"
                            : "text-gray-400"
                        }
                        `}
                      >
                        {item.title}
                      </p>

                      <h3
                        className={`
                        mt-3
                        text-[1.8rem]
                        font-black
                        tracking-[-0.05em]
                        ${item.color}
                        `}
                      >
                        {item.value}
                      </h3>
                    </div>

                    <div
                      className="
                      relative
                      w-14
                      h-14
                      bg-green-500/10
                      border
                      border-green-500/20
                      flex
                      items-center
                      justify-center
                      text-green-400
                      text-2xl
                      shrink-0
                      "
                    >
                      <motion.div
                        animate={{
                          scale: [
                            1,
                            1.4,
                            1,
                          ],
                          opacity: [
                            0.4,
                            0,
                            0.4,
                          ],
                        }}
                        transition={{
                          repeat:
                            Infinity,
                          duration: 2,
                          delay:
                            index *
                            0.3,
                        }}
                        className="
                        absolute
                        inset-0
                        bg-green-500/10
                        "
                      />

                      <Icon className="relative z-10" />
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* LIVE AI FLOW */}
        <div className="mt-8">
          <div
            className="
            flex
            items-center
            justify-between
            gap-3
            mb-5
            flex-wrap
            "
          >
            <div>
              <h3
                className={`
                text-xl
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                AI Processing Pipeline
              </h3>

              <p
                className={`
                mt-1
                text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
                `}
              >
                Live emergency response
                intelligence workflow.
              </p>
            </div>

            <div
              className="
              flex
              items-center
              gap-2
              text-green-500
              text-sm
              font-semibold
              "
            >
              <FiRadio />

              Real-Time Analysis
            </div>
          </div>

          <div className="space-y-4">
            {aiSteps.map(
              (
                item,
                index
              ) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      0.15 +
                      index * 0.1,
                  }}
                  className={`
                  relative
                  overflow-hidden
                  border
                  p-5
                  ${
                    darkMode
                      ? `
                        border-white/10
                        bg-white/[0.03]
                      `
                      : `
                        border-gray-200
                        bg-gray-50
                      `
                  }
                  `}
                >
                  {/* ACTIVE SCAN */}
                  {item.status ===
                    "active" && (
                    <motion.div
                      animate={{
                        x: [
                          "-100%",
                          "100%",
                        ],
                      }}
                      transition={{
                        repeat:
                          Infinity,
                        duration: 2,
                      }}
                      className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-transparent
                      via-green-500/10
                      to-transparent
                      "
                    />
                  )}

                  <div
                    className="
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                    gap-4
                    "
                  >
                    {/* LEFT */}
                    <div
                      className="
                      flex
                      items-start
                      gap-4
                      "
                    >
                      {/* ICON */}
                      <div
                        className={`
                        relative
                        w-12
                        h-12
                        shrink-0
                        flex
                        items-center
                        justify-center
                        text-lg
                        ${
                          item.status ===
                          "completed"
                            ? `
                              bg-green-500
                              text-white
                            `
                            : item.status ===
                              "active"
                            ? `
                              bg-green-500/10
                              border
                              border-green-500/20
                              text-green-400
                            `
                            : darkMode
                            ? `
                              bg-white/[0.04]
                              border
                              border-white/10
                              text-gray-500
                            `
                            : `
                              bg-gray-100
                              border
                              border-gray-200
                              text-gray-400
                            `
                        }
                        `}
                      >
                        {item.status ===
                        "completed" ? (
                          <FiCheckCircle />
                        ) : item.status ===
                          "active" ? (
                          <FiActivity />
                        ) : (
                          <FiClock />
                        )}

                        {item.status ===
                          "active" && (
                          <motion.div
                            animate={{
                              scale: [
                                1,
                                1.5,
                                1,
                              ],
                              opacity: [
                                0.5,
                                0,
                                0.5,
                              ],
                            }}
                            transition={{
                              repeat:
                                Infinity,
                              duration: 2,
                            }}
                            className="
                            absolute
                            inset-0
                            bg-green-500/10
                            "
                          />
                        )}
                      </div>

                      {/* CONTENT */}
                      <div>
                        <h4
                          className={`
                          text-sm
                          sm:text-base
                          font-black
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                          `}
                        >
                          {item.title}
                        </h4>

                        <p
                          className={`
                          mt-2
                          text-sm
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
                    </div>

                    {/* STATUS */}
                    <div
                      className={`
                      shrink-0
                      px-3
                      py-2
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      font-black
                      ${
                        item.status ===
                        "completed"
                          ? `
                            bg-green-500
                            text-white
                          `
                          : item.status ===
                            "active"
                          ? `
                            bg-green-500/10
                            border
                            border-green-500/20
                            text-green-400
                          `
                          : darkMode
                          ? `
                            bg-white/[0.03]
                            border
                            border-white/10
                            text-gray-500
                          `
                          : `
                            bg-gray-100
                            border
                            border-gray-200
                            text-gray-500
                          `
                      }
                      `}
                    >
                      {item.status}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* SMART INSIGHTS */}
        <div
          className="
          mt-8
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          "
        >
          {[
            {
              icon: FiTrendingUp,
              title:
                "Threat Escalation",
              value:
                "Low escalation risk detected.",
            },

            {
              icon: FiNavigation,
              title:
                "Nearest Response",
              value:
                "Emergency unit within 3.4km.",
            },

            {
              icon: FiEye,
              title:
                "Visual Confidence",
              value:
                "AI image recognition validated.",
            },
          ].map(
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
                    y: -3,
                  }}
                  className={`
                  relative
                  overflow-hidden
                  border
                  p-5
                  ${
                    darkMode
                      ? `
                        border-white/10
                        bg-white/[0.03]
                      `
                      : `
                        border-gray-200
                        bg-gray-50
                      `
                  }
                  `}
                >
                  {/* LIGHT */}
                  <div
                    className="
                    absolute
                    top-[-20px]
                    right-[-20px]
                    w-[90px]
                    h-[90px]
                    bg-green-500/5
                    blur-2xl
                    rounded-full
                    "
                  />

                  <div className="relative z-10">
                    <div
                      className="
                      w-12
                      h-12
                      bg-green-500/10
                      border
                      border-green-500/20
                      flex
                      items-center
                      justify-center
                      text-green-400
                      text-xl
                      "
                    >
                      <Icon />
                    </div>

                    <h4
                      className={`
                      mt-4
                      text-sm
                      font-black
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      {item.title}
                    </h4>

                    <p
                      className={`
                      mt-2
                      text-sm
                      leading-relaxed
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                      `}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* FOOTER CTA */}
        <motion.button
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
          relative
          overflow-hidden
          mt-8
          w-full
          h-14
          bg-green-500
          hover:bg-green-400
          text-white
          font-black
          uppercase
          tracking-[0.16em]
          text-sm
          flex
          items-center
          justify-center
          gap-3
          transition-all
          duration-300
          "
        >
          {/* SHINE */}
          <motion.div
            animate={{
              x: [
                "-100%",
                "100%",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
            className="
            absolute
            inset-0
            bg-white/10
            skew-x-12
            "
          />

          <span className="relative z-10">
            View Advanced Analysis
          </span>

          <FiArrowUpRight className="relative z-10 text-lg" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default AIReportAnalysis;