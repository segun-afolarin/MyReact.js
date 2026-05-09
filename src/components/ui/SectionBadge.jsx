import { motion } from "framer-motion";

const SectionBadge = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
      }}

      transition={{
        duration: 0.4,
      }}

      className={`
        inline-flex
        items-center
        gap-2
        px-5
        py-2
        rounded-full
        text-sm
        font-semibold

        bg-green-100
        text-green-700

        border
        border-green-200

        shadow-sm

        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default SectionBadge;