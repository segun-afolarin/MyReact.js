import { motion } from "framer-motion";

import {
  FiAlertTriangle,
  FiCheckCircle,
  FiUsers,
  FiMapPin,
} from "react-icons/fi";

const stats = [
  {
    id: 1,
    title: "Infrastructure Reports",
    value: "12,847+",
    icon: <FiAlertTriangle />,
    gradient: "from-green-500 to-emerald-600",
  },

  {
    id: 2,
    title: "Roads Fixed",
    value: "3,291+",
    icon: <FiCheckCircle />,
    gradient: "from-emerald-500 to-green-700",
  },

  {
    id: 3,
    title: "Active Citizens",
    value: "45,000+",
    icon: <FiUsers />,
    gradient: "from-green-400 to-green-600",
  },

  {
    id: 4,
    title: "States Covered",
    value: "36 States",
    icon: <FiMapPin />,
    gradient: "from-green-600 to-emerald-800",
  },
];

const StatsSection = () => {
  return (
    <section
      className="
      relative
      py-20
      sm:py-24
      lg:py-28
      px-4
      sm:px-6
      lg:px-12
      overflow-hidden
      bg-[#F7F8FA]
      "
    >
      {/* PREMIUM BACKGROUND */}
      <div
        className="
        absolute
        top-[-200px]
        left-1/2
        -translate-x-1/2
        w-[700px]
        h-[700px]
        bg-green-100
        rounded-full
        blur-3xl
        opacity-30
        "
      />

      {/* GRID PATTERN */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        [background-size:40px_40px]
        "
      />

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto relative z-10">
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

          viewport={{ once: true }}

          transition={{
            duration: 0.8,
          }}

          className="
          text-center
          mb-16
          lg:mb-20
          "
        >
          {/* BADGE */}
          <motion.div
            whileHover={{
              scale: 1.03,
            }}

            className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-green-100
            text-green-700
            px-5
            py-3
            text-sm
            font-semibold
            mb-6
            tracking-wide
            uppercase
            "
          >
            Nationwide Infrastructure Insights
          </motion.div>

          {/* TITLE */}
          <h2
            className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            tracking-tight
            leading-[1.05]
            text-black
            max-w-4xl
            mx-auto
            "
          >
            Real-Time Community
            <span className="text-green-700">
              {" "}
              Impact Across Nigeria
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
            NationAura empowers citizens,
            NGOs, and agencies with
            transparent infrastructure
            reporting, AI-powered insights,
            and nationwide civic engagement.
          </p>
        </motion.div>

        {/* STATS GRID */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
          lg:gap-7
          "
        >
          {stats.map((item, index) => (
            <motion.div
              key={item.id}

              initial={{
                opacity: 0,
                y: 70,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{ once: true }}

              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}

              whileHover={{
                y: -10,
              }}

              className="
              relative
              group
              "
            >
              {/* GLOW */}
              <div
                className={`
                absolute
                inset-0
                bg-gradient-to-br
                ${item.gradient}
                opacity-0
                group-hover:opacity-10
                blur-2xl
                transition-all
                duration-500
                `}
              />

              {/* CARD */}
              <div
                className="
                relative
                h-full
                bg-white
                backdrop-blur-xl
                p-8
                lg:p-9
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                hover:shadow-[0_25px_80px_rgba(0,0,0,0.12)]
                transition-all
                duration-500
                overflow-hidden
                "
              >
                {/* TOP LINE */}
                <motion.div
                  initial={{
                    width: 0,
                  }}

                  whileInView={{
                    width: "100%",
                  }}

                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                  }}

                  className={`
                  absolute
                  top-0
                  left-0
                  h-1
                  bg-gradient-to-r
                  ${item.gradient}
                  `}
                />

                {/* FLOATING ORB */}
                <div
                  className={`
                  absolute
                  -top-14
                  -right-14
                  w-40
                  h-40
                  rounded-full
                  bg-gradient-to-br
                  ${item.gradient}
                  opacity-[0.06]
                  blur-3xl
                  `}
                />

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
                  w-16
                  h-16
                  flex
                  items-center
                  justify-center
                  text-3xl
                  text-white
                  bg-gradient-to-br
                  ${item.gradient}
                  shadow-lg
                  mb-8
                  `}
                >
                  {item.icon}
                </motion.div>

                {/* VALUE */}
                <motion.h3
                  whileHover={{
                    scale: 1.03,
                  }}

                  className="
                  text-4xl
                  sm:text-5xl
                  font-black
                  tracking-tight
                  text-black
                  "
                >
                  {item.value}
                </motion.h3>

                {/* TITLE */}
                <p
                  className="
                  mt-4
                  text-gray-600
                  text-base
                  sm:text-lg
                  leading-relaxed
                  "
                >
                  {item.title}
                </p>

                {/* BOTTOM BAR */}
                <motion.div
                  whileHover={{
                    width: "140px",
                  }}

                  transition={{
                    duration: 0.4,
                  }}

                  className={`
                  mt-8
                  h-[4px]
                  w-20
                  bg-gradient-to-r
                  ${item.gradient}
                  `}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;