import { motion } from "framer-motion";

import {
  FiClock,
  FiMapPin,
  FiArrowUpRight,
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
  FiImage,
} from "react-icons/fi";

const reports = [
  {
    id: "NR-2041",
    title: "Collapsed Road Section",
    location: "Sabon Gari, Kano",
    status: "Awaiting Community Verification",
    confirmations: 18,
    progress: 72,
    date: "Submitted 2 hours ago",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    description:
      "Large potholes and damaged road surface causing traffic delays and accidents during rainfall.",
    fields: [
      "Road Damage",
      "High Priority",
      "Photo Evidence Uploaded",
      "AI Location Detected",
    ],
  },

  {
    id: "NR-1982",
    title: "Blocked Drainage System",
    location: "Nassarawa, Kano",
    status: "Community Review Active",
    confirmations: 31,
    progress: 88,
    date: "Submitted Yesterday",
    image:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=1200&auto=format&fit=crop",
    description:
      "Drainage filled with waste materials causing water overflow and environmental hazards.",
    fields: [
      "Flood Risk",
      "Drain Blockage",
      "Voice Note Attached",
      "Emergency Flag Enabled",
    ],
  },
];

const UserReportsQueue = ({ darkMode }) => {
  return (
    <section className="mt-10">
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-end
        lg:justify-between
        gap-6
        mb-7
        "
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
            text-[10px]
            uppercase
            tracking-[0.3em]
            font-bold
            mb-4
            ${
              darkMode
                ? "text-green-400"
                : "text-green-700"
            }
            `}
          >
            Your Civic Submissions
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-black
            tracking-[-0.05em]
            leading-[1]
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Reports Waiting
            <span className="block text-green-500 mt-1">
              For Community Confirmation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`
            mt-5
            text-sm
            sm:text-base
            leading-relaxed
            max-w-xl
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
            `}
          >
            Your reports are currently
            being validated by nearby
            citizens before escalation
            to government agencies.
          </motion.p>
        </div>

        {/* LIVE STATUS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`
          border
          px-5
          py-4
          min-w-[260px]
          ${
            darkMode
              ? `
                bg-[#09131B]
                border-white/10
              `
              : `
                bg-white
                border-gray-200
              `
          }
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className={`
                text-[10px]
                uppercase
                tracking-[0.25em]
                ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                `}
              >
                Verification Queue
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
                49
              </h3>
            </div>

            <div
              className="
              w-14
              h-14
              bg-green-500/10
              border
              border-green-500/20
              flex
              items-center
              justify-center
              text-green-500
              text-2xl
              "
            >
              <FiTrendingUp />
            </div>
          </div>
        </motion.div>
      </div>

      {/* REPORT LIST */}
      <div className="space-y-5">
        {reports.map((report, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`
            group
            border
            overflow-hidden
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-[#09131B]
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
              grid
              grid-cols-1
              xl:grid-cols-[340px_1fr]
              "
            >
              {/* IMAGE */}
              <div className="relative h-[260px] xl:h-full overflow-hidden">
                <img
                  src={report.image}
                  alt={report.title}
                  className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                  "
                />

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                  "
                />

                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <div
                    className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    bg-green-500
                    text-white
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    mb-4
                    "
                  >
                    <FiImage />
                    Evidence Uploaded
                  </div>

                  <h3 className="text-white text-2xl font-black leading-tight">
                    {report.title}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-7">
                {/* TOP */}
                <div
                  className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
                  gap-5
                  "
                >
                  <div>
                    <div
                      className="
                      flex
                      flex-wrap
                      items-center
                      gap-4
                      "
                    >
                      <div
                        className={`
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        border
                        ${
                          darkMode
                            ? `
                              bg-green-500/10
                              border-green-500/20
                              text-green-400
                            `
                            : `
                              bg-green-50
                              border-green-200
                              text-green-700
                            `
                        }
                        `}
                      >
                        <FiCheckCircle />
                        {report.status}
                      </div>

                      <div
                        className={`
                        flex
                        items-center
                        gap-2
                        text-sm
                        ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                        `}
                      >
                        <FiMapPin />
                        {report.location}
                      </div>
                    </div>

                    <p
                      className={`
                      mt-5
                      max-w-2xl
                      text-sm
                      leading-relaxed
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                      `}
                    >
                      {report.description}
                    </p>
                  </div>

                  <div
                    className={`
                    border
                    p-4
                    min-w-[180px]
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                        `
                        : `
                          bg-[#FAFAFA]
                          border-gray-200
                        `
                    }
                    `}
                  >
                    <p
                      className={`
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      ${
                        darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                      `}
                    >
                      Community Support
                    </p>

                    <h4
                      className={`
                      mt-3
                      text-4xl
                      font-black
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      {report.confirmations}
                    </h4>

                    <p className="mt-2 text-green-500 text-sm font-semibold">
                      Citizens Confirmed
                    </p>
                  </div>
                </div>

                {/* FORM DATA */}
                <div className="mt-7">
                  <h4
                    className={`
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    mb-4
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    Submitted Form Details
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {report.fields.map((field, i) => (
                      <div
                        key={i}
                        className={`
                        px-4
                        py-3
                        border
                        text-sm
                        font-medium
                        ${
                          darkMode
                            ? `
                              bg-white/[0.03]
                              border-white/10
                              text-gray-300
                            `
                            : `
                              bg-[#FAFAFA]
                              border-gray-200
                              text-gray-700
                            `
                        }
                        `}
                      >
                        {field}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                      `}
                    >
                      <FiUsers />
                      Verification Progress
                    </div>

                    <span className="text-green-500 font-bold text-sm">
                      {report.progress}%
                    </span>
                  </div>

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
                        width: `${report.progress}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-green-500"
                    />
                  </div>
                </div>

                {/* FOOTER */}
                <div
                  className="
                  mt-8
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-5
                  "
                >
                  <div
                    className={`
                    flex
                    items-center
                    gap-2
                    text-sm
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }
                    `}
                  >
                    <FiClock />
                    {report.date}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                    h-14
                    px-6
                    bg-green-500
                    hover:bg-green-400
                    transition-all
                    duration-300
                    text-white
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    flex
                    items-center
                    justify-center
                    gap-3
                    w-full
                    sm:w-auto
                    "
                  >
                    Track Response

                    <FiArrowUpRight />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserReportsQueue;