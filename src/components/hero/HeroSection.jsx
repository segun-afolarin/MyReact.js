import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    image:
      "/images/hero1.jpg",
    title: "Together for a Better Nigeria",
    description:
      "Join thousands of citizens reporting real community issues and driving meaningful change across Nigeria.",
  },
  {
    image:
      "/images/hero2.jpg",
    title: "Your Voice Can Build the Nation",
    description:
      "Speak up about roads, flooding, waste, electricity, and public infrastructure using AI-powered civic technology.",
  },
  {
    image:
      "/images/hero3.jpg",
    title: "One Report Can Change a Community",
    description:
      "Every report creates awareness, transparency, and action for safer and stronger communities.",
  },
];

const reports = [
  {
    title: "Bad Road Report",
    location: "Kano State",
    status: "Critical",
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Flood Warning",
    location: "Lagos Mainland",
    status: "Medium",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Streetlight Repair",
    location: "Abuja",
    status: "Fixed",
    color: "bg-green-100 text-green-700",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto change slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
      relative
      min-h-screen
      flex
      items-center
      overflow-hidden
      bg-black
      "
    >
      {/* BACKGROUND IMAGES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[current].image}
            alt="Community"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/65"></div>

          {/* Green Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-black/40 to-black/70"></div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Glow */}
      <div
        className="
        absolute
        top-[-120px]
        right-[-120px]
        w-[500px]
        h-[500px]
        bg-green-500/20
        rounded-full
        blur-3xl
        "
      />

      {/* CONTAINER */}
      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        lg:px-12
        w-full
        grid
        lg:grid-cols-2
        gap-20
        items-center
        py-32
        "
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-8"
        >
          {/* Badge */}
          <div
            className="
            inline-flex
            items-center
            gap-2
            bg-green-500/15
            border
            border-green-400/20
            text-green-300
            px-5
            py-2
            rounded-full
            text-sm
            font-medium
            backdrop-blur-md
            "
          >
            AI-Powered Civic Technology
          </div>

          {/* Dynamic Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlides[current].title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1
                className="
                text-5xl
                md:text-6xl
                lg:text-7xl
                font-bold
                leading-[1.05]
                tracking-tight
                text-white
                "
              >
                {heroSlides[current].title}
              </h1>

              <p
                className="
                text-lg
                md:text-xl
                text-gray-300
                leading-relaxed
                max-w-2xl
                "
              >
                {heroSlides[current].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-5 pt-4">
            <button
              className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-4
              rounded-2xl
              text-lg
              font-semibold
              transition-all
              duration-300
              hover:scale-105
              shadow-2xl
              shadow-green-900/30
              "
            >
              Report an Issue
            </button>

            <button
              className="
              border
              border-white/20
              bg-white/10
              backdrop-blur-md
              hover:bg-white/20
              text-white
              px-8
              py-4
              rounded-2xl
              text-lg
              transition-all
              duration-300
              "
            >
              Explore Live Map
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-8 pt-6 flex-wrap">
            <div>
              <h3 className="text-3xl font-bold text-white">12K+</h3>
              <p className="text-gray-400 text-sm">Citizen Reports</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">500+</h3>
              <p className="text-gray-400 text-sm">Communities Reached</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">36 States</h3>
              <p className="text-gray-400 text-sm">Nationwide Coverage</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div
            className="
            bg-white/10
            backdrop-blur-2xl
            border
            border-white/10
            rounded-[40px]
            shadow-[0_10px_60px_rgba(0,0,0,0.35)]
            p-8
            lg:p-10
            "
          >
            {/* Top Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                Live Community Reports
              </h2>

              <p className="text-gray-300 mt-2">
                Citizens actively improving communities in real time.
              </p>
            </div>

            {/* Report Cards */}
            <div className="space-y-5">
              {reports.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="
                  bg-white/10
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  transition-all
                  duration-300
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {item.title}
                      </h3>

                      <p className="text-gray-300 mt-2">
                        {item.location}
                      </p>
                    </div>

                    <div
                      className={`
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      ${item.color}
                      `}
                    >
                      {item.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div
              className="
              mt-8
              bg-green-600
              rounded-3xl
              p-6
              text-white
              "
            >
              <h3 className="text-xl font-bold">
                Be Part of the Change
              </h3>

              <p className="text-green-100 mt-2 leading-relaxed">
                Your reports help communities receive faster attention,
                transparency, and solutions.
              </p>

              <button
                className="
                mt-5
                bg-white
                text-green-700
                px-6
                py-3
                rounded-2xl
                font-semibold
                hover:scale-105
                transition-all
                duration-300
                "
              >
                Join the Movement
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SLIDER INDICATORS */}
      <div
        className="
        absolute
        bottom-10
        left-1/2
        -translate-x-1/2
        flex
        gap-3
        z-20
        "
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              h-3 rounded-full transition-all duration-300
              ${current === index
                ? "w-10 bg-green-500"
                : "w-3 bg-white/40"}
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;