import { motion } from "framer-motion";

import {
  FiFileText,
  FiCheckCircle,
  FiShield,
  FiBriefcase,
  FiArrowUpRight,
  FiActivity,
  FiUsers,
  FiZap,
  FiTrendingUp,
} from "react-icons/fi";

const cards = [
  {
    title: "Reports Submitted",
    value: "14",
    change: "+3 this week",
    icon: <FiFileText />,
    progress: "82%",
    insight:
      "Citizens actively reporting damaged roads, flooding, and unsafe infrastructure.",
  },

  {
    title: "Issues Resolved",
    value: "9",
    change: "64% resolved",
    icon: <FiCheckCircle />,
    progress: "64%",
    insight:
      "Communities seeing faster action through verified civic collaboration.",
  },

  {
    title: "Community Trust",
    value: "92%",
    change: "Highly verified",
    icon: <FiShield />,
    progress: "92%",
    insight:
      "Transparent reporting and AI verification strengthening public confidence.",
  },

  {
    title: "Agency Responses",
    value: "3",
    change: "Government active",
    icon: <FiBriefcase />,
    progress: "58%",
    insight:
      "Authorities actively monitoring and responding to infrastructure reports.",
  },
];

const ImpactOverviewCards = ({
  darkMode,
}) => {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* GRID */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:65px_65px]
          "
        />

        {/* GLOW */}
        <div
          className="
          absolute
          top-[-180px]
          left-[10%]
          w-[420px]
          h-[420px]
          bg-green-500/10
          blur-[150px]
          "
        />

        {/* LINE */}
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

      {/* HEADER */}
      <div
        className="
        relative
        z-10
        flex
        flex-col
        xl:flex-row
        xl:items-end
        xl:justify-between
        gap-8
        mb-10
        "
      >
        {/* LEFT */}
        <div className="max-w-3xl">
          {/* BADGE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            viewport={{ once: true }}
            className={`
            inline-flex
            items-center
            gap-3
            px-4
            py-2
            border
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
            <FiActivity />

            <span
              className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.2em]
              "
            >
              LIVE IMPACT ANALYTICS
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{ once: true }}
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
            Civic Impact
            <span className="block text-green-500">
              Overview
            </span>
          </motion.h2>

          {/* DESC */}
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
            viewport={{ once: true }}
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
            Real-time civic intelligence
            showing how citizen reports,
            verified data, and government
            response are transforming
            communities across Nigeria.
          </motion.p>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className={`
          relative
          overflow-hidden
          border
          p-5
          min-w-[280px]
          ${
            darkMode
              ? `
              bg-[#081018]
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
            top-[-40px]
            right-[-40px]
            w-[150px]
            h-[150px]
            bg-green-500/10
            blur-3xl
            "
          />

          <div className="relative z-10 flex items-center gap-4">
            {/* ICON */}
            <div
              className="
              relative
              w-16
              h-16
              flex
              items-center
              justify-center
              bg-green-500
              text-white
              text-2xl
              shadow-2xl
              shadow-green-500/30
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
                bg-green-400/30
                "
              />

              <FiUsers className="relative z-10" />
            </div>

            {/* TEXT */}
            <div>
              <h3
                className="
                text-4xl
                font-black
                text-green-500
                "
              >
                2.4K+
              </h3>

              <p
                className={`
                text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
                `}
              >
                Active Citizens
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CARDS */}
      <div
        className="
        relative
        z-10
        grid
        grid-cols-1
        md:grid-cols-2
        2xl:grid-cols-4
        gap-6
        "
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
            }}
            className={`
            group
            relative
            overflow-hidden
            border
            backdrop-blur-xl
            transition-all
            duration-500
            ${
              darkMode
                ? `
                bg-white/[0.03]
                border-white/10
                hover:border-green-500/30
                `
                : `
                bg-white/90
                border-gray-200
                hover:border-green-300
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
              h-[3px]
              w-full
              bg-green-500
              "
            />

            {/* GLOW */}
            <div
              className="
              absolute
              top-[-80px]
              right-[-80px]
              w-[220px]
              h-[220px]
              bg-green-500/10
              blur-3xl
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-700
              "
            />

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

            {/* CONTENT */}
            <div className="relative z-10 p-6">
              {/* TOP */}
              <div className="flex items-start justify-between">
                {/* ICON */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotate: 4,
                  }}
                  className="
                  relative
                  w-16
                  h-16
                  flex
                  items-center
                  justify-center
                  bg-green-500
                  text-white
                  text-2xl
                  shadow-2xl
                  shadow-green-500/20
                  "
                >
                  <div
                    className="
                    absolute
                    inset-0
                    bg-white/10
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                    "
                  />

                  <div className="relative z-10">
                    {card.icon}
                  </div>
                </motion.div>

                {/* STATUS */}
                <div
                  className={`
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  border
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
                  <FiZap />

                  <span
                    className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.15em]
                    "
                  >
                    LIVE
                  </span>
                </div>
              </div>

              {/* VALUE */}
              <div className="mt-8">
                <motion.h3
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                  }}
                  viewport={{ once: true }}
                  className={`
                  text-5xl
                  sm:text-6xl
                  font-black
                  tracking-tight
                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                  `}
                >
                  {card.value}
                </motion.h3>

                <h4
                  className={`
                  mt-3
                  text-xl
                  font-black
                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                  `}
                >
                  {card.title}
                </h4>

                <p
                  className={`
                  mt-3
                  text-sm
                  leading-relaxed
                  ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                  `}
                >
                  {card.insight}
                </p>
              </div>

              {/* PROGRESS */}
              <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`
                    text-sm
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }
                    `}
                  >
                    Progress
                  </span>

                  <span
                    className="
                    text-sm
                    font-black
                    text-green-500
                    "
                  >
                    {card.progress}
                  </span>
                </div>

                {/* BAR */}
                <div
                  className={`
                  relative
                  h-3
                  overflow-hidden
                  ${
                    darkMode
                      ? "bg-white/10"
                      : "bg-gray-100"
                  }
                  `}
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: card.progress,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="
                    h-full
                    bg-green-500
                    "
                  />

                  <div
                    className="
                    absolute
                    inset-y-0
                    w-20
                    bg-white/20
                    blur-xl
                    animate-pulse
                    "
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div
                className={`
                mt-8
                pt-5
                border-t
                flex
                items-center
                justify-between
                ${
                  darkMode
                    ? "border-white/10"
                    : "border-gray-200"
                }
                `}
              >
                {/* LEFT */}
                <div>
                  <p
                    className={`
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }
                    `}
                  >
                    Latest Update
                  </p>

                  <p
                    className="
                    mt-1
                    font-bold
                    text-green-500
                    "
                  >
                    {card.change}
                  </p>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.06,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                  group/btn
                  relative
                  w-12
                  h-12
                  bg-green-500
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-xl
                  shadow-green-500/20
                  overflow-hidden
                  "
                >
                  <div
                    className="
                    absolute
                    inset-0
                    bg-white/10
                    translate-y-full
                    group-hover/btn:translate-y-0
                    transition-transform
                    duration-500
                    "
                  />

                  <FiArrowUpRight
                    className="
                    relative
                    z-10
                    transition-transform
                    duration-300
                    group-hover/btn:translate-x-1
                    group-hover/btn:-translate-y-1
                    "
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImpactOverviewCards;