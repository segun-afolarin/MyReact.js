import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiGlobe,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

const stats = [
  {
    number: "12K+",
    label: "Reports Submitted",
  },

  {
    number: "250+",
    label: "Communities Reached",
  },

  {
    number: "5K+",
    label: "Issues Resolved",
  },
];

const VoicesCTA = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        lg:px-12
        pt-16
        pb-32
        bg-[#f7faf8]
      "
    >

      {/* RADIAL BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_35%)]
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:90px_90px]
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}

        transition={{
          duration: 0.7,
        }}

        className="
          relative
          max-w-7xl
          mx-auto
          overflow-hidden
          border
          border-black/10
          bg-white/85
          backdrop-blur-2xl
          shadow-[0_40px_120px_rgba(0,0,0,0.08)]
        "
      >

        {/* FLOATING GLOW */}
        <motion.div
          animate={{
            y: [0, -25, 0],
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            absolute
            top-0
            right-0
            w-[450px]
            h-[450px]
            rounded-full
            bg-green-500/10
            blur-3xl
          "
        />

        {/* GRID BACKGROUND */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
            bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
            bg-[size:90px_90px]
          "
        />

        {/* HUGE BG TEXT */}
        <div
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            text-[220px]
            md:text-[320px]
            font-black
            leading-none
            text-green-50
            select-none
            pointer-events-none
          "
        >
          NA
        </div>

        <div
          className="
            relative
            z-10
            px-8
            py-16
            md:px-16
            md:py-24
          "
        >

          {/* CONTENT */}
          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:items-center
              xl:justify-between
              gap-16
            "
          >

            {/* LEFT */}
            <div className="max-w-4xl">

              {/* BADGE */}
              <motion.div
                whileHover={{
                  y: -2,
                }}

                className="
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-green-500/20
                  bg-green-500/5
                  backdrop-blur-2xl
                  px-5
                  py-3
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-green-700
                  font-semibold
                  mb-8
                "
              >
                <FiGlobe />

                NationAura Community
              </motion.div>

              {/* TITLE */}
              <h2
                className="
                  text-4xl
                  md:text-6xl
                  xl:text-7xl
                  font-black
                  tracking-tight
                  leading-[0.95]
                  text-black
                  max-w-5xl
                "
              >
                Join Citizens
                Creating Real
                Civic Impact
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-8
                  text-lg
                  md:text-xl
                  leading-relaxed
                  text-gray-600
                  max-w-3xl
                "
              >
                Thousands of communities across Nigeria
                are using NationAura to report problems,
                monitor progress, and improve infrastructure
                through transparency, accountability,
                and citizen-driven action.
              </p>

              {/* BUTTONS */}
              <div
                className="
                  mt-12
                  flex
                  flex-col
                  sm:flex-row
                  items-start
                  sm:items-center
                  gap-5
                "
              >

                {/* PRIMARY */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    y: -3,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}

                  className="
                    group
                    relative
                    overflow-hidden
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-700
                    text-white
                    px-8
                    py-5
                    text-lg
                    font-bold
                    transition-all
                    duration-300
                    shadow-[0_20px_60px_rgba(34,197,94,0.25)]
                  "
                >

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500
                      bg-gradient-to-r
                      from-emerald-600
                      to-green-500
                    "
                  />

                  <span
                    className="
                      relative
                      flex
                      items-center
                      gap-3
                    "
                  >
                    Start Reporting

                    <FiArrowUpRight
                      className="
                        text-xl
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </span>

                </motion.button>

                {/* SECONDARY */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    y: -3,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}

                  className="
                    group
                    border
                    border-black/10
                    bg-white
                    text-black
                    px-8
                    py-5
                    text-lg
                    font-semibold
                    transition-all
                    duration-300
                    hover:border-green-500/20
                    hover:bg-green-50
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    Explore Reports

                    <FiArrowUpRight
                      className="
                        text-xl
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </span>

                </motion.button>

              </div>

            </div>

            {/* RIGHT STATS */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                xl:grid-cols-1
                gap-6
                w-full
                xl:max-w-sm
              "
            >

              {stats.map((stat, index) => (
                <motion.div
                  key={index}

                  initial={{
                    opacity: 0,
                    x: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}

                  whileHover={{
                    y: -6,
                  }}

                  className="
                    relative
                    overflow-hidden
                    border
                    border-black/10
                    bg-white/80
                    backdrop-blur-2xl
                    p-6
                    shadow-[0_20px_60px_rgba(0,0,0,0.05)]
                  "
                >

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      -top-10
                      -right-10
                      w-32
                      h-32
                      rounded-full
                      bg-green-500/10
                      blur-3xl
                    "
                  />

                  {/* ICON */}
                  <div
                    className="
                      relative
                      w-14
                      h-14
                      bg-gradient-to-br
                      from-green-500
                      to-emerald-600
                      text-white
                      flex
                      items-center
                      justify-center
                      text-2xl
                      shadow-[0_20px_40px_rgba(34,197,94,0.25)]
                      mb-6
                    "
                  >
                    {index === 0 && <FiActivity />}
                    {index === 1 && <FiUsers />}
                    {index === 2 && <FiGlobe />}
                  </div>

                  {/* NUMBER */}
                  <h3
                    className="
                      relative
                      text-5xl
                      font-black
                      tracking-tight
                      text-black
                    "
                  >
                    {stat.number}
                  </h3>

                  {/* LABEL */}
                  <p
                    className="
                      relative
                      mt-3
                      text-gray-600
                      text-lg
                      leading-relaxed
                    "
                  >
                    {stat.label}
                  </p>

                </motion.div>
              ))}

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default VoicesCTA;