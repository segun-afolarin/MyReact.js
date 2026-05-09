import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiMapPin,
  FiArrowUpRight,
  FiMessageSquare,
} from "react-icons/fi";

const voices = [
  {
    name: "Amina Yusuf",

    location: "Kaduna State",

    feedback:
      "NationAura helped our community report a damaged road that had been ignored for months. Within weeks, the issue received attention.",

    role: "Community Member",
  },

  {
    name: "David Okeke",

    location: "Lagos State",

    feedback:
      "The tracking system made everything transparent. We could finally monitor infrastructure reports in real time.",

    role: "Local Volunteer",
  },

  {
    name: "Grace Emmanuel",

    location: "Plateau State",

    feedback:
      "Uploading reports with images and location made it easier for authorities to understand the problem quickly.",

    role: "Citizen Reporter",
  },

  {
    name: "Ibrahim Musa",

    location: "Abuja",

    feedback:
      "NationAura gives citizens a stronger voice and creates accountability between communities and organizations.",

    role: "Community Advocate",
  },

  {
    name: "Esther John",

    location: "Kano State",

    feedback:
      "The platform feels modern, transparent, and easy to use even on mobile devices.",

    role: "Youth Leader",
  },

  {
    name: "Samuel Ade",

    location: "Oyo State",

    feedback:
      "This platform can transform how communities report and track public infrastructure challenges across Nigeria.",

    role: "NGO Volunteer",
  },
];

const VoicesGrid = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        lg:px-12
        py-28
        bg-white
      "
    >

      {/* RADIAL BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_35%)]
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
          y: [0, -25, 0],
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          top-10
          left-10
          w-[380px]
          h-[380px]
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
              Community Voices
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
              Stories From
              Citizens Across
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
              Real voices from communities using
              NationAura to create accountability,
              transparency, and measurable civic impact
              through citizen-driven reporting.
            </p>

          </div>

          {/* SIDE CARD */}
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
              <FiMessageSquare />
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
                Trusted Voices
              </p>

              <h3
                className="
                  text-2xl
                  font-black
                  text-black
                "
              >
                Growing Daily
              </h3>
            </div>

          </motion.div>

        </motion.div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {voices.map((voice, index) => (
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

                {/* GLOW */}
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

                    {/* VERIFIED */}
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
                        tracking-[0.15em]
                      "
                    >
                      <FiCheckCircle />

                      Verified Voice
                    </div>

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

                  {/* FEEDBACK */}
                  <p
                    className="
                      text-lg
                      md:text-xl
                      text-gray-700
                      leading-relaxed
                    "
                  >
                    “{voice.feedback}”
                  </p>

                  {/* USER */}
                  <div
                    className="
                      mt-10
                      pt-6
                      border-t
                      border-black/10
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      {/* AVATAR */}
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
                          text-xl
                          font-black
                          shadow-[0_20px_40px_rgba(34,197,94,0.25)]
                        "
                      >
                        {voice.name.charAt(0)}
                      </motion.div>

                      {/* INFO */}
                      <div>

                        <h3
                          className="
                            text-lg
                            font-bold
                            text-black
                          "
                        >
                          {voice.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-sm
                            text-gray-500
                          "
                        >
                          {voice.role}
                        </p>

                      </div>

                    </div>

                    {/* LOCATION */}
                    <div
                      className="
                        hidden
                        sm:flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-500
                      "
                    >
                      <FiMapPin />

                      {voice.location}
                    </div>

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

export default VoicesGrid;