import { motion } from "framer-motion";
import { useState } from "react";

import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiMapPin,
  FiShield,
  FiDatabase,
  FiUserCheck,
  FiAlertTriangle
} from "react-icons/fi";



const SettingsPrivacy = ({ darkMode }) => {

  const [dataSharing, setDataSharing] = useState(true);
  const [anonymizeReports, setAnonymizeReports] = useState(true);
  const [locationPrivacy, setLocationPrivacy] = useState(true);
  const [aiUsage, setAiUsage] = useState(true);

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
              <FiLock />
              Privacy Center
            </div>

            <h2 className="mt-3 text-3xl font-black">
              Data & Privacy Control
            </h2>

            <p className="mt-2 opacity-60 max-w-xl">
              Manage how your civic data is collected, shared, and used across the platform.
            </p>

          </div>

          <div className="border border-green-500/30 bg-green-500/10 p-5">
            <p className="text-xs opacity-60">Privacy Level</p>
            <h3 className="text-4xl font-black text-green-500">
              HIGH
            </h3>
          </div>

        </div>

        {/* SETTINGS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">

          <Card
            icon={<FiDatabase />}
            title="Data Sharing"
            text="Allow civic system data analysis"
            enabled={dataSharing}
            setEnabled={setDataSharing}
          />

          <Card
            icon={<FiEye />}
            title="Anonymize Reports"
            text="Hide personal identity in public reports"
            enabled={anonymizeReports}
            setEnabled={setAnonymizeReports}
          />

          <Card
            icon={<FiMapPin />}
            title="Location Privacy"
            text="Control location visibility in reports"
            enabled={locationPrivacy}
            setEnabled={setLocationPrivacy}
          />

          <Card
            icon={<FiUserCheck />}
            title="AI Data Usage"
            text="Allow AI to analyze civic activity"
            enabled={aiUsage}
            setEnabled={setAiUsage}
          />

        </div>

        {/* WARNING */}
        <div className="mt-8 border border-green-500/30 bg-green-500/[0.04] p-5 flex gap-4 items-center">

          <div className="text-green-500 text-xl">
            <FiAlertTriangle />
          </div>

          <p className="text-sm opacity-70">
            Disabling data sharing may reduce AI accuracy and limit civic impact analysis.
          </p>

        </div>

        {/* SECURITY FOOTER */}
        <div className="mt-5 border border-green-500/20 p-5 flex gap-4 items-center">

          <div className="text-green-500 text-xl">
            <FiShield />
          </div>

          <p className="text-sm opacity-70">
            All civic data is encrypted and protected under Nation Aura security protocols.
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

export default SettingsPrivacy;