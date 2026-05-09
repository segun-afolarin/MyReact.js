import { motion } from "framer-motion";

const PageHero = ({
  badge,
  title,
  description,
  image,
  children,
}) => {
  return (
    <section
      className="
        relative
        min-h-[85vh]
        flex
        items-center
        overflow-hidden
        px-6
        lg:px-12
        pt-32
        pb-24
      "
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="Hero Background"
          className="
            w-full
            h-full
            object-cover
          "
        />

        {/* DARK OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/60
          "
        />

        {/* GREEN GLOW */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[700px]
            bg-green-500/20
            rounded-full
            blur-3xl
          "
        />
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          w-full
        "
      >
        {/* BADGE */}
        {badge && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              inline-flex
              items-center
              gap-2
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              text-white
              px-5
              py-2
              rounded-full
              text-sm
              font-medium
              mb-8
            "
          >
            {badge}
          </motion.div>
        )}

        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            text-4xl
            md:text-6xl
            lg:text-7xl
            font-bold
            text-white
            leading-tight
            tracking-tight
            max-w-5xl
          "
        >
          {title}
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-8
            text-lg
            md:text-xl
            text-gray-200
            leading-relaxed
            max-w-3xl
          "
        >
          {description}
        </motion.p>

        {/* EXTRA CONTENT */}
        {children && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;