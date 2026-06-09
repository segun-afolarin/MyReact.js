import { motion } from "framer-motion";

import {
  FiAlertTriangle,
  FiDroplet,
  FiMap,
  FiZap,
  FiActivity,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

const AIPriorityIssues = ({ darkMode }) => {
  const issues = [
    {
      rank: "01",
      title: "Flooding & Drainage Failures",
      severity: "Critical",
      growth: "+28%",
      affected: "12 Areas",
      icon: FiDroplet,
      description:
        "AI detected a rapid increase in drainage blockage and flooding reports. Multiple communities show worsening conditions.",
    },

    {
      rank: "02",
      title: "Road Infrastructure Damage",
      severity: "High",
      growth: "+19%",
      affected: "8 Areas",
      icon: FiMap,
      description:
        "Road deterioration reports continue to rise. Potholes and damaged access roads are impacting mobility and safety.",
    },

    {
      rank: "03",
      title: "Electricity Instability",
      severity: "Moderate",
      growth: "+14%",
      affected: "6 Areas",
      icon: FiZap,
      description:
        "Recurring power interruptions and infrastructure concerns remain among the most reported issues.",
    },

    {
      rank: "04",
      title: "Waste Management Concerns",
      severity: "Moderate",
      growth: "+11%",
      affected: "5 Areas",
      icon: FiAlertTriangle,
      description:
        "Waste disposal complaints are increasing in densely populated locations, creating health and environmental risks.",
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? "bg-[#081019] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]
          w-[350px]
          h-[350px]
          bg-green-500/10
          blur-[140px]
        "
      />

      <div className="relative z-10 p-5 sm:p-7 lg:p-10">
        {/* HEADER */}
        <div className="mb-10">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              border
              border-green-500/20
              bg-green-500/5
              text-green-500
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
            "
          >
            <FiTarget />
            AI Priority Ranking
          </div>

          <h2
            className={`
              mt-4
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              tracking-[-0.05em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            Highest Priority Issues
          </h2>

          <p
            className={`
              mt-3
              max-w-3xl
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            AI ranks community concerns based on
            report volume, growth rate, citizen
            impact, recurrence patterns and
            severity levels.
          </p>
        </div>

        {/* ISSUES */}
        <div className="space-y-5">
          {issues.map((issue, index) => {
            const Icon = issue.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  x: 5,
                }}
                className={`
                  border-l-4
                  border-green-500
                  ${
                    darkMode
                      ? "bg-white/[0.03]"
                      : "bg-[#F8FAF9]"
                  }
                `}
              >
                <div className="p-5 sm:p-6">
                  <div
                    className="
                      flex
                      flex-col
                      xl:flex-row
                      xl:items-center
                      xl:justify-between
                      gap-6
                    "
                  >
                    {/* LEFT */}
                    <div className="flex gap-5">
                      <div
                        className="
                          text-5xl
                          font-black
                          text-green-500
                          min-w-[80px]
                        "
                      >
                        {issue.rank}
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <Icon
                            className="
                              text-green-500
                              text-2xl
                            "
                          />

                          <h3
                            className="
                              text-xl
                              sm:text-2xl
                              font-black
                            "
                          >
                            {issue.title}
                          </h3>
                        </div>

                        <p
                          className={`
                            mt-3
                            leading-relaxed
                            ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                          `}
                        >
                          {issue.description}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div
                      className="
                        grid
                        grid-cols-3
                        gap-3
                        xl:min-w-[420px]
                      "
                    >
                      <div
                        className="
                          border
                          border-green-500/20
                          bg-green-500/5
                          p-4
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-green-500
                            font-bold
                          "
                        >
                          Severity
                        </p>

                        <h4
                          className="
                            mt-2
                            text-xl
                            font-black
                          "
                        >
                          {issue.severity}
                        </h4>
                      </div>

                      <div
                        className="
                          border
                          border-green-500/20
                          bg-green-500/5
                          p-4
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-green-500
                            font-bold
                          "
                        >
                          Growth
                        </p>

                        <h4
                          className="
                            mt-2
                            text-xl
                            font-black
                          "
                        >
                          {issue.growth}
                        </h4>
                      </div>

                      <div
                        className="
                          border
                          border-green-500/20
                          bg-green-500/5
                          p-4
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-green-500
                            font-bold
                          "
                        >
                          Areas
                        </p>

                        <h4
                          className="
                            mt-2
                            text-xl
                            font-black
                          "
                        >
                          {issue.affected}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI SUMMARY */}
        <div
          className="
            mt-10
            border-l-4
            border-green-500
            pl-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-green-500
              font-bold
            "
          >
            <FiActivity />
            AI Priority Assessment
          </div>

          <p
            className={`
              mt-3
              text-base
              sm:text-lg
              leading-relaxed
              max-w-5xl
              ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }
            `}
          >
            Current analysis suggests that
            flooding, road infrastructure and
            electricity concerns present the
            highest risk to community wellbeing.
            Early intervention in these sectors
            could significantly improve quality
            of life and reduce future report
            volumes.
          </p>

          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              text-green-500
              font-bold
            "
          >
            <FiTrendingUp />
            Forecast Confidence: 93%
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AIPriorityIssues;