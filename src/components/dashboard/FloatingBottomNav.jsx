import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiHome,
  FiMap,
  FiBell,
  FiUser,
  FiBarChart2,
  FiPlus,
  FiX,
} from "react-icons/fi";

const FloatingBottomNav = ({ darkMode }) => {
  const [open, setOpen] = useState(false);

  const [active, setActive] =
    useState("Home");

  const navItems = [
    {
      icon: <FiHome />,
      label: "Home",
    },

    {
      icon: <FiMap />,
      label: "Map",
    },

    {
      icon: <FiBarChart2 />,
      label: "Insights",
    },

    {
      icon: <FiBell />,
      label: "Alerts",
    },

    {
      icon: <FiUser />,
      label: "Profile",
    },
  ];

  return (
    <div
      className="
      fixed
      bottom-4
      sm:bottom-6
      left-1/2
      -translate-x-1/2
      z-[100]
      w-full
      flex
      justify-center
      px-4
      pointer-events-none
      "
    >
      <div
        className="
        relative
        w-full
        max-w-[420px]
        flex
        justify-center
        "
      >
        {/* NAVIGATION PANEL */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.9,
              }}
              transition={{
                duration: 0.35,
              }}
              className={`
              pointer-events-auto
              absolute
              bottom-20
              w-full
              rounded-[34px]
              border
              overflow-hidden
              backdrop-blur-3xl
              shadow-[0_25px_80px_rgba(0,0,0,0.25)]
              transition-all
              duration-500
              ${
                darkMode
                  ? `
                    bg-[#081018]/88
                    border-white/10
                  `
                  : `
                    bg-white/85
                    border-white/40
                  `
              }
              `}
            >
              {/* GLOW */}
              <div
                className="
                absolute
                inset-0
                overflow-hidden
                "
              >
                <div
                  className="
                  absolute
                  top-0
                  left-1/2
                  -translate-x-1/2
                  w-56
                  h-40
                  bg-green-500/20
                  blur-3xl
                  rounded-full
                  "
                />
              </div>

              {/* ITEMS */}
              <div
                className="
                relative
                z-10
                grid
                grid-cols-2
                sm:grid-cols-3
                gap-3
                p-4
                "
              >
                {navItems.map(
                  (item, index) => {
                    const isActive =
                      active ===
                      item.label;

                    return (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setActive(
                            item.label
                          );

                          setOpen(false);
                        }}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay:
                            index * 0.05,
                        }}
                        whileHover={{
                          y: -4,
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        className={`
                        relative
                        overflow-hidden
                        rounded-[24px]
                        p-4
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-3
                        min-h-[110px]
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? `
                              bg-gradient-to-br
                              from-green-600
                              to-emerald-700
                              text-white
                              shadow-[0_15px_40px_rgba(22,163,74,0.35)]
                            `
                            : darkMode
                            ? `
                              bg-white/[0.04]
                              text-gray-300
                              border
                              border-white/10
                            `
                            : `
                              bg-[#F8FAF9]
                              text-gray-700
                              border
                              border-gray-100
                            `
                        }
                        `}
                      >
                        {/* ICON */}
                        <div
                          className="
                          text-2xl
                          "
                        >
                          {item.icon}
                        </div>

                        {/* LABEL */}
                        <span
                          className="
                          text-sm
                          font-semibold
                          tracking-wide
                          "
                        >
                          {item.label}
                        </span>

                        {/* ACTIVE GLOW */}
                        {isActive && (
                          <motion.div
                            layoutId="active-glow"
                            className="
                            absolute
                            inset-0
                            bg-white/5
                            "
                          />
                        )}
                      </motion.button>
                    );
                  }
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN BUTTON */}
        <motion.button
          onClick={() =>
            setOpen(!open)
          }
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
          pointer-events-auto
          relative
          w-16
          h-16
          sm:w-[74px]
          sm:h-[74px]
          rounded-full
          bg-gradient-to-br
          from-green-500
          to-emerald-700
          text-white
          flex
          items-center
          justify-center
          text-3xl
          shadow-[0_20px_60px_rgba(22,163,74,0.45)]
          border-[6px]
          border-white
          dark:border-[#081018]
          overflow-hidden
          "
        >
          {/* GLOW */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
            absolute
            inset-0
            bg-white/10
            blur-2xl
            "
          />

          <div className="relative z-10">
            {open ? <FiX /> : <FiPlus />}
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingBottomNav;