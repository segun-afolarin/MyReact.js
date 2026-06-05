import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  FiUploadCloud,
  FiCpu,
  FiUsers,
  FiShield,
  FiTool,
  FiCheckCircle,
  FiClock,
  FiActivity,
} from "react-icons/fi";

const timeline = [
  {
    title: "Report Submitted",
    description:
      "Citizen uploads issue evidence, location details, and report information into the platform.",
    status: "Completed",
    icon: FiUploadCloud,
  },
  {
    title: "AI Verification",
    description:
      "AI validates report authenticity, detects duplicates, and analyzes severity level.",
    status: "Processing",
    icon: FiCpu,
  },
  {
    title: "Community Validation",
    description:
      "Nearby citizens help confirm the issue and strengthen report credibility.",
    status: "Completed",
    icon: FiUsers,
  },
  {
    title: "Government Review",
    description:
      "Relevant authorities receive and review the issue for action and prioritization.",
    status: "Pending",
    icon: FiShield,
  },
  {
    title: "Resolution Action",
    description:
      "Repair teams, inspections, or government interventions are carried out.",
    status: "Awaiting Action",
    icon: FiTool,
  },
];

const stats = [
  {
    icon: FiCheckCircle,
    value: "2,847+",
    label: "Reports Resolved",
  },
  {
    icon: FiActivity,
    value: "94%",
    label: "AI Accuracy",
  },
  {
    icon: FiClock,
    value: "31",
    label: "States Active",
  },
];

const quotes = [
  "Every resolved report represents a citizen who refused to stay silent.",
  "Transparency turns citizen voices into government action.",
  "One report can transform an entire community.",
  "Real change begins when citizens speak up.",
  "Technology and people together can rebuild trust.",
];

const ResolutionTimeline = () => {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) =>
        prev === quotes.length - 1 ? 0 : prev + 1
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-24 px-6 lg:px-12">
      {/* GREEN GLOW */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-green-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 blur-3xl rounded-full" />

      {/* GRID */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
        bg-[size:45px_45px]
      "
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-20 lg:grid-cols-2 lg:items-start">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="sticky top-24"
        >
          <span
            className="
            mb-5
            inline-flex
            items-center
            gap-2
            border
            border-green-200
            bg-green-50
            px-4
            py-2
            text-[11px]
            font-black
            uppercase
            tracking-[0.2em]
            text-green-700
          "
          >
            <FiActivity />

            Resolution Timeline
          </span>

          <h2 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.06em] text-black sm:text-5xl lg:text-6xl">
            Track Report
            <span className="block text-green-500">
              Resolution
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-8 text-gray-600">
            Follow how citizen reports move from submission to AI verification,
            authority review, and real-world government action — all within one
            transparent civic response system.
          </p>

          {/* QUOTE */}
          <div className="mt-8 border-l-4 border-green-500 pl-5 min-h-[80px] flex items-center">
            <motion.p
              key={activeQuote}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-base font-medium italic leading-7 text-gray-700"
            >
              “{quotes[activeQuote]}”
            </motion.p>
          </div>

          {/* STATS */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="
                  relative
                  overflow-hidden
                  border
                  border-green-100
                  bg-white
                  p-5
                  shadow-[0_10px_40px_rgba(34,197,94,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_60px_rgba(34,197,94,0.12)]
                "
                >
                  {/* TOP LINE */}
                  <div
                    className="
                    absolute
                    top-0
                    left-0
                    h-[2px]
                    w-full
                    bg-gradient-to-r
                    from-green-500
                    to-transparent
                  "
                  />

                  <div className="mb-4 flex h-12 w-12 items-center justify-center bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.35)]">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="text-2xl font-black text-black">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT TIMELINE */}
        <div className="relative">
          {/* LINE */}
          <div className="absolute left-[27px] top-0 hidden h-full w-[2px] bg-gradient-to-b from-green-500 via-green-300 to-transparent lg:block" />

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="relative flex gap-5"
                >
                  {/* ICON */}
                  <div
                    className="
                    relative
                    z-10
                    hidden
                    h-14
                    w-14
                    flex-shrink-0
                    items-center
                    justify-center
                    bg-green-500
                    text-white
                    shadow-[0_0_40px_rgba(34,197,94,0.35)]
                    lg:flex
                  "
                  >
                    <Icon className="text-2xl" />
                  </div>

                  {/* CARD */}
                  <div
                    className="
                    relative
                    overflow-hidden
                    w-full
                    border
                    border-green-100
                    bg-white
                    p-7
                    shadow-[0_10px_40px_rgba(34,197,94,0.06)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_60px_rgba(34,197,94,0.12)]
                  "
                  >
                    {/* TOP LINE */}
                    <div
                      className="
                      absolute
                      top-0
                      left-0
                      h-[2px]
                      w-full
                      bg-gradient-to-r
                      from-green-500
                      via-emerald-400
                      to-transparent
                    "
                    />

                    {/* ACTIVE GLOW */}
                    {item.status === "Processing" && (
                      <motion.div
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                        className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-transparent
                        via-green-500/10
                        to-transparent
                      "
                      />
                    )}

                    <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        {/* MOBILE ICON */}
                        <div className="mb-4 flex items-center gap-3 lg:hidden">
                          <div
                            className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            bg-green-500
                            text-white
                          "
                          >
                            <Icon className="text-xl" />
                          </div>
                        </div>

                        <h3 className="text-2xl font-black tracking-[-0.03em] text-black">
                          {item.title}
                        </h3>

                        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`
                        inline-flex
                        w-fit
                        items-center
                        justify-center
                        px-4
                        py-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        ${
                          item.status === "Completed"
                            ? "bg-green-500 text-white"
                            : item.status === "Processing"
                            ? "bg-green-500/10 border border-green-500/20 text-green-500"
                            : "bg-gray-100 border border-gray-200 text-gray-500"
                        }
                      `}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="mt-6 h-2 w-full overflow-hidden bg-green-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width:
                            item.status === "Completed"
                              ? "100%"
                              : item.status === "Processing"
                              ? "70%"
                              : item.status === "Pending"
                              ? "45%"
                              : "20%",
                        }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="
                        h-full
                        bg-gradient-to-r
                        from-green-500
                        to-emerald-400
                      "
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResolutionTimeline;