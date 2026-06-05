import { motion } from "framer-motion";

import {
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiMapPin,
  FiCheckCircle,
  FiArrowUpRight,
  FiTarget,
} from "react-icons/fi";

const ProfileImpactPortfolio = ({
  darkMode,
}) => {
  const projects = [
    {
      title:
        "Road Rehabilitation Initiative",
      location:
        "Abuja Municipal Area Council",
      status: "Resolved",
      impact: "12,400",
      savings: "₦4.2M",
      score: "94",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
    },

    {
      title:
        "School Facility Restoration",
      location: "Kubwa",
      status: "Resolved",
      impact: "3,800",
      savings: "₦1.7M",
      score: "89",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    },

    {
      title:
        "Community Water Access",
      location: "Lugbe",
      status: "Completed",
      impact: "8,200",
      savings: "₦2.8M",
      score: "91",
      image:
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&q=80",
    },
  ];

  return (
    <section
      className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? "bg-[#081019] border-white/10"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
          bg-[size:55px_55px]
        "
      />

      <div
        className="
          absolute
          right-[-150px]
          top-[-150px]
          w-[350px]
          h-[350px]
          bg-green-500/10
          blur-[140px]
        "
      />

      <div
        className="
          relative
          z-10
          p-5
          sm:p-7
          lg:p-8
        "
      >
        {/* SECTION HEADER */}
        <div className="max-w-4xl">
          <p
            className={`
              text-[11px]
              uppercase
              tracking-[0.35em]
              font-black
              ${
                darkMode
                  ? "text-green-400"
                  : "text-green-700"
              }
            `}
          >
            Citizen Portfolio
          </p>

          <h2
            className={`
              mt-3
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              tracking-[-0.06em]
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
            `}
          >
            My Most Impactful Contributions
          </h2>

          <p
            className={`
              mt-4
              leading-relaxed
              max-w-3xl
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            These are the projects and
            reports that generated the
            greatest measurable change in
            communities through citizen
            participation, verification,
            and accountability.
          </p>
        </div>

        {/* FEATURED CONTRIBUTION */}
        <div
          className={`
            mt-8
            border
            overflow-hidden
            ${
              darkMode
                ? `
                  bg-green-500/[0.05]
                  border-green-500/20
                `
                : `
                  bg-green-50
                  border-green-200
                `
            }
          `}
        >
          <div
            className="
              p-6
              lg:p-8
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-green-500
                font-black
                uppercase
                tracking-[0.2em]
                text-xs
              "
            >
              <FiAward />
              Most Impactful Contribution
            </div>

            <h3
              className="
                mt-4
                text-3xl
                lg:text-4xl
                font-black
              "
            >
              Road Rehabilitation
              Initiative
            </h3>

            <p
              className={`
                mt-4
                max-w-3xl
                leading-relaxed
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
              `}
            >
              This report initiated public
              awareness, community
              verification, government
              review, and successful road
              repairs within 26 days,
              improving safety and
              accessibility for thousands
              of citizens.
            </p>

            <div
              className="
                mt-6
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-4
              "
            >
              {[
                {
                  label:
                    "Citizens Impacted",
                  value: "12,400",
                },

                {
                  label:
                    "Community Votes",
                  value: "1,843",
                },

                {
                  label:
                    "Estimated Savings",
                  value: "₦4.2M",
                },

                {
                  label:
                    "Impact Score",
                  value: "94",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                    p-4
                    border
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                        `
                        : `
                          bg-white
                          border-green-100
                        `
                    }
                  `}
                >
                  <p
                    className="
                      text-xs
                      uppercase
                      text-green-500
                      font-bold
                    "
                  >
                    {item.label}
                  </p>

                  <h4
                    className="
                      mt-2
                      text-2xl
                      font-black
                    "
                  >
                    {item.value}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-5
          "
        >
          {projects.map(
            (project, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -6,
                }}
                className={`
                  overflow-hidden
                  border
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                      `
                      : `
                        bg-[#F8FAF9]
                        border-gray-200
                      `
                  }
                `}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    h-52
                    w-full
                    object-cover
                  "
                />

                <div className="p-5">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        px-3
                        py-1
                        bg-green-500/10
                        text-green-500
                        text-xs
                        font-bold
                      "
                    >
                      {project.status}
                    </span>

                    <span
                      className="
                        text-green-500
                        font-black
                      "
                    >
                      {project.score}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-4
                      text-xl
                      font-black
                    "
                  >
                    {project.title}
                  </h3>

                  <div
                    className="
                      mt-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-green-500
                    "
                  >
                    <FiMapPin />
                    {project.location}
                  </div>

                  <div
                    className="
                      mt-5
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >
                    <div>
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-green-500
                        "
                      >
                        <FiUsers />
                        <span>
                          Impact
                        </span>
                      </div>

                      <p
                        className="
                          mt-1
                          font-black
                        "
                      >
                        {
                          project.impact
                        }
                      </p>
                    </div>

                    <div>
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-green-500
                        "
                      >
                        <FiTrendingUp />
                        <span>
                          Savings
                        </span>
                      </div>

                      <p
                        className="
                          mt-1
                          font-black
                        "
                      >
                        {
                          project.savings
                        }
                      </p>
                    </div>
                  </div>

                  <button
                    className="
                      mt-6
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      bg-green-500
                      text-white
                      font-bold
                    "
                  >
                    View Impact Story
                    <FiArrowUpRight />
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* LEGACY */}
        <div
          className="
            mt-10
            border-l-4
            border-green-500
            pl-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-green-500
              font-bold
            "
          >
            <FiTarget />
            Citizen Legacy
          </div>

          <p
            className={`
              mt-3
              text-base
              sm:text-lg
              leading-relaxed
              max-w-4xl
              ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }
            `}
          >
            The true measure of civic participation is not the number of reports submitted, but the number of lives improved. Every contribution in this portfolio represents a real community challenge transformed into meaningful action and measurable impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileImpactPortfolio;