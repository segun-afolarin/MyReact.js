import { useState } from "react";

import { motion } from "framer-motion";

import {
  FiCamera,
  FiMapPin,
  FiCpu,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

const steps = [
  {
    id: 1,
    title: "Report Infrastructure Issues",
    description:
      "Citizens upload photos and videos of potholes, flooding, waste problems, and damaged infrastructure.",
    icon: <FiCamera />,
    gradient: "from-green-500 to-emerald-600",
  },

  {
    id: 2,
    title: "GPS Location Detection",
    description:
      "NationAura automatically detects issue locations and maps reports in real-time across Nigeria.",
    icon: <FiMapPin />,
    gradient: "from-emerald-500 to-green-700",
  },

  {
    id: 3,
    title: "AI Damage Analysis",
    description:
      "Artificial intelligence analyzes uploaded images and estimates damage severity levels instantly.",
    icon: <FiCpu />,
    gradient: "from-green-400 to-green-600",
  },

  {
    id: 4,
    title: "Government Response",
    description:
      "Government agencies and NGOs track reports, manage repairs, and provide transparent updates.",
    icon: <FiCheckCircle />,
    gradient: "from-green-600 to-emerald-800",
  },
];

const HowItWorksSection = () => {
  const [activeCard, setActiveCard] =
    useState(1);

  return (
    <section
      className="
      relative
      py-24
      sm:py-28
      overflow-hidden
      bg-[#F8FAF8]
      "
    >
      {/* GRID BACKGROUND */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.04]
        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        [background-size:50px_50px]
        "
      />

      {/* TOP GLOW */}
      <div
        className="
        absolute
        top-[-250px]
        left-1/2
        -translate-x-1/2
        w-[700px]
        h-[700px]
        bg-green-100
        rounded-full
        blur-3xl
        opacity-40
        "
      />

      {/* SIDE GLOW */}
      <div
        className="
        absolute
        bottom-[-200px]
        right-[-120px]
        w-[500px]
        h-[500px]
        bg-emerald-100
        rounded-full
        blur-3xl
        opacity-30
        "
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
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
            duration: 0.8,
          }}

          viewport={{ once: true }}

          className="
          text-center
          mb-20
          "
        >
          {/* BADGE */}
          <div
            className="
            inline-flex
            items-center
            gap-2
            bg-white/80
            border
            border-black/5
            backdrop-blur-xl
            text-green-700
            px-5
            py-3
            text-sm
            font-semibold
            tracking-wide
            uppercase
            shadow-sm
            mb-6
            "
          >
            How NationAura Works
          </div>

          {/* TITLE */}
          <h2
            className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            leading-[1.05]
            tracking-tight
            text-black
            max-w-5xl
            mx-auto
            "
          >
            Turning Citizen Reports
            <span className="text-green-700">
              {" "}
              Into National Action
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
            mt-6
            text-base
            sm:text-lg
            lg:text-xl
            text-gray-600
            max-w-3xl
            mx-auto
            leading-relaxed
            "
          >
            NationAura combines AI,
            geolocation technology,
            and civic collaboration
            to modernize infrastructure
            reporting across Nigeria.
          </p>
        </motion.div>

        {/* STEPS */}
        <div
          className="
          relative
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          lg:gap-8
          "
        >
          {/* CONNECTING LINE */}
          <div
            className="
            hidden
            xl:block
            absolute
            top-28
            left-0
            right-0
            h-[2px]
            bg-gradient-to-r
            from-green-200
            via-green-400
            to-green-200
            opacity-60
            "
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}

              initial={{
                opacity: 0,
                y: 60,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}

              viewport={{ once: true }}

              whileHover={{
                y: -12,
              }}

              whileTap={{
                scale: 0.98,
              }}

              onMouseEnter={() =>
                setActiveCard(step.id)
              }

              className={`
              relative
              group
              z-10
              ${
                index % 2 !== 0
                  ? "xl:mt-14"
                  : ""
              }
              `}
            >
              {/* GLOW */}
              <div
                className={`
                absolute
                inset-0
                bg-gradient-to-br
                ${step.gradient}
                opacity-10
                blur-2xl
                transition-all
                duration-700
                group-hover:opacity-20
                `}
              />

              {/* CARD */}
              <div
                className={`
                relative
                h-full
                overflow-hidden
                bg-white
                border
                border-black/5
                p-7
                sm:p-8
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                hover:shadow-[0_25px_80px_rgba(0,0,0,0.10)]
                transition-all
                duration-500
                backdrop-blur-2xl

                ${
                  activeCard === step.id
                    ? "border-green-200"
                    : ""
                }
                `}
              >
                {/* FLOATING ORB */}
                <div
                  className={`
                  absolute
                  -top-10
                  -right-10
                  w-32
                  h-32
                  rounded-full
                  bg-gradient-to-br
                  ${step.gradient}
                  opacity-10
                  blur-3xl
                  `}
                />

                {/* STEP NUMBER */}
                <div
                  className="
                  absolute
                  top-5
                  right-5
                  text-6xl
                  sm:text-7xl
                  font-black
                  text-black/[0.03]
                  "
                >
                  0{step.id}
                </div>

                {/* ICON */}
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}

                  className={`
                  relative
                  w-16
                  h-16
                  flex
                  items-center
                  justify-center
                  text-3xl
                  text-white
                  bg-gradient-to-br
                  ${step.gradient}
                  shadow-lg
                  mb-8
                  `}
                >
                  {step.icon}
                </motion.div>

                {/* TITLE */}
                <h3
                  className="
                  text-2xl
                  sm:text-[28px]
                  font-black
                  text-black
                  leading-tight
                  "
                >
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                  mt-5
                  text-gray-600
                  leading-relaxed
                  text-base
                  "
                >
                  {step.description}
                </p>

                {/* FOOTER */}
                <div
                  className="
                  mt-8
                  flex
                  items-center
                  justify-between
                  "
                >
                  {/* LINE */}
                  <motion.div
                    animate={{
                      width:
                        activeCard ===
                        step.id
                          ? "120px"
                          : "70px",
                    }}

                    transition={{
                      duration: 0.4,
                    }}

                    className={`
                    h-1.5
                    bg-gradient-to-r
                    ${step.gradient}
                    `}
                  />

                  {/* ARROW */}
                  <motion.div
                    animate={{
                      x:
                        activeCard ===
                        step.id
                          ? 5
                          : 0,
                    }}
                  >
                    <FiArrowRight
                      className="
                      text-green-700
                      text-xl
                      "
                    />
                  </motion.div>
                </div>

                {/* HOVER SHINE */}
                <div
                  className="
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-700
                  bg-gradient-to-tr
                  from-transparent
                  via-white/40
                  to-transparent
                  -translate-x-full
                  group-hover:translate-x-full
                  "
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
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
            delay: 0.2,
          }}

          viewport={{ once: true }}

          className="
          mt-20
          text-center
          "
        >
          <motion.button
            whileHover={{
              scale: 1.04,
            }}

            whileTap={{
              scale: 0.98,
            }}

            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-8
            py-4
            font-semibold
            text-lg
            shadow-[0_15px_40px_rgba(34,197,94,0.25)]
            transition-all
            duration-300
            "
          >
            Start Reporting Issues
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;