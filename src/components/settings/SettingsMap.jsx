import { motion } from "framer-motion";
import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import {
  FiMap,
  FiMapPin,
  FiNavigation,
  FiShield,
  FiGlobe,
  FiTarget
} from "react-icons/fi";



// Fix default marker icon issue in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});



const SettingsMap = ({ darkMode }) => {

  const [showMap, setShowMap] = useState(true);
  const [geoTag, setGeoTag] = useState(true);
  const [liveLocation, setLiveLocation] = useState(false);

  // Kano coordinates (you can change anytime)
  const position = [12.0022, 8.5920];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        relative overflow-hidden border p-5 sm:p-8
        ${darkMode
          ? "bg-[#081019] border-white/10 text-white"
          : "bg-white border-gray-200 text-black shadow-xl"}
      `}
    >

      {/* green glow */}
      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-green-500/20 blur-[120px]" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div>
            <div className="flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-[.25em]">
              <FiMap />
              Location Control
            </div>

            <h2 className="mt-3 text-3xl font-black">
              Map & Privacy Settings
            </h2>

            <p className="mt-2 opacity-60 max-w-xl">
              Control how your location data is used in reports and civic mapping.
            </p>
          </div>

          <div className="border border-green-500/30 bg-green-500/10 p-5">
            <p className="text-xs opacity-60">Location Status</p>
            <h3 className="text-4xl font-black text-green-500">
              ACTIVE
            </h3>
          </div>

        </div>

        {/* MAP */}
        <div className="mt-10 border border-green-500/20 bg-green-500/[0.04] p-3">

          <div className="flex items-center gap-2 text-green-500 font-bold mb-3">
            <FiTarget />
            Live Leaflet Map
          </div>

          <div className="h-72 border border-green-500/20 overflow-hidden">

            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={position}>
                <Popup>
                  You are here (Kano Civic Zone)
                </Popup>
              </Marker>

            </MapContainer>

          </div>

        </div>

        {/* SETTINGS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">

          <Card
            icon={<FiMap />}
            title="Map Visibility"
            text="Show your activity on civic map"
            enabled={showMap}
            setEnabled={setShowMap}
          />

          <Card
            icon={<FiMapPin />}
            title="Geo Tagging"
            text="Attach location to reports"
            enabled={geoTag}
            setEnabled={setGeoTag}
          />

          <Card
            icon={<FiNavigation />}
            title="Live Location"
            text="Share real-time updates"
            enabled={liveLocation}
            setEnabled={setLiveLocation}
          />

          <Card
            icon={<FiGlobe />}
            title="Public Map Data"
            text="Anonymous civic insights"
            value="Enabled"
          />

        </div>

        {/* SECURITY */}
        <div className="mt-6 border border-green-500/20 p-5 flex gap-4 items-center">
          <div className="text-green-500 text-xl">
            <FiShield />
          </div>

          <p className="text-sm opacity-70">
            Your location data is encrypted and only used for verified civic reporting.
          </p>
        </div>

      </div>

    </motion.section>
  );
};



const Card = ({
  icon,
  title,
  text,
  enabled,
  setEnabled,
  value
}) => {

  return (
    <div className="border border-green-500/20 bg-green-500/[0.04] p-5 hover:bg-green-500/[0.1] transition">

      <div className="flex justify-between items-start">

        <div className="text-green-500 text-2xl">
          {icon}
        </div>

        {setEnabled ? (
          <button
            onClick={() => setEnabled(!enabled)}
            className={`
              w-12 h-6 border border-green-500/30
              ${enabled ? "bg-green-500" : "bg-green-950"}
            `}
          >
            <div
              className={`
                w-4 h-4 bg-white transition
                ${enabled ? "ml-7" : "ml-1"}
              `}
            />
          </button>
        ) : (
          <div className="text-green-500 font-bold text-sm">
            {value}
          </div>
        )}

      </div>

      <h3 className="font-bold mt-5">{title}</h3>
      <p className="text-sm opacity-60 mt-1">{text}</p>

    </div>
  );
};

export default SettingsMap;