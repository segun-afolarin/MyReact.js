import { useMemo } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiNavigation, FiAlertTriangle } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAuth } from "../../context/AuthContext"; // adjust path to your actual AuthContext
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

// Recenters the map imperatively whenever the user's saved coords change
const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useMemo(() => {
    if (lat && lng) map.setView([lat, lng], map.getZoom());
  }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
};

// TODO: replace with real GET /api/alerts/nearby?lat={lat}&lng={lng}&radius=5
// Until that endpoint exists, this fabricates a handful of points scattered
// a few hundred metres around the user's REAL saved location, so nothing
// references Maiduguri/Gwange/Bolori anymore.
const buildNearbyAlerts = (lat, lng) => {
  const jitter = () => (Math.random() - 0.5) * 0.01; // ~±500m
  const severities = ["High Risk", "Medium Risk", "Low Risk"];
  const colors = { "High Risk": "#ef4444", "Medium Risk": "#eab308", "Low Risk": "#22c55e" };

  return Array.from({ length: 3 }).map((_, i) => {
    const severity = severities[i % severities.length];
    return {
      id: i,
      name: `Nearby report #${i + 1}`,
      severity,
      color: colors[severity],
      alerts: Math.floor(Math.random() * 3) + 1,
      lat: lat + jitter(),
      lng: lng + jitter(),
    };
  });
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

  const nearbyAlerts = useMemo(() => {
    if (!center) return [];
    return buildNearbyAlerts(center.lat, center.lng);
  }, [center]);

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
        className={`flex items-center justify-between px-5 py-4 border-b ${
          darkMode
            ? "border-white/10 bg-white/5"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <FiMapPin className="text-green-500 text-xl" />
          <div>
            <h2 className="font-bold text-lg">Community Alert Map</h2>
            <p className="text-xs opacity-60">
              {hasSavedLocation
                ? `Live incident distribution around ${user.address || user.state}`
                : "Set your location to see nearby incidents"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-500">
          <FiNavigation />
          Live Tracking Enabled
        </div>
      </div>

      {/* MAP or EMPTY STATE */}
      {hasSavedLocation ? (
        <div className="h-[420px] sm:h-[480px]">
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

            {/* Nearby alerts, generated around the real coords */}
            {nearbyAlerts.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>
                  <strong>{loc.name}</strong>
                  <br />
                  {loc.severity} · {loc.alerts} active alert{loc.alerts > 1 ? "s" : ""}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : (
        <div
          className={`flex h-[420px] sm:h-[480px] flex-col items-center justify-center gap-3 px-6 text-center ${
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
      )}

      {/* FOOTER */}
      <div
        className={`px-5 py-4 border-t flex flex-wrap gap-4 text-xs ${
          darkMode
            ? "border-white/10 bg-white/5 text-gray-300"
            : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          High Risk
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          Medium Risk
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Low Risk
        </div>
        <div className="ml-auto opacity-70">
          Real-time civic intelligence mapping system
        </div>
      </div>
    </motion.section>
  );
};

export default AlertsMap;