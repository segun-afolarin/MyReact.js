import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
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
  FiAlertCircle,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getNearbyReports, confirmReport } from "../../utils/api";

// ─── Helpers ───────────────────────────────────────────────────────────────
const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";

const AVATAR_COLORS = [
  "from-green-500 to-emerald-700",
  "from-purple-500 to-violet-700",
  "from-blue-500 to-cyan-700",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-700",
];

const timeAgo = (iso) => {
  if (!iso) return "";
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

// AI score (e.g. "82%") → high/medium banding for the severity badge.
const severityFromScore = (scoreStr) => {
  const n = parseInt(scoreStr, 10) || 0;
  return n >= 70 ? "high" : "medium";
};

// Real status label → themed emergency phrasing, without fabricating a
// separate data source — this is just presentation on top of the real status.
const statusPhrase = (status) => {
  switch (status) {
    case "Resolved":
      return "Escalated To Authorities";
    case "In Progress":
      return "Community Review Active";
    default:
      return "Awaiting Community Verification";
  }
};

const mapEmergencyFromApi = (r) => ({
  reportId: r.reportId,
  id: r.id,
  title: r.title,
  location: r.location,
  time: timeAgo(r.createdAt),
  severity: severityFromScore(r.score),
  status: statusPhrase(r.status),
  confirmations: r.confirmations,
  required: r.requiredConfirmations || 3, // emergencies default to 3 on the backend
  progress: Math.min(Math.round((r.confirmations / (r.requiredConfirmations || 3)) * 100), 100),
  image:
    r.image ||
    "https://images.unsplash.com/photo-1527766833261-b09c3163a791?q=80&w=1200&auto=format&fit=crop",
  description: r.description,
  submittedBy: r.submittedBy,
  fields: r.fields || [],
  confirmedByMe: r.confirmedByMe,
  confirmers: (r.confirmedBy || []).map((c, i) => ({
    initials: initialsOf(c.name),
    name: c.name,
    avatar: c.avatar,
    bg: AVATAR_COLORS[i % AVATAR_COLORS.length],
  })),
});

// ─────────────────────────────────────────────────────────────────────────
// AVATAR STACK
// ─────────────────────────────────────────────────────────────────────────
const ConfirmerAvatars = ({ confirmers, darkMode }) => {
  if (!confirmers.length) {
    return (
      <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
        Be the first citizen to confirm this
      </p>
    );
  }

  const visible = confirmers.slice(0, 5);
  const extra = confirmers.length - visible.length;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex -space-x-2">
        {visible.map((c, i) => (
          <div
            key={i}
            title={c.name}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-red-500 flex items-center justify-center text-[10px] font-black text-white shrink-0 overflow-hidden"
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
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-red-500 flex items-center justify-center text-[9px] font-black shrink-0 ${
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

      <div className="min-w-0">
        <p
          className={`text-xs font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {confirmers.length}{" "}
          {confirmers.length === 1 ? "citizen" : "citizens"} confirmed this
        </p>
        <p className={`text-[11px] mt-0.5 truncate ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
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
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
            {initialsOf(submitter.name)}
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
// CONFIRMATION MODAL — real AI-verified /reports/{id}/confirm endpoint
// ─────────────────────────────────────────────────────────────────────────
const ConfirmationModal = ({ report, darkMode, onClose, onConfirm }) => {
  const [stage, setStage] = useState("upload"); // upload | verifying | submitted | error
  const [preview, setPreview] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setStage("verifying");
    setErrorMsg("");

    onConfirm(file)
      .then(() => setStage("submitted"))
      .catch((err) => {
        // Prefer the backend's actual AI mismatch reason / validation message
        // over a generic axios error string.
        const apiMessage = err?.response?.data?.message;
        const apiErrors = err?.response?.data?.errors;
        const firstFieldError = apiErrors ? Object.values(apiErrors)[0]?.[0] : null;

        setErrorMsg(
          apiMessage ||
            firstFieldError ||
            err?.message ||
            "Something went wrong verifying that photo. Please try again."
        );
        setStage("error");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && (stage === "submitted" || stage === "error")) onClose();
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
        {(stage === "submitted" || stage === "error") && (
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

        <div className="p-5 sm:p-6 lg:p-8">
          <p
            className={`text-xs uppercase tracking-[0.15em] ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {report.id}
          </p>
          <h3
            className={`mt-1 text-base sm:text-lg font-bold leading-snug break-words ${
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
                at this location. This helps our AI verify accuracy before
                alerting authorities.
              </p>

              <label
                className={`mt-5 flex flex-col items-center justify-center gap-3 border-2 border-dashed h-44 sm:h-48 cursor-pointer transition-colors ${
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
                <div className="w-full h-36 sm:h-40 mb-5 overflow-hidden border border-white/10">
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
                Checking that this photo genuinely matches this emergency
                report before it counts.
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

          {/* STAGE 4 — ERROR / AI MISMATCH */}
          {stage === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="mt-6 flex flex-col items-center text-center py-4"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-red-500/15 text-red-400 text-3xl">
                <FiAlertCircle />
              </div>

              <h4
                className={`mt-5 text-lg font-black ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Couldn't verify that photo
              </h4>
              <p
                className={`mt-2 text-sm max-w-xs leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {errorMsg}
              </p>

              <button
                onClick={() => {
                  setStage("upload");
                  setPreview("");
                }}
                className="mt-6 w-full h-12 bg-red-500 text-white font-bold hover:bg-red-400 transition-colors"
              >
                Try Another Photo
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Loading / error / empty helpers ───────────────────────────────────────
const ListSkeleton = ({ darkMode }) => (
  <div className="space-y-5">
    {[0, 1].map((i) => (
      <div
        key={i}
        className={`grid grid-cols-1 xl:grid-cols-[340px_1fr] border overflow-hidden animate-pulse ${
          darkMode ? "bg-[#09131B] border-white/10" : "bg-white border-gray-200"
        }`}
      >
        <div className={`h-[220px] sm:h-[260px] xl:h-full ${darkMode ? "bg-white/[0.04]" : "bg-gray-100"}`} />
        <div className="p-5 sm:p-7 space-y-4">
          <div className={`h-4 w-1/3 ${darkMode ? "bg-white/[0.06]" : "bg-gray-100"}`} />
          <div className={`h-4 w-2/3 ${darkMode ? "bg-white/[0.06]" : "bg-gray-100"}`} />
          <div className={`h-20 w-full ${darkMode ? "bg-white/[0.04]" : "bg-gray-50"}`} />
          <div className={`h-3 w-full ${darkMode ? "bg-white/[0.06]" : "bg-gray-100"}`} />
        </div>
      </div>
    ))}
  </div>
);

const ErrorState = ({ darkMode, message, onRetry }) => (
  <div className={`border p-8 sm:p-10 text-center ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}`}>
    <FiAlertCircle className="mx-auto text-red-400" size={22} />
    <p className={`mt-3 text-base sm:text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>Couldn't load emergency alerts</p>
    <p className={`mt-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
      {message || "Check your connection and try again."}
    </p>
    <button
      onClick={onRetry}
      className={`mt-6 h-11 px-5 inline-flex items-center gap-2 text-sm font-semibold border ${
        darkMode ? "border-white/10 text-white hover:bg-white/[0.04]" : "border-gray-200 text-black hover:bg-gray-50"
      }`}
    >
      <FiRefreshCw /> Try Again
    </button>
  </div>
);

const NoStateBlock = ({ darkMode, message }) => (
  <div className={`border p-8 sm:p-10 text-center ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}`}>
    <FiMapPin className="mx-auto text-red-500" size={22} />
    <p className={`mt-3 text-base sm:text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>We don't know where to look yet</p>
    <p className={`mt-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
      {message || "Add your state to your profile so NationAura can surface emergencies near you."}
    </p>
  </div>
);

const AllClearState = ({ darkMode, stateName }) => (
  <div className={`relative overflow-hidden border p-8 sm:p-10 text-center ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}`}>
    <div className="mx-auto w-14 h-14 flex items-center justify-center bg-green-500/10 border border-green-500/20 rounded-full">
      <FiShield className="text-green-500 text-xl" />
    </div>
    <p className={`mt-4 text-base sm:text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
      No Active Emergencies in {stateName}
    </p>
    <p className={`mt-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
      There are currently no emergency-flagged reports awaiting verification near you.
    </p>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────
const AlertsEmergency = ({ darkMode }) => {
  const { user } = useAuth();

  const [emergencies, setEmergencies] = useState([]);
  const [stateName, setStateName] = useState(null);
  const [noStateMessage, setNoStateMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModalId, setActiveModalId] = useState(null);

  const fetchEmergencies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNearbyReports();
      setStateName(data.state);
      setNoStateMessage(data.message || "");
      const onlyEmergencies = (data.reports || []).filter((r) => r.isEmergency);
      setEmergencies(onlyEmergencies.map(mapEmergencyFromApi));
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load emergency alerts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmergencies();
  }, [fetchEmergencies]);

  const openModal = (reportId) => {
    const target = emergencies.find((r) => r.reportId === reportId);
    if (target?.confirmedByMe) return;
    setActiveModalId(reportId);
  };

  const closeModal = () => setActiveModalId(null);

  const handleConfirm = useCallback(
    async (reportId, file) => {
      const formData = new FormData();
      formData.append("evidence", file);

      const data = await confirmReport(reportId, formData);

      setEmergencies((prev) =>
        prev.map((r) => {
          if (r.reportId !== reportId) return r;
          const newConfirmations = data.confirmations;
          return {
            ...r,
            confirmations: newConfirmations,
            progress: Math.min(Math.round((newConfirmations / r.required) * 100), 100),
            confirmedByMe: true,
            confirmers: [
              ...r.confirmers,
              {
                initials: initialsOf(user?.name || "You"),
                name: user?.name || "You",
                avatar: user?.avatar || null,
                bg: "from-green-500 to-emerald-700",
              },
            ],
          };
        })
      );
    },
    [user]
  );

  const activeReport = emergencies.find((r) => r.reportId === activeModalId);

  const getSeverityStyles = (severity) => {
    if (severity === "high")
      return "border-red-500/30 bg-red-500/5 text-red-500";
    return "border-yellow-500/30 bg-yellow-500/5 text-yellow-500";
  };

  return (
    <section className="mt-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-7">
        <div className="max-w-2xl min-w-0">
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
            Community-reported emergencies near you{stateName ? ` in ${stateName}` : ""} require at least 3
            citizen confirmations before they are escalated to emergency response agencies for immediate
            action — a lower bar than regular reports, since these are time-critical.
          </motion.p>
        </div>

        {/* LIVE STATUS BADGE */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`border px-4 sm:px-5 py-4 min-w-0 sm:min-w-[260px] ${
            darkMode
              ? "bg-[#09131B] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p
                className={`text-[10px] uppercase tracking-[0.25em] ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Active Emergency Queue
              </p>
              <h3
                className={`mt-2 text-2xl sm:text-3xl font-black ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {loading ? "—" : emergencies.length}
              </h3>
              <p className="mt-2 text-red-500 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <FiRadio className="animate-pulse shrink-0" />
                Live alerts near you
              </p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-xl sm:text-2xl shrink-0">
              <FiAlertTriangle />
            </div>
          </div>
        </motion.div>
      </div>

      {/* BODY: loading / error / no-state / all-clear / list */}
      {loading ? (
        <ListSkeleton darkMode={darkMode} />
      ) : error ? (
        <ErrorState darkMode={darkMode} message={error} onRetry={fetchEmergencies} />
      ) : !stateName ? (
        <NoStateBlock darkMode={darkMode} message={noStateMessage} />
      ) : emergencies.length === 0 ? (
        <AllClearState darkMode={darkMode} stateName={stateName} />
      ) : (
        <div className="space-y-5">
          <AnimatePresence>
            {emergencies.map((item, index) => {
              const confirmed = item.confirmedByMe;
              const remaining = Math.max(item.required - item.confirmations, 0);

              return (
                <motion.div
                  key={item.reportId}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group border overflow-hidden transition-all duration-300 ${
                    darkMode
                      ? "bg-[#09131B] border-white/10"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr]">

                    {/* IMAGE */}
                    <div className="relative h-[220px] sm:h-[260px] xl:h-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.18em] mb-3 sm:mb-4">
                          <FiImage />
                          {item.id || "Evidence Uploaded"}
                        </div>
                        <h3 className="text-white text-xl sm:text-2xl font-black leading-tight break-words">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 sm:p-5 lg:p-7">

                      {/* TOP ROW */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                            {/* STATUS */}
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] border ${
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
                              className={`inline-flex items-center gap-1 px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] border ${getSeverityStyles(item.severity)}`}
                            >
                              <FiAlertTriangle />
                              {item.severity}
                            </div>

                            {/* LOCATION */}
                            <div
                              className={`flex items-center gap-2 text-xs sm:text-sm min-w-0 ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              <FiMapPin className="shrink-0" />
                              <span className="truncate">{item.location}</span>
                            </div>
                          </div>

                          {/* REPORTED BY */}
                          <ReportedBy submitter={item.submittedBy} darkMode={darkMode} />

                          <p
                            className={`mt-4 sm:mt-5 max-w-2xl text-[13px] sm:text-sm leading-relaxed ${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>

                        {/* CONFIRMATION COUNT */}
                        <div
                          className={`border p-4 min-w-0 lg:min-w-[180px] ${
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
                            className={`mt-3 text-3xl sm:text-4xl font-black ${
                              darkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {item.confirmations}
                          </motion.h4>
                          <p className="mt-2 text-red-500 text-xs sm:text-sm font-semibold">
                            / {item.required} Needed Before Escalation
                          </p>
                        </div>
                      </div>

                      {/* FORM FIELDS */}
                      {item.fields?.length > 0 && (
                        <div className="mt-6 sm:mt-7">
                          <h4
                            className={`text-xs sm:text-sm font-bold uppercase tracking-[0.15em] mb-3 sm:mb-4 ${
                              darkMode ? "text-white" : "text-black"
                            }`}
                          >
                            Submitted Report Details
                          </h4>
                          <div className="flex flex-wrap gap-2.5 sm:gap-3">
                            {item.fields.map((field, i) => (
                              <div
                                key={i}
                                className={`px-3.5 sm:px-4 py-2.5 sm:py-3 border text-xs sm:text-sm font-medium ${
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
                      )}

                      {/* WHO ALREADY CONFIRMED */}
                      <div className="mt-6 sm:mt-7">
                        <h4
                          className={`text-xs sm:text-sm font-bold uppercase tracking-[0.15em] mb-3 sm:mb-4 ${
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
                      <div className="mt-7 sm:mt-8">
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`flex items-center gap-2 text-xs sm:text-sm ${
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
                            className="text-red-500 font-bold text-xs sm:text-sm"
                          >
                            {item.confirmations}/{item.required}
                          </motion.span>
                        </div>

                        <div
                          className={`relative h-2.5 sm:h-3 overflow-hidden ${
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
                          {remaining > 0
                            ? `${remaining} more confirmation${remaining === 1 ? "" : "s"} needed before escalation`
                            : "Ready for emergency escalation"}
                        </p>
                      </div>

                      {/* FOOTER */}
                      <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
                        <div
                          className={`flex items-center gap-2 text-xs sm:text-sm ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          <FiClock />
                          {item.time}
                        </div>

                        <motion.button
                          whileHover={confirmed ? {} : { scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openModal(item.reportId)}
                          disabled={confirmed}
                          className={`h-12 sm:h-14 px-6 transition-all duration-300 font-bold uppercase tracking-[0.15em] text-xs sm:text-sm flex items-center justify-center gap-3 w-full sm:w-auto ${
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
          </AnimatePresence>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {activeModalId !== null && activeReport && (
          <ConfirmationModal
            report={activeReport}
            darkMode={darkMode}
            onClose={closeModal}
            onConfirm={(file) => handleConfirm(activeModalId, file)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AlertsEmergency;