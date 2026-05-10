import { motion } from "framer-motion";

import {
  FiMapPin,
  FiClock,
  FiAlertTriangle,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";

const reports = [
  {
    title: "Major Potholes Blocking Road",
    category: "Bad Roads",
    location: "Jos South",
    status: "Pending",
    time: "12 mins ago",
    severity: "High",
  },

  {
    title: "Street Lights Not Working",
    category: "Street Lights",
    location: "Rayfield",
    status: "In Review",
    time: "28 mins ago",
    severity: "Medium",
  },

  {
    title: "Flooded Drainage Area",
    category: "Drainage",
    location: "Bukuru",
    status: "Resolved",
    time: "1 hour ago",
    severity: "High",
  },

  {
    title: "Blocked Waste Disposal Point",
    category: "Waste Dump",
    location: "Angwan Rukuba",
    status: "Pending",
    time: "2 hours ago",
    severity: "Low",
  },
];

const RecentReports = ({
  darkMode,
}) => {
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
          bottom-[-100px]
          right-[-60px]
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
        <div
          className="
          flex
          items-center
          justify-between
          gap-4
          mb-8
          "
        >
          <div>
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
              Recent Reports
            </h2>

            <p
              className={`
              mt-2
              text-sm
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
              `}
            >
              Latest infrastructure
              issues submitted by users.
            </p>
          </div>

          <motion.button
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
            hidden
            sm:flex
            items-center
            gap-2
            px-4
            py-3
            rounded-2xl
            bg-green-500
            text-white
            text-sm
            font-semibold
            shadow-[0_10px_30px_rgba(34,197,94,0.25)]
            "
          >
            View All

            <FiArrowUpRight />
          </motion.button>
        </div>

        {/* REPORT LIST */}
        <div
          className="
          space-y-4
          "
        >
          {reports.map(
            (report, index) => (
              <motion.div
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
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -3,
                }}
                className={`
                relative
                overflow-hidden
                rounded-[26px]
                border
                p-5
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
                {/* TOP */}
                <div
                  className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                  gap-5
                  "
                >
                  {/* LEFT */}
                  <div className="flex-1">
                    {/* CATEGORY */}
                    <div
                      className="
                      inline-flex
                      items-center
                      gap-2
                      px-3
                      py-2
                      rounded-full
                      bg-green-500/10
                      text-green-500
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      mb-4
                      "
                    >
                      <FiAlertTriangle />

                      {report.category}
                    </div>

                    {/* TITLE */}
                    <h3
                      className={`
                      text-lg
                      font-bold
                      leading-snug
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      {report.title}
                    </h3>

                    {/* META */}
                    <div
                      className="
                      flex
                      flex-wrap
                      items-center
                      gap-4
                      mt-4
                      "
                    >
                      {/* LOCATION */}
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

                      {/* TIME */}
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

                        {report.time}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div
                    className="
                    flex
                    flex-col
                    items-start
                    lg:items-end
                    gap-3
                    "
                  >
                    {/* STATUS */}
                    <div
                      className={`
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-full
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      ${
                        report.status ===
                        "Resolved"
                          ? `
                            bg-green-500/15
                            text-green-500
                          `
                          : report.status ===
                            "In Review"
                          ? `
                            bg-yellow-500/15
                            text-yellow-500
                          `
                          : `
                            bg-red-500/15
                            text-red-400
                          `
                      }
                      `}
                    >
                      <FiCheckCircle />

                      {report.status}
                    </div>

                    {/* SEVERITY */}
                    <div
                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      ${
                        report.severity ===
                        "High"
                          ? `
                            bg-red-500/15
                            text-red-400
                          `
                          : report.severity ===
                            "Medium"
                          ? `
                            bg-yellow-500/15
                            text-yellow-500
                          `
                          : `
                            bg-blue-500/15
                            text-blue-400
                          `
                      }
                      `}
                    >
                      {report.severity} Severity
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentReports;