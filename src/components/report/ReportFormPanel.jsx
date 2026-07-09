import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { submitReport } from "../../utils/api";
import AIRejectionModal from "./AIRejectionModal";

import {
  FiAlertTriangle,
  FiAlertCircle,
  FiArrowRight,
  FiCheck,
  FiCrosshair,
  FiImage,
  FiMapPin,
  FiUploadCloud,
  FiX,
  FiMic,
  FiMicOff,
  FiClock,
  FiShield,
  FiNavigation,
  FiCheckCircle,
  FiLock,
  FiLoader,
} from "react-icons/fi";

// ─── Validation rules ─────────────────────────────────────────────────────────
const RULES = {
  category:    { label: "Incident Type",        message: "Please select an incident type."              },
  title:       { label: "Incident Title",        message: "Please enter a title for the incident."       },
  description: { label: "Detailed Description",  message: "Please describe the incident in detail."      },
  address:     { label: "Address / Landmark",    message: "Please enter or confirm the incident address." },
  images:      { label: "Evidence Images",       message: "Please upload at least one evidence image."   },
};

// ─── Inline field error ───────────────────────────────────────────────────────
const FieldError = ({ message, darkMode }) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="mt-2 flex items-center gap-2 text-xs text-red-500 font-semibold"
      >
        <FiAlertCircle size={12} />
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

// ─── Component ────────────────────────────────────────────────────────────────
const ReportFormPanel = ({ darkMode, submitted, setSubmitted }) => {
  const location = useLocation();
  const { user } = useAuth();

  const preSelectedCategory = location.state?.selectedCategory || "";

  const [category,    setCategory]    = useState(preSelectedCategory);
  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [address,     setAddress]     = useState("");
  const [detecting,   setDetecting]   = useState(false);
  const [autoDetected,setAutoDetected]= useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [files,       setFiles]       = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Emergency flag — emergency reports require only 3 confirmations instead of 5
  const [isEmergency, setIsEmergency] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // AI rejection popup — separate from inline field/server errors
  const [aiRejectionMessage, setAiRejectionMessage] = useState(null);

  // Which fields have been touched (attempted submit OR user interacted)
  const [touched, setTouched] = useState({
    category: !!preSelectedCategory,
    title: false,
    description: false,
    address: false,
    images: false,
  });

  // Attempted submit — reveals ALL errors at once
  const [submitAttempted, setSubmitAttempted] = useState(false);

  /* SPEECH SUPPORT CHECK */
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setSpeechSupported(true);
    }
  }, []);

  /* AUTO-DETECT LOCATION FROM BACKEND */
  useEffect(() => {
    const userState = user?.state?.trim();
    if (userState) {
      setAddress(`${userState}, Nigeria`);
      setAutoDetected(true);
      setTouched((prev) => ({ ...prev, address: true }));
    }
  }, [user]);

  // ── Derived validity ──────────────────────────────────────────────────────
  const validity = {
    category:    category.trim().length > 0,
    title:       title.trim().length > 0,
    description: description.trim().length > 0,
    address:     address.trim().length > 0,
    images:      files.length > 0,
  };

  const allValid  = Object.values(validity).every(Boolean);
  const totalDone = Object.values(validity).filter(Boolean).length;
  const totalFields = Object.keys(validity).length; // 5

  // Show error for a field when: submit was attempted OR the field was touched AND it's invalid
  const showError = (field) =>
    (submitAttempted || touched[field]) && !validity[field];

  const touch = (field) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  // ── Categories ────────────────────────────────────────────────────────────
  const categories = [
    { name: "Flooding",       color: "from-cyan-500 to-blue-500"     },
    { name: "Bad Roads",      color: "from-orange-500 to-amber-500"  },
    { name: "Drain Blockage", color: "from-emerald-500 to-green-500" },
    { name: "Power Failure",  color: "from-yellow-500 to-orange-500" },
    { name: "Fire Outbreak",  color: "from-red-500 to-orange-500"    },
    { name: "Accident",       color: "from-pink-500 to-rose-500"     },
  ];

  // ── Voice input ───────────────────────────────────────────────────────────
  const handleVoiceRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
      touch("description");
    };

    recognition.onend  = () => setIsRecording(false);
    recognition.onerror= () => setIsRecording(false);
  };

  // ── GPS detect ────────────────────────────────────────────────────────────
  const handleLocationDetection = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setDetecting(false);
        touch("address");
      },
      () => setDetecting(false)
    );
  };

  // ── Image upload ──────────────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    const slots    = 3 - files.length;
    const limited  = uploaded.slice(0, slots);
    const updated  = [...files, ...limited];
    setFiles(updated);
    touch("images");
  };

  const removeImage = (i) => {
    const updated = files.filter((_, idx) => idx !== i);
    setFiles(updated);
    touch("images");
  };

  const getUploadText = () => {
    const rem = 3 - files.length;
    if (rem <= 0) return "Maximum Images Added";
    if (rem === 1) return "Add One More Image";
    if (rem === 2) return "Add Two Images";
    return "Add Up To Three Images";
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setSubmitError(null);
    setAiRejectionMessage(null);

    // Touch all fields so every error becomes visible
    setTouched({ category: true, title: true, description: true, address: true, images: true });

    if (!allValid) {
      // Scroll to first error
      const firstInvalid = Object.keys(validity).find((k) => !validity[k]);
      const el = document.getElementById(`field-${firstInvalid}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("is_emergency", isEmergency ? "1" : "0");
      if (coordinates) {
        formData.append("latitude", coordinates.lat);
        formData.append("longitude", coordinates.lng);
      }
      // Backend expects images[] — matches the "images" => ["array", ...] validation rule
      files.forEach((file) => formData.append("images[]", file));

      await submitReport(formData);
      setSubmitted(true);
    } catch (err) {
      const isAiMismatch = err.response?.data?.ai_mismatch === true;
      const serverMessage =
        err.response?.data?.message || err.message || "Failed to submit report. Please try again.";

      if (isAiMismatch) {
        setAiRejectionMessage(serverMessage);
      } else {
        setSubmitError(serverMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ── Check indicator ───────────────────────────────────────────────────────
  const renderCheck = (field) => {
    const valid   = validity[field];
    const hasError= showError(field);
    return (
      <div
        className={`
          w-7 h-7 border flex items-center justify-center transition-all duration-300
          ${valid
            ? "bg-green-500 border-green-500 text-white"
            : hasError
            ? "bg-red-500/10 border-red-500 text-red-500"
            : darkMode
            ? "border-white/10 text-gray-500"
            : "border-gray-300 text-gray-400"
          }
        `}
      >
        {valid ? <FiCheck size={14} /> : hasError ? <FiAlertCircle size={13} /> : <FiCheck size={14} />}
      </div>
    );
  };

  // ── Progress bar ──────────────────────────────────────────────────────────
  const progressPct = Math.round((totalDone / totalFields) * 100);

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        noValidate
        className={`
          relative overflow-hidden border
          shadow-[0_20px_60px_rgba(34,197,94,0.08)]
          ${darkMode ? "bg-[#09131B] border-white/10" : "bg-white border-gray-200"}
        `}
      >
        {/* GRID BG */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-[-120px] right-[-120px] w-[260px] h-[260px] bg-green-500/10 blur-3xl rounded-full" />
        <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-green-500 via-emerald-400 to-transparent" />

        <div className="relative z-10 p-5 sm:p-7 lg:p-8">

          {/* ── PROGRESS BAR ─────────────────────────────────────────────── */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-black uppercase tracking-[0.18em] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Form Completion
              </span>
              <span className={`text-sm font-black ${allValid ? "text-green-500" : darkMode ? "text-white" : "text-black"}`}>
                {totalDone} / {totalFields} fields
              </span>
            </div>
            <div className={`h-2 w-full overflow-hidden ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
              <motion.div
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
                className={`h-full transition-colors duration-300 ${
                  allValid ? "bg-green-500" : progressPct >= 60 ? "bg-emerald-500" : "bg-green-500/60"
                }`}
              />
            </div>

            {/* Missing fields summary — shown only after submit attempt */}
            <AnimatePresence>
              {submitAttempted && !allValid && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 border border-red-500/30 bg-red-500/10 p-4"
                >
                  <p className="text-red-500 text-xs font-black uppercase tracking-[0.15em] mb-2 flex items-center gap-2">
                    <FiAlertCircle /> Complete These Fields To Submit
                  </p>
                  <ul className="space-y-1">
                    {Object.keys(validity)
                      .filter((k) => !validity[k])
                      .map((k) => (
                        <li key={k} className="text-xs text-red-400 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                          {RULES[k].label}
                        </li>
                      ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Server-side submission error (non-AI errors) */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-center gap-3 border border-red-500/30 bg-red-500/10 p-4"
                >
                  <FiAlertCircle className="text-red-500 shrink-0" />
                  <p className="text-sm text-red-400 font-semibold">{submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── TOP INFO CARDS ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: FiShield,     title: "Trusted Reports", sub: "Verified by community"    },
              { icon: FiClock,      title: "Faster Response", sub: "Real-time emergency flow" },
              { icon: FiNavigation, title: "GPS Tracking",    sub: "Accurate location system" },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className={`border p-4 ${darkMode ? "border-white/10 bg-white/[0.03]" : "border-gray-200 bg-gray-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-green-100 text-green-600 flex items-center justify-center text-lg">
                      <Icon />
                    </div>
                    <div>
                      <h4 className={`text-sm font-black ${darkMode ? "text-white" : "text-black"}`}>{card.title}</h4>
                      <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{card.sub}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CATEGORY ─────────────────────────────────────────────────── */}
          <div id="field-category">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
              <div>
                <h3 className={`text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
                  Select Incident Type
                  <span className="text-red-500 ml-1">*</span>
                </h3>
                <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Choose the category that best describes the emergency.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {renderCheck("category")}
                {category && (
                  <div className="px-4 py-2 bg-green-500 text-white text-xs font-black uppercase tracking-[0.18em]">
                    {category} Selected
                  </div>
                )}
              </div>
            </div>

            {!preSelectedCategory && (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {categories.map((item, index) => (
                  <motion.button
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    key={index}
                    onClick={() => {
                      setCategory(item.name);
                      touch("category");
                    }}
                    className={`
                      relative overflow-hidden border p-5 text-left transition-all duration-300
                      ${category === item.name
                        ? "border-green-500 bg-green-500/10 shadow-[0_10px_30px_rgba(34,197,94,0.15)]"
                        : showError("category")
                        ? darkMode
                          ? "border-red-500/40 bg-white/[0.03]"
                          : "border-red-300 bg-red-50/50"
                        : darkMode
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-gray-200 bg-gray-50"
                      }
                    `}
                  >
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${item.color}`} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-black/20 flex items-center justify-center text-white text-xl">
                        <FiAlertTriangle />
                      </div>
                      <h4 className={`mt-5 text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
                        {item.name}
                      </h4>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            <FieldError message={showError("category") ? RULES.category.message : ""} darkMode={darkMode} />
          </div>

          {/* ── EMERGENCY TOGGLE ─────────────────────────────────────────── */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setIsEmergency((prev) => !prev)}
              className={`
                w-full flex items-center justify-between gap-4 border p-5 text-left transition-all duration-300
                ${isEmergency
                  ? "border-red-500 bg-red-500/10"
                  : darkMode
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-gray-200 bg-gray-50"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-11 h-11 flex items-center justify-center text-lg
                    ${isEmergency
                      ? "bg-red-500 text-white"
                      : darkMode
                      ? "bg-white/[0.05] text-gray-400"
                      : "bg-gray-200 text-gray-500"
                    }
                  `}
                >
                  <FiAlertTriangle />
                </div>
                <div>
                  <h4 className={`text-sm font-black ${darkMode ? "text-white" : "text-black"}`}>
                    Mark As Emergency
                  </h4>
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Emergency reports need only 3 citizen confirmations instead of 5
                  </p>
                </div>
              </div>
              <div
                className={`
                  w-12 h-7 rounded-full flex items-center px-1 transition-all duration-300
                  ${isEmergency
                    ? "bg-red-500 justify-end"
                    : darkMode
                    ? "bg-white/10 justify-start"
                    : "bg-gray-300 justify-start"
                  }
                `}
              >
                <div className="w-5 h-5 rounded-full bg-white" />
              </div>
            </button>
          </div>

          {/* ── FORM FIELDS ───────────────────────────────────────────────── */}
          <div className="mt-10 grid grid-cols-1 gap-6">

            {/* TITLE */}
            <div id="field-title">
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className={`text-sm font-bold uppercase tracking-[0.14em] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Incident Title <span className="text-red-500">*</span>
                </label>
                {renderCheck("title")}
              </div>
              <input
                type="text"
                placeholder="Example: Major flood blocking traffic near city junction"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  touch("title");
                }}
                onBlur={() => touch("title")}
                className={`
                  w-full h-16 px-5 border outline-none text-sm transition-all duration-300
                  ${showError("title")
                    ? "border-red-500 bg-red-500/5"
                    : validity.title
                    ? "border-green-500/40"
                    : darkMode
                    ? "bg-white/[0.03] border-white/10 text-white focus:border-green-500/40"
                    : "bg-white border-gray-200 focus:border-green-400"
                  }
                  ${darkMode ? "text-white" : "text-black"}
                `}
              />
              <FieldError message={showError("title") ? RULES.title.message : ""} darkMode={darkMode} />
            </div>

            {/* DESCRIPTION */}
            <div id="field-description">
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className={`text-sm font-bold uppercase tracking-[0.14em] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  {speechSupported && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.04 }}
                      type="button"
                      onClick={handleVoiceRecording}
                      className={`
                        w-11 h-11 flex items-center justify-center transition-all duration-300
                        ${isRecording ? "bg-red-500 text-white animate-pulse" : "bg-green-500 text-white"}
                      `}
                    >
                      {isRecording ? <FiMicOff /> : <FiMic />}
                    </motion.button>
                  )}
                  {renderCheck("description")}
                </div>
              </div>
              <textarea
                rows={7}
                placeholder="Describe what happened, nearby landmarks, affected areas, or visible damage..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  touch("description");
                }}
                onBlur={() => touch("description")}
                className={`
                  w-full p-5 border outline-none resize-none text-sm transition-all duration-300
                  ${showError("description")
                    ? "border-red-500 bg-red-500/5"
                    : validity.description
                    ? "border-green-500/40"
                    : darkMode
                    ? "bg-white/[0.03] border-white/10 text-white focus:border-green-500/40"
                    : "bg-white border-gray-200 focus:border-green-400"
                  }
                  ${darkMode ? "text-white" : "text-black"}
                `}
              />
              {speechSupported && (
                <p className={`mt-3 text-xs flex items-center gap-2 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                  <FiMic className="text-green-500" />
                  Tap microphone to speak instead of typing
                </p>
              )}
              <FieldError message={showError("description") ? RULES.description.message : ""} darkMode={darkMode} />
            </div>

            {/* ADDRESS */}
            <div id="field-address">
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className={`text-sm font-bold uppercase tracking-[0.14em] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Address / Landmark <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  {autoDetected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-[0.15em]"
                    >
                      <FiCheckCircle size={11} />
                      Auto-Detected
                    </motion.div>
                  )}
                  {renderCheck("address")}
                </div>
              </div>

              <div className="relative">
                <FiMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-green-500" />
                <input
                  type="text"
                  placeholder="Enter incident location"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAutoDetected(false);
                    touch("address");
                  }}
                  onBlur={() => touch("address")}
                  className={`
                    w-full h-16 pl-14 pr-4 border outline-none text-sm transition-all duration-300
                    ${showError("address")
                      ? "border-red-500 bg-red-500/5"
                      : validity.address
                      ? "border-green-500/40"
                      : darkMode
                      ? "bg-white/[0.03] border-white/10 text-white focus:border-green-500/40"
                      : "bg-white border-gray-200 focus:border-green-400"
                    }
                    ${darkMode ? "text-white" : "text-black"}
                  `}
                />
              </div>

              {autoDetected && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 text-xs flex items-center gap-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                >
                  <FiCheckCircle className="text-green-500" size={11} />
                  Pre-filled from your account location — you can edit this anytime
                </motion.p>
              )}
              <FieldError message={showError("address") ? RULES.address.message : ""} darkMode={darkMode} />
            </div>

            {/* GPS DETECT */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleLocationDetection}
              className="
                relative overflow-hidden w-full h-16
                bg-green-500 hover:bg-green-400
                text-white font-black uppercase tracking-[0.14em]
                flex items-center justify-center gap-3
                transition-all duration-300
              "
            >
              <FiCrosshair />
              <span>{detecting ? "Detecting..." : "Detect Precise GPS Location"}</span>
            </motion.button>

            {coordinates && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-green-500/20 bg-green-500/10 p-5"
              >
                <h3 className={`text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
                  Location Connected
                </h3>
                <div className="mt-3 flex flex-wrap gap-5 text-sm text-green-500">
                  <span>LAT: {coordinates.lat.toFixed(6)}</span>
                  <span>LNG: {coordinates.lng.toFixed(6)}</span>
                </div>
              </motion.div>
            )}

            {/* UPLOAD EVIDENCE */}
            <div id="field-images">
              <div className="flex items-center justify-between gap-3 mb-3">
                <label className={`text-sm font-bold uppercase tracking-[0.14em] ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Upload Evidence <span className="text-red-500">*</span>
                </label>
                {renderCheck("images")}
              </div>

              <label
                className={`
                  relative overflow-hidden border-2 border-dashed p-8
                  flex flex-col items-center justify-center text-center cursor-pointer
                  transition-all duration-300
                  ${showError("images")
                    ? "border-red-500 bg-red-500/5"
                    : files.length > 0
                    ? darkMode ? "border-green-500/40 bg-green-500/5" : "border-green-400 bg-green-50"
                    : darkMode ? "border-white/10 bg-white/[0.03]" : "border-gray-300 bg-gray-50"
                  }
                `}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={files.length >= 3}
                  className="hidden"
                />
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${showError("images") ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                  <FiUploadCloud />
                </div>
                <h3 className={`mt-6 text-2xl font-black ${darkMode ? "text-white" : "text-black"}`}>
                  {getUploadText()}
                </h3>
                <p className={`mt-3 max-w-lg text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Upload clear images to help emergency teams verify incidents faster and improve response accuracy.
                </p>
              </label>

              <FieldError message={showError("images") ? RULES.images.message : ""} darkMode={darkMode} />

              {files.length > 0 && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`
                        relative overflow-hidden border p-4
                        ${darkMode ? "border-white/10 bg-white/[0.03]" : "border-gray-200 bg-gray-50"}
                      `}
                    >
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-400 text-white flex items-center justify-center transition-all duration-300"
                      >
                        <FiX />
                      </button>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center text-green-400 text-xl shrink-0">
                          <FiImage />
                        </div>
                        <div className="min-w-0">
                          <p className={`truncate text-sm font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                            {file.name}
                          </p>
                          <p className={`mt-1 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            Evidence Attached
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* ── SUBMIT ────────────────────────────────────────────────────── */}
            <div className="mt-4">
              {/* Locked state hint when not all fields complete */}
              <AnimatePresence>
                {!allValid && submitAttempted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-center gap-3 px-5 py-4 border border-red-500/30 bg-red-500/10"
                  >
                    <FiLock className="text-red-500 shrink-0" />
                    <p className="text-sm text-red-400 font-semibold">
                      All fields are required before you can submit. Please complete the highlighted fields above.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={allValid && !submitting ? { scale: 1.01 } : {}}
                whileTap={allValid && !submitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={submitting}
                className={`
                  relative overflow-hidden w-full h-16
                  font-black uppercase tracking-[0.18em]
                  flex items-center justify-center gap-4
                  transition-all duration-300
                  ${allValid && !submitting
                    ? "bg-green-500 hover:bg-green-400 text-white shadow-[0_20px_50px_rgba(34,197,94,0.25)] cursor-pointer"
                    : darkMode
                    ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                {submitting ? (
                  <>
                    <FiLoader className="relative z-10 text-lg animate-spin" />
                    <span className="relative z-10">Submitting Report...</span>
                  </>
                ) : allValid ? (
                  <>
                    <span className="relative z-10">Submit Emergency Report</span>
                    <FiArrowRight className="relative z-10 text-lg" />
                  </>
                ) : (
                  <>
                    <FiLock className="relative z-10 text-lg" />
                    <span className="relative z-10">
                      Complete All Fields To Submit ({totalDone}/{totalFields})
                    </span>
                  </>
                )}
              </motion.button>

              {/* Field checklist summary below button */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.keys(RULES).map((field) => (
                  <div
                    key={field}
                    className={`
                      flex items-center gap-2 px-3 py-2 border text-xs font-semibold
                      transition-all duration-300
                      ${validity[field]
                        ? "border-green-500/30 bg-green-500/10 text-green-500"
                        : showError(field)
                        ? "border-red-500/30 bg-red-500/10 text-red-400"
                        : darkMode
                        ? "border-white/10 text-gray-500"
                        : "border-gray-200 text-gray-400"
                      }
                    `}
                  >
                    {validity[field]
                      ? <FiCheckCircle size={11} />
                      : showError(field)
                      ? <FiAlertCircle size={11} />
                      : <FiCheck size={11} />
                    }
                    <span className="truncate">{RULES[field].label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.form>

      <AIRejectionModal
        darkMode={darkMode}
        message={aiRejectionMessage}
        onClose={() => setAiRejectionMessage(null)}
      />
    </>
  );
};

export default ReportFormPanel; 