import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiArrowUpRight,
  FiCpu,
  FiActivity,
  FiRadio,
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiMapPin,
  FiZap,
} from "react-icons/fi";

const liveAlerts = [
  {
    title: "Flood Risk Escalation",
    value: "HIGH",
    icon: <FiAlertTriangle />,
  },

  {
    title: "Resolved Reports",
    value: "2,438",
    icon: <FiCheckCircle />,
  },

  {
    title: "Connected Districts",
    value: "48",
    icon: <FiMapPin />,
  },
];

const DashboardInsights = ({
  darkMode,
}) => {
  return (
    <section className="relative mt-14 overflow-hidden">
      {/* HUGE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,197,94,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,197,94,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* LIGHT BACKDROP */}
        <div
          className={`
            absolute
            inset-0
            ${
              darkMode
                ? "bg-[#020705]"
                : "bg-[#F4F7F5]"
            }
          `}
        />

        {/* TOP GLOW */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="
          absolute
          -top-40
          left-[-10%]
          w-[500px]
          h-[500px]
          bg-green-500/20
          blur-[130px]
          "
        />

        {/* BOTTOM GLOW */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.16, 0.3, 0.16],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="
          absolute
          bottom-[-200px]
          right-[-10%]
          w-[550px]
          h-[550px]
          bg-emerald-400/20
          blur-[150px]
          "
        />
      </div>

      {/* MAIN WRAPPER */}
      <div
        className={`
          relative
          border
          shadow-[0_40px_120px_rgba(0,0,0,0.08)]
          overflow-hidden
          ${
            darkMode
              ? `
                bg-[#07110D]
                border-white/10
              `
              : `
                bg-white
                border-[#E5ECE7]
              `
          }
        `}
      >
        {/* TOP ACCENT */}
        <div
          className="
          absolute
          top-0
          left-0
          w-full
          h-[4px]
          bg-gradient-to-r
          from-green-500
          via-emerald-400
          to-transparent
          "
        />

        {/* INNER CONTAINER */}
        <div className="relative p-6 sm:p-8 lg:p-12">
          {/* HEADER */}
          <div
            className="
            flex
            flex-col
            xl:flex-row
            xl:items-end
            xl:justify-between
            gap-10
            "
          >
            {/* LEFT */}
            <div className="max-w-3xl">
              {/* LIVE BADGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                className={`
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  border
                  shadow-sm
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                      `
                      : `
                        bg-[#F7FAF8]
                        border-[#E6ECE7]
                      `
                  }
                `}
              >
                <span className="relative flex h-3 w-3">
                  <span
                    className="
                    animate-ping
                    absolute
                    inline-flex
                    h-full
                    w-full
                    bg-green-400
                    opacity-75
                    "
                  />

                  <span
                    className="
                    relative
                    inline-flex
                    h-3
                    w-3
                    bg-green-500
                    "
                  />
                </span>

                <p
                  className="
                  text-[10px]
                  sm:text-[11px]
                  uppercase
                  tracking-[0.35em]
                  font-black
                  text-green-500
                  "
                >
                  LIVE AI INFRASTRUCTURE ENGINE
                </p>
              </motion.div>

              <motion.h2
  initial={{
    opacity: 0,
    y: 20,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.08,
  }}
  viewport={{ once: true }}
  className="
    mt-8
    text-[2.1rem]
    sm:text-[3rem]
    lg:text-[4.3rem]
    leading-[0.9]
    tracking-[-0.09em]
    font-black
  "
>
                <span
                  className={
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                >
                  AI
                </span>{" "}

                <span className="text-green-500">
                  Civic
                </span>

                <br />

                <span className="text-green-500">
                  Intelligence
                </span>{" "}

                <span
                  className={
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                >
                  &
                </span>

                <br />

                <span
                  className={
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                >
                  Predictive
                </span>{" "}

                <span className="text-green-500">
                  Monitoring.
                </span>
              </motion.h2>

              {/* DESC */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.12,
                }}
                viewport={{ once: true }}
                className={`
                  mt-7
                  max-w-2xl
                  text-sm
                  sm:text-base
                  lg:text-lg
                  leading-relaxed
                  ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
                NationAura processes thousands of
                citizen reports in real-time to detect
                infrastructure threats, monitor civic
                conditions, predict failures, and
                accelerate emergency response using
                advanced AI intelligence systems.
              </motion.p>
            </div>

            {/* STATUS PANEL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              className={`
                relative
                overflow-hidden
                border
                min-w-[300px]
                shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                ${
                  darkMode
                    ? `
                      bg-[#0C1712]
                      border-white/10
                    `
                    : `
                      bg-white
                      border-[#E6ECE7]
                    `
                }
              `}
            >
              {/* GLOW */}
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-br
                from-green-500/10
                via-transparent
                to-transparent
                "
              />

              <div className="relative p-6">
                <div className="flex items-center gap-5">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                    className="
                    w-16
                    h-16
                    bg-green-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-3xl
                    shadow-[0_20px_60px_rgba(34,197,94,0.35)]
                    "
                  >
                    <FiCpu />
                  </motion.div>

                  <div>
                    <p
                      className={`
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                        font-black
                        ${
                          darkMode
                            ? "text-gray-500"
                            : "text-gray-400"
                        }
                      `}
                    >
                      SYSTEM STATUS
                    </p>

                    <h4
                      className={`
                        mt-2
                        text-2xl
                        font-black
                        tracking-[-0.06em]
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                      `}
                    >
                      AI Monitoring Active
                    </h4>
                  </div>
                </div>

                {/* MINI STATS */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Active Scans",
                      value: "12.4K",
                    },
                    {
                      label: "AI Accuracy",
                      value: "97%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`
                        border
                        p-4
                        ${
                          darkMode
                            ? `
                              bg-white/[0.03]
                              border-white/10
                            `
                            : `
                              bg-[#F7FAF8]
                              border-[#E7ECE8]
                            `
                        }
                      `}
                    >
                      <p
                        className={`
                          text-[10px]
                          uppercase
                          tracking-[0.15em]
                          ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }
                        `}
                      >
                        {item.label}
                      </p>

                      <h3
                        className={`
                          mt-2
                          text-3xl
                          font-black
                          tracking-[-0.08em]
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                        `}
                      >
                        {item.value}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* GRID */}
          <div
            className="
            mt-12
            grid
            grid-cols-1
            xl:grid-cols-[1.15fr_0.85fr]
            gap-7
            "
          >
            {/* LEFT PANEL */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
              }}
              className={`
                relative
                overflow-hidden
                border
                shadow-[0_30px_90px_rgba(0,0,0,0.08)]
                ${
                  darkMode
                    ? `
                      bg-[#0C1712]
                      border-white/10
                    `
                    : `
                      bg-white
                      border-[#E6ECE7]
                    `
                }
              `}
            >
              {/* TOP LIGHT */}
              <div
                className="
                absolute
                top-0
                left-0
                w-full
                h-[3px]
                bg-gradient-to-r
                from-green-500
                to-transparent
                "
              />

              {/* FLOATING GLOW */}
              <div
                className="
                absolute
                -top-20
                -right-20
                w-80
                h-80
                bg-green-500/10
                blur-[120px]
                "
              />

              <div className="relative p-7 sm:p-9">
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div
                      className="
                      w-16
                      h-16
                      bg-green-500
                      flex
                      items-center
                      justify-center
                      text-white
                      text-3xl
                      shadow-[0_20px_60px_rgba(34,197,94,0.35)]
                      "
                    >
                      <FiShield />
                    </div>

                    <div>
                      <p
                        className="
                        text-[10px]
                        tracking-[0.28em]
                        font-black
                        text-green-500
                        "
                      >
                        AI RISK ENGINE
                      </p>

                      <h3
                        className={`
                          mt-2
                          text-3xl
                          sm:text-4xl
                          font-black
                          tracking-[-0.08em]
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                        `}
                      >
                        National Risk Pulse
                      </h3>
                    </div>
                  </div>

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    bg-green-500
                    px-4
                    py-3
                    text-white
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    font-black
                    shadow-[0_20px_50px_rgba(34,197,94,0.35)]
                    "
                  >
                    <FiRadio />
                    LIVE
                  </div>
                </div>

                {/* BIG NUMBER */}
                <div className="mt-12">
                  <motion.h1
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className={`
                    text-[38px]
                    sm:text-[54px]
                    lg:text-[72px]
                    leading-[0.92]
                    tracking-[-0.06em]
                    font-black
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                  >
                    97%
                  </motion.h1>

                  <div
                    className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    bg-green-500
                    px-6
                    py-4
                    text-white
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    font-black
                    shadow-[0_20px_60px_rgba(34,197,94,0.35)]
                    "
                  >
                    <FiTrendingUp />
                    AI DETECTION ACCURACY
                  </div>
                </div>

                {/* TEXT */}
                <p
                  className={`
                    mt-8
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
                  Advanced AI models continuously
                  analyze citizen reports, traffic
                  patterns, emergency density, and
                  civic infrastructure behavior to
                  predict failures before escalation.
                </p>

                {/* ALERTS */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {liveAlerts.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        y: -6,
                      }}
                      className={`
                        border
                        p-5
                        shadow-sm
                        transition-all
                        duration-300
                        ${
                          darkMode
                            ? `
                              bg-white/[0.03]
                              border-white/10
                            `
                            : `
                              bg-[#F7FAF8]
                              border-[#E7ECE8]
                            `
                        }
                      `}
                    >
                      <div
                        className="
                        w-14
                        h-14
                        bg-green-500
                        flex
                        items-center
                        justify-center
                        text-white
                        text-2xl
                        shadow-[0_15px_40px_rgba(34,197,94,0.3)]
                        "
                      >
                        {item.icon}
                      </div>

                      <h4
                        className={`
                          mt-6
                          text-3xl
                          font-black
                          tracking-[-0.08em]
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                        `}
                      >
                        {item.value}
                      </h4>

                      <p
                        className={`
                          mt-2
                          text-sm
                          leading-relaxed
                          ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-500"
                          }
                        `}
                      >
                        {item.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
              }}
              className={`
                relative
                overflow-hidden
                border
                shadow-[0_30px_90px_rgba(0,0,0,0.08)]
                ${
                  darkMode
                    ? `
                      bg-[#0C1712]
                      border-white/10
                    `
                    : `
                      bg-white
                      border-[#E6ECE7]
                    `
                }
              `}
            >
              {/* LIGHT */}
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-br
                from-green-500/5
                via-transparent
                to-transparent
                "
              />

              <div className="relative p-7 sm:p-9">
                {/* HEADER */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] font-black text-green-500">
                      LIVE ANALYTICS
                    </p>

                    <h3
                      className={`
                        mt-2
                        text-3xl
                        sm:text-4xl
                        font-black
                        tracking-[-0.08em]
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                      `}
                    >
                      AI Activity Stream
                    </h3>
                  </div>

                  <div
                    className="
                    w-16
                    h-16
                    bg-green-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-3xl
                    shadow-[0_20px_60px_rgba(34,197,94,0.35)]
                    "
                  >
                    <FiActivity />
                  </div>
                </div>

                {/* FEED */}
                <div className="mt-10 space-y-5">
                  {[
                    "AI classified 18 urgent infrastructure failures.",
                    "Flood escalation detected across connected districts.",
                    "Emergency response routing optimized successfully.",
                    "Citizen verification confidence increased to 97%.",
                  ].map((item, index) => (
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
                      whileHover={{
                        x: 4,
                      }}
                      className={`
                        group
                        border
                        p-5
                        transition-all
                        duration-300
                        ${
                          darkMode
                            ? `
                              bg-white/[0.03]
                              border-white/10
                            `
                            : `
                              bg-[#F7FAF8]
                              border-[#E7ECE8]
                            `
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                            className="
                            mt-2
                            w-3
                            h-3
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
                              {item}
                            </p>

                            <span
                              className={`
                                mt-3
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
                            text-xl
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
                  ))}
                </div>

                {/* BOTTOM CARD */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="
                  mt-8
                  bg-green-500
                  p-7
                  shadow-[0_25px_70px_rgba(34,197,94,0.35)]
                  "
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-white/70">
                        Civic Performance
                      </p>

                      <h4 className="mt-3 text-6xl font-black tracking-[-0.1em] text-white">
                        94%
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-black uppercase text-white">
                      <FiZap />
                      +12.4%
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardInsights;