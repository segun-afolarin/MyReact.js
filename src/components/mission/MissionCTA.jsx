import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiMapPin,
  FiUsers,
  FiArrowUpRight,
} from "react-icons/fi";

const MissionCTA = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        px-6
        lg:px-12
        py-32
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

      {/* BIG GLOW */}
      <div
        className="
          absolute
          top-[-250px]
          left-1/2
          -translate-x-1/2
          w-[800px]
          h-[800px]
          bg-green-400/10
          rounded-full
          blur-3xl
        "
      />

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
          duration: 0.7,
        }}

        viewport={{
          once: true,
        }}

        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          overflow-hidden
          border
          border-black/10
          bg-white
          shadow-[0_30px_100px_rgba(34,197,94,0.08)]
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

          className="
            absolute
            top-0
            left-0
            h-[4px]
            bg-gradient-to-r
            from-green-500
            via-emerald-500
            to-green-400
          "
        />

        {/* FLOATING GLOW */}
        <div
          className="
            absolute
            -top-32
            -right-32
            w-80
            h-80
            bg-green-500/10
            rounded-full
            blur-3xl
          "
        />

        {/* FLOATING CIRCLE */}
        <div
          className="
            absolute
            bottom-[-100px]
            left-[-100px]
            w-72
            h-72
            border
            border-green-100
            rounded-full
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-16
            items-center
            p-8
            md:p-14
            lg:p-20
          "
        >

          {/* LEFT */}
          <div>

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
                mb-8
              "
            >
              Join The Mission
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
                max-w-3xl
              "
            >
              Build The Future
              Of Civic Technology
              In Nigeria
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-8
                text-lg
                md:text-xl
                text-gray-600
                leading-relaxed
                max-w-2xl
              "
            >
              NationAura empowers citizens
              to report infrastructure issues,
              track government response,
              and create real accountability
              through technology.
            </p>

            {/* FEATURE CARDS */}
            <div
              className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
              "
            >

              {/* CARD 1 */}
              <motion.div
                whileHover={{
                  y: -6,
                }}

                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-black/10
                  bg-[#fafafa]
                  p-6
                  transition-all
                  duration-500
                  hover:border-green-500/20
                  hover:shadow-[0_20px_60px_rgba(34,197,94,0.08)]
                "
              >

                {/* GLOW */}
                <div
                  className="
                    absolute
                    -top-10
                    -right-10
                    w-32
                    h-32
                    bg-green-500/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                  "
                />

                <div className="relative z-10">

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
                      shadow-[0_20px_40px_rgba(34,197,94,0.25)]
                      mb-5
                    "
                  >
                    <FiMapPin />
                  </div>

                  <h3
                    className="
                      text-xl
                      font-black
                      tracking-tight
                      text-black
                      mb-3
                    "
                  >
                    Report Issues
                  </h3>

                  <p
                    className="
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Submit infrastructure
                    reports instantly with
                    smart location tracking.
                  </p>

                </div>

              </motion.div>

              {/* CARD 2 */}
              <motion.div
                whileHover={{
                  y: -6,
                }}

                className="
                  group
                  relative
                  overflow-hidden
                  border
                  border-black/10
                  bg-[#fafafa]
                  p-6
                  transition-all
                  duration-500
                  hover:border-green-500/20
                  hover:shadow-[0_20px_60px_rgba(34,197,94,0.08)]
                "
              >

                {/* GLOW */}
                <div
                  className="
                    absolute
                    -top-10
                    -right-10
                    w-32
                    h-32
                    bg-green-500/10
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-500
                  "
                />

                <div className="relative z-10">

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
                      shadow-[0_20px_40px_rgba(34,197,94,0.25)]
                      mb-5
                    "
                  >
                    <FiUsers />
                  </div>

                  <h3
                    className="
                      text-xl
                      font-black
                      tracking-tight
                      text-black
                      mb-3
                    "
                  >
                    Empower Communities
                  </h3>

                  <p
                    className="
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Help citizens collaborate
                    and drive visible change
                    across communities.
                  </p>

                </div>

              </motion.div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              relative
              flex
              flex-col
              gap-5
            "
          >

            {/* MAIN ACTION CARD */}
            <motion.div
              whileHover={{
                y: -8,
              }}

              className="
                group
                relative
                overflow-hidden
                border
                border-black/10
                bg-black
                p-8
                md:p-10
                text-white
              "
            >

              {/* GREEN GLOW */}
              <div
                className="
                  absolute
                  top-0
                  right-0
                  w-60
                  h-60
                  bg-green-500/20
                  rounded-full
                  blur-3xl
                "
              />

              <div className="relative z-10">

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-10
                  "
                >

                  <div
                    className="
                      text-sm
                      uppercase
                      tracking-[0.2em]
                      text-green-300
                      font-semibold
                    "
                  >
                    NationAura
                  </div>

                  <div
                    className="
                      text-2xl
                      text-white/40
                      group-hover:text-green-400
                      transition-all
                    "
                  >
                    <FiArrowUpRight />
                  </div>

                </div>

                <h3
                  className="
                    text-3xl
                    md:text-4xl
                    font-black
                    leading-tight
                    tracking-tight
                  "
                >
                  Every Report
                  Creates Impact.
                </h3>

                <p
                  className="
                    mt-6
                    text-gray-300
                    text-lg
                    leading-relaxed
                  "
                >
                  Join thousands of citizens
                  using technology to improve
                  infrastructure transparency
                  across Nigeria.
                </p>

                {/* BUTTONS */}
                <div
                  className="
                    mt-10
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                  "
                >

                  <Link to="/report">

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}

                      whileTap={{
                        scale: 0.98,
                      }}

                      className="
                        flex
                        items-center
                        justify-center
                        gap-3
                        bg-green-500
                        hover:bg-green-600
                        text-white
                        px-8
                        py-4
                        font-semibold
                        transition-all
                        duration-300
                        w-full
                        sm:w-auto
                      "
                    >

                      Report An Issue

                      <FiArrowRight />

                    </motion.button>

                  </Link>

                  <Link to="/about">

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}

                      whileTap={{
                        scale: 0.98,
                      }}

                      className="
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-xl
                        text-white
                        px-8
                        py-4
                        font-semibold
                        hover:bg-white/10
                        transition-all
                        duration-300
                        w-full
                        sm:w-auto
                      "
                    >
                      Learn More
                    </motion.button>

                  </Link>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default MissionCTA;