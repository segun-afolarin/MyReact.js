import { motion } from "framer-motion";

const GlassCard = ({
  children,
  className = "",
  hover = true,
}) => {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -8,
              scale: 1.01,
            }
          : {}
      }
      transition={{
        duration: 0.3,
      }}
      className={`
        relative
        overflow-hidden
        rounded-[32px]
        bg-white/80
        backdrop-blur-2xl
        border
        border-white/30
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        ${className}
      `}
    >
      {/* TOP GLOW */}
      <div
        className="
          absolute
          -top-20
          -right-20
          w-40
          h-40
          bg-green-200/40
          rounded-full
          blur-3xl
        "
      />

      {/* BOTTOM GLOW */}
      <div
        className="
          absolute
          -bottom-20
          -left-20
          w-40
          h-40
          bg-emerald-100/30
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;