import { motion } from "framer-motion";

import {
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiImage,
  FiTrendingUp,
  FiThumbsUp,
} from "react-icons/fi";

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
                {c.initials}
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

// ─── Main component ───────────────────────────────────────────────────────────
const ReportGrid = ({ darkMode, search = "", filter = "All" }) => {

  // ── Your submitted reports ──────────────────────────────────────────────
  const myReports = [
    {
      id: "#NA-1024",
      title: "Road Damage Report",
      location: "Abuja Municipal Area",
      status: "Resolved",
      date: "18 June 2026",
      score: "94%",
      confirmations: 5,
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1200&auto=format&fit=crop",
      description: "Large pothole affecting traffic flow and vehicle safety.",
      fields: ["Road Damage", "High Priority", "Photo Evidence Uploaded"],
      updates: ["Submitted", "Verified", "Sent to government", "Resolved"],
      confirmedBy: [
        { name: "Oluwaseun A.", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face" },
        { name: "Peter B.",     avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face" },
        { name: "Fatima K.",    initials: "FK" },
        { name: "James N.",     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
        { name: "Chioma E.",    initials: "CE" },
      ],
    },
    {
      id: "#NA-1025",
      title: "Street Light Failure",
      location: "Wuse District",
      status: "In Progress",
      date: "16 June 2026",
      score: "81%",
      confirmations: 3,
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      description: "Several street lights are not functioning at night.",
      fields: ["Public Safety", "Night Visibility", "Community Alert"],
      updates: ["Submitted", "Under review", "Authority assigned"],
      confirmedBy: [
        { name: "Amaka O.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
        { name: "Bello Y.", initials: "BY" },
        { name: "Ngozi C.", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face" },
      ],
    },
    {
      id: "#NA-1026",
      title: "Water Supply Issue",
      location: "Garki Area",
      status: "Pending",
      date: "12 June 2026",
      score: "72%",
      confirmations: 1,
      image: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?q=80&w=1200&auto=format&fit=crop",
      description: "Intermittent water supply affecting households.",
      fields: ["Water Supply", "Household Impact"],
      updates: ["Submitted"],
      confirmedBy: [
        { name: "Tunde M.", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face" },
      ],
    },
  ];

  // ── Reports you confirmed for others ───────────────────────────────────
  const confirmedReports = [
    {
      id: "#NA-1019",
      title: "Flooding on Airport Road",
      location: "Lugbe, Abuja",
      status: "In Progress",
      date: "14 June 2026",
      score: "88%",
      confirmedOn: "15 June 2026",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1200&auto=format&fit=crop",
      description: "Heavy flooding blocking road access near the airport expressway.",
      submittedBy: { name: "Kehinde A.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
      fields: ["Flooding", "Road Block", "High Priority"],
      updates: ["Submitted", "Verified", "Authority notified"],
    },
    {
      id: "#NA-1021",
      title: "Collapsed Bridge Railing",
      location: "Maitama, Abuja",
      status: "Pending",
      date: "10 June 2026",
      score: "76%",
      confirmedOn: "11 June 2026",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
      description: "Bridge railing on the Maitama overhead collapsed, posing danger to pedestrians.",
      submittedBy: { name: "Sola B.", initials: "SB" },
      fields: ["Infrastructure", "Safety Hazard"],
      updates: ["Submitted", "Under review"],
    },
  ];

  // ── Search + filter ─────────────────────────────────────────────────────
  // Searches across: id, title, location, description, fields, status
  const matchesSearch = (r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      r.id.toLowerCase().includes(q)          ||
      r.title.toLowerCase().includes(q)       ||
      r.location.toLowerCase().includes(q)    ||
      r.description.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)      ||
      (r.fields || []).some((f) => f.toLowerCase().includes(q))
    );
  };

  const matchesFilter = (r) =>
    filter === "All" ? true : r.status === filter;

  const filteredMine      = myReports.filter((r) => matchesSearch(r) && matchesFilter(r));
  const filteredConfirmed = confirmedReports.filter((r) => matchesSearch(r) && matchesFilter(r));

  const noResults = filteredMine.length === 0 && filteredConfirmed.length === 0;

  // ── Report card renderer ────────────────────────────────────────────────
  const renderCard = (report, index, isConfirmedByMe = false) => {
    const remaining = REQUIRED_CONFIRMATIONS - report.confirmations;
    const progress  = isConfirmedByMe
      ? 100 // already confirmed, so show full bar visually
      : Math.round((report.confirmations / REQUIRED_CONFIRMATIONS) * 100);

    return (
      <motion.div
        key={report.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        className={`
          group border overflow-hidden transition-all duration-300
          ${darkMode ? "bg-[#09131B] border-white/10" : "bg-white border-gray-200"}
        `}
      >
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr]">

          {/* IMAGE */}
          <div className="relative h-[260px] xl:h-full overflow-hidden">
            <img
              src={report.image}
              alt={report.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Confirmed-by-you badge overlaid on image */}
            {isConfirmedByMe && (
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
              <h3 className="text-white text-2xl font-black leading-tight">
                {report.title}
              </h3>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5 sm:p-7">

            {/* TOP */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <div
                    className={`
                      inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] border
                      ${darkMode
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-green-50 border-green-200 text-green-700"
                      }
                    `}
                  >
                    <FiCheckCircle />
                    {report.status}
                  </div>

                  <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <FiMapPin />
                    {report.location}
                  </div>
                </div>

                {/* Submitted by (only on confirmed-by-me cards) */}
                {isConfirmedByMe && report.submittedBy && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border-2 border-green-500 overflow-hidden flex items-center justify-center text-white text-[9px] font-black shrink-0">
                      {report.submittedBy.avatar ? (
                        <img src={report.submittedBy.avatar} alt={report.submittedBy.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                          {report.submittedBy.initials}
                        </div>
                      )}
                    </div>
                    <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Reported by <span className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>{report.submittedBy.name}</span>
                    </span>
                  </div>
                )}

                <p className={`mt-5 max-w-2xl text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {report.description}
                </p>
              </div>

              {/* AI PRIORITY */}
              <div
                className={`
                  border p-4 min-w-[180px]
                  ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#FAFAFA] border-gray-200"}
                `}
              >
                <p className={`text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <FiTrendingUp />
                  AI Priority
                </p>
                <h4 className="mt-3 text-4xl font-black text-green-600">{report.score}</h4>
                <p className="mt-2 text-green-500 text-sm font-semibold">Confidence Score</p>
              </div>
            </div>

            {/* FORM DATA */}
            <div className="mt-7">
              <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                Report Details
              </h4>
              <div className="flex flex-wrap gap-3">
                {report.fields.map((field, i) => (
                  <div
                    key={i}
                    className={`
                      px-4 py-3 border text-sm font-medium
                      ${darkMode ? "bg-white/[0.03] border-white/10 text-gray-300" : "bg-[#FAFAFA] border-gray-200 text-gray-700"}
                    `}
                  >
                    {field}
                  </div>
                ))}
              </div>
            </div>

            {/* COMMUNITY CONFIRMERS (only on MY reports) */}
            {!isConfirmedByMe && report.confirmedBy?.length > 0 && (
              <div className="mt-7">
                <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                  Community Support
                </h4>
                <ConfirmerAvatars confirmers={report.confirmedBy} darkMode={darkMode} />
              </div>
            )}

            {/* CITIZEN CONFIRMATIONS PROGRESS */}
            {!isConfirmedByMe && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center gap-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <FiUsers />
                    Citizen Confirmations
                  </div>
                  <span className="text-green-500 font-bold text-sm">
                    {report.confirmations}/{REQUIRED_CONFIRMATIONS}
                  </span>
                </div>

                <div className={`relative h-3 overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
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

                <p className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                  {remaining > 0
                    ? `${remaining} more confirmations needed before submission to government`
                    : "Ready for government submission"}
                </p>
              </div>
            )}

            {/* YOU CONFIRMED ON DATE (confirmed-by-me cards) */}
            {isConfirmedByMe && (
              <div className="mt-8">
                <div
                  className={`
                    inline-flex items-center gap-3 px-4 py-3 border
                    ${darkMode
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }
                  `}
                >
                  <FiThumbsUp size={14} />
                  <span className="text-xs font-black uppercase tracking-[0.15em]">
                    You confirmed this on {report.confirmedOn}
                  </span>
                </div>
              </div>
            )}

            {/* TIMELINE */}
            <div className="mt-8">
              <h4 className={`text-sm font-bold uppercase tracking-[0.15em] mb-4 ${darkMode ? "text-white" : "text-black"}`}>
                Progress Timeline
              </h4>
              <div className="flex flex-wrap gap-3">
                {report.updates.map((u, i) => (
                  <div
                    key={i}
                    className={`
                      flex items-center gap-2 px-4 py-3 border text-sm font-medium
                      ${darkMode ? "bg-white/[0.03] border-white/10 text-gray-300" : "bg-[#FAFAFA] border-gray-200 text-gray-700"}
                    `}
                  >
                    <div className="w-2 h-2 bg-green-500" />
                    {u}
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
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

  return (
    <div className="space-y-10 mt-6">

      {/* ── NO RESULTS ────────────────────────────────────────────────────── */}
      {noResults && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            border p-10 text-center
            ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}
          `}
        >
          <p className={`text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
            No reports found
          </p>
          <p className={`mt-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Try a different search term or filter.
          </p>
        </motion.div>
      )}

      {/* ── MY REPORTS ────────────────────────────────────────────────────── */}
      {filteredMine.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className={`text-sm font-black uppercase tracking-[0.18em] ${darkMode ? "text-white" : "text-black"}`}>
              My Reports
            </h2>
            <div className={`h-px flex-1 ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />
            <span className={`text-xs font-bold px-3 py-1 border ${darkMode ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"}`}>
              {filteredMine.length}
            </span>
          </div>
          <div className="space-y-5">
            {filteredMine.map((r, i) => renderCard(r, i, false))}
          </div>
        </div>
      )}

      {/* ── REPORTS I CONFIRMED ───────────────────────────────────────────── */}
      {filteredConfirmed.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-5">
            <h2 className={`text-sm font-black uppercase tracking-[0.18em] ${darkMode ? "text-white" : "text-black"}`}>
              Reports I Confirmed
            </h2>
            <div className={`h-px flex-1 ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />
            <span className={`text-xs font-bold px-3 py-1 border ${darkMode ? "border-white/10 text-gray-400" : "border-gray-200 text-gray-500"}`}>
              {filteredConfirmed.length}
            </span>
          </div>
          <div className="space-y-5">
            {filteredConfirmed.map((r, i) => renderCard(r, i, true))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ReportGrid;