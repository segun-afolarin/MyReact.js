import { motion } from "framer-motion";

import {
  FiAlertTriangle,
  FiBell,
  FiSend,
  FiMapPin,
  FiShield,
  FiActivity,
  FiWifi,
} from "react-icons/fi";

const AlertsCommandCenter = ({ darkMode }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        <FiShield className="text-green-500 text-xl animate-pulse" />

        <div>
          <h2 className="font-bold text-lg">Citizen Control Center</h2>
          <p className="text-xs opacity-60">
            Your personal safety and community awareness hub
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-green-500">
          <FiWifi />
          Connected
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT - QUICK ACTIONS */}
        <div
          className={`
            border p-5 space-y-4
            ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-gray-50 border-gray-200"
            }
          `}
        >
          <h3 className="font-bold text-lg">Quick Actions</h3>

          {/* ACTION 1 */}
          <button className="w-full flex items-center gap-3 p-4 border hover:scale-[1.01] transition">
            <FiAlertTriangle className="text-red-500" />
            <span className="font-semibold">Report Emergency Alert</span>
          </button>

          {/* ACTION 2 */}
          <button className="w-full flex items-center gap-3 p-4 border hover:scale-[1.01] transition">
            <FiMapPin className="text-blue-500" />
            <span className="font-semibold">View Nearby Alerts</span>
          </button>

          {/* ACTION 3 */}
          <button className="w-full flex items-center gap-3 p-4 border hover:scale-[1.01] transition">
            <FiBell className="text-yellow-500" />
            <span className="font-semibold">Subscribe to Area Updates</span>
          </button>
        </div>

        {/* RIGHT - LIVE STATUS */}
        <div
          className={`
            border p-5 space-y-5
            ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-gray-50 border-gray-200"
            }
          `}
        >
          <h3 className="font-bold text-lg">Your Safety Status</h3>

          {/* STATUS CARD */}
          <div className="p-4 border flex items-center justify-between">
            <div>
              <p className="text-xs opacity-60">Current Area Status</p>
              <h4 className="text-xl font-bold text-green-500">
                Stable
              </h4>
            </div>

            <FiShield className="text-green-500 text-2xl" />
          </div>

          {/* LIVE ACTIVITY */}
          <div className="p-4 border">
            <div className="flex items-center gap-2 mb-3">
              <FiActivity className="text-green-500 animate-pulse" />
              <p className="text-sm font-semibold">Live Activity</p>
            </div>

            <p className="text-xs opacity-70 leading-relaxed">
              No critical incidents detected within your immediate location
              radius. Minor civic reports are being monitored in nearby
              zones.
            </p>
          </div>

          {/* SAFETY TIP */}
          <div
            className={`
              p-4 border
              ${
                darkMode
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-green-50 border-green-200"
              }
            `}
          >
            <div className="flex items-center gap-2 mb-2">
              <FiSend className="text-green-500" />
              <p className="font-semibold text-sm">Citizen Tip</p>
            </div>

            <p className="text-xs opacity-70">
              Always verify alerts before sharing. Your reports help improve
              community response accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER STRIP */}
      <div
        className={`
          px-5 py-4 border-t flex items-center gap-3 text-xs
          ${
            darkMode
              ? "border-white/10 bg-white/5 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }
        `}
      >
        <FiShield className="text-green-500 animate-pulse" />

        <span>
          This is your personal civic awareness hub. You are in control of
          what you report, track, and receive.
        </span>
      </div>
    </motion.section>
  );
};

export default AlertsCommandCenter;