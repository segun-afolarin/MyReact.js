import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFileText, FiCpu, FiUsers, FiCheckCircle, FiSend } from "react-icons/fi";

const heroSlides = [
  {
    title: "Together for a Better Nigeria",
    description:
      "Join thousands of citizens building safer, stronger communities — one report at a time.",
  },
  {
    title: "Your Voice Can Build the Nation",
    description:
      "Every pothole, flood, and broken streetlight you report moves your community forward.",
  },
  {
    title: "One Report Can Change a Community",
    description:
      "Small actions create real transparency and faster action for the people around you.",
  },
  {
    title: "See Something? Say Something.",
    description:
      "NationAura turns what you see on the ground into action from the people who can fix it.",
  },
  {
    title: "Stronger Communities Start With You",
    description:
      "From Lagos to Kano, every voice reported here helps write Nigeria's next chapter.",
  },
];

const flowSteps = [
  { key: "submit", label: "Submit report", icon: FiFileText, note: "Broken streetlight — photo & location attached" },
  { key: "ai", label: "AI reviewing", icon: FiCpu, note: "Checking issue type & filtering duplicates" },
  { key: "confirm", label: "Awaiting confirmation", icon: FiUsers, note: "" },
  { key: "confirmed", label: "Community confirmed", icon: FiCheckCircle, note: "5 of 5 nearby citizens confirmed" },
  { key: "sent", label: "Sent to government", icon: FiSend, note: "Forwarded to Kwara State authorities · Ref #NA-2291" },
];

const chips = [
  { text: "Streetlight fixed — Abuja" },
  { text: "Flood alert — Lagos Mainland" },
  { text: "Road repair verified — Kano" },
  { text: "New report — Enugu" },
];

const tickerItems = [
  { code: "NA-2291", text: "Pothole verified — Ojuelegba Rd, Lagos", status: "VERIFIED" },
  { code: "NA-2288", text: "Flood risk flagged — Ikorodu Road", status: "URGENT" },
  { code: "NA-2276", text: "Streetlight restored — Wuse II, Abuja", status: "RESOLVED" },
  { code: "NA-2270", text: "Blocked drainage reported — Kano Municipal", status: "PENDING" },
  { code: "NA-2264", text: "Bridge inspection requested — Onitsha", status: "PENDING" },
  { code: "NA-2251", text: "Waste collection resumed — Port Harcourt", status: "RESOLVED" },
];

const statusColor = {
  VERIFIED: "text-emerald-400",
  RESOLVED: "text-emerald-400",
  URGENT: "text-orange-400",
  PENDING: "text-gray-400",
};

const stats = [
  { value: "12,847", label: "Reports filed" },
  { value: "94%", label: "Acknowledged in 48h" },
  { value: "36", label: "States covered" },
];

const HeroSection = () => {
  const [slide, setSlide] = useState(0);
  const [step, setStep] = useState(0);
  const [chipIndex, setChipIndex] = useState(0);
  const [confirmCount, setConfirmCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % flowSteps.length), 2400);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (flowSteps[step].key !== "confirm") return;
    setConfirmCount(0);
    const c = setInterval(() => {
      setConfirmCount((n) => (n < 5 ? n + 1 : n));
    }, 400);
    return () => clearInterval(c);
  }, [step]);

  useEffect(() => {
    const t = setInterval(() => setChipIndex((c) => (c + 1) % chips.length), 3600);
    return () => clearInterval(t);
  }, []);

  const Icon = flowSteps[step].icon;
  const chip = chips[chipIndex];
  const currentKey = flowSteps[step].key;
  const currentNote = currentKey === "confirm" ? `${confirmCount} of 5 confirmations` : flowSteps[step].note;
  const showConfirmDots = currentKey === "confirm" || currentKey === "confirmed";
  const filledDots = currentKey === "confirmed" ? 5 : confirmCount;

  // ---- Shared screen content (identical across phone/laptop/desktop) ----
  const ScreenHeader = ({ compact }) => (
    <div className={`bg-gradient-to-r from-green-600 to-emerald-700 ${compact ? "px-5 pt-8 pb-4" : "px-6 py-4"}`}>
      <p className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-white/60">New Report</p>
      <h4 className="text-base sm:text-lg font-bold mt-1 text-white">{flowSteps[step].label}</h4>
    </div>
  );

  const ScreenBody = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center text-center"
        >
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-5 sm:mb-6 ${
              step === 4 ? "bg-green-50 text-green-600" : "bg-gray-50 text-black"
            }`}
          >
            <Icon size={28} className="sm:w-8 sm:h-8" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-black">{currentNote}</p>
          {showConfirmDots && (
            <div className="flex items-center gap-1.5 mt-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i < filledDots ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 mt-6 sm:mt-8">
        {flowSteps.map((s, i) => (
          <span
            key={s.key}
            className={`h-1.5 transition-all duration-300 ${
              i === step ? "w-5 sm:w-[22px] bg-green-500" : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );

  const ScreenFooter = () => (
    <div className="px-5 sm:px-6 pb-6 sm:pb-8 pt-4">
      <div
        className={`w-full py-3 sm:py-3.5 text-center text-xs sm:text-sm font-semibold ${
          step === 4 ? "bg-green-500 text-white" : "bg-gradient-to-r from-green-600 to-emerald-700 text-white"
        }`}
      >
        {step === 4 ? "Report tracked" : "Next step"}
      </div>
    </div>
  );

  return (
    <section
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-[84px]"
      style={{ background: "linear-gradient(135deg, #052E16 0%, #166534 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-24 -right-24 sm:-top-32 sm:-right-32 w-64 h-64 sm:w-[420px] sm:h-[420px] bg-emerald-400/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 -left-24 w-64 h-64 sm:w-80 sm:h-80 bg-lime-300/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center py-10 sm:py-14 lg:py-20">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 sm:space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-3 border border-white/15 bg-white/10 px-4 py-2 text-white/90">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-300" />
              <span className="relative inline-flex h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase">Live Civic Network</span>
          </div>

          <div className="min-h-[128px] sm:min-h-[152px] lg:min-h-[176px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.05] font-black tracking-tight text-white">
                  {heroSlides[slide].title}
                </h1>
                <p className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 text-white/75 mt-5">
                  {heroSlides[slide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Show headline ${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${slide === i ? "w-7 bg-white" : "w-1.5 bg-white/30"}`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 pt-2">
            <motion.button
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden h-13 px-7 py-4 sm:py-0 font-semibold text-[#052E16] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
            >
              <span className="absolute inset-0 bg-black/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Report an Issue
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-13 px-7 py-4 sm:py-0 font-semibold border border-white/25 bg-white/5 text-white hover:bg-white/10 transition-colors duration-300"
            >
              Explore Live Map
            </motion.button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 max-w-md mx-auto lg:mx-0">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3 }}
                className="border border-white/10 bg-white/5 p-3 sm:p-4 transition-all duration-300 hover:bg-white/[0.08]"
              >
                <h3 className="text-lg sm:text-2xl font-black text-white">{s.value}</h3>
                <p className="mt-1 text-[11px] sm:text-xs leading-tight text-white/55">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: DEVICE MOCKUP — phone on mobile, laptop on lg, desktop monitor on xl+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center lg:justify-end pt-4 lg:pt-0"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 lg:left-auto lg:right-2 xl:right-6 z-20 hidden sm:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={chipIndex}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium border border-black/5 shadow-xl whitespace-nowrap bg-white text-[#052E16]"
              >
                <span className="w-2 h-2 bg-emerald-500 shrink-0" />
                {chip.text}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ===== PHONE — shown below lg ===== */}
          <div className="block lg:hidden">
            <div
              className="relative w-[240px] sm:w-[290px] rounded-[40px] sm:rounded-[46px] p-[3px] bg-gradient-to-b from-neutral-700 to-neutral-900"
              style={{ boxShadow: "0 40px 90px rgba(0,0,0,0.45)" }}
            >
              <div className="rounded-[37px] sm:rounded-[43px] p-2.5 sm:p-3 bg-black">
                {/* side buttons */}
                <span className="absolute -left-[3px] top-24 w-[3px] h-8 bg-neutral-800 rounded-r-sm" />
                <span className="absolute -left-[3px] top-36 w-[3px] h-12 bg-neutral-800 rounded-r-sm" />
                <span className="absolute -right-[3px] top-32 w-[3px] h-16 bg-neutral-800 rounded-l-sm" />

                {/* dynamic island / notch */}
                <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 rounded-full z-10 bg-black" />

                <div className="rounded-[28px] sm:rounded-[34px] overflow-hidden h-[400px] sm:h-[500px] flex flex-col bg-white">
                  <ScreenHeader compact />
                  <ScreenBody />
                  <ScreenFooter />
                </div>
              </div>
              {/* home indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/70" />
            </div>
          </div>

          {/* ===== LAPTOP — shown lg to <xl ===== */}
          <div className="hidden lg:block xl:hidden">
            <div className="relative w-[500px]" style={{ filter: "drop-shadow(0 35px 60px rgba(0,0,0,0.4))" }}>
              {/* lid / screen bezel */}
              <div className="rounded-t-[10px] rounded-b-[3px] border-[9px] border-b-[3px] border-neutral-800 bg-neutral-800">
                {/* camera dot */}
                <div className="absolute top-[1px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-600 z-10" />
                <div className="overflow-hidden h-[300px] flex flex-col bg-white">
                  <ScreenHeader />
                  <ScreenBody />
                  <ScreenFooter />
                </div>
              </div>
              {/* base / chassis */}
              <div className="relative h-[14px] bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-[2px]">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-neutral-500/40" />
              </div>
              {/* wedge foot that extends wider than the lid, like a real laptop base */}
              <div className="relative mx-auto -mt-[1px]" style={{ width: "112%", marginLeft: "-6%" }}>
                <div className="h-[10px] bg-gradient-to-b from-neutral-200 to-neutral-350 rounded-b-2xl shadow-[0_10px_20px_rgba(0,0,0,0.25)]" style={{ background: "linear-gradient(to bottom, #e5e5e5, #b8b8b8)" }} />
                {/* trackpad notch cut */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-[1px] w-24 h-[5px] bg-neutral-400/50 rounded-b-md" />
              </div>
            </div>
          </div>

          {/* ===== DESKTOP MONITOR — shown xl and up ===== */}
          <div className="hidden xl:block">
            <div className="relative" style={{ filter: "drop-shadow(0 40px 70px rgba(0,0,0,0.4))" }}>
              {/* monitor bezel */}
              <div className="w-[580px] rounded-[14px] border-[12px] border-neutral-900 bg-neutral-900">
                {/* camera dot */}
                <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neutral-700 z-10" />
                <div className="overflow-hidden h-[340px] flex flex-col bg-white rounded-[2px]">
                  <ScreenHeader />
                  <ScreenBody />
                  <ScreenFooter />
                </div>
              </div>
              {/* bottom chin */}
              <div className="w-[580px] h-[10px] bg-neutral-900 rounded-b-md" />
              {/* neck */}
              <div className="mx-auto w-[46px] h-[54px] bg-gradient-to-b from-neutral-700 to-neutral-800" />
              {/* weighted circular base */}
              <div className="mx-auto w-[200px] h-[16px] bg-gradient-to-b from-neutral-600 to-neutral-800 rounded-[50%] -mt-1" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* LIVE TICKER STRIP */}
      <div className="relative z-10 border-t border-white/10 bg-[#0B1218] overflow-hidden mt-8 sm:mt-10">
        <div className="flex items-center py-3.5 sm:py-4">
          <div className="ticker-track flex items-center gap-6 sm:gap-10 pr-6 sm:pr-10 whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <span className="text-[10px] sm:text-[11px] px-2 py-1 bg-white/[0.06] text-gray-300">{item.code}</span>
                <span className="text-xs sm:text-sm text-gray-300">{item.text}</span>
                <span className={`text-[9px] sm:text-[10px] tracking-[0.12em] font-semibold ${statusColor[item.status]}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ticker-track {
          width: max-content;
          animation: ticker-scroll 32s linear infinite;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;