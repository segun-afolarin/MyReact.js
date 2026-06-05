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

const ProfileRanking = ({
  darkMode,
}) => {
  const rankings = [
    {
      title: "Abuja Ranking",
      value: "#12",
      progress: "92%",
      icon: FiMapPin,
    },

    {
      title: "FCT Ranking",
      value: "#48",
      progress: "84%",
      icon: FiTarget,
    },

    {
      title: "National Ranking",
      value: "#324",
      progress: "76%",
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
              Elite Contributor
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
              Top 2%
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
              You are performing better
              than 98% of active Nation
              Aura contributors based on
              trust, verification quality,
              and real-world impact.
            </p>

            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                text-green-500
                font-bold
              "
            >
              <FiArrowUpRight />
              Rising 18 positions this month
            </div>
          </div>
        </div>

        {/* RANKING CARDS */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            lg:grid-cols-3
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
                    {item.value}
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
                          width:
                            item.progress,
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
                      {item.progress} toward
                      next milestone
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
                96 / 100
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