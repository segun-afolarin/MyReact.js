import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiShield, FiLock, FiSmartphone, FiActivity,
  FiCheckCircle, FiKey, FiEye, FiEyeOff,
  FiX, FiSave, FiMonitor,
} from "react-icons/fi";
import api from "../../api/axios";

const SettingsSecurity = ({ darkMode }) => {
  const [twoFA, setTwoFA]           = useState(true);
  const [loginAlert, setLoginAlert] = useState(true);
  const [passwordOpen, setPasswordOpen]   = useState(false);
  const [sessionsOpen, setSessionsOpen]   = useState(false);
  const [show, setShow]             = useState(false);

  // ── Password form state ───────────────────────────────────────────────────
  const [passwordForm, setPasswordForm] = useState({
    current_password:          "",
    new_password:              "",
    new_password_confirmation: "",
  });
  const [passwordError,   setPasswordError]   = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [savingPassword,  setSavingPassword]  = useState(false);

  const handlePasswordChange = async () => {
    setSavingPassword(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      await api.put("/profile/password", passwordForm);
      setPasswordSuccess("Password updated successfully.");
      setPasswordForm({
        current_password: "", new_password: "", new_password_confirmation: "",
      });
    } catch (err) {
      const errData = err.response?.data;
      if (errData?.errors) {
        const first = Object.values(errData.errors)[0];
        setPasswordError(Array.isArray(first) ? first[0] : "Validation failed.");
      } else {
        setPasswordError(errData?.message || "Something went wrong.");
      }
    } finally {
      setSavingPassword(false);
    }
  };

  const closePasswordPopup = () => {
    setPasswordOpen(false);
    setPasswordError("");
    setPasswordSuccess("");
    setPasswordForm({
      current_password: "", new_password: "", new_password_confirmation: "",
    });
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
            <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-[.25em]">
              <FiShield /> Security Center
            </div>
            <h2 className="mt-3 text-3xl font-black">Account Protection</h2>
            <p className="mt-2 opacity-60">Manage password and account safety.</p>
          </div>

          <div className="border border-green-500/30 bg-green-500/10 p-5">
            <p className="text-xs opacity-60">Security Score</p>
            <h3 className="text-4xl font-black text-green-500">98%</h3>
          </div>
        </div>

        {/* CARDS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card icon={<FiLock />}     title="Password"                 text="Update your account password"    action="Change" click={() => setPasswordOpen(true)} />
          <Card icon={<FiKey />}      title="Two Factor Authentication" text="Extra protection enabled"        toggle enabled={twoFA}       setEnabled={setTwoFA} />
          <Card icon={<FiSmartphone />} title="Login Alerts"           text="Receive security notifications"  toggle enabled={loginAlert}  setEnabled={setLoginAlert} />
          <Card icon={<FiActivity />} title="Active Sessions"          text="Manage your logged devices"      action="Manage" click={() => setSessionsOpen(true)} />
        </div>

        <div className="mt-8 border border-green-500/30 bg-green-500/10 p-5 flex gap-4 items-center">
          <div className="w-12 h-12 border border-green-500/30 flex items-center justify-center text-green-500">
            <FiCheckCircle size={25} />
          </div>
          <div>
            <h3 className="font-bold">Account Secured</h3>
            <p className="text-sm opacity-60">Your security checks are active.</p>
          </div>
        </div>

        {/* ── PASSWORD POPUP ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {passwordOpen && (
            <Popup darkMode={darkMode} close={closePasswordPopup} title="Change Password">
              <div className="space-y-4 mt-6">

                {/* Error / Success banners */}
                {passwordError && (
                  <div className="border border-red-500/30 bg-red-500/10 text-red-500 text-sm px-4 py-3">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="border border-green-500/30 bg-green-500/10 text-green-500 text-sm px-4 py-3">
                    {passwordSuccess}
                  </div>
                )}

                <Input
                  darkMode={darkMode}
                  type={show ? "text" : "password"}
                  placeholder="Current password"
                  value={passwordForm.current_password}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, current_password: e.target.value }))}
                />
                <Input
                  darkMode={darkMode}
                  type={show ? "text" : "password"}
                  placeholder="New password"
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, new_password: e.target.value }))}
                />
                <Input
                  darkMode={darkMode}
                  type={show ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={passwordForm.new_password_confirmation}
                  onChange={(e) => setPasswordForm((p) => ({ ...p, new_password_confirmation: e.target.value }))}
                />

                <button
                  onClick={() => setShow(!show)}
                  className="flex gap-2 items-center text-green-500 text-sm"
                >
                  {show ? <FiEyeOff /> : <FiEye />} Show password
                </button>

                <ActionButton onClick={handlePasswordChange} disabled={savingPassword}>
                  <FiSave />
                  {savingPassword ? "Updating..." : "Update Password"}
                </ActionButton>
              </div>
            </Popup>
          )}
        </AnimatePresence>

        {/* ── SESSIONS POPUP ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {sessionsOpen && (
            <Popup darkMode={darkMode} close={() => setSessionsOpen(false)} title="Active Sessions">
              <div className="space-y-4 mt-6">
                <SessionCard title="Windows Device"  location="Current device" time="Active now" />
                <SessionCard title="Android Device"  location="Nigeria"        time="2 hours ago" />
                <SessionCard title="Chrome Browser"  location="Web session"    time="Yesterday" />
              </div>
              <ActionButton>
                <FiShield /> Secure Account
              </ActionButton>
            </Popup>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
};

// ─── Popup ─────────────────────────────────────────────────────────────────────

const Popup = ({ children, title, close, darkMode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-green-900/30 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: .9, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: .9, opacity: 0 }}
      className={`
        w-full max-w-lg border p-7
        ${darkMode ? "bg-[#081019] border-green-500/30 text-white" : "bg-white border-green-500/30 text-black"}
        shadow-[0_0_70px_rgba(34,197,94,0.35)]
      `}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black">{title}</h2>
        <button onClick={close}><FiX /></button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);

// ─── Input ─────────────────────────────────────────────────────────────────────

const Input = ({ darkMode, type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`
      w-full border p-3 outline-none
      ${darkMode ? "bg-white/5 border-white/10" : "bg-green-500/5 border-green-500/20"}
    `}
  />
);

// ─── ActionButton ──────────────────────────────────────────────────────────────

const ActionButton = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full mt-5 bg-green-500 text-black py-3 font-bold flex justify-center gap-2 items-center disabled:opacity-50"
  >
    {children}
  </button>
);

// ─── SessionCard ───────────────────────────────────────────────────────────────

const SessionCard = ({ title, location, time }) => (
  <div className="border border-green-500/20 bg-green-500/[0.05] p-4">
    <div className="flex justify-between gap-3">
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm opacity-60">{location}</p>
      </div>
      <span className="text-xs text-green-500">{time}</span>
    </div>
  </div>
);

// ─── Card ──────────────────────────────────────────────────────────────────────

const Card = ({ icon, title, text, action, click, toggle, enabled, setEnabled }) => (
  <div className="border border-green-500/20 p-5 bg-green-500/[0.04] hover:bg-green-500/[0.1] transition">
    <div className="flex justify-between">
      <div className="text-green-500 text-2xl">{icon}</div>
      {toggle && (
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-12 h-6 border ${enabled ? "bg-green-500" : "bg-green-950"}`}
        >
          <div className={`w-4 h-4 bg-white transition ${enabled ? "ml-7" : "ml-1"}`} />
        </button>
      )}
    </div>
    <h3 className="font-bold mt-5">{title}</h3>
    <p className="text-sm opacity-60">{text}</p>
    {action && (
      <button
        onClick={click}
        className="mt-5 border border-green-500/30 px-4 py-2 text-green-500 font-bold"
      >
        {action}
      </button>
    )}
  </div>
);

export default SettingsSecurity;