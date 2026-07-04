import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiAlertTriangle,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiRadio,
  FiUploadCloud,
  FiX,
  FiLoader,
  FiUsers,
  FiImage,
  FiThumbsUp,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

// ─────────────────────────────────────────────────────────────────────────
// DATA — Nasarawa State locations with pre-existing confirmers
// ─────────────────────────────────────────────────────────────────────────
const initialEmergencies = [
  {
    id: "EM-1001",
    title: "Flooding reported after heavy rain",
    location: "Karu, Nasarawa State",
    time: "Just now",
    severity: "high",
    status: "Awaiting Community Verification",
    confirmations: 2,
    required: 5,
    progress: 40,
    image:
      "https://images.unsplash.com/photo-1527766833261-b09c3163a791?q=80&w=1200&auto=format&fit=crop",
    description:
      "Severe flooding across residential streets following overnight rainfall. Roads are submerged and residents are stranded in low-lying areas.",
    submittedBy: {
      initials: "AO",
      name: "Adamu Okonkwo",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      bg: "from-green-500 to-emerald-700",
    },
    fields: [
      "Flood Risk",
      "High Priority",
      "Photo Evidence Uploaded",
      "AI Location Detected",
    ],
    confirmers: [
      {
        initials: "AO",
        name: "Adamu Okonkwo",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        bg: "from-green-500 to-emerald-700",
      },
      {
        initials: "BD",
        name: "Blessing Danladi",
        avatar: null,
        bg: "from-green-500 to-emerald-700",
      },
    ],
  },
  {
    id: "EM-1002",
    title: "Road accident blocking main route",
    location: "Lafia–Akwanga Road, Nasarawa",
    time: "6 mins ago",
    severity: "high",
    status: "Community Review Active",
    confirmations: 3,
    required: 5,
    progress: 60,
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200&auto=format&fit=crop",
    description:
      "Multiple vehicles involved in a collision blocking the main arterial road. Emergency services have been contacted but citizens require confirmation.",
    submittedBy: {
      initials: "MN",
      name: "Musa Naphtali",
      avatar: null,
      bg: "from-green-500 to-emerald-700",
    },
    fields: [
      "Road Blockage",
      "Emergency Response Needed",
      "Citizen Reported",
      "High Traffic Zone",
    ],
    confirmers: [
      {
        initials: "MN",
        name: "Musa Naphtali",
        avatar: null,
        bg: "from-green-500 to-emerald-700",
      },
      {
        initials: "SY",
        name: "Sule Yakubu",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        bg: "from-green-500 to-teal-700",
      },
      {
        initials: "FK",
        name: "Fatima Kure",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
        bg: "from-purple-500 to-violet-700",
      },
    ],
  },
  {
    id: "EM-1003",
    title: "Power outage affecting multiple houses",
    location: "Akwanga, Nasarawa State",
    time: "12 mins ago",
    severity: "medium",
    status: "Nearby Citizens Reviewing",
    confirmations: 1,
    required: 5,
    progress: 20,
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1200&auto=format&fit=crop",
    description:
      "Complete power outage affecting an entire ward. Hospitals, businesses and homes are without electricity for over 3 hours.",
    submittedBy: {
      initials: "CE",
      name: "Chioma Ezekiel",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
      bg: "from-green-500 to-emerald-700",
    },
    fields: [
      "Power Outage",
      "Medium Priority",
      "Voice Note Attached",
      "Infrastructure Failure",
    ],
    confirmers: [
      {
        initials: "CE",
        name: "Chioma Ezekiel",
        avatar:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
        bg: "from-green-500 to-emerald-700",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// AVATAR STACK
// ─────────────────────────────────────────────────────────────────────────
const ConfirmerAvatars = ({ confirmers, darkMode }) => {
  const visible = confirmers.slice(0, 5);
  const extra = confirmers.length - visible.length;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex -space-x-2">
        {visible.map((c, i) => (
          <div
            key={i}
            title={c.name}
            className="relative w-9 h-9 rounded-full border-2 border-red-500 flex items-center justify-center text-[10px] font-black text-white shrink-0 overflow-hidden"
            style={{ zIndex: visible.length - i }}
          >
            {c.avatar ? (
              <img
                src={c.avatar}
                alt={c.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${c.bg} flex items-center justify-center`}
              >
                {c.initials}
              </div>
            )}
          </div>
        ))}

        {extra > 0 && (
          <div
            className={`w-9 h-9 rounded-full border-2 border-red-500 flex items-center justify-center text-[9px] font-black shrink-0 ${
              darkMode
                ? "bg-white/10 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            style={{ zIndex: 0 }}
          >
            +{extra}
          </div>
        )}
      </div>

      <div>
        <p
          className={`text-xs font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {confirmers.length}{" "}
          {confirmers.length === 1 ? "citizen" : "citizens"} confirmed this
        </p>
        <p className={`text-[11px] mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          {visible
            .slice(0, 2)
            .map((c) => c.name)
            .join(", ")}
          {confirmers.length > 2 ? ` + ${confirmers.length - 2} others` : ""}
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// REPORTED BY BADGE
// ─────────────────────────────────────────────────────────────────────────
const ReportedBy = ({ submitter, darkMode }) => {
  if (!submitter) return null;

  return (
    <div className="mt-3 flex items-center gap-2">
      <div className="w-7 h-7 rounded-full border-2 border-red-500 overflow-hidden flex items-center justify-center text-white text-[9px] font-black shrink-0">
        {submitter.avatar ? (
          <img src={submitter.avatar} alt={submitter.name} className="w-full h-full object-cover" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${submitter.bg} flex items-center justify-center`}>
            {submitter.initials}
          </div>
        )}
      </div>
      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        Reported by <span className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>{submitter.name}</span>
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// CONFIRMATION MODAL
// ─────────────────────────────────────────────────────────────────────────
const ConfirmationModal = ({ report, darkMode, onClose, onSubmitted }) => {
  const [stage, setStage] = useState("upload");
  const [preview, setPreview] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setStage("verifying");
      setTimeout(() => {
        setStage("submitted");
        onSubmitted();
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
        className={`relative w-full max-w-md border overflow-hidden ${
          darkMode
            ? "bg-[#09131B] border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        {stage === "submitted" && (
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center z-10 ${
              darkMode
                ? "bg-white/[0.06] text-white hover:bg-white/[0.12]"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            <FiX />
          </button>
        )}

        <div className="p-6 sm:p-8">
          <p
            className={`text-xs uppercase tracking-[0.15em] ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {report.id}
          </p>
          <h3
            className={`mt-1 text-lg font-bold leading-snug ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {report.title}
          </h3>

          {/* STAGE 1 — UPLOAD */}
          {stage === "upload" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <p
                className={`text-sm leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                To confirm this emergency, upload a photo showing the situation
                at this location. This helps verify accuracy before alerting
                authorities.
              </p>

              <label
                className={`mt-5 flex flex-col items-center justify-center gap-3 border-2 border-dashed h-48 cursor-pointer transition-colors ${
                  darkMode
                    ? "border-white/15 hover:border-red-500/40 bg-white/[0.02]"
                    : "border-gray-300 hover:border-red-400 bg-[#FAFAFA]"
                }`}
              >
                <FiUploadCloud className="text-3xl text-red-500" />
                <span
                  className={`text-sm font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Tap to upload photo evidence
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
                className={`mt-4 w-full h-11 text-sm font-semibold border transition-colors ${
                  darkMode
                    ? "border-white/10 text-gray-300 hover:bg-white/[0.04]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                Cancel
              </button>
            </motion.div>
          )}

          {/* STAGE 2 — VERIFYING */}
          {stage === "verifying" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex flex-col items-center text-center py-4"
            >
              {preview && (
                <div className="w-full h-40 mb-5 overflow-hidden border border-white/10">
                  <img
                    src={preview}
                    alt="Uploaded evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 flex items-center justify-center bg-red-500/10 text-red-500 text-2xl"
              >
                <FiLoader />
              </motion.div>

              <h4
                className={`mt-5 font-bold ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                AI is verifying your photo...
              </h4>
              <p
                className={`mt-2 text-sm max-w-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Checking image quality, location consistency, and matching it
                against this emergency report.
              </p>

              <div
                className={`mt-5 w-full h-1.5 overflow-hidden ${
                  darkMode ? "bg-white/10" : "bg-gray-200"
                }`}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ width: "50%" }}
                />
              </div>
            </motion.div>
          )}

          {/* STAGE 3 — SUBMITTED */}
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
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="w-16 h-16 flex items-center justify-center bg-green-500 text-white text-3xl"
              >
                <FiCheckCircle />
              </motion.div>

              <h4
                className={`mt-5 text-xl font-black ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Emergency Confirmed
              </h4>
              <p
                className={`mt-2 text-sm max-w-xs leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Thank you. Your photo confirmation has been added to this
                emergency report. Once enough citizens confirm, it will be
                escalated to the appropriate authority immediately.
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

// ─────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────
const AlertsEmergency = ({ darkMode }) => {
  const { user } = useAuth();

  const [emergencies, setEmergencies] = useState(
    initialEmergencies.map((e) => ({ ...e, confirmers: [...e.confirmers] }))
  );
  const [confirmedList, setConfirmedList] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // ── Build the current user's confirmer entry from real auth data ──────────
  const getCurrentUserConfirmer = () => {
    const name = user?.name?.trim() || "You";
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return {
      initials,
      name,
      avatar: user?.avatar || null,
      bg: "from-green-500 to-emerald-700",
    };
  };

  const openModal = (index) => {
    if (confirmedList.includes(index)) return;
    setActiveModalIndex(index);
  };

  const closeModal = () => setActiveModalIndex(null);

  const handleVerifiedSubmit = (index) => {
    setEmergencies((prev) => {
      const updated = [...prev];
      const next = updated[index];
      const newConfirmations = Math.min(next.confirmations + 1, next.required);
      updated[index] = {
        ...next,
        confirmations: newConfirmations,
        progress: Math.round((newConfirmations / next.required) * 100),
        confirmers: [...next.confirmers, getCurrentUserConfirmer()],
      };
      return updated;
    });
    setConfirmedList((prev) => [...prev, index]);
  };

  const getSeverityStyles = (severity) => {
    if (severity === "high")
      return "border-red-500/30 bg-red-500/5 text-red-500";
    return "border-yellow-500/30 bg-yellow-500/5 text-yellow-500";
  };

  return (
    <section className="mt-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-7">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[10px] uppercase tracking-[0.3em] font-bold mb-4 ${
              darkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            Live Emergency Feed
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-[1] ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Emergency Alerts
            <span className="block text-red-500 mt-1">
              Requiring Citizen Verification
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`mt-5 text-sm sm:text-base leading-relaxed max-w-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Community-reported emergencies near your area require at least 5
            citizen confirmations before they are escalated to emergency
            response agencies for immediate action.
          </motion.p>
        </div>

        {/* LIVE STATUS BADGE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`border px-5 py-4 min-w-[260px] ${
            darkMode
              ? "bg-[#09131B] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`text-[10px] uppercase tracking-[0.25em] ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Active Emergency Queue
              </p>
              <h3
                className={`mt-2 text-3xl font-black ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {emergencies.length}
              </h3>
              <p className="mt-2 text-red-500 text-sm font-semibold flex items-center gap-2">
                <FiRadio className="animate-pulse" />
                Live alerts near you
              </p>
            </div>
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-2xl">
              <FiAlertTriangle />
            </div>
          </div>
        </motion.div>
      </div>

      {/* EMERGENCY LIST */}
      <div className="space-y-5">
        {emergencies.map((item, index) => {
          const confirmed = confirmedList.includes(index);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group border overflow-hidden transition-all duration-300 ${
                darkMode
                  ? "bg-[#09131B] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr]">

                {/* IMAGE */}
                <div className="relative h-[260px] xl:h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 w-full">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.18em] mb-4">
                      <FiImage />
                      Evidence Uploaded
                    </div>
                    <h3 className="text-white text-2xl font-black leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 sm:p-7">

                  {/* TOP ROW */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-4">
                        {/* STATUS */}
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] border ${
                            darkMode
                              ? "bg-red-500/10 border-red-500/20 text-red-400"
                              : "bg-red-50 border-red-200 text-red-700"
                          }`}
                        >
                          <FiRadio className="animate-pulse" />
                          {item.status}
                        </div>

                        {/* SEVERITY */}
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] border ${getSeverityStyles(item.severity)}`}
                        >
                          <FiAlertTriangle />
                          {item.severity}
                        </div>

                        {/* LOCATION */}
                        <div
                          className={`flex items-center gap-2 text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <FiMapPin />
                          {item.location}
                        </div>
                      </div>

                      {/* REPORTED BY */}
                      <ReportedBy submitter={item.submittedBy} darkMode={darkMode} />

                      <p
                        className={`mt-5 max-w-2xl text-sm leading-relaxed ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* CONFIRMATION COUNT */}
                    <div
                      className={`border p-4 min-w-[180px] ${
                        darkMode
                          ? "bg-white/[0.03] border-white/10"
                          : "bg-[#FAFAFA] border-gray-200"
                      }`}
                    >
                      <p
                        className={`text-[10px] uppercase tracking-[0.2em] ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Community Support
                      </p>
                      <motion.h4
                        key={item.confirmations}
                        initial={{ scale: 1.2, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        className={`mt-3 text-4xl font-black ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {item.confirmations}
                      </motion.h4>
                      <p className="mt-2 text-red-500 text-sm font-semibold">
                        / {item.required} Needed Before Escalation
                      </p>
                    </div>
                  </div>

                  {/* FORM FIELDS */}
                  <div className="mt-7">
                    <h4
                      className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Submitted Report Details
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {item.fields.map((field, i) => (
                        <div
                          key={i}
                          className={`px-4 py-3 border text-sm font-medium ${
                            darkMode
                              ? "bg-white/[0.03] border-white/10 text-gray-300"
                              : "bg-[#FAFAFA] border-gray-200 text-gray-700"
                          }`}
                        >
                          {field}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WHO ALREADY CONFIRMED */}
                  <div className="mt-7">
                    <h4
                      className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Who Confirmed This
                    </h4>
                    <ConfirmerAvatars
                      confirmers={item.confirmers}
                      darkMode={darkMode}
                    />
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`flex items-center gap-2 text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <FiUsers />
                        Verification Progress
                      </div>
                      <motion.span
                        key={item.confirmations}
                        initial={{ scale: 1.3, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        className="text-red-500 font-bold text-sm"
                      >
                        {item.confirmations}/{item.required}
                      </motion.span>
                    </div>

                    <div
                      className={`relative h-3 overflow-hidden ${
                        darkMode ? "bg-white/10" : "bg-gray-200"
                      }`}
                    >
                      <motion.div
                        initial={false}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-red-500 relative overflow-hidden"
                      >
                        <motion.div
                          animate={{ x: ["-100%", "250%"] }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-12"
                        />
                      </motion.div>
                    </div>

                    <p
                      className={`text-[11px] mt-1.5 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {Math.max(item.required - item.confirmations, 0) > 0
                        ? `${item.required - item.confirmations} more confirmations needed before escalation`
                        : "Ready for emergency escalation"}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      <FiClock />
                      {item.time}
                    </div>

                    <motion.button
                      whileHover={confirmed ? {} : { scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openModal(index)}
                      disabled={confirmed}
                      className={`h-14 px-6 transition-all duration-300 font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 w-full sm:w-auto ${
                        confirmed
                          ? "bg-emerald-600 text-white cursor-default"
                          : "bg-red-500 hover:bg-red-400 text-white"
                      }`}
                    >
                      {confirmed ? (
                        <>
                          <FiThumbsUp />
                          Confirmed
                        </>
                      ) : (
                        <>
                          Confirm Emergency
                          <FiCheckCircle />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeModalIndex !== null && (
          <ConfirmationModal
            report={emergencies[activeModalIndex]}
            darkMode={darkMode}
            onClose={closeModal}
            onSubmitted={() => handleVerifiedSubmit(activeModalIndex)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AlertsEmergency;