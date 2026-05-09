import { motion } from "framer-motion";

import {
  FiArrowUpRight,
  FiActivity,
} from "react-icons/fi";

import Container from "../ui/Container";

const WhyWeExist = () => {
  return (
    <section
      className="
        relative
        py-28
        overflow-hidden
      "
    >

      {/* BACKGROUND GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:80px_80px]
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

            bg-gradient-to-br
            from-[#ffffff]
            via-[#f8fffb]
            to-[#ecfdf5]

            p-10
            lg:p-16

            shadow-[0_20px_80px_rgba(0,0,0,0.04)]
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

          {/* TOP RIGHT GLOW */}
          <div
            className="
              absolute
              -top-20
              -right-20
              w-72
              h-72
              bg-green-500/10
              blur-3xl
            "
          />

          {/* BOTTOM LEFT GLOW */}
          <div
            className="
              absolute
              bottom-0
              left-0
              w-[500px]
              h-[500px]
              bg-emerald-200/30
              blur-3xl
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10

              grid
              grid-cols-1
              lg:grid-cols-[1fr_120px]
              gap-12
              items-start
            "
          >

            {/* LEFT SIDE */}
            <div>

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

                <FiActivity />

                Why We Exist

              </div>

              {/* TITLE */}
              <h2
                className="
                  text-4xl
                  md:text-6xl

                  font-black

                  tracking-tight
                  leading-[1.05]

                  text-black

                  max-w-5xl
                "
              >
                Solving Nigeria’s
                Infrastructure
                Reporting Crisis
              </h2>

              {/* DESCRIPTION */}
              <div
                className="
                  mt-10
                  max-w-3xl
                  space-y-6
                "
              >

                <p
                  className="
                    text-xl
                    text-gray-700
                    leading-relaxed
                  "
                >
                  Across many communities,
                  infrastructure failures are ignored,
                  delayed, or poorly documented.
                </p>

                <p
                  className="
                    text-lg
                    text-gray-600
                    leading-relaxed
                  "
                >
                  Citizens lack direct systems to report
                  issues, monitor progress,
                  and hold institutions accountable.
                </p>

                <p
                  className="
                    text-lg
                    text-gray-600
                    leading-relaxed
                  "
                >
                  NationAura bridges this gap through
                  civic technology, AI verification,
                  transparency systems,
                  and community-driven reporting.
                </p>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div
              className="
                hidden
                lg:flex

                flex-col
                items-end
                justify-between

                h-full
              "
            >

              {/* BIG NUMBER */}
              <div
                className="
                  text-[7rem]
                  font-black
                  leading-none

                  text-green-900/[0.05]

                  select-none
                "
              >
                01
              </div>

              {/* ICON */}
              <motion.div
                whileHover={{
                  rotate: 45,
                }}

                className="
                  w-16
                  h-16

                  border
                  border-black/10

                  flex
                  items-center
                  justify-center

                  text-2xl
                  text-green-600

                  bg-green-50
                "
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