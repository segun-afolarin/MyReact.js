import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import {
  FiActivity,
  FiMapPin,
  FiShield,
  FiClock,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const DashboardPageHeader = ({
  darkMode,
}) => {
  const heroContent = [
    {
      title1: "Report Problems",
      title2: "Create Change",
      paragraph:
        "Help expose damaged roads, flooding, unsafe areas, and infrastructure failures before they become bigger dangers.",
    },

    {
      title1: "Your Voice",
      title2: "Protects Communities",
      paragraph:
        "Every report helps communities respond faster and pushes attention toward neglected public infrastructure.",
    },

    {
      title1: "Smarter Cities",
      title2: "Start With Citizens",
      paragraph:
        "NationAura combines citizen reports and AI monitoring to improve safety, awareness, and accountability.",
    },

    {
      title1: "See Something",
      title2: "Report It Instantly",
      paragraph:
        "Turn real-world problems into actionable civic intelligence using live reporting and smart tracking tools.",
    },

    {
      title1: "Do not Ignore",
      title2: "Critical Issues",
      paragraph:
        "Your report could prevent accidents, reduce risks, and help emergency teams react before situations worsen.",
    },

    {
      title1: "Citizens First",
      title2: "Build Stronger Cities",
      paragraph:
        "Real change begins when communities speak up, report faster, and work together to improve public safety.",
    },

    {
      title1: "Track issues",
      title2: "Protect Lives",
      paragraph:
        "Monitor dangerous areas, follow live reports, and help authorities identify critical situations earlier.",
    },
  ];

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
    <section
      className={`
      relative
      overflow-hidden
      border
      p-6
      md:p-8
      lg:p-10
      transition-all
      duration-300
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
      <div
        className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
        "
      >
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

        {/* GLOW */}
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

        {/* CYBER LINE */}
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
        flex
        flex-col
        gap-8
        "
      >
        <div
          className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-8
          "
        >
          {/* LEFT */}
          <div className="max-w-4xl">
            {/* BADGE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className={`
              inline-flex
              items-center
              gap-3
              border
              px-4
              py-2
              mb-6
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
              <FiShield />

              <span
                className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.2em]
                "
              >
                NationAura Live Network
              </span>
            </motion.div>

            {/* DYNAMIC HERO */}
            <div className="min-h-[250px] sm:min-h-[280px]">
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
                    duration: 0.7,
                  }}
                >
                  {/* TITLE */}
                  <motion.h1
                    className={`
                    text-[2.4rem]
                    sm:text-[3.3rem]
                    lg:text-[5rem]
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
                      className="block"
                    >
                      {
                        heroContent[currentHero]
                          .title1
                      }
                    </motion.span>

                    <motion.span
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.25,
                      }}
                      className="
                      block
                      text-green-500
                      "
                    >
                      {
                        heroContent[currentHero]
                          .title2
                      }
                    </motion.span>
                  </motion.h1>

                  {/* DESCRIPTION */}
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
                      delay: 0.4,
                    }}
                    className={`
                    mt-6
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
                    {
                      heroContent[currentHero]
                        .paragraph
                    }
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* FEATURE TAGS */}
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
                delay: 0.3,
              }}
              className="
              flex
              flex-wrap
              gap-3
              mt-2
              "
            >
              {[
                "Live Reports",
                "AI Detection",
                "Fast Response",
                "Community Safety",
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                  px-4
                  py-3
                  border
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                        text-white
                        hover:bg-white/[0.05]
                      `
                      : `
                        bg-[#FAFAFA]
                        border-gray-200
                        text-black
                        hover:bg-white
                      `
                  }
                  `}
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
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
              duration: 0.5,
              delay: 0.25,
            }}
            className={`
            relative
            overflow-hidden
            border
            p-6
            min-w-[310px]
            max-w-full
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
            {/* PANEL LINE */}
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
              space-y-5
              "
            >
              {/* STATUS */}
              <div
                className="
                flex
                items-center
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
                    mb-2
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                    `}
                  >
                    Live Operations
                  </p>

                  <h3
                    className={`
                    text-xl
                    font-black
                    uppercase
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    Monitoring Active
                  </h3>
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

                  <FiActivity className="text-2xl" />
                </div>
              </div>

              {/* LIVE MESSAGE */}
              <div
                className={`
                border
                p-4
                ${
                  darkMode
                    ? `
                      bg-green-500/[0.03]
                      border-green-500/10
                    `
                    : `
                      bg-green-50
                      border-green-200
                    `
                }
                `}
              >
                <p
                  className={`
                  text-sm
                  leading-relaxed
                  ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }
                  `}
                >
                  Live reports are helping
                  communities detect risks
                  faster and improve response
                  times.
                </p>
              </div>

              {/* STATS */}
              <div
                className="
                grid
                grid-cols-2
                gap-4
                "
              >
                <motion.div
                  whileHover={{
                    y: -4,
                  }}
                  className={`
                  border
                  p-4
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
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-green-500
                    mb-3
                    "
                  >
                    <FiMapPin />

                    <span
                      className="
                      text-[11px]
                      uppercase
                      font-bold
                      tracking-[0.15em]
                      "
                    >
                      Active Zones
                    </span>
                  </div>

                  <h4
                    className={`
                    text-3xl
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    148
                  </h4>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -4,
                  }}
                  className={`
                  border
                  p-4
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
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-emerald-400
                    mb-3
                    "
                  >
                    <FiClock />

                    <span
                      className="
                      text-[11px]
                      uppercase
                      font-bold
                      tracking-[0.15em]
                      "
                    >
                      Response
                    </span>
                  </div>

                  <h4
                    className={`
                    text-3xl
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    2.4h
                  </h4>
                </motion.div>
              </div>

              {/* BUTTON */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  to="/report"
                  className="
                  w-full
                  h-14
                  flex
                  items-center
                  justify-center
                  gap-3
                  bg-green-500
                  text-white
                  font-black
                  uppercase
                  tracking-[0.15em]
                  transition-all
                  duration-300
                  hover:bg-green-400
                  "
                >
                  <FiTrendingUp />

                  Submit Report
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPageHeader;