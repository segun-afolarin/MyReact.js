import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiCheckCircle,
  FiActivity,
  FiUsers,
  FiArrowUpRight,
  FiShield,
} from "react-icons/fi";

const ProfileStats = ({ darkMode }) => {
  const stats = [
    {
      title: "Reports Submitted",
      value: "128",
      growth: "+24%",
      description:
        "Issues reported and documented by you.",
      icon: FiActivity,
    },

    {
      title: "Reports Resolved",
      value: "87",
      growth: "+18%",
      description:
        "Cases successfully completed.",
      icon: FiCheckCircle,
    },

    {
      title: "Citizens Reached",
      value: "12.4K",
      growth: "+41%",
      description:
        "People who viewed or engaged.",
      icon: FiUsers,
    },

    {
      title: "Trust Score",
      value: "96%",
      growth: "+6%",
      description:
        "Verification and credibility rating.",
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
              87% Civic Impact Growth
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
                  width: "87%",
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
              Performing better than
              87% of active contributors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileStats;