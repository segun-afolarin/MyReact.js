import { motion } from "framer-motion";
import { FiUsers, FiMapPin, FiCpu, FiShield, FiArrowUpRight } from "react-icons/fi";

import Container from "../ui/Container";

const aboutCards = [
  {
    title: "Who We Are",
    icon: <FiUsers />,
    description:
      "NationAura is a citizen-powered civic-tech platform focused on infrastructure reporting, accountability, and transparency across Nigeria.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "What We Do",
    icon: <FiMapPin />,
    description:
      "We help citizens report infrastructure issues using images, GPS location, and detailed descriptions while enabling real-time tracking and monitoring.",
    gradient: "from-emerald-500 to-green-700",
  },
  {
    title: "AI Verification",
    icon: <FiCpu />,
    description:
      "NationAura uses AI systems and community verification to confirm reports before sending them to relevant authorities and organizations.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    title: "Transparency & Trust",
    icon: <FiShield />,
    description:
      "We promote transparent communication between citizens, NGOs, and authorities to improve response speed and accountability.",
    gradient: "from-green-600 to-emerald-700",
  },
];

const AboutGrid = () => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-20">
      {/* BACKGROUND GRID */}
      <div
        className="absolute inset-0 opacity-[0.04]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:40px_40px] sm:bg-[size:60px_60px] md:bg-[size:80px_80px]"
      />

      <Container>
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-green-700 mb-4 sm:mb-6">
            NationAura Core
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight text-black">
            Infrastructure Reporting Reimagined For Nigeria
          </h2>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -12 }}
              className="group"
            >
              <div className="relative h-full overflow-hidden border border-black/10 bg-white p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-green-500/40 hover:shadow-[0_25px_80px_rgba(34,197,94,0.15)]">
                {/* ANIMATED TOP LINE */}
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`absolute top-0 left-0 h-[3px] bg-gradient-to-r ${card.gradient}`}
                />

                {/* GLOW */}
                <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 h-40 w-40 sm:h-52 sm:w-52 bg-green-500/10 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100" />

                {/* CARD CONTENT */}
                <div className="relative z-10">
                  {/* TOP */}
                  <div className="flex items-start justify-between mb-6 sm:mb-8 md:mb-10">
                    {/* ICON */}
                    <div
                      className={`flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center bg-gradient-to-br ${card.gradient} text-white text-2xl sm:text-3xl shadow-2xl`}
                    >
                      {card.icon}
                    </div>

                    {/* ARROW */}
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="text-xl sm:text-2xl text-gray-300 transition-all group-hover:text-green-600"
                    >
                      <FiArrowUpRight />
                    </motion.div>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-black mb-3 sm:mb-4 md:mb-6">
                    {card.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutGrid;