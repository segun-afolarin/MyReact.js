import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiTarget,
  FiActivity,
  FiUsers,
  FiAward,
  FiArrowUpRight,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";

import { getMyReports, getContributorRank } from "../../utils/api";

// Round-number rank tiers we advertise as "milestones" in the UI.
const RANK_MILESTONES = [1000, 500, 250, 100, 50, 25, 10, 1];

const ProfileInsights = ({ darkMode }) => {
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

  // ── Real numbers, straight from ReportController::mine() ──
  const totalReports = myReports.length;
  const resolvedCount = myReports.filter((r) => r.status === "Resolved").length;
  const citizensReached = myReports.reduce((sum, r) => sum + (r.confirmations ?? 0), 0);

  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;

  const thisWeekCount = myReports.filter(
    (r) => r.createdAt && new Date(r.createdAt).getTime() >= weekAgo
  ).length;
  const lastWeekCount = myReports.filter((r) => {
    if (!r.createdAt) return false;
    const t = new Date(r.createdAt).getTime();
    return t >= twoWeeksAgo && t < weekAgo;
  }).length;

  // Only real, computable metric — no fabricated "37%" anywhere.
  const submissionGrowth =
    lastWeekCount > 0
      ? Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100)
      : thisWeekCount > 0
      ? 100
      : null; // null = genuinely no basis for a growth claim yet

  // ── Real numbers, straight from ReportController::rank() ──
  const rank = rankData?.rank ?? null;
  const totalContributors = rankData?.totalContributors ?? 0;
  const topPercent = rankData?.topPercent ?? null;

  // Next achievable rank tier — the largest milestone still above current rank.
  const nextMilestone =
    rank !== null ? RANK_MILESTONES.find((m) => m < rank) ?? 1 : null;

  const milestoneProgress =
    rank !== null && nextMilestone !== null && totalContributors > nextMilestone
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((totalContributors - rank) / (totalContributors - nextMilestone)) * 100
            )
          )
        )
      : rank !== null && nextMilestone !== null && rank <= nextMilestone
      ? 100
      : 0;

  const insights = [
    {
      icon: FiActivity,
      title: "Reports This Week",
      value: loading ? "—" : `${thisWeekCount}`,
      description:
        submissionGrowth === null
          ? "Submit reports weekly to start tracking your trend."
          : `${submissionGrowth >= 0 ? "+" : ""}${submissionGrowth}% vs last week.`,
    },
    {
      icon: FiCheckCircle,
      title: "Issues Resolved",
      value: loading ? "—" : `${resolvedCount}`,
      description: "Total reports you've helped fully resolve.",
    },
    {
      icon: FiUsers,
      title: "Citizens Reached",
      value: loading ? "—" : `${citizensReached}`,
      description: "Citizens who confirmed your reports with evidence.",
    },
    {
      icon: FiTrendingUp,
      title: "National Standing",
      value: rankLoading ? "—" : rank !== null ? `#${rank}` : "Unranked",
      description:
        rankLoading || topPercent === null
          ? "Submit a report to get ranked nationwide."
          : `Top ${topPercent}% of ${totalContributors} contributors.`,
    },
  ];

  // Honest headline: real numbers only, no invented "% better" claim.
  const headline =
    rankLoading || rank === null
      ? "Submit Your First Report To Start Building A Score"
      : topPercent !== null
      ? `You're In The Top ${topPercent}% Nationally`
      : `Ranked #${rank} Of ${totalContributors} Contributors`;

  const headlineSub =
    submissionGrowth !== null
      ? `Your reporting volume is ${submissionGrowth >= 0 ? "up" : "down"} ${Math.abs(
          submissionGrowth
        )}% versus last week, based on ${totalReports} total report${
          totalReports === 1 ? "" : "s"
        } submitted so far.`
      : `You've submitted ${totalReports} report${
          totalReports === 1 ? "" : "s"
        } so far. Keep going to unlock weekly trend tracking.`;

  // Data-driven observation instead of a fabricated one — compares your two
  // real strengths (resolution rate vs. community confirmation volume).
  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;
  const aiObservation =
    totalReports === 0
      ? "Submit your first report with clear photo evidence to start generating personalized insights here."
      : resolutionRate >= 50
      ? `Your strongest area is follow-through — ${resolvedCount} of ${totalReports} reports have reached full resolution. Keep documenting evidence clearly to maintain this rate.`
      : `Your strongest area is initial reporting volume and community reach (${citizensReached} citizen confirmations so far). Focus next on reports that reach full resolution to boost your overall score.`;

  return (
    <section
      className={`relative overflow-hidden border ${
        darkMode ? "bg-[#081019] border-white/10" : "bg-white border-gray-200"
      }`}
    >
      <div
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:55px_55px]"
      />
      <div className="absolute left-[-120px] top-[-120px] w-[320px] h-[320px] bg-green-500/10 blur-[120px]" />

      <div className="relative z-10 p-5 sm:p-7 lg:p-8">
        {/* HEADER */}
        <div className="max-w-4xl">
          <p
            className={`text-[11px] uppercase tracking-[0.35em] font-black ${
              darkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            Personal Intelligence
          </p>
          <h2
            className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.06em] ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Performance Insights
          </h2>
          <p className={`mt-4 max-w-3xl leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Real analysis of your reporting activity, community engagement, and civic impact — pulled directly from your report history.
          </p>
        </div>

        {/* MAIN INSIGHT */}
        <div
          className={`mt-8 border overflow-hidden ${
            darkMode ? "bg-green-500/[0.05] border-green-500/20" : "bg-green-50 border-green-200"
          }`}
        >
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-2 text-green-500 uppercase tracking-[0.25em] text-xs font-black">
              <FiZap />
              Live Analysis
            </div>
            <h3 className="mt-4 text-3xl lg:text-5xl font-black tracking-tight">{headline}</h3>
            <p className={`mt-4 max-w-3xl leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {headlineSub}
            </p>
            <div className="mt-6 flex items-center gap-2 text-green-500 font-bold">
              <FiArrowUpRight />
              {rank !== null && rank <= 10 ? "Top 10 Contributor" : "Keep Reporting To Climb"}
            </div>
          </div>
        </div>

        {/* INSIGHT CARDS */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {insights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className={`border p-5 ${
                  darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#F8FAF9] border-gray-200"
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Icon className="text-green-500 text-xl" />
                </div>
                <h3 className="mt-5 text-4xl font-black">{item.value}</h3>
                <p className={`mt-2 font-semibold ${darkMode ? "text-white" : "text-black"}`}>{item.title}</p>
                <p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* NEXT MILESTONE */}
        <div className={`mt-8 border p-6 ${darkMode ? "bg-white/[0.03] border-white/10" : "bg-[#F8FAF9] border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl bg-green-500/10 flex items-center justify-center">
              <FiTarget className="text-green-500 text-2xl" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-green-500 font-black">Next Milestone</p>
              <h3 className="text-2xl sm:text-3xl font-black">
                {rank === null
                  ? "Get Your First Rank"
                  : nextMilestone === 1
                  ? "National #1"
                  : `National Top ${nextMilestone}`}
              </h3>
            </div>
          </div>

          <div className="mt-6">
            <div className={`h-4 overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${rankLoading ? 0 : milestoneProgress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600"
              />
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Progress</span>
              <span className="text-green-500 font-bold">
                {rankLoading ? "—" : rank === null ? "0%" : `${milestoneProgress}%`}
              </span>
            </div>
          </div>

          <p className={`mt-4 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {rank === null
              ? "Submit your first report to enter the national ranking."
              : "Continue submitting high-quality reports and helping communities verify issues to unlock your next recognition milestone."}
          </p>
        </div>

        {/* AI OBSERVATION */}
        <div className="mt-10 border-l-4 border-green-500 pl-5">
          <div className="flex items-center gap-2 text-green-500 font-bold">
            <FiAward />
            AI Observation
          </div>
          <p
            className={`mt-3 text-base sm:text-lg leading-relaxed max-w-4xl ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {aiObservation}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInsights;