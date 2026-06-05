import { motion } from "framer-motion";

import {
  FiAward,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

const ProfileLegacy = ({
  darkMode,
}) => {
  const legacyStats = [
    {
      icon: FiUsers,
      value: "24,800+",
      label: "Citizens Impacted",
    },

    {
      icon: FiCheckCircle,
      value: "126",
      label: "Issues Resolved",
    },

    {
      icon: FiShield,
      value: "98%",
      label: "Trust Rating",
    },

    {
      icon: FiTrendingUp,
      value: "94",
      label: "Aura Score",
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
      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      <div
        className="
          absolute
          left-[-180px]
          bottom-[-180px]
          w-[400px]
          h-[400px]
          bg-green-500/10
          blur-[150px]
        "
      />

      <div
        className="
          relative
          z-10
          p-5
          sm:p-7
          lg:p-10
        "
      >
        {/* HEADER */}
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                bg-green-500/10
                border
                border-green-500/20
                text-green-500
                font-black
                uppercase
                tracking-[0.25em]
                text-xs
              "
            >
              <FiAward />
              Citizen Legacy
            </div>

            <h2
              className={`
                mt-6
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-black
                tracking-[-0.07em]
                leading-[0.9]
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
              `}
            >
              The Change
              <br />
              You Leave Behind
            </h2>

            <p
              className={`
                mt-6
                text-base
                sm:text-lg
                lg:text-xl
                leading-relaxed
                max-w-4xl
                mx-auto
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
              `}
            >
              Every verified report,
              every resolved issue,
              every citizen reached and
              every community improved
              becomes part of a permanent
              civic legacy that future
              generations can build upon.
            </p>
          </motion.div>
        </div>

        {/* LEGACY METRICS */}
        <div
          className="
            mt-14
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {legacyStats.map(
            (item, index) => {
              const Icon =
                item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className={`
                    border
                    p-5
                    text-center
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
                      mx-auto
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
                      mt-4
                      text-3xl
                      sm:text-4xl
                      font-black
                    "
                  >
                    {item.value}
                  </h3>

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
                    {item.label}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>

        {/* LEGACY QUOTE */}
        <div
          className={`
            mt-12
            border
            p-8
            lg:p-10
            text-center
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
          <FiTarget
            className="
              mx-auto
              text-green-500
              text-4xl
            "
          />

          <blockquote
            className={`
              mt-6
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-black
              leading-tight
              tracking-tight
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            A stronger nation is built
            one verified action at a time.
          </blockquote>

          <p
            className={`
              mt-5
              max-w-3xl
              mx-auto
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }
            `}
          >
            Your contributions represent
            more than reports. They are
            documented acts of civic
            responsibility that improve
            transparency, accountability,
            and quality of life.
          </p>
        </div>

        {/* FINAL MESSAGE */}
        <div
          className="
            mt-12
            max-w-5xl
            mx-auto
            text-center
          "
        >
          <h3
            className={`
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              tracking-tight
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            Nation Aura Remembers.
          </h3>

          <p
            className={`
              mt-5
              text-base
              sm:text-lg
              leading-relaxed
              max-w-3xl
              mx-auto
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Long after a report is closed,
            the impact remains. The roads
            repaired, schools improved,
            communities protected and
            lives affected become part of
            a lasting record of service to
            the nation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileLegacy;