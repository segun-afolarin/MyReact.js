import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import {
  FiAlertTriangle,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiRadio,
  FiUpload,
  FiX,
} from "react-icons/fi";

const AlertsEmergency = ({ darkMode }) => {
  const [emergencies, setEmergencies] = useState([
    {
      id: 1,
      title: "Flooding reported after heavy rain",
      location: "Gwange, Maiduguri",
      time: "Just now",
      image:
        "https://images.unsplash.com/photo-1527766833261-b09c3163a791",
      confirmed: false,
      severity: "high",
    },
    {
      id: 2,
      title: "Road accident blocking main route",
      location: "Baga Road",
      time: "6 mins ago",
      image:
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a",
      confirmed: false,
      severity: "high",
    },
    {
      id: 3,
      title: "Power outage affecting multiple houses",
      location: "Bolori Ward",
      time: "12 mins ago",
      image:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
      confirmed: false,
      severity: "medium",
    },
  ]);

  const [activeReport, setActiveReport] = useState(null);
  const [file, setFile] = useState(null);

  const openConfirm = (report) => {
    setActiveReport(report);
  };

  const closeModal = () => {
    setActiveReport(null);
    setFile(null);
  };

  const confirmWithEvidence = () => {
    if (!file) return;

    setEmergencies((prev) =>
      prev.map((item) =>
        item.id === activeReport.id
          ? { ...item, confirmed: true }
          : item
      )
    );

    closeModal();
  };

  const getBorder = (severity) => {
    if (severity === "high") return "border-red-500/40";
    return "border-yellow-500/40";
  };

  return (
    <section
      className={`
        relative border overflow-hidden
        ${
          darkMode
            ? "bg-[#0B1218] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* HEADER */}
      <div
        className={`
          flex items-center gap-3 px-5 py-4 border-b
          ${
            darkMode
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }
        `}
      >
        <FiRadio className="text-red-500 animate-pulse text-xl" />

        <div>
          <h2 className="font-bold text-lg">Live Emergency Feed</h2>
          <p className="text-xs opacity-60">
            Community reports requiring verification
          </p>
        </div>

        <div className="ml-auto text-xs text-red-500">LIVE</div>
      </div>

      {/* FEED */}
      <div className="p-5 space-y-5">
        {emergencies.map((item) => (
          <motion.div
            key={item.id}
            className={`
              border p-4 ${getBorder(item.severity)}
              ${darkMode ? "bg-white/5" : "bg-gray-50"}
            `}
          >
            {/* IMAGE */}
            <div className="w-full h-48 overflow-hidden border mb-4">
              <img
                src={item.image}
                alt="incident"
                className="w-full h-full object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="flex justify-between">
              <div>
                <h3
                  className={`font-bold ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </h3>

                <div className="flex gap-3 text-xs opacity-70 mt-2">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {item.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiClock /> {item.time}
                  </span>
                </div>
              </div>

              <span className="text-xs text-red-500 border border-red-500/30 px-2 py-1">
                {item.severity.toUpperCase()}
              </span>
            </div>

            {/* ACTION */}
            <div className="mt-4 flex justify-between items-center">
              {item.confirmed ? (
                <div className="flex items-center gap-2 text-green-500 text-sm">
                  <FiCheckCircle />
                  Verified by citizen
                </div>
              ) : (
                <button
                  onClick={() => openConfirm(item)}
                  className="
                    flex items-center gap-2 px-4 py-2 text-sm
                    border border-green-500 text-green-500
                    hover:bg-green-500 hover:text-white
                    transition
                  "
                >
                  <FiCheckCircle />
                  Confirm with Evidence
                </button>
              )}

              <span className="text-xs opacity-50">
                Evidence required for verification
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`
                w-[90%] max-w-md p-5 border
                ${
                  darkMode
                    ? "bg-[#0B1218] border-white/10"
                    : "bg-white border-gray-200"
                }
              `}
            >
              {/* CLOSE */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Upload Evidence</h3>

                <button onClick={closeModal}>
                  <FiX />
                </button>
              </div>

              {/* INFO */}
              <p className="text-sm opacity-70 mb-3">
                Confirming: {activeReport.title}
              </p>

              {/* UPLOAD */}
              <label className="flex flex-col items-center justify-center border p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition">
                <FiUpload className="text-2xl text-green-500 mb-2" />
                <span className="text-sm">
                  Click to upload photo/video evidence
                </span>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                />
              </label>

              {/* FILE STATUS */}
              {file && (
                <p className="text-xs mt-2 text-green-500">
                  Selected: {file.name}
                </p>
              )}

              {/* ACTION */}
              <button
                onClick={confirmWithEvidence}
                disabled={!file}
                className={`
                  w-full mt-4 py-2 text-sm font-bold
                  ${
                    file
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }
                `}
              >
                Submit Verification
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AlertsEmergency;