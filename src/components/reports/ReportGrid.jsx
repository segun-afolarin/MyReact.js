import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiImage,
  FiTrendingUp,
  FiThumbsUp,
  FiCamera,
  FiAlertCircle,
  FiLoader,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import { getMyReports, getConfirmedReports, deleteReport } from "../../utils/api";

const REQUIRED_CONFIRMATIONS = 5;

// ─── Helpers ───────────────────────────────────────────────────────────────
const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";

// ─── Avatar with graceful fallback ─────────────────────────────────────────
// Falls back to initials both when `avatar` is missing AND when the image
// URL fails to load (broken/expired path, deleted storage file, etc.)
const Avatar = ({ name, avatar, className = "", style }) => {
  const [broken, setBroken] = useState(false);
  const showImage = !!avatar && !broken;

  return (
    <div className={`flex items-center justify-center overflow-hidden shrink-0 ${className}`} style={style}>
      {showImage ? (
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-[10px] font-black">
          {initialsOf(name)}
        </div>
      )}
    </div>
  );
};

// ─── Avatar stack for community confirmers ────────────────────────────────────
const ConfirmerAvatars = ({ confirmers, darkMode }) => {
  const visible = confirmers.slice(0, 4);
  const extra   = confirmers.length - visible.length;

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {visible.map((c, i) => (
          <Avatar
            key={i}
            name={c.name}
            avatar={c.avatar}
            className="relative w-8 h-8 rounded-full border-2 border-green-500"
            style={{ zIndex: visible.length - i }}
          />
        ))}

        {extra > 0 && (
          <div
            className={`
              w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center
              text-[9px] font-black shrink-0
              ${darkMode ? "bg-white/10 text-white" : "bg-gray-100 text-gray-700"}
            `}
            style={{ zIndex: 0 }}
          >
            +{extra}
          </div>
        )}
      </div>

      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        confirmed this
      </span>
    </div>
  );
};

// ─── Submitted-by badge ("Reports I Confirmed" section) ───────────────────────
const SubmittedBy = ({ submitter, darkMode }) => {
  if (!submitter) return null;

  return (
    <div className="mt-3 flex items-center gap-2">
      <Avatar
        name={submitter.name}
        avatar={submitter.avatar}
        className="w-7 h-7 rounded-full border-2 border-green-500"
      />
      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        Reported by <span className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>{submitter.name}</span>
      </span>
    </div>
  );
};

// ─── Loading / error / empty helpers ───────────────────────────────────────────
const StateBlock = ({ darkMode, icon: Icon, title, subtitle }) => (
  <div className={`border p-10 text-center ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}`}>
    <Icon className="mx-auto text-green-500" size={22} />
    <p className={`mt-3 text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>{title}</p>
    {subtitle && <p className={`mt-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{subtitle}</p>}
  </div>
);

// ─── Delete confirmation card (replaces window.confirm) ──────────────────────
const DeleteConfirmCard = ({ report, darkMode, onCancel, onConfirm, isDeleting }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    onClick={(e) => e.target === e.currentTarget && !isDeleting && onCancel()}
  >
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={`w-full max-w-sm border p-6 sm:p-7 ${darkMode ? "bg-[#09131B] border-white/10" : "bg-white border-gray-200"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${darkMode ? "bg-red-500/10 border-red-500/20" : "bg-red-50 border-red-200"}`}>
          <FiTrash2 className="text-red-500" size={18} />
        </div>
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className={`p-1.5 ${darkMode ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-black"} transition-colors disabled:opacity-40`}
        >
          <FiX size={18} />
        </button>
      </div>

      <h3 className={`mt-4 text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
        Delete report?
      </h3>
      <p className={`mt-2 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Are you sure you want to delete{" "}
        <span className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>"{report?.title}"</span>?
        This cannot be undone.
      </p>

      <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className={`
            flex-1 py-3 text-xs font-black uppercase tracking-[0.15em] border transition-colors
            ${darkMode ? "border-white/10 text-gray-300 hover:bg-white/[0.05]" : "border-gray-200 text-gray-700 hover:bg-gray-50"}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          No, keep it
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className={`
            flex-1 py-3 text-xs font-black uppercase tracking-[0.15em] text-white transition-colors
            bg-red-500 hover:bg-red-600
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          `}
        >
          {isDeleting ? (
            <>
              <FiLoader className="animate-spin" size={13} />
              Deleting...
            </>
          ) : (
            "Yes, delete"
          )}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Main component ───────────────────────────────────────────────────────────
// This grid shows only "My Reports" and "Reports I Confirmed" — no nearby feed.
const ReportGrid = ({ darkMode, search = "", filter = "All" }) => {
  const [myReports, setMyReports] = useState([]);
  const [confirmedReports, setConfirmedReports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tracks which report is currently being deleted, to show a per-card loading state
  const [deletingId, setDeletingId] = useState(null);

  // Report pending the "are you sure?" confirmation card
  const [confirmTarget, setConfirmTarget] = useState(null); // { reportId, title } | null

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [mineRes, confirmedRes] = await Promise.all([
        getMyReports(),
        getConfirmedReports(),
      ]);
      setMyReports(mineRes.reports || []);
      setConfirmedReports(confirmedRes.reports || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ── Open the confirmation card for a pending report ─────────────────────
  const handleDeleteReport = (reportId, reportTitle) => {
    setConfirmTarget({ reportId, title: reportTitle });
  };

  const cancelDelete = () => {
    if (deletingId) return; // ignore while a delete is in flight
    setConfirmTarget(null);
  };

  const confirmDelete = async () => {
    if (!confirmTarget) return;
    const { reportId } = confirmTarget;

    setDeletingId(reportId);
    try {
      await deleteReport(reportId);
      await loadAll();
      setConfirmTarget(null);
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Failed to delete report.");
      setConfirmTarget(null);
    } finally {
      setDeletingId(null);
    }
  };

  // ── Search + filter ─────────────────────────────────────────────────────
  const matchesSearch = (r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      (r.id || "").toLowerCase().includes(q)          ||
      r.title.toLowerCase().includes(q)                ||
      r.location.toLowerCase().includes(q)             ||
      r.description.toLowerCase().includes(q)          ||
      r.status.toLowerCase().includes(q)                ||
      (r.fields || []).some((f) => f.toLowerCase().includes(q))
    );
  };

  const matchesFilter = (r) => (filter === "All" ? true : r.status === filter);

  const filteredMine      = myReports.filter((r) => matchesSearch(r) && matchesFilter(r));
  const filteredConfirmed = confirmedReports.filter((r) => matchesSearch(r) && matchesFilter(r));

  const noResults = !loading && filteredMine.length === 0 && filteredConfirmed.length === 0;

  // ── Report card renderer ────────────────────────────────────────────────
  // mode: "mine" | "confirmed"
  const renderCard = (report, index, mode) => {
    const required   = report.requiredConfirmations || REQUIRED_CONFIRMATIONS;
    const remaining  = required - (report.confirmations || 0);
    const progress   = mode === "confirmed" ? 100 : Math.round(((report.confirmations || 0) / required) * 100);
    const canDelete  = mode === "mine" && report.status === "Pending";
    const isDeleting = deletingId === report.reportId;

    return (
      <motion.div
        key={report.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className={`group border overflow-hidden transition-all duration-300 ${darkMode ? "bg-[#09131B] border-white/10" : "bg-white border-gray-200"}`}
      >
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr]">

          {/* IMAGE */}
          <div className="relative h-[260px] xl:h-full overflow-hidden">
            <img src={report.image} alt={report.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {mode === "confirmed" && (
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.15em]">
                <FiThumbsUp size={11} />
                You Confirmed
              </div>
            )}

            <div className="absolute bottom-0 left-0 p-5 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 text-white text-[10px] font-black uppercase tracking-[0.18em] mb-4">
                <FiImage />
                {report.id}
              </div>
              <h3 className="text-white text-2xl font-black leading-tight">{report.title}</h3>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5 sm:p-7">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] border ${darkMode ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-green-50 border-green-200 text-green-700"}`}>
                    <FiCheckCircle />
                    {report.status}
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <FiMapPin />
                    {report.location}
                  </div>
                </div>

                {mode === "confirmed" && (
                  <SubmittedBy submitter={report.submittedBy} darkMode={darkMode} />
                )}

                <p className={`mt-5 max-w-2xl text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{report.description}</p>
              </div>

              <div className={`border p-4 min-w-[180px] ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#FAFAFA] border-gray-200"}`}>
                <p className={`text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <FiTrendingUp />
                  AI Priority
                </p>
                <h4 className="mt-3 text-4xl font-black text-green-600">{report.score}</h4>
                <p className="mt-2 text-green-500 text-sm font-semibold">Confidence Score</p>
              </div>
            </div>

            <div className="mt-7">
              <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${darkMode ? "text-white" : "text-black"}`}>Report Details</h4>
              <div className="flex flex-wrap gap-3">
                {report.fields.map((field, i) => (
                  <div key={i} className={`px-4 py-3 border text-sm font-medium ${darkMode ? "bg-white/[0.03] border-white/10 text-gray-300" : "bg-[#FAFAFA] border-gray-200 text-gray-700"}`}>
                    {field}
                  </div>
                ))}
              </div>
            </div>

            {mode === "mine" && report.confirmedBy?.length > 0 && (
              <div className="mt-7">
                <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${darkMode ? "text-white" : "text-black"}`}>Community Support</h4>
                <ConfirmerAvatars confirmers={report.confirmedBy} darkMode={darkMode} />
              </div>
            )}

            {mode === "mine" && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <FiUsers />
                    Citizen Confirmations
                  </div>
                  <span className="text-green-500 font-bold text-sm">{report.confirmations || 0}/{required}</span>
                </div>

                <div className={`relative h-3 overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.2 }} className="h-full bg-green-500 relative overflow-hidden">
                    <motion.div animate={{ x: ["-100%", "250%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-12" />
                  </motion.div>
                </div>

                <p className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                  {remaining > 0 ? `${remaining} more confirmations needed before submission to government` : "Ready for government submission"}
                </p>
              </div>
            )}

            {mode === "confirmed" && (
              <div className="mt-8">
                <div className={`inline-flex items-center gap-3 px-4 py-3 border ${darkMode ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
                  <FiThumbsUp size={14} />
                  <span className="text-xs font-black uppercase tracking-[0.15em]">You confirmed this on {report.confirmedOn}</span>
                </div>

                {report.myEvidence && (
                  <div className="mt-5">
                    <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-black"}`}>
                      <FiCamera />
                      Evidence You Uploaded
                    </h4>
                    <div className="w-full sm:w-56 h-36 overflow-hidden border border-green-500/40">
                      <img src={report.myEvidence} alt={`Evidence you uploaded for ${report.title}`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8">
              <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${darkMode ? "text-white" : "text-black"}`}>Progress Timeline</h4>
              <div className="flex flex-wrap gap-3">
                {report.updates.map((u, i) => (
                  <div key={i} className={`flex items-center gap-2 px-4 py-3 border text-sm font-medium ${darkMode ? "bg-white/[0.03] border-white/10 text-gray-300" : "bg-[#FAFAFA] border-gray-200 text-gray-700"}`}>
                    <div className="w-2 h-2 bg-green-500" />
                    {u}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <FiClock />
                {report.date}
              </div>

              {/* Delete button — only for pending reports the user owns */}
              {canDelete && (
                <button
                  onClick={() => handleDeleteReport(report.reportId, report.title)}
                  disabled={isDeleting}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-[0.15em]
                    border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors
                    ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {isDeleting ? (
                    <>
                      <FiLoader className="animate-spin" size={13} />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FiTrash2 size={13} />
                      Delete Report
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      </motion.div>
    );
  };

  const sectionHeader = (label, count) => (
    <div className="flex items-center gap-3 mb-5">
      <h2 className={`text-sm font-black uppercase tracking-[0.18em] ${darkMode ? "text-white" : "text-black"}`}>{label}</h2>
      <div className={`h-px flex-1 ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />
      <span className={`text-xs font-bold px-3 py-1 border ${darkMode ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"}`}>{count}</span>
    </div>
  );

  return (
    <div className="space-y-10 mt-6">

      {loading && <StateBlock darkMode={darkMode} icon={FiLoader} title="Loading reports..." />}

      {!loading && error && (
        <StateBlock darkMode={darkMode} icon={FiAlertCircle} title="Couldn't load reports" subtitle={error} />
      )}

      {!loading && !error && noResults && (
        <StateBlock darkMode={darkMode} icon={FiAlertCircle} title="No reports found" subtitle="Try a different search term or filter." />
      )}

      {!loading && !error && filteredMine.length > 0 && (
        <div>
          {sectionHeader("My Reports", filteredMine.length)}
          <div className="space-y-5">{filteredMine.map((r, i) => renderCard(r, i, "mine"))}</div>
        </div>
      )}

      {/* "Reports I Confirmed" always renders — shows an empty-state message
          instead of disappearing when the user hasn't confirmed anything yet */}
      {!loading && !error && (
        <div>
          {sectionHeader("Reports I Confirmed", filteredConfirmed.length)}
          {filteredConfirmed.length > 0 ? (
            <div className="space-y-5">{filteredConfirmed.map((r, i) => renderCard(r, i, "confirmed"))}</div>
          ) : (
            <StateBlock
              darkMode={darkMode}
              icon={FiThumbsUp}
              title="No confirmed reports in your history yet"
              subtitle="Reports you confirm for other citizens will appear here with your uploaded evidence."
            />
          )}
        </div>
      )}

      {/* Delete confirmation card — replaces window.confirm */}
      <AnimatePresence>
        {confirmTarget && (
          <DeleteConfirmCard
            report={confirmTarget}
            darkMode={darkMode}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
            isDeleting={!!deletingId}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default ReportGrid;