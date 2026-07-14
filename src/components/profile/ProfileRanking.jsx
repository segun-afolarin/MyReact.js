import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiAward,
  FiTrendingUp,
  FiTarget,
  FiMapPin,
  FiGlobe,
  FiArrowUpRight,
  FiShield,
} from "react-icons/fi";

import { getMyReports, getContributorRank } from "../../utils/api";

const ProfileRanking = ({
  darkMode,
}) => {
  // ── Live data: getContributorRank() for real nationwide + state
  // rankings, getMyReports() for the Reputation Score composite (same
  // formula used elsewhere on the profile). ──────────────────────────────
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
      setMyReports(mine.reports || []);
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
  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;
  const avgConfirmationRate =
    totalReports > 0
      ? Math.round(
          myReports.reduce(
            (sum, r) => sum + Math.min((r.confirmations ?? 0) / (r.requiredConfirmations || 5), 1) * 100,
            0
          ) / totalReports
        )
      : 0;
  // "Reputation Score" — same composite used across the profile (resolution
  // rate + confirmation-fulfillment rate), not a stored value.
  const reputationScore = totalReports > 0 ? Math.round((resolutionRate + avgConfirmationRate) / 2) : 0;

  const stateName = rankData?.state ?? null;
  const nationalRank = rankData?.rank ?? null;
  const nationalTopPercent = rankData?.topPercent ?? null;
  const nationalTotal = rankData?.totalContributors ?? 0;

  const stateRank = rankData?.stateRank ?? null;
  const stateTopPercent = rankData?.stateTopPercent ?? null;
  const stateTotal = rankData?.stateTotalContributors ?? 0;

  const isRanked = nationalRank !== null;

  // "Percentile toward the top" — reused as the progress-bar fill and the
  // featured "Top X%" banner, since that's the one real percentile figure
  // this data actually supports (there's no separate milestone system).
  const nationalOutperform = nationalTopPercent !== null ? 100 - nationalTopPercent : null;
  const stateOutperform = stateTopPercent !== null ? 100 - stateTopPercent : null;

  const rankings = [
    {
      title: stateName ? `${stateName} Ranking` : "State Ranking",
      value: stateRank !== null ? `#${stateRank}` : "—",
      progressPct: stateOutperform,
      icon: FiMapPin,
    },
    {
      title: "National Ranking",
      value: nationalRank !== null ? `#${nationalRank}` : "—",
      progressPct: nationalOutperform,
      icon: FiGlobe,
    },
  ];

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
          top-[-120px]
          w-[320px]
          h-[320px]
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
        <div className="max-w-4xl">
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
            Reputation Center
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
            Rankings & Recognition
          </h2>

          <p
            className={`
              mt-4
              max-w-3xl
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Your position among active
            citizens is determined by
            report quality, verified
            evidence, successful
            resolutions and measurable
            community impact.
          </p>
        </div>

        {/* FEATURED RANK */}
        <div
          className={`
            mt-8
            border
            overflow-hidden
            ${
              darkMode
                ? `
                  bg-green-500/[0.05]
                  border-green-500/20
                `
                : `
                  bg-green-50
                  border-green-200
                `
            }
          `}
        >
          <div className="p-6 lg:p-8">
            <div
              className="
                flex
                items-center
                gap-2
                text-green-500
                font-black
                uppercase
                tracking-[0.25em]
                text-xs
              "
            >
              <FiAward />
              {isRanked && nationalTopPercent <= 10 ? "Elite Contributor" : "Contributor Standing"}
            </div>

            <h3
              className="
                mt-4
                text-4xl
                lg:text-6xl
                font-black
                tracking-tight
              "
            >
              {loading ? "—" : isRanked ? `Top ${nationalTopPercent}%` : "Unranked"}
            </h3>

            <p
              className={`
                mt-4
                max-w-2xl
                leading-relaxed
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
              `}
            >
              {loading
                ? "Calculating your standing..."
                : isRanked
                ? `You are performing better than ${nationalOutperform}% of active Nation Aura contributors nationwide, out of ${nationalTotal.toLocaleString()} total.`
                : "Submit your first report to join the rankings."}
            </p>

            {/* NOTE: "Rising X positions this month" removed — there's no
                historical rank-snapshot table in the schema, so a real
                month-over-month position change isn't computable. Would
                need a scheduled job storing periodic rank snapshots. */}
          </div>
        </div>

        {/* RANKING CARDS */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-5
          "
        >
          {rankings.map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                  }}
                  className={`
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
                      h-14
                      w-14
                      rounded-xl
                      bg-green-500/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon
                      className="
                        text-green-500
                        text-2xl
                      "
                    />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-5xl
                      font-black
                    "
                  >
                    {loading ? "—" : item.value}
                  </h3>

                  <p
                    className={`
                      mt-2
                      font-semibold
                      ${
                        darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }
                    `}
                  >
                    {item.title}
                  </p>

                  <div className="mt-5">
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
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: `${loading ? 0 : item.progressPct ?? 0}%`,
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
                      className="
                        mt-2
                        text-sm
                        text-green-500
                        font-semibold
                      "
                    >
                      {loading
                        ? "—"
                        : item.progressPct !== null
                        ? `Outperforming ${item.progressPct}% of ${index === 0 ? "contributors in your state" : "contributors nationwide"}`
                        : "Not yet ranked"}
                    </p>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        {/* REPUTATION SCORE */}
        <div
          className={`
            mt-8
            border
            p-6
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
              items-center
              gap-3
            "
          >
            <div
              className="
                h-14
                w-14
                rounded-xl
                bg-green-500/10
                flex
                items-center
                justify-center
              "
            >
              <FiShield
                className="
                  text-green-500
                  text-2xl
                "
              />
            </div>

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
                Reputation Score
              </p>

              <h3
                className="
                  text-4xl
                  font-black
                "
              >
                {loading ? "—" : `${reputationScore} / 100`}
              </h3>
            </div>
          </div>

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
            Built from verification
            accuracy, report quality,
            community confirmations,
            resolved cases, and long-term
            contribution history.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileRanking;