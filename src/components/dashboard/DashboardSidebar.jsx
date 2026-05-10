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

import logo from "/images/logo.png";

const DashboardSidebar = ({
  sidebarOpen,
  mobileSidebar,
  setMobileSidebar,
  darkMode,
}) => {
  const [active, setActive] =
    useState("Dashboard");

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

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
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileSidebar && (
          <motion.div
            initial={{
              opacity: 0,
              backdropFilter:
                "blur(0px)",
            }}
            animate={{
              opacity: 1,
              backdropFilter:
                "blur(6px)",
            }}
            exit={{
              opacity: 0,
              backdropFilter:
                "blur(0px)",
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            onClick={() =>
              setMobileSidebar(false)
            }
            className="
            fixed
            inset-0
            bg-black/40
            z-30
            xl:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        initial={false}
        animate={{
          width:
            sidebarOpen || isMobile
              ? 290
              : 92,

          x:
            mobileSidebar ||
            !isMobile
              ? 0
              : -320,
        }}
        transition={{
          width: {
            type: "spring",
            stiffness: 180,
            damping: 22,
          },

          x: {
            type: "spring",
            stiffness: 140,
            damping: 20,
          },
        }}
        className={`
        fixed
        top-[74px]
        md:top-[78px]
        left-0
        bottom-0
        w-[290px]
        max-w-[88vw]
        z-40
        border-r
        overflow-hidden
        shadow-[8px_0_40px_rgba(0,0,0,0.08)]
        ${
          darkMode
            ? `
              bg-[#0B1218]/98
              border-white/10
            `
            : `
              bg-white/96
              border-gray-200
            `
        }
        `}
      >
        {/* BACKGROUND */}
        <div
          className="
          absolute
          inset-0
          overflow-hidden
          pointer-events-none
          "
        >
          {/* GLOW */}
          <div
            className="
            absolute
            top-[-120px]
            left-[-80px]
            w-[260px]
            h-[260px]
            bg-green-500/10
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
            bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
            bg-[size:60px_60px]
            "
          />
        </div>

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
          relative
          z-10
          h-full
          overflow-y-auto
          overscroll-contain
          scrollbar-thin
          scrollbar-thumb-green-500/20
          scrollbar-track-transparent
          flex
          flex-col
          "
        >
          {/* HEADER */}
          <div
            className={`
            px-4
            py-5
            border-b
            ${
              darkMode
                ? "border-white/10"
                : "border-gray-200"
            }
            `}
          >
            <div
              className={`
              flex
              items-center
              ${
                sidebarOpen || isMobile
                  ? "gap-4"
                  : "justify-center items-center"
              }
              `}
            >
              {/* LOGO */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 14,
                }}
                className="
                relative
                w-14
                h-14
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                overflow-hidden
                border
                border-white/50
                shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                shrink-0
                "
              >
                <img
                  src={logo}
                  alt="NationAura"
                  className="
                  w-[72%]
                  h-[72%]
                  object-contain
                  "
                />
              </motion.div>

              {/* BRAND */}
              <AnimatePresence mode="wait">
                {(sidebarOpen ||
                  isMobile) && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -10,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <h2
                      className={`
                      text-[20px]
                      font-black
                      tracking-tight
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      NationAura
                    </h2>

                    <p
                      className={`
                      text-xs
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
                      Civic Dashboard
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* NAVIGATION */}
          <div
            className="
            flex-1
            px-4
            py-6
            "
          >
            <AnimatePresence mode="wait">
              {(sidebarOpen ||
                isMobile) && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className={`
                  px-2
                  mb-4
                  text-xs
                  font-semibold
                  tracking-[0.22em]
                  uppercase
                  ${
                    darkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }
                  `}
                >
                  Navigation
                </motion.div>
              )}
            </AnimatePresence>

            {/* MENU */}
            <div
              className="
              flex
              flex-col
              gap-2
              "
            >
              {menuItems.map(
                (item, index) => {
                  const isActive =
                    active === item.title;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setActive(
                          item.title
                        );

                        if (
                          window.innerWidth <
                          1280
                        ) {
                          setMobileSidebar(
                            false
                          );
                        }
                      }}
                      whileHover={{
                        x:
                          sidebarOpen ||
                          isMobile
                            ? 6
                            : 0,

                        scale: 1.01,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className={`
                      group
                      relative
                      flex
                      items-center
                      ${
                        sidebarOpen ||
                        isMobile
                          ? "justify-between px-4"
                          : "justify-center items-center"
                      }
                      h-[56px]
                      sm:h-[58px]
                      transition-all
                      duration-300
                      overflow-hidden
                      ${
                        isActive
                          ? `
                            bg-green-600
                            text-white
                            shadow-[0_12px_30px_rgba(34,197,94,0.30)]
                          `
                          : darkMode
                          ? `
                            text-gray-300
                            hover:bg-white/[0.05]
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
                      {/* ACTIVE GLOW */}
                      {isActive && (
                        <>
                          <motion.div
                            layoutId="activeSidebar"
                            transition={{
                              type: "spring",
                              stiffness: 280,
                              damping: 22,
                            }}
                            className="
                            absolute
                            left-0
                            top-0
                            bottom-0
                            w-1.5
                            bg-white
                            "
                          />

                          <div
                            className="
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.18),transparent_60%)]
                            "
                          />
                        </>
                      )}

                      {/* LEFT */}
                      <div
                        className={`
                        relative
                        z-10
                        flex
                        items-center
                        ${
                          sidebarOpen ||
                          isMobile
                            ? "gap-4"
                            : "justify-center items-center"
                        }
                        `}
                      >
                        {/* ICON */}
                        <motion.div
                          whileHover={{
                            scale: 1.12,
                            rotate: 2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 12,
                          }}
                          className="
                          text-[21px]
                          shrink-0
                          "
                        >
                          {item.icon}
                        </motion.div>

                        {/* TEXT */}
                        <AnimatePresence mode="wait">
                          {(sidebarOpen ||
                            isMobile) && (
                            <motion.span
                              initial={{
                                opacity: 0,
                                x: -10,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              exit={{
                                opacity: 0,
                                x: -10,
                              }}
                              transition={{
                                duration: 0.22,
                              }}
                              className="
                              text-sm
                              font-medium
                              whitespace-nowrap
                              "
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* RIGHT */}
                      {(sidebarOpen ||
                        isMobile) && (
                        <motion.div
                          animate={{
                            x: isActive
                              ? 0
                              : -4,

                            opacity: isActive
                              ? 1
                              : 0,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="
                          relative
                          z-10
                          "
                        >
                          <FiChevronRight
                            className="
                            text-sm
                            "
                          />
                        </motion.div>
                      )}

                      {/* TOOLTIP */}
                      {!sidebarOpen &&
                        !isMobile && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: -8,
                            }}
                            whileHover={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="
                            absolute
                            left-[78px]
                            px-3
                            py-2
                            text-sm
                            font-medium
                            whitespace-nowrap
                            opacity-0
                            pointer-events-none
                            group-hover:opacity-100
                            bg-[#111827]
                            text-white
                            z-50
                            shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                            border
                            border-white/10
                            backdrop-blur-xl
                            "
                          >
                            {item.title}
                          </motion.div>
                        )}
                    </motion.button>
                  );
                }
              )}
            </div>
          </div>

          {/* BOTTOM */}
          <div
            className={`
            p-4
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
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className={`
              group
              relative
              h-[56px]
              flex
              items-center
              transition-all
              duration-300
              ${
                sidebarOpen || isMobile
                  ? "gap-4 px-4"
                  : "justify-center items-center"
              }
              ${
                darkMode
                  ? `
                    text-gray-300
                    hover:bg-white/[0.05]
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
              <FiSettings className="text-[20px]" />

              <AnimatePresence mode="wait">
                {(sidebarOpen ||
                  isMobile) && (
                  <motion.span
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                    text-sm
                    font-medium
                    "
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* LOGOUT */}
            <motion.button
              whileHover={{
                x: 4,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="
              group
              relative
              h-[56px]
              flex
              items-center
              text-red-500
              hover:bg-red-500/10
              transition-all
              duration-300
              "
            >
              <div
                className={`
                flex
                items-center
                w-full
                ${
                  sidebarOpen ||
                  isMobile
                    ? "gap-4 px-4"
                    : "justify-center items-center"
                }
                `}
              >
                <FiLogOut className="text-[20px]" />

                <AnimatePresence mode="wait">
                  {(sidebarOpen ||
                    isMobile) && (
                    <motion.span
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="
                      text-sm
                      font-medium
                      "
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;