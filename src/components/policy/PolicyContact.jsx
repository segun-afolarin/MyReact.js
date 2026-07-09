import { motion } from "framer-motion";
import {
  FiMail,
  FiMessageSquare,
  FiHelpCircle,
  FiArrowUpRight,
  FiShield,
  FiCpu,
} from "react-icons/fi";

const supportItems = [
  {
    title: "Policy Questions",
    description:
      "Get clarity about privacy, reporting guidelines, transparency systems, and platform policies.",
    icon: <FiHelpCircle />,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Platform Feedback",
    description:
      "Share suggestions, report bugs, or help improve the NationAura civic experience.",
    icon: <FiMessageSquare />,
    gradient: "from-emerald-500 to-green-700",
  },
  {
    title: "Security & Trust",
    description:
      "Reach out regarding account protection, verification systems, or suspicious activity.",
    icon: <FiShield />,
    gradient: "from-green-400 to-emerald-500",
  },
];

const PolicyContact = () => {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-12 pb-14 sm:pb-20 md:pb-28">
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.03]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:45px_45px] sm:bg-[size:65px_65px] md:bg-[size:90px_90px]"
      />

      {/* GLOW */}
      <div className="absolute top-0 right-[-100px] sm:right-[-150px] h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden border border-black/10 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.08)]">
        {/* TOP GRADIENT LINE */}
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute top-0 left-0 h-[3px] sm:h-[4px] bg-gradient-to-r from-green-500 via-emerald-500 to-green-700"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative border-b border-black/10 p-5 sm:p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-16"
          >
            {/* LABEL */}
            <div className="inline-flex items-center gap-2 border border-green-500/20 bg-green-500/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-green-700 mb-5 sm:mb-6 md:mb-8">
              <FiCpu className="text-sm sm:text-base" />
              Contact & Support
            </div>

            {/* TITLE */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] sm:leading-[0.95] text-black">
              Human Support
              <br />
              Meets Intelligent
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text text-transparent">
                {" "}
                Civic Systems
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-5 sm:mt-6 md:mt-8 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
              NationAura combines intelligent civic technology with real
              human assistance — helping citizens resolve infrastructure,
              reporting, security, and platform-related concerns faster and
              more transparently.
            </p>

            {/* SUPPORT EMAIL CARD */}
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative mt-7 sm:mt-9 md:mt-12 overflow-hidden border border-black/10 bg-[#F8F8F8] p-5 sm:p-6 md:p-8"
            >
              {/* HOVER GLOW */}
              <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 h-40 w-40 sm:h-52 sm:w-52 bg-green-500/10 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 sm:gap-5">
                  <div className="flex items-start gap-3 sm:gap-5">
                    {/* ICON */}
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 flex-shrink-0 items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 text-2xl sm:text-3xl text-white shadow-2xl">
                      <FiMail />
                    </div>

                    <div>
                      <p className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-green-700">
                        Official Support Channel
                      </p>

                      <h3 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-black break-all sm:break-normal">
                        support@nationaura.ng
                      </h3>
                    </div>
                  </div>

                  {/* ARROW */}
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="hidden sm:flex text-xl sm:text-2xl text-gray-300 transition-all group-hover:text-green-600"
                  >
                    <FiArrowUpRight />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-1">
            {supportItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ backgroundColor: "#fafafa" }}
                className={`group relative overflow-hidden p-5 sm:p-8 md:p-10 transition-all duration-500 ${
                  index !== supportItems.length - 1
                    ? "border-b border-black/10"
                    : ""
                }`}
              >
                {/* GLOW */}
                <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 h-40 w-40 sm:h-52 sm:w-52 bg-green-500/10 opacity-0 blur-3xl transition-all duration-700 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* TOP */}
                  <div className="flex items-start justify-between mb-5 sm:mb-6 md:mb-8">
                    {/* ICON */}
                    <div
                      className={`flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center bg-gradient-to-br ${item.gradient} text-2xl sm:text-3xl text-white shadow-2xl`}
                    >
                      {item.icon}
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
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-black mb-3 sm:mb-4 md:mb-5">
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyContact;