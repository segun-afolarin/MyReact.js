import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiTarget,
  FiArrowUpRight,
} from "react-icons/fi";

import Container from "../ui/Container";

const goals = [
  "Build a safer and more transparent Nigeria",

  "Improve accountability in infrastructure management",

  "Connect citizens directly with real change",

  "Empower communities through civic technology",

  "Encourage faster response to public issues",
];

const GoalsSection = () => {
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
          via-[#ffffff]
          to-[#ecfdf5]
        "
      />

      {/* GRID PATTERN */}
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
          left-0
          w-[500px]
          h-[500px]
          bg-green-200/30
          blur-3xl
        "
      />

      <Container>

        <div
          className="
            relative
            z-10

            grid
            grid-cols-1
            lg:grid-cols-2
            gap-16
            items-start
          "
        >

          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.6,
            }}

            viewport={{
              once: true,
            }}

            className="
              sticky
              top-32
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

              <FiTarget />

              Mission & Goals

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
              "
            >
              Building A
              Transparent Future
              For Nigeria
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8

                text-xl
                text-gray-600
                leading-relaxed
                max-w-2xl
              "
            >
              NationAura empowers citizens to report,
              track, and improve infrastructure systems
              through transparency, accountability,
              and civic technology.
            </p>

            {/* FLOATING ICON */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
              }}

              className="
                hidden
                lg:flex

                mt-14

                w-20
                h-20

                border
                border-green-500/20

                bg-white/70
                backdrop-blur-xl

                items-center
                justify-center

                text-3xl
                text-green-600

                shadow-[0_20px_50px_rgba(34,197,94,0.1)]
              "
            >
              <FiArrowUpRight />
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE */}
          <div className="relative">

            {/* TIMELINE LINE */}
            <div
              className="
                absolute
                top-0
                left-5

                w-[2px]
                h-full

                bg-gradient-to-b
                from-green-500
                via-emerald-400
                to-transparent

                hidden
                md:block
              "
            />

            <div className="space-y-8">

              {goals.map((goal, index) => (
                <motion.div
                  key={index}

                  initial={{
                    opacity: 0,
                    x: 40,
                  }}

                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}

                  viewport={{
                    once: true,
                  }}

                  whileHover={{
                    x: 10,
                  }}

                  className="relative"
                >

                  {/* TIMELINE DOT */}
                  <div
                    className="
                      absolute
                      left-0
                      top-10

                      hidden
                      md:flex

                      w-10
                      h-10

                      bg-green-600
                      text-white

                      items-center
                      justify-center

                      shadow-xl
                      z-20
                    "
                  >
                    <FiCheckCircle />
                  </div>

                  {/* CARD */}
                  <div
                    className="
                      md:ml-20

                      relative
                      overflow-hidden

                      border
                      border-black/10

                      bg-white/80
                      backdrop-blur-xl

                      p-8

                      shadow-[0_15px_60px_rgba(0,0,0,0.05)]

                      transition-all
                      duration-500

                      hover:border-green-500/30
                      hover:shadow-[0_20px_80px_rgba(34,197,94,0.12)]
                    "
                  >

                    {/* CARD GLOW */}
                    <div
                      className="
                        absolute
                        -top-20
                        -right-20

                        w-40
                        h-40

                        bg-green-400/10
                        blur-3xl

                        opacity-0
                        hover:opacity-100

                        transition-all
                        duration-700
                      "
                    />

                    {/* NUMBER */}
                    <div
                      className="
                        absolute
                        top-6
                        right-6

                        text-5xl
                        font-black

                        text-black/[0.04]
                      "
                    >
                      0{index + 1}
                    </div>

                    {/* MOBILE ICON */}
                    <div
                      className="
                        md:hidden

                        w-14
                        h-14

                        bg-green-600
                        text-white

                        flex
                        items-center
                        justify-center

                        text-2xl

                        mb-6
                      "
                    >
                      <FiCheckCircle />
                    </div>

                    {/* TEXT */}
                    <p
                      className="
                        relative
                        z-10

                        text-xl
                        font-medium

                        text-gray-800
                        leading-relaxed

                        max-w-xl
                      "
                    >
                      {goal}
                    </p>

                  </div>

                </motion.div>
              ))}

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default GoalsSection;