import { motion } from "framer-motion";

import {
  FileText,
  MapPinned,
  SearchCheck,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    icon: FileText,

    step: "01",

    title: "Submit Infrastructure Reports",

    description:
      "Citizens report damaged roads, flooding, electricity failures, and other public infrastructure challenges directly through NationAura.",

    gradient: "from-green-500 to-emerald-600",
  },

  {
    icon: MapPinned,

    step: "02",

    title: "Attach Accurate Locations",

    description:
      "Every report includes location intelligence and detailed information to help authorities and communities identify affected areas instantly.",

    gradient: "from-emerald-500 to-green-700",
  },

  {
    icon: SearchCheck,

    step: "03",

    title: "Monitor Real-Time Progress",

    description:
      "Users can track verification stages, authority responses, public engagement, and infrastructure progress transparently in real time.",

    gradient: "from-green-400 to-emerald-500",
  },

  {
    icon: CheckCircle2,

    step: "04",

    title: "Resolution & Accountability",

    description:
      "Resolved reports remain publicly visible to promote accountability, transparency, and measurable civic impact across Nigeria.",

    gradient: "from-green-600 to-emerald-700",
  },
];

const DocumentationSteps = () => {
  return (
    <section
      className="
      relative
      overflow-hidden
      bg-[#F8FAF8]
      py-24
      lg:py-32
      "
    >
      {/* GRID BACKGROUND */}
                      <div
  className="
    absolute
    inset-0
    opacity-[0.05]
    bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
    bg-[size:60px_60px]
    blur-[0.3px]
  "
/>

      {/* BACKGROUND GLOW */}
      <div
        className="
        absolute
        top-[-200px]
        right-[-100px]
        w-[500px]
        h-[500px]
        bg-green-100
        rounded-full
        blur-3xl
        opacity-40
        "
      />

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        lg:px-12
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
            duration: 0.7,
          }}
          viewport={{ once: true }}
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
            px-5
            py-2
            text-green-700
            text-sm
            font-semibold
            uppercase
            tracking-[0.18em]
            mb-8
            "
          >
            How NationAura Works
          </div>

          {/* TITLE */}
          <h2
            className="
            text-4xl
            md:text-6xl
            lg:text-7xl
            font-black
            tracking-tight
            leading-[1]
            text-black
            "
          >
            A Transparent Process
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
              National Impact
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
            mt-8
            text-lg
            md:text-xl
            leading-relaxed
            text-gray-600
            max-w-3xl
            "
          >
            NationAura simplifies infrastructure reporting
            into a modern civic workflow where citizens,
            communities, and institutions collaborate
            transparently to create measurable change.
          </p>
        </motion.div>

        {/* STEPS GRID */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
          "
        >
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
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
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
                className="group"
              >
                <div
                  className="
                  relative
                  h-full
                  overflow-hidden
                  bg-white
                  border
                  border-black/5
                  p-10
                  transition-all
                  duration-500
                  hover:border-green-500/20
                  hover:shadow-[0_25px_80px_rgba(34,197,94,0.12)]
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
                    className={`
                    absolute
                    top-0
                    left-0
                    h-[3px]
                    bg-gradient-to-r
                    ${item.gradient}
                    `}
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
                    rounded-full
                    blur-3xl
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-700
                    "
                  />

                  {/* BIG STEP NUMBER */}
                  <div
                    className="
                    absolute
                    top-8
                    right-8
                    text-6xl
                    font-black
                    text-black/[0.04]
                    select-none
                    "
                  >
                    {item.step}
                  </div>

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
                        className={`
                        w-16
                        h-16
                        bg-gradient-to-br
                        ${item.gradient}
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-2xl
                        `}
                      >
                        <Icon size={30} />
                      </div>

                      {/* ARROW */}
                      <motion.div
                        whileHover={{
                          rotate: 45,
                        }}
                        className="
                        text-gray-300
                        group-hover:text-green-600
                        transition-all
                        duration-300
                        "
                      >
                        <ArrowUpRight size={24} />
                      </motion.div>
                    </div>

                    {/* TITLE */}
                    <h3
                      className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-black
                      leading-tight
                      mb-6
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DocumentationSteps;