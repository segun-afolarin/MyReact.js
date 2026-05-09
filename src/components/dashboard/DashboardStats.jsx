import { motion } from "framer-motion";

import {
  FiAlertTriangle,
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

const stats = [
  {
    title: "Reports Submitted",
    value: "1,284",
    growth: "+18%",
    description:
      "Citizen infrastructure reports",
    icon: <FiAlertTriangle />,
    glow: "from-green-500 to-emerald-600",
  },

  {
    title: "Communities Reached",
    value: "48",
    growth: "+12%",
    description:
      "Communities using NationAura",
    icon: <FiMapPin />,
    glow: "from-emerald-500 to-green-700",
  },

  {
    title: "Issues Resolved",
    value: "892",
    growth: "+24%",
    description:
      "Verified problems resolved",
    icon: <FiCheckCircle />,
    glow: "from-green-600 to-emerald-700",
  },

  {
    title: "Pending Reviews",
    value: "73",
    growth: "-8%",
    description:
      "Reports under verification",
    icon: <FiClock />,
    glow: "from-green-500 to-lime-600",
  },
];

const DashboardStats = ({
  darkMode,
}) => {
  return (
    <section className="mt-8 sm:mt-10">
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        sm:flex-row
        sm:items-end
        sm:justify-between
        gap-4
        mb-6
        "
      >
        <div>
          <p
            className={`
            text-xs
            uppercase
            tracking-[0.25em]
            font-semibold
            ${
              darkMode
                ? "text-green-400"
                : "text-green-700"
            }
            `}
          >
            Civic Analytics
          </p>

          <h2
            className={`
            mt-2
            text-3xl
            sm:text-4xl
            font-black
            tracking-[-0.04em]
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Dashboard Overview
          </h2>
        </div>

        <div
          className={`
          flex
          items-center
          gap-2
          text-sm
          font-medium
          ${
            darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }
          `}
        >
          <span
            className="
            w-2.5
            h-2.5
            bg-green-500
            animate-pulse
            "
          />

          Real-time civic infrastructure data
        </div>
      </div>

      {/* GRID */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        2xl:grid-cols-4
        gap-4
        sm:gap-5
        "
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
            }}
            className={`
            group
            relative
            overflow-hidden
            border
            p-5
            sm:p-6
            transition-all
            duration-500
            ${
              darkMode
                ? `
                  bg-[#0F1720]
                  border-white/10
                  hover:border-green-500/30
                `
                : `
                  bg-white
                  border-gray-200
                  hover:border-green-300
                `
            }
            `}
          >
            {/* TOP LIGHT */}
            <div
              className={`
              absolute
              top-0
              left-0
              right-0
              h-[2px]
              bg-gradient-to-r
              opacity-70
              ${stat.glow}
              `}
            />

            {/* GLOW */}
            <div
              className={`
              absolute
              -top-24
              -right-24
              w-52
              h-52
              blur-3xl
              opacity-0
              group-hover:opacity-20
              transition-all
              duration-700
              bg-gradient-to-br
              ${stat.glow}
              `}
            />

            {/* TOP */}
            <div
              className="
              relative
              flex
              items-start
              justify-between
              gap-4
              "
            >
              {/* ICON */}
              <motion.div
                whileHover={{
                  rotate: 6,
                  scale: 1.05,
                }}
                className={`
                w-14
                h-14
                sm:w-16
                sm:h-16
                bg-gradient-to-br
                ${stat.glow}
                text-white
                flex
                items-center
                justify-center
                text-2xl
                shadow-[0_15px_40px_rgba(34,197,94,0.25)]
                `}
              >
                {stat.icon}
              </motion.div>

              {/* GROWTH */}
              <div
                className={`
                flex
                items-center
                gap-2
                px-3
                py-2
                text-xs
                font-semibold
                ${
                  darkMode
                    ? `
                      bg-white/[0.04]
                      text-green-400
                    `
                    : `
                      bg-green-50
                      text-green-700
                    `
                }
                `}
              >
                <FiTrendingUp />

                {stat.growth}
              </div>
            </div>

            {/* VALUE */}
            <motion.h3
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className={`
              mt-8
              text-4xl
              sm:text-5xl
              font-black
              tracking-[-0.05em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              {stat.value}
            </motion.h3>

            {/* TITLE */}
            <h4
              className={`
              mt-3
              text-lg
              font-bold
              ${
                darkMode
                  ? "text-gray-100"
                  : "text-gray-900"
              }
              `}
            >
              {stat.title}
            </h4>

            {/* TEXT */}
            <p
              className={`
              mt-2
              text-sm
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }
              `}
            >
              {stat.description}
            </p>

            {/* BOTTOM BAR */}
            <motion.div
              initial={{
                width: 0,
              }}
              whileInView={{
                width: "100%",
              }}
              transition={{
                duration: 1,
                delay: index * 0.1,
              }}
              className={`
              mt-6
              h-[3px]
              bg-gradient-to-r
              ${stat.glow}
              `}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;