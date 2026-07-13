import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiMapPin,
  FiCamera,
  FiShield,
  FiActivity,
  FiCheckCircle,
  FiTrendingUp,
  FiPlusCircle,
} from "react-icons/fi";

import { getMyReports, getContributorRank } from "../../utils/api";

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};

// Icon + description per real status — no fabricated per-stage dates,
// just an honest read of where each of the user's actual reports stands.
const STATUS_META = {
  Pending: {
    icon: FiMapPin,
    description: "Submitted and awaiting community verification.",
  },
  "In Progress": {
    icon: FiActivity,
    description: "Verified by citizens and escalated to the relevant authority.",
  },
  Resolved: {
    icon: FiCheckCircle,
    description: "Issue resolved and confirmed fixed by the community.",
  },
};

const ProfileTimeline = ({
  darkMode,
}) => {
  // ── Live personal data. There's no status-change history table in the
  // schema (only created_at is stored per report), so this timeline is
  // built from the real chronological list of the user's own reports and
  // their real current status — not a fabricated multi-stage saga for a
  // single report. ─────────────────────────────────────────────────────
  const [myReports, setMyReports] = useState([]);
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [mine, rank] = await Promise.all([
        getMyReports().catch(() => ({ reports: [] })),
        getContributorRank().catch(() => null),
      ]);
      const sorted = [...(mine.reports || [])].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMyReports(sorted);
      setRankData(rank);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const timeline = myReports.map((r) => {
    const meta = STATUS_META[r.status] || STATUS_META.Pending;
    return {
      date: formatDate(r.createdAt),
      title: r.title,
      description: meta.description,
      icon: meta.icon,
      status: r.status === "Resolved" ? "highlight" : "completed",
    };
  });

  // Real capstone entry — uses the actual Nation Aura Score / rank instead
  // of a fabricated "Impact Recorded" summary.
  const hasRank = rankData && rankData.rank !== null;
  if (!loading && hasRank) {
    timeline.push({
      date: "Current Standing",
      title: "Impact Recorded",
      description: `Your civic contributions have earned a Nation Aura Score of ${rankData.score.toLocaleString()}, ranking #${rankData.rank} of ${rankData.totalContributors.toLocaleString()} contributors nationwide.`,
      icon: FiTrendingUp,
      status: "highlight",
    });
  }

  return (
    <section
      className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? "bg-[#081019] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          right-[-120px]
          bottom-[-120px]
          w-[300px]
          h-[300px]
          bg-green-500/10
          blur-[120px]
        "
      />

      <div
        className="
          relative
          z-10
          p-5
          sm:p-7
          lg:p-8
        "
      >
        {/* HEADER */}
        <div className="max-w-3xl">
          <p
            className={`
              text-[11px]
              uppercase
              tracking-[0.35em]
              font-black
              ${
                darkMode
                  ? "text-green-400"
                  : "text-green-700"
              }
            `}
          >
            Civic Journey
          </p>

          <h2
            className={`
              mt-3
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              tracking-[-0.06em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            Impact Timeline
          </h2>

          <p
            className={`
              mt-4
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Follow the journey from
            citizen report to verified
            community impact.
          </p>
        </div>

        {/* TIMELINE / LOADING / EMPTY */}
        {loading ? (
          <div className="mt-12 space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-5 animate-pulse">
                <div className={`h-10 w-10 rounded-full flex-shrink-0 ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />
                <div className={`flex-1 border p-5 ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#F8FAF9] border-gray-200"}`}>
                  <div className={`h-4 w-1/3 ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />
                  <div className={`h-3 w-2/3 mt-3 ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />
                </div>
              </div>
            ))}
          </div>
        ) : timeline.length === 0 ? (
          <div className={`mt-10 border p-8 text-center ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}`}>
            <FiPlusCircle className="mx-auto text-green-500" size={22} />
            <p className={`mt-3 text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
              Your Civic Journey Starts Here
            </p>
            <p className={`mt-2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              You haven't submitted a report yet. Submit your first one to begin building your impact timeline.
            </p>
          </div>
        ) : (
          <div
            className="
              relative
              mt-12
            "
          >
            {/* CENTER LINE */}
            <div
              className="
                absolute
                left-[20px]
                top-0
                bottom-0
                w-[2px]
                bg-gradient-to-b
                from-green-500
                via-green-400
                to-transparent
              "
            />

            <div className="space-y-8">
              {timeline.map(
                (item, index) => {
                  const Icon =
                    item.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="
                        relative
                        flex
                        gap-5
                      "
                    >
                      {/* ICON */}
                      <div
                        className={`
                          relative
                          z-10
                          h-10
                          w-10
                          flex-shrink-0
                          rounded-full
                          flex
                          items-center
                          justify-center
                          ${
                            item.status ===
                            "highlight"
                              ? "bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                              : darkMode
                              ? "bg-[#102131] text-green-400"
                              : "bg-green-100 text-green-700"
                          }
                        `}
                      >
                        <Icon />
                      </div>

                      {/* CONTENT */}
                      <div
                        className={`
                          flex-1
                          border
                          p-5
                          min-w-0
                          ${
                            item.status ===
                            "highlight"
                              ? darkMode
                                ? "bg-green-500/10 border-green-500/20"
                                : "bg-green-50 border-green-200"
                              : darkMode
                              ? "bg-white/[0.03] border-white/10"
                              : "bg-[#F8FAF9] border-gray-200"
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-2
                          "
                        >
                          <h3
                            className={`
                              text-xl
                              font-black
                              break-words
                              ${
                                darkMode
                                  ? "text-white"
                                  : "text-black"
                              }
                            `}
                          >
                            {item.title}
                          </h3>

                          <span
                            className="
                              text-xs
                              uppercase
                              tracking-[0.2em]
                              text-green-500
                              font-bold
                              shrink-0
                            "
                          >
                            {item.date}
                          </span>
                        </div>

                        <p
                          className={`
                            mt-3
                            leading-relaxed
                            ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                          `}
                        >
                          {
                            item.description
                          }
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* IMPACT SUMMARY */}
        <div
          className={`
            mt-10
            border
            p-5
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
          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-green-500
              font-black
            "
          >
            Timeline Insight
          </p>

          <h3
            className={`
              mt-3
              text-2xl
              font-black
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            From Report To Resolution
          </h3>

          <p
            className={`
              mt-3
              leading-relaxed
              max-w-4xl
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Your reports are not just
            entries in a database. They
            create a chain of action that
            drives awareness, verification,
            government response and
            measurable community
            improvement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileTimeline;