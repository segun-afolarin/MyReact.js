import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FiActivity,
  FiRadio,
  FiShield,
  FiMapPin,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";

const motivationTexts = [
  {
    title: "Speak Up",
    highlight: "Save Lives",
    text: "Every report helps authorities respond faster, improve emergency response, and keep communities safer for everyone around you.",
  },
  {
    title: "Report Early",
    highlight: "Prevent Danger",
    text: "A single citizen report can help prevent accidents, flooding, power failures, unsafe roads, and other dangerous situations.",
  },
  {
    title: "Build Change",
    highlight: "Shape Nigeria",
    text: "You are helping create smarter, safer, and more responsive communities for citizens across the nation every day.",
  },
  {
    title: "See A Problem?",
    highlight: "Report It Fast",
    text: "Your report gives emergency teams and civic agencies real-time awareness needed to respond quickly to critical issues.",
  },
];
const CitizenReportHeader = ({
  darkMode,
}) => {
  const [activeText, setActiveText] =
    useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setActiveText((prev) =>
          prev ===
          motivationTexts.length - 1
            ? 0
            : prev + 1
        );
      }, 9000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <motion.div
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
        }}
        className={`
        relative
        overflow-hidden
        border
        p-5
        sm:p-7
        lg:p-9
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
        {/* GRID BACKGROUND */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:60px_60px]
          "
        />

        {/* TOP GLOW */}
        <div
          className="
          absolute
          top-[-100px]
          right-[-100px]
          w-[280px]
          h-[280px]
          bg-green-500/10
          blur-3xl
          rounded-full
          "
        />

        {/* BOTTOM GLOW */}
        <div
          className="
          absolute
          bottom-[-120px]
          left-[-80px]
          w-[240px]
          h-[240px]
          bg-emerald-500/10
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

        {/* CONTENT */}
        <div
          className="
          relative
          z-10
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-8
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* LIVE BADGE */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className={`
              inline-flex
              items-center
              gap-3
              px-4
              py-2
              border
              mb-5
              backdrop-blur-xl
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
              {/* PULSE */}
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
                sm:text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                "
              >
                National Civic Emergency
                System Active
              </span>
            </motion.div>

            {/* CHANGING CONTENT */}
            <div className="min-h-[220px] sm:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeText}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                >
                  {/* TITLE */}
                  <motion.h1
                    className={`
                    text-[2.1rem]
                    sm:text-[3rem]
                    lg:text-[4.3rem]
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
                    {
                      motivationTexts[
                        activeText
                      ].title
                    }

                    <span
                      className="
                      block
                      text-green-500
                      "
                    >
                      {
                        motivationTexts[
                          activeText
                        ].highlight
                      }
                    </span>
                  </motion.h1>

                  {/* DESCRIPTION */}
                  <motion.p
                    className={`
                    mt-5
                    max-w-2xl
                    text-[13px]
                    sm:text-[15px]
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }
                    `}
                  >
                    {
                      motivationTexts[
                        activeText
                      ].text
                    }
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* INFO STRIP */}
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
              mt-4
              flex
              flex-wrap
              items-center
              gap-3
              "
            >
              {[
                {
                  icon: FiShield,
                  text: "Verified Emergency Routing",
                },
                {
                  icon: FiMapPin,
                  text: "Live GPS Detection",
                },
                {
                  icon: FiZap,
                  text: "AI Incident Analysis",
                },
              ].map(
                (
                  item,
                  index
                ) => {
                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={index}
                      className={`
                      flex
                      items-center
                      gap-2
                      px-3.5
                      h-10
                      border
                      text-[12px]
                      sm:text-sm
                      font-semibold
                      ${
                        darkMode
                          ? `
                            bg-white/[0.03]
                            border-white/10
                            text-gray-300
                          `
                          : `
                            bg-gray-50
                            border-gray-200
                            text-gray-700
                          `
                      }
                      `}
                    >
                      <Icon className="text-green-500" />

                      {item.text}
                    </div>
                  );
                }
              )}
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className={`
            relative
            overflow-hidden
            border
            w-full
            xl:max-w-[360px]
            p-5
            sm:p-6
            ${
              darkMode
                ? `
                  bg-[#071017]
                  border-white/10
                `
                : `
                  bg-[#FAFAFA]
                  border-gray-200
                `
            }
            `}
          >
            {/* GLOW */}
            <div
              className="
              absolute
              top-[-40px]
              right-[-40px]
              w-[140px]
              h-[140px]
              bg-green-500/10
              blur-3xl
              rounded-full
              "
            />

            {/* TOP */}
            <div
              className="
              relative
              z-10
              flex
              items-center
              justify-between
              "
            >
              <div>
                <p
                  className={`
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }
                  `}
                >
                  Live Reports
                </p>

                <h3
                  className={`
                  mt-2
                  text-[2.7rem]
                  leading-none
                  font-black
                  tracking-[-0.06em]
                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                  `}
                >
                  2,481
                </h3>
              </div>

              <div
                className="
                relative
                w-14
                h-14
                border
                border-green-500/20
                bg-green-500/10
                flex
                items-center
                justify-center
                text-green-400
                text-xl
                "
              >
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0, 0.4],
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
              </div>
            </div>

            {/* STATS */}
            <div
              className="
              relative
              z-10
              mt-7
              space-y-4
              "
            >
              {[
                {
                  label:
                    "Emergency Reports Today",
                  value: "184",
                },
                {
                  label:
                    "AI Verified Incidents",
                  value: "96%",
                },
                {
                  label:
                    "Active Response Teams",
                  value: "42",
                },
              ].map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className={`
                    flex
                    items-center
                    justify-between
                    border
                    px-4
                    py-4
                    ${
                      darkMode
                        ? `
                          border-white/10
                          bg-white/[0.03]
                        `
                        : `
                          border-gray-200
                          bg-white
                        `
                    }
                    `}
                  >
                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      "
                    >
                      <FiRadio className="text-green-500 text-sm" />

                      <span
                        className={`
                        text-[13px]
                        sm:text-sm
                        ${
                          darkMode
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                        `}
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={`
                      font-black
                      text-base
                      sm:text-lg
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      {item.value}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* FOOTER */}
            <div
              className="
              relative
              z-10
              mt-6
              flex
              items-center
              justify-between
              "
            >
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

                Civic Monitoring Active
              </div>

              <button
                className="
                w-11
                h-11
                bg-green-500
                hover:bg-green-400
                text-white
                flex
                items-center
                justify-center
                transition-all
                duration-300
                "
              >
                <FiArrowUpRight />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CitizenReportHeader;