import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const DocumentationCTA = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F5F7F4] px-6 py-24 md:px-12 lg:px-20">
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[900px]
          h-[500px]
          bg-green-200/30
          blur-3xl
          rounded-full
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:80px_80px]
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            overflow-hidden
            bg-[#101512]
            px-8
            py-14
            md:px-14
            md:py-20
            lg:px-20
          "
        >
          {/* CINEMATIC LIGHT */}
          <div
            className="
              absolute
              top-[-200px]
              right-[-120px]
              w-[500px]
              h-[500px]
              rounded-full
              bg-green-500/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-[-200px]
              left-[-120px]
              w-[450px]
              h-[450px]
              rounded-full
              bg-emerald-400/10
              blur-3xl
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10
              flex
              flex-col
              xl:flex-row
              xl:items-center
              xl:justify-between
              gap-16
            "
          >
            {/* LEFT */}
            <div className="max-w-3xl">
              {/* BADGE */}
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
                  duration: 0.5,
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  border
                  border-white/10
                  px-5
                  py-2
                  text-sm
                  font-semibold
                  tracking-wide
                  uppercase
                  text-green-300
                  mb-8
                "
              >
                Start Your Civic Impact
              </motion.div>

              {/* TITLE */}
              <motion.h2
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
                  duration: 0.7,
                  delay: 0.1,
                }}
                className="
                  text-4xl
                  md:text-6xl
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-white
                "
              >
                Help Build A More
                <span className="text-green-400">
                  {" "}
                  Transparent
                </span>
                <br />
                And Accountable Nigeria
              </motion.h2>

              {/* DESCRIPTION */}
              <motion.p
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
                  duration: 0.7,
                  delay: 0.2,
                }}
                className="
                  mt-8
                  max-w-2xl
                  text-lg
                  leading-relaxed
                  text-gray-300
                "
              >
                NationAura empowers citizens to report
                infrastructure problems, monitor progress,
                and create measurable civic impact through
                technology, transparency, and collective
                action across communities in Nigeria.
              </motion.p>

              {/* STATS */}
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
                  duration: 0.7,
                  delay: 0.3,
                }}
                className="
                  mt-10
                  flex
                  flex-wrap
                  gap-5
                "
              >
                {[
                  "10K+ Reports Submitted",
                  "36 States Coverage",
                  "AI Verification Enabled",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                      bg-white/5
                      border
                      border-white/10
                      px-5
                      py-3
                      text-sm
                      font-medium
                      text-gray-200
                      backdrop-blur-xl
                    "
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT CTA */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="
                w-full
                xl:w-[420px]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  bg-white
                  p-8
                  shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                "
              >
                {/* MINI GLOW */}
                <div
                  className="
                    absolute
                    top-0
                    right-0
                    w-40
                    h-40
                    bg-green-100
                    blur-3xl
                    opacity-60
                  "
                />

                <div className="relative z-10">
                  {/* TOP */}
                  <div className="mb-10">
                    <p
                      className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-green-700
                        mb-4
                      "
                    >
                      Ready To Get Started?
                    </p>

                    <h3
                      className="
                        text-3xl
                        font-black
                        leading-tight
                        tracking-tight
                        text-[#111111]
                      "
                    >
                      Become Part Of
                      Nigeria’s Civic
                      Transformation
                    </h3>
                  </div>

                  {/* BUTTONS */}
                  <div className="space-y-4">
                    {/* PRIMARY */}
                    <motion.button
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="
                        group
                        w-full
                        bg-[#0E5D37]
                        hover:bg-[#09492b]
                        text-white
                        px-8
                        py-5
                        font-semibold
                        text-lg
                        flex
                        items-center
                        justify-center
                        gap-3
                        transition-all
                        duration-300
                        shadow-[0_20px_50px_rgba(14,93,55,0.35)]
                      "
                    >
                      Start Reporting

                      <ArrowRight
                        size={20}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </motion.button>

                    {/* SECONDARY */}
                    <motion.button
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="
                        w-full
                        border
                        border-[#DADADA]
                        hover:border-[#0E5D37]
                        hover:text-[#0E5D37]
                        text-[#111111]
                        px-8
                        py-5
                        font-semibold
                        text-lg
                        transition-all
                        duration-300
                        bg-[#FAFAFA]
                      "
                    >
                      Explore Documentation
                    </motion.button>
                  </div>

                  {/* FOOT NOTE */}
                  <p
                    className="
                      mt-8
                      text-sm
                      leading-relaxed
                      text-gray-500
                    "
                  >
                    Join citizens, communities, and
                    organizations building smarter and
                    more transparent infrastructure systems
                    across Nigeria.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationCTA;