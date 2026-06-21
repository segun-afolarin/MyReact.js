import { motion, AnimatePresence } from "framer-motion";

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
  FiX,
  FiUploadCloud,
  FiLoader,
} from "react-icons/fi";

const nearbyReports = [
  {
    title: "Collapsed Drainage Blocking Road",
    location: "Rayfield, Kwara",
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
    location: "Terminus, Kwara",
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
    location: "Ifelodun, Kwara",
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

// ─────────────────────────────────────────────────────────────────────────
// CONFIRMATION MODAL
// Handles the whole upload → verifying → submitted flow for one report.
// Fully self-contained, no network calls — everything here is simulated.
// ─────────────────────────────────────────────────────────────────────────
const ConfirmationModal = ({ report, darkMode, onClose, onSubmitted }) => {
  // stage: "upload" → "verifying" → "submitted"
  const [stage, setStage] = useState("upload");
  const [preview, setPreview] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setStage("verifying");

      // Simulated AI verification delay — no backend call, just a timer
      setTimeout(() => {
        setStage("submitted");
        onSubmitted(); // bumps the confirmation count on the parent card
      }, 2600);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        // Only allow closing by clicking the backdrop once submitted —
        // prevents accidentally losing progress mid-upload/verify.
        if (e.target === e.currentTarget && stage === "submitted") onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className={`
        relative w-full max-w-md border overflow-hidden
        ${darkMode ? "bg-[#0C1712] border-white/10" : "bg-white border-gray-200"}
        `}
      >
        {/* CLOSE — only enabled at submitted stage */}
        {stage === "submitted" && (
          <button
            onClick={onClose}
            className={`
            absolute top-4 right-4 w-9 h-9 flex items-center justify-center z-10
            ${darkMode ? "bg-white/[0.06] text-white hover:bg-white/[0.12]" : "bg-gray-100 text-black hover:bg-gray-200"}
            `}
          >
            <FiX />
          </button>
        )}

        <div className="p-6 sm:p-8">
          {/* REPORT CONTEXT — shown at every stage so user knows what they're confirming */}
          <p className={`text-xs uppercase tracking-[0.15em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {report.type}
          </p>
          <h3 className={`mt-1 text-lg font-bold leading-snug ${darkMode ? "text-white" : "text-black"}`}>
            {report.title}
          </h3>

          {/* ── STAGE 1: UPLOAD ─────────────────────────────────────────── */}
          {stage === "upload" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                To confirm this report, upload a photo showing the issue still
                exists at this location. This helps our AI verify accuracy
                before forwarding it to authorities.
              </p>

              <label
                className={`
                mt-5 flex flex-col items-center justify-center gap-3
                border-2 border-dashed h-48 cursor-pointer transition-colors
                ${darkMode
                  ? "border-white/15 hover:border-green-500/40 bg-white/[0.02]"
                  : "border-gray-300 hover:border-green-400 bg-[#FAFAFA]"}
                `}
              >
                <FiUploadCloud className="text-3xl text-green-500" />
                <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Tap to upload a photo
                </span>
                <span className="text-xs text-gray-500">JPG or PNG</span>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>

              <button
                onClick={onClose}
                className={`
                mt-4 w-full h-11 text-sm font-semibold border transition-colors
                ${darkMode ? "border-white/10 text-gray-300 hover:bg-white/[0.04]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}
                `}
              >
                Cancel
              </button>
            </motion.div>
          )}

          {/* ── STAGE 2: VERIFYING ──────────────────────────────────────── */}
          {stage === "verifying" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex flex-col items-center text-center py-4"
            >
              {preview && (
                <div className="w-full h-40 mb-5 overflow-hidden border border-white/10">
                  <img src={preview} alt="Uploaded evidence" className="w-full h-full object-cover" />
                </div>
              )}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 flex items-center justify-center bg-green-500/10 text-green-500 text-2xl"
              >
                <FiLoader />
              </motion.div>

              <h4 className={`mt-5 font-bold ${darkMode ? "text-white" : "text-black"}`}>
                AI is verifying your photo...
              </h4>
              <p className={`mt-2 text-sm max-w-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Checking image quality, location consistency, and matching it
                against this report.
              </p>

              {/* indeterminate progress shimmer */}
              <div className={`mt-5 w-full h-1.5 overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "50%" }}
                />
              </div>
            </motion.div>
          )}

          {/* ── STAGE 3: SUBMITTED ──────────────────────────────────────── */}
          {stage === "submitted" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="mt-6 flex flex-col items-center text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
                className="w-16 h-16 flex items-center justify-center bg-green-500 text-white text-3xl"
              >
                <FiCheckCircle />
              </motion.div>

              <h4 className={`mt-5 text-xl font-black ${darkMode ? "text-white" : "text-black"}`}>
                Confirmation Submitted
              </h4>
              <p className={`mt-2 text-sm max-w-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Thank you. Your photo confirmation has been added to this
                report. Once enough citizens confirm, it will be escalated to
                the appropriate authority.
              </p>

              <button
                onClick={onClose}
                className="mt-6 w-full h-12 bg-green-500 text-white font-bold hover:bg-green-400 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const DashboardActivity = ({ darkMode }) => {
  const [reports, setReports] =
    useState(nearbyReports);

  const [confirmedReports, setConfirmedReports] =
    useState([]);

  // Which report index currently has the modal open (null = closed)
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const openConfirmModal = (index) => {
    if (confirmedReports.includes(index)) return;
    setActiveModalIndex(index);
  };

  const closeModal = () => setActiveModalIndex(null);

  // Called by the modal once the simulated AI verification finishes —
  // this is the moment the confirmation count actually increments.
  const handleVerifiedSubmit = (index) => {
    setReports((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        confirmations: updated[index].confirmations + 1,
      };
      return updated;
    });

    setConfirmedReports((prev) => [...prev, index]);
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

                    {/* ACTION — opens the upload/verify modal instead of confirming instantly */}
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
                        openConfirmModal(index)
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

      {/* CONFIRMATION MODAL — rendered once, driven by activeModalIndex */}
      <AnimatePresence>
        {activeModalIndex !== null && (
          <ConfirmationModal
            report={reports[activeModalIndex]}
            darkMode={darkMode}
            onClose={closeModal}
            onSubmitted={() => handleVerifiedSubmit(activeModalIndex)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default DashboardActivity;