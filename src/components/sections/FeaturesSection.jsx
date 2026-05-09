import { motion } from "framer-motion";

import {
  FiCpu,
  FiMap,
  FiShield,
  FiBell,
  FiUpload,
  FiUsers,
} from "react-icons/fi";

const features = [
  {
    title: "AI Damage Detection",
    description:
      "Automatically detect potholes, road cracks, and dangerous infrastructure using AI analysis.",
    icon: <FiCpu />,
    gradient: "from-green-500 to-emerald-600",
  },

  {
    title: "Interactive Live Map",
    description:
      "Track real-time infrastructure reports and monitor affected areas across Nigeria.",
    icon: <FiMap />,
    gradient: "from-emerald-500 to-green-700",
  },

  {
    title: "Government Dashboard",
    description:
      "Advanced analytics, repair tracking, and infrastructure management tools for agencies.",
    icon: <FiShield />,
    gradient: "from-green-400 to-green-600",
  },

  {
    title: "Emergency Alerts",
    description:
      "Receive flood warnings, dangerous road alerts, and emergency infrastructure updates.",
    icon: <FiBell />,
    gradient: "from-green-600 to-emerald-800",
  },

  {
    title: "Media Upload System",
    description:
      "Upload photos and videos with GPS-based issue reporting and verification.",
    icon: <FiUpload />,
    gradient: "from-emerald-400 to-green-600",
  },

  {
    title: "Community Verification",
    description:
      "Citizens can verify reports, upvote issues, and improve reporting transparency.",
    icon: <FiUsers />,
    gradient: "from-green-500 to-green-800",
  },
];

const FeaturesSection = () => {
  return (
    <section
      className="
      relative
      py-20
      sm:py-24
      lg:py-28
      overflow-hidden
      bg-gradient-to-b
      from-white
      via-[#FCFCFC]
      to-[#F3F7F4]
      "
    >
      {/* BACKGROUND EFFECT */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        [background-image:radial-gradient(#000_1px,transparent_1px)]
        [background-size:32px_32px]
        "
      />

      {/* LIGHT GLOW */}
      <div
        className="
        absolute
        top-[-200px]
        right-[-100px]
        w-[600px]
        h-[600px]
        bg-green-100
        rounded-full
        blur-3xl
        opacity-20
        "
      />

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
          px-4
          sm:px-6
          lg:px-12
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
            gap-2
            bg-black
            text-white
            px-5
            py-3
            text-sm
            font-semibold
            tracking-wide
            uppercase
            mb-6
            "
          >
            Powerful Civic Technology
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
            max-w-5xl
            mx-auto
            "
          >
            Infrastructure Reporting
            <span className="text-green-700">
              {" "}
              Reimagined With AI
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
            NationAura combines artificial
            intelligence, real-time civic
            reporting, emergency alerts,
            analytics, and community
            verification into one modern
            national infrastructure platform.
          </p>
        </motion.div>

        {/* MOBILE SLIDER */}
        <div
          className="
          flex
          lg:hidden
          gap-5
          overflow-x-auto
          px-4
          sm:px-6
          scrollbar-hide
          snap-x
          snap-mandatory
          pb-4
          "
        >
          {features.map((feature, index) => (
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

              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}

              whileHover={{
                y: -8,
              }}

              className="
              min-w-[320px]
              snap-center
              relative
              "
            >
              <div
                className="
                relative
                h-full
                bg-white
                p-8
                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                hover:shadow-[0_25px_80px_rgba(0,0,0,0.12)]
                transition-all
                duration-500
                overflow-hidden
                "
              >
                {/* TOP BAR */}
                <div
                  className={`
                  absolute
                  top-0
                  left-0
                  w-full
                  h-1
                  bg-gradient-to-r
                  ${feature.gradient}
                  `}
                />

                {/* FLOATING GLOW */}
                <div
                  className={`
                  absolute
                  -top-12
                  -right-12
                  w-36
                  h-36
                  rounded-full
                  bg-gradient-to-br
                  ${feature.gradient}
                  opacity-[0.08]
                  blur-3xl
                  `}
                />

                {/* ICON */}
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.08,
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
                  ${feature.gradient}
                  shadow-lg
                  mb-8
                  `}
                >
                  {feature.icon}
                </motion.div>

                {/* TITLE */}
                <h3
                  className="
                  text-2xl
                  font-bold
                  text-black
                  leading-tight
                  "
                >
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                  mt-4
                  text-gray-600
                  leading-relaxed
                  "
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div
          className="
          hidden
          lg:grid
          grid-cols-3
          gap-7
          px-6
          lg:px-12
          "
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}

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
                delay: index * 0.1,
              }}

              whileHover={{
                y: -12,
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
                ${feature.gradient}
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
                p-9
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
                    delay: index * 0.15,
                  }}

                  className={`
                  absolute
                  top-0
                  left-0
                  h-1
                  bg-gradient-to-r
                  ${feature.gradient}
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
                  ${feature.gradient}
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
                  ${feature.gradient}
                  shadow-lg
                  mb-8
                  `}
                >
                  {feature.icon}
                </motion.div>

                {/* TITLE */}
                <h3
                  className="
                  text-2xl
                  font-bold
                  text-black
                  leading-tight
                  "
                >
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                  mt-5
                  text-gray-600
                  leading-relaxed
                  text-[16px]
                  "
                >
                  {feature.description}
                </p>

                {/* BOTTOM ACCENT */}
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
                  ${feature.gradient}
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

export default FeaturesSection;