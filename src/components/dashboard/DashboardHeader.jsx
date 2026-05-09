import { motion } from "framer-motion";

import {
  FiBell,
  FiMoon,
  FiSun,
  FiMenu,
  FiSearch,
} from "react-icons/fi";

const DashboardHeader = ({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <motion.header
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
      }}
      className={`
      fixed
      top-0
      left-0
      right-0
      z-50
      h-[78px]
      border-b
      backdrop-blur-xl
      transition-all
      duration-300
      ${
        darkMode
          ? `
            bg-[#081018]/95
            border-white/10
          `
          : `
            bg-white/95
            border-gray-200
          `
      }
      `}
    >
      {/* INNER */}
      <div
        className="
        h-full
        px-4
        md:px-7
        flex
        items-center
        justify-between
        "
      >
        {/* LEFT */}
        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          {/* MENU BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className={`
            w-11
            h-11
            flex
            items-center
            justify-center
            text-lg
            border
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-white/[0.03]
                  border-white/10
                  text-white
                  hover:bg-white/[0.06]
                `
                : `
                  bg-[#F7F7F7]
                  border-gray-200
                  text-black
                  hover:bg-white
                `
            }
            `}
          >
            <FiMenu />
          </motion.button>

          {/* BRAND */}
          <div
            className="
            flex
            flex-col
            "
          >
            <h1
              className={`
              text-[20px]
              md:text-[22px]
              font-black
              tracking-tight
              leading-none
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              NationAura
            </h1>

            <p
              className={`
              text-xs
              mt-1
              tracking-wide
              uppercase
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }
              `}
            >
              Civic Intelligence Dashboard
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
          flex
          items-center
          gap-3
          md:gap-4
          "
        >
          {/* SEARCH */}
          <div
            className={`
            hidden
            lg:flex
            items-center
            gap-3
            h-11
            px-4
            w-[260px]
            border
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-white/[0.03]
                  border-white/10
                `
                : `
                  bg-[#F7F7F7]
                  border-gray-200
                `
            }
            `}
          >
            <FiSearch
              className={`
              text-sm
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }
              `}
            />

            <input
              type="text"
              placeholder="Search reports, users..."

              className={`
              bg-transparent
              outline-none
              text-sm
              w-full
              ${
                darkMode
                  ? `
                    text-white
                    placeholder:text-gray-500
                  `
                  : `
                    text-black
                    placeholder:text-gray-400
                  `
              }
              `}
            />
          </div>

          {/* NOTIFICATIONS */}
          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className={`
            relative
            w-11
            h-11
            flex
            items-center
            justify-center
            text-lg
            border
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-white/[0.03]
                  border-white/10
                  text-white
                  hover:bg-white/[0.06]
                `
                : `
                  bg-[#F7F7F7]
                  border-gray-200
                  text-black
                  hover:bg-white
                `
            }
            `}
          >
            <FiBell />

            {/* DOT */}
            <span
              className="
              absolute
              top-2.5
              right-2.5
              w-2
              h-2
              bg-green-500
              "
            />
          </motion.button>

          {/* DARK MODE */}
          <motion.button
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`
            w-11
            h-11
            flex
            items-center
            justify-center
            text-lg
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-green-600
                  text-white
                  shadow-[0_10px_30px_rgba(34,197,94,0.25)]
                `
                : `
                  bg-black
                  text-white
                `
            }
            `}
          >
            {darkMode ? (
              <FiSun />
            ) : (
              <FiMoon />
            )}
          </motion.button>

          {/* PROFILE */}
          <motion.div
            whileHover={{
              y: -2,
            }}
            className={`
            flex
            items-center
            gap-3
            pl-2
            cursor-pointer
            `}
          >
            {/* AVATAR */}
            <div
              className="
              w-11
              h-11
              bg-gradient-to-br
              from-green-600
              to-emerald-700
              flex
              items-center
              justify-center
              text-white
              font-bold
              shadow-[0_10px_25px_rgba(34,197,94,0.30)]
              "
            >
              DA
            </div>

            {/* USER */}
            <div className="hidden md:block">
              <h3
                className={`
                text-sm
                font-semibold
                leading-none
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                David A
              </h3>

              <p
                className={`
                text-xs
                mt-1
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
                `}
              >
                Citizen Reporter
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;