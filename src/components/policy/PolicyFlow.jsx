import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiCpu,
  FiSearch,
  FiTool,
  FiShield,
  FiSend,
  FiArrowRight,
} from "react-icons/fi";

const reportFlow = [
  {
    title: "Report Submitted",
    icon: <FiSend />,
    description:
      "Citizens upload infrastructure issues with images, location, and detailed descriptions.",
  },

  {
    title: "AI Verification",
    icon: <FiCpu />,
    description:
      "NationAura AI analyzes reports for accuracy, duplication, and urgency detection.",
  },

  {
    title: "Authority Review",
    icon: <FiShield />,
    description:
      "Verified reports are escalated to the appropriate agencies and civic authorities.",
  },

  {
    title: "Under Review",
    icon: <FiSearch />,
    description:
      "Authorities inspect the issue and begin assessment for possible action.",
  },

  {
    title: "Repair In Progress",
    icon: <FiTool />,
    description:
      "Repair teams begin infrastructure improvements while progress stays visible publicly.",
  },

  {
    title: "Issue Fixed",
    icon: <FiCheckCircle />,
    description:
      "The issue is resolved and citizens receive transparent status updates in real time.",
  },
];

const PolicyFlow = () => {
  return (
    <section
      className="
        relative
        px-6
        lg:px-12
        py-28
        overflow-hidden
      "
    >

      {/* GRID BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          top-[-250px]
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-green-500/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
        "
      >

        {/* HEADER */}
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
            max-w-3xl
            mb-20
          "
        >

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
              font-semibold
              uppercase
              tracking-[0.2em]
              mb-6
            "
          >
            NationAura Workflow
          </div>

          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              leading-tight
              tracking-tight
              text-black
            "
          >
            From Citizen Reports
            To Real-World Action
          </h2>

          <p
            className="
              mt-8
              text-lg
              leading-relaxed
              text-gray-600
              max-w-2xl
            "
          >
            Every report inside NationAura follows a
            transparent verification and response pipeline
            designed to strengthen trust, accountability,
            and faster infrastructure repair across Nigeria.
          </p>

        </motion.div>

        {/* FLOW */}
        <div
          className="
            relative
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {reportFlow.map((step, index) => (
            <motion.div
              key={index}

              initial={{
                opacity: 0,
                y: 50,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}

              whileHover={{
                y: -12,
              }}

              className="group relative"
            >

              {/* CARD */}
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  border
                  border-black/10
                  bg-white
                  p-8
                  transition-all
                  duration-500
                  hover:border-green-500/40
                  hover:shadow-[0_25px_80px_rgba(34,197,94,0.15)]
                "
              >

                {/* ANIMATED TOP LINE */}
                <motion.div
                  initial={{
                    width: "0%",
                  }}

                  whileInView={{
                    width: "100%",
                  }}

                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                  }}

                  className="
                    absolute
                    top-0
                    left-0
                    h-[3px]
                    bg-gradient-to-r
                    from-green-500
                    to-emerald-600
                  "
                />

                {/* GLOW */}
                <div
                  className="
                    absolute
                    -top-20
                    -right-20
                    w-52
                    h-52
                    bg-green-500/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-700
                  "
                />

                {/* STEP NUMBER */}
                <div
                  className="
                    absolute
                    top-6
                    right-6
                    text-[70px]
                    font-black
                    text-black/[0.04]
                    leading-none
                  "
                >
                  0{index + 1}
                </div>

                {/* CONTENT */}
                <div className="relative z-10">

                  {/* ICON */}
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.06,
                    }}

                    className="
                      w-16
                      h-16
                      bg-gradient-to-br
                      from-green-500
                      to-emerald-600
                      text-white
                      flex
                      items-center
                      justify-center
                      text-3xl
                      shadow-2xl
                      mb-10
                    "
                  >
                    {step.icon}
                  </motion.div>

                  {/* TITLE */}
                  <h2
                    className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-black
                      mb-5
                      leading-tight
                    "
                  >
                    {step.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-gray-600
                      text-lg
                      leading-relaxed
                    "
                  >
                    {step.description}
                  </p>

                  {/* BOTTOM LINE */}
                  <div
                    className="
                      mt-10
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        h-[2px]
                        flex-1
                        bg-gradient-to-r
                        from-green-500/30
                        to-transparent
                      "
                    />

                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}

                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}

                      className="
                        ml-4
                        text-green-600
                        text-xl
                      "
                    >
                      <FiArrowRight />
                    </motion.div>

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default PolicyFlow;