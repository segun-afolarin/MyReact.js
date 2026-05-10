import { useState } from "react";

import { motion } from "framer-motion";

import {
  FiMap,
  FiDroplet,
  FiSun,
  FiTruck,
  FiAlertTriangle,
  FiLayers,
} from "react-icons/fi";

const issueTypes = [
  {
    title: "Bad Roads",
    description:
      "Report potholes, damaged roads, and unsafe streets.",
    icon: <FiMap />,
  },

  {
    title: "Drainage",
    description:
      "Blocked drainage systems and water flow issues.",
    icon: <FiDroplet />,
  },

  {
    title: "Street Lights",
    description:
      "Broken or inactive public street lighting.",
    icon: <FiSun />,
  },

  {
    title: "Traffic",
    description:
      "Heavy traffic, blocked roads, or road obstructions.",
    icon: <FiTruck />,
  },

  {
    title: "Flooding",
    description:
      "Flooded roads, drainage overflow, and water risks.",
    icon: <FiAlertTriangle />,
  },

  {
    title: "Infrastructure",
    description:
      "Public infrastructure damage and safety concerns.",
    icon: <FiLayers />,
  },
];

const IssueTypeSelector = ({
  darkMode,
}) => {
  const [active, setActive] =
    useState("Bad Roads");

  return (
    <section
      className={`
      relative
      overflow-hidden
      rounded-[32px]
      border
      p-6
      md:p-8
      ${
        darkMode
          ? `
            bg-white/[0.04]
            border-white/10
            backdrop-blur-2xl
          `
          : `
            bg-white/80
            border-gray-200
            backdrop-blur-2xl
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
        {/* GLOW */}
        <div
          className="
          absolute
          top-[-100px]
          left-[-80px]
          w-[220px]
          h-[220px]
          bg-green-500/10
          blur-3xl
          rounded-full
          "
        />

        {/* GRID */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:60px_60px]
          "
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="mb-8">
          <h2
            className={`
            text-2xl
            font-black
            tracking-tight
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Select Issue Type
          </h2>

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
            Choose the infrastructure
            issue category before
            submitting your report.
          </p>
        </div>

        {/* GRID */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >
          {issueTypes.map(
            (item, index) => {
              const isActive =
                active === item.title;

              return (
                <motion.button
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay:
                      index * 0.06,
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={() =>
                    setActive(
                      item.title
                    )
                  }
                  className={`
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  p-5
                  text-left
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-green-500
                        border-green-500
                        text-white
                        shadow-[0_18px_40px_rgba(34,197,94,0.30)]
                      `
                      : darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                        text-white
                      `
                      : `
                        bg-white
                        border-gray-200
                        text-black
                      `
                  }
                  `}
                >
                  {/* ACTIVE GLOW */}
                  {isActive && (
                    <div
                      className="
                      absolute
                      inset-0
                      bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_60%)]
                      "
                    />
                  )}

                  {/* TOP */}
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
                    {/* ICON */}
                    <motion.div
                      whileHover={{
                        rotate: 4,
                        scale: 1.08,
                      }}
                      className={`
                      flex
                      items-center
                      justify-center
                      w-14
                      h-14
                      rounded-2xl
                      text-[24px]
                      shrink-0
                      ${
                        isActive
                          ? `
                            bg-white/20
                            text-white
                          `
                          : `
                            bg-green-500/15
                            text-green-500
                          `
                      }
                      `}
                    >
                      {item.icon}
                    </motion.div>

                    {/* BADGE */}
                    {isActive && (
                      <div
                        className="
                        px-3
                        py-2
                        rounded-full
                        bg-white/20
                        text-white
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.14em]
                        "
                      >
                        Selected
                      </div>
                    )}
                  </div>

                  {/* TEXT */}
                  <div className="relative z-10 mt-5">
                    <h3
                      className="
                      text-lg
                      font-black
                      tracking-tight
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`
                      mt-3
                      text-sm
                      leading-relaxed
                      ${
                        isActive
                          ? "text-white/80"
                          : darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                      `}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* BOTTOM */}
                  <div
                    className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                    mt-6
                    "
                  >
                    <span
                      className={`
                      text-xs
                      uppercase
                      tracking-[0.16em]
                      font-semibold
                      ${
                        isActive
                          ? "text-white"
                          : "text-green-500"
                      }
                      `}
                    >
                      Infrastructure
                    </span>

                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      className={`
                      flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-full
                      ${
                        isActive
                          ? `
                            bg-white/20
                            text-white
                          `
                          : `
                            bg-green-500
                            text-white
                          `
                      }
                      `}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default IssueTypeSelector;