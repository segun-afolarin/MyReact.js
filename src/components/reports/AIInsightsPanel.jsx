import { motion } from "framer-motion";

import {
  FiCpu,
  FiTrendingUp,
  FiMap,
  FiAlertTriangle,
  FiUsers,
  FiActivity,
  FiZap,
  FiArrowUpRight,
  FiShield,
  FiGlobe,
  FiCheckCircle,
  FiRadio,
} from "react-icons/fi";

const insights = [
  {
    title:
      "Recurring Flooding Patterns Detected",

    description:
      "NationAura AI identified repeated flooding incidents across Abuja drainage corridors using real-time citizen evidence and infrastructure scans.",

    icon: <FiMap />,

    tag: "PATTERN DETECTED",
  },

  {
    title:
      "Infrastructure Failure Chain Confirmed",

    description:
      "Multiple nearby reports reveal connected road collapse, drainage blockage, and structural stress affecting entire transport corridors.",

    icon: <FiUsers />,

    tag: "COMMUNITY VERIFIED",
  },

  {
    title:
      "Critical School Zone Threat Identified",

    description:
      "AI flagged damaged roads near educational environments as urgent public safety risks requiring immediate government intervention.",

    icon: <FiAlertTriangle />,

    tag: "URGENT RISK",
  },

  {
    title:
      "National Infrastructure Stress Rising",

    description:
      "Road deterioration severity increased significantly due to persistent flooding, delayed repairs, and environmental pressure.",

    icon: <FiTrendingUp />,

    tag: "TREND ANALYSIS",
  },
];

const intelligence = [
  {
    label:
      "AI Infrastructure Accuracy",

    value: "96%",

    icon: <FiCpu />,
  },

  {
    label:
      "Citizen Verification Trust",

    value: "91%",

    icon: <FiShield />,
  },

  {
    label:
      "National Civic Activity",

    value: "2.4K+",

    icon: <FiGlobe />,
  },
];

const AIInsightsPanel = ({
  darkMode,
}) => {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div
        className={`
        absolute
        inset-0
        ${
          darkMode
            ? "bg-black"
            : "bg-[#f8faf8]"
        }
        `}
      >
        {/* GRID */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:70px_70px]
          "
        />

        {/* GLOW */}
        <div
          className="
          absolute
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          bg-green-500/10
          blur-3xl
          animate-pulse
          "
        />

        <div
          className="
          absolute
          bottom-[-200px]
          right-[-200px]
          w-[500px]
          h-[500px]
          bg-green-500/10
          blur-3xl
          animate-pulse
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
        relative
        z-10
        px-5
        sm:px-7
        lg:px-10
        py-10
        lg:py-14
        "
      >
        {/* HEADER */}
        <div
          className="
          flex
          flex-col
          2xl:flex-row
          2xl:items-center
          2xl:justify-between
          gap-10
          "
        >
          {/* LEFT */}
          <div className="max-w-4xl">
            {/* BADGE */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className="
              inline-flex
              items-center
              gap-3
              px-5
              py-3
              bg-white
              border
              border-green-100
              shadow-[0_10px_40px_rgba(34,197,94,0.08)]
              "
            >
              <FiRadio className="text-green-500 animate-pulse" />

              <span
                className="
                text-xs
                sm:text-sm
                font-black
                tracking-[0.2em]
                text-green-700
                "
              >
                NATIONAURA AI INTELLIGENCE
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              viewport={{ once: true }}
              className="
              mt-7
              text-4xl
              sm:text-5xl
              lg:text-7xl
              font-black
              leading-[0.95]
              tracking-[-0.05em]
              uppercase
              "
            >
              AI Civic

              <span
                className="
                block
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-green-500
                via-emerald-500
                to-green-400
                "
              >
                Intelligence
              </span>
            </motion.h2>

            {/* DESC */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              viewport={{ once: true }}
              className={`
              mt-7
              max-w-3xl
              text-base
              sm:text-lg
              leading-relaxed
              ${
                darkMode
                  ? "text-white/70"
                  : "text-black/65"
              }
              `}
            >
              NationAura transforms citizen
              reports into real-time national
              intelligence. Every uploaded
              report strengthens AI prediction,
              infrastructure monitoring, and
              transparent government response
              systems across Nigeria.
            </motion.p>
          </div>

          {/* AI SCORE */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -8,
            }}
            className="
            relative
            overflow-hidden
            bg-white
            border
            border-green-100
            w-full
            2xl:w-[420px]
            shadow-[0_20px_80px_rgba(34,197,94,0.12)]
            "
          >
            {/* GLOW */}
            <div
              className="
              absolute
              inset-0
              bg-gradient-to-br
              from-green-500/10
              via-transparent
              to-green-500/5
              "
            />

            {/* FLOAT */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="
              absolute
              right-[-30px]
              top-[-30px]
              w-[140px]
              h-[140px]
              bg-green-500/10
              blur-3xl
              "
            />

            <div className="relative z-10 p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-black/45
                    "
                  >
                    AI ACCURACY
                  </p>

                  <h3
                    className="
                    mt-3
                    text-7xl
                    font-black
                    text-green-500
                    leading-none
                    "
                  >
                    96%
                  </h3>
                </div>

                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                  relative
                  w-20
                  h-20
                  bg-gradient-to-br
                  from-green-500
                  to-emerald-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  shadow-[0_0_40px_rgba(34,197,94,0.35)]
                  "
                >
                  <div
                    className="
                    absolute
                    inset-0
                    bg-green-400/20
                    animate-ping
                    "
                  />

                  <FiZap className="relative z-10" />
                </motion.div>
              </div>

              {/* BAR */}
              <div className="mt-10">
                <div
                  className="
                  h-4
                  bg-green-50
                  overflow-hidden
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "96%",
                    }}
                    transition={{
                      duration: 1.4,
                    }}
                    viewport={{ once: true }}
                    className="
                    relative
                    h-full
                    bg-gradient-to-r
                    from-green-500
                    to-emerald-400
                    "
                  >
                    <div
                      className="
                      absolute
                      inset-y-0
                      right-0
                      w-24
                      bg-white/50
                      blur-xl
                      "
                    />
                  </motion.div>
                </div>

                <div
                  className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[0.2em]
                  text-black/45
                  "
                >
                  {[
                    "ANALYSIS",
                    "VERIFICATION",
                    "MAPPING",
                    "PREDICTION",
                    "RESPONSE",
                  ].map((item, i) => (
                    <span key={i}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* INSIGHT CARDS */}
        <div
          className="
          mt-14
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          "
        >
          {insights.map(
            (item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
                className="
                group
                relative
                overflow-hidden
                bg-white
                border
                border-green-100
                shadow-[0_20px_60px_rgba(34,197,94,0.08)]
                transition-all
                duration-500
                "
              >
                {/* ANIMATED GLOW */}
                <motion.div
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                  absolute
                  top-[-50px]
                  right-[-50px]
                  w-[180px]
                  h-[180px]
                  bg-green-500/10
                  blur-3xl
                  "
                />

                {/* TOP LINE */}
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                  absolute
                  top-0
                  h-[2px]
                  w-[40%]
                  bg-gradient-to-r
                  from-transparent
                  via-green-500
                  to-transparent
                  "
                />

                {/* CONTENT */}
                <div className="relative z-10 p-7">
                  <div
                    className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-6
                    "
                  >
                    {/* ICON */}
                    <motion.div
                      whileHover={{
                        rotate: 10,
                        scale: 1.08,
                      }}
                      className="
                      relative
                      min-w-[85px]
                      h-[85px]
                      bg-gradient-to-br
                      from-green-500
                      to-emerald-500
                      text-white
                      flex
                      items-center
                      justify-center
                      text-3xl
                      shadow-[0_0_40px_rgba(34,197,94,0.3)]
                      "
                    >
                      <div
                        className="
                        absolute
                        inset-0
                        bg-white/10
                        animate-pulse
                        "
                      />

                      <div className="relative z-10">
                        {item.icon}
                      </div>
                    </motion.div>

                    {/* TEXT */}
                    <div className="flex-1">
                      {/* TAG */}
                      <div
                        className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        bg-green-50
                        border
                        border-green-100
                        text-green-700
                        "
                      >
                        <FiActivity />

                        <span
                          className="
                          text-[11px]
                          font-black
                          tracking-[0.18em]
                          "
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3
                        className="
                        mt-5
                        text-2xl
                        sm:text-3xl
                        font-black
                        leading-tight
                        tracking-tight
                        "
                      >
                        {item.title}
                      </h3>

                      {/* DESC */}
                      <p
                        className={`
                        mt-5
                        text-sm
                        sm:text-base
                        leading-relaxed
                        ${
                          darkMode
                            ? "text-white/70"
                            : "text-black/65"
                        }
                        `}
                      >
                        {
                          item.description
                        }
                      </p>

                      {/* FOOTER */}
                      <div
                        className="
                        mt-7
                        flex
                        items-center
                        justify-between
                        gap-4
                        "
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="
                            w-3
                            h-3
                            bg-green-500
                            animate-pulse
                            "
                          />

                          <span
                            className="
                            text-sm
                            font-medium
                            text-black/55
                            "
                          >
                            LIVE AI MONITORING
                          </span>
                        </div>

                        <motion.button
                          whileHover={{
                            scale: 1.08,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          className="
                          group/btn
                          w-14
                          h-14
                          bg-gradient-to-br
                          from-green-500
                          to-emerald-500
                          text-white
                          flex
                          items-center
                          justify-center
                          shadow-[0_0_30px_rgba(34,197,94,0.35)]
                          "
                        >
                          <FiArrowUpRight
                            className="
                            text-xl
                            transition-transform
                            duration-300
                            group-hover/btn:translate-x-1
                            group-hover/btn:-translate-y-1
                            "
                          />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* BOTTOM METRICS */}
        <div
          className="
          mt-14
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-6
          "
        >
          {intelligence.map(
            (item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                }}
                className="
                relative
                overflow-hidden
                bg-white
                border
                border-green-100
                shadow-[0_20px_60px_rgba(34,197,94,0.08)]
                "
              >
                {/* FLOATING LIGHT */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="
                  absolute
                  right-[-20px]
                  top-[-20px]
                  w-[120px]
                  h-[120px]
                  bg-green-500/10
                  blur-3xl
                  "
                />

                <div className="relative z-10 p-7">
                  <div
                    className="
                    flex
                    items-start
                    justify-between
                    gap-5
                    "
                  >
                    <div>
                      <div
                        className="
                        w-16
                        h-16
                        bg-gradient-to-br
                        from-green-500
                        to-emerald-500
                        text-white
                        flex
                        items-center
                        justify-center
                        text-2xl
                        shadow-[0_0_30px_rgba(34,197,94,0.3)]
                        "
                      >
                        {item.icon}
                      </div>

                      <h3
                        className="
                        mt-6
                        text-5xl
                        font-black
                        text-green-500
                        "
                      >
                        {item.value}
                      </h3>
                    </div>

                    <FiCheckCircle className="text-green-500 text-2xl" />
                  </div>

                  <p
                    className="
                    mt-5
                    text-base
                    leading-relaxed
                    text-black/65
                    "
                  >
                    {item.label}
                  </p>

                  <div
                    className="
                    mt-7
                    flex
                    items-center
                    gap-2
                    "
                  >
                    <div
                      className="
                      w-2
                      h-2
                      bg-green-500
                      animate-pulse
                      "
                    />

                    <span
                      className="
                      text-xs
                      tracking-[0.18em]
                      uppercase
                      text-black/45
                      "
                    >
                      LIVE NATIONAL DATA
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AIInsightsPanel;