import { motion } from "framer-motion";

import {
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiImage,
  FiTrendingUp,
} from "react-icons/fi";

const REQUIRED_CONFIRMATIONS = 5;

const ReportGrid = ({ darkMode, search = "", filter = "All" }) => {
  const reports = [
    {
      id: "#NA-1024",
      title: "Road Damage Report",
      location: "Abuja Municipal Area",
      status: "Resolved",
      date: "18 June 2026",
      score: "94%",
      confirmations: 5,
      image:
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1200&auto=format&fit=crop",
      description:
        "Large pothole affecting traffic flow and vehicle safety.",
      fields: ["Road Damage", "High Priority", "Photo Evidence Uploaded"],
      updates: ["Submitted", "Verified", "Sent to government", "Resolved"],
    },
    {
      id: "#NA-1025",
      title: "Street Light Failure",
      location: "Wuse District",
      status: "In Progress",
      date: "16 June 2026",
      score: "81%",
      confirmations: 3,
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
      description:
        "Several street lights are not functioning at night.",
      fields: ["Public Safety", "Night Visibility", "Community Alert"],
      updates: ["Submitted", "Under review", "Authority assigned"],
    },
    {
      id: "#NA-1026",
      title: "Water Supply Issue",
      location: "Garki Area",
      status: "Pending",
      date: "12 June 2026",
      score: "72%",
      confirmations: 1,
      image:
        "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?q=80&w=1200&auto=format&fit=crop",
      description:
        "Intermittent water supply affecting households.",
      fields: ["Water Supply", "Household Impact"],
      updates: ["Submitted"],
    },
  ];

  const filtered = reports.filter((r) => {
    const matchSearch = r.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter = filter === "All" ? true : r.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5 mt-6">
      {filtered.map((report, index) => {
        const remaining = REQUIRED_CONFIRMATIONS - report.confirmations;
        const progress = Math.round(
          (report.confirmations / REQUIRED_CONFIRMATIONS) * 100
        );

        return (
          <motion.div
            key={report.id}
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
                ? "bg-[#09131B] border-white/10"
                : "bg-white border-gray-200"
            }
            `}
          >
            <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr]">
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
                    {report.id}
                  </div>

                  <h3 className="text-white text-2xl font-black leading-tight">
                    {report.title}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-7">
                {/* TOP */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-4">
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
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-green-50 border-green-200 text-green-700"
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
                        ${darkMode ? "text-gray-400" : "text-gray-600"}
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
                      ${darkMode ? "text-gray-400" : "text-gray-600"}
                      `}
                    >
                      {report.description}
                    </p>
                  </div>

                  {/* AI PRIORITY STAT BOX — same shape as UserReportsQueue's
                     "Community Support" box, repurposed for this card's
                     own AI score data point */}
                  <div
                    className={`
                    border
                    p-4
                    min-w-[180px]
                    ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10"
                        : "bg-[#FAFAFA] border-gray-200"
                    }
                    `}
                  >
                    <p
                      className={`
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      flex
                      items-center
                      gap-2
                      ${darkMode ? "text-gray-500" : "text-gray-400"}
                      `}
                    >
                      <FiTrendingUp />
                      AI Priority
                    </p>

                    <h4
                      className={`
                      mt-3
                      text-4xl
                      font-black
                      text-green-600
                      `}
                    >
                      {report.score}
                    </h4>

                    <p className="mt-2 text-green-500 text-sm font-semibold">
                      Confidence Score
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
                    ${darkMode ? "text-white" : "text-black"}
                    `}
                  >
                    Report Details
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
                            ? "bg-white/[0.03] border-white/10 text-gray-300"
                            : "bg-[#FAFAFA] border-gray-200 text-gray-700"
                        }
                        `}
                      >
                        {field}
                      </div>
                    ))}
                  </div>
                </div>

                {/* PROGRESS — citizen confirmations on YOUR report */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      ${darkMode ? "text-gray-400" : "text-gray-600"}
                      `}
                    >
                      <FiUsers />
                      Citizen Confirmations
                    </div>

                    <span className="text-green-500 font-bold text-sm">
                      {report.confirmations}/{REQUIRED_CONFIRMATIONS}
                    </span>
                  </div>

                  <div
                    className={`
                    relative
                    h-3
                    overflow-hidden
                    ${darkMode ? "bg-white/10" : "bg-gray-200"}
                    `}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                      className="h-full bg-green-500 relative overflow-hidden"
                    >
                      <motion.div
                        animate={{ x: ["-100%", "250%"] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute top-0 left-0 w-20 h-full bg-white/30 skew-x-12"
                      />
                    </motion.div>
                  </div>

                  <p
                    className={`
                    text-xs
                    mt-2
                    ${darkMode ? "text-gray-500" : "text-gray-500"}
                    `}
                  >
                    {remaining > 0
                      ? `${remaining} more confirmations needed before submission to government`
                      : "Ready for government submission"}
                  </p>
                </div>

                {/* TIMELINE */}
                <div className="mt-8">
                  <h4
                    className={`
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    mb-4
                    ${darkMode ? "text-white" : "text-black"}
                    `}
                  >
                    Progress Timeline
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {report.updates.map((u, i) => (
                      <div
                        key={i}
                        className={`
                        flex
                        items-center
                        gap-2
                        px-4
                        py-3
                        border
                        text-sm
                        font-medium
                        ${
                          darkMode
                            ? "bg-white/[0.03] border-white/10 text-gray-300"
                            : "bg-[#FAFAFA] border-gray-200 text-gray-700"
                        }
                        `}
                      >
                        <div className="w-2 h-2 bg-green-500" />
                        {u}
                      </div>
                    ))}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div
                    className={`
                    flex
                    items-center
                    gap-2
                    text-sm
                    ${darkMode ? "text-gray-500" : "text-gray-500"}
                    `}
                  >
                    <FiClock />
                    {report.date}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ReportGrid;