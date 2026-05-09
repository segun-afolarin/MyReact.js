import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiCpu,
  FiLayers,
  FiZap,
} from "react-icons/fi";

const floatingCards = [
  {
    title: "AI Assistance",
    icon: <FiCpu />,
    top: "8%",
    left: "8%",
  },

  {
    title: "Smart Guidance",
    icon: <FiZap />,
    top: "20%",
    right: "10%",
  },

  {
    title: "Real-Time Support",
    icon: <FiLayers />,
    bottom: "14%",
    left: "14%",
  },
];

const FAQCTA = () => {
  return (
    <section className="relative px-6 lg:px-12 pb-32 overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="
        absolute
        inset-0
        bg-gradient-to-b
        from-[#ffffff]
        via-[#f8fffb]
        to-[#f1fff7]
        "
      />

      {/* HUGE GLOW */}
      <div
        className="
        absolute
        top-[-200px]
        left-1/2
        -translate-x-1/2
        w-[900px]
        h-[900px]
        bg-green-200/30
        rounded-full
        blur-3xl
        "
      />

      {/* GRID LINES */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.04]
        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        [background-size:70px_70px]
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

        transition={{
          duration: 0.8,
        }}

        viewport={{
          once: true,
        }}

        className="
        relative
        max-w-7xl
        mx-auto
        "
      >

        {/* MAIN CONTAINER */}
        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-black/5
          bg-white/75
          backdrop-blur-3xl
          shadow-[0_40px_120px_rgba(0,0,0,0.08)]
          "
        >

          {/* TOP LIGHT */}
          <div
            className="
            absolute
            inset-x-0
            top-0
            h-[1px]
            bg-gradient-to-r
            from-transparent
            via-green-400/50
            to-transparent
            "
          />

          {/* FLOATING ELEMENTS */}
          {floatingCards.map((card, index) => (
            <motion.div
              key={index}

              animate={{
                y: [0, -12, 0],
              }}

              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              style={{
                top: card.top,
                left: card.left,
                right: card.right,
                bottom: card.bottom,
              }}

              className="
              hidden
              xl:flex
              absolute
              z-20
              items-center
              gap-3
              px-5
              py-4
              rounded-3xl
              bg-white/80
              backdrop-blur-2xl
              border
              border-white
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              "
            >

              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-br
                from-green-500
                to-emerald-600
                text-white
                flex
                items-center
                justify-center
                text-xl
                shadow-lg
                "
              >
                {card.icon}
              </div>

              <div>

                <p
                  className="
                  text-sm
                  text-gray-500
                  "
                >
                  NationAura
                </p>

                <h3
                  className="
                  font-semibold
                  text-black
                  "
                >
                  {card.title}
                </h3>

              </div>

            </motion.div>
          ))}

          {/* CONTENT */}
          <div
            className="
            relative
            z-10
            px-6
            py-20
            sm:px-10
            md:px-14
            lg:px-20
            lg:py-24
            text-center
            "
          >

            {/* BADGE */}
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
                duration: 0.5,
              }}

              viewport={{
                once: true,
              }}

              className="
              inline-flex
              items-center
              gap-3
              px-5
              py-3
              rounded-full
              bg-white
              border
              border-black/5
              shadow-[0_10px_40px_rgba(0,0,0,0.05)]
              mb-8
              "
            >

              <div
                className="
                w-2.5
                h-2.5
                rounded-full
                bg-green-500
                animate-pulse
                "
              />

              <span
                className="
                text-sm
                font-semibold
                tracking-[0.18em]
                uppercase
                text-gray-700
                "
              >
                Intelligent Civic Support
              </span>

            </motion.div>

            {/* HEADING */}
            <motion.h2
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

              viewport={{
                once: true,
              }}

              className="
              text-4xl
              sm:text-5xl
              lg:text-7xl
              font-black
              tracking-[-0.05em]
              leading-[0.95]
              text-black
              max-w-5xl
              mx-auto
              "
            >
              Experience A
              <span
                className="
                block
                bg-gradient-to-r
                from-green-600
                via-emerald-500
                to-green-700
                bg-clip-text
                text-transparent
                "
              >
                Future-Grade
              </span>

              Civic Support System
            </motion.h2>

            {/* DESCRIPTION */}
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
                delay: 0.2,
              }}

              viewport={{
                once: true,
              }}

              className="
              mt-8
              text-lg
              md:text-xl
              text-gray-600
              leading-relaxed
              max-w-3xl
              mx-auto
              "
            >
              NationAura blends immersive interface
              systems, intelligent interactions,
              and futuristic civic technology into
              a beautifully structured support
              experience designed to feel years
              ahead of modern platforms.
            </motion.p>

            {/* BUTTONS */}
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
                duration: 0.7,
                delay: 0.3,
              }}

              viewport={{
                once: true,
              }}

              className="
              mt-14
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-5
              "
            >

              {/* PRIMARY */}
              <Link to="/help-center">

                <motion.button
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className="
                  group
                  relative
                  overflow-hidden
                  px-8
                  md:px-10
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-600
                  text-white
                  font-semibold
                  text-lg
                  shadow-[0_20px_60px_rgba(16,185,129,0.35)]
                  "
                >

                  <div
                    className="
                    absolute
                    inset-0
                    bg-white/10
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                    "
                  />

                  <span
                    className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-3
                    "
                  >
                    Open Help Center

                    <FiArrowUpRight
                      className="
                      text-xl
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      transition-all
                      duration-300
                      "
                    />

                  </span>

                </motion.button>

              </Link>

              {/* SECONDARY */}
              <Link to="/contact">

                <motion.button
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className="
                  h-16
                  px-8
                  md:px-10
                  rounded-2xl
                  bg-white
                  border
                  border-black/5
                  text-black
                  font-semibold
                  text-lg
                  shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                  hover:border-green-200
                  hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]
                  transition-all
                  duration-500
                  "
                >
                  Contact Support
                </motion.button>

              </Link>

            </motion.div>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default FAQCTA;