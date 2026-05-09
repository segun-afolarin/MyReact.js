import { motion } from "framer-motion";

import {
  FiMapPin,
  FiNavigation,
  FiAlertCircle,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

const mapLocations = [
  {
    city: "Lagos",
    issue: "Flooded Road",
    status: "In Progress",
    top: "30%",
    left: "28%",
    color: "bg-yellow-400",
    icon: <FiAlertCircle />,
  },

  {
    city: "Abuja",
    issue: "Streetlight Failure",
    status: "Resolved",
    top: "38%",
    left: "52%",
    color: "bg-green-500",
    icon: <FiCheckCircle />,
  },

  {
    city: "Port Harcourt",
    issue: "Road Damage",
    status: "Under Review",
    top: "67%",
    left: "35%",
    color: "bg-red-500",
    icon: <FiNavigation />,
  },

  {
    city: "Kano",
    issue: "Electricity Issue",
    status: "Reported",
    top: "18%",
    left: "64%",
    color: "bg-blue-500",
    icon: <FiMapPin />,
  },
];

const DashboardMap = ({
  darkMode,
}) => {
  return (
    <section className="mt-8 sm:mt-10">
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-end
        lg:justify-between
        gap-4
        mb-6
        "
      >
        <div>
          <p
            className={`
            text-xs
            uppercase
            tracking-[0.25em]
            font-semibold
            ${
              darkMode
                ? "text-green-400"
                : "text-green-700"
            }
            `}
          >
            Nationwide Monitoring
          </p>

          <h2
            className={`
            mt-2
            text-3xl
            sm:text-4xl
            font-black
            tracking-[-0.04em]
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Live Infrastructure Map
          </h2>
        </div>

        {/* STATUS */}
        <div
          className={`
          flex
          items-center
          gap-3
          border
          px-4
          py-3
          text-sm
          font-medium
          ${
            darkMode
              ? `
                bg-[#101820]
                border-white/10
                text-gray-300
              `
              : `
                bg-white
                border-gray-200
                text-gray-600
              `
          }
          `}
        >
          <span
            className="
            w-2.5
            h-2.5
            bg-green-500
            animate-pulse
            "
          />

          Live Monitoring Active
        </div>
      </div>

      {/* MAP CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
        }}
        className={`
        relative
        overflow-hidden
        border
        h-[520px]
        sm:h-[580px]
        ${
          darkMode
            ? `
              bg-[#0B1218]
              border-white/10
            `
            : `
              bg-white
              border-gray-200
            `
        }
        `}
      >
        {/* TOP GLOW */}
        <div
          className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[450px]
          h-[450px]
          bg-green-500/10
          blur-3xl
          "
        />

        {/* MAP */}
        <iframe
          title="Nigeria Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=2.6%2C4.2%2C15.5%2C14.0&layer=mapnik"

          className="
          absolute
          inset-0
          w-full
          h-full
          grayscale
          contrast-125
          brightness-[0.85]
          "
        />

        {/* DARK OVERLAY */}
        <div
          className={`
          absolute
          inset-0
          pointer-events-none
          ${
            darkMode
              ? "bg-[#071017]/55"
              : "bg-white/20"
          }
          `}
        />

        {/* TOP ANALYTICS */}
        <div
          className="
          absolute
          top-4
          left-4
          right-4
          z-20
          grid
          grid-cols-2
          md:grid-cols-4
          gap-3
          "
        >
          {[
            {
              label: "Active Reports",
              value: "1,284",
            },

            {
              label: "Resolved",
              value: "892",
            },

            {
              label: "Communities",
              value: "48",
            },

            {
              label: "Response Rate",
              value: "91%",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -3,
              }}
              className={`
              border
              backdrop-blur-2xl
              p-4
              ${
                darkMode
                  ? `
                    bg-black/30
                    border-white/10
                  `
                  : `
                    bg-white/80
                    border-white/40
                  `
              }
              `}
            >
              <p
                className={`
                text-xs
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
                `}
              >
                {item.label}
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
                {item.value}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* LIVE PINS */}
        {mapLocations.map(
          (location, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.12,
              }}
              className="
              absolute
              z-30
              "
              style={{
                top: location.top,
                left: location.left,
              }}
            >
              {/* PULSE */}
              <motion.div
                animate={{
                  scale: [1, 1.7, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className={`
                absolute
                inset-0
                rounded-full
                ${location.color}
                blur-md
                `}
              />

              {/* PIN */}
              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -2,
                }}
                className={`
                relative
                w-14
                h-14
                ${location.color}
                text-white
                flex
                items-center
                justify-center
                text-xl
                shadow-[0_15px_40px_rgba(0,0,0,0.35)]
                cursor-pointer
                `}
              >
                {location.icon}
              </motion.div>

              {/* CARD */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileHover={{
                  opacity: 1,
                  y: 0,
                }}
                className={`
                absolute
                top-16
                left-1/2
                -translate-x-1/2
                min-w-[220px]
                border
                backdrop-blur-2xl
                p-4
                ${
                  darkMode
                    ? `
                      bg-[#081018]/95
                      border-white/10
                    `
                    : `
                      bg-white/95
                      border-gray-200
                    `
                }
                `}
              >
                <div
                  className="
                  flex
                  items-start
                  justify-between
                  gap-3
                  "
                >
                  <div>
                    <h4
                      className={`
                      font-bold
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      {location.city}
                    </h4>

                    <p
                      className={`
                      mt-1
                      text-sm
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                      }
                      `}
                    >
                      {location.issue}
                    </p>
                  </div>

                  <div
                    className="
                    flex
                    items-center
                    gap-1
                    text-green-500
                    text-xs
                    font-semibold
                    "
                  >
                    <FiTrendingUp />

                    Live
                  </div>
                </div>

                {/* STATUS */}
                <div
                  className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  bg-green-500/10
                  text-green-500
                  text-xs
                  font-semibold
                  "
                >
                  <span
                    className="
                    w-2
                    h-2
                    bg-green-500
                    "
                  />

                  {location.status}
                </div>
              </motion.div>
            </motion.div>
          )
        )}

        {/* BOTTOM PANEL */}
        <div
          className="
          absolute
          bottom-4
          left-4
          right-4
          z-20
          "
        >
          <motion.div
            whileHover={{
              y: -2,
            }}
            className={`
            border
            backdrop-blur-2xl
            p-4
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            ${
              darkMode
                ? `
                  bg-black/30
                  border-white/10
                `
                : `
                  bg-white/80
                  border-white/40
                `
            }
            `}
          >
            <div>
              <h3
                className={`
                text-lg
                font-bold
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                AI Infrastructure Monitoring
              </h3>

              <p
                className={`
                mt-1
                text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
                `}
              >
                Flood-related reports increased
                by 18% in Abuja this week.
              </p>
            </div>

            <button
              className="
              h-12
              px-5
              bg-gradient-to-r
              from-green-600
              to-emerald-700
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-3
              "
            >
              Open Analytics

              <FiNavigation />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default DashboardMap;