import { motion } from "framer-motion";

import {
  FiMapPin,
  FiUsers,
  FiCpu,
  FiBriefcase,
  FiTool,
  FiCheckCircle,
  FiClock,
  FiActivity,
  FiArrowUpRight,
} from "react-icons/fi";

const timeline = [
  {
    title: "Report Submitted",
    description:
      "Road damage evidence submitted with geo-location and AI tracking enabled instantly.",
    time: "2 May • 09:14 AM",
    icon: <FiMapPin />,
    status: "Completed",
    progress: 100,
    note: "Evidence uploaded successfully.",
  },

  {
    title: "Community Verified",
    description:
      "Nearby citizens confirmed the issue severity and boosted report visibility.",
    time: "2 May • 11:42 AM",
    icon: <FiUsers />,
    status: "Verified",
    progress: 100,
    note: "27 nearby confirmations received.",
  },

  {
    title: "AI Risk Analysis",
    description:
      "NationAura AI flagged the report as high-risk and escalated it for review.",
    time: "2 May • 01:10 PM",
    icon: <FiCpu />,
    status: "AI Complete",
    progress: 100,
    note: "Critical infrastructure risk detected.",
  },

  {
    title: "Agency Assigned",
    description:
      "Government response teams officially acknowledged the report.",
    time: "3 May • 08:20 AM",
    icon: <FiBriefcase />,
    status: "Assigned",
    progress: 85,
    note: "Agency response activated.",
  },

  {
    title: "Repair In Progress",
    description:
      "Repair teams are currently working on-site with reconstruction underway.",
    time: "5 May • 02:35 PM",
    icon: <FiTool />,
    status: "In Progress",
    progress: 72,
    note: "Drainage reconstruction started.",
  },

  {
    title: "Resolution Pending",
    description:
      "Repairs are nearing completion and awaiting final citizen verification.",
    time: "Expected • 7 May",
    icon: <FiCheckCircle />,
    status: "Final Review",
    progress: 45,
    note: "Awaiting public confirmation.",
  },
];

const ResolutionTimeline = ({
  darkMode,
}) => {
  return (
    <section className="relative">
      {/* HEADER */}
      <div className="mb-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
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
          py-3
          border
          mb-5
          ${
            darkMode
              ? `
                bg-[#081019]
                border-white/10
                text-green-300
              `
              : `
                bg-white
                border-gray-200
                text-green-700
              `
          }
          `}
        >
          <FiActivity />

          <span
            className="
            text-[11px]
            uppercase
            tracking-[0.25em]
            font-black
            "
          >
            RESOLUTION TIMELINE
          </span>
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className="
          text-4xl
          sm:text-5xl
          lg:text-6xl
          font-black
          leading-[0.95]
          tracking-[-0.05em]
          "
        >
          Track Report
          <span className="text-green-500">
            {" "}
            Resolution
          </span>
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className={`
          mt-5
          max-w-3xl
          text-sm
          sm:text-base
          leading-relaxed
          ${
            darkMode
              ? "text-white/65"
              : "text-black/65"
          }
          `}
        >
          Follow how reports move from
          citizen submission to
          verification, AI review, and
          government action.
        </motion.p>
      </div>

      {/* TIMELINE */}
      <div
        className="
        relative
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-5
        "
      >
        {timeline.map(
          (item, index) => (
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
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -4,
              }}
              className={`
              relative
              overflow-hidden
              border
              transition-all
              duration-300
              ${
                darkMode
                  ? `
                    bg-[#081019]
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
              {/* TOP LINE */}
              <div
                className="
                absolute
                top-0
                left-0
                h-[3px]
                w-full
                bg-gradient-to-r
                from-green-400
                via-green-500
                to-transparent
                "
              />

              <div className="p-5 sm:p-6">
                {/* TOP */}
                <div
                  className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  "
                >
                  {/* LEFT */}
                  <div className="flex gap-4">
                    {/* ICON */}
                    <div
                      className="
                      w-14
                      h-14
                      flex
                      items-center
                      justify-center
                      bg-green-50
                      text-green-600
                      text-xl
                      border
                      border-green-100
                      "
                    >
                      {item.icon}
                    </div>

                    {/* TEXT */}
                    <div>
                      <div
                        className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        "
                      >
                        <h3
                          className="
                          text-2xl
                          font-black
                          leading-tight
                          "
                        >
                          {item.title}
                        </h3>

                        <div
                          className="
                          px-3
                          py-1.5
                          bg-green-50
                          border
                          border-green-100
                          text-green-700
                          text-[10px]
                          uppercase
                          tracking-[0.15em]
                          font-black
                          "
                        >
                          {item.status}
                        </div>
                      </div>

                      <div
                        className={`
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-sm
                        ${
                          darkMode
                            ? "text-white/50"
                            : "text-black/50"
                        }
                        `}
                      >
                        <FiClock className="text-green-500" />

                        {item.time}
                      </div>
                    </div>
                  </div>

                  {/* STEP */}
                  <div
                    className="
                    text-right
                    "
                  >
                    <p
                      className={`
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      ${
                        darkMode
                          ? "text-white/40"
                          : "text-black/40"
                      }
                      `}
                    >
                      Stage
                    </p>

                    <h4
                      className="
                      mt-1
                      text-2xl
                      font-black
                      text-green-500
                      "
                    >
                      0{index + 1}
                    </h4>
                  </div>
                </div>

                {/* DESC */}
                <p
                  className={`
                  mt-6
                  text-sm
                  sm:text-base
                  leading-relaxed
                  ${
                    darkMode
                      ? "text-white/65"
                      : "text-black/65"
                  }
                  `}
                >
                  {item.description}
                </p>

                {/* PROGRESS */}
                <div className="mt-7">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`
                      text-sm
                      ${
                        darkMode
                          ? "text-white/50"
                          : "text-black/50"
                      }
                      `}
                    >
                      Progress
                    </span>

                    <span
                      className="
                      text-lg
                      font-black
                      text-green-500
                      "
                    >
                      {item.progress}%
                    </span>
                  </div>

                  <div
                    className={`
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
                        width: `${item.progress}%`,
                      }}
                      transition={{
                        duration: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      className="
                      h-full
                      bg-gradient-to-r
                      from-green-400
                      via-green-500
                      to-emerald-400
                      "
                    />
                  </div>
                </div>

                {/* FOOTER */}
                <div
                  className={`
                  mt-7
                  pt-5
                  border-t
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  ${
                    darkMode
                      ? "border-white/10"
                      : "border-gray-200"
                  }
                  `}
                >
                  <div>
                    <p
                      className={`
                      text-sm
                      ${
                        darkMode
                          ? "text-white/45"
                          : "text-black/45"
                      }
                      `}
                    >
                      Latest Update
                    </p>

                    <h4
                      className="
                      mt-1
                      font-semibold
                      text-green-600
                      "
                    >
                      {item.note}
                    </h4>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                    px-5
                    py-3
                    bg-green-500
                    hover:bg-green-600
                    text-white
                    font-bold
                    flex
                    items-center
                    gap-2
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
      </div>
    </section>
  );
};

export default ResolutionTimeline;