import { motion } from "framer-motion";

import {
  FiMail,
  FiMessageSquare,
  FiCpu,
} from "react-icons/fi";

const supportCards = [
  {
    title: "Email Support",
    description:
      "Reach our dedicated support team for account issues, reporting assistance, and platform guidance.",
    icon: <FiMail />,
  },

  {
    title: "Live Assistance",
    description:
      "Chat directly with the NationAura Civic Assistant for faster help and navigation support.",
    icon: <FiMessageSquare />,
  },

  {
    title: "Technical Support",
    description:
      "Get professional help for bugs, technical issues, verification problems, and system troubleshooting.",
    icon: <FiCpu />,
  },
];

const ContactSupportCards = () => {
  return (
    <div className="space-y-5">
      {supportCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.45,
            delay: index * 0.06,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -6,
          }}
          className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-white/85
          backdrop-blur-2xl
          border
          border-white/40
          shadow-[0_15px_50px_rgba(0,0,0,0.05)]
          p-7
          "
        >
          {/* GLOW */}
          <div
            className="
            absolute
            -top-16
            -right-16
            w-40
            h-40
            bg-green-100
            rounded-full
            blur-3xl
            opacity-40
            "
          />

          <div className="relative z-10">
            <div
              className="
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-br
              from-green-600
              to-emerald-700
              text-white
              flex
              items-center
              justify-center
              text-2xl
              mb-6
              shadow-lg
              "
            >
              {card.icon}
            </div>

            <h3
              className="
              text-xl
              font-bold
              text-black
              "
            >
              {card.title}
            </h3>

            <p
              className="
              mt-3
              text-gray-600
              leading-relaxed
              "
            >
              {card.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactSupportCards;