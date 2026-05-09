import { motion } from "framer-motion";

import {
  ShieldCheck,
  Lock,
  Database,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Secure Reporting",
    description:
      "All infrastructure reports submitted through NationAura are protected using modern security standards and encrypted communication channels.",

    gradient: "from-green-500 to-emerald-600",
  },

  {
    icon: Lock,
    title: "Protected Accounts",
    description:
      "User authentication systems help secure citizen accounts and prevent unauthorized access to sensitive reporting information.",

    gradient: "from-emerald-500 to-green-700",
  },

  {
    icon: Database,
    title: "Reliable Data Storage",
    description:
      "NationAura maintains structured and reliable data systems to preserve report history, updates, and transparency records safely.",

    gradient: "from-green-400 to-emerald-500",
  },

  {
    icon: Eye,
    title: "Transparent Monitoring",
    description:
      "Citizens can track infrastructure reports openly while maintaining accountability, visibility, and trust across communities.",

    gradient: "from-green-600 to-emerald-700",
  },
];

const DocumentationSecurity = () => {
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
      {/* GRID BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:80px_80px]
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
          bg-green-500/10
          rounded-full
          blur-3xl
        "
      />

      {/* SIDE GLOW */}
      <div
        className="
          absolute
          bottom-[-200px]
          right-[-100px]
          w-[500px]
          h-[500px]
          bg-emerald-500/10
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
          md:px-12
          lg:px-20
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

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.7,
          }}

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
              px-5
              py-2.5
              border
              border-green-500/20
              bg-green-500/5
              text-green-700
              text-sm
              font-bold
              tracking-[0.15em]
              uppercase
              mb-8
            "
          >
            Security & Transparency
          </div>

          {/* TITLE */}
          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              tracking-tight
              leading-[1.05]
              text-[#111111]
            "
          >
            Built For
            <span
              className="
                block
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-green-700
                via-emerald-600
                to-green-500
              "
            >
              Trust, Protection &
              Accountability
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              text-lg
              md:text-xl
              text-[#555555]
              leading-relaxed
              max-w-3xl
            "
          >
            NationAura combines secure infrastructure reporting,
            transparent civic monitoring, and reliable digital systems
            to create a trusted platform for citizens, organizations,
            and communities across Nigeria.
          </p>
        </motion.div>

        {/* FEATURE GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
          "
        >
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
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

                viewport={{
                  once: true,
                }}

                transition={{
                  duration: 0.6,
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
                    border
                    border-black/5
                    bg-white
                    p-8
                    md:p-10
                    h-full
                    transition-all
                    duration-500
                    hover:border-green-500/20
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

                    className={`
                      absolute
                      top-0
                      left-0
                      h-[4px]
                      bg-gradient-to-r
                      ${feature.gradient}
                    `}
                  />

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      -top-24
                      -right-24
                      w-60
                      h-60
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
                      {/* ICON */}
                      <div
                        className={`
                          w-16
                          h-16
                          bg-gradient-to-br
                          ${feature.gradient}
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
                        <ArrowUpRight size={28} />
                      </motion.div>
                    </div>

                    {/* TITLE */}
                    <h3
                      className="
                        text-3xl
                        font-black
                        tracking-tight
                        text-[#111111]
                        mb-6
                      "
                    >
                      {feature.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        text-[#666666]
                        text-lg
                        leading-relaxed
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM STRIP */}
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
            duration: 0.7,
            delay: 0.2,
          }}

          className="
            mt-20
            border
            border-black/5
            bg-[#111111]
            overflow-hidden
            relative
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-[500px]
              h-[300px]
              bg-green-500/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              px-8
              md:px-14
              py-12
              flex
              flex-col
              lg:flex-row
              items-start
              lg:items-center
              justify-between
              gap-10
            "
          >
            {/* TEXT */}
            <div className="max-w-3xl">
              <h3
                className="
                  text-3xl
                  md:text-4xl
                  font-black
                  text-white
                  leading-tight
                "
              >
                Transparent Civic Technology
                Designed For National Impact
              </h3>

              <p
                className="
                  mt-5
                  text-gray-400
                  text-lg
                  leading-relaxed
                "
              >
                NationAura empowers citizens with secure reporting,
                transparent issue tracking, and reliable civic
                collaboration systems that strengthen trust between
                communities and institutions.
              </p>
            </div>

            {/* STATS */}
            <div
              className="
                flex
                flex-wrap
                gap-5
              "
            >
              {[
                "Encrypted Systems",
                "AI Verification",
                "Transparent Tracking",
              ].map((item, index) => (
                <div
                  key={index}

                  className="
                    px-5
                    py-4
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                    text-white
                    font-semibold
                    text-sm
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationSecurity;