import { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiNavigation, FiAlertTriangle, FiLoader } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "../../context/AuthContext"; // adjust path to your actual AuthContext
import { getNearbyReports } from "../../utils/api";
import L from "leaflet";

// Fix Leaflet marker icons broken by Vite (same fix as LocationSetup.jsx)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Small red pin for the user's own position
const userIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  className: "user-location-marker", // hook for CSS if you want to recolor it
});

// Colored dot markers for nearby reports, severity-coded to match the
// legend at the bottom of the card (red/amber/green).
const SEVERITY_COLORS = {
  "High Risk": "#ef4444",
  "Medium Risk": "#eab308",
  "Low Risk": "#22c55e",
};

const severityIconCache = {};
const getSeverityIcon = (severity) => {
  const color = SEVERITY_COLORS[severity] || SEVERITY_COLORS["Low Risk"];
  if (!severityIconCache[color]) {
    severityIconCache[color] = L.divIcon({
      className: "severity-marker",
      html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 6px rgba(0,0,0,0.45)"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  }
  return severityIconCache[color];
};

// AI score (e.g. "72%") → same High/Medium/Low bands used across the app.
const severityFromScore = (scoreStr) => {
  const n = parseInt(scoreStr, 10) || 0;
  if (n >= 80) return "High Risk";
  if (n >= 50) return "Medium Risk";
  return "Low Risk";
};

// Recenters the map imperatively whenever the user's saved coords change
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useMemo(() => {
    if (lat && lng) map.setView([lat, lng], map.getZoom());
  }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};

const AlertsMap = ({ darkMode }) => {
  const { user } = useAuth();

  const hasSavedLocation = Boolean(
    user?.has_location && user?.latitude && user?.longitude
  );

  const center = useMemo(() => {
    if (hasSavedLocation) {
      return { lat: Number(user.latitude), lng: Number(user.longitude) };
    }
    return null; // no fallback guess — we want the user's real location, not a placeholder
  }, [hasSavedLocation, user]);

  // ── Real nearby reports from /api/reports/nearby, plotted using each
  // report's actual saved coordinates. Reports without lat/lng on file
  // are skipped rather than guessed at. ────────────────────────────────
  const [rawReports, setRawReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNearby = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNearbyReports();
      setRawReports(data.reports || []);
    } catch (e) {
      setError(e.message || "Failed to load nearby reports.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasSavedLocation) fetchNearby();
    else setLoading(false);
  }, [hasSavedLocation, fetchNearby]);

  const nearbyAlerts = useMemo(() => {
    return rawReports
      .filter((r) => r.latitude !== null && r.longitude !== null)
      .map((r) => {
        const severity = severityFromScore(r.score);
        return {
          id: r.reportId,
          name: r.title,
          location: r.location,
          severity,
          confirmations: r.confirmations ?? 0,
          lat: r.latitude,
          lng: r.longitude,
        };
      });
  }, [rawReports]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative border overflow-hidden ${
        darkMode ? "bg-[#0B1218] border-white/10" : "bg-white border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b ${
          darkMode
            ? "border-white/10 bg-white/5"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <FiMapPin className="text-green-500 text-lg sm:text-xl shrink-0" />
          <div className="min-w-0">
            <h2 className="font-bold text-base sm:text-lg truncate">Community Alert Map</h2>
            <p className="text-[11px] sm:text-xs opacity-60 truncate">
              {hasSavedLocation
                ? `Live incident distribution around ${user.address || user.state}`
                : "Set your location to see nearby incidents"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-green-500 shrink-0">
          <FiNavigation />
          Live Tracking Enabled
        </div>
      </div>

      {/* MAP or EMPTY/LOADING/ERROR STATE */}
      {!hasSavedLocation ? (
        <div
          className={`flex h-[340px] sm:h-[420px] lg:h-[480px] flex-col items-center justify-center gap-3 px-6 text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <FiAlertTriangle className="text-3xl opacity-60" />
          <p className="text-sm font-medium">
            We don't have your location yet.
          </p>
          <p className="text-xs opacity-70 max-w-xs">
            Finish location setup so we can show incidents happening near you.
          </p>
        </div>
      ) : loading ? (
        <div
          className={`flex h-[340px] sm:h-[420px] lg:h-[480px] flex-col items-center justify-center gap-3 px-6 text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <FiLoader className="text-2xl animate-spin text-green-500" />
          <p className="text-sm">Loading nearby reports...</p>
        </div>
      ) : error ? (
        <div
          className={`flex h-[340px] sm:h-[420px] lg:h-[480px] flex-col items-center justify-center gap-3 px-6 text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <FiAlertTriangle className="text-3xl opacity-60 text-red-400" />
          <p className="text-sm font-medium">Couldn't load nearby reports</p>
          <button
            onClick={fetchNearby}
            className="mt-1 text-xs font-semibold text-green-500 underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="h-[340px] sm:h-[420px] lg:h-[480px]">
          <MapContainer
            center={[center.lat, center.lng]}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap lat={center.lat} lng={center.lng} />

            {/* User's real saved location */}
            <Marker position={[center.lat, center.lng]} icon={userIcon}>
              <Popup>
                <strong>{user.address || "Your location"}</strong>
                <br />
                {user.state}
              </Popup>
            </Marker>

            {/* Real nearby reports, plotted at their actual saved coordinates */}
            {nearbyAlerts.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={getSeverityIcon(loc.severity)}>
                <Popup>
                  <strong>{loc.name}</strong>
                  <br />
                  {loc.location}
                  <br />
                  {loc.severity} · {loc.confirmations} confirmation{loc.confirmations === 1 ? "" : "s"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}

      {/* FOOTER */}
      <div
        className={`px-4 sm:px-5 py-3 sm:py-4 border-t flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs ${
          darkMode
            ? "border-white/10 bg-white/5 text-gray-300"
            : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 shrink-0 bg-red-500 rounded-full" />
          High Risk
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 shrink-0 bg-yellow-500 rounded-full" />
          Medium Risk
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 shrink-0 bg-green-500 rounded-full" />
          Low Risk
        </div>
        <div className="w-full sm:w-auto sm:ml-auto opacity-70">
          Real-time civic intelligence mapping system
        </div>
      </div>
    </motion.section>
  );
};

export default AlertsMap;