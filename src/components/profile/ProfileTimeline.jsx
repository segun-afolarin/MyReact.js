import { motion } from "framer-motion";

import {
  FiMapPin,
  FiCamera,
  FiShield,
  FiActivity,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

const ProfileTimeline = ({
  darkMode,
}) => {
  const timeline = [
    {
      date: "May 02, 2026",
      title:
        "Road Damage Report Submitted",
      description:
        "Reported severe road deterioration with geo-tagged evidence.",
      icon: FiMapPin,
      status: "completed",
    },

    {
      date: "May 03, 2026",
      title:
        "Evidence Verified",
      description:
        "AI and community validators confirmed authenticity.",
      icon: FiCamera,
      status: "completed",
    },

    {
      date: "May 06, 2026",
      title:
        "Agency Escalation",
      description:
        "Report forwarded to responsible government agency.",
      icon: FiShield,
      status: "completed",
    },

    {
      date: "May 14, 2026",
      title:
        "Public Engagement Surge",
      description:
        "Community members confirmed and amplified visibility.",
      icon: FiActivity,
      status: "completed",
    },

    {
      date: "May 28, 2026",
      title:
        "Issue Resolved",
      description:
        "Road repairs completed and verified by citizens.",
      icon: FiCheckCircle,
      status: "completed",
    },

    {
      date: "June 01, 2026",
      title:
        "Impact Recorded",
      description:
        "Resolution contributed to your Nation Aura score and civic legacy.",
      icon: FiTrendingUp,
      status: "highlight",
    },
  ];

  return (
    <section
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
          right-[-120px]
          bottom-[-120px]
          w-[300px]
          h-[300px]
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
          lg:p-8
        "
      >
        {/* HEADER */}
        <div className="max-w-3xl">
          <p
            className={`
              text-[11px]
              uppercase
              tracking-[0.35em]
              font-black
              ${
                darkMode
                  ? "text-green-400"
                  : "text-green-700"
              }
            `}
          >
            Civic Journey
          </p>

          <h2
            className={`
              mt-3
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              tracking-[-0.06em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            Impact Timeline
          </h2>

          <p
            className={`
              mt-4
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Follow the journey from
            citizen report to verified
            community impact.
          </p>
        </div>

        {/* TIMELINE */}
        <div
          className="
            relative
            mt-12
          "
        >
          {/* CENTER LINE */}
          <div
            className="
              absolute
              left-[20px]
              top-0
              bottom-0
              w-[2px]
              bg-gradient-to-b
              from-green-500
              via-green-400
              to-transparent
            "
          />

          <div className="space-y-8">
            {timeline.map(
              (item, index) => {
                const Icon =
                  item.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="
                      relative
                      flex
                      gap-5
                    "
                  >
                    {/* ICON */}
                    <div
                      className={`
                        relative
                        z-10
                        h-10
                        w-10
                        flex-shrink-0
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${
                          item.status ===
                          "highlight"
                            ? "bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                            : darkMode
                            ? "bg-[#102131] text-green-400"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      <Icon />
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`
                        flex-1
                        border
                        p-5
                        ${
                          item.status ===
                          "highlight"
                            ? darkMode
                              ? "bg-green-500/10 border-green-500/20"
                              : "bg-green-50 border-green-200"
                            : darkMode
                            ? "bg-white/[0.03] border-white/10"
                            : "bg-[#F8FAF9] border-gray-200"
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          flex-col
                          md:flex-row
                          md:items-center
                          md:justify-between
                          gap-2
                        "
                      >
                        <h3
                          className={`
                            text-xl
                            font-black
                            ${
                              darkMode
                                ? "text-white"
                                : "text-black"
                            }
                          `}
                        >
                          {item.title}
                        </h3>

                        <span
                          className="
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-green-500
                            font-bold
                          "
                        >
                          {item.date}
                        </span>
                      </div>

                      <p
                        className={`
                          mt-3
                          leading-relaxed
                          ${
                            darkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }
                        `}
                      >
                        {
                          item.description
                        }
                      </p>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>

        {/* IMPACT SUMMARY */}
        <div
          className={`
            mt-10
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
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-green-500
              font-black
            "
          >
            Timeline Insight
          </p>

          <h3
            className={`
              mt-3
              text-2xl
              font-black
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            From Report To Resolution
          </h3>

          <p
            className={`
              mt-3
              leading-relaxed
              max-w-4xl
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Your reports are not just
            entries in a database. They
            create a chain of action that
            drives awareness, verification,
            government response and
            measurable community
            improvement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileTimeline;