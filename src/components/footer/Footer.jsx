import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    {
      name: "Report Issues",
      path: "/report",
    },
    {
      name: "Live Tracking",
      path: "/tracking",
    },
    {
      name: "Community Reports",
      path: "/community-reports",
    },
    {
      name: "Government Portal",
      path: "/government",
    },
    {
      name: "AI Verification",
      path: "/ai-verification",
    },
  ],

  Resources: [
    {
      name: "Documentation",
      path: "/documentation",
    },
    {
      name: "Transparency Reports",
      path: "/transparency-reports",
    },
    {
      name: "Help Center",
      path: "/help-center",
    },
    {
      name: "API Access",
      path: "/CitizenDashboard",
    },
    {
      name: "Support",
      path: "/support",
    },
  ],

  Company: [
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Mission",
      path: "/mission",
    },
    {
      name: "Impact",
      path: "/impact",
    },
    {
      name: "Community Voices",
      path: "/CommunityVoicesPage",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ],
};

const legalLinks = [
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    name: "Terms",
    path: "/terms",
  },
  {
    name: "Security",
    path: "/security",
  },
  {
    name: "Transparency",
    path: "/transparency",
  },
];

const Footer = () => {
  return (
    <footer
      className="
      bg-[#161616]
      text-white
      border-t
      border-white/5
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-12
        pt-24
        pb-10
        "
      >
        {/* TOP SECTION */}
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-[1.5fr_1fr]
          gap-20
          pb-20
          border-b
          border-white/10
          "
        >
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {/* BRAND */}
            <div
              className="
              flex
              items-center
              gap-5
              "
            >
              {/* LOGO */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                className="
                w-20
                h-20
                rounded-full
                overflow-hidden
                border
                border-white/10
                shadow-[0_15px_40px_rgba(0,0,0,0.25)]
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
              </motion.div>

              {/* TEXT */}
              <div>
                <h2
                  className="
                  text-3xl
                  md:text-4xl
                  font-black
                  tracking-tight
                  text-white
                  "
                >
                  NationAura
                </h2>

                <p
                  className="
                  mt-2
                  text-gray-400
                  text-sm
                  md:text-base
                  "
                >
                  AI-Powered Civic Infrastructure Platform
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p
              className="
              mt-10
              text-gray-400
              text-lg
              leading-relaxed
              max-w-2xl
              "
            >
              NationAura empowers citizens to report
              infrastructure challenges, track public
              issues transparently, and build smarter,
              safer communities through civic technology,
              AI verification, and collective action.
            </p>

            {/* ACTIONS */}
            <div
              className="
              mt-10
              flex
              flex-wrap
              gap-4
              "
            >
              <Link to="/report">
                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                  flex
                  items-center
                  gap-3
                  bg-green-600
                  hover:bg-green-500
                  px-7
                  py-4
                  rounded-2xl
                  text-white
                  font-semibold
                  transition-all
                  duration-300
                  "
                >
                  Start Reporting

                  <FiArrowUpRight />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-10
            "
          >
            {Object.entries(footerLinks).map(
              ([title, links], index) => (
                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                >
                  {/* TITLE */}
                  <h3
                    className="
                    text-lg
                    font-bold
                    text-white
                    mb-7
                    "
                  >
                    {title}
                  </h3>

                  {/* LINKS */}
                  <div
                    className="
                    flex
                    flex-col
                    gap-5
                    "
                  >
                    {links.map((link, idx) => (
                      <Link key={idx} to={link.path}>
                        <motion.span
                          whileHover={{
                            x: 4,
                          }}
                          className="
                          text-gray-400
                          hover:text-green-400
                          transition-all
                          duration-300
                          w-fit
                          block
                          cursor-pointer
                          "
                        >
                          {link.name}
                        </motion.span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
          pt-8
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-6
          "
        >
          {/* COPYRIGHT */}
          <p
            className="
            text-sm
            text-gray-500
            text-center
            lg:text-left
            "
          >
            © 2026 NationAura. Designed for the future
            of civic innovation.
          </p>

          {/* LEGAL */}
          <div
            className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-6
            text-sm
            text-gray-500
            "
          >
            {legalLinks.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.span
                  whileHover={{
                    y: -2,
                  }}
                  className="
                  hover:text-green-400
                  transition-all
                  duration-300
                  cursor-pointer
                  "
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;