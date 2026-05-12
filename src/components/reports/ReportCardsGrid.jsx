import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiMapPin,
  FiCalendar,
  FiCpu,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
  FiActivity,
  FiEdit3,
  FiTrash2,
  FiX,
  FiSave,
  FiFileText,
  FiImage,
  FiArrowUpRight,
} from "react-icons/fi";

const initialReports = [
  {
    id: 1,

    title:
      "Collapsed Drainage Blocking Main Road",

    description:
      "Heavy drainage collapse is causing traffic congestion and dangerous flooding during rainfall.",

    location:
      "Wuse 2, Abuja",

    date:
      "Submitted • 2 May 2026",

    status:
      "Recently Submitted",

    progress: 8,

    ai: "96%",

    severity:
      "High Priority",

    editable: true,

    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,

    title:
      "Broken Streetlights Across Junction",

    description:
      "Multiple streetlights are damaged causing dangerous night visibility for drivers.",

    location:
      "Jabi, Abuja",

    date:
      "Submitted • 7 May 2026",

    status:
      "Under Review",

    progress: 18,

    ai: "88%",

    severity:
      "Medium Priority",

    editable: true,

    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
 {
  id: 3,

  title:
    "Bridge Cracks Endangering Daily Commuters",

  description:
    "Residents reported visible structural cracks and weakened concrete on a busy pedestrian bridge causing serious public safety concerns.",

  location:
    "Garki, Abuja",

  date:
    "Submitted • 10 May 2026",

  status:
    "AI Priority Escalated",

  progress: 54,

  ai: "97%",

  severity:
    "Critical Infrastructure",

  editable: false,

  image:
    "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?q=80&w=1200&auto=format&fit=crop",
},
  {
    id: 4,

    title:
      "Dangerous Road Crack Near Market",

    description:
      "Large road crack expanding daily near busy market area causing transportation risk and traffic disruption.",

    location:
      "Garki, Abuja",

    date:
      "Submitted • 10 May 2026",

    status:
      "AI Investigating",

    progress: 46,

    ai: "94%",

    severity:
      "Urgent Attention",

    editable: true,

    image:
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=1200&auto=format&fit=crop",
  },
];

const ReportCardsGrid = ({
  darkMode,
}) => {
  const [reports, setReports] =
    useState(initialReports);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      location: "",
      description: "",
    });

  /* DELETE */
  const handleDeleteClick = (
    report
  ) => {
    setSelectedReport(report);

    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setReports(
      reports.filter(
        (item) =>
          item.id !==
          selectedReport.id
      )
    );

    setShowDeleteModal(false);
  };

  /* EDIT */
  const handleEdit = (
    report
  ) => {
    setSelectedReport(report);

    setFormData({
      title: report.title,

      location:
        report.location,

      description:
        report.description,
    });

    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setReports(
      reports.map((item) =>
        item.id ===
        selectedReport.id
          ? {
              ...item,

              title:
                formData.title,

              location:
                formData.location,

              description:
                formData.description,
            }
          : item
      )
    );

    setShowEditModal(false);
  };

  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="
        absolute
        inset-0
        pointer-events-none
        "
      >
        <div
          className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-green-200/40
          blur-[160px]
          "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          w-[400px]
          h-[400px]
          bg-green-100/60
          blur-[140px]
          "
        />
      </div>

      {/* HEADER */}
      <div
        className="
        relative
        z-10
        flex
        flex-col
        2xl:flex-row
        2xl:items-end
        2xl:justify-between
        gap-8
        mb-12
        "
      >
        {/* LEFT */}
        <div className="max-w-4xl">
          <div
            className="
            inline-flex
            items-center
            gap-3
            px-5
            py-3
            bg-white
            border
            border-green-100
            mb-6
            shadow-sm
            "
          >
            <FiActivity className="text-green-500" />

            <span
              className="
              text-xs
              sm:text-sm
              font-black
              uppercase
              tracking-[0.25em]
              text-green-700
              "
            >
              AI Civic Monitoring
            </span>
          </div>

          <h2
            className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-black
            leading-[0.95]
            tracking-tight
            text-black
            "
          >
            Reports Building{" "}

            <span
              className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-green-400
              via-green-500
              to-green-300
              "
            >
              Smarter Cities
            </span>
          </h2>

          <p
            className="
            mt-6
            text-base
            sm:text-lg
            lg:text-xl
            leading-relaxed
            text-black/60
            max-w-3xl
            "
          >
            Every citizen report strengthens
            transparency, helps communities
            get faster attention, and gives
            governments real-time insight
            into infrastructure problems
            across Nigeria.
          </p>
        </div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{ once: true }}
          className="
          relative
          overflow-hidden
          bg-white
          border
          border-green-100
          p-6
          sm:p-8
          shadow-[0_20px_60px_rgba(34,197,94,0.12)]
          min-w-full
          sm:min-w-[420px]
          "
        >
          <div
            className="
            absolute
            top-0
            right-0
            w-40
            h-40
            bg-green-200/50
            blur-[100px]
            "
          />

          <div
            className="
            relative
            z-10
            flex
            items-center
            gap-5
            "
          >
            <div
              className="
              w-16
              h-16
              sm:w-20
              sm:h-20
              bg-gradient-to-br
              from-green-400
              to-green-500
              text-white
              flex
              items-center
              justify-center
              text-3xl
              shadow-xl
              shadow-green-300/40
              "
            >
              <FiTrendingUp />
            </div>

            <div>
              <h3
                className="
                text-5xl
                sm:text-6xl
                font-black
                text-green-500
                leading-none
                "
              >
                78%
              </h3>

              <p
                className="
                mt-2
                text-sm
                sm:text-base
                text-black/60
                "
              >
                Government Response Rate
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* GRID */}
      <div
        className="
        relative
        z-10
        grid
        grid-cols-1
        md:grid-cols-2
        2xl:grid-cols-3
        gap-6
        xl:gap-8
        "
      >
        {reports.map(
          (
            report,
            index
          ) => (
            <motion.div
              key={report.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay:
                  index * 0.08,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -10,
              }}
              className="
              group
              relative
              overflow-hidden
              bg-white
              border
              border-green-100
              shadow-[0_20px_60px_rgba(34,197,94,0.08)]
              transition-all
              duration-500
              "
            >
              {/* GLOW */}
              <div
                className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-700
                bg-gradient-to-br
                from-green-50
                via-white
                to-green-100
                "
              />

              {/* IMAGE */}
              <div className="relative h-[260px] sm:h-[320px] overflow-hidden">
                <motion.img
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  src={
                    report.image
                  }
                  alt={
                    report.title
                  }
                  className="
                  w-full
                  h-full
                  object-cover
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/30
                  to-transparent
                  "
                />

                {/* AI */}
                <div
                  className="
                  absolute
                  top-4
                  left-4
                  "
                >
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    bg-white
                    border
                    border-green-100
                    shadow-lg
                    "
                  >
                    <div
                      className="
                      w-2
                      h-2
                      bg-green-400
                      animate-pulse
                      "
                    />

                    <FiCpu className="text-green-500" />

                    <span
                      className="
                      text-sm
                      font-black
                      text-black
                      "
                    >
                      AI{" "}
                      {
                        report.ai
                      }
                    </span>
                  </div>
                </div>

                {/* STATUS */}
                <div
                  className="
                  absolute
                  top-4
                  right-4
                  "
                >
                  <div
                    className="
                    px-4
                    py-2
                    bg-green-400
                    text-white
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.15em]
                    "
                  >
                    {
                      report.status
                    }
                  </div>
                </div>

                {/* TITLE */}
                <div
                  className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                  sm:p-7
                  "
                >
                  <div
                    className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    bg-white/90
                    border
                    border-green-100
                    mb-5
                    "
                  >
                    <FiAlertTriangle className="text-green-500" />

                    <span
                      className="
                      text-[11px]
                      font-black
                      uppercase
                      tracking-[0.15em]
                      text-green-700
                      "
                    >
                      {
                        report.severity
                      }
                    </span>
                  </div>

                  <h3
                    className="
                    text-2xl
                    sm:text-3xl
                    font-black
                    text-white
                    leading-tight
                    "
                  >
                    {
                      report.title
                    }
                  </h3>
                </div>
              </div>

              {/* CONTENT */}
              <div
                className="
                relative
                z-10
                p-5
                sm:p-7
                "
              >
                {/* DESCRIPTION */}
                <p
                  className="
                  text-sm
                  sm:text-base
                  leading-relaxed
                  text-black/65
                  "
                >
                  {
                    report.description
                  }
                </p>

                {/* LOCATION */}
                <div
                  className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-5
                  mt-7
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                      w-12
                      h-12
                      bg-gradient-to-br
                      from-green-400
                      to-green-500
                      text-white
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <FiMapPin />
                    </div>

                    <div>
                      <p
                        className="
                        text-[11px]
                        uppercase
                        tracking-[0.18em]
                        text-black/40
                        "
                      >
                        Location
                      </p>

                      <h4 className="font-black text-sm sm:text-base">
                        {
                          report.location
                        }
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-green-500" />

                    <span
                      className="
                      text-sm
                      text-black/60
                      "
                    >
                      {
                        report.date
                      }
                    </span>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FiClock className="text-green-500" />

                      <span
                        className="
                        text-sm
                        text-black/60
                        "
                      >
                        Government Response
                      </span>
                    </div>

                    <span
                      className="
                      text-xl
                      font-black
                      text-green-500
                      "
                    >
                      {
                        report.progress
                      }
                      %
                    </span>
                  </div>

                  {/* BAR */}
                  <div
                    className="
                    relative
                    h-3
                    overflow-hidden
                    bg-green-100
                    "
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: `${report.progress}%`,
                      }}
                      transition={{
                        duration: 1.2,
                      }}
                      className="
                      h-full
                      bg-gradient-to-r
                      from-green-300
                      via-green-400
                      to-green-500
                      "
                    />
                  </div>
                </div>

                {/* INFO */}
                <div
                  className="
                  mt-6
                  p-4
                  border
                  border-green-100
                  bg-green-50
                  "
                >
                  <p
                    className="
                    text-sm
                    leading-relaxed
                    text-green-700
                    font-medium
                    "
                  >
                    {report.editable
                      ? "This report can still be updated before official processing begins."
                      : "Government processing already started for this report."}
                  </p>
                </div>

                {/* FOOTER */}
                <div
                  className="
                  mt-7
                  pt-6
                  border-t
                  border-green-100
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-5
                  "
                >
                  {/* VERIFIED */}
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" />

                    <span
                      className="
                      text-sm
                      text-black/60
                      "
                    >
                      Verified by AI + Citizens
                    </span>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex items-center gap-3">
                    {/* DELETE */}
                    <motion.button
                      whileHover={
                        report.editable
                          ? {
                              scale: 1.05,
                            }
                          : {}
                      }
                      whileTap={
                        report.editable
                          ? {
                              scale: 0.95,
                            }
                          : {}
                      }
                      disabled={
                        !report.editable
                      }
                      onClick={() =>
                        report.editable &&
                        handleDeleteClick(
                          report
                        )
                      }
                      className={`
                      w-12
                      h-12
                      border
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300

                      ${
                        report.editable
                          ? `
                          bg-green-50
                          border-green-100
                          text-green-600
                          hover:bg-green-500
                          hover:text-white
                          `
                          : `
                          bg-black/[0.03]
                          border-black/5
                          text-black/20
                          cursor-not-allowed
                          `
                      }
                      `}
                    >
                      <FiTrash2 />
                    </motion.button>

                    {/* EDIT */}
                    <motion.button
                      whileHover={
                        report.editable
                          ? {
                              scale: 1.04,
                            }
                          : {}
                      }
                      whileTap={
                        report.editable
                          ? {
                              scale: 0.95,
                            }
                          : {}
                      }
                      disabled={
                        !report.editable
                      }
                      onClick={() =>
                        report.editable &&
                        handleEdit(
                          report
                        )
                      }
                      className={`
                      px-5
                      py-3
                      font-black
                      flex
                      items-center
                      gap-3
                      transition-all
                      duration-300

                      ${
                        report.editable
                          ? `
                          bg-gradient-to-r
                          from-green-400
                          to-green-500
                          text-white
                          `
                          : `
                          bg-black/[0.03]
                          text-black/25
                          border
                          border-black/5
                          cursor-not-allowed
                          `
                      }
                      `}
                    >
                      {report.editable
                        ? "Edit Report"
                        : "Locked"}

                      <FiArrowUpRight />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* SIDE BAR */}
              <div
                className="
                absolute
                left-0
                top-0
                bottom-0
                w-[4px]
                bg-gradient-to-b
                from-green-300
                via-green-400
                to-green-500
                "
              />
            </motion.div>
          )
        )}
      </div>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
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
            className="
            fixed
            inset-0
            z-[999]
            bg-black/70
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-4
            "
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="
              w-full
              max-w-md
              bg-white
              border
              border-green-100
              p-8
              "
            >
              <h3
                className="
                text-3xl
                font-black
                mb-4
                "
              >
                Delete Report?
              </h3>

              <p
                className="
                text-black/60
                leading-relaxed
                "
              >
                This report will be permanently removed.
              </p>

              <div
                className="
                mt-8
                flex
                items-center
                justify-end
                gap-4
                "
              >
                <button
                  onClick={() =>
                    setShowDeleteModal(
                      false
                    )
                  }
                  className="
                  px-5
                  py-3
                  border
                  border-green-100
                  bg-green-50
                  font-semibold
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={
                    confirmDelete
                  }
                  className="
                  px-5
                  py-3
                  bg-green-500
                  text-white
                  font-black
                  "
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {showEditModal && (
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
            className="
            fixed
            inset-0
            z-[999]
            bg-black/70
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-3
            overflow-y-auto
            "
          >
            <motion.div
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
              className="
              relative
              w-full
              max-w-2xl
              bg-white
              border
              border-green-100
              "
            >
              {/* HEADER */}
              <div className="p-6 sm:p-8 border-b border-green-100">
                <button
                  onClick={() =>
                    setShowEditModal(
                      false
                    )
                  }
                  className="
                  absolute
                  top-5
                  right-5
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  text-black/60
                  "
                >
                  <FiX />
                </button>

                <div className="flex items-center gap-5">
                  <div
                    className="
                    w-16
                    h-16
                    bg-gradient-to-br
                    from-green-400
                    to-green-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-2xl
                    "
                  >
                    <FiEdit3 />
                  </div>

                  <div>
                    <h2
                      className="
                      text-3xl
                      font-black
                      "
                    >
                      Edit Report
                    </h2>

                    <p
                      className="
                      mt-2
                      text-black/60
                      "
                    >
                      Update your report details.
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* TITLE */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-black mb-3">
                    <FiFileText className="text-green-500" />

                    Report Title
                  </label>

                  <input
                    type="text"
                    value={
                      formData.title
                    }
                    onChange={(
                      e
                    ) =>
                      setFormData({
                        ...formData,
                        title:
                          e.target
                            .value,
                      })
                    }
                    className="
                    w-full
                    px-5
                    py-4
                    border
                    border-green-100
                    bg-green-50/40
                    outline-none
                    "
                  />
                </div>

                {/* LOCATION */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-black mb-3">
                    <FiMapPin className="text-green-500" />

                    Location
                  </label>

                  <input
                    type="text"
                    value={
                      formData.location
                    }
                    onChange={(
                      e
                    ) =>
                      setFormData({
                        ...formData,
                        location:
                          e.target
                            .value,
                      })
                    }
                    className="
                    w-full
                    px-5
                    py-4
                    border
                    border-green-100
                    bg-green-50/40
                    outline-none
                    "
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-black mb-3">
                    <FiImage className="text-green-500" />

                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={
                      formData.description
                    }
                    onChange={(
                      e
                    ) =>
                      setFormData({
                        ...formData,
                        description:
                          e.target
                            .value,
                      })
                    }
                    className="
                    w-full
                    px-5
                    py-4
                    border
                    border-green-100
                    bg-green-50/40
                    outline-none
                    resize-none
                    "
                  />
                </div>

                {/* BUTTONS */}
                <div
                  className="
                  flex
                  flex-col-reverse
                  sm:flex-row
                  sm:justify-end
                  gap-4
                  "
                >
                  <button
                    onClick={() =>
                      setShowEditModal(
                        false
                      )
                    }
                    className="
                    px-6
                    py-4
                    border
                    border-green-100
                    bg-green-50
                    font-bold
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      handleSaveEdit
                    }
                    className="
                    px-6
                    py-4
                    bg-gradient-to-r
                    from-green-400
                    to-green-500
                    text-white
                    font-black
                    flex
                    items-center
                    justify-center
                    gap-3
                    "
                  >
                    Save Changes

                    <FiSave />
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

export default ReportCardsGrid;