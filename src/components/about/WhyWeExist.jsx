import { motion } from "framer-motion";
import { FiArrowUpRight, FiActivity } from "react-icons/fi";

import Container from "../ui/Container";

const WhyWeExist = () => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-20">
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:40px_40px] sm:bg-[size:60px_60px] md:bg-[size:80px_80px]"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-black/10 bg-gradient-to-br from-white via-[#f8fffb] to-[#ecfdf5] p-6 sm:p-10 lg:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.04)]"
        >
          {/* TOP ACCENT */}
          <div className="absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-700" />

          {/* TOP RIGHT GLOW */}
          <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 h-52 w-52 sm:h-72 sm:w-72 bg-green-500/10 blur-3xl" />

          {/* BOTTOM LEFT GLOW */}
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] md:h-[500px] md:w-[500px] bg-emerald-200/30 blur-3xl" />

          {/* CONTENT */}
          <div className="relative z-10 grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[1fr_120px] lg:gap-12">
            {/* LEFT SIDE */}
            <div>
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-green-700 mb-5 sm:mb-6 md:mb-8">
                <FiActivity className="text-sm sm:text-base" />
                Why We Exist
              </div>

              {/* TITLE */}
              <h2 className="max-w-5xl text-3xl sm:text-4xl md:text-6xl font-black leading-[1.15] sm:leading-[1.05] tracking-tight text-black">
                Solving Nigeria's Infrastructure Reporting Crisis
              </h2>

              {/* DESCRIPTION */}
              <div className="mt-6 sm:mt-8 md:mt-10 max-w-3xl space-y-4 sm:space-y-5 md:space-y-6">
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  Across many communities, infrastructure failures are
                  ignored, delayed, or poorly documented.
                </p>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Citizens lack direct systems to report issues, monitor
                  progress, and hold institutions accountable.
                </p>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  NationAura bridges this gap through civic technology, AI
                  verification, transparency systems, and community-driven
                  reporting.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden h-full flex-col items-end justify-between lg:flex">
              {/* BIG NUMBER */}
              <div className="text-[7rem] font-black leading-none text-green-900/[0.05] select-none">
                01
              </div>

              {/* ICON */}
              <motion.div
                whileHover={{ rotate: 45 }}
                className="flex h-16 w-16 items-center justify-center border border-black/10 bg-green-50 text-2xl text-green-600"
              >
                <FiArrowUpRight />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyWeExist;