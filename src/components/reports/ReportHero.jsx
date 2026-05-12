import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiArrowUpRight,
  FiActivity,
  FiShield,
  FiCheckCircle,
  FiTrendingUp,
  FiMapPin,
  FiRadio,
} from "react-icons/fi";

const heroContent = [
  {
    title1: "Your",
    title2: "Voice Matters",
    text:
      "Every report you submit helps expose ignored infrastructure problems, improve public safety, and push communities closer to faster action and accountability.",
  },

  {
    title1: "Driving",
    title2: "Real Change",
    text:
      "Your civic activity is helping communities identify dangerous areas earlier and empowering authorities to respond before situations become worse.",
  },

  {
    title1: "Protect",
    title2: "Communities",
    text:
      "By reporting damaged roads, flooding, unsafe environments, and public risks, you are helping create safer and smarter cities for everyone.",
  },

  {
    title1: "Track",
    title2: "Every Update",
    text:
      "Monitor report progress, follow agency responses, and stay informed as civic issues move from detection to real-world action and resolution.",
  },

  {
    title1: "Building",
    title2: "Safer Cities",
    text:
      "Your reports are contributing to a growing nationwide network focused on transparency, faster emergency awareness, and stronger civic collaboration.",
  },
];
const stats = [
  {
    title: "Live Reports",
    value: "247",
    icon: <FiActivity />,
    growth: "+12 today",
  },

  {
    title: "Resolved",
    value: "184",
    icon: <FiCheckCircle />,
    growth: "Fast response",
  },

  {
    title: "Trust Rate",
    value: "96%",
    icon: <FiShield />,
    growth: "Verified network",
  },

  {
    title: "Coverage",
    value: "21",
    icon: <FiTrendingUp />,
    growth: "States active",
  },
];

const ReportHero = ({ darkMode }) => {
  const [currentHero, setCurrentHero] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) =>
        prev === heroContent.length - 1
          ? 0
          : prev + 1
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? `
              bg-[#071018]
              border-white/10
            `
            : `
              bg-white
              border-gray-200
            `
        }
        `}
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* GRID */}
          <div
            className="
            absolute
            inset-0
            opacity-[0.04]
            bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
            bg-[size:65px_65px]
            "
          />

          {/* GLOWS */}
          <div
            className="
            absolute
            top-[-120px]
            right-[-100px]
            w-[320px]
            h-[320px]
            bg-green-500/10
            blur-[120px]
            "
          />

          <div
            className="
            absolute
            bottom-[-120px]
            left-[-100px]
            w-[260px]
            h-[260px]
            bg-emerald-400/10
            blur-[120px]
            "
          />

          {/* TOP LINE */}
          <div
            className="
            absolute
            top-0
            left-0
            h-[1px]
            w-full
            bg-gradient-to-r
            from-transparent
            via-green-500
            to-transparent
            "
          />
        </div>

        {/* CONTENT */}
        <div
          className="
          relative
          z-10
          px-4
          sm:px-6
          lg:px-10
          py-8
          sm:py-10
          lg:py-14
          "
        >
          <div
            className="
            flex
            flex-col
            gap-10
            xl:flex-row
            xl:items-center
            xl:justify-between
            "
          >
            {/* LEFT */}
            <div className="max-w-5xl">
              {/* BADGE */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className={`
                inline-flex
                items-center
                gap-3
                border
                px-4
                py-2
                mb-5
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
                <div className="relative">
                  <div
                    className="
                    absolute
                    inset-0
                    animate-ping
                    bg-green-400
                    rounded-full
                    opacity-70
                    "
                  />

                  <div
                    className="
                    relative
                    w-3
                    h-3
                    bg-green-500
                    rounded-full
                    "
                  />
                </div>

                <span
                  className="
                  text-[10px]
                  sm:text-[11px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  "
                >
                  My Civic Reports
                </span>
              </motion.div>

              {/* HERO */}
              <div className="min-h-[220px] sm:min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHero}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -30,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                  >
                    {/* TITLE */}
                    <motion.h1
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
                      <motion.span
                        className="block"
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >
                        {
                          heroContent[currentHero]
                            .title1
                        }
                      </motion.span>

                      <motion.span
                        className="
                        block
                        text-green-500
                        "
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.1,
                        }}
                      >
                        {
                          heroContent[currentHero]
                            .title2
                        }
                      </motion.span>
                    </motion.h1>

                    {/* TEXT */}
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.25,
                      }}
                      className={`
                      mt-6
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
                      {
                        heroContent[currentHero]
                          .text
                      }
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* TAGS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="
                flex
                flex-wrap
                gap-3
                mt-2
                "
              >
                {[
                  "Live Tracking",
                  "Verified Reports",
                  "Response Updates",
                  "AI Monitoring",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      y: -3,
                    }}
                    className={`
                    px-4
                    py-3
                    border
                    text-xs
                    sm:text-sm
                    font-semibold
                    transition-all
                    duration-300
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                          text-white
                        `
                        : `
                          bg-[#FAFAFA]
                          border-gray-200
                          text-black
                        `
                    }
                    `}
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>

              {/* BUTTONS */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                }}
                className="
                mt-7
                flex
                flex-col
                sm:flex-row
                gap-4
                "
              >
                {/* PRIMARY */}
                <Link to="/report">
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="
                    group
                    relative
                    overflow-hidden
                    px-7
                    py-4
                    bg-green-500
                    text-white
                    font-black
                    uppercase
                    tracking-[0.12em]
                    flex
                    items-center
                    justify-center
                    gap-3
                    hover:bg-green-400
                    transition-all
                    duration-300
                    w-full
                    sm:w-auto
                    "
                  >
                    Submit New Report

                    <FiArrowUpRight
                      className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      "
                    />
                  </motion.button>
                </Link>

                {/* SECONDARY */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`
                  px-7
                  py-4
                  border
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition-all
                  duration-300
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                        text-white
                      `
                      : `
                        bg-[#FAFAFA]
                        border-gray-200
                        text-black
                      `
                  }
                  `}
                >
                  <FiMapPin />

                  Explore Zones
                </motion.button>
              </motion.div>
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              className="
              relative
              w-full
              xl:max-w-[420px]
              "
            >
              <div
                className={`
                relative
                overflow-hidden
                border
                ${
                  darkMode
                    ? `
                      bg-[#0D1720]
                      border-white/10
                    `
                    : `
                      bg-[#FAFAFA]
                      border-gray-200
                    `
                }
                `}
              >
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

                {/* HEADER */}
                <div className="p-5 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`
                        text-[11px]
                        uppercase
                        tracking-[0.2em]
                        mb-2
                        ${
                          darkMode
                            ? "text-gray-500"
                            : "text-gray-400"
                        }
                        `}
                      >
                        Report Activity
                      </p>

                      <h2
                        className="
                        text-5xl
                        font-black
                        text-green-500
                        "
                      >
                        98%
                      </h2>
                    </div>

                    <div
                      className="
                      relative
                      w-14
                      h-14
                      flex
                      items-center
                      justify-center
                      border
                      border-green-500/20
                      bg-green-500/10
                      text-green-500
                      "
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                        className="
                        absolute
                        inset-0
                        bg-green-500/10
                        "
                      />

                      <FiRadio className="text-xl" />
                    </div>
                  </div>
                </div>

                {/* STATS */}
                <div className="space-y-4 p-5">
                  {stats.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.7 + index * 0.1,
                      }}
                      whileHover={{
                        x: 4,
                      }}
                      className={`
                      flex
                      items-center
                      justify-between
                      p-4
                      border
                      transition-all
                      duration-300
                      ${
                        darkMode
                          ? `
                            bg-white/[0.03]
                            border-white/10
                          `
                          : `
                            bg-white
                            border-gray-200
                          `
                      }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                          w-11
                          h-11
                          bg-gradient-to-br
                          from-green-500
                          to-emerald-500
                          text-white
                          flex
                          items-center
                          justify-center
                          "
                        >
                          {item.icon}
                        </div>

                        <div>
                          <h4
                            className={`
                            text-sm
                            font-semibold
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
                            className="
                            text-xs
                            text-gray-500
                            "
                          >
                            {item.growth}
                          </p>
                        </div>
                      </div>

                      <h3
                        className="
                        text-xl
                        sm:text-2xl
                        font-black
                        text-green-500
                        "
                      >
                        {item.value}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ReportHero;