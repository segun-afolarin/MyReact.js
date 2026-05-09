import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiMapPin,
  FiArrowRight,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

const reports = [
  {
    id: 1,
    title: "Dangerous Road Damage in Kano",
    description:
      "Multiple deep potholes causing severe traffic disruption and vehicle damage.",
    location: "Kano State",
    category: "Bad Roads",
    severity: "Critical",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  },

  {
    id: 2,
    title: "Flooding After Heavy Rain",
    description:
      "Communities affected by blocked drainage systems after heavy rainfall.",
    location: "Lagos",
    category: "Flooding",
    severity: "Dangerous",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
  },

  {
    id: 3,
    title: "Broken Streetlights at Night",
    description:
      "Dark roads increasing insecurity and accidents during nighttime.",
    location: "Abuja",
    category: "Streetlights",
    severity: "Medium",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600&auto=format&fit=crop",
  },
];

const CommunityReportsSection = () => {
  const [activeReport, setActiveReport] =
    useState(reports[0]);

  return (
    <section
      className="
      relative
      py-24
      overflow-hidden
      bg-[#F7F8F7]
      "
    >

      {/* GRID */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
        [background-size:70px_70px]
        "
      />

      {/* GLOW */}
      <div
        className="
        absolute
        top-[-200px]
        left-1/2
        -translate-x-1/2
        w-[600px]
        h-[600px]
        bg-green-200/40
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
        px-6
        lg:px-12
        "
      >

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
          max-w-4xl
          mb-16
          "
        >

          <div
            className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            bg-white
            border
            border-black/5
            text-sm
            font-semibold
            text-green-700
            shadow-sm
            mb-6
            "
          >

            <FiActivity />

            Live Civic Reports

          </div>

          <h2
            className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            leading-[0.95]
            tracking-tight
            text-black
            "
          >
            Real Infrastructure
            Problems Across Nigeria
          </h2>

          <p
            className="
            mt-6
            text-lg
            text-gray-600
            leading-relaxed
            max-w-3xl
            "
          >
            AI-powered civic transparency helping
            citizens report and track infrastructure
            issues in real time.
          </p>

        </motion.div>

        {/* CARDS */}
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-7
          "
        >

          {reports.map((report) => {

            const isActive =
              activeReport.id === report.id;

            return (
              <motion.div
                key={report.id}

                onClick={() =>
                  setActiveReport(report)
                }

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
                  duration: 0.5,
                }}

                whileHover={{
                  y: -10,
                }}

                className={`
                relative
                overflow-hidden
                rounded-[36px]
                min-h-[500px]
                cursor-pointer
                group
                shadow-[0_25px_80px_rgba(0,0,0,0.10)]
                transition-all
                duration-500
                ${
                  isActive
                    ? "scale-[1.02]"
                    : ""
                }
                `}
              >

                {/* IMAGE */}
                <img
                  src={report.image}
                  alt={report.title}
                  className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  scale-105
                  group-hover:scale-110
                  transition-transform
                  duration-[4000ms]
                  ease-out
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/50
                  to-black/10
                  "
                />

                {/* DARK LAYER */}
                <div
                  className="
                  absolute
                  inset-0
                  bg-black/20
                  "
                />

                {/* TOP */}
                <div
                  className="
                  absolute
                  top-5
                  left-5
                  right-5
                  z-20
                  flex
                  items-center
                  justify-between
                  "
                >

                  {/* SEVERITY */}
                  <div
                    className="
                    px-4
                    py-2
                    rounded-full
                    bg-red-500/90
                    backdrop-blur-xl
                    text-white
                    text-xs
                    font-semibold
                    shadow-lg
                    "
                  >
                    {report.severity}
                  </div>

                  {/* LIVE */}
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-full
                    bg-white/10
                    border
                    border-white/10
                    backdrop-blur-xl
                    text-white
                    text-xs
                    "
                  >

                    <div
                      className="
                      w-2
                      h-2
                      rounded-full
                      bg-green-400
                      animate-pulse
                      "
                    />

                    LIVE

                  </div>

                </div>

                {/* CONTENT */}
                <div
                  className="
                  absolute
                  bottom-0
                  left-0
                  w-full
                  p-7
                  z-20
                  "
                >

                  {/* CATEGORY */}
                  <div
                    className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-green-600/90
                    text-white
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    backdrop-blur-xl
                    mb-5
                    "
                  >

                    <FiTrendingUp />

                    {report.category}

                  </div>

                  {/* TITLE */}
                  <AnimatePresence mode="wait">

                    <motion.h3
                      key={report.title}

                      initial={{
                        opacity: 0,
                        y: 20,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: -20,
                      }}

                      transition={{
                        duration: 0.35,
                      }}

                      className="
                      text-3xl
                      font-black
                      leading-[1]
                      tracking-tight
                      text-white
                      drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                      "
                    >
                      {report.title}
                    </motion.h3>

                  </AnimatePresence>

                  {/* DESCRIPTION */}
                  <p
                    className="
                    mt-5
                    text-gray-200
                    leading-relaxed
                    "
                  >
                    {report.description}
                  </p>

                  {/* FOOTER */}
                  <div
                    className="
                    mt-7
                    flex
                    items-center
                    justify-between
                    "
                  >

                    {/* LOCATION */}
                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-white
                      "
                    >

                      <FiMapPin />

                      {report.location}

                    </div>

                    {/* BUTTON */}
                    <motion.button
                      whileHover={{
                        x: 4,
                      }}

                      className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-green-300
                      "
                    >

                      Open

                      <FiArrowRight />

                    </motion.button>

                  </div>

                </div>

                {/* ACTIVE BORDER */}
                {isActive && (
                  <motion.div
                    layoutId="activeBorder"

                    className="
                    absolute
                    inset-0
                    border-2
                    border-green-400/60
                    rounded-[36px]
                    pointer-events-none
                    "
                  />
                )}

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default CommunityReportsSection;