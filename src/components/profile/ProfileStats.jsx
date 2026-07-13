import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiCheckCircle,
  FiActivity,
  FiUsers,
  FiArrowUpRight,
  FiShield,
} from "react-icons/fi";

import { getMyReports, getContributorRank } from "../../utils/api";

const ProfileStats = ({ darkMode }) => {
  // ── Live personal data: getMyReports() for real counts, getContributorRank()
  // for the score/percentile used in the impact bar at the bottom. ────────
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rankData, setRankData] = useState(null);
  const [rankLoading, setRankLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyReports();
      setMyReports(data.reports || []);
    } catch (e) {
      setMyReports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRank = useCallback(async () => {
    setRankLoading(true);
    try {
      const data = await getContributorRank();
      setRankData(data);
    } catch (e) {
      setRankData(null);
    } finally {
      setRankLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
    fetchRank();
  }, [fetchReports, fetchRank]);

  const totalReports = myReports.length;
  const resolvedCount = myReports.filter((r) => r.status === "Resolved").length;
  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;

  // "Citizens Reached" — no literal reach/impression metric exists. Closest
  // real proxy: total citizen confirmations received across this user's
  // own reports (same approximation ProfileHero uses as "Lives Impacted").
  const citizensReached = myReports.reduce((sum, r) => sum + (r.confirmations ?? 0), 0);

  // "Trust Score" — same composite formula as ProfileHero, reused here for
  // consistency rather than inventing a second definition of "trust."
  const avgConfirmationRate =
    totalReports > 0
      ? Math.round(
          myReports.reduce(
            (sum, r) => sum + Math.min((r.confirmations ?? 0) / (r.requiredConfirmations || 5), 1) * 100,
            0
          ) / totalReports
        )
      : 0;
  const trustScore = totalReports > 0 ? Math.round((resolutionRate + avgConfirmationRate) / 2) : 0;

  // Week-over-week growth in submission volume — the one growth figure
  // that's genuinely computable from data we have (real createdAt per report).
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;
  const thisWeekCount = myReports.filter((r) => r.createdAt && new Date(r.createdAt).getTime() >= weekAgo).length;
  const lastWeekCount = myReports.filter((r) => {
    if (!r.createdAt) return false;
    const t = new Date(r.createdAt).getTime();
    return t >= twoWeeksAgo && t < weekAgo;
  }).length;
  const submissionGrowth =
    lastWeekCount > 0
      ? Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100)
      : thisWeekCount > 0
      ? 100
      : 0;

  // Real percentile from /api/reports/rank: topPercent = "top X%", so the
  // inverse tells us how many contributors this user is outperforming.
  const rank = rankData?.rank ?? null;
  const totalContributors = rankData?.totalContributors ?? 0;
  const topPercent = rankData?.topPercent ?? null;
  const outperformPercent = rank !== null && totalContributors > 0 ? Math.round(((totalContributors - rank) / totalContributors) * 100) : null;

  const displayValue = (n) => (loading ? "—" : `${n}`);
  const displayPercent = (n) => (loading ? "—%" : `${n}%`);

  // Growth is only shown where it's genuinely computable — no fabricated
  // percentages for Resolved/Citizens Reached/Trust Score, since there's no
  // historical snapshot to compare against for those.
  const stats = [
    {
      title: "Reports Submitted",
      value: displayValue(totalReports),
      growth: loading ? null : `${submissionGrowth >= 0 ? "+" : ""}${submissionGrowth}%`,
      description: "Issues reported and documented by you.",
      icon: FiActivity,
    },
    {
      title: "Reports Resolved",
      value: displayValue(resolvedCount),
      growth: null,
      description: "Cases successfully completed.",
      icon: FiCheckCircle,
    },
    {
      title: "Citizens Reached",
      value: displayValue(citizensReached),
      growth: null,
      description: "Citizens who confirmed your reports.",
      icon: FiUsers,
    },
    {
      title: "Trust Score",
      value: displayPercent(trustScore),
      growth: null,
      description: "Verification and credibility rating.",
      icon: FiShield,
    },
  ];

  return (
    <section className="relative">
      {/* HEADER */}
      <div className="mb-6">
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
          Impact Analytics
        </p>

        <h2
          className={`
            mt-3
            text-3xl
            sm:text-4xl
            font-black
            tracking-[-0.05em]
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
          `}
        >
          Your Community Impact
        </h2>

        <p
          className={`
            mt-3
            max-w-2xl
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
          `}
        >
          Track how your reports,
          evidence, and civic actions are
          improving transparency and
          accountability across Nigeria.
        </p>
      </div>

      {/* STATS GRID */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.25,
              }}
              className={`
                relative
                overflow-hidden
                border
                p-5
                transition-all
                duration-300
                ${
                  darkMode
                    ? `
                      bg-[#081019]
                      border-white/10
                    `
                    : `
                      bg-white
                      border-gray-200
                    `
                }
              `}
            >
              {/* TOP BORDER */}
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

              {/* ICON */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    h-12
                    w-12
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
                      text-xl
                    "
                  />
                </div>

                {item.growth !== null && (
                  <div
                    className="
                      flex
                      items-center
                      gap-1
                      text-green-500
                      font-bold
                      text-sm
                    "
                  >
                    <FiTrendingUp />
                    {item.growth}
                  </div>
                )}
              </div>

              {/* VALUE */}
              <h3
                className={`
                  mt-5
                  text-5xl
                  font-black
                  tracking-tight
                  ${
                    darkMode
                      ? "text-white"
                      : "text-black"
                  }
                `}
              >
                {item.value}
              </h3>

              {/* TITLE */}
              <p
                className={`
                  mt-3
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

              {/* DESCRIPTION */}
              <p
                className={`
                  mt-2
                  text-sm
                  leading-relaxed
                  ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-500"
                  }
                `}
              >
                {item.description}
              </p>

              {/* ARROW */}
              <div className="mt-5 flex justify-end">
                <FiArrowUpRight
                  className="
                    text-green-500
                    text-lg
                  "
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* IMPACT BAR */}
      <div
        className={`
          mt-6
          border
          p-5
          ${
            darkMode
              ? `
                bg-[#081019]
                border-white/10
              `
              : `
                bg-white
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
              Monthly Progress
            </p>

            <h3
              className={`
                mt-2
                text-2xl
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
              `}
            >
              {rankLoading
                ? "—"
                : `${trustScore}% Civic Impact Score`}
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
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: `${rankLoading ? 0 : outperformPercent ?? trustScore}%`,
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
              {rankLoading
                ? "Calculating your standing..."
                : outperformPercent !== null
                ? `Performing better than ${outperformPercent}% of active contributors.`
                : "Submit a report to see how you compare to other contributors."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileStats;