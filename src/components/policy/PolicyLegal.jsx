import { motion } from "framer-motion";

import {
  FiShield,
  FiUsers,
  FiLayers,
  FiArrowUpRight,
} from "react-icons/fi";

const legalCards = [
  {
    title: "Independent Platform",
    description:
      "NationAura operates independently to promote transparent civic participation, infrastructure accountability, and trusted public engagement across Nigeria.",
    icon: <FiShield />,
    gradient: "from-green-500 to-emerald-600",
  },

  {
    title: "Community Driven",
    description:
      "Every report, verification process, and infrastructure update is powered by citizens, AI systems, NGOs, and collaborative civic participation.",
    icon: <FiUsers />,
    gradient: "from-emerald-500 to-green-700",
  },
];

const PolicyLegal = () => {
  return (
    <section
      className="
        relative
        px-6
        lg:px-12
        pb-28
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
          bg-[size:90px_90px]
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          top-0
          right-[-120px]
          w-[420px]
          h-[420px]
          bg-green-500/10
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          overflow-hidden
          border
          border-black/10
          bg-white
          shadow-[0_30px_120px_rgba(0,0,0,0.08)]
        "
      >

        {/* TOP LINE */}
        <motion.div
          initial={{
            width: "0%",
          }}

          whileInView={{
            width: "100%",
          }}

          transition={{
            duration: 1.2,
          }}

          viewport={{
            once: true,
          }}

          className="
            absolute
            top-0
            left-0
            h-[4px]
            bg-gradient-to-r
            from-green-500
            via-emerald-500
            to-green-700
          "
        />

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1.1fr_0.9fr]
          "
        >

          {/* LEFT CONTENT */}
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
              p-8
              sm:p-10
              lg:p-16
              border-b
              lg:border-b-0
              lg:border-r
              border-black/10
            "
          >

            {/* MINI LABEL */}
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
                tracking-[0.18em]
                mb-8
              "
            >
              <FiLayers />

              Legal Disclaimer
            </div>

            {/* TITLE */}
            <h2
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-black
                leading-[0.95]
                tracking-tight
                text-black
              "
            >
              Civic Technology
              <br />

              Built For
              <span
                className="
                  bg-gradient-to-r
                  from-green-600
                  via-emerald-500
                  to-green-700
                  bg-clip-text
                  text-transparent
                "
              >
                {" "}
                Transparency
              </span>

            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8
                text-lg
                leading-relaxed
                text-gray-600
                max-w-2xl
              "
            >
              NationAura is not a government agency.
              The platform provides intelligent infrastructure
              reporting and transparency tools that support
              communities, NGOs, media organizations,
              and institutions working toward civic
              accountability and public trust.
            </p>

            {/* EXTRA STRIP */}
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
                "Secure Reporting",
                "Public Accountability",
              ].map((item, index) => (
                <motion.div
                  key={index}

                  whileHover={{
                    y: -3,
                  }}

                  className="
                    px-5
                    py-3
                    border
                    border-black/10
                    bg-[#F8F8F8]
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  {item}
                </motion.div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT CARDS */}
          <div
            className="
              grid
              grid-cols-1
            "
          >

            {legalCards.map((card, index) => (
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
                  backgroundColor: "#fafafa",
                }}

                className={`
                  group
                  relative
                  overflow-hidden
                  p-8
                  sm:p-10
                  transition-all
                  duration-500
                  ${
                    index !== legalCards.length - 1
                      ? "border-b border-black/10"
                      : ""
                  }
                `}
              >

                {/* HOVER GLOW */}
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

                <div className="relative z-10">

                  {/* TOP */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      mb-8
                    "
                  >

                    {/* ICON */}
                    <div
                      className={`
                        w-16
                        h-16
                        bg-gradient-to-br
                        ${card.gradient}
                        text-white
                        flex
                        items-center
                        justify-center
                        text-3xl
                        shadow-2xl
                      `}
                    >
                      {card.icon}
                    </div>

                    {/* ARROW */}
                    <motion.div
                      whileHover={{
                        rotate: 45,
                      }}

                      className="
                        text-2xl
                        text-gray-300
                        group-hover:text-green-600
                        transition-all
                      "
                    >
                      <FiArrowUpRight />
                    </motion.div>

                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-black
                      mb-5
                    "
                  >
                    {card.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-gray-600
                      text-lg
                      leading-relaxed
                    "
                  >
                    {card.description}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
};

export default PolicyLegal;