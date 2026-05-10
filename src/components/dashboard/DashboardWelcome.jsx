import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FiArrowUpRight,
  FiActivity,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const DashboardWelcome = ({
  darkMode,
}) => {
  const stats = [
    {
      title: "Reports",
      value: "1.2K",
    },

    {
      title: "Resolved",
      value: "892",
    },

    {
      title: "Response",
      value: "91%",
    },
  ];

 const heroContent = [
  {
    title1: "Welcome Back",
    title2: "Afolarin",
    paragraph:
      "Your civic intelligence network is actively monitoring reports, infrastructure updates, and emergency alerts across Nigerian communities.",
  },

  {
    title1: "Smarter",
    title2: "Civic Intelligence",
    paragraph:
      "Track infrastructure reports, monitor response efficiency, and improve transparency across communities in Nigeria.",
  },

  {
    title1: "Real-Time",
    title2: "Community Impact",
    paragraph:
      "Analyze live public reports, detect urgent issues faster, and empower citizens through AI-powered civic monitoring.",
  },

  {
    title1: "Nigeria Needs",
    title2: "Your Voice",
    paragraph:
      "Every verified report you submit helps communities grow safer, cleaner, and more accountable. Real change starts with citizens who refuse to stay silent.",
  },

  {
    title1: "Keep Building",
    title2: "The Future",
    paragraph:
      "Do not give up on Nigeria. Every action, report, and community insight you share is helping create a smarter and stronger nation for the next generation.",
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
        duration: 0.6,
      }}
      className={`
      relative
      overflow-hidden
      border
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
      {/* BACKGROUND */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        "
        style={{
          backgroundImage: `
          linear-gradient(to right, #22c55e 1px, transparent 1px),
          linear-gradient(to bottom, #22c55e 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
        absolute
        top-0
        right-0
        w-72
        h-72
        bg-green-500/10
        blur-3xl
        "
      />

      {/* CONTENT */}
      <div
        className="
        relative
        z-10
        p-5
        sm:p-6
        lg:p-8
        "
      >
        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-[1fr_340px]
          gap-6
          items-start
          "
        >
          {/* LEFT */}
          <div>
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
                    text-green-300
                  `
                  : `
                    bg-green-50
                    border-green-200
                    text-green-700
                  `
              }
              `}
            >
              <span
                className="
                relative
                flex
                w-2.5
                h-2.5
                "
              >
                <span
                  className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  bg-green-400
                  "
                />

                <span
                  className="
                  relative
                  inline-flex
                  h-2.5
                  w-2.5
                  bg-green-500
                  "
                />
              </span>

              <span
                className="
                text-xs
                font-semibold
                tracking-[0.15em]
                uppercase
                "
              >
                Live Civic Activity
              </span>
            </motion.div>

            {/* TITLE */}
            <div className="min-h-[220px] sm:min-h-[250px]">
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
                  <motion.h1
                    className={`
                    text-[38px]
                    sm:text-[54px]
                    lg:text-[72px]
                    leading-[0.92]
                    tracking-[-0.06em]
                    font-black
                    break-words
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
                        delay:
                          currentHero === 0
                            ? 0.5
                            : 0.1,
                      }}
                      className="block"
                    >
                      {heroContent[currentHero]
                        .title1}
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
                        delay:
                          currentHero === 0
                            ? 1.2
                            : 0.3,
                      }}
                      className="
                      block
                      mt-1
                      bg-gradient-to-r
                      from-green-400
                      via-emerald-500
                      to-green-600
                      bg-clip-text
                      text-transparent
                      "
                    >
                      {heroContent[currentHero]
                        .title2}
                    </motion.span>
                  </motion.h1>

                  {/* PARAGRAPH */}
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
                      delay:
                        currentHero === 0
                          ? 1.8
                          : 0.5,
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
                        .paragraph
                    }
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* STATS */}
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
                delay: 0.5,
              }}
              className="
              mt-2
              grid
              grid-cols-3
              gap-3
              "
            >
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
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
                        hover:bg-white/[0.05]
                      `
                      : `
                        bg-[#FAFAFA]
                        border-gray-200
                        hover:bg-white
                      `
                  }
                  `}
                >
                  <h3
                    className={`
                    text-xl
                    sm:text-2xl
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    {item.value}
                  </h3>

                  <p
                    className={`
                    mt-1
                    text-xs
                    sm:text-sm
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }
                    `}
                  >
                    {item.title}
                  </p>
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
                delay: 0.6,
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
              <motion.button
                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                group
                relative
                overflow-hidden
                h-13
                px-6
                bg-gradient-to-r
                from-green-600
                to-emerald-700
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-3
                shadow-[0_15px_40px_rgba(34,197,94,0.25)]
                "
              >
                <span
                  className="
                  absolute
                  inset-0
                  bg-white/10
                  translate-x-[-100%]
                  group-hover:translate-x-[100%]
                  transition-all
                  duration-1000
                  "
                />

                Report Issue

                <FiArrowUpRight />
              </motion.button>

              {/* SECONDARY */}
              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`
                h-13
                px-6
                border
                font-semibold
                transition-all
                duration-300
                ${
                  darkMode
                    ? `
                      border-white/10
                      bg-white/[0.03]
                      text-white
                      hover:bg-white/[0.05]
                    `
                    : `
                      border-gray-200
                      bg-[#FAFAFA]
                      text-black
                      hover:bg-white
                    `
                }
                `}
              >
                Track Reports
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.5,
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
                  bg-[#FAFAFA]
                  border-gray-200
                `
            }
            `}
          >
            {/* HEADER */}
            <div
              className="
              flex
              items-center
              justify-between
              "
            >
              <div>
                <p
                  className={`
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }
                  `}
                >
                  Analytics
                </p>

                <h3
                  className={`
                  mt-2
                  text-2xl
                  font-bold
                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                  `}
                >
                  Civic Impact
                </h3>
              </div>

              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 5,
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
                text-xl
                "
              >
                <FiActivity />
              </motion.div>
            </div>

            {/* SCORE */}
            <div className="mt-8">
              <div
                className="
                flex
                items-end
                justify-between
                "
              >
                <div>
                  <h2
                    className={`
                    text-5xl
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    91%
                  </h2>

                  <p
                    className={`
                    mt-2
                    text-sm
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }
                    `}
                  >
                    Response Efficiency
                  </p>
                </div>

                <div
                  className="
                  flex
                  items-center
                  gap-2
                  text-green-500
                  font-semibold
                  "
                >
                  <FiTrendingUp />

                  +12%
                </div>
              </div>

              {/* BAR */}
              <div
                className={`
                mt-5
                h-3
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
                  animate={{
                    width: "91%",
                  }}
                  transition={{
                    duration: 1.3,
                    delay: 0.8,
                  }}
                  className="
                  h-full
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-600
                  "
                />
              </div>
            </div>

            {/* AI CARD */}
            <motion.div
              whileHover={{
                y: -4,
              }}
              className={`
              mt-6
              border
              p-4
              ${
                darkMode
                  ? `
                    bg-green-500/10
                    border-green-500/20
                  `
                  : `
                    bg-green-50
                    border-green-200
                  `
              }
              `}
            >
              <div
                className="
                flex
                items-start
                gap-4
                "
              >
                <div
                  className="
                  w-11
                  h-11
                  shrink-0
                  bg-green-500
                  text-white
                  flex
                  items-center
                  justify-center
                  "
                >
                  <FiZap />
                </div>

                <div>
                  <h4
                    className={`
                    font-bold
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    AI Insight
                  </h4>

                  <p
                    className={`
                    mt-2
                    text-sm
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-600"
                    }
                    `}
                  >
                    Flood reports increased by
                    18% in Abuja this week.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardWelcome;