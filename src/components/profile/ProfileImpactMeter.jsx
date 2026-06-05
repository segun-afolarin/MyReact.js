import { motion } from "framer-motion";

import {
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";

const ProfileImpactMeter = ({
  darkMode,
}) => {
  const metrics = [
    {
      icon: FiUsers,
      value: "1,247",
      label: "Lives Impacted",
      description:
        "Citizens positively affected by resolved community reports.",
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
      value: "14",
      label: "Projects Triggered",
      description:
        "Verified reports that led to action and intervention.",
    },

    {
      icon: FiShield,
      value: "96%",
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
              92
            </h3>

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
                text-green-500
                font-bold
                text-sm
              "
            >
              <FiArrowUpRight />
              +18% this month
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
                width: "92%",
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