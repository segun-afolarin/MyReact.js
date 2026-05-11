import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiMapPin,
  FiAlertTriangle,
  FiClock,
  FiNavigation,
  FiArrowUpRight,
  FiRadio,
  FiShield,
  FiActivity,
} from "react-icons/fi";

const nearbyIssues = [
  {
    title: "Collapsed Road Section",
    category: "Road Damage",
    location: "Rayfield Junction",
    distance: "0.8 KM",
    time: "14 mins ago",
    severity: "Critical",
    confirmations: "42 Citizens Nearby",
  },

  {
    title: "Blocked Drainage System",
    category: "Drainage",
    location: "Bukuru Market Road",
    distance: "1.4 KM",
    time: "29 mins ago",
    severity: "Medium",
    confirmations: "18 Citizens Nearby",
  },

  {
    title: "Street Light Failure",
    category: "Electricity",
    location: "Old Airport Road",
    distance: "2.1 KM",
    time: "1 hour ago",
    severity: "Low",
    confirmations: "9 Citizens Nearby",
  },

  {
    title: "Flood Risk Zone",
    category: "Flood Alert",
    location: "Terminus Junction",
    distance: "2.7 KM",
    time: "2 hours ago",
    severity: "High",
    confirmations: "31 Citizens Nearby",
  },
];

const NearbyIssues = ({
  darkMode,
}) => {
  const [detecting, setDetecting] =
    useState(false);

  const [showIssues, setShowIssues] =
    useState(false);

  const handleDetectLocation = () => {
    if (showIssues) return;

    setDetecting(true);

    setTimeout(() => {
      setDetecting(false);
      setShowIssues(true);
    }, 1800);
  };

  return (
    <section
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
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:55px_55px]
          "
        />

        {/* GLOW */}
        <div
          className="
          absolute
          top-[-120px]
          right-[-100px]
          w-[300px]
          h-[300px]
          bg-green-500/10
          blur-[120px]
          "
        />

        {/* LINE */}
        <div
          className="
          absolute
          top-0
          left-0
          h-[2px]
          w-full
          bg-gradient-to-r
          from-green-500
          via-green-400
          to-transparent
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
        relative
        z-10
        p-4
        sm:p-6
        lg:p-8
        "
      >
        {/* HEADER */}
        <div
          className="
          flex
          flex-col
          xl:flex-row
          xl:items-end
          xl:justify-between
          gap-6
          mb-8
          "
        >
          {/* LEFT */}
          <div className="max-w-2xl">
            {/* BADGE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
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
              <div
                className="
                relative
                flex
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
                  opacity-75
                  "
                />

                <span
                  className="
                  relative
                  inline-flex
                  w-2.5
                  h-2.5
                  bg-green-500
                  "
                />
              </div>

              <span
                className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.22em]
                "
              >
                Real-Time Nearby Activity
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h2
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
              className={`
              text-[1.9rem]
              sm:text-[2.8rem]
              lg:text-[3.7rem]
              leading-[0.95]
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
              Issues Around
              <span
                className="
                block
                text-green-500
                "
              >
                Your Location
              </span>
            </motion.h2>

            {/* TEXT */}
            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
              }}
              className={`
              mt-5
              text-sm
              sm:text-base
              leading-relaxed
              max-w-xl
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
              `}
            >
              NationAura tracks nearby
              citizen reports in real time,
              helping communities identify
              urgent infrastructure risks
              before they escalate.
            </motion.p>
          </div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className={`
            border
            p-5
            min-w-full
            sm:min-w-[320px]
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
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }
                  `}
                >
                  AI Detection Radius
                </p>

                <h3
                  className={`
                  mt-2
                  text-3xl
                  font-black
                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                  `}
                >
                  4.8 KM
                </h3>

                <p
                  className="
                  mt-2
                  text-green-500
                  text-sm
                  font-semibold
                  "
                >
                  Active civic monitoring
                </p>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="
                relative
                w-16
                h-16
                bg-green-500/10
                border
                border-green-500/20
                flex
                items-center
                justify-center
                text-green-500
                text-2xl
                overflow-hidden
                "
              >
                {detecting && (
                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0.8,
                    }}
                    animate={{
                      scale: 2.4,
                      opacity: 0,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                    className="
                    absolute
                    inset-0
                    border
                    border-green-500/30
                    "
                  />
                )}

                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
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

                <FiActivity className="relative z-10" />
              </motion.div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={handleDetectLocation}
              disabled={detecting}
              className="
              mt-5
              w-full
              h-14
              bg-green-500
              text-white
              font-black
              uppercase
              tracking-[0.15em]
              flex
              items-center
              justify-center
              gap-3
              hover:bg-green-400
              transition-all
              duration-300
              disabled:opacity-80
              "
            >
              <motion.div
                animate={
                  detecting
                    ? {
                        rotate: 360,
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              >
                <FiNavigation />
              </motion.div>

              {detecting
                ? "Detecting Location..."
                : showIssues
                ? "Location Detected"
                : "Detect My Location"}
            </motion.button>
          </motion.div>
        </div>

        {/* ISSUES */}
        <AnimatePresence>
          {showIssues && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="space-y-4"
            >
              {nearbyIssues.map(
                (issue, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 35,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      delay:
                        index * 0.12,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className={`
                    group
                    relative
                    overflow-hidden
                    border
                    p-5
                    sm:p-6
                    transition-all
                    duration-300
                    ${
                      darkMode
                        ? `
                          bg-[#0A141D]
                          border-white/10
                        `
                        : `
                          bg-white
                          border-gray-200
                        `
                    }
                    `}
                  >
                    {/* TOP LINE */}
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 1,
                        delay:
                          0.3 +
                          index * 0.1,
                      }}
                      className="
                      absolute
                      top-0
                      left-0
                      h-[2px]
                      bg-gradient-to-r
                      from-green-500
                      to-transparent
                      "
                    />

                    <div
                      className="
                      flex
                      flex-col
                      xl:flex-row
                      xl:items-start
                      xl:justify-between
                      gap-6
                      "
                    >
                      {/* LEFT */}
                      <div className="flex-1">
                        {/* TAGS */}
                        <div
                          className="
                          flex
                          flex-wrap
                          items-center
                          gap-3
                          mb-5
                          "
                        >
                          <div
                            className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            bg-green-500/10
                            border
                            border-green-500/20
                            text-green-500
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            "
                          >
                            <FiAlertTriangle />

                            {issue.category}
                          </div>

                          <div
                            className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            border
                            border-white/10
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            text-white
                            "
                          >
                            <FiShield />

                            {issue.severity}
                          </div>
                        </div>

                        {/* TITLE */}
                        <h3
                          className={`
                          text-xl
                          sm:text-2xl
                          font-black
                          leading-tight
                          tracking-[-0.04em]
                          break-words
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                          `}
                        >
                          {issue.title}
                        </h3>

                        {/* META */}
                        <div
                          className="
                          flex
                          flex-wrap
                          items-center
                          gap-4
                          mt-5
                          "
                        >
                          <div
                            className={`
                            flex
                            items-center
                            gap-2
                            text-sm
                            ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                            `}
                          >
                            <FiMapPin />

                            {issue.location}
                          </div>

                          <div
                            className={`
                            flex
                            items-center
                            gap-2
                            text-sm
                            ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                            `}
                          >
                            <FiClock />

                            {issue.time}
                          </div>

                          <div
                            className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-green-500
                            font-semibold
                            "
                          >
                            <FiRadio />

                            {issue.confirmations}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div
                        className="
                        flex
                        flex-col
                        items-start
                        xl:items-end
                        gap-4
                        w-full
                        xl:w-auto
                        "
                      >
                        <div
                          className="
                          px-4
                          py-3
                          bg-green-500/10
                          border
                          border-green-500/20
                          text-green-500
                          text-xs
                          font-black
                          uppercase
                          tracking-[0.15em]
                          "
                        >
                          {issue.distance}
                        </div>

                        <motion.button
                          whileHover={{
                            x: 4,
                          }}
                          className="
                          h-12
                          w-full
                          sm:w-auto
                          px-5
                          bg-green-500
                          text-white
                          text-sm
                          font-black
                          uppercase
                          tracking-[0.14em]
                          flex
                          items-center
                          justify-center
                          gap-3
                          hover:bg-green-400
                          transition-all
                          duration-300
                          "
                        >
                          View Details

                          <FiArrowUpRight />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NearbyIssues;