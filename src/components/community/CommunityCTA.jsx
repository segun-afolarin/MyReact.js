import { motion } from "framer-motion";

import {
  FiTrendingUp,
  FiArrowRight,
  FiZap,
} from "react-icons/fi";

import { Link } from "react-router-dom";

const CommunityCTA = () => {
  return (
    <section className="relative px-6 lg:px-12 pb-32 overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,#22c55e08_1px,transparent_1px),linear-gradient(to_bottom,#22c55e08_1px,transparent_1px)]
          bg-[size:90px_90px]
        "
      />

      {/* FLOATING GLOWS */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-green-200/30
          rounded-full
          blur-3xl
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
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
          overflow-hidden
          max-w-7xl
          mx-auto
          border
          border-black/10
          bg-white
          shadow-[0_30px_120px_rgba(34,197,94,0.12)]
        "
      >

        {/* TOP ANIMATED LINE */}
        <motion.div
          initial={{
            width: "0%",
          }}

          whileInView={{
            width: "100%",
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 1.2,
          }}

          className="
            absolute
            top-0
            left-0
            h-[4px]
            bg-gradient-to-r
            from-green-500
            via-emerald-400
            to-green-600
          "
        />

        {/* MASSIVE BACKGROUND GLOW */}
        <div
          className="
            absolute
            -top-40
            -right-40
            w-[500px]
            h-[500px]
            bg-green-500/10
            rounded-full
            blur-3xl
          "
        />

        {/* FLOATING LIGHT */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}

          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            absolute
            top-20
            right-20
            w-40
            h-40
            bg-gradient-to-br
            from-green-300/20
            to-emerald-400/10
            rounded-full
            blur-2xl
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            p-8
            md:p-14
            lg:p-20
          "
        >

          {/* TOP */}
          <div
            className="
              flex
              flex-col
              xl:flex-row
              gap-16
              justify-between
            "
          >

            {/* LEFT SIDE */}
            <div className="max-w-4xl">

              {/* BADGE */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}

                className="
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-green-500/20
                  bg-green-500/5
                  px-5
                  py-3
                  text-green-700
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  mb-8
                "
              >

                <FiTrendingUp />

                NationAura Vision

              </motion.div>

              {/* HEADING */}
              <h2
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-7xl
                  font-black
                  tracking-tight
                  leading-[0.95]
                  text-black
                  max-w-5xl
                "
              >
                Building
                <span
                  className="
                    block
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-green-600
                    via-emerald-500
                    to-green-700
                  "
                >
                  Nigeria’s Future
                </span>
                Through Civic Innovation
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-10
                  text-lg
                  md:text-xl
                  text-gray-600
                  leading-relaxed
                  max-w-3xl
                "
              >
                NationAura transforms ordinary citizens into
                active change-makers by combining infrastructure
                reporting, transparency, AI verification, and
                community-driven accountability into one
                powerful civic-tech ecosystem.
              </p>

              {/* FEATURES */}
              <div
                className="
                  mt-10
                  flex
                  flex-wrap
                  gap-4
                "
              >

                {[
                  "AI Verification",
                  "Real-Time Reporting",
                  "Community Transparency",
                ].map((item, index) => (
                  <motion.div
                    key={index}

                    whileHover={{
                      y: -4,
                    }}

                    className="
                      flex
                      items-center
                      gap-3
                      border
                      border-black/10
                      bg-[#fafafa]
                      px-5
                      py-4
                      shadow-sm
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        bg-gradient-to-br
                        from-green-500
                        to-emerald-600
                        text-white
                        flex
                        items-center
                        justify-center
                        text-lg
                      "
                    >
                      <FiZap />
                    </div>

                    <span
                      className="
                        text-black
                        font-semibold
                      "
                    >
                      {item}
                    </span>

                  </motion.div>
                ))}

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div
              className="
                flex
                flex-col
                justify-center
                gap-5
                min-w-[280px]
              "
            >

              {/* PRIMARY BUTTON */}
              <Link to="/report">

                <motion.button
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className="
                    group
                    relative
                    overflow-hidden
                    w-full
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-600
                    px-8
                    py-5
                    text-white
                    font-bold
                    text-lg
                    shadow-[0_20px_50px_rgba(34,197,94,0.35)]
                  "
                >

                  {/* BUTTON GLOW */}
                  <div
                    className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500
                      bg-white/10
                    "
                  />

                  <span
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      justify-center
                      gap-3
                    "
                  >

                    Report An Issue

                    <FiArrowRight className="text-xl" />

                  </span>

                </motion.button>

              </Link>

              {/* SECONDARY BUTTON */}
              <Link to="/about">

                <motion.button
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className="
                    w-full
                    border
                    border-black/10
                    bg-white
                    px-8
                    py-5
                    text-black
                    font-bold
                    text-lg
                    hover:border-green-500/30
                    hover:shadow-[0_15px_40px_rgba(34,197,94,0.12)]
                    transition-all
                    duration-300
                  "
                >
                  Learn More
                </motion.button>

              </Link>

              {/* FLOATING CARD */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}

                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}

                className="
                  mt-6
                  border
                  border-black/10
                  bg-[#fafafa]
                  p-6
                  shadow-[0_15px_40px_rgba(0,0,0,0.04)]
                "
              >

                <div
                  className="
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-green-600
                    font-bold
                    mb-3
                  "
                >
                  Civic Technology
                </div>

                <h3
                  className="
                    text-2xl
                    font-black
                    text-black
                    leading-tight
                  "
                >
                  Designed To Inspire
                  The Next Generation
                  Of African Innovation.
                </h3>

              </motion.div>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default CommunityCTA;