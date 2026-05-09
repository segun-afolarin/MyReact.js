import { motion } from "framer-motion";

const AnimatedSection = ({
  children,
  className = "",

  delay = 0,

  duration = 0.5,

  y = 40,

  x = 0,

  once = true,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        x,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}

      transition={{
        duration,
        delay,
      }}

      viewport={{
        once,
      }}

      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;