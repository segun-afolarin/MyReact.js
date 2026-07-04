import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheckCircle,
  FiCrosshair,
  FiMapPin,
  FiRadio,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

// ─── Leaflet CSS (injected once) ────────────────────────────────────────────
const injectLeafletCSS = () => {
  if (document.getElementById("leaflet-css")) return;
  const link = document.createElement("link");
  link.id = "leaflet-css";
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
};

// ─── Leaflet Map Component ───────────────────────────────────────────────────
const LiveMap = ({ lat, lng, darkMode }) => {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    injectLeafletCSS();

    // Load Leaflet from CDN if not already present
    const initMap = () => {
      const L = window.L;
      if (!L || !mapRef.current || instanceRef.current) return;

      // Dark tiles vs light tiles
      const tileUrl = darkMode
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
      });

      L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);

      // Custom green pulse marker
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <div style="
              position:absolute;
              width:52px;height:52px;
              border-radius:50%;
              background:rgba(34,197,94,0.15);
              animation:leaflet-pulse 2s ease-out infinite;
            "></div>
            <div style="
              position:absolute;
              width:34px;height:34px;
              border-radius:50%;
              background:rgba(34,197,94,0.25);
              animation:leaflet-pulse 2s ease-out infinite 0.4s;
            "></div>
            <div style="
              width:20px;height:20px;
              border-radius:50%;
              background:#22c55e;
              border:3px solid white;
              box-shadow:0 0 20px rgba(34,197,94,0.7);
              position:relative;z-index:1;
            "></div>
          </div>
        `,
        iconSize: [52, 52],
        iconAnchor: [26, 26],
      });

      // Inject pulse keyframes once
      if (!document.getElementById("leaflet-pulse-style")) {
        const style = document.createElement("style");
        style.id = "leaflet-pulse-style";
        style.textContent = `
          @keyframes leaflet-pulse {
            0%   { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(2.2); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      L.marker([lat, lng], { icon }).addTo(map);
      instanceRef.current = map;
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [lat, lng, darkMode]);

  return (
    <div
      ref={mapRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const SmartDetectionBanner = ({ darkMode }) => {
  const { user } = useAuth();

  // ── Real location from backend ───────────────────────────────────────────
  // AuthContext stores lat/lng from LocationSetup (same source as user.state).
  // Falls back to a central Nigeria position if unavailable.
  const lat = user?.latitude  ?? 9.0579;   // Abuja fallback
  const lng = user?.longitude ?? 7.4951;

  // Build a readable location label: "City, State" or just state, or fallback
  const city  = user?.city?.trim();
  const state = user?.state?.trim();
  const locationLabel =
    city && state ? `${city}, ${state}` :
    state         ? state :
    city          ? city  : "Nigeria";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className={`
        relative overflow-hidden border
        ${darkMode
          ? "bg-[#09131B] border-white/10"
          : "bg-white border-gray-200"}
      `}
    >
      {/* GRID OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* GLOWS */}
      <div className="absolute top-[-120px] right-[-120px] w-[280px] h-[280px] bg-green-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-[-100px] left-[-80px] w-[240px] h-[240px] bg-emerald-500/10 blur-3xl rounded-full" />

      {/* TOP ACCENT LINE */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-green-500 via-emerald-400 to-transparent" />

      <div className="relative z-10 p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6 items-center">

          {/* ── LEFT ─────────────────────────────────────────────────────── */}
          <div>
            {/* BADGE */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className={`
                inline-flex items-center gap-3 px-4 py-2 border mb-5
                ${darkMode
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-green-50 border-green-200 text-green-700"}
              `}
            >
              <div className="relative flex">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-black">
                Smart Detection Engine
              </span>
            </motion.div>

            {/* TITLE */}
            <h2
              className={`
                text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem]
                leading-[0.92] tracking-[-0.06em] font-black uppercase
                ${darkMode ? "text-white" : "text-black"}
              `}
            >
              AI Powered
              Incident Detection
              <span className="block text-green-500">With Live GPS</span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className={`
                mt-5 max-w-2xl text-sm sm:text-base leading-relaxed
                ${darkMode ? "text-gray-400" : "text-gray-600"}
              `}
            >
              NationAura intelligently detects your location, analyzes emergency
              patterns, verifies incident evidence, and routes reports faster to
              the appropriate response teams using smart civic infrastructure systems.
            </p>

            {/* FEATURE CARDS */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: FiCrosshair, title: "Automatic GPS Detection" },
                { icon: FiShield,    title: "AI Verification System" },
                { icon: FiMapPin,    title: "Live Map Intelligence" },
                { icon: FiZap,       title: "Emergency Priority Routing" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className={`
                      relative overflow-hidden border p-4
                      ${darkMode
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-gray-200 bg-gray-50"}
                    `}
                  >
                    <motion.div
                      animate={{ opacity: [0.15, 0.35, 0.15] }}
                      transition={{ repeat: Infinity, duration: 3, delay: index * 0.3 }}
                      className="absolute inset-0 bg-green-500/5"
                    />
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="relative w-12 h-12 bg-green-500/10 flex items-center justify-center text-green-400 text-xl shrink-0">
                        <motion.div
                          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                          transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.3 }}
                          className="absolute inset-0 bg-green-500/10"
                        />
                        <Icon className="relative z-10" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-black ${darkMode ? "text-white" : "text-black"}`}>
                          {item.title}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-green-500 text-xs font-semibold">
                          <FiCheckCircle />
                          Enabled
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT ────────────────────────────────────────────────────── */}
          <div
            className={`
              relative overflow-hidden border p-5 sm:p-6
              ${darkMode
                ? "bg-[#071017] border-white/10"
                : "bg-[#FAFAFA] border-gray-200"}
            `}
          >
            {/* LIVE HEADER */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={`text-[10px] uppercase tracking-[0.18em] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Detection Status
                </p>
                <h3 className={`mt-2 text-[2.2rem] font-black tracking-[-0.05em] ${darkMode ? "text-white" : "text-black"}`}>
                  ACTIVE
                </h3>
              </div>
              <div className="relative w-16 h-16 bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-2xl">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-green-500/10"
                />
                <FiActivity className="relative z-10" />
              </div>
            </div>

            {/* ── LEAFLET MAP ───────────────────────────────────────────── */}
            <div
              className={`
                relative overflow-hidden mt-6 border h-[260px]
                ${darkMode
                  ? "border-white/10 bg-[#0D1821]"
                  : "border-gray-200 bg-gray-100"}
              `}
            >
              {/* Real Leaflet map fills the container */}
              <LiveMap lat={lat} lng={lng} darkMode={darkMode} />

              {/* SCAN SWEEP — layered above the map */}
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-green-500/8 to-transparent pointer-events-none"
                style={{ zIndex: 2 }}
              />

              {/* BOTTOM INFO BAR */}
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 flex-wrap"
                style={{ zIndex: 3 }}
              >
                <div
                  className={`
                    backdrop-blur-xl border px-4 py-3
                    ${darkMode
                      ? "bg-black/60 border-white/10"
                      : "bg-white/90 border-gray-200"}
                  `}
                >
                  <div className="flex items-center gap-2 text-green-500 text-xs font-semibold">
                    <FiRadio />
                    GPS Connected
                  </div>
                  <p className={`mt-2 text-sm font-bold ${darkMode ? "text-white" : "text-black"}`}>
                    {locationLabel}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white text-sm font-black uppercase tracking-[0.14em]">
                  Live Scan
                  <FiArrowUpRight />
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                { number: "98%", label: "Detection Accuracy" },
                { number: "1.8s", label: "Average Response Route" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                    border p-4
                    ${darkMode
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-gray-200 bg-white"}
                  `}
                >
                  <h3 className={`text-3xl font-black tracking-[-0.05em] ${darkMode ? "text-white" : "text-black"}`}>
                    {item.number}
                  </h3>
                  <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default SmartDetectionBanner;