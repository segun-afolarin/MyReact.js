import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { motion } from "framer-motion";

import {
  FiMapPin,
  FiNavigation,
  FiRadio,
  FiCheckCircle,
} from "react-icons/fi";

/* CUSTOM GREEN ICON */
const greenIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  iconSize: [30, 45],

  iconAnchor: [15, 45],
});

/* LIVE LOCATION */
const FlyToLocation = ({
  position,
}) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, {
        duration: 2,
      });
    }
  }, [position, map]);

  return null;
};

const ReportsMap = ({ darkMode }) => {
  const [userLocation, setUserLocation] =
    useState([12.0022, 8.5920]);

  const [loading, setLoading] =
    useState(true);

  const reports = [
    {
      id: 1,
      title: "Flooding",
      area: "Nasarawa",
      position: [12.015, 8.55],
      status: "Waiting Verification",
      confirmations: 12,
    },

    {
      id: 2,
      title: "Bad Road",
      area: "Tarauni",
      position: [11.99, 8.52],
      status: "Confirmed",
      confirmations: 27,
    },

    {
      id: 3,
      title: "Power Failure",
      area: "Gwale",
      position: [12.02, 8.61],
      status: "Pending Review",
      confirmations: 8,
    },
  ];

  /* GET REAL LOCATION */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);

        setLoading(false);
      },

      () => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <section
      className={`
      relative
      overflow-hidden
      border
      ${
        darkMode
          ? `
            bg-[#081019]
            border-white/10
          `
          : `
            bg-white
            border-gray-200
          `
      }
      `}
    >
      {/* HEADER */}
      <div
        className="
        p-5
        sm:p-6
        border-b
        border-white/10
        "
      >
        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          "
        >
          <div>
            <p
              className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              font-bold
              text-green-500
              "
            >
              Live Civic Tracking
            </p>

            <h2
              className={`
              mt-3
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-black
              leading-[1]
              tracking-[-0.05em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              Real-Time Citizen
              <span className="block text-green-500">
                Infrastructure Map
              </span>
            </h2>

            <p
              className={`
              mt-4
              max-w-2xl
              text-sm
              sm:text-base
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
              `}
            >
              Track your submitted
              reports, confirmations,
              and nearby civic issues
              directly on the live map.
            </p>
          </div>

          {/* LIVE STATUS */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="
            flex
            items-center
            gap-3
            border
            border-green-500/20
            bg-green-500/10
            px-5
            py-4
            "
          >
            <div
              className="
              relative
              flex
              items-center
              justify-center
              w-12
              h-12
              bg-green-500/20
              text-green-400
              text-xl
              "
            >
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="
                absolute
                inset-0
                bg-green-500/20
                "
              />

              <FiRadio className="relative z-10" />
            </div>

            <div>
              <p
                className="
                text-xs
                uppercase
                tracking-[0.2em]
                text-green-400
                "
              >
                AI Monitoring
              </p>

              <h4
                className={`
                mt-1
                text-lg
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                Live Tracking Active
              </h4>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MAP */}
      <div className="h-[650px] w-full">
        {loading ? (
          <div
            className="
            h-full
            flex
            items-center
            justify-center
            "
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="
              w-16
              h-16
              border-4
              border-green-500
              border-t-transparent
              rounded-full
              "
            />
          </div>
        ) : (
          <MapContainer
            center={userLocation}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
          >
            {/* REAL MAP */}
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* USER */}
            <Marker
              position={userLocation}
              icon={greenIcon}
            >
              <Popup>
                <div className="space-y-2">
                  <h3 className="font-bold">
                    Your Location
                  </h3>

                  <p>
                    NationAura is tracking
                    nearby civic reports.
                  </p>
                </div>
              </Popup>
            </Marker>

            {/* USER RADIUS */}
            <Circle
              center={userLocation}
              radius={1200}
              pathOptions={{
                color: "#22c55e",
                fillColor: "#22c55e",
                fillOpacity: 0.1,
              }}
            />

            {/* REPORTS */}
            {reports.map((report) => (
              <Marker
                key={report.id}
                position={report.position}
                icon={greenIcon}
              >
                <Popup>
                  <div className="w-[220px]">
                    <div
                      className="
                      flex
                      items-center
                      justify-between
                      "
                    >
                      <h3 className="font-black text-lg">
                        {report.title}
                      </h3>

                      <FiCheckCircle className="text-green-500" />
                    </div>

                    <p className="mt-2 text-sm">
                      {report.area}
                    </p>

                    <p className="mt-2 text-sm text-green-600 font-semibold">
                      {
                        report.confirmations
                      }{" "}
                      citizens confirmed
                    </p>

                    <button
                      className="
                      mt-4
                      w-full
                      h-11
                      bg-green-500
                      text-white
                      font-bold
                      "
                    >
                      Track Response
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* FLY TO USER */}
            <FlyToLocation
              position={userLocation}
            />
          </MapContainer>
        )}
      </div>
    </section>
  );
};

export default ReportsMap;