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

const CommunityVerificationFeed = ({
  darkMode,
}) => {
  return (
    <section className="relative">
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        xl:flex-row
        xl:items-end
        xl:justify-between
        gap-6
        mb-10
        "
      >
        {/* LEFT */}
        <div className="max-w-4xl">
          <div
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            border
            border-green-200
            bg-green-50
            text-green-700
            mb-5
            "
          >
            <FiUsers />

            <span
              className="
              text-sm
              font-bold
              tracking-wide
              "
            >
              COMMUNITY VERIFICATION NETWORK
            </span>
          </div>

          <h2
            className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            leading-tight
            tracking-tight
            text-green-950
            "
          >
            Citizens Are{" "}
            <span
              className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-green-400
              via-green-500
              to-green-600
              "
            >
              Fixing Nigeria
            </span>{" "}
            Together
          </h2>

          <p
            className="
            mt-5
            text-base
            sm:text-lg
            leading-relaxed
            text-green-900/70
            max-w-3xl
            "
          >
            Real Nigerians verifying
            infrastructure problems,
            uploading evidence, and helping
            government agencies respond
            faster through trusted
            community intelligence.
          </p>
        </div>

        {/* LIVE STATUS */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className="
          relative
          overflow-hidden
          border
          border-green-200
          bg-white
          px-6
          py-5
          shadow-[0_20px_60px_rgba(34,197,94,0.15)]
          "
        >
          {/* GLOW */}
          <div
            className="
            absolute
            inset-0
            bg-gradient-to-br
            from-green-100
            to-green-50
            "
          />

          <div
            className="
            relative
            z-10
            flex
            items-center
            gap-4
            "
          >
            {/* ICON */}
            <div
              className="
              relative
              w-16
              h-16
              bg-gradient-to-br
              from-green-400
              to-green-600
              text-white
              flex
              items-center
              justify-center
              text-2xl
              "
            >
              <div
                className="
                absolute
                inset-0
                bg-green-300/40
                animate-ping
                "
              />

              <FiActivity className="relative z-10" />
            </div>

            {/* TEXT */}
            <div>
              <h3
                className="
                text-3xl
                font-black
                text-green-700
                "
              >
                LIVE
              </h3>

              <p
                className="
                text-sm
                text-green-900/60
                "
              >
                Citizens Verifying Issues
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* METRICS */}
      <div
        className="
        grid
        grid-cols-2
        xl:grid-cols-4
        gap-5
        mb-8
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
            p-5
            shadow-[0_20px_60px_rgba(34,197,94,0.10)]
            transition-all
            duration-500
            "
          >
            <div
              className="
              absolute
              top-0
              right-0
              w-32
              h-32
              bg-green-100
              blur-3xl
              "
            />

            <div className="relative z-10">
              <div
                className="
                w-14
                h-14
                bg-gradient-to-br
                from-green-400
                to-green-600
                text-white
                flex
                items-center
                justify-center
                text-xl
                mb-5
                "
              >
                {item.icon}
              </div>

              <h3
                className="
                text-4xl
                font-black
                text-green-700
                "
              >
                {item.value}
              </h3>

              <p
                className="
                mt-2
                text-sm
                text-green-900/60
                "
              >
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FEED */}
      <div className="space-y-6">
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
              y: -6,
            }}
            className="
            group
            relative
            overflow-hidden
            border
            border-green-100
            bg-white
            shadow-[0_25px_80px_rgba(34,197,94,0.12)]
            transition-all
            duration-500
            "
          >
            {/* BACKGROUND */}
            <div
              className="
              absolute
              inset-0
              bg-gradient-to-br
              from-green-50
              via-white
              to-green-50
              "
            />

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

            {/* CONTENT */}
            <div
              className="
              relative
              z-10
              p-5
              sm:p-7
              "
            >
              <div
                className="
                flex
                flex-col
                xl:flex-row
                xl:items-center
                gap-7
                "
              >
                {/* LEFT */}
                <div
                  className="
                  flex
                  items-start
                  gap-5
                  flex-1
                  "
                >
                  {/* USER IMAGE */}
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="
                    relative
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.user}
                      className="
                      w-[95px]
                      h-[95px]
                      object-cover
                      rounded-[28px]
                      border-4
                      border-white
                      shadow-[0_20px_60px_rgba(34,197,94,0.25)]
                      "
                    />

                    <div
                      className="
                      absolute
                      bottom-1
                      right-1
                      w-5
                      h-5
                      bg-green-400
                      border-4
                      border-white
                      animate-pulse
                      rounded-full
                      "
                    />
                  </motion.div>

                  {/* TEXT */}
                  <div className="flex-1">
                    {/* TOP */}
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
                        text-2xl
                        sm:text-3xl
                        font-black
                        text-green-950
                        "
                      >
                        {item.user}
                      </h3>

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        bg-green-100
                        text-green-700
                        border
                        border-green-200
                        "
                      >
                        <FiCheckCircle />

                        <span
                          className="
                          text-xs
                          font-black
                          uppercase
                          tracking-wide
                          "
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* LOCATION */}
                    <div
                      className="
                      mt-3
                      flex
                      items-center
                      gap-2
                      "
                    >
                      <FiMapPin className="text-green-500" />

                      <span
                        className="
                        text-sm
                        text-green-900/60
                        "
                      >
                        {item.location}
                      </span>
                    </div>

                    {/* ACTION */}
                    <p
                      className="
                      mt-5
                      text-base
                      sm:text-lg
                      leading-relaxed
                      text-green-900/75
                      "
                    >
                      <span className="font-black">
                        {item.user}
                      </span>{" "}
                      {item.action}
                    </p>

                    {/* EVIDENCE */}
                    <div
                      className="
                      mt-5
                      flex
                      flex-wrap
                      items-center
                      gap-4
                      "
                    >
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-3
                        bg-green-50
                        border
                        border-green-100
                        text-green-700
                        "
                      >
                        <FiCamera />

                        <span
                          className="
                          text-sm
                          font-semibold
                          "
                        >
                          {item.evidence}
                        </span>
                      </div>

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-3
                        bg-green-100
                        border
                        border-green-200
                        text-green-700
                        "
                      >
                        <FiShield />

                        <span
                          className="
                          text-sm
                          font-bold
                          "
                        >
                          Trust Score {item.trust}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                  xl:min-w-[260px]
                  flex
                  flex-col
                  gap-4
                  "
                >
                  {/* VERIFIED BOX */}
                  <div
                    className="
                    border
                    border-green-100
                    bg-green-50
                    p-5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                        w-14
                        h-14
                        bg-gradient-to-br
                        from-green-400
                        to-green-600
                        text-white
                        flex
                        items-center
                        justify-center
                        text-xl
                        "
                      >
                        <FiTrendingUp />
                      </div>

                      <div>
                        <h4
                          className="
                          text-2xl
                          font-black
                          text-green-700
                          "
                        >
                          VERIFIED
                        </h4>

                        <p
                          className="
                          text-xs
                          uppercase
                          tracking-wide
                          text-green-900/50
                          "
                        >
                          Community Confirmation
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* TIME */}
                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <FiClock className="text-green-500" />

                      <span
                        className="
                        text-sm
                        text-green-900/60
                        "
                      >
                        {item.time}
                      </span>
                    </div>

                    {/* BUTTON */}
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="
                      group/btn
                      w-14
                      h-14
                      bg-gradient-to-br
                      from-green-400
                      to-green-600
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-[0_20px_50px_rgba(34,197,94,0.30)]
                      "
                    >
                      <FiArrowUpRight
                        className="
                        text-xl
                        transition-transform
                        duration-300
                        group-hover/btn:translate-x-1
                        group-hover/btn:-translate-y-1
                        "
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* HOVER LINE */}
            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileHover={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
              absolute
              bottom-0
              left-0
              h-[4px]
              w-full
              origin-left
              bg-gradient-to-r
              from-green-300
              via-green-500
              to-green-600
              "
            />
          </motion.div>
        ))}
      </div>

      {/* BOTTOM CTA */}
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
        mt-8
        border
        border-green-100
        bg-white
        p-6
        sm:p-8
        shadow-[0_25px_80px_rgba(34,197,94,0.12)]
        "
      >
        {/* BG */}
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-r
          from-green-50
          via-white
          to-green-50
          "
        />

        <div
          className="
          relative
          z-10
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
          "
        >
          {/* LEFT */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="
                w-16
                h-16
                bg-gradient-to-br
                from-green-400
                to-green-600
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
                  text-3xl
                  font-black
                  text-green-950
                  "
                >
                  Civic Trust Ecosystem
                </h3>

                <p
                  className="
                  mt-1
                  text-sm
                  text-green-900/60
                  "
                >
                  Citizens building Nigeria
                  together
                </p>
              </div>
            </div>

            <p
              className="
              max-w-3xl
              text-base
              leading-relaxed
              text-green-900/70
              "
            >
              Every verification, evidence
              upload, and citizen response
              strengthens NationAura’s
              trusted civic intelligence
              system across Nigeria.
            </p>
          </div>

          {/* SCORE */}
          <div
            className="
            flex
            items-center
            gap-4
            "
          >
            <div
              className="
              relative
              w-24
              h-24
              bg-gradient-to-br
              from-green-400
              to-green-600
              text-white
              flex
              items-center
              justify-center
              text-4xl
              font-black
              shadow-[0_25px_70px_rgba(34,197,94,0.30)]
              "
            >
              95

              <div
                className="
                absolute
                -top-2
                -right-2
                w-9
                h-9
                bg-green-200
                text-green-700
                text-sm
                font-black
                flex
                items-center
                justify-center
                "
              >
                <FiStar />
              </div>
            </div>

            <div>
              <h4
                className="
                text-5xl
                font-black
                text-green-700
                "
              >
                TRUST
              </h4>

              <p
                className="
                text-sm
                text-green-900/60
                "
              >
                National Community Score
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunityVerificationFeed;