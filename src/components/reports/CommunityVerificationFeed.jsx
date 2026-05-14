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
            border-green-100
            bg-white
            text-green-700
            mb-5
            shadow-sm
            "
          >
            <FiUsers />

            <span
              className="
              text-xs
              sm:text-sm
              font-black
              tracking-[0.18em]
              uppercase
              "
            >
              Community Verification Feed
            </span>
          </div>

          <h2
            className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            font-black
            leading-[0.95]
            tracking-[-0.05em]
            text-[#0B1117]
            "
          >
            Real Citizens.
            <br />

            <span className="text-green-600">
              Real Impact.
            </span>
          </h2>

          <p
            className="
            mt-5
            text-base
            sm:text-lg
            leading-relaxed
            text-black/60
            max-w-3xl
            "
          >
            Nigerians are actively
            confirming infrastructure
            issues, uploading evidence,
            and helping urgent reports
            reach authorities faster.
          </p>
        </div>

        {/* LIVE CARD */}
        <motion.div
          whileHover={{
            y: -4,
          }}
          className="
          relative
          overflow-hidden
          border
          border-green-100
          bg-white
          p-6
          min-w-[280px]
          shadow-[0_20px_60px_rgba(34,197,94,0.08)]
          "
        >
          {/* TOP LINE */}
          <div
            className="
            absolute
            top-0
            left-0
            w-full
            h-[3px]
            bg-gradient-to-r
            from-green-400
            via-green-500
            to-transparent
            "
          />

          <div className="flex items-center gap-4">
            <div
              className="
              relative
              w-16
              h-16
              bg-green-500
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
                bg-green-400
                animate-ping
                opacity-20
                "
              />

              <FiActivity className="relative z-10" />
            </div>

            <div>
              <h3
                className="
                text-3xl
                font-black
                text-[#0B1117]
                "
              >
                LIVE
              </h3>

              <p className="text-sm text-black/60">
                Community reports updating
                in real-time
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
              y: -5,
            }}
            className="
            relative
            overflow-hidden
            border
            border-green-100
            bg-white
            p-5
            transition-all
            duration-500
            shadow-[0_15px_50px_rgba(34,197,94,0.08)]
            hover:shadow-[0_25px_70px_rgba(34,197,94,0.14)]
            "
          >
            <div
              className="
              absolute
              top-0
              right-0
              w-[120px]
              h-[120px]
              bg-green-100/60
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
                mb-5
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
                text-black/60
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
              y: -4,
            }}
            className="
            group
            relative
            overflow-hidden
            border
            border-green-100
            bg-white
            transition-all
            duration-500
            hover:shadow-[0_25px_80px_rgba(34,197,94,0.12)]
            "
          >
            {/* BG */}
            <div
              className="
              absolute
              top-0
              right-0
              w-[180px]
              h-[180px]
              bg-green-100/50
              blur-3xl
              "
            />

            {/* SIDE LINE */}
            <div
              className="
              absolute
              left-0
              top-0
              bottom-0
              w-[4px]
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
                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.user}
                    className="
                    w-[82px]
                    h-[82px]
                    object-cover
                    rounded-2xl
                    border-4
                    border-white
                    shadow-lg
                    "
                  />

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
                        sm:text-[28px]
                        font-black
                        text-[#0B1117]
                        "
                      >
                        {item.user}
                      </h3>

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        bg-green-50
                        border
                        border-green-100
                        text-green-700
                        "
                      >
                        <FiCheckCircle />

                        <span
                          className="
                          text-[11px]
                          font-black
                          uppercase
                          tracking-[0.15em]
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
                        text-black/55
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
                      text-black/70
                      "
                    >
                      <span className="font-black text-black">
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
                      gap-3
                      "
                    >
                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-3
                        border
                        border-green-100
                        bg-[#F8FFF9]
                        "
                      >
                        <FiCamera className="text-green-600" />

                        <span
                          className="
                          text-sm
                          font-semibold
                          text-black/70
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
                        bg-green-500
                        text-white
                        "
                      >
                        <FiShield />

                        <span
                          className="
                          text-sm
                          font-black
                          "
                        >
                          Trust {item.trust}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="
                  xl:min-w-[250px]
                  flex
                  flex-col
                  gap-4
                  "
                >
                  {/* VERIFIED */}
                  <div
                    className="
                    border
                    border-green-100
                    bg-[#F8FFF9]
                    p-5
                    "
                  >
                    <div className="flex items-center gap-4">
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
                        "
                      >
                        <FiTrendingUp />
                      </div>

                      <div>
                        <h4
                          className="
                          text-xl
                          font-black
                          text-[#0B1117]
                          "
                        >
                          VERIFIED
                        </h4>

                        <p
                          className="
                          text-xs
                          uppercase
                          tracking-[0.15em]
                          text-black/45
                          "
                        >
                          Trusted Community
                          Report
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    "
                  >
                    <div className="flex items-center gap-2">
                      <FiClock className="text-green-500" />

                      <span
                        className="
                        text-sm
                        text-black/55
                        "
                      >
                        {item.time}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{
                        scale: 1.04,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      className="
                      group/btn
                      w-14
                      h-14
                      bg-green-500
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-lg
                      transition-all
                      duration-300
                      hover:bg-green-600
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
          </motion.div>
        ))}
      </div>

      {/* CTA */}
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
        shadow-[0_20px_60px_rgba(34,197,94,0.08)]
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
          gap-8
          "
        >
          {/* LEFT */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-5">
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
                  text-3xl
                  font-black
                  text-[#0B1117]
                  "
                >
                  Stronger Together
                </h3>

                <p className="text-sm text-black/55">
                  Citizens building
                  accountability
                </p>
              </div>
            </div>

            <p
              className="
              text-base
              leading-relaxed
              text-black/65
              "
            >
              Every citizen confirmation,
              evidence upload, and report
              verification helps communities
              push for faster action and
              better infrastructure across
              Nigeria.
            </p>
          </div>

          {/* TRUST */}
          <div
            className="
            flex
            items-center
            gap-4
            "
          >
            <div
              className="
              w-24
              h-24
              bg-green-500
              text-white
              flex
              items-center
              justify-center
              text-4xl
              font-black
              shadow-lg
              "
            >
              95
            </div>

            <div>
              <h4
                className="
                text-5xl
                font-black
                text-[#0B1117]
                "
              >
                TRUST
              </h4>

              <p
                className="
                text-sm
                text-black/55
                "
              >
                National community
                confidence
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunityVerificationFeed;