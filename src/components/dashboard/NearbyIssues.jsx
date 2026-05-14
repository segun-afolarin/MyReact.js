import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiMapPin,
  FiAlertTriangle,
  FiClock,
  FiNavigation,
  FiCheckCircle,
  FiRadio,
  FiShield,
  FiActivity,
  FiLoader,
  FiUsers,
} from "react-icons/fi";

const initialIssues = [
  {
    id: 1,
    title: "Collapsed Road Section",
    category: "Road Damage",
    location: "Rayfield Junction",
    distance: "0.8 KM",
    time: "14 mins ago",
    severity: "Critical",
    confirmations: 42,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 2,
    title: "Blocked Drainage System",
    category: "Drainage",
    location: "Bukuru Market Road",
    distance: "1.4 KM",
    time: "29 mins ago",
    severity: "Medium",
    confirmations: 18,
    image:
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 3,
    title: "Street Light Failure",
    category: "Electricity",
    location: "Old Airport Road",
    distance: "2.1 KM",
    time: "1 hour ago",
    severity: "Low",
    confirmations: 9,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id: 4,
    title: "Flood Risk Zone",
    category: "Flood Alert",
    location: "Terminus Junction",
    distance: "2.7 KM",
    time: "2 hours ago",
    severity: "High",
    confirmations: 31,
    image:
      "https://images.unsplash.com/photo-1527489377706-5bf97e608852?q=80&w=1400&auto=format&fit=crop",
  },
];

const NearbyIssues = ({
  darkMode,
}) => {
  const [detecting, setDetecting] =
    useState(true);

  const [issues, setIssues] =
    useState([]);

  const [confirmedIds, setConfirmedIds] =
    useState([]);

  /* AUTO LOAD */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDetecting(false);

      setIssues(initialIssues);
    }, 2200);

    return () =>
      clearTimeout(timer);
  }, []);

  /* CONFIRM ISSUE */
  const handleConfirm = (id) => {
    if (
      confirmedIds.includes(id)
    )
      return;

    setConfirmedIds((prev) => [
      ...prev,
      id,
    ]);

    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              confirmations:
                issue.confirmations +
                1,
            }
          : issue
      )
    );
  };

  return (
    <section
      className={`
      relative
      overflow-hidden
      rounded-[2rem]
      border

      ${
        darkMode
          ? `
            bg-[#071018]
            border-white/10
          `
          : `
            bg-white
            border-gray-200
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
        {/* GRID */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:55px_55px]
          "
        />

        {/* GLOW */}
        <div
          className="
          absolute
          top-[-120px]
          right-[-100px]
          w-[400px]
          h-[400px]
          bg-green-500/20
          blur-[140px]
          "
        />

        {/* TOP LINE */}
        <div
          className="
          absolute
          top-0
          left-0
          h-[3px]
          w-full
          bg-gradient-to-r
          from-green-500
          via-green-400
          to-transparent
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
        relative
        z-10
        p-5
        sm:p-8
        lg:p-10
        "
      >
        {/* HEADER */}
        <div
          className="
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
              viewport={{
                once: true,
              }}
              className={`
              inline-flex
              items-center
              gap-3
              px-5
              py-3
              rounded-full
              border
              mb-6

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
              <motion.div
                animate={{
                  scale: [
                    1,
                    1.4,
                    1,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="
                w-2.5
                h-2.5
                rounded-full
                bg-green-500
                "
              />

              <span
                className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                "
              >
                Live Citizen Monitoring
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className={`
              text-[2.2rem]
              sm:text-[3.5rem]
              lg:text-[5rem]
              leading-[0.9]
              tracking-[-0.06em]
              font-black

              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              Nearby Issues
              <span
                className="
                block
                text-green-500
                "
              >
                Detected Live
              </span>
            </motion.h2>

            {/* TEXT */}
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
                delay: 0.1,
              }}
              viewport={{
                once: true,
              }}
              className={`
              mt-6
              text-base
              sm:text-lg
              leading-relaxed
              max-w-2xl

              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
              `}
            >
              NationAura automatically
              detects nearby citizen
              reports around your current
              location so communities can
              quickly confirm real
              problems before they become
              dangerous.
            </motion.p>
          </div>

          {/* LOCATION STATUS */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className={`
            relative
            overflow-hidden
            rounded-[1.8rem]
            border
            p-6
            min-w-full
            sm:min-w-[350px]

            ${
              darkMode
                ? `
                  bg-white/[0.03]
                  border-white/10
                `
                : `
                  bg-[#FAFAFA]
                  border-gray-200
                `
            }
            `}
          >
            <div
              className="
              absolute
              top-0
              right-0
              w-32
              h-32
              bg-green-500/10
              blur-[80px]
              "
            />

            <div
              className="
              relative
              z-10
              flex
              items-center
              justify-between
              gap-5
              "
            >
              <div>
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
                  Civic Detection
                </p>

                <h3
                  className={`
                  mt-3
                  text-2xl
                  sm:text-3xl
                  font-black

                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                  `}
                >
                  {detecting
                    ? "Scanning..."
                    : "Location Detected"}
                </h3>

                <p
                  className="
                  mt-3
                  text-sm
                  text-green-500
                  font-semibold
                  "
                >
                  {detecting
                    ? "Finding nearby reports"
                    : "Live nearby issue tracking enabled"}
                </p>
              </div>

              <motion.div
                animate={{
                  scale: [
                    1,
                    1.08,
                    1,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="
                relative
                w-20
                h-20
                rounded-2xl
                bg-green-500/10
                border
                border-green-500/20
                flex
                items-center
                justify-center
                text-green-500
                text-3xl
                overflow-hidden
                "
              >
                {detecting ? (
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <FiLoader />
                  </motion.div>
                ) : (
                  <FiNavigation />
                )}

                <motion.div
                  animate={{
                    scale: [
                      1,
                      1.8,
                      1,
                    ],
                    opacity: [
                      0.3,
                      0,
                      0.3,
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-green-500/10
                  "
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* LOADING */}
        <AnimatePresence>
          {detecting && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="
              flex
              flex-col
              items-center
              justify-center
              py-20
              "
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
                className="
                w-20
                h-20
                rounded-full
                border-[5px]
                border-green-200
                border-t-green-500
                "
              />

              <h3
                className={`
                mt-8
                text-2xl
                font-black

                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                Detecting Nearby Issues
              </h3>

              <p
                className={`
                mt-3
                text-center
                max-w-md

                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
                `}
              >
                NationAura AI is scanning
                real-time citizen reports
                around your area...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ISSUES */}
        <AnimatePresence>
          {!detecting && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="
              grid
              grid-cols-1
              xl:grid-cols-2
              gap-6
              "
            >
              {issues.map(
                (
                  issue,
                  index
                ) => {
                  const confirmed =
                    confirmedIds.includes(
                      issue.id
                    );

                  return (
                    <motion.div
                      key={issue.id}
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay:
                          index * 0.12,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                      className={`
                      group
                      relative
                      overflow-hidden
                      rounded-[2rem]
                      border

                      ${
                        darkMode
                          ? `
                            bg-[#0A141D]
                            border-white/10
                          `
                          : `
                            bg-white
                            border-gray-200
                          `
                      }
                      `}
                    >
                      {/* IMAGE */}
                      <div
                        className="
                        relative
                        h-[260px]
                        overflow-hidden
                        "
                      >
                        <motion.img
                          whileHover={{
                            scale: 1.08,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          src={
                            issue.image
                          }
                          alt={
                            issue.title
                          }
                          className="
                          w-full
                          h-full
                          object-cover
                          "
                        />

                        <div
                          className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/90
                          via-black/20
                          to-transparent
                          "
                        />

                        {/* TOP BADGES */}
                        <div
                          className="
                          absolute
                          top-4
                          left-4
                          right-4
                          flex
                          items-center
                          justify-between
                          gap-3
                          "
                        >
                          <div
                            className="
                            px-4
                            py-2
                            rounded-full
                            bg-green-500
                            text-white
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            "
                          >
                            {
                              issue.category
                            }
                          </div>

                          <div
                            className="
                            px-4
                            py-2
                            rounded-full
                            bg-white/90
                            text-black
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            "
                          >
                            {
                              issue.severity
                            }
                          </div>
                        </div>

                        {/* BOTTOM CONTENT */}
                        <div
                          className="
                          absolute
                          bottom-0
                          left-0
                          right-0
                          p-6
                          "
                        >
                          <h3
                            className="
                            text-2xl
                            sm:text-3xl
                            font-black
                            text-white
                            leading-tight
                            "
                          >
                            {
                              issue.title
                            }
                          </h3>

                          <div
                            className="
                            flex
                            flex-wrap
                            items-center
                            gap-4
                            mt-4
                            text-white/80
                            text-sm
                            "
                          >
                            <div className="flex items-center gap-2">
                              <FiMapPin />

                              {
                                issue.location
                              }
                            </div>

                            <div className="flex items-center gap-2">
                              <FiClock />

                              {
                                issue.time
                              }
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BODY */}
                      <div className="p-6">
                        {/* LIVE STATUS */}
                        <div
                          className="
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-4
                          "
                        >
                          <div
                            className="
                            flex
                            items-center
                            gap-3
                            "
                          >
                            <div
                              className="
                              w-12
                              h-12
                              rounded-xl
                              bg-green-500/10
                              border
                              border-green-500/20
                              text-green-500
                              flex
                              items-center
                              justify-center
                              "
                            >
                              <FiRadio />
                            </div>

                            <div>
                              <p
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
                                Confirmed By
                              </p>

                              <h4
                                className={`
                                mt-1
                                font-black

                                ${
                                  darkMode
                                    ? "text-white"
                                    : "text-black"
                                }
                                `}
                              >
                                {
                                  issue.confirmations
                                }{" "}
                                Citizens
                              </h4>
                            </div>
                          </div>

                          <div
                            className="
                            px-4
                            py-3
                            rounded-2xl
                            bg-green-500/10
                            border
                            border-green-500/20
                            text-green-500
                            text-sm
                            font-black
                            "
                          >
                            {
                              issue.distance
                            }
                          </div>
                        </div>

                        {/* INFO */}
                        <div
                          className={`
                          mt-6
                          p-5
                          rounded-2xl
                          border

                          ${
                            darkMode
                              ? `
                                bg-white/[0.03]
                                border-white/10
                              `
                              : `
                                bg-[#FAFAFA]
                                border-gray-200
                              `
                          }
                          `}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="
                              w-12
                              h-12
                              rounded-xl
                              bg-green-500
                              text-white
                              flex
                              items-center
                              justify-center
                              shrink-0
                              "
                            >
                              <FiShield />
                            </div>

                            <div>
                              <h4
                                className={`
                                font-black
                                text-lg

                                ${
                                  darkMode
                                    ? "text-white"
                                    : "text-black"
                                }
                                `}
                              >
                                Help Confirm
                                This Issue
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
                                Citizens near this
                                area can confirm
                                whether this issue
                                is still active to
                                improve AI
                                accuracy and speed
                                up government
                                response.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* BUTTONS */}
                        <div
                          className="
                          mt-6
                          flex
                          flex-col
                          sm:flex-row
                          gap-4
                          "
                        >
                          {/* CONFIRM */}
                          <motion.button
                            whileHover={{
                              scale: 1.02,
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={() =>
                              handleConfirm(
                                issue.id
                              )
                            }
                            disabled={
                              confirmed
                            }
                            className={`
                            flex-1
                            h-14
                            rounded-2xl
                            font-black
                            uppercase
                            tracking-[0.14em]
                            flex
                            items-center
                            justify-center
                            gap-3
                            transition-all
                            duration-300

                            ${
                              confirmed
                                ? `
                                  bg-green-500
                                  text-white
                                `
                                : `
                                  bg-gradient-to-r
                                  from-green-400
                                  to-green-500
                                  text-white
                                  hover:shadow-[0_20px_50px_rgba(34,197,94,0.35)]
                                `
                            }
                            `}
                          >
                            {confirmed ? (
                              <>
                                <FiCheckCircle />

                                Confirmed
                              </>
                            ) : (
                              <>
                                <FiUsers />

                                Confirm Issue
                              </>
                            )}
                          </motion.button>

                          {/* CONFIRM MORE */}
                          <motion.button
                            whileHover={{
                              y: -2,
                            }}
                            whileTap={{
                              scale: 0.98,
                            }}
                            className={`
                            h-14
                            px-6
                            rounded-2xl
                            border
                            font-black
                            uppercase
                            tracking-[0.14em]
                            flex
                            items-center
                            justify-center
                            gap-3

                            ${
                              darkMode
                                ? `
                                  border-white/10
                                  bg-white/[0.03]
                                  text-white
                                `
                                : `
                                  border-gray-200
                                  bg-[#FAFAFA]
                                  text-black
                                `
                            }
                            `}
                          >
                            <FiActivity />

                            Confirm More
                          </motion.button>
                        </div>
                      </div>

                      {/* SIDE GLOW */}
                      <div
                        className="
                        absolute
                        -right-10
                        top-10
                        w-40
                        h-40
                        bg-green-500/10
                        blur-[100px]
                        opacity-0
                        group-hover:opacity-100
                        transition-all
                        duration-700
                        "
                      />
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NearbyIssues;