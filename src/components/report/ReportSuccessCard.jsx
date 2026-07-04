import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiRadio,
  FiShield,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";

const ReportSuccessCard = ({ darkMode, onClose }) => {
  // Lock body scroll while modal is open — preserve scrollbar width to avoid layout shift
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  const trackingSteps = [
    { title: "Incident Successfully Submitted",  status: "completed" },
    { title: "AI Emergency Verification Running", status: "active"    },
    { title: "Authority Dispatch Queue",          status: "pending"   },
    { title: "Live Field Response Tracking",      status: "pending"   },
  ];

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
      />

      {/* SCROLL CONTAINER — this is what scrolls, not the body */}
      <motion.div
        key="scroll-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* CENTERING WRAPPER — min-h full so short content still centers */}
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`
              relative overflow-hidden
              w-full max-w-2xl
              border shadow-[0_40px_120px_rgba(0,0,0,0.5)]
              ${darkMode
                ? "bg-[#09131B] border-green-500/20"
                : "bg-white border-green-200"
              }
            `}
          >
            {/* GRID BG */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:45px_45px]" />

            {/* GLOWS */}
            <div className="absolute top-[-80px] right-[-80px] w-[220px] h-[220px] bg-green-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-[-120px] left-[-80px] w-[200px] h-[200px] bg-emerald-500/10 blur-3xl rounded-full" />

            {/* TOP ACCENT LINE */}
            <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-green-500 via-emerald-400 to-transparent" />

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              aria-label="Close"
              className={`
                absolute top-4 right-4 z-20
                w-10 h-10 flex items-center justify-center
                border transition-all duration-200
                ${darkMode
                  ? "border-white/10 bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/10"
                  : "border-gray-200 bg-gray-50 text-gray-500 hover:text-black hover:bg-gray-100"
                }
              `}
            >
              <FiX />
            </button>

            {/* CONTENT */}
            <div className="relative z-10 p-6 sm:p-8">

              {/* SUCCESS ICON */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute w-28 h-28 rounded-full bg-green-500/10 blur-2xl"
                />
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-5xl shadow-[0_0_60px_rgba(34,197,94,0.35)]"
                >
                  <FiCheckCircle />
                </motion.div>
              </div>

              {/* TITLE */}
              <div className="mt-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 border mb-5
                    ${darkMode
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : "bg-green-50 border-green-200 text-green-700"
                    }
                  `}
                >
                  <FiRadio />
                  <span className="text-[10px] uppercase tracking-[0.18em] font-black">
                    Emergency Report Active
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className={`
                    text-[2.1rem] sm:text-[2.7rem] leading-[0.92] tracking-[-0.06em] font-black
                    ${darkMode ? "text-white" : "text-black"}
                  `}
                >
                  Your Report Has
                  <span className="block text-green-500">Been Submitted</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  className={`
                    mt-4 max-w-lg mx-auto text-sm sm:text-base leading-relaxed
                    ${darkMode ? "text-gray-400" : "text-gray-600"}
                  `}
                >
                  The civic emergency system is now processing your report using AI
                  verification, smart location routing, and response coordination.
                </motion.p>
              </div>

              {/* REPORT ID */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.38 }}
                className={`
                  mt-7 border overflow-hidden
                  ${darkMode ? "border-white/10 bg-[#071017]" : "border-gray-200 bg-[#FAFAFA]"}
                `}
              >
                <div className="flex items-center justify-between gap-4 p-5 flex-wrap">
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.18em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      Tracking Reference
                    </p>
                    <h3 className={`mt-2 text-[1.8rem] font-black tracking-[-0.05em] ${darkMode ? "text-white" : "text-black"}`}>
                      NA-48291-XR
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-green-500 text-sm font-semibold">
                    <FiActivity />
                    Live Monitoring Enabled
                  </div>
                </div>
              </motion.div>

              {/* TRACKING FLOW */}
              <div className="mt-7">
                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                  <div>
                    <h3 className={`text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
                      Response Tracking
                    </h3>
                    <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      Real-time incident processing workflow.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-semibold">
                    <FiTrendingUp />
                    Processing
                  </div>
                </div>

                <div className="space-y-3">
                  {trackingSteps.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.42 + index * 0.1 }}
                      className={`
                        relative overflow-hidden border p-4
                        ${darkMode ? "border-white/10 bg-white/[0.03]" : "border-gray-200 bg-gray-50"}
                      `}
                    >
                      {item.status === "active" && (
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`
                              relative w-10 h-10 flex items-center justify-center text-base shrink-0
                              ${item.status === "completed"
                                ? "bg-green-500 text-white"
                                : item.status === "active"
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : darkMode
                                ? "bg-white/[0.04] text-gray-500 border border-white/10"
                                : "bg-gray-100 text-gray-400 border border-gray-200"
                              }
                            `}
                          >
                            {item.status === "completed" ? (
                              <FiCheckCircle />
                            ) : item.status === "active" ? (
                              <FiActivity />
                            ) : (
                              <FiClock />
                            )}

                            {item.status === "active" && (
                              <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-green-500/10"
                              />
                            )}
                          </div>

                          <h4 className={`text-sm font-bold ${darkMode ? "text-white" : "text-black"}`}>
                            {item.title}
                          </h4>
                        </div>

                        <div
                          className={`
                            px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] font-black shrink-0
                            ${item.status === "completed"
                              ? "bg-green-500 text-white"
                              : item.status === "active"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : darkMode
                              ? "bg-white/[0.03] border border-white/10 text-gray-500"
                              : "bg-gray-100 border border-gray-200 text-gray-500"
                            }
                          `}
                        >
                          {item.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RESPONSE DETAILS */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: FiShield, title: "AI Verification",  desc: "Automated incident analysis running."   },
                  { icon: FiMapPin, title: "Location Routing", desc: "Emergency teams locating report."       },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className={`
                        relative overflow-hidden border p-4
                        ${darkMode ? "border-white/10 bg-white/[0.03]" : "border-gray-200 bg-gray-50"}
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center text-green-400 text-xl shrink-0">
                          <Icon />
                        </div>
                        <div>
                          <h4 className={`text-base font-black ${darkMode ? "text-white" : "text-black"}`}>
                            {item.title}
                          </h4>
                          <p className={`mt-1 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* TRACK BUTTON — navigates to /reports */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="mt-7"
              >
                <Link
                  to="/reports"
                  onClick={onClose}
                  className="
                    group relative overflow-hidden w-full h-14
                    bg-green-500 hover:bg-green-400
                    text-white font-black uppercase tracking-[0.18em]
                    flex items-center justify-center gap-4
                    transition-all duration-300
                    shadow-[0_10px_40px_rgba(34,197,94,0.25)]
                  "
                >
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute inset-0 bg-white/10 skew-x-12 pointer-events-none"
                  />
                  <span className="relative z-10">Track Your Report</span>
                  <FiArrowRight className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportSuccessCard;