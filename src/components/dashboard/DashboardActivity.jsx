import { motion } from "framer-motion";

import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiAlertTriangle,
  FiArrowUpRight,
  FiActivity,
  FiCamera,
  FiShield,
  FiPlus,
  FiNavigation,
  FiUsers,
} from "react-icons/fi";

const nearbyReports = [
  {
    title: "Collapsed Drainage Blocking Road",
    location: "Rayfield, Jos",
    status: "Needs Community Validation",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    type: "Flood Risk",
    confirmations: 0,
    time: "4 mins ago",
    severity: "High Risk",
    icon: <FiAlertTriangle />,
    color: "from-orange-500 to-red-600",
    badge:
      "bg-orange-500/15 text-orange-300 border-orange-500/20",
  },

  {
    title: "Major Road Crack Near Junction",
    location: "Terminus, Jos",
    status: "Needs Community Validation",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    type: "Road Damage",
    confirmations: 0,
    time: "12 mins ago",
    severity: "Moderate Risk",
    icon: <FiCheckCircle />,
    color: "from-green-500 to-emerald-600",
    badge:
      "bg-green-500/15 text-green-300 border-green-500/20",
  },

  {
    title: "Streetlight Failure Across Block",
    location: "Angwan Rogo, Jos",
    status: "Awaiting Validation",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    type: "Power Issue",
    confirmations: 0,
    time: "25 mins ago",
    severity: "Low Risk",
    icon: <FiActivity />,
    color: "from-blue-500 to-cyan-600",
    badge:
      "bg-blue-500/15 text-blue-300 border-blue-500/20",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const DashboardActivity = ({ darkMode }) => {
  const [reports, setReports] =
    useState(nearbyReports);

  const [confirmedReports, setConfirmedReports] =
    useState([]);

  const handleConfirm = (index) => {
    if (confirmedReports.includes(index)) return;

    const updatedReports = [...reports];

    updatedReports[index].confirmations += 1;

    setReports(updatedReports);

    setConfirmedReports([
      ...confirmedReports,
      index,
    ]);
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 0.8,
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
            bg-[#07110D]
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
        opacity-[0.03]
        bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
        bg-[size:40px_40px]
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -top-24
        right-[-120px]
        w-[420px]
        h-[420px]
        bg-green-500/10
        blur-[120px]
        rounded-full
        "
      />

      <div className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-8
          p-5
          sm:p-7
          lg:p-9
          border-b
          ${
            darkMode
              ? "border-white/10"
              : "border-gray-200"
          }
          `}
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
                duration: 0.6,
              }}
              className={`
              inline-flex
              items-center
              gap-3
              px-4
              py-3
              border
              text-[11px]
              font-black
              tracking-[0.22em]
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
              <div className="relative flex h-2 w-2">
                <span
                  className="
                  animate-ping
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-green-400
                  opacity-75
                  "
                />

                <span
                  className="
                  relative
                  inline-flex
                  rounded-full
                  h-2
                  w-2
                  bg-green-500
                  "
                />
              </div>

              Nearby Community Reports
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
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
              mt-6
              text-[2rem]
              sm:text-[2.8rem]
              lg:text-[4rem]
              leading-[0.95]
              tracking-[-0.08em]
              font-black
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              Help Verify
              <span className="text-green-500">
                {" "}
                Real Issues
              </span>{" "}
              Around You.
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
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.22,
                duration: 0.7,
              }}
              className={`
              mt-5
              max-w-2xl
              text-sm
              sm:text-base
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }
              `}
            >
              Citizens near you are reporting road
              damage, flooding, broken infrastructure,
              and emergency risks. NationAura waits
              for at least{" "}
              <span className="text-green-500 font-bold">
                5 citizen confirmations
              </span>{" "}
              before escalating verified reports to
              the appropriate government agency for
              action.
            </motion.p>
          </div>

          {/* ACTIONS */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.25,
              duration: 0.8,
            }}
            className="
            flex
            flex-col
            sm:flex-row
            gap-4
            w-full
            xl:w-auto
            "
          >
            <Link to="/report">
              <motion.button
                whileHover={{
                  y: -3,
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="
                h-14
                px-6
                bg-gradient-to-r
                from-green-500
                to-emerald-600
                text-white
                font-bold
                shadow-[0_20px_60px_rgba(34,197,94,0.35)]
                "
              >
                <span
                  className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  whitespace-nowrap
                  "
                >
                  <FiPlus className="text-lg" />

                  Report Your Own Issue
                </span>
              </motion.button>
            </Link>

            <Link to="/report-center">
              <motion.button
                whileHover={{
                  y: -3,
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className={`
                h-14
                px-6
                border
                font-semibold
                ${
                  darkMode
                    ? `
                      bg-white/[0.03]
                      border-white/10
                      text-white
                    `
                    : `
                      bg-[#F8FAF9]
                      border-gray-200
                      text-black
                    `
                }
                `}
              >
                <span
                  className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  whitespace-nowrap
                  "
                >
                  <FiNavigation />

                  View All Reports Near You
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* REPORT GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
          p-5
          sm:p-7
          lg:p-9
          grid
          grid-cols-1
          lg:grid-cols-2
          xl:grid-cols-3
          gap-6
          "
        >
          {reports.map((report, index) => {
            const confirmed =
              confirmedReports.includes(index);

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.25,
                  },
                }}
                className={`
                group
                relative
                overflow-hidden
                border
                transition-all
                duration-500
                will-change-transform
                ${
                  darkMode
                    ? `
                      bg-[#0C1712]
                      border-white/10
                      hover:border-green-500/20
                    `
                    : `
                      bg-white
                      border-gray-200
                      hover:border-green-300
                    `
                }
                `}
              >
                {/* IMAGE */}
                <div className="relative h-[240px] overflow-hidden">
                  <motion.img
                    src={report.image}
                    alt={report.title}
                    initial={{
                      scale: 1.05,
                    }}
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                    className="
                    w-full
                    h-full
                    object-cover
                    "
                  />

                  {/* OVERLAY */}
                  <div
                    className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/20
                    to-transparent
                    "
                  />

                  {/* TOP BADGE */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                    }}
                    className="absolute top-4 left-4"
                  >
                    <div
                      className={`
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      border
                      text-xs
                      font-bold
                      backdrop-blur-xl
                      ${report.badge}
                      `}
                    >
                      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />

                      {report.severity}
                    </div>
                  </motion.div>

                  {/* TYPE */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-white/70">
                          {report.type}
                        </p>

                        <h3
                          className="
                          mt-2
                          text-2xl
                          font-black
                          leading-tight
                          text-white
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                          "
                        >
                          {report.title}
                        </h3>
                      </div>

                      <motion.div
                        whileHover={{
                          rotate: 6,
                          scale: 1.08,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                        }}
                        className={`
                        w-14
                        h-14
                        flex-shrink-0
                        bg-gradient-to-br
                        ${report.color}
                        text-white
                        flex
                        items-center
                        justify-center
                        text-2xl
                        shadow-[0_15px_40px_rgba(0,0,0,0.3)]
                        `}
                      >
                        {report.icon}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 sm:p-6">
                  {/* META */}
                  <div
                    className={`
                    flex
                    flex-wrap
                    items-center
                    gap-x-5
                    gap-y-3
                    text-sm
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <FiMapPin />

                      {report.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <FiClock />

                      {report.time}
                    </div>
                  </div>

                  {/* STATUS */}
                  <motion.div
                    whileHover={{
                      y: -2,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`
                    mt-5
                    p-4
                    border
                    transition-all
                    duration-500
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
                    <div className="flex items-start gap-3">
                      <FiShield className="text-green-500 text-lg mt-1" />

                      <div>
                        <p
                          className={`
                          text-sm
                          font-semibold
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                          `}
                        >
                          {report.status}
                        </p>

                        <p
                          className={`
                          mt-1
                          text-sm
                          leading-relaxed
                          ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-500"
                          }
                          `}
                        >
                          Reports require at least 5
                          community confirmations before
                          being forwarded to government
                          authorities.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* FOOTER */}
                  <div
                    className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    gap-4
                    "
                  >
                    {/* CONFIRMATIONS */}
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                      }}
                      className={`
                      flex
                      items-center
                      gap-3
                      ${
                        darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }
                      `}
                    >
                      <div
                        className="
                        w-11
                        h-11
                        bg-green-500/10
                        text-green-500
                        flex
                        items-center
                        justify-center
                        "
                      >
                        <FiUsers />
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Community Confirmations
                        </p>

                        <motion.h4
                          key={report.confirmations}
                          initial={{
                            scale: 1.2,
                            opacity: 0.6,
                          }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 250,
                          }}
                          className="text-lg font-black"
                        >
                          {report.confirmations}/5
                        </motion.h4>

                        <p className="text-[11px] text-green-500 font-semibold mt-1">
                          {5 - report.confirmations} more
                          needed
                        </p>
                      </div>
                    </motion.div>

                    {/* ACTION */}
                    <motion.button
                      whileHover={
                        confirmed
                          ? {}
                          : {
                              scale: 1.03,
                            }
                      }
                      whileTap={{
                        scale: 0.96,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                      }}
                      onClick={() =>
                        handleConfirm(index)
                      }
                      disabled={confirmed}
                      className={`
                      h-12
                      px-5
                      text-sm
                      font-bold
                      transition-all
                      duration-300
                      ${
                        confirmed
                          ? `
                            bg-emerald-600
                            text-white
                            cursor-default
                          `
                          : `
                            bg-green-500
                            text-white
                            shadow-[0_12px_30px_rgba(34,197,94,0.35)]
                          `
                      }
                      `}
                    >
                      <span
                        className="
                        flex
                        items-center
                        gap-2
                        "
                      >
                        {confirmed
                          ? "Confirmed"
                          : "Confirm"}

                        {!confirmed && (
                          <motion.div
                            animate={{
                              x: [0, 3, 0],
                            }}
                            transition={{
                              duration: 1.4,
                              repeat: Infinity,
                            }}
                          >
                            <FiArrowUpRight />
                          </motion.div>
                        )}
                      </span>
                    </motion.button>
                  </div>

                  {/* BOTTOM AI BAR */}
                  <div
                    className={`
                    mt-5
                    pt-5
                    border-t
                    flex
                    items-center
                    justify-between
                    text-sm
                    ${
                      darkMode
                        ? `
                          border-white/10
                          text-gray-500
                        `
                        : `
                          border-gray-200
                          text-gray-500
                        `
                    }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <FiCamera className="text-green-500" />

                      AI image analysis active
                    </div>

                    <div className="flex items-center gap-2 text-green-500 font-semibold">
                      Live

                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DashboardActivity;