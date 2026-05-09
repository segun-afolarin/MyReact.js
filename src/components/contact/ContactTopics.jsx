import { motion } from "framer-motion";

import { FiShield } from "react-icons/fi";

const supportTopics = [
  "Reporting Issues",
  "Account Problems",
  "Tracking Reports",
  "Community Guidelines",
  "Bug Reports",
];

const ContactTopics = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      className="
      rounded-[36px]
      bg-[#101828]
      text-white
      overflow-hidden
      relative
      shadow-[0_20px_80px_rgba(0,0,0,0.18)]
      "
    >
      {/* GLOW */}
      <div
        className="
        absolute
        top-0
        right-0
        w-[250px]
        h-[250px]
        bg-green-500/20
        rounded-full
        blur-3xl
        "
      />

      <div className="relative z-10 p-8">
        <div
          className="
          inline-flex
          bg-white/10
          px-4
          py-2
          rounded-full
          text-sm
          mb-8
          "
        >
          Common Support Topics
        </div>

        <div className="space-y-4">
          {supportTopics.map((topic, index) => (
            <motion.div
              key={index}
              whileHover={{
                x: 5,
              }}
              className="
              flex
              items-center
              gap-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
              p-4
              "
            >
              <div
                className="
                w-11
                h-11
                rounded-xl
                bg-green-600
                flex
                items-center
                justify-center
                flex-shrink-0
                "
              >
                <FiShield />
              </div>

              <p className="font-medium">
                {topic}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ContactTopics;