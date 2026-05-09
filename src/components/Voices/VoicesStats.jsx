import { motion } from "framer-motion";

import {
  FiFileText,
  FiMap,
  FiCheckCircle,
  FiGlobe,
  FiArrowUpRight,
} from "react-icons/fi";

const stats = [
  {
    title: "Reports Submitted",

    value: "12K+",

    icon: <FiFileText />,

    description:
      "Infrastructure issues reported across communities nationwide.",
  },

  {
    title: "Communities Reached",

    value: "250+",

    icon: <FiMap />,

    description:
      "Communities actively using NationAura to drive accountability.",
  },

  {
    title: "Issues Resolved",

    value: "5K+",

    icon: <FiCheckCircle />,

    description:
      "Verified civic issues successfully resolved and completed.",
  },

  {
    title: "States Connected",

    value: "20+",

    icon: <FiGlobe />,

    description:
      "States connected through transparent infrastructure reporting.",
  },
];

const VoicesStats = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        lg:px-12
        py-28
        bg-[#f3f7f4]
      "
    >

      {/* RADIAL BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_35%)]
        "
      />

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

      {/* FLOATING GLOW */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          top-20
          right-20
          w-[400px]
          h-[400px]
          rounded-full
          bg-green-500/10
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
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-10
            mb-20
          "
        >

          {/* LEFT */}
          <div className="max-w-4xl">

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
              NationAura Voices
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
              Real Community
              Voices Creating
              Lasting Impact
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
              NationAura empowers citizens to share
              experiences, report infrastructure challenges,
              and create transparent civic engagement that
              drives measurable change across Nigeria.
            </p>

          </div>

          {/* SIDE INFO */}
          <motion.div
            whileHover={{
              y: -6,
            }}

            className="
              hidden
              lg:flex
              items-center
              gap-4
              border
              border-black/10
              bg-white/80
              backdrop-blur-2xl
              px-6
              py-5
              shadow-[0_20px_60px_rgba(0,0,0,0.05)]
            "
          >

            <div
              className="
                w-14
                h-14
                bg-gradient-to-br
                from-green-500
                to-emerald-600
                text-white
                flex
                items-center
                justify-center
                text-2xl
                shadow-lg
              "
            >
              <FiGlobe />
            </div>

            <div>
              <p
                className="
                  text-sm
                  uppercase
                  tracking-[0.2em]
                  text-green-700
                  font-semibold
                "
              >
                Community Growth
              </p>

              <h3
                className="
                  text-2xl
                  font-black
                  text-black
                "
              >
                Expanding Daily
              </h3>
            </div>

          </motion.div>

        </motion.div>

        {/* STATS GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-8
          "
        >

          {stats.map((stat, index) => (
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
                  overflow-hidden
                  h-full
                  border
                  border-black/10
                  bg-white/85
                  backdrop-blur-2xl
                  p-8
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

                {/* HUGE NUMBER */}
                <div
                  className="
                    absolute
                    right-0
                    bottom-0
                    text-[120px]
                    font-black
                    leading-none
                    text-green-50
                    opacity-70
                    select-none
                    transition-all
                    duration-700
                    group-hover:scale-110
                  "
                >
                  0{index + 1}
                </div>

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
                        rotate: -8,
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
                      "
                    >
                      {stat.icon}
                    </motion.div>

                    {/* ARROW */}
                    <div
                      className="
                        text-2xl
                        text-gray-300
                        group-hover:text-green-600
                        transition-all
                        duration-300
                      "
                    >
                      <FiArrowUpRight />
                    </div>

                  </div>

                  {/* VALUE */}
                  <h3
                    className="
                      text-5xl
                      md:text-6xl
                      font-black
                      tracking-tight
                      text-black
                    "
                  >
                    {stat.value}
                  </h3>

                  {/* TITLE */}
                  <h4
                    className="
                      mt-4
                      text-2xl
                      font-bold
                      text-black
                    "
                  >
                    {stat.title}
                  </h4>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-5
                      text-gray-600
                      leading-relaxed
                      text-lg
                    "
                  >
                    {stat.description}
                  </p>

                  {/* BOTTOM */}
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
                        uppercase
                        tracking-[0.2em]
                        text-green-700
                      "
                    >
                      Live Impact
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

export default VoicesStats;