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
  FiShield,
  FiZap,
} from "react-icons/fi";

const timeline = [
  {
    title: "Report Submitted",
    description:
      "Road damage evidence submitted with geo-location, smart AI tagging, and live civic tracking enabled instantly.",
    time: "2 May • 09:14 AM",
    icon: <FiMapPin />,
    status: "Completed",
    progress: 100,
    note: "Evidence uploaded successfully.",
  },

  {
    title: "Community Verified",
    description:
      "Nearby citizens confirmed the issue severity, helping the report gain priority attention faster.",
    time: "2 May • 11:42 AM",
    icon: <FiUsers />,
    status: "Verified",
    progress: 100,
    note: "27 nearby confirmations received.",
  },

  {
    title: "AI Risk Analysis",
    description:
      "NationAura AI detected high infrastructure risk and flagged the location for urgent review.",
    time: "2 May • 01:10 PM",
    icon: <FiCpu />,
    status: "AI Complete",
    progress: 100,
    note: "Flooding escalation risk detected.",
  },

  {
    title: "Agency Assigned",
    description:
      "Government response teams officially received and acknowledged the infrastructure report.",
    time: "3 May • 08:20 AM",
    icon: <FiBriefcase />,
    status: "Assigned",
    progress: 85,
    note: "Agency acknowledged report.",
  },

  {
    title: "Repair In Progress",
    description:
      "Repair teams are currently working on-site with inspections and reconstruction underway.",
    time: "5 May • 02:35 PM",
    icon: <FiTool />,
    status: "In Progress",
    progress: 72,
    note: "Drainage reconstruction started.",
  },

  {
    title: "Resolution Pending",
    description:
      "Infrastructure repairs are nearing completion and awaiting final verification from citizens.",
    time: "Expected • 7 May",
    icon: <FiCheckCircle />,
    status: "Final Review",
    progress: 45,
    note: "Awaiting final inspection.",
  },
];

const ResolutionTimeline = ({
  darkMode,
}) => {
  return (
    <section className="relative overflow-hidden">
      {/* MASSIVE BG GLOW */}
      <div
        className="
        absolute
        top-[-250px]
        left-1/2
        -translate-x-1/2
        w-[700px]
        h-[700px]
        bg-green-500/10
        blur-[140px]
        pointer-events-none
        "
      />

      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        2xl:flex-row
        2xl:items-end
        2xl:justify-between
        gap-8
        mb-10
        "
      >
        {/* LEFT */}
        <div className="max-w-4xl">
          {/* BADGE */}
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
            px-5
            py-3
            border
            mb-6
            backdrop-blur-2xl
            ${
              darkMode
                ? `
                bg-white/[0.04]
                border-white/10
                text-green-300
                `
                : `
                bg-white/80
                border-black/5
                text-green-700
                `
            }
            `}
          >
            <div className="relative">
              <div
                className="
                absolute
                inset-0
                bg-green-400
                blur-md
                opacity-70
                animate-pulse
                "
              />

              <FiActivity className="relative z-10" />
            </div>

            <span
              className="
              text-xs
              sm:text-sm
              font-black
              tracking-[0.25em]
              uppercase
              "
            >
              LIVE RESOLUTION FLOW
            </span>
          </motion.div>

          {/* TITLE */}
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
              duration: 0.7,
            }}
            viewport={{ once: true }}
            className="
            text-[38px]
                    sm:text-[54px]
                    lg:text-[72px]
                    leading-[0.92]
                    tracking-[-0.06em]
                    font-black
            "
          >
            Civic Cases{" "}
            <span
              className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-green-400
              to-green-400
              "
            >
              Moving
            </span>{" "}
            In Real Time
          </motion.h2>

          {/* DESC */}
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
              delay: 0.15,
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className={`
            mt-6
            max-w-3xl
            text-sm
            sm:text-base
            lg:text-lg
            leading-relaxed
            ${
              darkMode
                ? "text-white/65"
                : "text-black/65"
            }
            `}
          >
            Every report follows a live
            intelligent resolution system —
            from citizen submission and AI
            verification to government
            response, repair tracking, and
            final infrastructure validation.
          </motion.p>
        </div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{ once: true }}
          className={`
          relative
          overflow-hidden
          border
          p-6
          backdrop-blur-2xl
          ${
            darkMode
              ? `
              bg-white/[0.05]
              border-white/10
              `
              : `
              bg-white/80
              border-black/5
              `
          }
          `}
        >
          {/* GLOW */}
          <div
            className="
            absolute
            inset-0
            bg-gradient-to-br
            from-green-500/10
            via-transparent
            to-transparent
            "
          />

          <div className="relative z-10 flex items-center gap-5">
            {/* ICON */}
            <div
              className="
              relative
              w-16
              h-16
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-green-500
              to-emerald-500
              text-white
              text-2xl
              shadow-[0_0_40px_rgba(34,197,94,0.45)]
              "
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="
                absolute
                inset-0
                bg-green-400
                "
              />

              <FiShield className="relative z-10" />
            </div>

            {/* TEXT */}
            <div>
              <h3
                className="
                text-4xl
                font-black
                text-green-400
                "
              >
                78%
              </h3>

              <p
                className={`
                mt-1
                text-sm
                ${
                  darkMode
                    ? "text-white/60"
                    : "text-black/60"
                }
                `}
              >
                Successful Resolution Rate
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* TIMELINE */}
      <div
        className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? `
            bg-[#08110D]
            border-white/10
            `
            : `
            bg-white
            border-black/5
            `
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
          bg-[size:60px_60px]
          "
        />

        {/* GLOW */}
        <div
          className="
          absolute
          top-0
          right-0
          w-[400px]
          h-[400px]
          bg-green-500/10
          blur-[120px]
          "
        />

        <div
          className="
          relative
          z-10
          p-4
          sm:p-6
          lg:p-8
          xl:p-10
          "
        >
          <div className="relative">
            {/* CENTER LINE */}
            <div
              className="
              absolute
              top-0
              bottom-0
              left-[26px]
              sm:left-[38px]
              w-[2px]
              bg-white/10
              overflow-hidden
              "
            >
              <motion.div
                initial={{
                  height: 0,
                }}
                whileInView={{
                  height: "100%",
                }}
                transition={{
                  duration: 2,
                }}
                viewport={{ once: true }}
                className="
                absolute
                top-0
                left-0
                w-full
                bg-gradient-to-b
                from-green-400
                via-green-500
                to-emerald-400
                "
              />
            </div>

            {/* ITEMS */}
            <div className="space-y-6 sm:space-y-8">
              {timeline.map(
                (item, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      delay:
                        index * 0.12,
                    }}
                    viewport={{ once: true }}
                    className="
                    relative
                    flex
                    gap-4
                    sm:gap-6
                    "
                  >
                    {/* ICON */}
                    <div className="relative z-20">
                      <div
                        className="
                        absolute
                        inset-0
                        bg-green-500/30
                        blur-xl
                        animate-pulse
                        "
                      />

                      <motion.div
                        whileHover={{
                          scale: 1.08,
                          rotate: 5,
                        }}
                        className="
                        relative
                        w-[54px]
                        h-[54px]
                        sm:w-[76px]
                        sm:h-[76px]
                        flex
                        items-center
                        justify-center
                        bg-gradient-to-br
                        from-green-500
                        to-emerald-500
                        text-white
                        text-xl
                        sm:text-2xl
                        shadow-[0_0_35px_rgba(34,197,94,0.4)]
                        "
                      >
                        {item.icon}
                      </motion.div>
                    </div>

                    {/* CARD */}
                    <motion.div
                      whileHover={{
                        y: -6,
                      }}
                      className={`
                      group
                      relative
                      flex-1
                      overflow-hidden
                      border
                      transition-all
                      duration-500
                      ${
                        darkMode
                          ? `
                          bg-white/[0.04]
                          border-white/10
                          hover:border-green-500/30
                          `
                          : `
                          bg-white
                          border-black/5
                          hover:border-green-400/30
                          `
                      }
                      `}
                    >
                      {/* HOVER GLOW */}
                      <div
                        className="
                        absolute
                        inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-700
                        bg-gradient-to-br
                        from-green-500/10
                        via-transparent
                        to-transparent
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
                        from-green-400
                        via-emerald-400
                        to-transparent
                        "
                      />

                      <div
                        className="
                        relative
                        z-10
                        p-5
                        sm:p-7
                        "
                      >
                        {/* TOP */}
                        <div
                          className="
                          flex
                          flex-col
                          xl:flex-row
                          xl:items-start
                          xl:justify-between
                          gap-5
                          "
                        >
                          <div className="flex-1">
                            {/* TITLE */}
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
                                sm:text-3xl
                                font-black
                                tracking-tight
                                "
                              >
                                {item.title}
                              </h3>

                              <div
                                className="
                                px-3
                                py-2
                                border
                                border-green-500/20
                                bg-green-500/10
                                text-green-300
                                text-[11px]
                                font-black
                                uppercase
                                tracking-[0.15em]
                                "
                              >
                                {item.status}
                              </div>
                            </div>

                            {/* DESC */}
                            <p
                              className={`
                              mt-4
                              text-sm
                              sm:text-base
                              leading-relaxed
                              max-w-3xl
                              ${
                                darkMode
                                  ? "text-white/65"
                                  : "text-black/65"
                              }
                              `}
                            >
                              {
                                item.description
                              }
                            </p>
                          </div>

                          {/* TIME */}
                          <div
                            className={`
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            border
                            ${
                              darkMode
                                ? `
                                bg-white/[0.03]
                                border-white/10
                                `
                                : `
                                bg-[#FAFAFA]
                                border-black/5
                                `
                            }
                            `}
                          >
                            <FiClock className="text-green-400" />

                            <span
                              className="
                              text-sm
                              font-semibold
                              "
                            >
                              {item.time}
                            </span>
                          </div>
                        </div>

                        {/* PROGRESS */}
                        <div className="mt-7">
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`
                              text-sm
                              ${
                                darkMode
                                  ? "text-white/55"
                                  : "text-black/55"
                              }
                              `}
                            >
                              Resolution Progress
                            </span>

                            <span
                              className="
                              text-sm
                              font-black
                              text-green-400
                              "
                            >
                              {
                                item.progress
                              }
                              %
                            </span>
                          </div>

                          <div
                            className={`
                            h-3
                            overflow-hidden
                            ${
                              darkMode
                                ? "bg-white/10"
                                : "bg-black/5"
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
                                delay:
                                  index * 0.15,
                              }}
                              viewport={{
                                once: true,
                              }}
                              className="
                              relative
                              h-full
                              bg-gradient-to-r
                              from-green-500
                              via-emerald-400
                              to-green-300
                              "
                            >
                              <div
                                className="
                                absolute
                                inset-y-0
                                right-0
                                w-16
                                bg-white/30
                                blur-xl
                                "
                              />
                            </motion.div>
                          </div>
                        </div>

                        {/* FOOTER */}
                        <div
                          className="
                          mt-7
                          pt-5
                          border-t
                          flex
                          flex-col
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                          gap-5
                          "
                          style={{
                            borderColor:
                              darkMode
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(0,0,0,0.06)",
                          }}
                        >
                          {/* NOTE */}
                          <div>
                            <p
                              className={`
                              text-sm
                              ${
                                darkMode
                                  ? "text-white/50"
                                  : "text-black/50"
                              }
                              `}
                            >
                              Latest Update
                            </p>

                            <h4
                              className="
                              mt-1
                              font-semibold
                              text-green-400
                              "
                            >
                              {item.note}
                            </h4>
                          </div>

                          {/* BUTTON */}
                          <motion.button
                            whileHover={{
                              scale: 1.03,
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            className="
                            group/btn
                            relative
                            overflow-hidden
                            px-5
                            py-3
                            bg-gradient-to-r
                            from-green-500
                            to-emerald-500
                            text-white
                            font-bold
                            flex
                            items-center
                            gap-3
                            shadow-[0_0_30px_rgba(34,197,94,0.35)]
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

                            <span className="relative z-10">
                              View Details
                            </span>

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
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResolutionTimeline;