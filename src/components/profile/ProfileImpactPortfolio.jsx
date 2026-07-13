import { useState, useRef, useEffect, useCallback } from "react";
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
  FiFileText,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

import { getMyReports } from "../../utils/api";

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const daysBetween = (startIso, endIso) => {
  if (!startIso || !endIso) return null;
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
};

// Build the real "Verification Journey" for a report from data we actually
// have (createdAt, current confirmations vs required, updatedAt for
// resolved reports) — no fabricated intermediate dates or agency names,
// since there's no status-history table logging when each stage happened.
const buildTimeline = (report) => {
  const steps = [
    {
      label: "Report submitted",
      detail: "Filed with photo evidence and location.",
      date: formatDate(report.createdAt),
    },
    {
      label: "Community verified",
      detail: `${report.confirmations} of ${report.requiredConfirmations} required citizen confirmations received.`,
      date: null, // exact verification date isn't tracked — only the running total is
    },
  ];

  if (report.status === "Resolved") {
    steps.push({
      label: "Issue resolved",
      detail: "Confirmed fixed by the community.",
      date: formatDate(report.updatedAt),
    });
  }

  return steps;
};

const ProfileImpactPortfolio = ({
  darkMode,
}) => {
  const [activeStory, setActiveStory] =
    useState(null);

  // ── Live personal data — real resolved reports only. No fabricated
  // testimonials (no feedback/testimonial system exists in the schema —
  // that section is removed rather than replaced with invented quotes). ──
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyReports();
      setMyReports(data.reports || []);
    } catch (e) {
      setMyReports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const resolvedReports = myReports
    .filter((r) => r.status === "Resolved")
    .map((r) => ({
      ...r,
      scoreNum: parseInt(r.score, 10) || 0,
      daysToResolve: daysBetween(r.createdAt, r.updatedAt),
      gallery: r.images && r.images.length > 0 ? r.images : r.image ? [r.image] : [],
    }))
    .sort((a, b) => b.scoreNum - a.scoreNum); // highest AI score first

  const featured = resolvedReports[0] || null;

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

  const openStory = (report) => {
    resetActionState();
    setActiveStory(report);
  };

  const closeStory = () => {
    setActiveStory(null);
    resetActionState();
  };

  // NOTE: this is still a simulated progress bar, not a real PDF export —
  // there's no backend endpoint that generates one yet (e.g.
  // POST /api/reports/:id/export). Flagging this explicitly rather than
  // pretending it produces a real file. Wire this up to a real request
  // once that endpoint exists; the progress/done state transitions here
  // are already shaped to drop straight into that flow.
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

  const shareUrl = `https://nationaura.app/reports/${activeStory?.reportId ?? ""}`;
  const shareText = activeStory ? `${activeStory.title} — verified by citizens on NationAura` : "";

  const handleShareClick = (platform) => {
    let url = "";
    if (platform === "whatsapp") {
      url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    } else if (platform === "x") {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (platform === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    if (
      navigator?.clipboard?.writeText
    ) {
      navigator.clipboard
        .writeText(shareUrl)
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
            These are your reports that reached resolution — verified by citizens
            and acted on, one real record at a time.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className={`mt-8 border p-8 text-center animate-pulse ${darkMode ? "border-white/10" : "border-gray-200"}`}>
            <p className={darkMode ? "text-gray-500" : "text-gray-400"}>Loading your resolved reports...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && resolvedReports.length === 0 && (
          <div className={`mt-8 border p-8 text-center ${darkMode ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50"}`}>
            <FiFileText className="mx-auto text-green-500" size={22} />
            <p className={`mt-3 text-lg font-black ${darkMode ? "text-white" : "text-black"}`}>
              No Resolved Reports Yet
            </p>
            <p className={`mt-2 text-sm max-w-md mx-auto ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Once one of your reports is confirmed by the community and marked resolved, it'll show up here as an impact story.
            </p>
          </div>
        )}

        {!loading && featured && (
          <>
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
                  {featured.title}
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
                  {featured.description}
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
                      label: "Community Votes",
                      value: `${featured.confirmations}`,
                    },
                    {
                      label: "Impact Score",
                      value: `${featured.scoreNum}%`,
                    },
                    {
                      label: "Days to Resolve",
                      value: featured.daysToResolve !== null ? `${featured.daysToResolve}` : "—",
                    },
                    {
                      label: "Status",
                      value: "Resolved",
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
              {resolvedReports.map(
                (report) => (
                  <motion.div
                    key={report.reportId}
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
                      src={report.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"}
                      alt={report.title}
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
                          Resolved
                        </span>

                        <span
                          className="
                            text-green-500
                            font-black
                          "
                        >
                          {report.scoreNum}%
                        </span>
                      </div>

                      <h3
                        className="
                          mt-4
                          text-xl
                          font-black
                          break-words
                        "
                      >
                        {report.title}
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
                        <span className="truncate">{report.location}</span>
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
                              Votes
                            </span>
                          </div>

                          <p
                            className="
                              mt-1
                              font-black
                            "
                          >
                            {report.confirmations}
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
                              Days
                            </span>
                          </div>

                          <p
                            className="
                              mt-1
                              font-black
                            "
                          >
                            {report.daysToResolve !== null ? report.daysToResolve : "—"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          openStory(report)
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
          </>
        )}

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
                    activeStory.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
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
                    Resolved
                  </span>

                  <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight break-words">
                    {activeStory.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-green-300">
                    <FiMapPin />
                    <span className="truncate">{activeStory.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {/* stat strip */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Votes",
                      value: `${activeStory.confirmations}`,
                    },
                    {
                      label: "Score",
                      value: `${activeStory.scoreNum}%`,
                    },
                    {
                      label: "Days",
                      value: activeStory.daysToResolve !== null ? `${activeStory.daysToResolve}` : "—",
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

                {/* summary — the report's real description */}
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
                  {activeStory.description}
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
                  Reported {formatDate(activeStory.createdAt)} &middot; Resolved {formatDate(activeStory.updatedAt)}
                </div>

                {/* timeline — built from real data only */}
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

                  {buildTimeline(activeStory).map(
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
                          {step.date && (
                            <span className="text-xs text-green-500 font-bold whitespace-nowrap">
                              {
                                step.date
                              }
                            </span>
                          )}
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

                {/* gallery — this report's real uploaded evidence photos */}
                {activeStory.gallery.length > 0 && (
                  <>
                    <h4 className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-green-500">
                      Evidence Gallery
                    </h4>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {activeStory.gallery.map(
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
                  </>
                )}

                {/* NOTE: testimonial section intentionally removed — there's
                    no feedback/testimonial system in the schema, so there's
                    no real quote to show here. Fabricating one and
                    attributing it to "a resident" would be inventing
                    content, not approximating a number. */}

                {/* actions */}
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  {/* SHARE — expands into a social row, now functional */}
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
                              platform: "whatsapp",
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
                              platform: "x",
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
                              platform: "facebook",
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
                                onClick={() => handleShareClick(item.platform)}
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

                  {/* DOWNLOAD — simulated progress; not a real PDF export yet, see note above */}
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