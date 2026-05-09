import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  ChevronDown,
  MessageCircleQuestion,
} from "lucide-react";

const faqs = [
  {
    question: "What is NationAura?",
    answer:
      "NationAura is a civic technology platform that enables citizens to report infrastructure issues, track progress, and promote accountability across communities in Nigeria.",
  },

  {
    question: "Who can use NationAura?",
    answer:
      "Any citizen, organization, community leader, or government stakeholder can use NationAura to report and monitor public infrastructure concerns.",
  },

  {
    question: "How do I report an issue?",
    answer:
      "Users can submit reports through the platform by providing issue details, location information, images, and descriptions of the affected infrastructure.",
  },

  {
    question: "Can I track the status of my report?",
    answer:
      "Yes. Every submitted report includes a tracking system that allows users to monitor updates, responses, and progress in real time.",
  },

  {
    question: "Is my data secure on NationAura?",
    answer:
      "NationAura applies secure data handling practices, protected authentication systems, and transparency measures to help keep user information safe.",
  },
];

const DocumentationFAQ = () => {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(
      activeIndex === index ? null : index
    );
  };

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

      <div
        className="
          relative
          z-10
          max-w-5xl
          mx-auto
          px-6
          md:px-12
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
            text-center
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
            <MessageCircleQuestion size={16} />
            Frequently Asked Questions
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
            Everything You Need
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
              To Know About NationAura
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-8
              text-lg
              md:text-xl
              text-[#666666]
              leading-relaxed
              max-w-3xl
              mx-auto
            "
          >
            Find answers to common questions about
            infrastructure reporting, transparency,
            issue tracking, and how citizens can
            actively participate in building stronger
            communities across Nigeria.
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
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

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}

              whileHover={{
                y: -4,
              }}

              className="group"
            >
              <div
                className={`
                  relative
                  overflow-hidden
                  bg-white
                  border
                  transition-all
                  duration-500
                  hover:shadow-[0_25px_80px_rgba(34,197,94,0.10)]
                  ${
                    activeIndex === index
                      ? "border-green-500/20"
                      : "border-black/5"
                  }
                `}
              >
                {/* TOP LINE */}
                <motion.div
                  initial={{
                    width: "0%",
                  }}

                  animate={{
                    width:
                      activeIndex === index
                        ? "100%"
                        : "0%",
                  }}

                  transition={{
                    duration: 0.5,
                  }}

                  className="
                    absolute
                    top-0
                    left-0
                    h-[3px]
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-500
                  "
                />

                {/* GLOW */}
                <div
                  className="
                    absolute
                    -top-24
                    -right-24
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

                {/* BUTTON */}
                <button
                  onClick={() =>
                    toggleFAQ(index)
                  }

                  className="
                    relative
                    z-10
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-6
                    px-8
                    py-7
                    text-left
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-5
                    "
                  >
                    {/* NUMBER */}
                    <div
                      className="
                        text-green-600
                        font-black
                        text-xl
                        min-w-[40px]
                      "
                    >
                      0{index + 1}
                    </div>

                    {/* QUESTION */}
                    <h3
                      className="
                        text-xl
                        md:text-2xl
                        font-black
                        leading-snug
                        tracking-tight
                        text-[#111111]
                        max-w-3xl
                      "
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* ICON */}
                  <motion.div
                    animate={{
                      rotate:
                        activeIndex === index
                          ? 180
                          : 0,
                    }}

                    transition={{
                      duration: 0.3,
                    }}

                    className="
                      min-w-[52px]
                      h-[52px]
                      bg-green-500/10
                      text-green-700
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>

                {/* ANSWER */}
                <AnimatePresence>
                  {activeIndex === index && (
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

                      className="overflow-hidden"
                    >
                      <div
                        className="
                          relative
                          z-10
                          px-8
                          pb-8
                          pl-[92px]
                        "
                      >
                        <p
                          className="
                            text-[#666666]
                            text-lg
                            leading-relaxed
                            max-w-3xl
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
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
            relative
            overflow-hidden
            bg-[#111111]
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
                Still Have Questions?
              </h3>

              <p
                className="
                  mt-5
                  text-gray-400
                  text-lg
                  leading-relaxed
                "
              >
                Our platform is built to make civic
                engagement simple, transparent, and
                impactful for every Nigerian citizen.
              </p>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                y: -4,
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              className="
                px-8
                py-4
                bg-gradient-to-r
                from-green-600
                to-emerald-600
                text-white
                font-bold
                shadow-[0_20px_40px_rgba(34,197,94,0.25)]
              "
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationFAQ;