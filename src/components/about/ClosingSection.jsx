import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiSend,
} from "react-icons/fi";

import Container from "../ui/Container";

const ClosingSection = () => {
  return (
    <section
      className="
        relative
        py-28
        overflow-hidden
      "
    >

      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-[#f8fffb]
          via-white
          to-[#ecfdf5]
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]

          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]

          bg-[size:70px_70px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2

          w-[600px]
          h-[600px]

          bg-green-300/20
          blur-3xl
        "
      />

      <Container>

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
            duration: 0.6,
          }}

          viewport={{
            once: true,
          }}

          className="
            relative
            overflow-hidden

            border
            border-black/10

            bg-white/70
            backdrop-blur-2xl

            p-8
            md:p-12
            lg:p-16

            shadow-[0_25px_100px_rgba(0,0,0,0.06)]
          "
        >

          {/* TOP ACCENT */}
          <div
            className="
              absolute
              top-0
              left-0

              h-[4px]
              w-full

              bg-gradient-to-r
              from-green-500
              via-emerald-500
              to-green-700
            "
          />

          {/* FLOATING GLOW */}
          <div
            className="
              absolute
              -top-20
              -right-20

              w-72
              h-72

              bg-green-400/10
              blur-3xl
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10

              flex
              flex-col
              items-center
              text-center
            "
          >

            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2

                border
                border-green-500/20

                bg-green-500/5

                px-4
                py-2

                text-green-700
                text-sm
                font-bold

                uppercase
                tracking-[0.2em]

                mb-8
              "
            >

              <FiSend />

              NationAura Community

            </div>

            {/* TITLE */}
            <h2
              className="
                text-4xl
                sm:text-5xl
                lg:text-7xl

                font-black

                tracking-tight
                leading-[1.05]

                text-black

                max-w-5xl
              "
            >
              Together,
              We Can Build
              A Better Nigeria
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8

                text-lg
                md:text-xl

                text-gray-600
                leading-relaxed

                max-w-3xl
              "
            >
              NationAura empowers communities through
              transparency, civic participation,
              and AI-powered infrastructure reporting
              to drive meaningful national change.
            </p>

            {/* BUTTONS */}
            <div
              className="
                mt-12

                flex
                flex-col
                sm:flex-row

                items-center
                justify-center

                gap-5

                w-full
              "
            >

              {/* PRIMARY BUTTON */}
              <Link
                to="/reports"
                className="w-full sm:w-auto"
              >

                <motion.button
                  whileHover={{
                    scale: 1.03,
                    y: -3,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className="
                    group

                    w-full
                    sm:w-auto

                    bg-green-600
                    hover:bg-green-700

                    text-white

                    px-8
                    py-4

                    text-lg
                    font-semibold

                    transition-all
                    duration-300

                    shadow-[0_15px_40px_rgba(34,197,94,0.25)]

                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                >

                  Start Reporting

                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                    }}

                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <FiArrowUpRight />
                  </motion.div>

                </motion.button>

              </Link>

              {/* SECONDARY BUTTON */}
              <Link
                to="/contact"
                className="w-full sm:w-auto"
              >

                <motion.button
                  whileHover={{
                    scale: 1.03,
                    y: -3,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className="
                    w-full
                    sm:w-auto

                    border
                    border-black/10

                    bg-white/70
                    backdrop-blur-xl

                    text-black

                    px-8
                    py-4

                    text-lg
                    font-semibold

                    hover:bg-white

                    transition-all
                    duration-300
                  "
                >
                  Contact Us
                </motion.button>

              </Link>

            </div>

            {/* BOTTOM TEXT */}
            <div
              className="
                mt-14

                text-sm
                text-gray-500

                uppercase
                tracking-[0.2em]
              "
            >
              Civic Technology • Transparency • Community Action
            </div>

          </div>

        </motion.div>

      </Container>

    </section>
  );
};

export default ClosingSection;