import { motion } from "framer-motion";

import {
  FiTarget,
  FiShield,
  FiClock,
  FiCpu,
  FiArrowUpRight,
} from "react-icons/fi";

const missionGoals = [
  {
    title: "Improve Infrastructure Reporting",

    description:
      "Make it easier for citizens to report roads, flooding, electricity, and public infrastructure issues across Nigeria.",

    icon: <FiTarget />,
  },

  {
    title: "Increase Transparency",

    description:
      "Create open communication between citizens, authorities, and organizations for accountable governance.",

    icon: <FiShield />,
  },

  {
    title: "Faster Community Response",

    description:
      "Help authorities respond to urgent infrastructure challenges more efficiently and effectively.",

    icon: <FiClock />,
  },

  {
    title: "AI-Powered Verification",

    description:
      "Use AI and community verification to organize, verify, and prioritize reports in real time.",

    icon: <FiCpu />,
  },
];

const MissionGoals = () => {
  return (
    <section
      className="
        relative
        py-28
        overflow-hidden
        bg-[#f8faf8]
      "
    >

      {/* BACKGROUND GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          bg-[linear-gradient(to_right,#16a34a_1px,transparent_1px),linear-gradient(to_bottom,#16a34a_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      {/* GREEN GLOW */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            mb-20
            max-w-4xl
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
              bg-green-500/10
              backdrop-blur-xl
              px-5
              py-2.5
              text-green-700
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              mb-8
            "
          >
            Our Goals
          </div>

          {/* TITLE */}
          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              leading-[1.05]
              tracking-tight
              text-black
            "
          >
            Driving Real Change
            Through Technology
            & Community Action
          </h2>

          {/* TEXT */}
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
            NationAura is building a smarter,
            faster, and transparent civic-tech
            ecosystem that empowers communities
            to solve infrastructure challenges
            across Nigeria.
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

          {missionGoals.map((goal, index) => (
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

              className="group"
            >

              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  border
                  border-green-100
                  bg-white/80
                  backdrop-blur-2xl
                  p-8
                  md:p-10
                  transition-all
                  duration-500
                  hover:border-green-400/40
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

                {/* GLOW */}
                <div
                  className="
                    absolute
                    -top-20
                    -right-20
                    w-60
                    h-60
                    bg-green-500/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-700
                  "
                />

                {/* BIG ICON BG */}
                <div
                  className="
                    absolute
                    -bottom-10
                    -right-10
                    text-[160px]
                    text-green-50
                    transition-all
                    duration-700
                    group-hover:scale-110
                  "
                >
                  {goal.icon}
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
                        shadow-[0_20px_40px_rgba(34,197,94,0.25)]
                        group-hover:scale-110
                        transition-all
                        duration-500
                      "
                    >
                      {goal.icon}
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
                  <h2
                    className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-black
                      mb-6
                    "
                  >
                    {goal.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-gray-600
                      text-lg
                      leading-relaxed
                    "
                  >
                    {goal.description}
                  </p>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default MissionGoals;