import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiClock, FiMapPin, FiCheckCircle, FiUsers, FiTrendingUp,
  FiImage, FiSearch, FiFilter, FiX, FiChevronDown, FiShield,
  FiArrowUpRight, FiActivity, FiAlertCircle, FiLock,
  FiFileText, FiCamera, FiMic, FiZap, FiExternalLink,
} from "react-icons/fi";

// ───────────────── REPORTS ─────────────────
const reports = [
  {
    id: "NR-2041",
    title: "Collapsed Road Section",
    location: "Sabon Gari, Kano",
    status: "Awaiting Community Verification",
    confirmations: 3,
    required: 5,
    progress: 60,
    resolved: false,
    assigned: false,
    date: "Submitted 2 hours ago",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    description: "Large potholes and damaged road surface causing traffic delays and accidents during rainfall. The road has been deteriorating for the past 3 months with multiple reports of vehicle damage.",
    fields: ["Road Damage", "High Priority", "Photo Evidence Uploaded", "AI Location Detected"],
    department: "Pending Community Verification",
    aiStatus: "AI VERIFIED",
    evidence: 4,
    activity: "Waiting for more citizen confirmations",
  },
  {
    id: "NR-1982",
    title: "Blocked Drainage System",
    location: "Nassarawa, Kano",
    status: "Community Review Active",
    confirmations: 4,
    required: 5,
    progress: 80,
    resolved: false,
    assigned: false,
    date: "Submitted Yesterday",
    image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=1200&auto=format&fit=crop",
    description: "Drainage filled with waste materials causing water overflow and environmental hazards. Residential areas nearby are affected during heavy rains with standing water lasting 2–3 days.",
    fields: ["Flood Risk", "Drain Blockage", "Voice Note Attached", "Emergency Flag Enabled"],
    department: "Pending Verification Completion",
    aiStatus: "HIGH PRIORITY",
    evidence: 8,
    activity: "Citizens actively verifying",
  },
  {
    id: "NR-3901",
    title: "Broken Street Lights",
    location: "Jos, Plateau",
    status: "Verification In Progress",
    confirmations: 2,
    required: 5,
    progress: 40,
    resolved: false,
    assigned: false,
    date: "30 minutes ago",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
    description: "Multiple street lights no longer functioning causing security concerns at night. Residents have reported increased incidents of petty crime in the affected stretch of road.",
    fields: ["Public Safety", "Night Visibility", "Community Alert", "Photo Evidence Uploaded"],
    department: "Verification Queue",
    aiStatus: "LIVE REVIEW",
    evidence: 3,
    activity: "Inspection ongoing",
  },
  {
    id: "NR-6612",
    title: "Bridge Surface Damage",
    location: "Maiduguri",
    status: "Government Assigned",
    confirmations: 5,
    required: 5,
    progress: 100,
    resolved: false,
    assigned: true,
    date: "Today",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop",
    description: "Deep cracks forming across bridge surface used daily by commercial vehicles. Structural engineers have flagged the bridge as a potential safety hazard requiring urgent repair work.",
    fields: ["Bridge Damage", "Structural Concern", "Heavy Traffic Zone", "AI Risk Analysis Complete"],
    department: "Federal Roads Maintenance",
    aiStatus: "CONFIRMED",
    evidence: 10,
    activity: "Government team assigned",
  },
  {
    id: "NR-7102",
    title: "Flooded School Entrance",
    location: "Ibadan",
    status: "Resolved",
    confirmations: 5,
    required: 5,
    progress: 100,
    resolved: true,
    assigned: true,
    date: "Resolved Today",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    description: "School entrance flooded after rainfall making access difficult for students. Emergency drainage improvements were completed by the response team within 48 hours of assignment.",
    fields: ["Flood Risk", "School Access Blocked", "Citizen Reported", "Photo Evidence Uploaded"],
    department: "Emergency Response Agency",
    aiStatus: "RESOLVED",
    evidence: 6,
    activity: "Issue fully resolved by authorities",
  },
];

const STATUS_STYLES = {
  "Awaiting Community Verification": "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  "Community Review Active":         "bg-blue-500/10 border-blue-500/20 text-blue-400",
  "Verification In Progress":        "bg-purple-500/10 border-purple-500/20 text-purple-400",
  "Government Assigned":             "bg-green-500/10 border-green-500/20 text-green-400",
  "Resolved":                        "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
};

const ALL_STATUS = ["All", ...Array.from(new Set(reports.map((r) => r.status)))];

// ───────────────── FILTER DROPDOWN ─────────────────
const FilterDropdown = ({ label, value, options, onChange, darkMode }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, []);

  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`
          w-full sm:w-auto min-h-[48px] px-4 border
          flex items-center justify-between gap-3
          text-[10px] uppercase tracking-[0.15em] font-black
          transition-all duration-300
          ${darkMode
            ? "bg-[#08121A] border-white/10 text-white hover:border-green-500/30"
            : "bg-white border-gray-200 text-black hover:border-green-300"}
        `}
      >
        <span>{label}: {value}</span>
        <FiChevronDown size={13} className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={`
              absolute top-full left-0 mt-2
              w-full sm:min-w-[220px]
              border z-[110] overflow-hidden shadow-2xl
              ${darkMode ? "bg-[#08121A] border-white/10" : "bg-white border-gray-200"}
            `}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => { onChange(option); setOpen(false); }}
                className={`
                  w-full text-left px-4 py-3 text-xs font-semibold transition-all duration-200
                  ${value === option
                    ? "bg-green-500/10 text-green-500"
                    : darkMode ? "text-gray-300 hover:bg-white/5" : "text-gray-700 hover:bg-gray-50"}
                `}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ───────────────── DETAIL MODAL ─────────────────
const DetailModal = ({ report, darkMode, onClose }) => {
  const overlayRef = useRef(null);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const evidenceTypes = [
    { icon: FiCamera,   label: "Photos",  count: Math.ceil(report.evidence * 0.5) },
    { icon: FiMic,      label: "Audio",   count: Math.floor(report.evidence * 0.2) },
    { icon: FiFileText, label: "Reports", count: Math.floor(report.evidence * 0.3) },
  ];

  const timeline = report.resolved
    ? [
        { label: "Report Submitted",    done: true,  time: report.date.replace("Resolved ", "") },
        { label: "AI Verification",     done: true,  time: "Within 10 minutes" },
        { label: "Community Confirmed", done: true,  time: "5/5 confirmations" },
        { label: "Government Assigned", done: true,  time: report.department },
        { label: "Issue Resolved",      done: true,  time: "Successfully closed" },
      ]
    : report.assigned
    ? [
        { label: "Report Submitted",    done: true,  time: report.date },
        { label: "AI Verification",     done: true,  time: "Within 10 minutes" },
        { label: "Community Confirmed", done: true,  time: "5/5 confirmations" },
        { label: "Government Assigned", done: true,  time: report.department },
        { label: "Resolution Pending",  done: false, time: "Awaiting action" },
      ]
    : [
        { label: "Report Submitted",       done: true,  time: report.date },
        { label: "AI Verification",        done: report.aiStatus !== "LIVE REVIEW", time: "Within 10 minutes" },
        { label: "Community Confirmation", done: false, time: `${report.confirmations}/${report.required} so far` },
        { label: "Government Assignment",  done: false, time: "Unlocks at 5 confirmations" },
        { label: "Resolution",             done: false, time: "Pending prior steps" },
      ];

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      style={{ background: "rgba(2,8,14,0.9)", backdropFilter: "blur(12px)" }}
    >
      <motion.div
        // Mobile: slides up from bottom. Desktop: scales in from center.
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 36 }}
        // On sm+ override to scale animation via CSS — we handle with variants below
        onClick={(e) => e.stopPropagation()}
        className={`
          relative flex flex-col overflow-hidden
          /* Mobile: full width, anchored to bottom, tall sheet */
          w-full rounded-t-2xl
          h-[92dvh]
          /* Tablet+: floating centered card */
          sm:rounded-none sm:h-auto sm:max-h-[88vh]
          sm:w-[92vw] md:w-[82vw] lg:w-[74vw] xl:w-[66vw]
          sm:max-w-[1060px]
          border shadow-[0_-8px_60px_rgba(0,0,0,0.5)] sm:shadow-[0_40px_120px_rgba(0,0,0,0.55)]
          ${darkMode ? "bg-[#06101A] border-white/10" : "bg-white border-gray-200"}
        `}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-700 via-green-400 to-green-700 z-20" />

        {/* Mobile drag handle */}
        <div className="sm:hidden absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/20 rounded-full z-20" />

        {/* ── HERO IMAGE ── */}
        <div className="relative h-36 sm:h-52 lg:h-64 flex-shrink-0 overflow-hidden">
          <img
            src={report.image}
            alt={report.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 bg-black/60 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center transition-all duration-200 hover:bg-red-600/80 z-10 rounded-sm"
          >
            <FiX size={14} />
          </button>

          {/* AI badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-green-500 text-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] z-10">
            {report.aiStatus}
          </div>

          {/* Title block */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-7 z-10">
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 border text-[9px] font-black uppercase tracking-[0.1em] mb-1.5 ${STATUS_STYLES[report.status]}`}>
              <FiCheckCircle size={10} />
              <span className="truncate max-w-[160px] sm:max-w-xs">{report.status}</span>
            </div>
            <h2 className="text-white text-base sm:text-2xl lg:text-3xl font-black leading-tight line-clamp-2">
              {report.title}
            </h2>
            <div className="mt-1.5 flex flex-wrap gap-2 sm:gap-4">
              <span className="flex items-center gap-1 text-white/80 text-[11px] sm:text-sm">
                <FiMapPin size={11} />{report.location}
              </span>
              <span className="flex items-center gap-1 text-white/60 text-[11px] sm:text-sm">
                <FiClock size={11} />{report.date}
              </span>
              <span className="flex items-center gap-1 text-[11px] sm:text-sm">
                <span className="text-gray-400 font-black">ID:</span>
                <span className="text-green-400 font-black">{report.id}</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/*
            Layout:
            - Mobile (default): single column, stacked
            - lg+: two columns [main | sidebar]
            Sidebar moves BELOW main on mobile — no more cramped side-by-side
          */}
          <div className="p-3 sm:p-5 lg:p-7 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-5 lg:gap-7">

            {/* ── LEFT / MAIN ── */}
            <div className="space-y-5 min-w-0">

              {/* Description */}
              <div>
                <p className={`text-[9px] uppercase tracking-[0.22em] font-black mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Report Description
                </p>
                <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {report.description}
                </p>
              </div>

              {/* Assignment callout */}
              <div className={`border-l-[3px] p-3 sm:p-4 ${
                report.assigned
                  ? darkMode ? "bg-green-500/10 border-green-500" : "bg-green-50 border-green-500"
                  : darkMode ? "bg-yellow-500/10 border-yellow-500" : "bg-yellow-50 border-yellow-500"
              }`}>
                <div className="flex items-start gap-2.5">
                  <div className={`w-9 h-9 flex items-center justify-center border flex-shrink-0 ${
                    report.assigned
                      ? "border-green-500/30 bg-green-500/10 text-green-500"
                      : "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {report.assigned ? <FiShield size={15} /> : <FiLock size={15} />}
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-[11px] sm:text-xs font-black uppercase tracking-[0.06em] leading-snug ${report.assigned ? "text-green-500" : "text-yellow-500"}`}>
                      {report.assigned ? "Government Department Assigned" : "Awaiting Community Confirmation"}
                    </h4>
                    <p className={`mt-1 text-[11px] sm:text-xs leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {report.assigned
                        ? `Assigned to ${report.department} for inspection and response.`
                        : "Cannot be assigned until citizens complete required confirmations."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className={`text-[9px] uppercase tracking-[0.22em] font-black mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Report Details
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {report.fields.map((field, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className={`px-2.5 py-1.5 border text-[11px] sm:text-xs font-medium hover:border-green-500/40 transition-all duration-300 ${
                        darkMode ? "bg-white/[0.03] border-white/10 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"
                      }`}
                    >
                      {field}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              {!report.resolved && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`flex items-center gap-1.5 text-[11px] sm:text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      <FiUsers size={12} /> Verification Progress
                    </div>
                    <span className="text-green-500 font-black text-[11px] sm:text-xs">
                      {report.confirmations}/{report.required}
                    </span>
                  </div>
                  <div className={`relative h-2 overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${report.progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-green-500 relative overflow-hidden"
                    >
                      <motion.div
                        animate={{ x: ["-100%", "250%"] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-12 h-full bg-white/30 skew-x-12"
                      />
                    </motion.div>
                  </div>
                  <p className={`mt-1 text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {report.required - report.confirmations} more confirmation{report.required - report.confirmations !== 1 ? "s" : ""} needed
                  </p>
                </div>
              )}

              {/* Evidence — 3 columns on all sizes, compact on mobile */}
              <div>
                <p className={`text-[9px] uppercase tracking-[0.22em] font-black mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Evidence Submitted
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {evidenceTypes.map(({ icon: Icon, label, count }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.06 }}
                      className={`border p-2.5 sm:p-3.5 text-center hover:border-green-500/30 transition-all duration-300 ${
                        darkMode ? "bg-white/[0.03] border-white/10" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <Icon size={16} className="text-green-500 mx-auto mb-1" />
                      <p className={`text-base sm:text-xl font-black ${darkMode ? "text-white" : "text-black"}`}>{count}</p>
                      <p className={`text-[9px] uppercase tracking-[0.08em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT / SIDEBAR ──
                On mobile this renders BELOW the main column naturally.
                On lg+ it becomes a fixed-width right sidebar.
            */}
            <div className="space-y-3">

              {/* Stat box */}
              <div className={`border p-4 relative overflow-hidden ${
                report.resolved
                  ? darkMode ? "bg-green-500/10 border-green-500/20" : "bg-green-50 border-green-200"
                  : darkMode ? "bg-white/[0.03] border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 blur-2xl pointer-events-none" />
                {report.resolved ? (
                  <>
                    <div className="flex items-center gap-2 text-green-500 mb-2">
                      <FiCheckCircle size={13} />
                      <span className="text-[9px] font-black uppercase tracking-[0.14em]">Issue Resolved</span>
                    </div>
                    <h4 className="text-4xl sm:text-5xl font-black text-green-500">100%</h4>
                    <p className={`mt-2 text-[11px] sm:text-xs ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Successfully resolved by authorities.
                    </p>
                  </>
                ) : (
                  <>
                    <p className={`text-[9px] uppercase tracking-[0.18em] mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      Community Support
                    </p>
                    <h4 className={`text-4xl sm:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
                      {report.confirmations}
                    </h4>
                    <p className="mt-1 text-green-500 text-[11px] sm:text-xs font-semibold">/ {report.required} Needed</p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-yellow-500 text-[11px] sm:text-xs">
                      <FiAlertCircle size={12} /> Awaiting validation
                    </div>
                  </>
                )}
              </div>

              {/* Activity */}
              <div className={`border p-3 ${darkMode ? "bg-white/[0.02] border-white/10" : "bg-gray-50 border-gray-200"}`}>
                <p className={`text-[9px] uppercase tracking-[0.18em] mb-1.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Current Activity
                </p>
                <div className={`flex items-center gap-2 text-[11px] sm:text-xs font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                  <FiActivity size={12} className="text-green-500 flex-shrink-0" />
                  {report.activity}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className={`text-[9px] uppercase tracking-[0.22em] font-black mb-2.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Report Timeline
                </p>
                <div>
                  {timeline.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className="flex gap-2"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          step.done
                            ? "border-green-500 bg-green-500"
                            : darkMode ? "border-white/20 bg-transparent" : "border-gray-300 bg-transparent"
                        }`}>
                          {step.done && <FiCheckCircle size={8} className="text-white" />}
                        </div>
                        {i < timeline.length - 1 && (
                          <div
                            className={`w-px flex-1 my-0.5 ${step.done ? "bg-green-500/40" : darkMode ? "bg-white/10" : "bg-gray-200"}`}
                            style={{ minHeight: 14 }}
                          />
                        )}
                      </div>
                      <div className="pb-3">
                        <p className={`text-[11px] sm:text-xs font-bold leading-tight ${
                          step.done
                            ? darkMode ? "text-white" : "text-black"
                            : darkMode ? "text-gray-500" : "text-gray-400"
                        }`}>
                          {step.label}
                        </p>
                        <p className={`text-[10px] mt-0.5 ${step.done ? "text-green-500" : darkMode ? "text-gray-600" : "text-gray-400"}`}>
                          {step.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI box */}
              <div className={`border p-3 flex items-center gap-2.5 ${darkMode ? "bg-green-500/5 border-green-500/20" : "bg-green-50 border-green-200"}`}>
                <FiZap size={14} className="text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-green-500 text-[9px] font-black uppercase tracking-[0.14em]">AI Analysis</p>
                  <p className={`text-[10px] mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Location & content verified automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER — always pinned at bottom ── */}
        <div className={`flex-shrink-0 border-t px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 ${
          darkMode ? "border-white/10 bg-[#04090E]" : "border-gray-200 bg-gray-50"
        }`}>
          <div className={`flex items-center gap-1.5 text-[11px] sm:text-xs min-w-0 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            <FiClock size={11} className="flex-shrink-0" />
            <span className="truncate">{report.date}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onClose}
              className={`h-9 sm:h-10 px-3 sm:px-5 border text-[11px] sm:text-xs font-bold uppercase tracking-[0.08em] transition-all duration-300 ${
                darkMode
                  ? "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              Close
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="h-9 sm:h-10 px-3 sm:px-5 bg-green-500 hover:bg-green-400 transition-all duration-300 text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.1em] flex items-center gap-1.5 shadow-[0_6px_20px_rgba(34,197,94,0.3)]"
            >
              Share <FiExternalLink size={12} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ───────────────── MAIN COMPONENT ─────────────────
const ReportCardsGrid = ({ darkMode }) => {
  const [searchTerm, setSearchTerm]         = useState("");
  const [filterStatus, setFilterStatus]     = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !q ||
        report.title.toLowerCase().includes(q) ||
        report.location.toLowerCase().includes(q) ||
        report.description.toLowerCase().includes(q);
      const matchStatus = filterStatus === "All" || report.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [searchTerm, filterStatus]);

  return (
    <section className="mt-6 sm:mt-10" style={{ position: "relative", isolation: "isolate" }}>

      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`text-[10px] uppercase tracking-[0.3em] font-black mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}
          >
            Citizen Report Feed
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] sm:tracking-[-0.06em] leading-[0.92] ${darkMode ? "text-white" : "text-black"}`}
          >
            Manage Your
            <span className="block text-green-500 mt-1.5 sm:mt-2">Submitted Reports</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed max-w-2xl ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Track report verification, government response progress, citizen confirmations,
            uploaded evidence, AI validation, department assignments, and resolution updates
            from one monitoring dashboard.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className={`border px-5 sm:px-6 py-5 sm:py-6 relative overflow-hidden w-full xl:w-auto xl:min-w-[260px] flex-shrink-0 ${
            darkMode ? "bg-[#08121A] border-white/10" : "bg-white border-gray-200"
          }`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl pointer-events-none" />
          <div className="relative flex items-center justify-between gap-5">
            <div>
              <p className={`text-[10px] uppercase tracking-[0.22em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Total Submitted Reports
              </p>
              <h3 className={`mt-2.5 text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>126</h3>
              <p className="mt-2.5 text-green-500 text-sm font-semibold">Reports actively monitored</p>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 text-2xl sm:text-3xl flex-shrink-0">
              <FiTrendingUp />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── STICKY SEARCH + FILTER BAR ── */}
      <div className={`
        sticky top-[72px] sm:top-[88px] z-50
        border-y backdrop-blur-2xl
        px-3 sm:px-5 py-3 sm:py-4
        mb-6 sm:mb-8
        shadow-[0_16px_48px_rgba(0,0,0,0.12)]
        ${darkMode ? "bg-[#04090E]/95 border-white/10" : "bg-white/95 border-gray-200"}
      `}>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className={`relative border flex-1 overflow-hidden ${darkMode ? "bg-[#08121A] border-white/10" : "bg-white border-gray-200"}`}>
            <div className="absolute left-0 top-0 h-full w-[120px] bg-green-500/10 blur-3xl pointer-events-none" />
            <div className="relative flex items-center">
              <div className="pl-3 text-green-500 flex-shrink-0"><FiSearch size={16} /></div>
              <input
                type="text"
                placeholder="Search reports, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-transparent px-3 py-3.5 text-sm outline-none font-medium ${
                  darkMode ? "text-white placeholder:text-gray-500" : "text-black placeholder:text-gray-400"
                }`}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="pr-3 text-gray-400 hover:text-red-400 transition-colors flex-shrink-0">
                  <FiX size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-black flex-shrink-0 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              <FiFilter size={11} /> Filters
            </div>
            <FilterDropdown
              label="Status"
              value={filterStatus}
              options={ALL_STATUS}
              onChange={setFilterStatus}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      {/* ── REPORT CARDS LIST ── */}
      <div className="space-y-5 sm:space-y-8">
        <AnimatePresence>
          {filteredReports.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`py-16 text-center border ${darkMode ? "border-white/10 text-gray-500" : "border-gray-200 text-gray-400"}`}
            >
              <p className="text-sm font-semibold">No reports match your search.</p>
            </motion.div>
          )}

          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className={`
                group border overflow-hidden relative transition-all duration-500
                ${darkMode
                  ? "bg-[#08121A] border-white/10 hover:border-green-500/30"
                  : "bg-white border-gray-200 hover:border-green-300"}
              `}
            >
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-green-500 group-hover:w-full transition-all duration-700 z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] 2xl:grid-cols-[420px_1fr]">

                {/* IMAGE PANEL */}
                <div className="relative min-h-[200px] sm:min-h-[260px] lg:min-h-[360px] overflow-hidden">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute top-0 left-0 right-0 p-3 sm:p-5 flex items-start justify-between gap-3">
                    <div className="bg-green-500 text-white px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] flex-shrink-0">
                      {report.aiStatus}
                    </div>
                    <div className="bg-black/50 backdrop-blur-xl border border-white/10 text-white px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] flex items-center gap-1.5 flex-shrink-0">
                      <FiImage size={10} />{report.evidence} Files
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-3 sm:p-5 w-full">
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {report.fields.slice(0, 2).map((field, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-2 py-1 text-[9px] uppercase tracking-[0.1em] font-black">
                          {field}
                        </div>
                      ))}
                    </div>
                    <h3 className="text-white text-lg sm:text-2xl lg:text-3xl font-black leading-tight line-clamp-2">
                      {report.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2 sm:gap-4">
                      <div className="flex items-center gap-1.5 text-white/80 text-xs">
                        <FiMapPin size={11} />{report.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-white/60 text-xs">
                        <FiClock size={11} />{report.date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTENT PANEL */}
                <div className="relative p-4 sm:p-6 lg:p-8">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 blur-3xl pointer-events-none" />

                  <div className="relative flex flex-col xl:flex-row gap-5 xl:gap-7">

                    {/* Left content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 border text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] flex-shrink-0 ${STATUS_STYLES[report.status]}`}>
                          <FiCheckCircle size={11} />
                          {report.status}
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs min-w-0 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <FiActivity size={12} className="flex-shrink-0" />
                          <span className="truncate">{report.activity}</span>
                        </div>
                      </div>

                      <div className={`mt-4 border-l-[3px] p-3 sm:p-4 ${
                        report.assigned
                          ? darkMode ? "bg-green-500/10 border-green-500" : "bg-green-50 border-green-500"
                          : darkMode ? "bg-yellow-500/10 border-yellow-500" : "bg-yellow-50 border-yellow-500"
                      }`}>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border flex-shrink-0 ${
                            report.assigned
                              ? "border-green-500/30 bg-green-500/10 text-green-500"
                              : "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {report.assigned ? <FiShield size={15} /> : <FiLock size={15} />}
                          </div>
                          <div className="min-w-0">
                            <h4 className={`text-xs font-black uppercase tracking-[0.05em] leading-snug ${report.assigned ? "text-green-500" : "text-yellow-500"}`}>
                              {report.assigned ? "Government Department Assigned" : "Awaiting Community Confirmation"}
                            </h4>
                            <p className={`mt-1.5 text-xs leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                              {report.assigned
                                ? `Assigned to ${report.department} for inspection and response.`
                                : "Cannot be assigned until citizens complete required confirmations."}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {report.description}
                      </p>
                    </div>

                    {/* Right stat box */}
                    <div className={`border w-full xl:w-[200px] 2xl:w-[220px] p-4 relative overflow-hidden flex-shrink-0 ${
                      report.resolved
                        ? darkMode ? "bg-green-500/10 border-green-500/20" : "bg-green-50 border-green-200"
                        : darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#FAFAFA] border-gray-200"
                    }`}>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 blur-2xl pointer-events-none" />
                      {report.resolved ? (
                        <>
                          <div className="flex items-center gap-2 text-green-500 mb-2">
                            <FiCheckCircle size={14} />
                            <span className="text-[9px] font-black uppercase tracking-[0.14em]">Issue Resolved</span>
                          </div>
                          <h4 className="text-4xl sm:text-5xl font-black text-green-500">100%</h4>
                          <p className={`mt-2 text-xs leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Government successfully resolved this issue.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className={`text-[9px] uppercase tracking-[0.18em] mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Community Support
                          </p>
                          <h4 className={`text-4xl sm:text-5xl font-black ${darkMode ? "text-white" : "text-black"}`}>
                            {report.confirmations}
                          </h4>
                          <p className="mt-1 text-green-500 text-xs font-semibold">/ {report.required} Needed</p>
                          <div className="mt-2.5 flex items-center gap-1.5 text-yellow-500 text-xs">
                            <FiAlertCircle size={12} /> Awaiting validation
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-5">
                    <h4 className={`text-[10px] font-black uppercase tracking-[0.14em] mb-2.5 ${darkMode ? "text-white" : "text-black"}`}>
                      Submitted Report Details
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {report.fields.map((field, i) => (
                        <div key={i} className={`px-2.5 py-1.5 border text-[11px] sm:text-xs font-medium hover:border-green-500/30 transition-all duration-300 ${
                          darkMode ? "bg-white/[0.03] border-white/10 text-gray-300" : "bg-[#FAFAFA] border-gray-200 text-gray-700"
                        }`}>
                          {field}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress bar */}
                  {!report.resolved && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`flex items-center gap-1.5 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          <FiUsers size={12} /> Verification Progress
                        </div>
                        <span className="text-green-500 font-bold text-xs">
                          {report.confirmations}/{report.required}
                        </span>
                      </div>
                      <div className={`relative h-2 overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${report.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full bg-green-500 relative overflow-hidden"
                        >
                          <motion.div
                            animate={{ x: ["-100%", "250%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-12 h-full bg-white/30 skew-x-12"
                          />
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Card footer */}
                  <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className={`flex items-center gap-1.5 text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                      <FiClock size={12} />{report.date}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedReport(report)}
                      className="
                        h-12 sm:h-14
                        w-full sm:w-auto
                        px-6 sm:px-8
                        bg-green-500 hover:bg-green-400
                        transition-all duration-300
                        text-white text-xs font-black uppercase tracking-[0.14em]
                        flex items-center justify-center gap-2
                        shadow-[0_10px_28px_rgba(34,197,94,0.25)]
                      "
                    >
                      View Details
                      <FiArrowUpRight size={15} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedReport && (
          <DetailModal
            report={selectedReport}
            darkMode={darkMode}
            onClose={() => setSelectedReport(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReportCardsGrid;