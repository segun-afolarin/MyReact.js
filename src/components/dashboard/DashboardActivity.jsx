import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
  FiThumbsUp,
  FiRadio,
  FiCompass,
  FiRefreshCw,
  FiAlertCircle,
} from "react-icons/fi";

// If you already have an axios instance / api client elsewhere in the project
// (e.g. src/api/axios.js), swap this out for that import instead.
import { useAuth } from "../../context/AuthContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  headers: { Accept: "application/json" },
});

// ─────────────────────────────────────────────────────────────────────────
// HELPERS — mapping raw API data into presentation-ready shapes
// ─────────────────────────────────────────────────────────────────────────
const CATEGORY_META = {
  Flooding: { icon: <FiAlertTriangle />, color: "from-blue-500 to-cyan-600" },
  "Bad Roads": { icon: <FiActivity />, color: "from-orange-500 to-amber-600" },
  "Drain Blockage": { icon: <FiAlertTriangle />, color: "from-teal-500 to-emerald-600" },
  "Power Failure": { icon: <FiActivity />, color: "from-yellow-500 to-orange-600" },
  "Fire Outbreak": { icon: <FiAlertTriangle />, color: "from-red-500 to-rose-700" },
  Accident: { icon: <FiAlertTriangle />, color: "from-purple-500 to-violet-700" },
  default: { icon: <FiShield />, color: "from-green-500 to-emerald-600" },
};

const severityFromScore = (scoreStr) => {
  const n = parseInt(scoreStr, 10) || 0;
  if (n >= 80) {
    return { label: "High Risk", badge: "bg-red-500/15 text-red-300 border-red-500/20" };
  }
  if (n >= 50) {
    return { label: "Moderate Risk", badge: "bg-orange-500/15 text-orange-300 border-orange-500/20" };
  }
  return { label: "Low Risk", badge: "bg-blue-500/15 text-blue-300 border-blue-500/20" };
};

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

const mapReportFromApi = (r) => {
  const meta = CATEGORY_META[r.category] || CATEGORY_META.default;
  const severity = severityFromScore(r.score);

  return {
    reportId: r.reportId,
    title: r.title,
    location: r.location,
    status: r.status,
    image:
      r.image ||
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    type: r.category || "Community Report",
    confirmations: r.confirmations,
    requiredConfirmations: r.requiredConfirmations || 5,
    time: timeAgo(r.createdAt),
    severity: severity.label,
    icon: meta.icon,
    color: meta.color,
    badge: severity.badge,
    confirmedByMe: r.confirmedByMe,
    confirmers: (r.confirmedBy || []).map((c, i) => ({
      initials: initialsOf(c.name),
      name: c.name,
      avatar: c.avatar,
      bg: AVATAR_COLORS[i % AVATAR_COLORS.length],
    })),
  };
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─────────────────────────────────────────────────────────────────────────
// AVATAR STACK — shows who already confirmed
// ─────────────────────────────────────────────────────────────────────────
const ConfirmerAvatars = ({ confirmers, darkMode }) => {
  if (!confirmers.length) {
    return (
      <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
        Be the first to confirm this
      </span>
    );
  }

  const visible = confirmers.slice(0, 4);
  const extra = confirmers.length - visible.length;

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {visible.map((c, i) => (
          <div
            key={i}
            title={c.name}
            className="relative w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-[10px] font-black text-white shrink-0 overflow-hidden"
            style={{ zIndex: visible.length - i }}
          >
            {c.avatar ? (
              <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${c.bg} flex items-center justify-center`}>
                {c.initials}
              </div>
            )}
          </div>
        ))}

        {extra > 0 && (
          <div
            className={`w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-[9px] font-black shrink-0 ${
              darkMode ? "bg-white/10 text-white" : "bg-gray-100 text-gray-700"
            }`}
            style={{ zIndex: 0 }}
          >
            +{extra}
          </div>
        )}
      </div>

      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        <span className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>
          {confirmers.length} {confirmers.length === 1 ? "person" : "people"}
        </span>{" "}
        already confirmed this
      </span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// CONFIRMATION MODAL — now hits the real /reports/{id}/confirm endpoint
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
        const message =
          err?.response?.data?.message ||
          "Something went wrong verifying that photo. Please try again.";
        setErrorMsg(message);
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
          darkMode ? "bg-[#0C1712] border-white/10" : "bg-white border-gray-200"
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

        <div className="p-6 sm:p-8">
          <p className={`text-xs uppercase tracking-[0.15em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {report.type}
          </p>
          <h3 className={`mt-1 text-lg font-bold leading-snug ${darkMode ? "text-white" : "text-black"}`}>
            {report.title}
          </h3>

          {/* ── STAGE 1: UPLOAD ── */}
          {stage === "upload" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                To confirm this report, upload a photo showing the issue still exists at this
                location. Our AI checks it matches before it counts toward escalation.
              </p>

              <label
                className={`mt-5 flex flex-col items-center justify-center gap-3 border-2 border-dashed h-48 cursor-pointer transition-colors ${
                  darkMode
                    ? "border-white/15 hover:border-green-500/40 bg-white/[0.02]"
                    : "border-gray-300 hover:border-green-400 bg-[#FAFAFA]"
                }`}
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

          {/* ── STAGE 2: VERIFYING ── */}
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
                Checking that this photo genuinely matches this report before it counts.
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

          {/* ── STAGE 3: SUBMITTED ── */}
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
                Thank you. Your photo confirmation has been added to this report. Once enough
                citizens confirm, it will be escalated to the appropriate authority.
              </p>

              <button
                onClick={onClose}
                className="mt-6 w-full h-12 bg-green-500 text-white font-bold hover:bg-green-400 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}

          {/* ── STAGE 4: ERROR / AI MISMATCH ── */}
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

              <h4 className={`mt-5 text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
                Couldn't verify that photo
              </h4>
              <p className={`mt-2 text-sm max-w-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {errorMsg}
              </p>

              <button
                onClick={() => {
                  setStage("upload");
                  setPreview("");
                }}
                className="mt-6 w-full h-12 bg-green-500 text-white font-bold hover:bg-green-400 transition-colors"
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

// ─────────────────────────────────────────────────────────────────────────
// EMPTY STATE — "Community Radar" instead of a flat "no reports" message
// ─────────────────────────────────────────────────────────────────────────
const RadarEmptyState = ({ darkMode, stateName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="flex flex-col items-center justify-center text-center px-6 py-20"
  >
    <div className="relative w-40 h-40 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-green-500/40"
          animate={{ scale: [0.4, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.7 }}
        />
      ))}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
          darkMode ? "bg-white/[0.03] border border-white/10" : "bg-[#F8FAF9] border border-gray-200"
        }`}
        style={{
          background: darkMode
            ? "conic-gradient(from 0deg, rgba(34,197,94,0.25), transparent 60%)"
            : "conic-gradient(from 0deg, rgba(34,197,94,0.18), transparent 60%)",
        }}
      >
        <FiRadio className="text-3xl text-green-500" />
      </motion.div>
    </div>

    <h3 className={`mt-8 text-2xl sm:text-3xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
      All Clear in {stateName}
    </h3>
    <p className={`mt-3 max-w-md text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
      NationAura's community radar isn't picking up any unresolved reports near you right now.
      That's a good sign — but if something's actually wrong nearby, you'd be the first to flag it.
    </p>

    <Link to="/report">
      <motion.button
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mt-8 h-14 px-7 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-[0_20px_60px_rgba(34,197,94,0.35)]"
      >
        <span className="flex items-center justify-center gap-3">
          <FiPlus className="text-lg" />
          Be the First to Report Something
        </span>
      </motion.button>
    </Link>
  </motion.div>
);

const NoStateEmptyState = ({ darkMode, message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="flex flex-col items-center justify-center text-center px-6 py-20"
  >
    <div
      className={`w-20 h-20 flex items-center justify-center rounded-full ${
        darkMode ? "bg-white/[0.03] border border-white/10" : "bg-[#F8FAF9] border border-gray-200"
      }`}
    >
      <FiCompass className="text-3xl text-green-500" />
    </div>
    <h3 className={`mt-6 text-xl sm:text-2xl font-black ${darkMode ? "text-white" : "text-black"}`}>
      We Don't Know Where to Look Yet
    </h3>
    <p className={`mt-3 max-w-md text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
      {message || "Add your state to your profile so NationAura can surface reports near you."}
    </p>
    <Link to="/settings/profile">
      <button className="mt-7 h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
        Set My Location
      </button>
    </Link>
  </motion.div>
);

const ErrorState = ({ darkMode, onRetry }) => (
  <div className="flex flex-col items-center justify-center text-center px-6 py-20">
    <div className="w-16 h-16 flex items-center justify-center bg-red-500/15 text-red-400 text-2xl rounded-full">
      <FiAlertCircle />
    </div>
    <h3 className={`mt-6 text-lg font-bold ${darkMode ? "text-white" : "text-black"}`}>
      Couldn't load nearby reports
    </h3>
    <p className={`mt-2 text-sm max-w-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
      Check your connection and try again.
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

const SkeletonGrid = ({ darkMode }) => (
  <div className="p-5 sm:p-7 lg:p-9 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={`h-[430px] overflow-hidden border animate-pulse ${
          darkMode ? "bg-[#0C1712] border-white/10" : "bg-white border-gray-200"
        }`}
      >
        <div className={`h-[240px] ${darkMode ? "bg-white/[0.04]" : "bg-gray-100"}`} />
        <div className="p-5 sm:p-6 space-y-3">
          <div className={`h-3 w-2/3 ${darkMode ? "bg-white/[0.06]" : "bg-gray-100"}`} />
          <div className={`h-3 w-1/2 ${darkMode ? "bg-white/[0.06]" : "bg-gray-100"}`} />
          <div className={`h-16 w-full ${darkMode ? "bg-white/[0.04]" : "bg-gray-50"}`} />
          <div className={`h-2 w-full ${darkMode ? "bg-white/[0.06]" : "bg-gray-100"}`} />
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────
const DashboardActivity = ({ darkMode }) => {
  const { user } = useAuth();

  const [reports, setReports] = useState([]);
  const [stateName, setStateName] = useState(null);
  const [noStateMessage, setNoStateMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const fetchNearby = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const { data } = await api.get("/reports/nearby");
      setStateName(data.state);
      setNoStateMessage(data.message || "");
      setReports((data.reports || []).map(mapReportFromApi));
    } catch (err) {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  const openConfirmModal = (index) => {
    if (reports[index]?.confirmedByMe) return;
    setActiveModalIndex(index);
  };

  const closeModal = () => setActiveModalIndex(null);

  // Real confirmation — uploads evidence to the AI-verified endpoint,
  // then reflects the actual server response in the card.
  const handleConfirm = useCallback(
    async (index, file) => {
      const target = reports[index];
      const formData = new FormData();
      formData.append("evidence", file);

      const { data } = await api.post(`/reports/${target.reportId}/confirm`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReports((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          confirmations: data.confirmations,
          confirmedByMe: true,
          confirmers: [
            ...updated[index].confirmers,
            {
              initials: initialsOf(user?.name || "You"),
              name: user?.name || "You",
              avatar: user?.avatar || null,
              bg: "from-green-400 to-emerald-600",
            },
          ],
        };
        return updated;
      });
    },
    [reports, user]
  );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className={`relative overflow-hidden border transition-all duration-500 ${
        darkMode ? "bg-[#07110D] border-white/10" : "bg-white border-gray-200"
      }`}
    >
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 right-[-120px] w-[420px] h-[420px] bg-green-500/10 blur-[120px] rounded-full"
      />

      <div className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 p-5 sm:p-7 lg:p-9 border-b ${
            darkMode ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className={`inline-flex items-center gap-3 px-4 py-3 border text-[11px] font-black tracking-[0.22em] uppercase ${
                darkMode
                  ? "bg-white/[0.03] border-white/10 text-green-300"
                  : "bg-[#F8FAF9] border-gray-200 text-green-700"
              }`}
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </div>
              Nearby Community Reports
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`mt-6 text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[0.95] tracking-[-0.08em] font-black ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Help Verify
              <span className="text-green-500"> Real Issues</span> Around You.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.7 }}
              className={`mt-5 max-w-2xl text-sm sm:text-base leading-relaxed ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Citizens near you in{" "}
              <span className="text-green-500 font-bold">{stateName || "your state"}</span> are
              reporting road damage, flooding, broken infrastructure, and emergency risks.
              NationAura waits for community confirmations before escalating verified reports to
              the appropriate government agency for action.
            </motion.p>
          </div>

          {/* ACTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto"
          >
            <Link to="/report">
              <motion.button
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="h-14 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-[0_20px_60px_rgba(34,197,94,0.35)]"
              >
                <span className="flex items-center justify-center gap-3 whitespace-nowrap">
                  <FiPlus className="text-lg" />
                  Report Your Own Issue
                </span>
              </motion.button>
            </Link>

            <Link to="/report-center">
              <motion.button
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`h-14 px-6 border font-semibold ${
                  darkMode ? "bg-white/[0.03] border-white/10 text-white" : "bg-[#F8FAF9] border-gray-200 text-black"
                }`}
              >
                <span className="flex items-center justify-center gap-3 whitespace-nowrap">
                  <FiNavigation />
                  View All Reports Near You
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* BODY: loading / error / no-state / empty / grid */}
        {loading ? (
          <SkeletonGrid darkMode={darkMode} />
        ) : loadError ? (
          <ErrorState darkMode={darkMode} onRetry={fetchNearby} />
        ) : !stateName ? (
          <NoStateEmptyState darkMode={darkMode} message={noStateMessage} />
        ) : reports.length === 0 ? (
          <RadarEmptyState darkMode={darkMode} stateName={stateName} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="p-5 sm:p-7 lg:p-9 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {reports.map((report, index) => {
              const progress = Math.min(
                Math.round((report.confirmations / report.requiredConfirmations) * 100),
                100
              );
              const remaining = Math.max(report.requiredConfirmations - report.confirmations, 0);
              const confirmed = report.confirmedByMe;

              return (
                <motion.div
                  key={report.reportId}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`group relative overflow-hidden border transition-all duration-500 will-change-transform ${
                    darkMode
                      ? "bg-[#0C1712] border-white/10 hover:border-green-500/20"
                      : "bg-white border-gray-200 hover:border-green-300"
                  }`}
                >
                  {/* IMAGE */}
                  <div className="relative h-[240px] overflow-hidden">
                    <motion.img
                      src={report.image}
                      alt={report.title}
                      initial={{ scale: 1.05 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="absolute top-4 left-4"
                    >
                      <div className={`inline-flex items-center gap-2 px-4 py-2 border text-xs font-bold backdrop-blur-xl ${report.badge}`}>
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        {report.severity}
                      </div>
                    </motion.div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.15em] text-white/70">{report.type}</p>
                          <h3 className="mt-2 text-2xl font-black leading-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                            {report.title}
                          </h3>
                        </div>

                        <motion.div
                          whileHover={{ rotate: 6, scale: 1.08 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`w-14 h-14 flex-shrink-0 bg-gradient-to-br ${report.color} text-white flex items-center justify-center text-2xl shadow-[0_15px_40px_rgba(0,0,0,0.3)]`}
                        >
                          {report.icon}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-5 sm:p-6">
                    <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <div className="flex items-center gap-2">
                        <FiMapPin />
                        {report.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock />
                        {report.time}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.25 }}
                      className={`mt-5 p-4 border transition-all duration-500 ${
                        darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#F8FAF9] border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <FiShield className="text-green-500 text-lg mt-1" />
                        <div>
                          <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                            {report.status}
                          </p>
                          <p className={`mt-1 text-sm leading-relaxed ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                            Reports require at least {report.requiredConfirmations} community
                            confirmations before being forwarded to government authorities.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="mt-5">
                      <ConfirmerAvatars confirmers={report.confirmers} darkMode={darkMode} />
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`flex items-center gap-2 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <FiUsers />
                          Community Confirmations
                        </div>
                        <motion.span
                          key={report.confirmations}
                          initial={{ scale: 1.3, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 250 }}
                          className="text-green-500 font-bold text-sm"
                        >
                          {report.confirmations}/{report.requiredConfirmations}
                        </motion.span>
                      </div>

                      <div className={`relative h-2 overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2 }}
                          className="h-full bg-green-500 relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ x: ["-100%", "250%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-12"
                          />
                        </motion.div>
                      </div>

                      <p className={`text-[11px] mt-1.5 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        {remaining > 0
                          ? `${remaining} more confirmation${remaining === 1 ? "" : "s"} needed before submission`
                          : "Ready for government submission"}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        <FiCamera className="text-green-500" />
                        AI image analysis active
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>

                      <motion.button
                        whileHover={confirmed ? {} : { scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => openConfirmModal(index)}
                        disabled={confirmed}
                        className={`h-12 px-5 text-sm font-bold transition-all duration-300 ${
                          confirmed
                            ? "bg-emerald-600 text-white cursor-default"
                            : "bg-green-500 text-white shadow-[0_12px_30px_rgba(34,197,94,0.35)]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {confirmed ? (
                            <>
                              <FiThumbsUp />
                              Confirmed
                            </>
                          ) : (
                            <>
                              Confirm
                              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                                <FiArrowUpRight />
                              </motion.div>
                            </>
                          )}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeModalIndex !== null && (
          <ConfirmationModal
            report={reports[activeModalIndex]}
            darkMode={darkMode}
            onClose={closeModal}
            onConfirm={(file) => handleConfirm(activeModalIndex, file)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default DashboardActivity;