import { motion } from "framer-motion";

import {
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowUpRight,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

const activities = [
  {
    title: "Road Damage Report Submitted",
    location: "Wuse 2, Abuja",
    status: "Pending Review",
    icon: <FiAlertCircle />,
    color: "from-orange-500 to-amber-500",
    badge:
      "bg-orange-500/15 text-orange-400 border-orange-500/20",
    time: "2 mins ago",
  },

  {
    title: "Flooding Issue Verified",
    location: "Lekki Phase 1, Lagos",
    status: "Verified",
    icon: <FiCheckCircle />,
    color: "from-green-500 to-emerald-600",
    badge:
      "bg-green-500/15 text-green-400 border-green-500/20",
    time: "12 mins ago",
  },

  {
    title: "Streetlight Repair In Progress",
    location: "Port Harcourt",
    status: "In Progress",
    icon: <FiClock />,
    color: "from-blue-500 to-cyan-600",
    badge:
      "bg-blue-500/15 text-blue-400 border-blue-500/20",
    time: "25 mins ago",
  },

  {
    title: "Electricity Complaint Resolved",
    location: "Ibadan",
    status: "Resolved",
    icon: <FiCheckCircle />,
    color: "from-emerald-500 to-green-700",
    badge:
      "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    time: "1 hour ago",
  },
];

const DashboardActivity = ({ darkMode }) => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{ once: true }}

      transition={{
        duration: 0.5,
      }}

      className={`
      relative
      overflow-hidden
      border
      transition-all
      duration-500
      ${
        darkMode
          ? `
            bg-[#0B1620]/95
            border-white/10
          `
          : `
            bg-white/90
            border-gray-200
          `
      }
      `}
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute
        -top-24
        -right-24
        w-72
        h-72
        rounded-full
        bg-green-500/10
        blur-3xl
        "
      />

      {/* GRID */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
        bg-[size:35px_35px]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* HEADER */}
        <div
          className={`
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-5
          p-5
          md:p-6
          border-b
          ${
            darkMode
              ? "border-white/10"
              : "border-gray-200"
          }
          `}
        >
          {/* LEFT */}
          <div>

            <div
              className={`
              inline-flex
              items-center
              gap-2
              px-3
              py-2
              mb-4
              border
              text-[11px]
              font-semibold
              tracking-[0.2em]
              uppercase
              ${
                darkMode
                  ? `
                    bg-white/[0.03]
                    border-white/10
                    text-green-300
                  `
                  : `
                    bg-[#F8FAF9]
                    border-gray-200
                    text-green-700
                  `
              }
              `}
            >
              <div className="w-2 h-2 bg-green-500 animate-pulse" />

              Real-Time Feed
            </div>

            <h2
              className={`
              text-2xl
              md:text-3xl
              font-black
              tracking-tight
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              Civic Activity
            </h2>

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
              Live infrastructure events,
              verifications, and response updates.
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
            flex
            items-center
            gap-3
            "
          >
            {/* LIVE */}
            <div
              className={`
              hidden
              md:flex
              items-center
              gap-2
              px-4
              h-12
              border
              ${
                darkMode
                  ? `
                    bg-white/[0.03]
                    border-white/10
                    text-gray-300
                  `
                  : `
                    bg-[#F8FAF9]
                    border-gray-200
                    text-gray-700
                  `
              }
              `}
            >
              <FiTrendingUp className="text-green-500" />

              <span className="text-sm font-medium">
                +38% Activity
              </span>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                y: -2,
              }}

              whileTap={{
                scale: 0.97,
              }}

              className="
              h-12
              px-5
              bg-gradient-to-r
              from-green-600
              to-emerald-700
              text-white
              font-semibold
              shadow-[0_12px_30px_rgba(34,197,94,0.3)]
              "
            >
              <span
                className="
                flex
                items-center
                gap-2
                "
              >
                View All

                <FiArrowUpRight />
              </span>
            </motion.button>
          </div>
        </div>

        {/* ACTIVITY LIST */}
        <div className="p-5 md:p-6 space-y-4">

          {activities.map((activity, index) => (
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
                duration: 0.4,
                delay: index * 0.08,
              }}

              viewport={{ once: true }}

              whileHover={{
                y: -3,
              }}

              className={`
              group
              relative
              overflow-hidden
              border
              transition-all
              duration-500
              ${
                darkMode
                  ? `
                    bg-white/[0.03]
                    border-white/10
                    hover:bg-white/[0.05]
                    hover:border-green-500/20
                  `
                  : `
                    bg-[#F8FAF9]
                    border-gray-200
                    hover:bg-white
                    hover:border-green-300
                  `
              }
              `}
            >
              {/* LEFT ACCENT */}
              <div
                className={`
                absolute
                left-0
                top-0
                bottom-0
                w-[4px]
                bg-gradient-to-b
                ${activity.color}
                `}
              />

              {/* HOVER GLOW */}
              <div
                className={`
                absolute
                -right-16
                -top-16
                w-40
                h-40
                rounded-full
                opacity-0
                blur-3xl
                transition-all
                duration-500
                group-hover:opacity-20
                bg-gradient-to-br
                ${activity.color}
                `}
              />

              {/* CONTENT */}
              <div
                className="
                relative
                p-4
                md:p-5
                flex
                flex-col
                sm:flex-row
                sm:items-start
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
                  relative
                  w-14
                  h-14
                  flex-shrink-0
                  bg-gradient-to-br
                  ${activity.color}
                  text-white
                  flex
                  items-center
                  justify-center
                  text-xl
                  shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                  `}
                >
                  {/* PULSE */}
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0, 0.4],
                    }}

                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}

                    className="
                    absolute
                    inset-0
                    border
                    border-white/40
                    "
                  />

                  {activity.icon}
                </motion.div>

                {/* BODY */}
                <div className="flex-1 min-w-0">

                  {/* TOP */}
                  <div
                    className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                    gap-4
                    "
                  >
                    {/* TEXT */}
                    <div className="min-w-0">

                      <h3
                        className={`
                        text-lg
                        md:text-xl
                        font-bold
                        leading-tight
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        `}
                      >
                        {activity.title}
                      </h3>

                      <div
                        className={`
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        gap-x-5
                        gap-y-2
                        text-sm
                        ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
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
                          <FiMapPin />

                          {activity.location}
                        </div>

                        <div
                          className="
                          flex
                          items-center
                          gap-2
                          "
                        >
                          <FiClock />

                          {activity.time}
                        </div>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div
                      className={`
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      border
                      text-xs
                      font-semibold
                      tracking-wide
                      whitespace-nowrap
                      self-start
                      ${activity.badge}
                      `}
                    >
                      <div className="w-2 h-2 rounded-full bg-current" />

                      {activity.status}
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div
                    className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    gap-4
                    "
                  >
                    {/* AI */}
                    <div
                      className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                      `}
                    >
                      <FiActivity className="text-green-500" />

                      AI Monitoring Active
                    </div>

                    {/* BUTTON */}
                    <motion.button
                      whileHover={{
                        x: 3,
                      }}

                      className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      transition-all
                      duration-300
                      ${
                        darkMode
                          ? "text-green-400 hover:text-green-300"
                          : "text-green-700 hover:text-green-800"
                      }
                      `}
                    >
                      View Details

                      <FiArrowUpRight />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardActivity;