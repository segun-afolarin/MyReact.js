import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

const impacts = [
  {
    title: "Safer Roads",
    description:
      "Helping communities identify and report dangerous road conditions faster.",
    icon: <FiMapPin />,
  },

  {
    title: "Faster Repairs",
    description:
      "Improving response times by connecting citizens with authorities transparently.",
    icon: <FiTrendingUp />,
  },

  {
    title: "Stronger Communities",
    description:
      "Encouraging citizens to work together to improve local infrastructure.",
    icon: <FiUsers />,
  },

  {
    title: "Transparent Governance",
    description:
      "Creating open systems where infrastructure issues are visible and trackable.",
    icon: <FiCheckCircle />,
  },
];

const MissionImpact = () => {
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
          top-[-200px]
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-green-400/10
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
            NationAura Impact
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
            Together We Can Build
            A More Transparent
            Nigeria
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
            Every report submitted through NationAura
            helps create safer communities,
            stronger accountability,
            and faster infrastructure response
            across Nigeria.
          </p>

        </motion.div>

        {/* IMPACT GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {impacts.map((impact, index) => (
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

              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}

              viewport={{
                once: true,
              }}

              whileHover={{
                y: -12,
              }}

              className="group"
            >

              <div
                className="
                  relative
                  overflow-hidden
                  h-full
                  border
                  border-black/10
                  bg-white
                  p-8
                  transition-all
                  duration-500
                  hover:border-green-500/30
                  hover:shadow-[0_30px_80px_rgba(34,197,94,0.12)]
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
                    to-emerald-500
                  "
                />

                {/* GLOW */}
                <div
                  className="
                    absolute
                    -top-24
                    -right-24
                    w-56
                    h-56
                    bg-green-500/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-700
                  "
                />

                {/* BIG BACKGROUND ICON */}
                <div
                  className="
                    absolute
                    -right-10
                    -bottom-10
                    text-[170px]
                    text-green-50
                    transition-all
                    duration-700
                    group-hover:scale-110
                    group-hover:rotate-6
                  "
                >
                  {impact.icon}
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
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:-translate-y-1
                      "
                    >
                      {impact.icon}
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
                      mb-6
                      leading-tight
                    "
                  >
                    {impact.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      text-gray-600
                      text-lg
                      leading-relaxed
                    "
                  >
                    {impact.description}
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

export default MissionImpact;