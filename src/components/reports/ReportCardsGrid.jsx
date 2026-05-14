import { useMemo, useState } from "react";

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
  FiSearch,
  FiArrowUpRight,
  FiImage,
} from "react-icons/fi";

const initialReports = [
  {
    id: 1,
    title:
      "Collapsed Drainage Blocking Main Road",
    description:
      "Heavy drainage collapse is causing flooding and severe traffic congestion during rainfall.",
    location: "Wuse 2, Abuja",
    date: "2 May 2026",
    status: "Recently Submitted",
    progress: 12,
    ai: "96%",
    severity: "High Priority",
    editable: true,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    title:
      "Broken Streetlights Across Junction",
    description:
      "Damaged streetlights are creating dangerous night visibility for drivers and pedestrians.",
    location: "Jabi, Abuja",
    date: "7 May 2026",
    status: "Under Review",
    progress: 32,
    ai: "88%",
    severity: "Medium Priority",
    editable: true,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    title:
      "Bridge Cracks Endangering Commuters",
    description:
      "Residents reported visible structural cracks on a busy pedestrian bridge.",
    location: "Garki, Abuja",
    date: "10 May 2026",
    status: "AI Priority Escalated",
    progress: 68,
    ai: "97%",
    severity: "Critical Infrastructure",
    editable: false,
    image:
      "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 4,
    title:
      "Dangerous Road Crack Near Market",
    description:
      "Large road crack expanding near a busy market causing transportation risk.",
    location: "Garki, Abuja",
    date: "10 May 2026",
    status: "AI Investigating",
    progress: 46,
    ai: "94%",
    severity: "Urgent Attention",
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

  const [searchTerm, setSearchTerm] =
    useState("");

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

  const filteredReports =
    useMemo(() => {
      return reports.filter(
        (report) => {
          const search =
            searchTerm.toLowerCase();

          return (
            report.title
              .toLowerCase()
              .includes(search) ||
            report.location
              .toLowerCase()
              .includes(search) ||
            report.description
              .toLowerCase()
              .includes(search) ||
            report.status
              .toLowerCase()
              .includes(search)
          );
        }
      );
    }, [reports, searchTerm]);

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

  const handleEdit = (
    report
  ) => {
    setSelectedReport(report);

    setFormData({
      title: report.title,
      location: report.location,
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
    <section className="mt-10">
      {/* HEADER */}
      <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-end
        lg:justify-between
        gap-6
        mb-8
        "
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className={`
            text-[10px]
            uppercase
            tracking-[0.3em]
            font-bold
            mb-4
            ${
              darkMode
                ? "text-green-400"
                : "text-green-700"
            }
            `}
          >
            My Civic Reports
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className={`
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-black
            tracking-[-0.05em]
            leading-[1]
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Manage Your
            <span className="block text-green-500 mt-1">
              Submitted Reports
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1,
            }}
            className={`
            mt-5
            text-sm
            sm:text-base
            leading-relaxed
            max-w-xl
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
            `}
          >
            Track your submitted
            reports, edit details,
            monitor AI verification,
            and follow government
            response progress.
          </motion.p>
        </div>

        {/* SEARCH */}
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          className={`
          relative
          border
          overflow-hidden
          w-full
          lg:w-[380px]
          ${
            darkMode
              ? `
                bg-[#09131B]
                border-white/10
              `
              : `
                bg-white
                border-gray-200
              `
          }
          `}
        >
          <div
            className="
            absolute
            inset-y-0
            left-0
            w-32
            bg-green-500/10
            blur-3xl
            "
          />

          <div
            className="
            relative
            flex
            items-center
            "
          >
            <div
              className="
              pl-5
              text-green-500
              text-lg
              "
            >
              <FiSearch />
            </div>

            <input
              type="text"
              placeholder="Search your reports..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className={`
              w-full
              bg-transparent
              px-4
              py-5
              text-sm
              outline-none
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
        </motion.div>
      </div>

      {/* REPORT LIST */}
      <div className="space-y-5">
        <AnimatePresence>
          {filteredReports.map(
            (report, index) => (
              <motion.div
                key={report.id}
                layout
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                viewport={{ once: true }}
                transition={{
                  delay:
                    index * 0.08,
                }}
                whileHover={{
                  y: -4,
                }}
                className={`
                group
                border
                overflow-hidden
                transition-all
                duration-300
                ${
                  darkMode
                    ? `
                      bg-[#09131B]
                      border-white/10
                    `
                    : `
                      bg-white
                      border-gray-200
                    `
                }
                `}
              >
                <div
                  className="
                  grid
                  grid-cols-1
                  xl:grid-cols-[340px_1fr]
                  "
                >
                  {/* IMAGE */}
                  <div className="relative h-[260px] xl:h-full overflow-hidden">
                    <img
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
                      transition-transform
                      duration-700
                      group-hover:scale-105
                      "
                    />

                    <div
                      className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/20
                      to-transparent
                      "
                    />

                    <div className="absolute bottom-0 left-0 p-5 w-full">
                      <div
                        className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        bg-green-500
                        text-white
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        mb-4
                        "
                      >
                        <FiImage />
                        Evidence Uploaded
                      </div>

                      <h3 className="text-white text-2xl font-black leading-tight">
                        {
                          report.title
                        }
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 sm:p-7">
                    {/* TOP */}
                    <div
                      className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-start
                      lg:justify-between
                      gap-5
                      "
                    >
                      <div>
                        <div
                          className="
                          flex
                          flex-wrap
                          items-center
                          gap-4
                          "
                        >
                          <div
                            className={`
                            inline-flex
                            items-center
                            gap-2
                            px-3
                            py-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.15em]
                            border
                            ${
                              darkMode
                                ? `
                                  bg-green-500/10
                                  border-green-500/20
                                  text-green-400
                                `
                                : `
                                  bg-green-50
                                  border-green-200
                                  text-green-700
                                `
                            }
                            `}
                          >
                            <FiCheckCircle />
                            {
                              report.status
                            }
                          </div>

                          <div
                            className={`
                            flex
                            items-center
                            gap-2
                            text-sm
                            ${
                              darkMode
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                            `}
                          >
                            <FiMapPin />
                            {
                              report.location
                            }
                          </div>
                        </div>

                        <p
                          className={`
                          mt-5
                          max-w-2xl
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
                            report.description
                          }
                        </p>
                      </div>

                      {/* AI */}
                      <div
                        className={`
                        border
                        p-4
                        min-w-[180px]
                        ${
                          darkMode
                            ? `
                              bg-white/[0.03]
                              border-white/10
                            `
                            : `
                              bg-[#FAFAFA]
                              border-gray-200
                            `
                        }
                        `}
                      >
                        <p
                          className={`
                          text-[10px]
                          uppercase
                          tracking-[0.2em]
                          ${
                            darkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }
                          `}
                        >
                          AI Verification
                        </p>

                        <h4
                          className={`
                          mt-3
                          text-4xl
                          font-black
                          ${
                            darkMode
                              ? "text-white"
                              : "text-black"
                          }
                          `}
                        >
                          {report.ai}
                        </h4>

                        <p className="mt-2 text-green-500 text-sm font-semibold">
                          Detection Accuracy
                        </p>
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="mt-7 flex flex-wrap gap-3">
                      {[
                        report.severity,
                        "AI Verified",
                        "Photo Evidence",
                        "Location Tagged",
                      ].map(
                        (
                          field,
                          i
                        ) => (
                          <div
                            key={i}
                            className={`
                            px-4
                            py-3
                            border
                            text-sm
                            font-medium
                            ${
                              darkMode
                                ? `
                                  bg-white/[0.03]
                                  border-white/10
                                  text-gray-300
                                `
                                : `
                                  bg-[#FAFAFA]
                                  border-gray-200
                                  text-gray-700
                                `
                            }
                            `}
                          >
                            {field}
                          </div>
                        )
                      )}
                    </div>

                    {/* PROGRESS */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`
                          flex
                          items-center
                          gap-2
                          text-sm
                          ${
                            darkMode
                              ? "text-gray-400"
                              : "text-gray-600"
                          }
                          `}
                        >
                          <FiClock />
                          Government Response
                        </div>

                        <span className="text-green-500 font-bold text-sm">
                          {
                            report.progress
                          }
                          %
                        </span>
                      </div>

                      <div
                        className={`
                        h-3
                        overflow-hidden
                        ${
                          darkMode
                            ? "bg-white/10"
                            : "bg-gray-200"
                        }
                        `}
                      >
                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: `${report.progress}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          className="h-full bg-green-500"
                        />
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div
                      className="
                      mt-8
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-5
                      "
                    >
                      <div
                        className={`
                        flex
                        items-center
                        gap-2
                        text-sm
                        ${
                          darkMode
                            ? "text-gray-500"
                            : "text-gray-500"
                        }
                        `}
                      >
                        <FiCalendar />
                        Submitted •{" "}
                        {report.date}
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* DELETE */}
                        <motion.button
                          whileTap={{
                            scale: 0.95,
                          }}
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
                          h-14
                          w-14
                          border
                          flex
                          items-center
                          justify-center
                          transition-all
                          duration-300
                          ${
                            report.editable
                              ? `
                                bg-red-500/10
                                border-red-500/20
                                text-red-500
                                hover:bg-red-500
                                hover:text-white
                              `
                              : `
                                bg-gray-500/10
                                border-gray-500/10
                                text-gray-500
                                cursor-not-allowed
                              `
                          }
                          `}
                        >
                          <FiTrash2 />
                        </motion.button>

                        {/* EDIT */}
                        <motion.button
                          whileHover={{
                            scale: 1.02,
                          }}
                          whileTap={{
                            scale: 0.98,
                          }}
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
                          h-14
                          px-6
                          transition-all
                          duration-300
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          flex
                          items-center
                          justify-center
                          gap-3
                          flex-1
                          sm:flex-none
                          ${
                            report.editable
                              ? `
                                bg-green-500
                                hover:bg-green-400
                                text-white
                              `
                              : `
                                bg-gray-500/10
                                text-gray-500
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
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* EMPTY */}
      {filteredReports.length ===
        0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={`
          mt-10
          border
          p-10
          text-center
          ${
            darkMode
              ? `
                bg-[#09131B]
                border-white/10
              `
              : `
                bg-white
                border-gray-200
              `
          }
          `}
        >
          <div
            className="
            mx-auto
            w-20
            h-20
            bg-green-500
            text-white
            flex
            items-center
            justify-center
            text-3xl
            mb-6
            "
          >
            <FiSearch />
          </div>

          <h3
            className={`
            text-3xl
            font-black
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            No Reports Found
          </h3>

          <p
            className={`
            mt-4
            max-w-lg
            mx-auto
            leading-relaxed
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
            `}
          >
            Try searching with a
            different report title,
            location, or status.
          </p>
        </motion.div>
      )}

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
              className={`
              w-full
              max-w-md
              p-8
              ${
                darkMode
                  ? `
                    bg-[#09131B]
                    border
                    border-white/10
                  `
                  : "bg-white"
              }
              `}
            >
              <h3
                className={`
                text-3xl
                font-black
                mb-4
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                Delete Report?
              </h3>

              <p
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
              >
                This report will be
                permanently removed.
              </p>

              <div
                className="
                mt-8
                flex
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
                  className={`
                  px-5
                  py-3
                  font-semibold
                  ${
                    darkMode
                      ? `
                        bg-white/5
                        border
                        border-white/10
                        text-white
                      `
                      : `
                        border
                        border-gray-200
                        bg-gray-100
                      `
                  }
                  `}
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
                  bg-red-500
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
            p-4
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
              className={`
              relative
              w-full
              max-w-2xl
              ${
                darkMode
                  ? `
                    bg-[#09131B]
                    border
                    border-white/10
                  `
                  : "bg-white"
              }
              `}
            >
              <div
                className={`
                p-6
                sm:p-8
                border-b
                ${
                  darkMode
                    ? "border-white/10"
                    : "border-gray-200"
                }
                `}
              >
                <button
                  onClick={() =>
                    setShowEditModal(
                      false
                    )
                  }
                  className={`
                  absolute
                  top-5
                  right-5
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  ${
                    darkMode
                      ? "text-gray-400"
                      : "text-black/60"
                  }
                  `}
                >
                  <FiX />
                </button>

                <div className="flex items-center gap-4">
                  <div
                    className="
                    w-14
                    h-14
                    bg-green-500
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xl
                    "
                  >
                    <FiEdit3 />
                  </div>

                  <div>
                    <h2
                      className={`
                      text-3xl
                      font-black
                      ${
                        darkMode
                          ? "text-white"
                          : "text-black"
                      }
                      `}
                    >
                      Edit Report
                    </h2>

                    <p
                      className={`mt-1 ${
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      Update report
                      details.
                    </p>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <label
                    className={`
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-black
                    mb-3
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    <FiFileText className="text-green-500" />
                    Report Title
                  </label>

                  <input
                    type="text"
                    value={
                      formData.title
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title:
                          e.target
                            .value,
                      })
                    }
                    className={`
                    w-full
                    px-5
                    py-4
                    outline-none
                    border
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                          text-white
                        `
                        : `
                          bg-gray-50
                          border-gray-200
                          text-black
                        `
                    }
                    `}
                  />
                </div>

                <div>
                  <label
                    className={`
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-black
                    mb-3
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    <FiMapPin className="text-green-500" />
                    Location
                  </label>

                  <input
                    type="text"
                    value={
                      formData.location
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location:
                          e.target
                            .value,
                      })
                    }
                    className={`
                    w-full
                    px-5
                    py-4
                    outline-none
                    border
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                          text-white
                        `
                        : `
                          bg-gray-50
                          border-gray-200
                          text-black
                        `
                    }
                    `}
                  />
                </div>

                <div>
                  <label
                    className={`
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-black
                    mb-3
                    ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }
                    `}
                  >
                    <FiFileText className="text-green-500" />
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={
                      formData.description
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description:
                          e.target
                            .value,
                      })
                    }
                    className={`
                    w-full
                    px-5
                    py-4
                    outline-none
                    resize-none
                    border
                    ${
                      darkMode
                        ? `
                          bg-white/[0.03]
                          border-white/10
                          text-white
                        `
                        : `
                          bg-gray-50
                          border-gray-200
                          text-black
                        `
                    }
                    `}
                  />
                </div>

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
                    className={`
                    px-6
                    py-4
                    font-bold
                    ${
                      darkMode
                        ? `
                          bg-white/5
                          border
                          border-white/10
                          text-white
                        `
                        : `
                          border
                          border-gray-200
                          bg-gray-100
                        `
                    }
                    `}
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
                    bg-green-500
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