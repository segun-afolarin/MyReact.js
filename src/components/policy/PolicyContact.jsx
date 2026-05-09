import { motion } from "framer-motion";

import {
  FiMail,
  FiMessageSquare,
  FiHelpCircle,
  FiArrowUpRight,
  FiShield,
  FiCpu,
} from "react-icons/fi";

const supportItems = [
  {
    title: "Policy Questions",
    description:
      "Get clarity about privacy, reporting guidelines, transparency systems, and platform policies.",
    icon: <FiHelpCircle />,
    gradient: "from-green-500 to-emerald-600",
  },

  {
    title: "Platform Feedback",
    description:
      "Share suggestions, report bugs, or help improve the NationAura civic experience.",
    icon: <FiMessageSquare />,
    gradient: "from-emerald-500 to-green-700",
  },

  {
    title: "Security & Trust",
    description:
      "Reach out regarding account protection, verification systems, or suspicious activity.",
    icon: <FiShield />,
    gradient: "from-green-400 to-emerald-500",
  },
];

const PolicyContact = () => {
  return (
    <section
      className="
        relative
        px-6
        lg:px-12
        pb-32
        overflow-hidden
      "
    >

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

      {/* GLOW */}
      <div
        className="
          absolute
          top-0
          right-[-150px]
          w-[500px]
          h-[500px]
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

        {/* TOP GRADIENT LINE */}
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

          {/* LEFT SIDE */}
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

            {/* LABEL */}
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
              <FiCpu />

              Contact & Support
            </div>

            {/* TITLE */}
            <h2
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-black
                tracking-tight
                leading-[0.95]
                text-black
              "
            >
              Human Support
              <br />

              Meets Intelligent
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
                Civic Systems
              </span>

            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8
                text-lg
                text-gray-600
                leading-relaxed
                max-w-2xl
              "
            >
              NationAura combines intelligent civic
              technology with real human assistance —
              helping citizens resolve infrastructure,
              reporting, security, and platform-related
              concerns faster and more transparently.
            </p>

            {/* SUPPORT EMAIL CARD */}
            <motion.div
              whileHover={{
                y: -6,
              }}

              className="
                group
                relative
                overflow-hidden
                mt-12
                border
                border-black/10
                bg-[#F8F8F8]
                p-6
                sm:p-8
              "
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

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-5
                  "
                >

                  <div className="flex items-start gap-5">

                    {/* ICON */}
                    <div
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
                        flex-shrink-0
                      "
                    >
                      <FiMail />
                    </div>

                    <div>

                      <p
                        className="
                          text-sm
                          uppercase
                          tracking-[0.2em]
                          text-green-700
                          font-semibold
                          mb-3
                        "
                      >
                        Official Support Channel
                      </p>

                      <h3
                        className="
                          text-2xl
                          sm:text-3xl
                          font-black
                          tracking-tight
                          text-black
                        "
                      >
                        support@nationaura.ng
                      </h3>

                    </div>

                  </div>

                  {/* ARROW */}
                  <motion.div
                    whileHover={{
                      rotate: 45,
                    }}

                    className="
                      hidden
                      sm:flex
                      text-2xl
                      text-gray-300
                      group-hover:text-green-600
                      transition-all
                    "
                  >
                    <FiArrowUpRight />
                  </motion.div>

                </div>

              </div>

            </motion.div>

          </motion.div>

          {/* RIGHT SIDE */}
          <div
            className="
              grid
              grid-cols-1
            "
          >

            {supportItems.map((item, index) => (
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
                    index !== supportItems.length - 1
                      ? "border-b border-black/10"
                      : ""
                  }
                `}
              >

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
                        ${item.gradient}
                        text-white
                        flex
                        items-center
                        justify-center
                        text-3xl
                        shadow-2xl
                      `}
                    >
                      {item.icon}
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
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-gray-600
                      text-lg
                      leading-relaxed
                    "
                  >
                    {item.description}
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

export default PolicyContact;