import { motion } from "framer-motion";

import {
  FiMap,
  FiTool,
  FiUsers,
  FiShield,
  FiArrowUpRight,
} from "react-icons/fi";

const impactCards = [
  {
    title: "Safer Roads",

    icon: <FiMap />,

    description:
      "Citizens can quickly report dangerous roads, damaged highways, and unsafe public infrastructure for faster awareness and action.",
  },

  {
    title: "Faster Repairs",

    icon: <FiTool />,

    description:
      "NationAura helps authorities and organizations identify urgent infrastructure problems and respond more efficiently.",
  },

  {
    title: "Stronger Communities",

    icon: <FiUsers />,

    description:
      "Communities become more connected and empowered when citizens actively participate in improving public spaces.",
  },

  {
    title: "Transparent Governance",

    icon: <FiShield />,

    description:
      "Infrastructure issues are tracked openly, promoting accountability, transparency, and public trust.",
  },
];

const CommunityGoals = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        lg:px-12
        py-28
        bg-[#f8faf8]
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

      {/* TOP GLOW */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[800px]
          h-[800px]
          bg-green-500/10
          rounded-full
          blur-3xl
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto">

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

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.6,
          }}

          className="
            max-w-4xl
            mb-20
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
              font-semibold
              uppercase
              tracking-[0.2em]
              mb-6
            "
          >
            NationAura Community Goals
          </div>

          {/* TITLE */}
          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              leading-tight
              tracking-tight
              text-black
              max-w-5xl
            "
          >
            Empowering Citizens
            Through Collective
            Civic Action
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
            NationAura creates a collaborative ecosystem
            where citizens, communities, and organizations
            work together to improve infrastructure,
            transparency, and accountability across Nigeria.
          </p>

        </motion.div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
          "
        >

          {impactCards.map((card, index) => (
            <motion.div
              key={index}

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
                duration: 0.5,
                delay: index * 0.08,
              }}

              whileHover={{
                y: -12,
              }}

              className="group"
            >

              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  border
                  border-black/10
                  bg-white/90
                  backdrop-blur-2xl
                  p-8
                  md:p-10
                  transition-all
                  duration-500
                  hover:border-green-500/30
                  hover:shadow-[0_30px_100px_rgba(34,197,94,0.12)]
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

                {/* HOVER GLOW */}
                <div
                  className="
                    absolute
                    -top-24
                    -right-24
                    w-64
                    h-64
                    bg-green-500/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-700
                  "
                />

                {/* HUGE BACKGROUND ICON */}
                <div
                  className="
                    absolute
                    -right-8
                    -bottom-8
                    text-[170px]
                    text-green-50
                    transition-all
                    duration-700
                    group-hover:scale-110
                    group-hover:rotate-6
                  "
                >
                  {card.icon}
                </div>

                {/* CONTENT */}
                <div className="relative z-10">

                  {/* TOP */}
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      mb-10
                    "
                  >

                    {/* ICON */}
                    <motion.div
                      whileHover={{
                        rotate: -6,
                        scale: 1.08,
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
                        shadow-[0_20px_40px_rgba(34,197,94,0.25)]
                        transition-all
                        duration-500
                      "
                    >
                      {card.icon}
                    </motion.div>

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
                        duration-300
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
                      mb-6
                      max-w-sm
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
                      max-w-md
                    "
                  >
                    {card.description}
                  </p>

                  {/* BOTTOM LINE */}
                  <div
                    className="
                      mt-10
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-12
                        h-[2px]
                        bg-green-500
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        tracking-[0.2em]
                        uppercase
                        text-green-700
                      "
                    >
                      NationAura
                    </span>

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

export default CommunityGoals;