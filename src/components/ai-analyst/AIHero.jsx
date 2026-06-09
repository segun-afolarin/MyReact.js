import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiCpu,
  FiActivity,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

const AIHero = ({ darkMode }) => {
  const stats = [
    {
      label: "Reports Analyzed",
      value: "24.8K",
    },
    {
      label: "Patterns Detected",
      value: "1,284",
    },
    {
      label: "Predictions Generated",
      value: "462",
    },
    {
      label: "AI Accuracy",
      value: "94%",
    },
  ];

  const heroContent = [
    {
      paragraph:
        "Nation Aura AI continuously analyzes citizen reports to uncover trends, identify emerging risks, and generate actionable community intelligence.",
    },

    {
      paragraph:
        "By connecting thousands of reports, the intelligence engine helps communities understand challenges before they become larger problems.",
    },

    {
      paragraph:
        "Every report contributes to a smarter national picture, helping citizens and decision-makers focus on what matters most.",
    },

    {
      paragraph:
        "Artificial intelligence transforms community reports into meaningful insights, predictions, and accountability metrics.",
    },

    {
      paragraph:
        "From infrastructure challenges to service delivery concerns, AI helps uncover patterns hidden within large volumes of citizen data.",
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
          top-[-120px]
          right-[-120px]
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
          lg:p-10
        "
      >
        <div
          className="
            flex
            flex-col
            xl:flex-row
            gap-8
            xl:items-center
            xl:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-4xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1
                bg-green-500/10
                border
                border-green-500/20
                text-green-500
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
              "
            >
              <FiCpu />
              Nation Aura AI Engine
            </div>

            <h1
              className={`
                mt-4
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-black
                tracking-[-0.06em]
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
              `}
            >
              AI Community
              <span className="block text-green-500">
                Intelligence Center
              </span>
            </h1>

            <div className="mt-3 min-h-[95px] max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentHero}
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
                    duration: 0.7,
                  }}
                  className={`
                    text-base
                    sm:text-lg
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }
                  `}
                >
                  {
                    heroContent[
                      currentHero
                    ].paragraph
                  }
                </motion.p>
              </AnimatePresence>
            </div>

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  border
                  border-green-500/20
                  bg-green-500/5
                "
              >
                <FiMapPin />
                Community Intelligence
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  border
                  border-green-500/20
                  bg-green-500/5
                "
              >
                <FiShield />
                Predictive Analytics
              </div>
            </div>
          </div>

          {/* SCORE PANEL */}
          <div
            className="
              xl:w-[420px]
              border
              border-green-500/20
              bg-green-500/[0.04]
              p-6
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-green-500
                font-black
              "
            >
              AI Intelligence Score
            </p>

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
              "
            >
              <FiTrendingUp
                className="
                  text-green-500
                  text-3xl
                "
              />

              <h2
                className="
                  text-6xl
                  font-black
                  tracking-tight
                "
              >
                96.4
              </h2>
            </div>

            <p
              className={`
                mt-3
                text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
              `}
            >
              Calculated from citizen
              activity, report quality,
              emerging trends, response
              patterns, and predictive
              intelligence signals.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-xs text-gray-500 uppercase">
                  Active Analysis
                </p>

                <h4 className="text-2xl font-black">
                  24/7
                </h4>
              </div>

              <FiArrowUpRight
                className="
                  text-green-500
                  text-2xl
                "
              />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div
          className="
            mt-10
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -4,
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
                {item.label}
              </p>

              <h3
                className="
                  mt-3
                  text-4xl
                  font-black
                  tracking-tight
                "
              >
                {item.value}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* AI MISSION */}
        <div
          className="
            mt-8
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
            <FiActivity />
            AI Mission Brief
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
            Nation Aura AI transforms
            citizen reports into strategic
            intelligence, helping
            communities identify trends,
            understand challenges, and
            support data-driven decisions
            that create measurable impact.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AIHero;