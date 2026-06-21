import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import {
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiImage,
  FiX,
  FiUploadCloud,
  FiLoader,
} from "react-icons/fi";

const initialReports = [
  {
    id: "NR-2041",
    title: "Collapsed Road Section",
    location: "Sabon Gari, Kano",
    status: "Awaiting Community Verification",
    confirmations: 3,
    required: 5,
    progress: 60,
    date: "Submitted 2 hours ago",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    description:
      "Large potholes and damaged road surface causing traffic delays and accidents during rainfall.",
    fields: [
      "Road Damage",
      "High Priority",
      "Photo Evidence Uploaded",
      "AI Location Detected",
    ],
  },

  {
    id: "NR-1982",
    title: "Blocked Drainage System",
    location: "Nassarawa, Kano",
    status: "Community Review Active",
    confirmations: 4,
    required: 5,
    progress: 80,
    date: "Submitted Yesterday",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=1200&auto=format&fit=crop",
    description:
      "Drainage filled with waste materials causing water overflow and environmental hazards.",
    fields: [
      "Flood Risk",
      "Drain Blockage",
      "Voice Note Attached",
      "Emergency Flag Enabled",
    ],
  },

  {
    id: "NR-3901",
    title: "Broken Street Lights",
    location: "Jos, Plateau",
    status: "Verification In Progress",
    confirmations: 2,
    required: 5,
    progress: 40,
    date: "30 minutes ago",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
    description:
      "Multiple street lights no longer functioning causing security concerns at night.",
    fields: [
      "Public Safety",
      "Night Visibility",
      "Community Alert",
      "Photo Evidence Uploaded",
    ],
  },

  {
    id: "NR-5510",
    title: "Overflowing Waste Dump",
    location: "Kaduna Central",
    status: "Nearby Citizens Reviewing",
    confirmations: 1,
    required: 5,
    progress: 20,
    date: "1 hour ago",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop",
    description:
      "Waste disposal area overflowing into nearby roads and drainage systems.",
    fields: [
      "Environmental Hazard",
      "Waste Overflow",
      "Health Risk",
      "Urgent Cleanup Needed",
    ],
  },

  {
    id: "NR-6612",
    title: "Bridge Surface Damage",
    location: "Maiduguri",
    status: "Awaiting More Confirmations",
    confirmations: 5,
    required: 5,
    progress: 100,
    date: "Today",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop",
    description:
      "Deep cracks forming across bridge surface used daily by commercial vehicles.",
    fields: [
      "Bridge Damage",
      "Structural Concern",
      "Heavy Traffic Zone",
      "AI Risk Analysis Complete",
    ],
  },

  {
    id: "NR-7102",
    title: "Flooded School Entrance",
    location: "Ibadan",
    status: "Community Validation Active",
    confirmations: 3,
    required: 5,
    progress: 60,
    date: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    description:
      "School entrance flooded after rainfall making access difficult for students.",
    fields: [
      "Flood Risk",
      "School Access Blocked",
      "Citizen Reported",
      "Photo Evidence Uploaded",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// CONFIRMATION MODAL — upload → verifying → submitted. Fully frontend,
// no network calls. Same component shape as DashboardActivity's version.
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
        onSubmitted(); // bumps confirmations + progress on the parent card
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
        ${darkMode ? "bg-[#09131B] border-white/10" : "bg-white border-gray-200"}
        `}
      >
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
          {/* REPORT CONTEXT */}
          <p className={`text-xs uppercase tracking-[0.15em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {report.id}
          </p>
          <h3 className={`mt-1 text-lg font-bold leading-snug ${darkMode ? "text-white" : "text-black"}`}>
            {report.title}
          </h3>

          {/* ── STAGE 1: UPLOAD ─────────────────────────────────────────── */}
          {stage === "upload" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
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
                <input type="file" hidden accept="image/*" onChange={handleFileSelect} />
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

const UserReportsQueue = ({ darkMode }) => {
  const [reports, setReports] = useState(initialReports);
  const [confirmedReports, setConfirmedReports] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const openConfirmModal = (index) => {
    if (confirmedReports.includes(index)) return;
    setActiveModalIndex(index);
  };

  const closeModal = () => setActiveModalIndex(null);

  // Called once the simulated AI verification finishes — this is the
  // moment confirmations + progress actually update on the card.
  const handleVerifiedSubmit = (index) => {
    setReports((prev) => {
      const updated = [...prev];
      const next = updated[index];
      const newConfirmations = Math.min(next.confirmations + 1, next.required);
      updated[index] = {
        ...next,
        confirmations: newConfirmations,
        progress: Math.round((newConfirmations / next.required) * 100),
      };
      return updated;
    });

    setConfirmedReports((prev) => [...prev, index]);
  };

  return (
    <section className="mt-10">
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-end
        lg:justify-between
        gap-6
        mb-7
        "
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
            text-[10px]
            uppercase
            tracking-[0.3em]
            font-bold
            mb-4
            ${
              darkMode
                ? "text-green-400"
                : "text-green-700"
            }
            `}
          >
            Community Verification Feed
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-black
            tracking-[-0.05em]
            leading-[1]
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Reports Around You
            <span className="block text-green-500 mt-1">
              Awaiting Citizen Confirmation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`
            mt-5
            text-sm
            sm:text-base
            leading-relaxed
            max-w-xl
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
            `}
          >
            Reports submitted by citizens
            near your area require at least
            5 community confirmations
            before they are forwarded to
            government agencies for action.
          </motion.p>
        </div>

        {/* LIVE STATUS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`
          border
          px-5
          py-4
          min-w-[260px]
          ${
            darkMode
              ? `
                bg-[#09131B]
                border-white/10
              `
              : `
                bg-white
                border-gray-200
              `
          }
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`
                text-[10px]
                uppercase
                tracking-[0.25em]
                ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                `}
              >
                Nearby Verification Queue
              </p>

              <h3
                className={`
                mt-2
                text-3xl
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                126
              </h3>

              <p className="mt-2 text-green-500 text-sm font-semibold">
                Reports waiting for citizens
              </p>
            </div>

            <div
              className="
              w-14
              h-14
              bg-green-500/10
              border
              border-green-500/20
              flex
              items-center
              justify-center
              text-green-500
              text-2xl
              "
            >
              <FiTrendingUp />
            </div>
          </div>
        </motion.div>
      </div>

      {/* REPORT LIST */}
      <div className="space-y-5">
        {reports.map((report, index) => {
          const confirmed = confirmedReports.includes(index);

          return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`
            group
            border
            overflow-hidden
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-[#09131B]
                  border-white/10
                `
                : `
                  bg-white
                  border-gray-200
                `
            }
            `}
          >
            <div
              className="
              grid
              grid-cols-1
              xl:grid-cols-[340px_1fr]
              "
            >
              {/* IMAGE */}
              <div className="relative h-[260px] xl:h-full overflow-hidden">
                <img
                  src={report.image}
                  alt={report.title}
                  className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                  "
                />

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

                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <div
                    className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    bg-green-500
                    text-white
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    mb-4
                    "
                  >
                    <FiImage />
                    Evidence Uploaded
                  </div>

                  <h3 className="text-white text-2xl font-black leading-tight">
                    {report.title}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-7">
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
                  <div>
                    <div
                      className="
                      flex
                      flex-wrap
                      items-center
                      gap-4
                      "
                    >
                      <div
                        className={`
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        border
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
                        <FiCheckCircle />
                        {report.status}
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
                            : "text-gray-600"
                        }
                        `}
                      >
                        <FiMapPin />
                        {report.location}
                      </div>
                    </div>

                    <p
                      className={`
                      mt-5
                      max-w-2xl
                      text-sm
                      leading-relaxed
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                      `}
                    >
                      {report.description}
                    </p>
                  </div>

                  <div
                    className={`
                    border
                    p-4
                    min-w-[180px]
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
                    <p
                      className={`
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                      `}
                    >
                      Community Support
                    </p>

                    <motion.h4
                      key={report.confirmations}
                      initial={{ scale: 1.2, opacity: 0.6 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 250 }}
                      className={`
                      mt-3
                      text-4xl
                      font-black
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      {report.confirmations}
                    </motion.h4>

                    <p className="mt-2 text-green-500 text-sm font-semibold">
                      / {report.required} Needed
                      Before Escalation
                    </p>
                  </div>
                </div>

                {/* FORM DATA */}
                <div className="mt-7">
                  <h4
                    className={`
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    mb-4
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    Submitted Form Details
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {report.fields.map((field, i) => (
                      <div
                        key={i}
                        className={`
                        px-4
                        py-3
                        border
                        text-sm
                        font-medium
                        ${
                          darkMode
                            ? `
                              bg-white/[0.03]
                              border-white/10
                              text-gray-300
                            `
                            : `
                              bg-[#FAFAFA]
                              border-gray-200
                              text-gray-700
                            `
                        }
                        `}
                      >
                        {field}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                      `}
                    >
                      <FiUsers />
                      Verification Progress
                    </div>

                    <span className="text-green-500 font-bold text-sm">
                      {report.confirmations}/
                      {report.required}
                    </span>
                  </div>

                  <div
                    className={`
                    relative
                    h-3
                    overflow-hidden
                    ${
                      darkMode
                        ? "bg-white/10"
                        : "bg-gray-200"
                    }
                    `}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        width: `${report.progress}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                      h-full
                      bg-green-500
                      relative
                      overflow-hidden
                      "
                    >
                      <motion.div
                        animate={{
                          x: [
                            "-100%",
                            "250%",
                          ],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="
                        absolute
                        top-0
                        left-0
                        w-20
                        h-full
                        bg-white/30
                        skew-x-12
                        "
                      />
                    </motion.div>
                  </div>
                </div>

                {/* FOOTER */}
                <div
                  className="
                  mt-8
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-5
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
                        ? "text-gray-500"
                        : "text-gray-500"
                    }
                    `}
                  >
                    <FiClock />
                    {report.date}
                  </div>

                  <motion.button
                    whileHover={confirmed ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openConfirmModal(index)}
                    disabled={confirmed}
                    className={`
                    h-14
                    px-6
                    transition-all
                    duration-300
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    flex
                    items-center
                    justify-center
                    gap-3
                    w-full
                    sm:w-auto
                    ${
                      confirmed
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-green-500 hover:bg-green-400 text-white"
                    }
                    `}
                  >
                    {confirmed ? "Confirmed" : "Confirm Report"}

                    <FiCheckCircle />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
          );
        })}
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
    </section>
  );
};

export default UserReportsQueue;