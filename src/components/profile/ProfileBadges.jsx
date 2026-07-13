import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiAward,
  FiShield,
  FiCamera,
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";

import { getMyReports, getConfirmedReports, getContributorRank } from "../../utils/api";

const ProfileBadges = ({ darkMode }) => {
  // ── Live personal data — badges are computed from real reports,
  // confirmations given to others, and nationwide rank. There's no
  // "badges" table in the schema, so "earned" thresholds below are a
  // design choice, not extracted values — adjust freely. ────────────────
  const [myReports, setMyReports] = useState([]);
  const [confirmedReports, setConfirmedReports] = useState([]);
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [mine, confirmed, rank] = await Promise.all([
        getMyReports().catch(() => ({ reports: [] })),
        getConfirmedReports().catch(() => ({ reports: [] })),
        getContributorRank().catch(() => null),
      ]);
      setMyReports(mine.reports || []);
      setConfirmedReports(confirmed.reports || []);
      setRankData(rank);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const totalReports = myReports.length;
  const resolvedCount = myReports.filter((r) => r.status === "Resolved").length;
  const verifiedCount = myReports.filter((r) => r.status === "Resolved" || r.status === "In Progress").length;
  const hasHighQualityEvidence = myReports.some((r) => (parseInt(r.score, 10) || 0) >= 80);
  const confirmedOthersCount = confirmedReports.length;
  const topPercent = rankData?.topPercent ?? null;

  const badges = [
    {
      title: "First Report",
      description: "Successfully submitted your first verified report.",
      icon: FiStar,
      earned: totalReports >= 1,
    },
    {
      title: "Evidence Expert",
      description: "Uploaded high-quality evidence that passed verification.",
      icon: FiCamera,
      // "High quality" = at least one report with a strong AI confidence score.
      earned: hasHighQualityEvidence,
    },
    {
      title: "Community Guardian",
      description: "Helped protect and improve local communities.",
      icon: FiShield,
      // Guardian = has confirmed at least one OTHER citizen's report, not just your own.
      earned: confirmedOthersCount >= 1,
    },
    {
      title: "Change Catalyst",
      description: "Triggered meaningful action through reporting.",
      icon: FiZap,
      // At least one of your reports passed the community-verification threshold.
      earned: verifiedCount >= 1,
    },
    {
      title: "Impact Leader",
      description: "Reached a major civic influence milestone.",
      icon: FiTrendingUp,
      // Top 20% nationally by Nation Aura Score.
      earned: topPercent !== null && topPercent <= 20,
    },
    {
      title: "Resolution Champion",
      description: "Multiple reports successfully resolved.",
      icon: FiCheckCircle,
      // "Multiple" = at least 3 resolved reports.
      earned: resolvedCount >= 3,
    },
    {
      title: "National Contributor",
      description: "Recognized for nationwide impact.",
      icon: FiAward,
      // Top 5% nationally.
      earned: topPercent !== null && topPercent <= 5,
    },
    {
      title: "Legend of Accountability",
      description: "Reserved for the most impactful citizens.",
      icon: FiTarget,
      // Top 1% nationally.
      earned: topPercent !== null && topPercent <= 1,
    },
  ];

  const earnedCount = badges.filter((b) => b.earned).length;
  const totalBadges = badges.length;
  const progressPct = Math.round((earnedCount / totalBadges) * 100);

  const summaryMessage =
    topPercent !== null && topPercent <= 50
      ? "You are among the most active contributors on the platform."
      : topPercent !== null
      ? "Keep contributing to climb the ranks and unlock more badges."
      : "Submit your first report to start earning badges.";

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
          left-[-120px]
          top-[-120px]
          w-[320px]
          h-[320px]
          bg-green-500/10
          blur-[120px]
        "
      />

      <div className="relative z-10 p-5 sm:p-7 lg:p-8">
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
            Achievement Vault
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
            Civic Achievement Badges
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
            Every badge represents
            real contributions made toward
            transparency, accountability,
            and community development.
          </p>
        </div>

        {/* SUMMARY */}
        <div
          className={`
            mt-8
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
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-green-500
                  font-black
                "
              >
                Badge Progress
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
                {loading ? "—" : `${earnedCount} / ${totalBadges} Earned`}
              </h3>
            </div>

            <div className="w-full md:w-[420px]">
              <div
                className={`
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
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${loading ? 0 : progressPct}%`,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.2,
                  }}
                  className="
                    h-full
                    bg-gradient-to-r
                    from-green-500
                    via-emerald-400
                    to-green-600
                  "
                />
              </div>

              <p
                className={`
                  mt-2
                  text-sm
                  ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
                {loading ? "Checking your achievements..." : summaryMessage}
              </p>
            </div>
          </div>
        </div>

        {/* BADGES */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                }}
                className={`
                  relative
                  overflow-hidden
                  border
                  p-5
                  transition-all
                  duration-300
                  ${
                    badge.earned
                      ? darkMode
                        ? "bg-[#0D1823] border-green-500/20"
                        : "bg-green-50 border-green-200"
                      : darkMode
                      ? "bg-[#081019] border-white/10"
                      : "bg-white border-gray-200"
                  }
                `}
              >
                {badge.earned && (
                  <div
                    className="
                      absolute
                      top-0
                      left-0
                      h-[2px]
                      w-full
                      bg-gradient-to-r
                      from-green-500
                      via-emerald-400
                      to-transparent
                    "
                  />
                )}

                <div
                  className={`
                    h-14
                    w-14
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${
                      badge.earned
                        ? "bg-green-500/10"
                        : "bg-gray-500/10"
                    }
                  `}
                >
                  <Icon
                    className={`
                      text-2xl
                      ${
                        badge.earned
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    `}
                  />
                </div>

                <h3
                  className={`
                    mt-5
                    text-xl
                    font-black
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                  `}
                >
                  {badge.title}
                </h3>

                <p
                  className={`
                    mt-3
                    text-sm
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }
                  `}
                >
                  {badge.description}
                </p>

                <div className="mt-5">
                  {loading ? (
                    <span
                      className="
                        inline-flex
                        items-center
                        px-3
                        py-1
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        bg-gray-500/10
                        text-gray-400
                      "
                    >
                      Checking...
                    </span>
                  ) : badge.earned ? (
                    <span
                      className="
                        inline-flex
                        items-center
                        px-3
                        py-1
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        bg-green-500/10
                        text-green-500
                      "
                    >
                      Earned
                    </span>
                  ) : (
                    <span
                      className="
                        inline-flex
                        items-center
                        px-3
                        py-1
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        bg-gray-500/10
                        text-gray-400
                      "
                    >
                      Locked
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MOTIVATION */}
        <div
          className="
            mt-10
            border-l-4
            border-green-500
            pl-5
          "
        >
          <p
            className="
              text-green-500
              font-black
              uppercase
              tracking-[0.2em]
              text-xs
            "
          >
            Keep Going
          </p>

          <p
            className={`
              mt-3
              text-base
              sm:text-lg
              leading-relaxed
              max-w-4xl
              ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }
            `}
          >
            Great nations are not built by
            governments alone. They are
            built by citizens who choose
            to participate, report issues,
            verify facts, and demand
            accountability. Every badge is
            proof that your voice matters.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileBadges;