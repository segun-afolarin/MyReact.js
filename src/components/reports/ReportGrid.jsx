import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiUsers,
  FiArrowDown,
  FiArrowUpRight,
  FiActivity,
} from "react-icons/fi";

const REQUIRED_CONFIRMATIONS = 5;

const ReportGrid = ({ darkMode, search = "", filter = "All" }) => {
  const [expandedId, setExpandedId] = useState(null);

  const reports = [
    {
      id: "#NA-1024",
      title: "Road Damage Report",
      location: "Abuja Municipal Area",
      status: "Resolved",
      date: "18 June 2026",
      score: "94%",
      confirmations: 5,
      description:
        "Large pothole affecting traffic flow and vehicle safety.",
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
      description:
        "Several street lights are not functioning at night.",
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
      description:
        "Intermittent water supply affecting households.",
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
    <div className="grid grid-cols-1 gap-6 mt-6">
      {filtered.map((report, index) => {
        const remaining =
          REQUIRED_CONFIRMATIONS - report.confirmations;

        const isOpen = expandedId === report.id;

        return (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              border
              p-6
              transition-all

              ${
                darkMode
                  ? "bg-[#0B1218] border-white/10"
                  : "bg-white border-gray-200"
              }
            `}
          >
            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* IMAGE */}
              <div className="w-full md:w-[320px] h-[220px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590674899484-d5640e854abe"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* MAIN INFO */}
              <div className="flex-1 flex flex-col justify-between">

                <div>
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-2xl font-black">
                        {report.title}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {report.id}
                      </p>
                    </div>

                    <span className="text-xs border px-3 py-1 text-green-600 border-green-500/30">
                      {report.status}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    {report.description}
                  </p>

                  <div className="flex gap-6 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <FiMapPin />
                      {report.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <FiClock />
                      {report.date}
                    </span>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="flex justify-between items-end mt-6">

                  <div>
                    <p className="text-xs text-gray-400">
                      AI Priority
                    </p>
                    <h3 className="text-3xl font-black text-green-600">
                      {report.score}
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedId(
                        isOpen ? null : report.id
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      border
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      hover:bg-green-600
                      hover:text-white
                      transition
                    "
                  >
                    {isOpen ? "Hide Details" : "View Details"}

                    {isOpen ? (
                      <FiArrowUpRight />
                    ) : (
                      <FiArrowDown />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* EXPANDED SECTION */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mt-6 border-t pt-6"
                >

                  {/* CONFIRMATION SYSTEM */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm">
                      <p className="flex items-center gap-2 text-gray-500">
                        <FiUsers />
                        Citizen Confirmations
                      </p>

                      <p className="font-semibold">
                        {report.confirmations} /{" "}
                        {REQUIRED_CONFIRMATIONS}
                      </p>
                    </div>

                    <div className="h-2 mt-3 bg-gray-200 dark:bg-white/10">
                      <div
                        className="h-full bg-green-600"
                        style={{
                          width: `${
                            (report.confirmations /
                              REQUIRED_CONFIRMATIONS) *
                            100
                          }%`,
                        }}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {remaining > 0
                        ? `${remaining} more confirmations needed before submission to government`
                        : "Ready for government submission"}
                    </p>
                  </div>

                  {/* TIMELINE */}
                  <div>
                    <h3 className="font-black text-lg">
                      Progress Timeline
                    </h3>

                    <div className="mt-3 space-y-2">
                      {report.updates.map((u, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-sm text-gray-500"
                        >
                          <div className="w-2 h-2 bg-green-500" />
                          {u}
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ReportGrid;