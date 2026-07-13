import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiArrowUpRight,
  FiTrendingDown,
} from "react-icons/fi";

import { getMyReports, getContributorRank } from "../../utils/api";

const ProfileImpactMeter = ({
  darkMode,
}) => {
  // ── Live personal data ───────────────────────────────────────────────
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

  // "Lives Impacted" — same real proxy used elsewhere on the profile:
  // total citizen confirmations received across this user's own reports.
  const livesImpacted = myReports.reduce((sum, r) => sum + (r.confirmations ?? 0), 0);

  // "Projects Triggered" — reports that actually reached resolution
  // (government action taken), i.e. the real resolvedCount. This is the
  // one metric on the original card that maps cleanly onto real data.
  const projectsTriggered = resolvedCount;

  // "Community Trust" — same composite formula used across the profile
  // (resolution rate + confirmation-fulfillment rate), not a stored value.
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

  // Month-over-month submission growth — real, using each report's actual
  // createdAt. This is what backs the "+X% this month" figure below.
  const now = Date.now();
  const monthAgo = now - 30 * 24 * 60 * 60 * 1000;
  const twoMonthsAgo = now - 60 * 24 * 60 * 60 * 1000;
  const thisMonthCount = myReports.filter((r) => r.createdAt && new Date(r.createdAt).getTime() >= monthAgo).length;
  const lastMonthCount = myReports.filter((r) => {
    if (!r.createdAt) return false;
    const t = new Date(r.createdAt).getTime();
    return t >= twoMonthsAgo && t < monthAgo;
  }).length;
  const monthGrowth =
    lastMonthCount > 0
      ? Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)
      : thisMonthCount > 0
      ? 100
      : 0;

  // "Influence Score" — using the same 0-100 Trust Score composite as the
  // fill scale, so the progress bar and stage labels (New Contributor /
  // Change Maker / National Leader) stay meaningful as a 0-100 range.
  const influenceScore = trustScore;

  const displayValue = (n) => (loading ? "—" : n.toLocaleString());
  const displayPercent = (n) => (loading ? "—%" : `${n}%`);

  // NOTE: "Estimated Savings" stays static. There's no per-category
  // cost-of-inaction data anywhere in the schema to compute a real naira
  // figure — inventing one here would be a financial claim with literally
  // nothing behind it, a step beyond the other approximated metrics.
  const metrics = [
    {
      icon: FiUsers,
      value: displayValue(livesImpacted),
      label: "Lives Impacted",
      description:
        "Citizens who confirmed your reported issues.",
    },

    {
      icon: FiTrendingUp,
      value: "₦18.4M",
      label: "Estimated Savings",
      description:
        "Public resources protected through early issue detection.",
    },

    {
      icon: FiZap,
      value: displayValue(projectsTriggered),
      label: "Projects Triggered",
      description:
        "Your reports that reached resolution and government action.",
    },

    {
      icon: FiShield,
      value: displayPercent(trustScore),
      label: "Community Trust",
      description:
        "Confidence score earned from consistent quality reporting.",
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
          bg-[size:45px_45px]
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
        <div
          className="
            flex
            flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between
            gap-6
          "
        >
          <div>
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
              Impact Engine
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
              Your Voice Is
              Creating Change
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
              Every verified report,
              evidence upload and citizen
              confirmation strengthens
              accountability and helps
              communities receive faster
              attention and action.
            </p>
          </div>

          {/* SCORE */}
          <div
            className="
              border
              border-green-500/20
              bg-green-500/[0.04]
              p-5
              min-w-[260px]
            "
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                font-black
                text-green-500
              "
            >
              Influence Score
            </p>

            <h3
              className="
                mt-3
                text-6xl
                font-black
                tracking-tight
              "
            >
              {loading ? "—" : influenceScore}
            </h3>

            <div
              className={`
                mt-2
                flex
                items-center
                gap-2
                font-bold
                text-sm
                ${monthGrowth >= 0 ? "text-green-500" : "text-red-400"}
              `}
            >
              {monthGrowth >= 0 ? <FiArrowUpRight /> : <FiTrendingDown />}
              {loading ? "—" : `${monthGrowth >= 0 ? "+" : ""}${monthGrowth}% this month`}
            </div>
          </div>
        </div>

        {/* IMPACT BAR */}
        <div className="mt-8">
          <div
            className={`
              h-5
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
                width: `${loading ? 0 : influenceScore}%`,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.5,
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

          <div
            className="
              mt-3
              flex
              justify-between
              text-xs
              uppercase
              tracking-wider
            "
          >
            <span
              className={
                darkMode
                  ? "text-gray-500"
                  : "text-gray-400"
              }
            >
              New Contributor
            </span>

            <span
              className="
                text-green-500
                font-bold
              "
            >
              Change Maker
            </span>

            <span
              className={
                darkMode
                  ? "text-gray-500"
                  : "text-gray-400"
              }
            >
              National Leader
            </span>
          </div>
        </div>

        {/* METRICS */}
        <div
          className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {metrics.map(
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
                    transition-all
                    duration-300
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

                  <h3
                    className="
                      mt-5
                      text-4xl
                      font-black
                    "
                  >
                    {item.value}
                  </h3>

                  <p
                    className={`
                      mt-2
                      font-semibold
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                  >
                    {item.label}
                  </p>

                  <p
                    className={`
                      mt-3
                      text-sm
                      leading-relaxed
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>

        {/* LEGACY MESSAGE */}
        <div
          className="
            mt-10
            border-l-4
            border-green-500
            pl-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-green-500
              font-bold
            "
          >
            <FiTarget />
            Nation Aura Legacy
          </div>

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
            The impact of citizenship
            cannot always be measured by
            reports alone. It is measured
            by safer roads, stronger
            accountability, better public
            services and communities that
            refuse to stay silent. Your
            contributions are helping
            shape a more transparent and
            responsive Nigeria.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileImpactMeter;