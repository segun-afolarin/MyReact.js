import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiMapPin,
  FiCheckCircle,
  FiArrowUpRight,
  FiTarget,
  FiX,
  FiShare2,
  FiDownload,
  FiCalendar,
  FiCheck,
  FiLink,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

const ProfileImpactPortfolio = ({
  darkMode,
}) => {
  const [activeStory, setActiveStory] =
    useState(null);

  // NOTE: each project carries a `story` object.
  // This is the exact shape the backend endpoint
  // (e.g. GET /api/reports/:id/story) should return —
  // swap the hardcoded arrays below for a fetch keyed
  // on project.id once the API is live.
  const projects = [
    {
      id: "road-rehab-amac",
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
      story: {
        summary:
          "A pothole cluster on the AMAC feeder road had caused repeated accidents and daily gridlock. This report triggered community verification, official inspection, and a full repair within 26 days.",
        reportedOn: "Mar 2, 2026",
        resolvedOn: "Mar 28, 2026",
        timeline: [
          {
            label: "Report submitted",
            detail:
              "Citizen report filed with photo evidence and GPS location.",
            date: "Mar 2",
          },
          {
            label: "Community verified",
            detail:
              "1,843 nearby residents confirmed the issue and upvoted the report.",
            date: "Mar 6",
          },
          {
            label: "Agency assigned",
            detail:
              "AMAC Works Department opened a case and scheduled a site visit.",
            date: "Mar 11",
          },
          {
            label: "Repairs completed",
            detail:
              "Road resurfaced and reopened to traffic.",
            date: "Mar 28",
          },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
        ],
        testimonial: {
          quote:
            "We used this road every day and feared for our children. Seeing it fixed within a month restored our trust in the process.",
          name: "Resident, Abuja Municipal",
        },
      },
    },

    {
      id: "school-kubwa",
      title:
        "School Facility Restoration",
      location: "Kubwa",
      status: "Resolved",
      impact: "3,800",
      savings: "₦1.7M",
      score: "89",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
      story: {
        summary:
          "A collapsed classroom roof at a Kubwa primary school put pupils at risk during rainy season. Verified reporting pushed emergency restoration through.",
        reportedOn: "Jan 14, 2026",
        resolvedOn: "Feb 9, 2026",
        timeline: [
          {
            label: "Report submitted",
            detail:
              "Parent-teacher association filed a structural hazard report.",
            date: "Jan 14",
          },
          {
            label: "Community verified",
            detail:
              "612 local guardians confirmed the risk.",
            date: "Jan 17",
          },
          {
            label: "Agency assigned",
            detail:
              "SUBEB flagged the school for emergency works.",
            date: "Jan 24",
          },
          {
            label: "Repairs completed",
            detail:
              "Roof rebuilt ahead of the new term.",
            date: "Feb 9",
          },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
        ],
        testimonial: {
          quote:
            "Our pupils can finally sit through a rainy day without moving desks across the room.",
          name: "Headteacher, Kubwa Primary",
        },
      },
    },

    {
      id: "water-lugbe",
      title:
        "Community Water Access",
      location: "Lugbe",
      status: "Completed",
      impact: "8,200",
      savings: "₦2.8M",
      score: "91",
      image:
        "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&q=80",
      story: {
        summary:
          "A borehole serving three Lugbe streets had been non-functional for months, forcing residents to walk over a kilometre for water. Citizen escalation restored access within weeks.",
        reportedOn: "Apr 18, 2026",
        resolvedOn: "May 12, 2026",
        timeline: [
          {
            label: "Report submitted",
            detail:
              "Broken borehole reported with usage history.",
            date: "Apr 18",
          },
          {
            label: "Community verified",
            detail:
              "1,205 residents confirmed the outage.",
            date: "Apr 22",
          },
          {
            label: "Agency assigned",
            detail:
              "FCT Water Board scheduled a repair crew.",
            date: "Apr 30",
          },
          {
            label: "Access restored",
            detail:
              "Pump repaired and water flow tested by residents.",
            date: "May 12",
          },
        ],
        gallery: [
          "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80",
          "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=800&q=80",
          "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=800&q=80",
        ],
        testimonial: {
          quote:
            "My daughters used to miss school to fetch water. Now that time goes back to their studies.",
          name: "Resident, Lugbe",
        },
      },
    },
  ];

  const [downloadState, setDownloadState] =
    useState("idle"); // idle | loading | done
  const [
    downloadProgress,
    setDownloadProgress,
  ] = useState(0);
  const [shareOpen, setShareOpen] =
    useState(false);
  const [copied, setCopied] =
    useState(false);
  const downloadTimer = useRef(null);

  const resetActionState = () => {
    setDownloadState("idle");
    setDownloadProgress(0);
    setShareOpen(false);
    setCopied(false);
  };

  const openStory = (project) => {
    resetActionState();
    setActiveStory(project);
  };

  const closeStory = () => {
    setActiveStory(null);
    resetActionState();
  };

  // NOTE: swap this simulated timer for
  // the real PDF generation request, e.g.
  // POST /api/reports/:id/export — keep the
  // same progress/done state transitions so
  // the UI doesn't need to change.
  const handleDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("loading");
    const start = Date.now();
    const duration = 1400;

    const tick = () => {
      const elapsed =
        Date.now() - start;
      const pct = Math.min(
        100,
        Math.round(
          (elapsed / duration) * 100
        )
      );
      setDownloadProgress(pct);

      if (pct < 100) {
        downloadTimer.current =
          requestAnimationFrame(tick);
      } else {
        setDownloadState("done");
        setTimeout(() => {
          setDownloadState("idle");
          setDownloadProgress(0);
        }, 2200);
      }
    };

    downloadTimer.current =
      requestAnimationFrame(tick);
  };

  const handleCopyLink = () => {
    const url = `https://nationaura.app/reports/${
      activeStory?.id ?? ""
    }`;
    if (
      navigator?.clipboard?.writeText
    ) {
      navigator.clipboard
        .writeText(url)
        .catch(() => {});
    }
    setCopied(true);
    setTimeout(
      () => setCopied(false),
      1800
    );
  };

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
                key={project.id}
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
                    onClick={() =>
                      openStory(project)
                    }
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
                      transition-transform
                      active:scale-[0.98]
                      hover:bg-green-600
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

      {/* IMPACT STORY MODAL */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeStory}
            className="
              fixed
              inset-0
              z-50
              flex
              items-end
              sm:items-center
              justify-center
              bg-black/60
              backdrop-blur-sm
              p-0
              sm:p-4
              md:p-6
            "
          >
            <motion.div
              key="modal"
              onClick={(e) =>
                e.stopPropagation()
              }
              initial={{
                y: "100%",
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: "100%",
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className={`
                relative
                w-full
                sm:max-w-xl
                lg:max-w-2xl
                max-h-[85vh]
                sm:max-h-[80vh]
                overflow-y-auto
                overflow-x-hidden
                border
                ${
                  darkMode
                    ? "bg-[#0A1220] border-white/10 text-white"
                    : "bg-white border-gray-200 text-black"
                }
              `}
            >
              {/* drag handle, mobile only */}
              <div
                className="
                  sm:hidden
                  w-10
                  h-1.5
                  bg-white/20
                  mx-auto
                  mt-3
                "
              />

              {/* hero image */}
              <div className="relative h-36 sm:h-44 lg:h-48 w-full overflow-hidden">
                <img
                  src={
                    activeStory.image
                  }
                  alt={
                    activeStory.title
                  }
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/10
                    to-transparent
                  "
                />

                <button
                  onClick={closeStory}
                  aria-label="Close impact story"
                  className="
                    absolute
                    top-3
                    right-3
                    w-7
                    h-7
                    flex
                    items-center
                    justify-center
                    bg-black/40
                    text-white
                    hover:bg-black/60
                    transition-colors
                  "
                >
                  <FiX size={14} />
                </button>

                <div className="absolute bottom-3 left-4 right-11 sm:right-12">
                  <span
                    className="
                      inline-block
                      px-3
                      py-1
                      bg-green-500
                      text-white
                      text-xs
                      font-bold
                    "
                  >
                    {activeStory.status}
                  </span>

                  <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                    {activeStory.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-green-300">
                    <FiMapPin />
                    {activeStory.location}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {/* stat strip */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Impacted",
                      value:
                        activeStory.impact,
                    },
                    {
                      label: "Savings",
                      value:
                        activeStory.savings,
                    },
                    {
                      label: "Score",
                      value:
                        activeStory.score,
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          0.1 +
                          i * 0.06,
                      }}
                      className={`
                        p-3
                        border
                        text-center
                        ${
                          darkMode
                            ? "bg-white/[0.03] border-white/10"
                            : "bg-[#F8FAF9] border-gray-200"
                        }
                      `}
                    >
                      <p className="text-[10px] uppercase tracking-wider text-green-500 font-bold">
                        {s.label}
                      </p>
                      <p className="mt-1 text-lg font-black">
                        {s.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* summary */}
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                  className={`
                    mt-5
                    leading-relaxed
                    ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }
                  `}
                >
                  {
                    activeStory.story
                      .summary
                  }
                </motion.p>

                <div
                  className={`
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-xs
                    ${
                      darkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }
                  `}
                >
                  <FiCalendar />
                  Reported{" "}
                  {
                    activeStory.story
                      .reportedOn
                  }{" "}
                  &middot; Resolved{" "}
                  {
                    activeStory.story
                      .resolvedOn
                  }
                </div>

                {/* timeline */}
                <h4 className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-green-500">
                  Verification Journey
                </h4>

                <div className="mt-4 relative pl-6">
                  <div
                    className={`
                      absolute
                      left-[7px]
                      top-1
                      bottom-1
                      w-[2px]
                      ${
                        darkMode
                          ? "bg-white/10"
                          : "bg-gray-200"
                      }
                    `}
                  />

                  {activeStory.story.timeline.map(
                    (step, i) => (
                      <motion.div
                        key={
                          step.label
                        }
                        initial={{
                          opacity: 0,
                          x: -8,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.2 +
                            i * 0.08,
                        }}
                        className="relative pb-6 last:pb-0"
                      >
                        <div
                          className="
                            absolute
                            -left-6
                            top-0.5
                            w-4
                            h-4
                            bg-green-500
                            flex
                            items-center
                            justify-center
                            ring-4
                            ring-green-500/20
                          "
                        >
                          <FiCheckCircle
                            className="text-white"
                            size={10}
                          />
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <p className="font-bold text-sm">
                            {
                              step.label
                            }
                          </p>
                          <span className="text-xs text-green-500 font-bold whitespace-nowrap">
                            {
                              step.date
                            }
                          </span>
                        </div>

                        <p
                          className={`
                            mt-1
                            text-sm
                            leading-relaxed
                            ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                          `}
                        >
                          {
                            step.detail
                          }
                        </p>
                      </motion.div>
                    )
                  )}
                </div>

                {/* gallery */}
                <h4 className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-green-500">
                  Evidence Gallery
                </h4>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {activeStory.story.gallery.map(
                    (img, i) => (
                      <motion.img
                        key={i}
                        src={img}
                        alt={`${activeStory.title} evidence ${i + 1}`}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay:
                            0.25 +
                            i * 0.06,
                        }}
                        className="h-24 sm:h-28 lg:h-32 w-full object-cover"
                      />
                    )
                  )}
                </div>

                {/* testimonial */}
                <div
                  className={`
                    mt-6
                    border-l-4
                    border-green-500
                    pl-4
                    py-1
                  `}
                >
                  <p
                    className={`
                      italic
                      leading-relaxed
                      ${
                        darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }
                    `}
                  >
                    "
                    {
                      activeStory.story
                        .testimonial
                        .quote
                    }
                    "
                  </p>
                  <p className="mt-2 text-xs font-bold text-green-500">
                    {
                      activeStory.story
                        .testimonial
                        .name
                    }
                  </p>
                </div>

                {/* actions */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  {/* SHARE — expands into a social row */}
                  <div className="flex-1 relative">
                    <AnimatePresence
                      mode="wait"
                      initial={false}
                    >
                      {!shareOpen ? (
                        <motion.button
                          key="share-collapsed"
                          onClick={() =>
                            setShareOpen(
                              true
                            )
                          }
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
                            duration: 0.15,
                          }}
                          className="
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            py-3
                            bg-green-500
                            text-white
                            font-bold
                            hover:bg-green-600
                            transition-colors
                            active:scale-[0.98]
                          "
                        >
                          <FiShare2 />
                          Share Story
                        </motion.button>
                      ) : (
                        <motion.div
                          key="share-expanded"
                          initial={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.16,
                          }}
                          className={`
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-2
                            py-2.5
                            border
                            ${
                              darkMode
                                ? "border-white/15 bg-white/[0.04]"
                                : "border-gray-200 bg-[#F8FAF9]"
                            }
                          `}
                        >
                          {[
                            {
                              icon: (
                                <FaWhatsapp
                                  size={
                                    15
                                  }
                                />
                              ),
                              label:
                                "WhatsApp",
                            },
                            {
                              icon: (
                                <FaXTwitter
                                  size={
                                    15
                                  }
                                />
                              ),
                              label:
                                "X",
                            },
                            {
                              icon: (
                                <FaFacebookF
                                  size={
                                    15
                                  }
                                />
                              ),
                              label:
                                "Facebook",
                            },
                          ].map(
                            (
                              item,
                              i
                            ) => (
                              <motion.button
                                key={
                                  item.label
                                }
                                aria-label={`Share on ${item.label}`}
                                initial={{
                                  opacity: 0,
                                  y: 6,
                                  scale: 0.8,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                }}
                                transition={{
                                  delay:
                                    0.04 +
                                    i *
                                      0.05,
                                }}
                                className="
                                  w-9
                                  h-9
                                  flex
                                  items-center
                                  justify-center
                                  bg-green-500
                                  text-white
                                  hover:bg-green-600
                                  transition-colors
                                  active:scale-90
                                "
                              >
                                {
                                  item.icon
                                }
                              </motion.button>
                            )
                          )}

                          <motion.button
                            onClick={
                              handleCopyLink
                            }
                            aria-label="Copy link"
                            initial={{
                              opacity: 0,
                              y: 6,
                              scale: 0.8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}
                            transition={{
                              delay: 0.19,
                            }}
                            className={`
                              w-9
                              h-9
                              flex
                              items-center
                              justify-center
                              border
                              transition-colors
                              active:scale-90
                              ${
                                darkMode
                                  ? "border-white/15 text-white hover:bg-white/10"
                                  : "border-gray-300 text-gray-700 hover:bg-white"
                              }
                            `}
                          >
                            {copied ? (
                              <FiCheck
                                size={
                                  15
                                }
                              />
                            ) : (
                              <FiLink
                                size={
                                  15
                                }
                              />
                            )}
                          </motion.button>

                          <motion.button
                            onClick={() =>
                              setShareOpen(
                                false
                              )
                            }
                            aria-label="Close share options"
                            initial={{
                              opacity: 0,
                            }}
                            animate={{
                              opacity: 1,
                            }}
                            transition={{
                              delay: 0.24,
                            }}
                            className={`
                              ml-1
                              transition-colors
                              ${
                                darkMode
                                  ? "text-gray-400 hover:text-white"
                                  : "text-gray-500 hover:text-black"
                              }
                            `}
                          >
                            <FiX
                              size={
                                16
                              }
                            />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          className="
                            absolute
                            -top-6
                            left-1/2
                            -translate-x-1/2
                            text-xs
                            font-bold
                            text-green-500
                            whitespace-nowrap
                          "
                        >
                          Link copied
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* DOWNLOAD — live progress fill */}
                  <button
                    onClick={
                      handleDownload
                    }
                    disabled={
                      downloadState !==
                      "idle"
                    }
                    className={`
                      relative
                      flex-1
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      font-bold
                      border
                      transition-colors
                      active:scale-[0.98]
                      ${
                        darkMode
                          ? "border-white/15 hover:bg-white/5"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-green-500/25"
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${downloadProgress}%`,
                      }}
                      transition={{
                        ease: "linear",
                        duration: 0.08,
                      }}
                    />

                    <span className="relative flex items-center gap-2">
                      {downloadState ===
                      "done" ? (
                        <>
                          <FiCheck />
                          Downloaded
                        </>
                      ) : downloadState ===
                        "loading" ? (
                        <>
                          Preparing
                          PDF...{" "}
                          {
                            downloadProgress
                          }
                          %
                        </>
                      ) : (
                        <>
                          <FiDownload />
                          Download
                          Report
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProfileImpactPortfolio;