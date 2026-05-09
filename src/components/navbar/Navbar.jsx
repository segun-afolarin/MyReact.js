import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiMenu,
  FiChevronDown,
  FiX,
} from "react-icons/fi";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [activeDropdown, setActiveDropdown] =
    useState(null);

  const [mobileDropdown, setMobileDropdown] =
    useState(null);

  const [scrolled, setScrolled] =
    useState(false);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const navItems = [
    {
      title: "About",

      description:
        "Learn more about NationAura and our civic mission.",

      links: [
        {
          name: "About Us",
          path: "/about",
        },

        {
          name: "Our Mission",
          path: "/mission",
        },

        {
          name: "Community Impact",
          path: "/impact",
        },
      ],
    },

    {
      title: "Support",

      description:
        "Get support, help resources, and reporting guidance.",

      links: [
        {
          name: "Help Center",
          path: "/help-center",
        },

        {
          name: "FAQs",
          path: "/faqs",
        },

        {
          name: "Contact Support",
          path: "/contact",
        },
      ],
    },

    {
      title: "Policies",

      description:
        "Read our transparency, privacy, and security policies.",

      links: [
        {
          name: "Privacy Policy",
          path: "/policy",
        },

        {
          name: "Terms & Conditions",
          path: "/policy",
        },

        {
          name: "Security Policy",
          path: "/policy",
        },

        {
          name: "Community Rules",
          path: "/policy",
        },
      ],
    },
  ];

  return (
    <motion.nav
      initial={{
        y: -80,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.6,
      }}

      className={`
      fixed
      top-0
      left-0
      w-full
      z-50
      transition-all
      duration-500
      ${
        scrolled
          ? `
            bg-white/75
            backdrop-blur-2xl
            border-b
            border-white/20
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          `
          : `
            bg-white
            border-b
            border-gray-100
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          `
      }
      `}
    >
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          className="
          h-20
          lg:h-24
          flex
          items-center
          justify-between
          "
        >
          {/* LOGO */}
          <Link to="/">
            <motion.div
              whileHover={{
                scale: 1.02,
              }}

              className="
              flex
              items-center
              gap-3
              sm:gap-4
              cursor-pointer
              "
            >
              {/* LOGO */}
              <div
                className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                rounded-full
                overflow-hidden
                bg-white
                shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                border
                border-gray-100
                flex
                items-center
                justify-center
                shrink-0
                "
              >
                <img
                  src="/images/logo.png"
                  alt="NationAura Logo"
                  className="
                  w-full
                  h-full
                  object-cover
                  "
                />
              </div>

              {/* BRAND */}
              <div>
                <h1
                  className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  tracking-tight
                  text-black
                  "
                >
                  NationAura
                </h1>

                <p
                  className="
                  text-[11px]
                  sm:text-xs
                  text-gray-500
                  -mt-1
                  "
                >
                  Smart Civic Infrastructure
                </p>
              </div>
            </motion.div>
          </Link>

          {/* DESKTOP MENU */}
          <div
            className="
            hidden
            lg:flex
            items-center
            gap-6
            xl:gap-10
            "
          >
            {navItems.map((item, index) => (
              <div
                key={index}

                className="relative"

                onMouseEnter={() =>
                  setActiveDropdown(index)
                }

                onMouseLeave={() =>
                  setActiveDropdown(null)
                }
              >
                {/* NAV ITEM */}
                <button
                  className="
                  flex
                  items-center
                  gap-2
                  text-gray-700
                  hover:text-green-700
                  font-medium
                  transition-all
                  duration-300
                  "
                >
                  {item.title}

                  <motion.div
                    animate={{
                      rotate:
                        activeDropdown === index
                          ? 180
                          : 0,
                    }}
                  >
                    <FiChevronDown />
                  </motion.div>
                </button>

                {/* MODERN MEGA DROPDOWN */}
                <AnimatePresence>
                  {activeDropdown === index && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: 10,
                      }}

                      transition={{
                        duration: 0.3,
                      }}

                      className={`
                      absolute
                      top-16
                      w-[95vw]
                      max-w-[760px]
                      rounded-[32px]
                      overflow-hidden
                      bg-white/95
                      backdrop-blur-2xl
                      border
                      border-gray-100
                      shadow-[0_25px_80px_rgba(0,0,0,0.12)]

                      ${
                        index ===
                        navItems.length - 1
                          ? `
                            right-0
                          `
                          : `
                            left-1/2
                            -translate-x-1/2
                          `
                      }
                      `}
                    >
                      <div
                        className="
                        grid
                        lg:grid-cols-2
                        "
                      >
                        {/* LEFT PANEL */}
                        <div
                          className="
                          p-6
                          sm:p-8
                          lg:p-10
                          bg-gradient-to-br
                          from-green-50
                          via-white
                          to-green-100/40
                          lg:border-r
                          border-gray-100
                          "
                        >
                          <p className="text-green-700 font-medium text-sm">
                            Navigation
                          </p>

                          <h3
                            className="
                            text-3xl
                            sm:text-4xl
                            font-black
                            text-black
                            leading-tight
                            mt-4
                            "
                          >
                            {item.title}
                          </h3>

                          <p
                            className="
                            text-gray-500
                            leading-relaxed
                            mt-5
                            text-sm
                            sm:text-base
                            "
                          >
                            {item.description}
                          </p>

                          <div
                            className="
                            mt-8
                            bg-white
                            border
                            border-gray-100
                            rounded-2xl
                            p-5
                            shadow-sm
                            "
                          >
                            <p className="text-sm text-gray-500">
                              Smart Civic Platform
                            </p>

                            <h4
                              className="
                              text-lg
                              sm:text-xl
                              font-bold
                              text-black
                              mt-2
                              "
                            >
                              Building Better Communities
                            </h4>
                          </div>
                        </div>

                        {/* RIGHT LINKS */}
                        <div
                          className="
                          p-4
                          sm:p-6
                          space-y-3
                          "
                        >
                          {item.links.map(
                            (link, i) => (
                              <Link
                                key={i}
                                to={link.path}
                              >
                                <motion.div
                                  whileHover={{
                                    x: 5,
                                  }}

                                  className="
                                  group
                                  rounded-2xl
                                  p-4
                                  sm:p-5
                                  border
                                  border-transparent
                                  hover:border-green-100
                                  hover:bg-green-50/70
                                  transition-all
                                  duration-300
                                  cursor-pointer
                                  "
                                >
                                  <div className="flex items-center justify-between gap-4">
                                    <div>
                                      <h4
                                        className="
                                        text-base
                                        sm:text-lg
                                        font-semibold
                                        text-gray-800
                                        group-hover:text-green-700
                                        transition-all
                                        duration-300
                                        "
                                      >
                                        {link.name}
                                      </h4>

                                      <p
                                        className="
                                        text-sm
                                        text-gray-500
                                        mt-1
                                        "
                                      >
                                        Explore more
                                        information
                                      </p>
                                    </div>

                                    <span
                                      className="
                                      text-2xl
                                      text-gray-300
                                      group-hover:text-green-700
                                      transition-all
                                      duration-300
                                      shrink-0
                                      "
                                    >
                                      →
                                    </span>
                                  </div>
                                </motion.div>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* CTA */}
            <Link to="/Signup">
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}

                whileTap={{
                  scale: 0.96,
                }}

                className="
                bg-green-700
                hover:bg-green-800
                text-white
                px-6
                py-3
                rounded-2xl
                font-medium
                transition-all
                duration-300
                shadow-lg
                whitespace-nowrap
                "
              >
                Report Issue
              </motion.button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }

            className="
            lg:hidden
            w-11
            h-11
            rounded-2xl
            bg-green-50
            text-xl
            text-green-700
            flex
            items-center
            justify-center
            "
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -20,
            }}

            transition={{
              duration: 0.3,
            }}

            className="
            absolute
            top-20
            left-0
            w-full
            bg-white/95
            backdrop-blur-2xl
            border-b
            border-gray-100
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            lg:hidden
            "
          >
            <div className="px-5 py-6 space-y-5">
              {navItems.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === index
                          ? null
                          : index
                      )
                    }

                    className="
                    w-full
                    flex
                    items-center
                    justify-between
                    text-left
                    text-lg
                    font-semibold
                    text-gray-800
                    py-2
                    "
                  >
                    {item.title}

                    <motion.div
                      animate={{
                        rotate:
                          mobileDropdown === index
                            ? 180
                            : 0,
                      }}
                    >
                      <FiChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileDropdown ===
                      index && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}

                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}

                        exit={{
                          opacity: 0,
                          height: 0,
                        }}

                        className="
                        overflow-hidden
                        "
                      >
                        <div className="pt-3 space-y-3">
                          {item.links.map(
                            (link, i) => (
                              <Link
                                key={i}
                                to={link.path}

                                onClick={() =>
                                  setMobileMenu(
                                    false
                                  )
                                }
                              >
                                <div
                                  className="
                                  p-4
                                  rounded-2xl
                                  bg-gray-50
                                  hover:bg-green-50
                                  transition-all
                                  duration-300
                                  "
                                >
                                  <h4
                                    className="
                                    font-medium
                                    text-gray-800
                                    "
                                  >
                                    {link.name}
                                  </h4>

                                  <p
                                    className="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                    "
                                  >
                                    Explore more
                                  </p>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* MOBILE CTA */}
              <Link to="/Signup">
                <button
                  className="
                  w-full
                  bg-green-700
                  hover:bg-green-800
                  text-white
                  py-4
                  rounded-2xl
                  font-semibold
                  transition-all
                  duration-300
                  mt-2
                  "
                >
                  Report Issue
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;