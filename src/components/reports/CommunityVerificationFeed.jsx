import { motion } from "framer-motion";

import {
  FiUsers,
  FiCheckCircle,
  FiShield,
  FiUpload,
  FiMapPin,
  FiTrendingUp,
  FiCamera,
  FiClock,
  FiActivity,
  FiArrowUpRight,
  FiZap,
  FiRadio,
  FiLayers,
  FiStar,
} from "react-icons/fi";

const activities = [
  {
    user: "Amina Yusuf",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    location: "Gwarinpa, Abuja",
    action:
      "confirmed severe drainage blockage affecting nearby roads.",
    evidence: "Uploaded live evidence photos",
    trust: "98%",
    status: "Issue Verified",
    time: "4 mins ago",
  },

  {
    user: "David Okeke",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    location: "Wuse 2, Abuja",
    action:
      "verified recurring flooding after heavy rainfall.",
    evidence: "Submitted video evidence",
    trust: "94%",
    status: "Flooding Confirmed",
    time: "12 mins ago",
  },

  {
    user: "Zainab Ibrahim",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop",
    location: "Maitama, Abuja",
    action:
      "confirmed dangerous potholes damaging vehicles daily.",
    evidence: "Uploaded geolocation evidence",
    trust: "96%",
    status: "Road Damage Verified",
    time: "26 mins ago",
  },

  {
    user: "Michael Adeyemi",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
    location: "Utako, Abuja",
    action:
      "validated broken streetlights creating security risks.",
    evidence: "Uploaded nighttime photos",
    trust: "92%",
    status: "Security Risk Verified",
    time: "42 mins ago",
  },
];

const metrics = [
  {
    title: "Nearby Confirmations",
    value: "284+",
    icon: <FiUsers />,
  },

  {
    title: "Evidence Uploads",
    value: "1.2K",
    icon: <FiUpload />,
  },

  {
    title: "Average Trust Score",
    value: "95%",
    icon: <FiShield />,
  },

  {
    title: "Verified Cases",
    value: "742",
    icon: <FiCheckCircle />,
  },
];

const CommunityVerificationFeed = () => {
  return (
    <section className="relative overflow-hidden bg-[#FCFFFD] py-24">
      {/* BG GLOWS */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-green-300/10 blur-3xl rounded-full" />

      {/* GRID */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
        bg-[size:45px_45px]
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HERO */}
        <div
          className="
          relative
          overflow-hidden
          border
          border-green-100
          bg-white
          p-8
          lg:p-12
          shadow-[0_25px_80px_rgba(34,197,94,0.08)]
          "
        >
          {/* TOP LINE */}
          <div
            className="
            absolute
            top-0
            left-0
            h-[3px]
            w-full
            bg-gradient-to-r
            from-green-400
            via-green-500
            to-transparent
            "
          />

          <div
            className="
            grid
            lg:grid-cols-[1.3fr_0.7fr]
            gap-12
            items-center
            "
          >
            {/* LEFT */}
            <div>
              <div
                className="
                inline-flex
                items-center
                gap-3
                px-5
                py-3
                border
                border-green-100
                bg-green-50
                text-green-700
                mb-6
                "
              >
                <FiRadio />

                <span
                  className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  "
                >
                  Live Community Verification
                </span>
              </div>

              <h2
                className="
                text-5xl
                sm:text-6xl
                lg:text-7xl
                font-black
                leading-[0.9]
                tracking-[-0.06em]
                text-[#0B1117]
                "
              >
                Citizens
                <span className="block text-green-500">
                  Creating Change
                </span>
              </h2>

              <p
                className="
                mt-7
                max-w-3xl
                text-base
                sm:text-lg
                leading-8
                text-black/65
                "
              >
                Nigerians are actively reporting,
                verifying, and strengthening civic
                accountability with real-time
                evidence, trusted confirmations,
                and transparent community action.
              </p>

              {/* MINI STATS */}
              <div
                className="
                mt-10
                flex
                flex-wrap
                gap-4
                "
              >
                {[
                  {
                    icon: <FiTrendingUp />,
                    label: "AI Verified Reports",
                  },

                  {
                    icon: <FiShield />,
                    label: "Trusted Community",
                  },

                  {
                    icon: <FiLayers />,
                    label: "Real-Time Evidence",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                    flex
                    items-center
                    gap-3
                    border
                    border-green-100
                    bg-white
                    px-5
                    py-4
                    "
                  >
                    <div
                      className="
                      w-11
                      h-11
                      bg-green-500
                      text-white
                      flex
                      items-center
                      justify-center
                      "
                    >
                      {item.icon}
                    </div>

                    <span
                      className="
                      text-sm
                      font-black
                      uppercase
                      tracking-[0.12em]
                      text-[#0B1117]
                      "
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="
              relative
              border
              border-green-100
              bg-[#F8FFF9]
              p-8
              shadow-[0_20px_60px_rgba(34,197,94,0.08)]
              "
            >
              {/* GLOW */}
              <div
                className="
                absolute
                top-0
                right-0
                w-[180px]
                h-[180px]
                bg-green-300/20
                blur-3xl
                "
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-green-700
                      font-black
                      "
                    >
                      Live Feed Status
                    </p>

                    <h3
                      className="
                      mt-3
                      text-5xl
                      font-black
                      text-[#0B1117]
                      "
                    >
                      ACTIVE
                    </h3>
                  </div>

                  <div
                    className="
                    relative
                    w-20
                    h-20
                    bg-green-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-3xl
                    "
                  >
                    <div
                      className="
                      absolute
                      inset-0
                      bg-green-400
                      animate-ping
                      opacity-20
                      "
                    />

                    <FiActivity className="relative z-10" />
                  </div>
                </div>

                <div className="mt-10 space-y-5">
                  {[
                    "Citizens confirming reports",
                    "AI validating evidence uploads",
                    "Authorities receiving updates",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="
                      flex
                      items-center
                      gap-4
                      border
                      border-green-100
                      bg-white
                      px-5
                      py-4
                      "
                    >
                      <div
                        className="
                        w-10
                        h-10
                        bg-green-500
                        text-white
                        flex
                        items-center
                        justify-center
                        "
                      >
                        <FiCheckCircle />
                      </div>

                      <span
                        className="
                        text-sm
                        font-semibold
                        text-black/70
                        "
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* METRICS */}
        <div
          className="
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-5
          mt-10
          "
        >
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
              }}
              className="
              relative
              overflow-hidden
              border
              border-green-100
              bg-white
              p-6
              shadow-[0_15px_50px_rgba(34,197,94,0.08)]
              "
            >
              <div
                className="
                absolute
                top-0
                right-0
                w-[140px]
                h-[140px]
                bg-green-100/50
                blur-3xl
                "
              />

              <div className="relative z-10">
                <div
                  className="
                  w-14
                  h-14
                  bg-green-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-xl
                  mb-6
                  "
                >
                  {item.icon}
                </div>

                <h3
                  className="
                  text-4xl
                  font-black
                  text-[#0B1117]
                  "
                >
                  {item.value}
                </h3>

                <p
                  className="
                  mt-2
                  text-sm
                  text-black/55
                  "
                >
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HISTORY FEED */}
        <div className="mt-12 space-y-8">
          {activities.map((item, index) => (
            <motion.div
              key={index}
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
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
              }}
              className="
              relative
              overflow-hidden
              border
              border-green-100
              bg-white
              shadow-[0_25px_70px_rgba(34,197,94,0.08)]
              "
            >
              {/* SIDE LINE */}
              <div
                className="
                absolute
                left-0
                top-0
                bottom-0
                w-[5px]
                bg-gradient-to-b
                from-green-300
                via-green-500
                to-green-600
                "
              />

              {/* BG GLOW */}
              <div
                className="
                absolute
                top-0
                right-0
                w-[220px]
                h-[220px]
                bg-green-100/50
                blur-3xl
                "
              />

              <div
                className="
                relative
                z-10
                p-6
                lg:p-8
                "
              >
                {/* TOP */}
                <div
                  className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-6
                  "
                >
                  {/* USER */}
                  <div
                    className="
                    flex
                    items-start
                    gap-5
                    "
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.user}
                        className="
                        w-[90px]
                        h-[90px]
                        object-cover
                        border-4
                        border-white
                        shadow-xl
                        "
                      />

                      <div
                        className="
                        absolute
                        -bottom-2
                        -right-2
                        w-9
                        h-9
                        bg-green-500
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-lg
                        "
                      >
                        <FiCheckCircle />
                      </div>
                    </div>

                    <div>
                      <div
                        className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        "
                      >
                        <h3
                          className="
                          text-3xl
                          font-black
                          text-[#0B1117]
                          "
                        >
                          {item.user}
                        </h3>

                        <div
                          className="
                          px-4
                          py-2
                          bg-green-50
                          border
                          border-green-100
                          text-green-700
                          "
                        >
                          <span
                            className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            "
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div
                        className="
                        mt-4
                        flex
                        flex-wrap
                        items-center
                        gap-5
                        "
                      >
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-green-500" />

                          <span className="text-sm text-black/55">
                            {item.location}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FiClock className="text-green-500" />

                          <span className="text-sm text-black/55">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TRUST */}
                  <div
                    className="
                    flex
                    items-center
                    gap-4
                    border
                    border-green-100
                    bg-[#F8FFF9]
                    px-6
                    py-5
                    "
                  >
                    <div
                      className="
                      w-14
                      h-14
                      bg-green-500
                      text-white
                      flex
                      items-center
                      justify-center
                      text-2xl
                      "
                    >
                      <FiShield />
                    </div>

                    <div>
                      <h4
                        className="
                        text-3xl
                        font-black
                        text-[#0B1117]
                        "
                      >
                        {item.trust}
                      </h4>

                      <p
                        className="
                        text-xs
                        uppercase
                        tracking-[0.16em]
                        text-black/45
                        "
                      >
                        Trust Score
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className="
                  mt-8
                  grid
                  lg:grid-cols-[1fr_320px]
                  gap-6
                  "
                >
                  {/* LEFT */}
                  <div
                    className="
                    border
                    border-green-100
                    bg-[#FCFFFD]
                    p-6
                    "
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="
                        w-12
                        h-12
                        bg-green-500
                        text-white
                        flex
                        items-center
                        justify-center
                        "
                      >
                        <FiUsers />
                      </div>

                      <div>
                        <h4
                          className="
                          text-xl
                          font-black
                          text-[#0B1117]
                          "
                        >
                          Community Activity
                        </h4>

                        <p className="text-sm text-black/50">
                          Verified civic update
                        </p>
                      </div>
                    </div>

                    <p
                      className="
                      text-base
                      sm:text-lg
                      leading-8
                      text-black/70
                      "
                    >
                      <span className="font-black text-black">
                        {item.user}
                      </span>{" "}
                      {item.action}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div
                    className="
                    border
                    border-green-100
                    bg-white
                    p-6
                    "
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="
                        w-12
                        h-12
                        bg-green-500
                        text-white
                        flex
                        items-center
                        justify-center
                        "
                      >
                        <FiCamera />
                      </div>

                      <div>
                        <h4
                          className="
                          text-lg
                          font-black
                          text-[#0B1117]
                          "
                        >
                          Evidence Uploaded
                        </h4>

                        <p className="text-sm text-black/50">
                          Community proof attached
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                      border
                      border-green-100
                      bg-[#F8FFF9]
                      p-5
                      "
                    >
                      <p
                        className="
                        text-sm
                        leading-7
                        text-black/70
                        "
                      >
                        {item.evidence}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="
                      mt-5
                      w-full
                      h-14
                      bg-green-500
                      text-white
                      font-black
                      uppercase
                      tracking-[0.15em]
                      flex
                      items-center
                      justify-center
                      gap-3
                      hover:bg-green-600
                      transition-all
                      duration-300
                      "
                    >
                      View Verification

                      <FiArrowUpRight className="text-lg" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FINAL CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
          relative
          overflow-hidden
          mt-12
          border
          border-green-100
          bg-white
          p-8
          lg:p-10
          shadow-[0_25px_80px_rgba(34,197,94,0.08)]
          "
        >
          {/* TOP LINE */}
          <div
            className="
            absolute
            top-0
            left-0
            h-[3px]
            w-full
            bg-gradient-to-r
            from-green-400
            via-green-500
            to-transparent
            "
          />

          <div
            className="
            flex
            flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between
            gap-10
            "
          >
            {/* LEFT */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="
                  w-16
                  h-16
                  bg-green-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  "
                >
                  <FiZap />
                </div>

                <div>
                  <h3
                    className="
                    text-4xl
                    font-black
                    text-[#0B1117]
                    "
                  >
                    Nigeria Is Rising
                  </h3>

                  <p className="text-sm text-black/55">
                    Powered by citizens
                  </p>
                </div>
              </div>

              <p
                className="
                text-base
                sm:text-lg
                leading-8
                text-black/65
                "
              >
                Every confirmation, upload,
                and trusted report pushes
                communities closer to safer
                roads, cleaner environments,
                and accountable governance.
              </p>
            </div>

            {/* RIGHT */}
            <div
              className="
              flex
              items-center
              gap-5
              "
            >
              <div
                className="
                w-28
                h-28
                bg-green-500
                text-white
                flex
                items-center
                justify-center
                text-5xl
                font-black
                shadow-[0_0_60px_rgba(34,197,94,0.3)]
                "
              >
                95
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <FiStar className="text-green-500" />

                  <span
                    className="
                    text-sm
                    uppercase
                    tracking-[0.16em]
                    font-black
                    text-green-700
                    "
                  >
                    Community Trust
                  </span>
                </div>

                <h4
                  className="
                  mt-2
                  text-5xl
                  font-black
                  text-[#0B1117]
                  "
                >
                  STRONG
                </h4>

                <p className="text-sm text-black/55 mt-2">
                  Citizens driving real
                  accountability nationwide
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityVerificationFeed;