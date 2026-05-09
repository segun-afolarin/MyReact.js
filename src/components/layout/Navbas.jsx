import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Link, NavLink } from "react-router-dom";

import {
  FiMenu,
  FiX,
} from "react-icons/fi";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "About",
    path: "/about",
  },
   {
    name: "Our Mission",
    path: "/mission",
  },

  {
    name: "FAQ",
    path: "/faqs",
  },
  {
    name: "Impact",
    path: "/impact",
  },
 {
  name: "Institution Portal",
  path: "/government",
},
{
  name: "Access Center",
  path: "/signup",
},

];

const Navbars = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{
          y: -100,
        }}

        animate={{
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="
          fixed
          top-0
          left-0
          w-full
          z-50
          px-4
          lg:px-6
          pt-4
        "
      >

        <div
          className={`
            max-w-7xl
            mx-auto

            h-[82px]

            flex
            items-center
            justify-between

            px-6
            lg:px-8

            rounded-[28px]

            transition-all
            duration-300

            border

            ${
              scrolled
                ? `
                  bg-white/75
                  backdrop-blur-2xl
                  border-white/30
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                `
                : `
                  bg-white/65
                  backdrop-blur-xl
                  border-white/20
                `
            }
          `}
        >

          {/* LOGO */}
          <Link to="/">

            <motion.div
              whileHover={{
                scale: 1.03,
              }}

              className="
                flex
                items-center
                gap-4
              "
            >

              {/* LOGO IMAGE */}
              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  overflow-hidden
                  shadow-md
                  border
                  border-gray-200
                  flex-shrink-0
                "
              >
                <img
                  src="images/logo.png"
                  alt="NationAura Logo"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              </div>

              {/* TEXT */}
              <div
                className="
                  flex
                  flex-col
                  leading-none
                "
              >

                <span
                  className="
                    text-[1.35rem]
                    font-bold
                    tracking-tight
                    text-black
                  "
                >
                  NationAura
                </span>

                <span
                  className="
                    text-xs
                    text-gray-500
                    font-medium
                    mt-1
                  "
                >
                  Civic-Tech Platform
                </span>

              </div>

            </motion.div>

          </Link>

          {/* DESKTOP NAV */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-2
            "
          >

            {/* LINKS */}
            <div
              className="
                flex
                items-center
                gap-2
                bg-black/[0.03]
                p-2
                rounded-2xl
              "
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}

                  to={link.path}

                  className={({ isActive }) =>
                    `
                      px-5
                      py-3
                      rounded-2xl

                      text-sm
                      font-semibold

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            bg-black
                            text-white
                            shadow-lg
                          `
                          : `
                            text-gray-700
                            hover:bg-white
                            hover:shadow-sm
                          `
                      }
                    `
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}

            className="
              lg:hidden

              w-12
              h-12

              rounded-2xl

              bg-black/[0.04]

              border
              border-black/5

              flex
              items-center
              justify-center

              text-2xl
              text-black

              transition-all
            "
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>

      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
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
              duration: 0.25,
            }}

            className="
              fixed
              top-[105px]
              left-0
              w-full
              z-40
              px-4
              lg:hidden
            "
          >

            <div
              className="
                max-w-7xl
                mx-auto

                bg-white/80
                backdrop-blur-2xl

                border
                border-white/30

                rounded-[32px]

                shadow-[0_20px_60px_rgba(0,0,0,0.08)]

                p-5

                flex
                flex-col
                gap-3
              "
            >

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}

                  to={link.path}

                  onClick={() => setIsOpen(false)}

                  className={({ isActive }) =>
                    `
                      px-5
                      py-4

                      rounded-2xl

                      text-base
                      font-semibold

                      transition-all

                      ${
                        isActive
                          ? `
                            bg-black
                            text-white
                          `
                          : `
                            text-gray-700
                            hover:bg-gray-100
                          `
                      }
                    `
                  }
                >
                  {link.name}
                </NavLink>
              ))}

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbars;