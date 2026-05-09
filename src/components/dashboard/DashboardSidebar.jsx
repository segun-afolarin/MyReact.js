import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiGrid,
  FiMap,
  FiFileText,
  FiUsers,
  FiBell,
  FiSettings,
  FiMessageCircle,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

const DashboardSidebar = ({
  sidebarOpen,
  darkMode,
}) => {
  const [active, setActive] =
    useState("Dashboard");

  const menuItems = [
    {
      title: "Dashboard",
      icon: <FiGrid />,
    },

    {
      title: "My Reports",
      icon: <FiFileText />,
    },

    {
      title: "Live Map",
      icon: <FiMap />,
    },

    {
      title: "Community",
      icon: <FiUsers />,
    },

    {
      title: "Notifications",
      icon: <FiBell />,
    },

    {
      title: "AI Assistant",
      icon: <FiMessageCircle />,
    },
  ];

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          initial={{
            x: -80,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: -80,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className={`
          fixed
          top-[78px]
          left-0
          bottom-0
          z-40
          w-[290px]
          border-r
          flex-col
          hidden
          lg:flex
          overflow-hidden
          transition-all
          duration-300
          ${
            darkMode
              ? `
                bg-[#0B1218]
                border-white/10
              `
              : `
                bg-[#FCFCFC]
                border-gray-200
              `
          }
          `}
        >
          {/* TOP STRIP */}
          <div
            className="
            h-1
            w-full
            bg-gradient-to-r
            from-green-500
            via-emerald-500
            to-green-600
            "
          />

          {/* CONTENT */}
          <div
            className="
            flex
            flex-col
            h-full
            px-4
            py-5
            "
          >
            {/* USER CARD */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className={`
              border
              p-4
              ${
                darkMode
                  ? `
                    bg-white/[0.02]
                    border-white/10
                  `
                  : `
                    bg-[#F7F7F7]
                    border-gray-200
                  `
              }
              `}
            >
              <div
                className="
                flex
                items-center
                gap-4
                "
              >
                {/* AVATAR */}
                <div
                  className="
                  w-14
                  h-14
                  bg-gradient-to-br
                  from-green-600
                  to-emerald-700
                  flex
                  items-center
                  justify-center
                  text-white
                  text-lg
                  font-bold
                  shadow-[0_10px_25px_rgba(34,197,94,0.25)]
                  "
                >
                  DA
                </div>

                {/* INFO */}
                <div>
                  <h2
                    className={`
                    text-[15px]
                    font-bold
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    David A
                  </h2>

                  <p
                    className={`
                    text-sm
                    mt-1
                    ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }
                    `}
                  >
                    Civic Intelligence User
                  </p>
                </div>
              </div>
            </motion.div>

            {/* MENU */}
            <div
              className="
              flex-1
              mt-8
              flex
              flex-col
              "
            >
              {/* LABEL */}
              <div
                className={`
                px-2
                mb-4
                text-xs
                font-semibold
                tracking-[0.2em]
                uppercase
                ${
                  darkMode
                    ? "text-gray-500"
                    : "text-gray-400"
                }
                `}
              >
                Navigation
              </div>

              {/* LINKS */}
              <div
                className="
                flex
                flex-col
                gap-1
                "
              >
                {menuItems.map(
                  (item, index) => {
                    const isActive =
                      active === item.title;

                    return (
                      <motion.button
                        key={index}
                        onClick={() =>
                          setActive(
                            item.title
                          )
                        }
                        whileHover={{
                          x: 4,
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                        className={`
                        relative
                        flex
                        items-center
                        justify-between
                        w-full
                        px-4
                        h-[58px]
                        transition-all
                        duration-300
                        overflow-hidden
                        ${
                          isActive
                            ? `
                              bg-green-600
                              text-white
                              shadow-[0_10px_30px_rgba(34,197,94,0.25)]
                            `
                            : darkMode
                            ? `
                              text-gray-300
                              hover:bg-white/[0.04]
                              hover:text-white
                            `
                            : `
                              text-gray-600
                              hover:bg-[#F3F4F6]
                              hover:text-black
                            `
                        }
                        `}
                      >
                        {/* ACTIVE BAR */}
                        {isActive && (
                          <motion.div
                            layoutId="sidebarActive"

                            className="
                            absolute
                            left-0
                            top-0
                            bottom-0
                            w-1.5
                            bg-white
                            "
                          />
                        )}

                        {/* LEFT */}
                        <div
                          className="
                          flex
                          items-center
                          gap-4
                          "
                        >
                          <div
                            className="
                            text-[20px]
                            "
                          >
                            {item.icon}
                          </div>

                          <span
                            className="
                            text-sm
                            font-medium
                            "
                          >
                            {item.title}
                          </span>
                        </div>

                        {/* RIGHT */}
                        <FiChevronRight
                          className={`
                          text-sm
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }
                          `}
                        />
                      </motion.button>
                    );
                  }
                )}
              </div>
            </div>

            {/* BOTTOM */}
            <div
              className={`
              pt-5
              border-t
              flex
              flex-col
              gap-2
              ${
                darkMode
                  ? "border-white/10"
                  : "border-gray-200"
              }
              `}
            >
              {/* SETTINGS */}
              <motion.button
                whileHover={{
                  x: 4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`
                h-[54px]
                px-4
                flex
                items-center
                gap-4
                transition-all
                duration-300
                ${
                  darkMode
                    ? `
                      text-gray-300
                      hover:bg-white/[0.04]
                      hover:text-white
                    `
                    : `
                      text-gray-600
                      hover:bg-[#F3F4F6]
                      hover:text-black
                    `
                }
                `}
              >
                <FiSettings
                  className="
                  text-[19px]
                  "
                />

                <span
                  className="
                  text-sm
                  font-medium
                  "
                >
                  Settings
                </span>
              </motion.button>

              {/* LOGOUT */}
              <motion.button
                whileHover={{
                  x: 4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                h-[54px]
                px-4
                flex
                items-center
                gap-4
                text-red-500
                hover:bg-red-500/10
                transition-all
                duration-300
                "
              >
                <FiLogOut
                  className="
                  text-[19px]
                  "
                />

                <span
                  className="
                  text-sm
                  font-medium
                  "
                >
                  Logout
                </span>
              </motion.button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DashboardSidebar;