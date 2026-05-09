import { motion } from "framer-motion";

import {
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

const ContactBottom = () => {
  return (
    <section className="px-6 lg:px-12 pb-24">
      <div
        className="
        max-w-7xl
        mx-auto
        grid
        grid-cols-1
        md:grid-cols-2
        gap-8
        "
      >
        {/* RESPONSE TIME */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -4,
          }}
          className="
          rounded-[32px]
          bg-white/85
          backdrop-blur-2xl
          border
          border-white/40
          shadow-[0_15px_50px_rgba(0,0,0,0.05)]
          p-8
          "
        >
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
            "
          >
            <FiClock />
          </div>

          <h3
            className="
            text-2xl
            font-bold
            text-black
            "
          >
            Response Time
          </h3>

          <p
            className="
            mt-4
            text-gray-600
            leading-relaxed
            "
          >
            Our support team typically responds
            to requests within 24 hours depending
            on request volume and issue priority.
          </p>
        </motion.div>

        {/* EMERGENCY */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -4,
          }}
          className="
          rounded-[32px]
          bg-[#FFF7ED]
          border
          border-orange-200
          shadow-[0_15px_50px_rgba(0,0,0,0.04)]
          p-8
          "
        >
          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-orange-500
            text-white
            flex
            items-center
            justify-center
            text-2xl
            mb-6
            "
          >
            <FiAlertTriangle />
          </div>

          <h3
            className="
            text-2xl
            font-bold
            text-black
            "
          >
            Emergency Notice
          </h3>

          <p
            className="
            mt-4
            text-gray-700
            leading-relaxed
            "
          >
            NationAura is not an emergency response service.
            For urgent or life-threatening situations,
            contact local emergency authorities immediately.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactBottom;