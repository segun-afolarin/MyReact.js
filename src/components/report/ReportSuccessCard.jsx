import { motion } from "framer-motion";

import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiRadio,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

const ReportSuccessCard = ({
  darkMode,
}) => {
  const trackingSteps = [
    {
      title:
        "Incident Successfully Submitted",
      status: "completed",
    },

    {
      title:
        "AI Emergency Verification Running",
      status: "active",
    },

    {
      title:
        "Authority Dispatch Queue",
      status: "pending",
    },

    {
      title:
        "Live Field Response Tracking",
      status: "pending",
    },
  ];

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
        duration: 0.7,
      }}
      className={`
      relative
      overflow-hidden
      border
      ${
        darkMode
          ? `
            bg-[#09131B]
            border-green-500/20
          `
          : `
            bg-white
            border-green-200
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
        bg-[size:45px_45px]
        "
      />

      {/* TOP GLOW */}
      <div
        className="
        absolute
        top-[-80px]
        right-[-80px]
        w-[220px]
        h-[220px]
        bg-green-500/20
        blur-3xl
        rounded-full
        "
      />

      {/* BOTTOM GLOW */}
      <div
        className="
        absolute
        bottom-[-120px]
        left-[-80px]
        w-[200px]
        h-[200px]
        bg-emerald-500/10
        blur-3xl
        rounded-full
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
        from-green-500
        via-emerald-400
        to-transparent
        "
      />

      <div
        className="
        relative
        z-10
        p-6
        sm:p-7
        "
      >
        {/* SUCCESS ICON */}
        <div
          className="
          relative
          flex
          items-center
          justify-center
          "
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
            className="
            absolute
            w-28
            h-28
            rounded-full
            bg-green-500/10
            blur-2xl
            "
          />

          <div
            className="
            relative
            w-24
            h-24
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            text-white
            text-5xl
            shadow-[0_0_60px_rgba(34,197,94,0.35)]
            "
          >
            <FiCheckCircle />
          </div>
        </div>

        {/* TITLE */}
        <div className="mt-8 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className={`
            inline-flex
            items-center
            gap-2
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
            <FiRadio />

            <span
              className="
              text-[10px]
              uppercase
              tracking-[0.18em]
              font-black
              "
            >
              Emergency Report Active
            </span>
          </motion.div>

          <h2
            className={`
            text-[2.3rem]
            sm:text-[3rem]
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
            Your Report Has
            <span
              className="
              block
              text-green-500
              "
            >
              Been Submitted
            </span>
          </h2>

          <p
            className={`
            mt-5
            max-w-xl
            mx-auto
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
            The civic emergency
            system is now processing
            your report using AI
            verification, smart
            location routing, and
            response coordination.
          </p>
        </div>

        {/* REPORT ID */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.25,
          }}
          className={`
          mt-8
          border
          overflow-hidden
          ${
            darkMode
              ? `
                border-white/10
                bg-[#071017]
              `
              : `
                border-gray-200
                bg-[#FAFAFA]
              `
          }
          `}
        >
          <div
            className="
            flex
            items-center
            justify-between
            gap-4
            p-5
            flex-wrap
            "
          >
            <div>
              <p
                className={`
                text-[10px]
                uppercase
                tracking-[0.18em]
                ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                `}
              >
                Tracking Reference
              </p>

              <h3
                className={`
                mt-2
                text-[1.8rem]
                font-black
                tracking-[-0.05em]
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                NA-48291-XR
              </h3>
            </div>

            <div
              className="
              flex
              items-center
              gap-3
              text-green-500
              text-sm
              font-semibold
              "
            >
              <FiActivity />

              Live Monitoring Enabled
            </div>
          </div>
        </motion.div>

        {/* TRACKING FLOW */}
        <div className="mt-8">
          <div
            className="
            flex
            items-center
            justify-between
            gap-3
            mb-5
            "
          >
            <div>
              <h3
                className={`
                text-lg
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                Response Tracking
              </h3>

              <p
                className={`
                mt-1
                text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
                `}
              >
                Real-time incident
                processing workflow.
              </p>
            </div>

            <div
              className="
              flex
              items-center
              gap-2
              text-green-500
              text-sm
              font-semibold
              "
            >
              <FiTrendingUp />

              Processing
            </div>
          </div>

          <div className="space-y-4">
            {trackingSteps.map(
              (
                item,
                index
              ) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      0.2 +
                      index * 0.12,
                  }}
                  className={`
                  relative
                  overflow-hidden
                  border
                  p-5
                  ${
                    darkMode
                      ? `
                        border-white/10
                        bg-white/[0.03]
                      `
                      : `
                        border-gray-200
                        bg-gray-50
                      `
                  }
                  `}
                >
                  {/* ACTIVE LINE */}
                  {item.status ===
                    "active" && (
                    <motion.div
                      animate={{
                        x: [
                          "-100%",
                          "100%",
                        ],
                      }}
                      transition={{
                        repeat:
                          Infinity,
                        duration: 2,
                      }}
                      className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-transparent
                      via-green-500/10
                      to-transparent
                      "
                    />
                  )}

                  <div
                    className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                    gap-4
                    "
                  >
                    <div
                      className="
                      flex
                      items-center
                      gap-4
                      "
                    >
                      {/* ICON */}
                      <div
                        className={`
                        relative
                        w-12
                        h-12
                        flex
                        items-center
                        justify-center
                        text-lg
                        ${
                          item.status ===
                          "completed"
                            ? `
                              bg-green-500
                              text-white
                            `
                            : item.status ===
                              "active"
                            ? `
                              bg-green-500/10
                              text-green-400
                              border
                              border-green-500/20
                            `
                            : darkMode
                            ? `
                              bg-white/[0.04]
                              text-gray-500
                              border
                              border-white/10
                            `
                            : `
                              bg-gray-100
                              text-gray-400
                              border
                              border-gray-200
                            `
                        }
                        `}
                      >
                        {item.status ===
                        "completed" ? (
                          <FiCheckCircle />
                        ) : item.status ===
                          "active" ? (
                          <FiActivity />
                        ) : (
                          <FiClock />
                        )}

                        {item.status ===
                          "active" && (
                          <motion.div
                            animate={{
                              scale: [
                                1,
                                1.5,
                                1,
                              ],
                              opacity: [
                                0.5,
                                0,
                                0.5,
                              ],
                            }}
                            transition={{
                              repeat:
                                Infinity,
                              duration: 2,
                            }}
                            className="
                            absolute
                            inset-0
                            bg-green-500/10
                            "
                          />
                        )}
                      </div>

                      {/* TEXT */}
                      <div>
                        <h4
                          className={`
                          text-sm
                          sm:text-base
                          font-bold
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                          `}
                        >
                          {item.title}
                        </h4>

                        <p
                          className={`
                          mt-1
                          text-xs
                          ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }
                          `}
                        >
                          Status Update
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div
                      className={`
                      px-3
                      py-2
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      font-black
                      ${
                        item.status ===
                        "completed"
                          ? `
                            bg-green-500
                            text-white
                          `
                          : item.status ===
                            "active"
                          ? `
                            bg-green-500/10
                            text-green-400
                            border
                            border-green-500/20
                          `
                          : darkMode
                          ? `
                            bg-white/[0.03]
                            border
                            border-white/10
                            text-gray-500
                          `
                          : `
                            bg-gray-100
                            border
                            border-gray-200
                            text-gray-500
                          `
                      }
                      `}
                    >
                      {item.status}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* RESPONSE DETAILS */}
        <div
          className="
          mt-8
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
          "
        >
          {[
            {
              icon: FiShield,
              title:
                "AI Verification",
              desc:
                "Automated incident analysis running.",
            },

            {
              icon: FiMapPin,
              title:
                "Location Routing",
              desc:
                "Emergency teams locating report.",
            },
          ].map(
            (
              item,
              index
            ) => {
              const Icon =
                item.icon;

              return (
                <div
                  key={index}
                  className={`
                  relative
                  overflow-hidden
                  border
                  p-5
                  ${
                    darkMode
                      ? `
                        border-white/10
                        bg-white/[0.03]
                      `
                      : `
                        border-gray-200
                        bg-gray-50
                      `
                  }
                  `}
                >
                  <div
                    className="
                    flex
                    items-start
                    gap-4
                    "
                  >
                    <div
                      className="
                      w-14
                      h-14
                      bg-green-500/10
                      flex
                      items-center
                      justify-center
                      text-green-400
                      text-2xl
                      shrink-0
                      "
                    >
                      <Icon />
                    </div>

                    <div>
                      <h4
                        className={`
                        text-lg
                        font-black
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        `}
                      >
                        {item.title}
                      </h4>

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
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* TRACK BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
          relative
          overflow-hidden
          mt-8
          w-full
          h-16
          bg-green-500
          hover:bg-green-400
          text-white
          font-black
          uppercase
          tracking-[0.18em]
          flex
          items-center
          justify-center
          gap-4
          transition-all
          duration-300
          "
        >
          {/* SHINE */}
          <motion.div
            animate={{
              x: [
                "-100%",
                "100%",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
            className="
            absolute
            inset-0
            bg-white/10
            skew-x-12
            "
          />

          <span className="relative z-10">
            Track Your Report
          </span>

          <FiArrowRight className="relative z-10 text-lg" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default ReportSuccessCard;