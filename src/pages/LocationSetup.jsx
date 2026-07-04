// src/pages/LocationSetup.jsx

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import {
  FiMapPin, FiNavigation, FiCheck,
  FiGlobe, FiAlertCircle, FiWifi,
  FiInfo, FiEdit2,
} from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

// Fix Leaflet marker icons broken by Vite
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon   from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl:       markerIcon,
  shadowUrl:     markerShadow,
});

// ---------------------------------------------------------------------------
// Nigeria states
// ---------------------------------------------------------------------------

const locations = [
  { label: "Abia State",        value: "Abia State"        },
  { label: "Adamawa State",     value: "Adamawa State"     },
  { label: "Akwa Ibom State",   value: "Akwa Ibom State"   },
  { label: "Anambra State",     value: "Anambra State"     },
  { label: "Bauchi State",      value: "Bauchi State"      },
  { label: "Bayelsa State",     value: "Bayelsa State"     },
  { label: "Benue State",       value: "Benue State"       },
  { label: "Borno State",       value: "Borno State"       },
  { label: "Cross River State", value: "Cross River State" },
  { label: "Delta State",       value: "Delta State"       },
  { label: "Ebonyi State",      value: "Ebonyi State"      },
  { label: "Edo State",         value: "Edo State"         },
  { label: "Ekiti State",       value: "Ekiti State"       },
  { label: "Enugu State",       value: "Enugu State"       },
  { label: "FCT Abuja",         value: "FCT Abuja"         },
  { label: "Gombe State",       value: "Gombe State"       },
  { label: "Imo State",         value: "Imo State"         },
  { label: "Kaduna State",      value: "Kaduna State"      },
  { label: "Kano State",        value: "Kano State"        },
  { label: "Katsina State",     value: "Katsina State"     },
  { label: "Kebbi State",       value: "Kebbi State"       },
  { label: "Kogi State",        value: "Kogi State"        },
  { label: "Kwara State",       value: "Kwara State"       },
  { label: "Lagos State",       value: "Lagos State"       },
  { label: "Nasarawa State",    value: "Nasarawa State"    },
  { label: "Niger State",       value: "Niger State"       },
  { label: "Ogun State",        value: "Ogun State"        },
  { label: "Ondo State",        value: "Ondo State"        },
  { label: "Osun State",        value: "Osun State"        },
  { label: "Oyo State",         value: "Oyo State"         },
  { label: "Plateau State",     value: "Plateau State"     },
  { label: "Rivers State",      value: "Rivers State"      },
  { label: "Sokoto State",      value: "Sokoto State"      },
  { label: "Taraba State",      value: "Taraba State"      },
  { label: "Yobe State",        value: "Yobe State"        },
  { label: "Zamfara State",     value: "Zamfara State"     },
];

const matchNigerianState = (rawState) => {
  if (!rawState) return "";
  const n = rawState.trim().toLowerCase().replace(/\s+state$/, "");
  if (n === "federal capital territory" || n === "fct" || n === "abuja") return "FCT Abuja";
  const found = locations.find((s) => s.value.toLowerCase().replace(" state", "") === n);
  return found ? found.value : "";
};

// ---------------------------------------------------------------------------
// Reverse geocoding — Nominatim with BigDataCloud fallback
// ---------------------------------------------------------------------------

const reverseGeocodeNominatim = async (lat, lng) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1&zoom=16`,
    { headers: { Accept: "application/json", "Accept-Language": "en" } }
  );
  if (!res.ok) throw new Error("Nominatim failed");
  const data = await res.json();
  const a    = data.address || {};
  const street = [a.house_number, a.road || a.pedestrian || a.street].filter(Boolean).join(" ");
  return {
    address: street || a.neighbourhood || a.suburb || a.village || "",
    state:   matchNigerianState(a.state || a.region || a.county || ""),
    country: a.country || "",
    city:    a.city || a.town || a.village || a.suburb || "",
    source:  "nominatim",
  };
};

const reverseGeocodeBigDataCloud = async (lat, lng) => {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  if (!res.ok) throw new Error("BigDataCloud failed");
  const data = await res.json();
  return {
    address: data.locality || data.city || "",
    state:   matchNigerianState(data.principalSubdivision || ""),
    country: data.countryName || "",
    city:    data.city || data.locality || "",
    source:  "bigdatacloud",
  };
};

const reverseGeocode = async (lat, lng) => {
  try {
    const r = await reverseGeocodeNominatim(lat, lng);
    if (r.state || r.address) return r;
    throw new Error("Empty result");
  } catch {
    return reverseGeocodeBigDataCloud(lat, lng);
  }
};

// ---------------------------------------------------------------------------
// react-select styles
// ---------------------------------------------------------------------------

const selectStyles = {
  control: (base, state) => ({
    ...base, minHeight: 52, borderRadius: 0, borderWidth: 1,
    borderColor: state.isFocused ? "#16A34A" : "#E2E0D8",
    boxShadow: "none", paddingLeft: 4, backgroundColor: "#FFFFFF",
    "&:hover": { borderColor: state.isFocused ? "#16A34A" : "#C7C4B6" },
  }),
  valueContainer:     (base) => ({ ...base, padding: "2px 12px" }),
  placeholder:        (base) => ({ ...base, color: "#8C887C", fontSize: 14.5 }),
  singleValue:        (base) => ({ ...base, color: "#161812", fontSize: 14.5 }),
  input:              (base) => ({ ...base, color: "#161812", fontSize: 14.5 }),
  indicatorSeparator: ()     => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base, color: "#8C887C",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
    transition: "transform 150ms ease",
  }),
  menu: (base) => ({
    ...base, borderRadius: 0, border: "1px solid #E2E0D8",
    boxShadow: "0 8px 24px rgba(15,17,13,0.08)", marginTop: 4,
  }),
  option: (base, state) => ({
    ...base, fontSize: 14.5, padding: "10px 14px",
    backgroundColor: state.isSelected ? "#16A34A" : state.isFocused ? "#F0EFE7" : "#FFFFFF",
    color: state.isSelected ? "#FFFFFF" : "#161812", cursor: "pointer",
  }),
};

// ---------------------------------------------------------------------------
// Map helpers
// ---------------------------------------------------------------------------

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center[0], center[1], zoom]);
  return null;
};

const ClickToPlace = ({ onPlace }) => {
  useMapEvents({ click(e) { onPlace(e.latlng.lat, e.latlng.lng); } });
  return null;
};

// ---------------------------------------------------------------------------
// Field primitives
// ---------------------------------------------------------------------------

const FieldLabel = ({ children, required }) => (
  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-500">
    {children}{required && <span className="ml-1 text-green-700">*</span>}
  </label>
);

const TextField = ({ label, required, error, value, onChange, placeholder, name, hint }) => (
  <div>
    <FieldLabel required={required}>{label}</FieldLabel>
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`h-[52px] w-full border bg-white px-4 text-[14.5px] text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-green-800 ${
        error ? "border-red-400" : "border-stone-200 hover:border-stone-300"
      }`}
    />
    {error ? (
      <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
        <FiAlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
      </p>
    ) : hint ? (
      <p className="mt-1.5 text-xs text-stone-400">{hint}</p>
    ) : null}
  </div>
);

// ---------------------------------------------------------------------------
// Banners
// ---------------------------------------------------------------------------

const AccuracyBanner = ({ accuracy, onDismiss }) => {
  if (!accuracy || accuracy <= 500) return null;
  const km = (accuracy / 1000).toFixed(0);
  const isVeryPoor = accuracy > 10000;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className={`flex items-start gap-2.5 border p-3 text-xs leading-relaxed ${
          isVeryPoor
            ? "border-amber-300 bg-amber-50 text-amber-800"
            : "border-blue-200 bg-blue-50 text-blue-800"
        }`}
      >
        <FiInfo className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="flex-1">
          <span className="font-semibold">
            {isVeryPoor
              ? `Low GPS accuracy (~${km}km radius) — your device used cell towers instead of GPS.`
              : `Moderate accuracy (~${accuracy.toFixed(0)}m).`}
          </span>
          {" "}The fields have been pre-filled but{" "}
          <span className="font-semibold">please correct them</span>{" "}
          if they show the wrong area. You can also{" "}
          <span className="font-semibold">click the map</span>{" "}
          to drop the pin on your exact location.
        </div>
        <button onClick={onDismiss} className="shrink-0 text-current opacity-60 hover:opacity-100">×</button>
      </motion.div>
    </AnimatePresence>
  );
};

const OutsideNigeriaBanner = ({ onDismiss }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-start gap-2.5 border border-amber-300 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800"
    >
      <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="flex-1">
        <span className="font-semibold">This pin looks like it's outside Nigeria.</span>{" "}
        NationAura currently only supports civic reporting within Nigeria — please drag the pin to a Nigerian address.
      </div>
      <button onClick={onDismiss} className="shrink-0 text-current opacity-60 hover:opacity-100">×</button>
    </motion.div>
  </AnimatePresence>
);

const PermissionBanner = ({ status }) => {
  if (!status || status === "granted" || status === "prompt") return null;
  const map = {
    denied: {
      text: "Location blocked. Go to browser Settings → Site Settings → Location → Allow for this site, then refresh.",
      cls: "border-red-200 bg-red-50 text-red-700",
      icon: <FiAlertCircle className="h-4 w-4 shrink-0 text-red-500" />,
    },
    unsupported: {
      text: "Your browser doesn't support GPS. Please type your address manually.",
      cls: "border-stone-200 bg-stone-50 text-stone-600",
      icon: <FiWifi className="h-4 w-4 shrink-0 text-stone-400" />,
    },
  };
  const m = map[status];
  if (!m) return null;
  return (
    <div className={`flex items-start gap-2.5 border p-3 text-xs leading-relaxed ${m.cls}`}>
      {m.icon}<span>{m.text}</span>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const DEFAULT_LAT = 9.0820;
const DEFAULT_LNG = 8.6753;

const LocationSetup = () => {
  const navigate     = useNavigate();
  const { user, refreshUser } = useAuth();

  const [loc, setLoc] = useState({
    address: "", state: "", country: "Nigeria",
    lat: DEFAULT_LAT, lng: DEFAULT_LNG,
  });

  const [mapZoom,        setMapZoom]        = useState(6);
  const [loading,        setLoading]        = useState(false);
  const [saving,         setSaving]         = useState(false);
  const [loadingStage,   setLoadingStage]   = useState(null);
  const [detected,       setDetected]       = useState(false);
  const [accuracy,       setAccuracy]       = useState(null);
  const [showAccWarn,    setShowAccWarn]    = useState(false);
  const [outsideNigeria, setOutsideNigeria] = useState(false);
  const [permStatus,     setPermStatus]     = useState(null);
  const [errors,         setErrors]         = useState({});
  const [toast,          setToast]          = useState(null);
  const [mapClickHint,   setMapClickHint]   = useState(false);

  const toastTimer = useRef(null);

  // Permission check
  useEffect(() => {
    if (!navigator.geolocation) { setPermStatus("unsupported"); return; }
    navigator.permissions?.query({ name: "geolocation" }).then((r) => {
      setPermStatus(r.state);
      r.onchange = () => setPermStatus(r.state);
    });
  }, []);

  // Pre-fill from existing user location if they're editing
  useEffect(() => {
    if (user?.address || user?.state) {
      setLoc((prev) => ({
        ...prev,
        address: user.address || "",
        state:   user.state   || "",
        lat:     user.latitude  ? parseFloat(user.latitude)  : DEFAULT_LAT,
        lng:     user.longitude ? parseFloat(user.longitude) : DEFAULT_LNG,
      }));
      if (user.latitude && user.longitude) {
        setDetected(true);
        setMapZoom(14);
      }
    }
  }, [user]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message, tone = "error") => {
    setToast({ message, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  };

  // ── Reverse geocode and fill fields ──────────────────────────────────────
  const fillFromCoords = async (lat, lng, acc = null) => {
    setLoadingStage("address");
    try {
      const found = await reverseGeocode(lat, lng);
      const isNigeria = !found.country || found.country.trim().toLowerCase() === "nigeria";
      setOutsideNigeria(!isNigeria);

      setLoc((prev) => ({
        ...prev,
        lat,
        lng,
        address: found.address || prev.address,
        state:   found.state   || prev.state,
        country: "Nigeria",
      }));
      setErrors({});

      if (acc && acc > 500) {
        setAccuracy(acc);
        setShowAccWarn(true);
        setMapClickHint(true);
      } else if (isNigeria) {
        showToast("Location detected and fields filled in.", "success");
      } else {
        showToast("That spot looks like it's outside Nigeria — please check the pin.", "error");
      }
    } catch {
      showToast("GPS pinned you but address lookup failed — fill fields manually.", "error");
    } finally {
      setLoadingStage(null);
      setLoading(false);
    }
  };

  // ── GPS button ────────────────────────────────────────────────────────────
  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    setLoadingStage("locating");
    setShowAccWarn(false);
    setOutsideNigeria(false);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude, accuracy: acc } = coords;
        setLoc((prev) => ({ ...prev, lat: latitude, lng: longitude }));
        setDetected(true);
        setMapZoom(acc > 5000 ? 11 : acc > 1000 ? 14 : 16);
        setPermStatus("granted");
        await fillFromCoords(latitude, longitude, acc);
      },
      (err) => {
        setLoading(false);
        setLoadingStage(null);
        const msgs = {
          1: "Location access denied. Allow it in browser settings and try again.",
          2: "Device couldn't get your position. Check your connection and try again.",
          3: "Location request timed out. Try again or enter address manually.",
        };
        if (err.code === 1) setPermStatus("denied");
        showToast(msgs[err.code] || `Location error: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  // ── Map click ─────────────────────────────────────────────────────────────
  const handleMapClick = async (lat, lng) => {
    setLoc((prev) => ({ ...prev, lat, lng }));
    setDetected(true);
    setMapZoom(16);
    setLoading(true);
    setShowAccWarn(false);
    setOutsideNigeria(false);
    showToast("Pin moved — looking up that address…", "success");
    await fillFromCoords(lat, lng);
  };

  // ── Confirm + save to backend ─────────────────────────────────────────────
  const confirmLocation = async () => {
    const errs = {};
    if (!loc.address.trim()) errs.address = "Street address is required.";
    if (!loc.state.trim())   errs.state   = "Select your state.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      showToast("Complete the highlighted fields to continue.");
      return;
    }

    setErrors({});
    setSaving(true);

    const payload = {
      address:   loc.address.trim(),
      state:     loc.state.trim(),
      country:   "Nigeria",
      latitude:  loc.lat,
      longitude: loc.lng,
    };

    try {
      // POST to backend — this saves to the DB
      await api.post("/user/location", payload);

      // Re-fetch the full user object from backend so every component
      // immediately sees the updated state/address/has_location fields
      await refreshUser();

      setSaving(false);
      showToast("Location saved! Redirecting…", "success");
      setTimeout(() => navigate("/CitizenDashboard"), 1000);
    } catch (err) {
      console.error("Location save failed:", err.response?.data || err);
      setSaving(false);

      const data = err.response?.data;
      const firstFieldError = data?.errors
        ? Object.values(data.errors)[0]?.[0]
        : null;

      showToast(
        firstFieldError || data?.message || "Could not save your location. Please try again.",
        "error"
      );
    }
  };

  const completedFields = [loc.address.trim(), loc.state.trim()].filter(Boolean).length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-8 sm:px-6 lg:px-10">

      {/* TOAST */}
      <div
        aria-live="polite"
        className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {toast && (
          <div className={`flex max-w-sm items-start gap-2.5 border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.tone === "success"
              ? "border-green-800 bg-green-900 text-green-50"
              : "border-red-700 bg-red-800 text-red-50"
          }`}>
            {toast.tone === "success"
              ? <FiCheck className="mt-0.5 h-4 w-4 shrink-0" />
              : <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
            {toast.message}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="grid w-full max-w-6xl grid-cols-1 overflow-hidden border border-stone-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-12px_rgba(15,17,13,0.12)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >

        {/* LEFT */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-16">

          <div className="mb-8 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
            <span className="text-green-800">Step 2 of 3</span>
            <span className="text-stone-300">/</span>
            <span>Location</span>
          </div>

          <div className="mb-9">
            <div className="mb-5 flex h-12 w-12 items-center justify-center bg-green-900 text-white">
              <FiMapPin size={22} strokeWidth={2} />
            </div>
            <h1 className="text-[28px] font-bold leading-[1.15] tracking-tight text-stone-900 sm:text-[32px]">
              {user?.name ? `Set your location, ${user.name.split(" ")[0]}` : "Set up your location"}
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-stone-500">
              Civic reports are routed to the right Nigerian ward and agency by address.
              Accurate placement gets your report to the people who can act on it.
            </p>
          </div>

          <div className="space-y-5">

            <PermissionBanner status={permStatus} />

            {/* GPS button */}
            <button
              type="button"
              onClick={detectLocation}
              disabled={loading || saving || permStatus === "denied" || permStatus === "unsupported"}
              className="group flex h-[52px] w-full items-center justify-center gap-2.5 border border-green-800 bg-green-50 text-[14.5px] font-semibold text-green-900 transition-colors hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiNavigation className={`h-4 w-4 ${loading ? "animate-pulse" : "transition-transform group-hover:-translate-y-0.5"}`} />
              {loading
                ? loadingStage === "address" ? "Looking up your address…" : "Getting your GPS position…"
                : detected ? "Re-detect my location" : "Use my current location"}
            </button>

            {showAccWarn && (
              <AccuracyBanner accuracy={accuracy} onDismiss={() => setShowAccWarn(false)} />
            )}

            {outsideNigeria && (
              <OutsideNigeriaBanner onDismiss={() => setOutsideNigeria(false)} />
            )}

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-stone-200" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                {detected ? "correct if needed" : "or enter manually"}
              </span>
              <div className="h-px flex-1 bg-stone-200" />
            </div>

            <TextField
              label="Street address"
              required
              name="address"
              placeholder="e.g. 14 Yakubu Gowon Way, New Nyanya"
              value={loc.address}
              error={errors.address}
              hint={detected ? "Edit this if the address is wrong" : undefined}
              onChange={(e) => {
                setLoc({ ...loc, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: undefined });
              }}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel required>State</FieldLabel>
                <Select
                  placeholder="Search state"
                  options={locations}
                  styles={selectStyles}
                  value={locations.find((s) => s.value === loc.state) || null}
                  onChange={(item) => {
                    setLoc({ ...loc, state: item.value });
                    if (errors.state) setErrors({ ...errors, state: undefined });
                  }}
                />
                {errors.state ? (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
                    <FiAlertCircle className="h-3.5 w-3.5 shrink-0" /> {errors.state}
                  </p>
                ) : detected ? (
                  <p className="mt-1.5 text-xs text-stone-400">Edit if the wrong state was detected</p>
                ) : null}
              </div>

              <div>
                <FieldLabel>Country</FieldLabel>
                <div className="flex h-[52px] w-full items-center gap-2 border border-stone-200 bg-stone-50 px-4 text-[14.5px] text-stone-500">
                  <span aria-hidden="true">🇳🇬</span>
                  <span className="text-stone-700">Nigeria</span>
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.06em] text-stone-400">
                    Only region supported
                  </span>
                </div>
              </div>
            </div>

            {mapClickHint && (
              <div className="flex items-start gap-2 border border-green-200 bg-green-50 p-3 text-xs text-green-800">
                <FiEdit2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  <span className="font-semibold">Tip:</span> Click anywhere on the map to drop the pin on your exact street and auto-fill the address fields.
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={confirmLocation}
              disabled={saving || loading}
              className="flex h-[52px] w-full items-center justify-center gap-2.5 bg-green-900 text-[14.5px] font-semibold text-white transition-colors hover:bg-green-800 active:bg-green-950 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving…</>
              ) : (
                <><FiCheck className="h-4 w-4" /> Confirm and continue</>
              )}
            </button>
          </div>

          {/* Progress */}
          <div className="mt-8 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-stone-400">
                <span>Profile completeness</span>
                <span className="tabular-nums">{completedFields}/2</span>
              </div>
              <div className="h-[3px] w-full bg-stone-200">
                <div
                  className="h-full bg-green-800 transition-all duration-500 ease-out"
                  style={{ width: `${(completedFields / 2) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs leading-relaxed text-stone-400">
              <FiGlobe className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>Your address is encrypted and only shared with the agency handling your report.</span>
            </div>
          </div>
        </div>

        {/* RIGHT — clickable map */}
        <div className="relative min-h-[360px] border-t border-stone-200 lg:min-h-full lg:border-l lg:border-t-0">
          <MapContainer
            center={[loc.lat, loc.lng]}
            zoom={mapZoom}
            scrollWheelZoom={false}
            className="h-full min-h-[360px] w-full cursor-crosshair"
          >
            <ChangeView center={[loc.lat, loc.lng]} zoom={mapZoom} />
            <ClickToPlace onPlace={handleMapClick} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[loc.lat, loc.lng]} />
          </MapContainer>

          {/* Overlays */}
          <div className="pointer-events-none absolute left-4 top-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <div className="pointer-events-auto flex items-center gap-2 border border-stone-200 bg-white/95 px-3 py-2 backdrop-blur-sm">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${detected ? "bg-green-500 animate-pulse" : "bg-stone-300"}`} />
              <span className="font-mono text-[11px] tracking-tight text-stone-700">
                {loc.lat.toFixed(5)}°, {loc.lng.toFixed(5)}°
              </span>
            </div>
            {detected && (
              <div className="pointer-events-auto border border-green-800 bg-green-900 px-3 py-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-green-50">
                  {accuracy
                    ? accuracy > 1000
                      ? `~${(accuracy / 1000).toFixed(0)}km accuracy`
                      : `~${accuracy.toFixed(0)}m accuracy`
                    : "GPS locked"}
                </span>
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="border border-stone-200 bg-white/90 px-3 py-1.5 text-[11px] text-stone-500 backdrop-blur-sm">
              Click map to reposition pin
            </div>
          </div>

          {loading && loadingStage === "address" && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow">
                <span className="h-4 w-4 rounded-full border-2 border-stone-300 border-t-green-700 animate-spin" />
                Looking up address…
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default LocationSetup;