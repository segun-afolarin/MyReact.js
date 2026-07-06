import { useState, useEffect, useRef } from "react";
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
  FiUploadCloud,
  FiX,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

import { getMyReports, getConfirmedReports, getNearbyReports, confirmReport } from "../../utils/api";

const REQUIRED_CONFIRMATIONS = 5;

// ─── Avatar stack for community confirmers ────────────────────────────────────
const ConfirmerAvatars = ({ confirmers, darkMode }) => {
  const visible = confirmers.slice(0, 4);
  const extra   = confirmers.length - visible.length;

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
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                {(c.name || "?").slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
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

// ─── Evidence upload panel shown when confirming a nearby report ─────────────
const EvidenceUploadPanel = ({ darkMode, onSubmit, onCancel, submitting }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <div className={`mt-4 border p-5 ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#FAFAFA] border-gray-200"}`}>
        <h5 className={`text-xs font-black uppercase tracking-[0.15em] mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-black"}`}>
          <FiCamera />
          Upload Photo Evidence
        </h5>

        {!preview ? (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
            className={`
              flex flex-col items-center justify-center gap-3 border-2 border-dashed py-10 cursor-pointer
              ${darkMode ? "border-white/15 text-gray-400" : "border-gray-300 text-gray-500"}
            `}
          >
            <FiUploadCloud size={26} className="text-green-500" />
            <p className="text-sm font-semibold">Click to upload or drag a photo here</p>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative w-full sm:w-40 h-32 shrink-0 overflow-hidden border border-green-500/40">
              <img src={preview} alt="Evidence preview" className="w-full h-full object-cover" />
              <button onClick={() => { setPreview(null); setFile(null); }} className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center bg-black/70 text-white">
                <FiX size={13} />
              </button>
            </div>
            <p className={`text-sm font-bold ${darkMode ? "text-white" : "text-black"}`}>{file?.name}</p>
          </div>
        )}

        <div className="mt-5 flex items-center gap-3">
          <button
            disabled={!file || submitting}
            onClick={() => onSubmit(file)}
            className={`
              inline-flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-[0.15em]
              ${file && !submitting ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
            `}
          >
            {submitting ? <FiLoader className="animate-spin" /> : <FiCheckCircle />}
            {submitting ? "Submitting..." : "Submit Confirmation"}
          </button>
          <button onClick={onCancel} className={`px-5 py-3 text-xs font-black uppercase tracking-[0.15em] border ${darkMode ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"}`}>
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
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

// ─── Main component ───────────────────────────────────────────────────────────
const ReportGrid = ({ darkMode, search = "", filter = "All" }) => {
  const [myReports, setMyReports] = useState([]);
  const [confirmedReports, setConfirmedReports] = useState([]);
  const [nearbyReports, setNearbyReports] = useState([]);
  const [nearbyState, setNearbyState] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeUploadId, setActiveUploadId] = useState(null);
  const [confirmingSubmitting, setConfirmingSubmitting] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [mineRes, confirmedRes, nearbyRes] = await Promise.all([
        getMyReports(),
        getConfirmedReports(),
        getNearbyReports(),
      ]);
      setMyReports(mineRes.reports || []);
      setConfirmedReports(confirmedRes.reports || []);
      setNearbyReports(nearbyRes.reports || []);
      setNearbyState(nearbyRes.state || null);
    } catch (e) {
      setError(e.message || "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ── Confirm-with-evidence for a nearby report ─────────────────────────────
  const handleSubmitConfirmation = async (reportId, file) => {
    setConfirmingSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("evidence", file);
      await confirmReport(reportId, formData);
      setActiveUploadId(null);
      // Refresh so counts, "confirmed by me" state, and the new
      // "Reports I Confirmed" entry all reflect the server truth
      await loadAll();
    } catch (e) {
      setError(e.message || "Failed to submit confirmation.");
    } finally {
      setConfirmingSubmitting(false);
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
  const filteredNearby    = nearbyReports.filter((r) => matchesSearch(r) && matchesFilter(r));

  const noResults = !loading && filteredMine.length === 0 && filteredConfirmed.length === 0 && filteredNearby.length === 0;

  // ── Report card renderer ────────────────────────────────────────────────
  // mode: "mine" | "confirmed" | "nearby"
  const renderCard = (report, index, mode) => {
    const required   = report.requiredConfirmations || REQUIRED_CONFIRMATIONS;
    const remaining  = required - (report.confirmations || 0);
    const progress   = mode === "confirmed" ? 100 : Math.round(((report.confirmations || 0) / required) * 100);
    const isUploadOpen = activeUploadId === report.reportId;

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

            {(mode === "confirmed" || report.confirmedByMe) && (
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

                {(mode === "confirmed" || mode === "nearby") && report.submittedBy && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border-2 border-green-500 overflow-hidden flex items-center justify-center text-white text-[9px] font-black shrink-0">
                      {report.submittedBy.avatar ? (
                        <img src={report.submittedBy.avatar} alt={report.submittedBy.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          {(report.submittedBy.name || "?").slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Reported by <span className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>{report.submittedBy.name}</span>
                    </span>
                  </div>
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

            {(mode === "mine" || mode === "nearby") && report.confirmedBy?.length > 0 && (
              <div className="mt-7">
                <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${darkMode ? "text-white" : "text-black"}`}>Community Support</h4>
                <ConfirmerAvatars confirmers={report.confirmedBy} darkMode={darkMode} />
              </div>
            )}

            {(mode === "mine" || mode === "nearby") && (
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

                {/* Confirm-with-evidence action, only on the nearby feed */}
                {mode === "nearby" && !report.confirmedByMe && (
                  <div className="mt-4">
                    {!isUploadOpen && (
                      <button
                        onClick={() => setActiveUploadId(report.reportId)}
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-[0.15em] bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        <FiCamera />
                        Confirm This Report
                      </button>
                    )}
                    <AnimatePresence>
                      {isUploadOpen && (
                        <EvidenceUploadPanel
                          darkMode={darkMode}
                          submitting={confirmingSubmitting}
                          onCancel={() => setActiveUploadId(null)}
                          onSubmit={(file) => handleSubmitConfirmation(report.reportId, file)}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                )}
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

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <FiClock />
                {report.date}
              </div>
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

      {!loading && !error && filteredConfirmed.length > 0 && (
        <div>
          {sectionHeader("Reports I Confirmed", filteredConfirmed.length)}
          <div className="space-y-5">{filteredConfirmed.map((r, i) => renderCard(r, i, "confirmed"))}</div>
        </div>
      )}

      {!loading && !error && (
        <div>
          {sectionHeader(nearbyState ? `Reports Near You — ${nearbyState}` : "Reports Near You", filteredNearby.length)}
          {filteredNearby.length > 0 ? (
            <div className="space-y-5">{filteredNearby.map((r, i) => renderCard(r, i, "nearby"))}</div>
          ) : (
            <StateBlock
              darkMode={darkMode}
              icon={FiMapPin}
              title="No reports near you yet"
              subtitle={nearbyState ? `No open reports in ${nearbyState} right now.` : "Add your state in your profile to see local reports."}
            />
          )}
        </div>
      )}

    </div>
  );
};

export default ReportGrid;