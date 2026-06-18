import { motion } from "framer-motion";
import { useState } from "react";

import {
  FiCpu,
  FiZap,
  FiBarChart2,
  FiMessageSquare,
  FiShield,
  FiActivity,
  FiEye,
  FiTarget
} from "react-icons/fi";



const SettingsAI = ({ darkMode }) => {

  const [autoInsights, setAutoInsights] = useState(true);
  const [smartReplies, setSmartReplies] = useState(true);
  const [riskDetection, setRiskDetection] = useState(true);
  const [confidenceMode, setConfidenceMode] = useState(true);

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
              <FiCpu />
              AI Engine
            </div>

            <h2 className="mt-3 text-3xl font-black">
              Civic Intelligence Settings
            </h2>

            <p className="mt-2 opacity-60 max-w-xl">
              Control how AI analyzes reports, detects risks, and generates civic insights.
            </p>

          </div>

          <div className="border border-green-500/30 bg-green-500/10 p-5">
            <p className="text-xs opacity-60">AI Status</p>
            <h3 className="text-4xl font-black text-green-500">
              ACTIVE
            </h3>
          </div>

        </div>

        {/* CARDS */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">

          <Card
            icon={<FiBarChart2 />}
            title="Auto Insights"
            text="AI generates insights from reports automatically"
            enabled={autoInsights}
            setEnabled={setAutoInsights}
          />

          <Card
            icon={<FiMessageSquare />}
            title="Smart Replies"
            text="AI suggests responses for civic reports"
            enabled={smartReplies}
            setEnabled={setSmartReplies}
          />

          <Card
            icon={<FiShield />}
            title="Risk Detection"
            text="Detect high-risk or urgent civic issues"
            enabled={riskDetection}
            setEnabled={setRiskDetection}
          />

          <Card
            icon={<FiTarget />}
            title="Confidence Mode"
            text="Show AI confidence level on analysis"
            enabled={confidenceMode}
            setEnabled={setConfidenceMode}
          />

        </div>

        {/* AI STATUS PANEL */}
        <div className="mt-8 border border-green-500/20 bg-green-500/[0.04] p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">

          <div className="text-green-500 text-xl">
            <FiActivity />
          </div>

          <div>
            <h3 className="font-bold">AI Processing Engine</h3>
            <p className="text-sm opacity-60">
              Your civic AI continuously learns from verified reports to improve accuracy.
            </p>
          </div>

          <div className="sm:ml-auto text-green-500 font-black">
            94% Accuracy
          </div>

        </div>

        {/* SAFETY NOTE */}
        <div className="mt-5 border border-green-500/20 p-5 flex gap-4 items-center">

          <div className="text-green-500 text-xl">
            <FiEye />
          </div>

          <p className="text-sm opacity-70">
            AI analysis is limited to verified civic data only. No personal surveillance is performed.
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

export default SettingsAI;