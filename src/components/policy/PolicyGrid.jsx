import { motion } from "framer-motion";

import {
  FiShield,
  FiFileText,
  FiLock,
  FiCheckCircle,
  FiUsers,
  FiAlertTriangle,
  FiDatabase,
  FiArrowUpRight,
} from "react-icons/fi";

import Container from "../ui/Container";

const policies = [
  {
    title: "Privacy Policy",

    icon: <FiShield />,

    content: [
      "NationAura securely collects essential civic reporting data including uploaded images, issue locations, and infrastructure reports.",

      "All collected information is used strictly to improve transparency, accountability, and infrastructure response systems.",

      "User information is protected using encrypted storage systems and modern security standards.",

      "We never compromise civic trust or misuse citizen-generated infrastructure data.",
    ],

    gradient: "from-green-500 to-emerald-600",
  },

  {
    title: "Terms of Use",

    icon: <FiFileText />,

    content: [
      "Users are expected to submit accurate, responsible, and relevant infrastructure reports only.",

      "Spam, fake submissions, misinformation, or malicious activity are strictly prohibited on the platform.",

      "Offensive content, abuse, or harmful behavior may result in account restrictions or removal.",

      "NationAura maintains a trusted ecosystem built around responsible civic participation.",
    ],

    gradient: "from-emerald-500 to-green-700",
  },

  {
    title: "Content Policy",

    icon: <FiAlertTriangle />,

    content: [
      "Citizens can report roads, flooding, drainage failures, electricity issues, and public infrastructure concerns.",

      "Violent, hateful, fake, misleading, or unrelated content is prohibited from the platform.",

      "AI-assisted moderation and community verification help maintain report authenticity.",

      "Every approved report contributes toward safer and smarter communities.",
    ],

    gradient: "from-green-400 to-emerald-500",
  },

  {
    title: "Data Security Policy",

    icon: <FiLock />,

    content: [
      "NationAura uses modern authentication systems and encrypted infrastructure for platform protection.",

      "Sensitive data access is restricted to verified authorities and authorized administrators only.",

      "Continuous monitoring helps defend against abuse, unauthorized access, and cyber threats.",

      "Security and trust remain foundational to every interaction within the platform.",
    ],

    gradient: "from-green-600 to-emerald-700",
  },

  {
    title: "Transparency Policy",

    icon: <FiDatabase />,

    content: [
      "Infrastructure reports remain visible to relevant agencies and responsible organizations.",

      "Citizens can monitor updates and repair progress transparently in real time.",

      "Verified civic data is never hidden, manipulated, or suppressed within NationAura.",

      "The platform is designed to strengthen accountability and public trust nationwide.",
    ],

    gradient: "from-green-500 to-lime-600",
  },

  {
    title: "User Responsibility",

    icon: <FiUsers />,

    content: [
      "Citizens are encouraged to report issues honestly and responsibly for accurate civic impact.",

      "Clear images, correct locations, and detailed descriptions improve response efficiency.",

      "Communities help strengthen transparency through active participation and verification.",

      "Responsible reporting creates faster action and stronger civic collaboration.",
    ],

    gradient: "from-emerald-400 to-green-600",
  },
];

const PolicyGrid = () => {
  return (
    <section
      className="
        relative
        py-28
        overflow-hidden
      "
    >

      {/* BACKGROUND GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
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

      <Container>

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
            mb-20
            max-w-3xl
          "
        >

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
            NationAura Governance
          </div>

          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              leading-tight
              tracking-tight
              text-black
            "
          >
            Policies Designed
            For Trust, Security
            And Civic Integrity
          </h2>

          <p
            className="
              mt-8
              text-lg
              leading-relaxed
              text-gray-600
              max-w-2xl
            "
          >
            NationAura follows responsible digital governance
            principles to protect citizens, maintain trusted
            infrastructure reporting, and create transparent
            collaboration between communities and authorities.
          </p>

        </motion.div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
          "
        >

          {policies.map((policy, index) => (
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
                  h-full
                  overflow-hidden
                  border
                  border-black/10
                  bg-white
                  p-10
                  transition-all
                  duration-500
                  hover:border-green-500/40
                  hover:shadow-[0_25px_80px_rgba(34,197,94,0.15)]
                "
              >

                {/* ANIMATED TOP LINE */}
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
                    ${policy.gradient}
                  `}
                />

                {/* GLOW */}
                <div
                  className="
                    absolute
                    -top-20
                    -right-20
                    w-52
                    h-52
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
                        ${policy.gradient}
                        text-white
                        flex
                        items-center
                        justify-center
                        text-3xl
                        shadow-2xl
                      `}
                    >
                      {policy.icon}
                    </div>

                    {/* ARROW */}
                    <motion.div
                      whileHover={{
                        rotate: 45,
                      }}

                      className="
                        text-2xl
                        text-gray-300
                        group-hover:text-green-600
                        transition-all
                      "
                    >
                      <FiArrowUpRight />
                    </motion.div>

                  </div>

                  {/* TITLE */}
                  <h2
                    className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-black
                      mb-8
                    "
                  >
                    {policy.title}
                  </h2>

                  {/* CONTENT */}
                  <div className="space-y-5">

                    {policy.content.map((item, i) => (
                      <div
                        key={i}

                        className="
                          flex
                          items-start
                          gap-4
                        "
                      >

                        <div
                          className="
                            mt-1
                            text-green-600
                            text-lg
                            flex-shrink-0
                          "
                        >
                          <FiCheckCircle />
                        </div>

                        <p
                          className="
                            text-gray-600
                            text-lg
                            leading-relaxed
                          "
                        >
                          {item}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </Container>

    </section>
  );
};

export default PolicyGrid;