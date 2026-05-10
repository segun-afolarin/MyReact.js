import { motion } from "framer-motion";

import {
  FiBell,
  FiMoon,
  FiSun,
  FiMenu,
  FiSearch,
  FiX,
} from "react-icons/fi";

import logo from "/images/logo.png";

const DashboardHeader = ({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
  mobileSidebar,
  setMobileSidebar,
}) => {
  const handleSidebarToggle = () => {
    if (window.innerWidth < 1280) {
      setMobileSidebar(!mobileSidebar);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

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
      h-[74px]
      md:h-[78px]
      border-b
      backdrop-blur-2xl
      transition-all
      duration-300
      ${
        darkMode
          ? `
            bg-[#081018]/92
            border-white/10
          `
          : `
            bg-white/90
            border-gray-200
          `
      }
      `}
    >
      {/* HEADER GLOW */}
      <div
        className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
        "
      >
        <div
          className="
          absolute
          left-0
          top-[-90px]
          w-[280px]
          h-[180px]
          bg-green-500/10
          blur-3xl
          rounded-full
          "
        />
      </div>

      {/* INNER */}
      <div
        className="
        relative
        z-10
        h-full
        px-4
        sm:px-6
        lg:px-8
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
          gap-3
          md:gap-4
          "
        >
          {/* MENU BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleSidebarToggle}
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
            overflow-hidden
            ${
              darkMode
                ? `
                  bg-white/[0.04]
                  border-white/10
                  text-white
                  hover:bg-white/[0.08]
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
            {/* BUTTON GLOW */}
            <div
              className="
              absolute
              inset-0
              bg-gradient-to-br
              from-green-500/10
              to-transparent
              "
            />

            {mobileSidebar ? (
              <FiX className="relative z-10" />
            ) : (
              <FiMenu className="relative z-10" />
            )}
          </motion.button>

          {/* BRAND */}
          <div
            className="
            flex
            items-center
            gap-3
            "
          >
          
            {/* LOGO */}
<div
  className="
  relative
  hidden
  sm:flex
  w-12
  h-12
  rounded-full
  bg-white
  items-center
  justify-center
  overflow-hidden
  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
  border
  border-white/40
  "
>
  {/* SOFT GLOW */}
  <div
    className="
    absolute
    inset-0
    rounded-full
    bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_70%)]
    "
  />

  <img
    src={logo}
    alt="NationAura Logo"
    className="
    relative
    z-10
    w-[70%]
    h-[70%]
    object-contain
    "
  />
</div>

            {/* TEXT */}
            <div
              className="
              flex
              flex-col
              "
            >
              <h1
                className={`
                text-[18px]
                sm:text-[20px]
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
                hidden
                sm:block
                text-[10px]
                md:text-xs
                mt-1
                tracking-[0.18em]
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
        </div>

        {/* RIGHT */}
        <div
          className="
          flex
          items-center
          gap-2
          sm:gap-3
          md:gap-4
          "
        >
          {/* SEARCH */}
          <div
            className={`
            hidden
            xl:flex
            items-center
            gap-3
            h-11
            px-4
            w-[280px]
            border
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-white/[0.03]
                  border-white/10
                  focus-within:bg-white/[0.05]
                `
                : `
                  bg-[#F7F7F7]
                  border-gray-200
                  focus-within:bg-white
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
              shadow-[0_0_10px_rgba(34,197,94,0.8)]
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
                  shadow-[0_10px_30px_rgba(34,197,94,0.30)]
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
            className="
            flex
            items-center
            gap-3
            pl-1
            sm:pl-2
            cursor-pointer
            "
          >
            {/* AVATAR */}
            <div
              className="
              relative
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
              overflow-hidden
              shadow-[0_10px_30px_rgba(34,197,94,0.30)]
              "
            >
              <div
                className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]
                "
              />

              <span className="relative z-10">
                DA
              </span>
            </div>

            {/* USER */}
            <div className="hidden lg:block">
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