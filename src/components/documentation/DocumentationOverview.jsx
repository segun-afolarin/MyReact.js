import { motion } from "framer-motion";

import {
  MapPin,
  BarChart3,
  Users,
  ArrowUpRight,
} from "lucide-react";

const overviewCards = [
  {
    title: "Report Infrastructure Issues",

    icon: <MapPin size={30} />,

    description:
      "Citizens can instantly report damaged roads, flooding, electricity failures, water shortages, and public safety concerns directly from their devices.",

    gradient: "from-green-500 to-emerald-600",

    number: "01",
  },

  {
    title: "Track Progress In Real Time",

    icon: <BarChart3 size={30} />,

    description:
      "Every submission moves through a transparent civic workflow where communities can monitor updates, authority actions, and repair progress live.",

    gradient: "from-emerald-500 to-green-700",

    number: "02",
  },

  {
    title: "Empower Civic Collaboration",

    icon: <Users size={30} />,

    description:
      "NationAura connects citizens, organizations, communities, and institutions to create accountability, transparency, and faster national impact.",

    gradient: "from-green-600 to-emerald-700",

    number: "03",
  },
];

const DocumentationOverview = () => {
  return (
    <section
      className="
      relative
      overflow-hidden
      bg-[#FAFAFA]
      py-24
      lg:py-32
      "
    >
      {/* BACKGROUND GRID */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        bg-[size:70px_70px]
        "
      />

      {/* TOP GLOW */}
      <div
        className="
        absolute
        top-[-250px]
        left-1/2
        -translate-x-1/2
        w-[700px]
        h-[700px]
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
            NationAura Overview
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
            Civic Technology
            <br />

            Reimagined For
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
              Modern Nigeria
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
            NationAura transforms how citizens interact with
            public infrastructure by combining AI-powered
            reporting, transparent civic tracking, and
            community-driven accountability into one modern
            digital ecosystem.
          </p>
        </motion.div>

        {/* GRID */}
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-8
          "
        >
          {overviewCards.map((card, index) => (
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
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
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
                    delay: index * 0.15,
                  }}
                  className={`
                  absolute
                  top-0
                  left-0
                  h-[3px]
                  bg-gradient-to-r
                  ${card.gradient}
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

                {/* NUMBER */}
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
                  {card.number}
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
                      ${card.gradient}
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-2xl
                      `}
                    >
                      {card.icon}
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
                    {card.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className="
                    text-gray-600
                    text-lg
                    leading-relaxed
                    "
                  >
                    {card.description}
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

export default DocumentationOverview;