import { motion } from "framer-motion";
import { FiCheckCircle, FiTarget, FiArrowUpRight } from "react-icons/fi";

import Container from "../ui/Container";

const goals = [
  "Build a safer and more transparent Nigeria",
  "Improve accountability in infrastructure management",
  "Connect citizens directly with real change",
  "Empower communities through civic technology",
  "Encourage faster response to public issues",
];

const GoalsSection = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fffb] via-white to-[#ecfdf5]" />

      {/* GRID PATTERN */}
      <div
        className="absolute inset-0 opacity-[0.04]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:40px_40px] sm:bg-[size:55px_55px] md:bg-[size:70px_70px]"
      />

      {/* GLOW */}
      <div className="absolute top-0 left-0 h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] md:h-[500px] md:w-[500px] bg-green-200/30 blur-3xl" />

      <Container>
        <div className="relative z-10 grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-green-700 mb-6 sm:mb-8">
              <FiTarget className="text-sm sm:text-base" />
              Mission & Goals
            </div>

            {/* TITLE */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] sm:leading-[1.05] text-black">
              Building A Transparent Future For Nigeria
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-5 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              NationAura empowers citizens to report, track, and improve
              infrastructure systems through transparency, accountability,
              and civic technology.
            </p>

            {/* FLOATING ICON */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="hidden lg:flex mt-10 md:mt-14 h-16 w-16 md:h-20 md:w-20 items-center justify-center border border-green-500/20 bg-white/70 text-2xl md:text-3xl text-green-600 shadow-[0_20px_50px_rgba(34,197,94,0.1)] backdrop-blur-xl"
            >
              <FiArrowUpRight />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {/* TIMELINE LINE */}
            <div className="hidden sm:block absolute top-0 left-4 sm:left-5 h-full w-[2px] bg-gradient-to-b from-green-500 via-emerald-400 to-transparent" />

            <div className="space-y-6 sm:space-y-8">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                  className="relative"
                >
                  {/* TIMELINE DOT */}
                  <div className="hidden sm:flex absolute left-0 top-8 md:top-10 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center bg-green-600 text-white text-sm sm:text-base shadow-xl z-20">
                    <FiCheckCircle />
                  </div>

                  {/* CARD */}
                  <div className="relative overflow-hidden border border-black/10 bg-white/80 p-5 sm:p-6 md:p-8 shadow-[0_15px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:border-green-500/30 hover:shadow-[0_20px_80px_rgba(34,197,94,0.12)] sm:ml-16 md:ml-20">
                    {/* CARD GLOW */}
                    <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 h-32 w-32 sm:h-40 sm:w-40 bg-green-400/10 opacity-0 blur-3xl transition-all duration-700 hover:opacity-100" />

                    {/* NUMBER */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-5xl font-black text-black/[0.04]">
                      0{index + 1}
                    </div>

                    {/* MOBILE ICON */}
                    <div className="sm:hidden mb-5 flex h-12 w-12 items-center justify-center bg-green-600 text-xl text-white">
                      <FiCheckCircle />
                    </div>

                    {/* TEXT */}
                    <p className="relative z-10 max-w-xl text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-800 pr-10 sm:pr-0">
                      {goal}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GoalsSection;