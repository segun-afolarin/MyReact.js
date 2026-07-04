import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiBell, FiMoon, FiSun, FiMenu, FiSearch, FiX,
  FiAlertTriangle, FiCheckCircle, FiInfo, FiZap,
  FiChevronRight, FiTrash2,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import logo from "/images/logo.png";

const SOUND_MAP = {
  default: "/sounds/default.mp3",
  chime:   "/sounds/chime.mp3",
  alert:   "/sounds/alert.mp3",
  bell:    "/sounds/bell.wav",
  silent:  null,
};

// How often we poll the backend for new notifications.
const POLL_INTERVAL_MS = 20000;

const TYPE_CFG = {
  alert: {
    Icon: FiAlertTriangle, iconBg: "bg-red-500", stripe: "bg-red-500", dot: "bg-red-400",
    badgeDark: "bg-red-500/15 text-red-400 border-red-500/25", badgeLight: "bg-red-50 text-red-600 border-red-200", label: "Alert",
  },
  success: {
    Icon: FiCheckCircle, iconBg: "bg-green-500", stripe: "bg-green-500", dot: "bg-green-400",
    badgeDark: "bg-green-500/15 text-green-400 border-green-500/25", badgeLight: "bg-green-50 text-green-600 border-green-200", label: "Verified",
  },
  info: {
    Icon: FiInfo, iconBg: "bg-blue-500", stripe: "bg-blue-500", dot: "bg-blue-400",
    badgeDark: "bg-blue-500/15 text-blue-400 border-blue-500/25", badgeLight: "bg-blue-50 text-blue-600 border-blue-200", label: "Info",
  },
  warning: {
    Icon: FiZap, iconBg: "bg-amber-500", stripe: "bg-amber-500", dot: "bg-amber-400",
    badgeDark: "bg-amber-500/15 text-amber-400 border-amber-500/25", badgeLight: "bg-amber-50 text-amber-600 border-amber-200", label: "Action Needed",
  },
};

const NotificationRow = ({ notif, darkMode, onRead, onDismiss, index }) => {
  const cfg = TYPE_CFG[notif.type] || TYPE_CFG.info;
  const { Icon } = cfg;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16, height: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ delay: index * 0.04, duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group ${darkMode ? !notif.read ? "bg-white/[0.03]" : "" : !notif.read ? "bg-[#f7fffa]" : ""}`}
    >
      {!notif.read && <div className={`absolute left-0 top-0 w-[3px] h-full ${cfg.stripe}`} />}

      <div className="flex items-start gap-3 px-4 py-4 pl-5">
        <div className={`w-9 h-9 shrink-0 flex items-center justify-center text-white mt-0.5 ${cfg.iconBg} shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]`}>
          <Icon size={14} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-black tracking-[0.1em] uppercase ${darkMode ? cfg.badgeDark : cfg.badgeLight}`}>
              {cfg.label}
            </span>
            <span className={`text-[10.5px] font-medium shrink-0 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              {notif.time}
            </span>
          </div>

          <p className={`text-[13px] font-bold leading-snug mb-1 ${darkMode ? "text-white" : "text-gray-950"}`}>
            {notif.title}
          </p>
          <p className={`text-[12px] leading-[1.65] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {notif.message}
          </p>

          <div className="flex items-center mt-2.5">
            {!notif.read && (
              <button
                onClick={() => onRead(notif.id)}
                className={`text-[11px] font-bold tracking-wide transition-colors duration-150 ${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}
              >
                Mark as read
              </button>
            )}
            <button
              onClick={() => onDismiss(notif.id)}
              className={`flex items-center gap-1 text-[11px] font-medium ml-auto opacity-0 group-hover:opacity-100 transition-all duration-150 ${darkMode ? "text-gray-600 hover:text-red-400" : "text-gray-400 hover:text-red-500"}`}
            >
              <FiTrash2 size={11} /> Dismiss
            </button>
          </div>
        </div>

        {!notif.read && <div className={`w-2 h-2 shrink-0 mt-1.5 ${cfg.dot}`} />}
      </div>

      <div className={`mx-4 h-px ${darkMode ? "bg-white/[0.05]" : "bg-gray-100"}`} />
    </motion.div>
  );
};

const NotificationPanel = ({ darkMode, notifications, loading, onClose, onMarkAllRead, onMarkRead, onDismiss }) => {
  const [filter, setFilter] = useState("all");
  const unreadCount = notifications.filter((n) => !n.read).length;
  const visible = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "top right" }}
      className={`
        fixed left-2.5 right-2.5 top-[78px]
        sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+10px)]
        z-50 w-auto sm:w-[420px]
        max-h-[calc(100vh-94px)] sm:max-h-none
        flex flex-col border overflow-hidden
        ${darkMode ? "bg-[#0C1420] border-white/[0.09] shadow-[0_24px_80px_rgba(0,0,0,0.7)]" : "bg-white border-gray-200 shadow-[0_24px_80px_rgba(0,0,0,0.11)]"}
      `}
    >
      <div className="h-[2px] w-full shrink-0 bg-gradient-to-r from-transparent via-green-500 to-transparent" />

      <div className={`shrink-0 px-4 pt-4 pb-0 border-b ${darkMode ? "border-white/[0.07]" : "border-gray-100"}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <h3 className={`text-[14px] font-black tracking-tight ${darkMode ? "text-white" : "text-gray-950"}`}>Notifications</h3>
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span key="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 26 }}
                  className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 bg-green-500 text-white text-[10px] font-black leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button onClick={onMarkAllRead}
                className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1.5 transition-colors duration-150 ${darkMode ? "text-green-400 hover:text-green-300 hover:bg-white/[0.04]" : "text-green-600 hover:text-green-700 hover:bg-green-50"}`}>
                Mark all read
              </button>
            )}
            <button onClick={onClose}
              className={`w-7 h-7 flex items-center justify-center transition-colors duration-150 ${darkMode ? "text-gray-500 hover:text-white hover:bg-white/[0.07]" : "text-gray-400 hover:text-black hover:bg-gray-100"}`}>
              <FiX size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center">
          {["all", "unread"].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`relative px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] transition-colors duration-150 ${filter === tab ? darkMode ? "text-white" : "text-gray-950" : darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>
              {tab === "all" ? "All" : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
              {filter === tab && <motion.div layoutId="notif-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500" transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} />}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto flex-1 sm:flex-none sm:max-h-[380px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {loading && visible.length === 0 ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-14 gap-3">
              <span className={`w-6 h-6 border-2 rounded-full animate-spin ${darkMode ? "border-white/20 border-t-green-500" : "border-gray-200 border-t-green-500"}`} />
              <p className={`text-[13px] font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Loading notifications...</p>
            </motion.div>
          ) : visible.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-14 gap-3">
              <div className={`w-12 h-12 flex items-center justify-center ${darkMode ? "bg-white/[0.04] text-gray-600" : "bg-gray-100 text-gray-400"}`}><FiBell size={20} /></div>
              <p className={`text-[13px] font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{filter === "unread" ? "No unread notifications" : "You're all caught up"}</p>
              <p className={`text-[11px] ${darkMode ? "text-gray-600" : "text-gray-300"}`}>New activity will appear here</p>
            </motion.div>
          ) : (
            visible.map((notif, i) => (
              <NotificationRow key={notif.id} notif={notif} darkMode={darkMode} onRead={onMarkRead} onDismiss={onDismiss} index={i} />
            ))
          )}
        </AnimatePresence>
      </div>

      {notifications.length > 0 && (
        <div className={`shrink-0 flex items-center justify-between px-4 py-3 border-t ${darkMode ? "border-white/[0.07] bg-white/[0.02]" : "border-gray-100 bg-gray-50/60"}`}>
          <span className={`text-[11px] font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            {unreadCount === 0 ? "All caught up" : `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
          </span>
          <button className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors duration-150 ${darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}>
            View all <FiChevronRight size={11} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────
   DASHBOARD HEADER
───────────────────────────────────────────────────── */
const DashboardHeader = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  const { user } = useAuth();

  const rawName   = user?.name?.trim() ?? "";
  const parts     = rawName ? rawName.split(" ") : [];
  const firstName = parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Citizen";
  const initials  = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0] ? parts[0].slice(0, 2).toUpperCase() : "CZ";
  const role = user?.role ?? "Citizen Reporter";

  const avatarUrl = user?.avatar || null;
  const [imgError, setImgError] = useState(false);
  useEffect(() => { setImgError(false); }, [avatarUrl]);

  // ── Sound key always reads live from user context (saved in DB) ───────────
  const notificationSoundKey = user?.notification_sound || "default";

  // ── Ref always holds the LATEST sound key — no stale closure issues ───────
  const notificationSoundKeyRef = useRef(notificationSoundKey);
  useEffect(() => {
    notificationSoundKeyRef.current = notificationSoundKey;
  }, [notificationSoundKey]);

  const soundAudioRef = useRef(null);

  // ── userInteracted ref — tracks if user has clicked anything on the page ──
  // Browsers block Audio.play() until a real user gesture has occurred.
  const userInteractedRef = useRef(false);
  useEffect(() => {
    const mark = () => { userInteractedRef.current = true; };
    window.addEventListener("click",   mark, { once: true });
    window.addEventListener("keydown", mark, { once: true });
    return () => {
      window.removeEventListener("click",   mark);
      window.removeEventListener("keydown", mark);
    };
  }, []);

  const playNotificationSound = (soundKey) => {
    if (!userInteractedRef.current) return; // browser will block it otherwise

    const src = SOUND_MAP[soundKey] ?? SOUND_MAP["default"];
    if (!src) return; // "silent" selected

    if (soundAudioRef.current) {
      soundAudioRef.current.pause();
      soundAudioRef.current.currentTime = 0;
    }
    soundAudioRef.current = new Audio(src);
    soundAudioRef.current.volume = 0.6;
    soundAudioRef.current.play().catch((err) => console.warn("Sound play failed:", err));
  };

  // ── REAL notifications, fetched from the backend ───────────────────────────
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const knownIdsRef = useRef(new Set()); // tracks which ids we've already seen, to detect genuinely new ones

  const fetchNotifications = useCallback(async (isFirstLoad = false) => {
    try {
      const { data } = await api.get("/notifications");
      const incoming = data.notifications || [];

      // Figure out which of these are brand-new since our last fetch
      const newUnread = incoming.filter(
        (n) => !n.read && !knownIdsRef.current.has(n.id)
      );

      incoming.forEach((n) => knownIdsRef.current.add(n.id));

      setNotifications(incoming);

      // Play a sound for each genuinely new notification — never on first
      // page load (that would fire sounds for old unread items every time
      // you open the dashboard). Staggered slightly so multiple new
      // notifications in the same poll don't all play on top of each other.
      if (!isFirstLoad && newUnread.length > 0) {
        newUnread.forEach((_, i) => {
          setTimeout(() => {
            playNotificationSound(notificationSoundKeyRef.current);
          }, i * 700);
        });
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications(true); // first load — no sound, just populate + seed known ids

    const interval = setInterval(() => {
      fetchNotifications(false);
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const [panelOpen, setPanelOpen] = useState(false);
  const bellRef  = useRef(null);
  const panelRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) &&
          bellRef.current  && !bellRef.current.contains(e.target))
        setPanelOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setPanelOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (panelOpen && window.innerWidth < 640) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [panelOpen]);

  // ── Actions now hit the real backend, with optimistic UI updates ──────────
  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))); // optimistic
    try {
      await api.patch("/notifications/read-all");
    } catch (err) {
      console.error("Mark all read failed:", err?.response?.data || err);
      fetchNotifications(true); // resync on failure
    }
  };

  const handleMarkRead = async (id) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n)); // optimistic
    try {
      await api.patch(`/notifications/${id}/read`);
    } catch (err) {
      console.error("Mark read failed:", err?.response?.data || err);
      fetchNotifications(true);
    }
  };

  const handleDismiss = async (id) => {
    const prevState = notifications;
    setNotifications((prev) => prev.filter((n) => n.id !== id)); // optimistic
    try {
      await api.delete(`/notifications/${id}`);
    } catch (err) {
      console.error("Dismiss failed:", err?.response?.data || err);
      setNotifications(prevState); // revert on failure
    }
  };

  const handleSidebarToggle = () => {
    if (window.innerWidth < 1280) setMobileSidebar(!mobileSidebar);
    else setSidebarOpen(!sidebarOpen);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 h-[74px] md:h-[78px] border-b backdrop-blur-2xl transition-all duration-300 ${darkMode ? "bg-[#081018]/92 border-white/10" : "bg-white/90 border-gray-200"}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-[-90px] w-[280px] h-[180px] bg-green-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}
            onClick={handleSidebarToggle}
            className={`relative w-11 h-11 flex items-center justify-center text-lg border transition-all duration-300 overflow-hidden ${darkMode ? "bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]" : "bg-[#F7F7F7] border-gray-200 text-black hover:bg-white"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
            <AnimatePresence mode="wait" initial={false}>
              {mobileSidebar ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} className="relative z-10"><FiX /></motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }} className="relative z-10"><FiMenu /></motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:flex w-12 h-12 rounded-full bg-white items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_70%)]" />
              <img src={logo} alt="NationAura Logo" className="relative z-10 w-[70%] h-[70%] object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-[18px] sm:text-[20px] md:text-[22px] font-black tracking-tight leading-none ${darkMode ? "text-white" : "text-black"}`}>NationAura</h1>
              <p className={`hidden sm:block text-[10px] md:text-xs mt-1 tracking-[0.18em] uppercase ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Civic Intelligence Dashboard</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className={`hidden xl:flex items-center gap-3 h-11 px-4 w-[280px] border transition-all duration-300 ${darkMode ? "bg-white/[0.03] border-white/10 focus-within:bg-white/[0.05]" : "bg-[#F7F7F7] border-gray-200 focus-within:bg-white"}`}>
            <FiSearch className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <input type="text" placeholder="Search reports, users..."
              className={`bg-transparent outline-none text-sm w-full ${darkMode ? "text-white placeholder:text-gray-500" : "text-black placeholder:text-gray-400"}`} />
          </div>

          <div className="relative">
            <motion.button
              ref={bellRef} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => setPanelOpen((v) => !v)}
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
              className={`relative w-11 h-11 flex items-center justify-center text-lg border transition-all duration-300 ${darkMode ? `bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] ${panelOpen ? "bg-white/[0.06]" : ""}` : `bg-[#F7F7F7] border-gray-200 text-black hover:bg-white ${panelOpen ? "bg-white" : ""}`}`}
            >
              <FiBell />
              <AnimatePresence mode="wait">
                {!loading && unreadCount > 0 ? (
                  <motion.span key="unread" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 24 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-green-500 text-white text-[9.5px] font-black leading-none flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.5)]">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </motion.span>
                ) : !loading ? (
                  <motion.span key="zero" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-gray-400/50 text-white text-[9.5px] font-black leading-none flex items-center justify-center">
                    0
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </motion.button>

            <div ref={panelRef}>
              <AnimatePresence>
                {panelOpen && (
                  <NotificationPanel
                    darkMode={darkMode} notifications={notifications} loading={loading}
                    onClose={() => setPanelOpen(false)}
                    onMarkAllRead={handleMarkAllRead}
                    onMarkRead={handleMarkRead}
                    onDismiss={handleDismiss}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-11 flex items-center justify-center text-lg transition-all duration-300 ${darkMode ? "bg-green-600 text-white shadow-[0_10px_30px_rgba(34,197,94,0.30)]" : "bg-black text-white"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.span key="sun" initial={{ rotate: -80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 80, opacity: 0 }} transition={{ duration: 0.2 }}><FiSun /></motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -80, opacity: 0 }} transition={{ duration: 0.2 }}><FiMoon /></motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.div whileHover={{ y: -2 }} className="flex items-center gap-3 pl-1 sm:pl-2 cursor-pointer">
            <div className="relative w-11 h-11 overflow-hidden shadow-[0_10px_30px_rgba(34,197,94,0.30)]">
              {avatarUrl && !imgError ? (
                <img src={avatarUrl} alt={user?.name || "Profile"} className="w-full h-full object-cover" onError={() => setImgError(true)} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
                  <span className="relative z-10 text-[13px] font-black tracking-tight text-white">{initials}</span>
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <h3 className={`text-sm font-semibold leading-none ${darkMode ? "text-white" : "text-black"}`}>{firstName}</h3>
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{role}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;