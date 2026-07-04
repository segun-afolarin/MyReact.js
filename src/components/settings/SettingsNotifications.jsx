import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FiBell,
  FiAlertTriangle,
  FiCheckCircle,
  FiMail,
  FiSmartphone,
  FiMapPin,
  FiShield,
  FiVolume2,
  FiPlay,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";

// ── Sound options — replace src with your own audio files ────────────────────
const SOUND_OPTIONS = [
  { id: "default", label: "Default",  src: "/sounds/default.wav" },
  { id: "chime",   label: "Chime",    src: "/sounds/chime.wav"   },
  { id: "alert",   label: "Alert",    src: "/sounds/alert.wav"   },
  { id: "bell",    label: "Bell",     src: "/sounds/bell.wav"    },
  { id: "silent",  label: "Silent",   src: null                  },
];

const SettingsNotifications = ({ darkMode }) => {
  const { user, setUser } = useAuth();

  const [alerts,  setAlerts]  = useState(true);
  const [reports, setReports] = useState(true);
  const [updates, setUpdates] = useState(true);
  const [email,   setEmail]   = useState(false);

  // ── Initialize directly from user so refresh doesn't reset to "default" ──
  const [selectedSound, setSelectedSound] = useState(
    () => user?.notification_sound || "default"
  );
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const audioRef = useRef(null);

  // ── Re-sync if user loads async (e.g. after page refresh) ─────────────────
  useEffect(() => {
    if (user?.notification_sound) {
      setSelectedSound(user.notification_sound);
    }
  }, [user?.notification_sound]);

  // ── Preview a sound without saving ────────────────────────────────────────
  const previewSound = (sound) => {
    if (!sound.src) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(sound.src);
    audioRef.current.play().catch(() => {});
  };

  // ── Select + save to backend ──────────────────────────────────────────────
  const handleSelectSound = async (sound) => {
    setSelectedSound(sound.id);
    previewSound(sound);

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await api.put("/profile/notification-sound", {
        notification_sound: sound.id,
      });

      const updatedUser = data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSuccess("Notification sound saved.");
      setTimeout(() => setSuccess(""), 2500);
    } catch (err) {
      console.error("Notification sound update failed:", err.response?.data);
      const errData = err.response?.data;
      setError(errData?.message || "Failed to save notification sound.");
      // Revert to the last saved sound on failure
      setSelectedSound(user?.notification_sound || "default");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      className={`
        relative overflow-hidden border p-5 sm:p-8
        ${darkMode ? "bg-[#081019] border-white/10 text-white" : "bg-white border-gray-200 text-black shadow-xl"}
      `}
    >
      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-green-500/20 blur-[120px]" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex gap-2 items-center text-green-500 text-xs uppercase tracking-[.25em] font-bold">
              <FiBell /> Notifications
            </div>
            <h2 className="mt-3 text-3xl font-black">Citizen Alerts</h2>
            <p className="mt-2 opacity-60">Control what updates you receive.</p>
          </div>

          <div className="border border-green-500/30 bg-green-500/10 p-5">
            <p className="text-xs opacity-60">Active Alerts</p>
            <h3 className="text-4xl font-black text-green-500">4</h3>
          </div>
        </div>

        {/* SETTINGS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <NotifyCard icon={<FiAlertTriangle />} title="Emergency Alerts"    text="Receive urgent community issues"     enabled={alerts}  setEnabled={setAlerts}  />
          <NotifyCard icon={<FiCheckCircle />}   title="Report Updates"      text="Get progress on submitted reports"   enabled={reports} setEnabled={setReports} />
          <NotifyCard icon={<FiMapPin />}        title="Area Updates"        text="Nearby infrastructure changes"       enabled={updates} setEnabled={setUpdates} />
          <NotifyCard icon={<FiMail />}          title="Email Notifications" text="Receive important emails"            enabled={email}   setEnabled={setEmail}   />
        </div>

        {/* ── NOTIFICATION SOUND ───────────────────────────────────────────── */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <FiVolume2 className="text-green-500 text-xl" />
            <h3 className="font-bold text-lg">Notification Sound</h3>
            {saving && (
              <span className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-3 h-3 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                Saving...
              </span>
            )}
          </div>

          {error && (
            <div className="mb-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 border border-green-500/30 bg-green-500/10 text-green-500 text-sm px-4 py-3">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SOUND_OPTIONS.map((sound) => {
              const isSelected = selectedSound === sound.id;
              return (
                <button
                  key={sound.id}
                  onClick={() => handleSelectSound(sound)}
                  disabled={saving}
                  className={`
                    border p-4 flex items-center justify-between gap-3 text-left transition-colors disabled:opacity-50
                    ${isSelected
                      ? "border-green-500 bg-green-500/10"
                      : darkMode
                        ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                        : "border-gray-200 bg-[#FAFAFA] hover:bg-gray-50"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-9 h-9 flex items-center justify-center shrink-0
                      ${isSelected ? "bg-green-500 text-white" : darkMode ? "bg-white/10 text-gray-300" : "bg-gray-200 text-gray-600"}
                    `}>
                      {isSelected ? <FiCheckCircle size={16} /> : <FiVolume2 size={16} />}
                    </div>
                    <span className="font-semibold text-sm">{sound.label}</span>
                  </div>

                  {sound.src && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        previewSound(sound);
                      }}
                      className="text-green-500 hover:text-green-400 p-1"
                      title="Preview sound"
                    >
                      <FiPlay size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECURITY MESSAGE */}
        <div className="mt-8 border border-green-500/30 bg-green-500/10 p-5 flex gap-4 items-center">
          <div className="w-12 h-12 border border-green-500/30 flex items-center justify-center text-green-500">
            <FiShield size={24} />
          </div>
          <div>
            <h3 className="font-bold">Stay Connected</h3>
            <p className="text-sm opacity-60">
              Notifications help you respond faster and stay involved.
            </p>
          </div>
        </div>

      </div>
    </motion.section>
  );
};

const NotifyCard = ({ icon, title, text, enabled, setEnabled }) => (
  <div className="border border-green-500/20 bg-green-500/[0.04] p-5 hover:bg-green-500/[0.1] transition">
    <div className="flex justify-between items-start">
      <div className="text-green-500 text-2xl">{icon}</div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 border border-green-500/30 ${enabled ? "bg-green-500" : "bg-green-950"}`}
      >
        <div className={`w-4 h-4 bg-white transition ${enabled ? "ml-7" : "ml-1"}`} />
      </button>
    </div>
    <h3 className="font-bold mt-5">{title}</h3>
    <p className="text-sm opacity-60 mt-1">{text}</p>
  </div>
);

export default SettingsNotifications;