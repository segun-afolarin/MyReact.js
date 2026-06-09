import { motion } from "framer-motion";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AlertsMap = ({ darkMode }) => {
  const locations = [
    {
      name: "Gwange",
      alerts: 3,
      lat: 11.8464,
      lng: 13.1603,
    },
    {
      name: "Bolori",
      alerts: 2,
      lat: 11.833,
      lng: 13.145,
    },
    {
      name: "Maiduguri North",
      alerts: 1,
      lat: 11.87,
      lng: 13.17,
    },
    {
      name: "Custom Area",
      alerts: 2,
      lat: 11.855,
      lng: 13.19,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative border overflow-hidden ${
        darkMode
          ? "bg-[#0B1218] border-white/10"
          : "bg-white border-gray-200"
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
              Live incident distribution across your area
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-500">
          <FiNavigation />
          Live Tracking Enabled
        </div>
      </div>

      {/* REAL MAP */}
      <div className="h-[420px] sm:h-[480px]">
        <MapContainer
          center={[11.8464, 13.1603]}
          zoom={14}
          scrollWheelZoom={true}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc, index) => (
            <Marker
              key={index}
              position={[loc.lat, loc.lng]}
            >
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                {loc.alerts} active alerts
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

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