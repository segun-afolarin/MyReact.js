import { motion } from "framer-motion";
import { useState } from "react";


import {
  FiSun,
  FiMoon,
  FiLayout,
  FiZap,
  FiMap,
  FiEye,
  FiSettings,
  FiMonitor
} from "react-icons/fi";



const SettingsAppearance = ({ darkMode }) => {

  const [compactUI, setCompactUI] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [mapStyle, setMapStyle] = useState(true);
  const [autoTheme, setAutoTheme] = useState(false);

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
              <FiMonitor />
              UI Engine
            </div>

            <h2 className="mt-3 text-3xl font-black">
              Appearance Settings
            </h2>

            <p className="mt-2 opacity-60 max-w-xl">
              Customize how your citizen dashboard looks and feels.
            </p>

          </div>

          <div className="border border-green-500/30 bg-green-500/10 p-5">
            <p className="text-xs opacity-60">Theme Mode</p>
            <h3 className="text-4xl font-black text-green-500">
              {darkMode ? "DARK" : "LIGHT"}
            </h3>
          </div>

        </div>

        {/* SETTINGS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">

          <Card
            icon={<FiLayout />}
            title="Compact UI"
            text="Reduce spacing for dense data view"
            enabled={compactUI}
            setEnabled={setCompactUI}
          />

          <Card
            icon={<FiZap />}
            title="Animations"
            text="Enable smooth motion effects"
            enabled={animations}
            setEnabled={setAnimations}
          />

          <Card
            icon={<FiMap />}
            title="Map Style Mode"
            text="Enable enhanced civic map visuals"
            enabled={mapStyle}
            setEnabled={setMapStyle}
          />

          <Card
            icon={darkMode ? <FiMoon /> : <FiSun />}
            title="Auto Theme"
            text="Match system dark/light preference"
            enabled={autoTheme}
            setEnabled={setAutoTheme}
          />

        </div>

        {/* PREVIEW */}
        <div className="mt-8 border border-green-500/20 bg-green-500/[0.04] p-5 flex flex-col sm:flex-row gap-4 items-center">

          <div className="text-green-500 text-xl">
            <FiEye />
          </div>

          <div>
            <h3 className="font-bold">Live Preview Engine</h3>
            <p className="text-sm opacity-60">
              Changes apply instantly across your citizen dashboard interface.
            </p>
          </div>

          <div className="sm:ml-auto text-green-500 font-black">
            ACTIVE
          </div>

        </div>

        {/* NOTE */}
        <div className="mt-5 border border-green-500/20 p-5 flex gap-4 items-center">

          <div className="text-green-500 text-xl">
            <FiSettings />
          </div>

          <p className="text-sm opacity-70">
            Appearance settings affect only UI behavior, not your civic data or security settings.
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
  setEnabled
}) => {

  return (
    <div className="border border-green-500/20 bg-green-500/[0.04] p-5 hover:bg-green-500/[0.1] transition">

      <div className="flex justify-between items-start">

        <div className="text-green-500 text-2xl">
          {icon}
        </div>

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

      </div>

      <h3 className="font-bold mt-5">{title}</h3>
      <p className="text-sm opacity-60 mt-1">{text}</p>

    </div>
  );
};

export default SettingsAppearance;