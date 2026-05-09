import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";

import {
  FiChevronDown,
  FiHelpCircle,
  FiMapPin,
  FiShield,
  FiCpu,
  FiUsers,
  FiFileText,
} from "react-icons/fi";

const faqData = [
  {
    icon: <FiMapPin />,
    question: "How do I report an infrastructure issue?",
    answer:
      "Open NationAura, click “Report Issue”, upload images, add location details, and describe the problem clearly.",
  },

  {
    icon: <FiCpu />,
    question: "How does NationAura verify reports?",
    answer:
      "Reports are reviewed using AI systems and community verification to improve accuracy before escalation.",
  },

  {
    icon: <FiShield />,
    question: "Is my personal information secure?",
    answer:
      "Yes. NationAura uses secure authentication systems and encrypted data storage to protect user information.",
  },

  {
    icon: <FiUsers />,
    question: "Who can see my reports?",
    answer:
      "Relevant authorities, organizations, and verified users can track public infrastructure reports transparently.",
  },

  {
    icon: <FiFileText />,
    question: "Can I track the status of my report?",
    answer:
      "Yes. You can monitor updates from “Reported” to “Under Review”, “In Progress”, and “Fixed”.",
  },

  {
    icon: <FiHelpCircle />,
    question: "What kind of issues can I report?",
    answer:
      "You can report bad roads, flooding, drainage issues, electricity problems, damaged streetlights, and public infrastructure concerns.",
  },
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] =
    useState(0);

  return (
    <section
      className="
      relative
      overflow-hidden
      px-4
      sm:px-6
      lg:px-12
      py-24
      md:py-32
      bg-[#F4F8F5]
      "
    >

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

      {/* TOP GLOW */}
      <div
        className="
        absolute
        top-[-200px]
        left-1/2
        -translate-x-1/2
        w-[900px]
        h-[900px]
        bg-green-300/20
        rounded-full
        blur-3xl
        "
      />

      {/* SIDE LIGHT */}
      <div
        className="
        absolute
        top-1/2
        left-[-120px]
        w-[350px]
        h-[350px]
        bg-green-200/30
        rounded-full
        blur-3xl
        "
      />

      <div
        className="
        relative
        z-10
        max-w-6xl
        mx-auto
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

          viewport={{
            once: true,
          }}

          className="
          text-center
          max-w-4xl
          mx-auto
          mb-20
          "
        >

          {/* BADGE */}
          <div
            className="
            inline-flex
            items-center
            gap-3
            px-6
            py-3
            rounded-full
            border
            border-green-200
            bg-white/80
            backdrop-blur-2xl
            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            text-sm
            font-semibold
            tracking-[0.18em]
            uppercase
            text-green-700
            "
          >

            NationAura Support Center

          </div>

          {/* TITLE */}
          <h2
  className="
  mt-8
  text-4xl
  sm:text-5xl
  lg:text-7xl
  font-black
  tracking-tight
  leading-[0.95]
  text-black
  "
>
  Everything You Need
  <br />

  To Understand
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
    NationAura
  </span>

</h2>
          {/* DESCRIPTION */}
          <p
            className="
            mt-8
            text-base
            sm:text-lg
            md:text-xl
            text-gray-600
            leading-relaxed
            max-w-3xl
            mx-auto
            "
          >
          NationAura is built to make infrastructure reporting,
community engagement, and civic transparency simple,
accessible, and impactful for every citizen across Nigeria.
          </p>

        </motion.div>

        {/* FAQ LIST */}
        <div
          className="
          relative
          space-y-6
          "
        >

          {faqData.map((faq, index) => (
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
                duration: 0.55,
                delay: index * 0.07,
              }}

              whileHover={{
                y: -6,
              }}

              className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              sm:rounded-[38px]
              border
              border-white/60
              bg-white/70
              backdrop-blur-3xl
              shadow-[0_20px_80px_rgba(0,0,0,0.06)]
              hover:shadow-[0_30px_120px_rgba(16,185,129,0.14)]
              transition-all
              duration-500
              "
            >

              {/* GLOW */}
              <div
                className="
                absolute
                -top-24
                -right-24
                w-72
                h-72
                bg-green-200/40
                rounded-full
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-700
                "
              />

              {/* TOP BORDER */}
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
                h-[2px]
                bg-gradient-to-r
                from-green-500
                via-emerald-400
                to-green-600
                "
              />

              {/* QUESTION */}
              <button
                onClick={() =>
                  setOpenIndex(
                    openIndex === index
                      ? null
                      : index
                  )
                }

                className="
                relative
                z-10
                w-full
                flex
                items-start
                justify-between
                gap-5
                p-5
                sm:p-7
                md:p-9
                text-left
                "
              >

                {/* LEFT */}
                <div
                  className="
                  flex
                  items-start
                  gap-4
                  sm:gap-6
                  "
                >

                  {/* ICON */}
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 6,
                    }}

                    className="
                    relative
                    w-14
                    h-14
                    sm:w-16
                    sm:h-16
                    rounded-2xl
                    sm:rounded-3xl
                    bg-gradient-to-br
                    from-green-600
                    to-emerald-700
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    shadow-[0_20px_40px_rgba(16,185,129,0.25)]
                    flex-shrink-0
                    "
                  >

                    {/* INNER LIGHT */}
                    <div
                      className="
                      absolute
                      inset-0
                      rounded-3xl
                      bg-white/10
                      "
                    />

                    <span className="relative z-10">
                      {faq.icon}
                    </span>

                  </motion.div>

                  {/* TEXT */}
                  <div>

                    <h3
                      className="
                      text-lg
                      sm:text-xl
                      md:text-2xl
                      font-black
                      tracking-tight
                      leading-snug
                      text-black
                      max-w-[700px]
                      "
                    >
                      {faq.question}
                    </h3>

                    <p
                      className="
                      mt-2
                      text-sm
                      text-green-700
                      font-medium
                      tracking-wide
                      "
                    >
                      NationAura Knowledge Base
                    </p>

                  </div>

                </div>

                {/* ARROW */}
                <motion.div
                  animate={{
                    rotate:
                      openIndex === index
                        ? 180
                        : 0,
                  }}

                  transition={{
                    duration: 0.35,
                  }}

                  className="
                  min-w-[52px]
                  h-[52px]
                  rounded-2xl
                  bg-[#F7F7F7]
                  border
                  border-gray-100
                  flex
                  items-center
                  justify-center
                  text-green-700
                  text-2xl
                  shadow-sm
                  group-hover:bg-green-50
                  group-hover:border-green-100
                  transition-all
                  duration-300
                  "
                >
                  <FiChevronDown />
                </motion.div>

              </button>

              {/* ANSWER */}
              <AnimatePresence initial={false}>

                {openIndex === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}

                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}

                    exit={{
                      height: 0,
                      opacity: 0,
                    }}

                    transition={{
                      duration: 0.4,
                    }}

                    className="
                    overflow-hidden
                    "
                  >

                    <div
                      className="
                      relative
                      px-5
                      sm:px-7
                      md:px-9
                      pb-8
                      sm:pb-10
                      "
                    >

                      {/* DIVIDER */}
                      <div
                        className="
                        ml-0
                        sm:ml-[88px]
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-green-300
                        to-transparent
                        mb-7
                        "
                      />

                      {/* ANSWER BOX */}
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                        }}

                        transition={{
                          delay: 0.08,
                        }}

                        className="
                        sm:ml-[88px]
                        rounded-[28px]
                        border
                        border-green-100
                        bg-gradient-to-br
                        from-white
                        to-green-50/60
                        p-6
                        sm:p-8
                        shadow-[0_10px_40px_rgba(16,185,129,0.05)]
                        "
                      >

                        <p
                          className="
                          text-gray-700
                          text-base
                          sm:text-lg
                          leading-relaxed
                          "
                        >
                          {faq.answer}
                        </p>

                      </motion.div>

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FAQAccordion;