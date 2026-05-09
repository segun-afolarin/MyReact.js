import { motion } from "framer-motion";

import {
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiLoader,
  FiArrowUpRight,
  FiTrendingUp,
} from "react-icons/fi";

const reports = [
  {
    title: "Collapsed Drainage System",
    location: "Wuse 2, Abuja",
    status: "Under Review",
    date: "2 hours ago",
    priority: "High",
    progress: "68%",
    icon: <FiAlertTriangle />,
    statusColor:
      "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    glow: "from-yellow-400 to-orange-500",
  },

  {
    title: "Major Road Damage",
    location: "Lekki Phase 1, Lagos",
    status: "In Progress",
    date: "5 hours ago",
    priority: "Critical",
    progress: "91%",
    icon: <FiLoader />,
    statusColor:
      "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    glow: "from-cyan-500 to-blue-600",
  },

  {
    title: "Streetlight Failure",
    location: "Garki, Abuja",
    status: "Resolved",
    date: "Yesterday",
    priority: "Medium",
    progress: "100%",
    icon: <FiCheckCircle />,
    statusColor:
      "bg-green-500/15 text-green-400 border-green-500/20",
    glow: "from-green-500 to-emerald-700",
  },

  {
    title: "Flooded Community Road",
    location: "Port Harcourt",
    status: "Reported",
    date: "30 mins ago",
    priority: "High",
    progress: "24%",
    icon: <FiMapPin />,
    statusColor:
      "bg-red-500/15 text-red-400 border-red-500/20",
    glow: "from-red-500 to-rose-600",
  },
];

const DashboardReports = ({ darkMode }) => {
  return (
    <section className="relative mt-2">

      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
        mb-6
        "
      >
        {/* LEFT */}
        <div>

          <div
            className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            mb-4
            text-xs
            font-semibold
            tracking-[0.2em]
            uppercase
            border
            ${
              darkMode
                ? "bg-white/[0.04] border-white/10 text-green-300"
                : "bg-white border-gray-200 text-green-700"
            }
            `}
          >
            <div className="w-2 h-2 bg-green-500 animate-pulse" />

            Live Civic Reports
          </div>

          <h2
            className={`
            text-3xl
            md:text-4xl
            font-black
            tracking-tight
            leading-tight
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Infrastructure
            <span
              className="
              block
              bg-gradient-to-r
              from-green-500
              to-emerald-600
              bg-clip-text
              text-transparent
              "
            >
              Intelligence Feed
            </span>
          </h2>

          <p
            className={`
            mt-3
            max-w-2xl
            text-sm
            md:text-base
            leading-relaxed
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }
            `}
          >
            Real-time civic reports powered by AI
            verification, geolocation tracking,
            and community engagement.
          </p>
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{
            y: -2,
            scale: 1.02,
          }}

          whileTap={{
            scale: 0.97,
          }}

          className="
          relative
          overflow-hidden
          group
          h-[58px]
          px-7
          border
          border-green-500/20
          bg-gradient-to-r
          from-green-600
          to-emerald-700
          text-white
          font-semibold
          tracking-wide
          shadow-[0_15px_40px_rgba(34,197,94,0.35)]
          transition-all
          duration-300
          "
        >
          {/* SHINE */}
          <div
            className="
            absolute
            inset-0
            -translate-x-full
            group-hover:translate-x-full
            transition-transform
            duration-1000
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            "
          />

          <span
            className="
            relative
            z-10
            flex
            items-center
            gap-3
            "
          >
            Submit New Report

            <FiArrowUpRight className="text-lg" />
          </span>
        </motion.button>
      </div>

      {/* REPORTS */}
      <div className="space-y-5">

        {reports.map((report, index) => (
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

            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}

            viewport={{ once: true }}

            whileHover={{
              y: -4,
            }}

            className={`
            group
            relative
            overflow-hidden
            border
            backdrop-blur-2xl
            transition-all
            duration-500
            ${
              darkMode
                ? `
                  bg-[#0C1620]/90
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
            {/* LEFT ACCENT */}
            <div
              className={`
              absolute
              left-0
              top-0
              bottom-0
              w-[5px]
              bg-gradient-to-b
              ${report.glow}
              `}
            />

            {/* GLOW */}
            <div
              className={`
              absolute
              -top-20
              -right-20
              w-52
              h-52
              rounded-full
              blur-3xl
              opacity-0
              group-hover:opacity-20
              transition-all
              duration-500
              bg-gradient-to-br
              ${report.glow}
              `}
            />

            {/* CONTENT */}
            <div
              className="
              relative
              p-5
              md:p-6
              lg:p-7
              "
            >
              <div
                className="
                flex
                flex-col
                xl:flex-row
                xl:items-center
                xl:justify-between
                gap-6
                "
              >
                {/* LEFT */}
                <div
                  className="
                  flex
                  items-start
                  gap-4
                  min-w-0
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
                    w-16
                    h-16
                    flex-shrink-0
                    bg-gradient-to-br
                    ${report.glow}
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
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

                    {report.icon}
                  </motion.div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">

                    {/* TOP */}
                    <div
                      className="
                      flex
                      flex-wrap
                      items-center
                      gap-3
                      "
                    >
                      <h3
                        className={`
                        text-xl
                        md:text-2xl
                        font-bold
                        tracking-tight
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        `}
                      >
                        {report.title}
                      </h3>

                      <div
                        className={`
                        px-3
                        py-1.5
                        border
                        text-xs
                        font-semibold
                        tracking-wide
                        ${report.statusColor}
                        `}
                      >
                        {report.status}
                      </div>
                    </div>

                    {/* META */}
                    <div
                      className="
                      mt-4
                      flex
                      flex-wrap
                      items-center
                      gap-x-5
                      gap-y-3
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
                            : "text-gray-500"
                        }
                        `}
                      >
                        <FiMapPin />

                        {report.location}
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
                            : "text-gray-500"
                        }
                        `}
                      >
                        <FiClock />

                        {report.date}
                      </div>

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-green-500
                        font-medium
                        "
                      >
                        <FiTrendingUp />

                        AI Confidence {report.progress}
                      </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="mt-5">

                      <div
                        className="
                        flex
                        items-center
                        justify-between
                        mb-2
                        "
                      >
                        <span
                          className={`
                          text-xs
                          uppercase
                          tracking-[0.15em]
                          ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }
                          `}
                        >
                          Verification Progress
                        </span>

                        <span
                          className="
                          text-sm
                          font-semibold
                          text-green-500
                          "
                        >
                          {report.progress}
                        </span>
                      </div>

                      <div
                        className={`
                        h-2
                        overflow-hidden
                        ${
                          darkMode
                            ? "bg-white/5"
                            : "bg-gray-100"
                        }
                        `}
                      >
                        <motion.div
                          initial={{
                            width: 0,
                          }}

                          whileInView={{
                            width: report.progress,
                          }}

                          transition={{
                            duration: 1,
                            delay: 0.2,
                          }}

                          viewport={{ once: true }}

                          className={`
                          h-full
                          bg-gradient-to-r
                          ${report.glow}
                          `}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                  flex
                  flex-row
                  xl:flex-col
                  items-center
                  justify-between
                  xl:justify-center
                  gap-5
                  "
                >
                  {/* PRIORITY */}
                  <div
                    className={`
                    min-w-[120px]
                    border
                    px-5
                    py-4
                    text-center
                    ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10"
                        : "bg-[#F8FAF9] border-gray-200"
                    }
                    `}
                  >
                    <p
                      className={`
                      text-[11px]
                      uppercase
                      tracking-[0.2em]
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                      `}
                    >
                      Priority
                    </p>

                    <h4
                      className={`
                      mt-2
                      text-lg
                      font-bold
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      {report.priority}
                    </h4>
                  </div>

                  {/* ACTION */}
                  <motion.button
                    whileHover={{
                      scale: 1.06,
                    }}

                    whileTap={{
                      scale: 0.96,
                    }}

                    className={`
                    w-14
                    h-14
                    flex-shrink-0
                    flex
                    items-center
                    justify-center
                    text-xl
                    border
                    transition-all
                    duration-300
                    ${
                      darkMode
                        ? `
                          bg-white/[0.04]
                          border-white/10
                          text-white
                          hover:bg-green-500
                          hover:border-green-500
                        `
                        : `
                          bg-[#F8FAF9]
                          border-gray-200
                          text-black
                          hover:bg-green-600
                          hover:text-white
                          hover:border-green-600
                        `
                    }
                    `}
                  >
                    <FiArrowUpRight />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DashboardReports;