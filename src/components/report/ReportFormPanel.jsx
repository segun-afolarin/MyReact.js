import { useState } from "react";

import { motion } from "framer-motion";

import { useLocation } from "react-router-dom";

import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheck,
  FiCrosshair,
  FiImage,
  FiMapPin,
  FiRadio,
  FiUploadCloud,
  FiX,
  FiZap,
} from "react-icons/fi";

const ReportFormPanel = ({
  darkMode,
  submitted,
  setSubmitted,
}) => {
  const location = useLocation();

  const preSelectedCategory =
    location.state?.selectedCategory ||
    "";

  const [category, setCategory] =
    useState(preSelectedCategory);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [detecting, setDetecting] =
    useState(false);

  const [coordinates, setCoordinates] =
    useState(null);

  const [files, setFiles] =
    useState([]);

  const [completedFields, setCompletedFields] =
    useState({
      category: !!preSelectedCategory,
      title: false,
      description: false,
      address: false,
      images: false,
    });

  const categories = [
    {
      name: "Flooding",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      name: "Bad Roads",
      color:
        "from-orange-500 to-amber-500",
    },

    {
      name: "Drain Blockage",
      color:
        "from-emerald-500 to-green-500",
    },

    {
      name: "Power Failure",
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      name: "Fire Outbreak",
      color:
        "from-red-500 to-orange-500",
    },

    {
      name: "Accident",
      color:
        "from-pink-500 to-rose-500",
    },
  ];

  const handleLocationDetection =
    () => {
      if (
        !navigator.geolocation
      ) {
        return;
      }

      setDetecting(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          setDetecting(false);
        },

        () => {
          setDetecting(false);
        }
      );
    };

  const handleImageUpload = (
    e
  ) => {
    const uploadedFiles =
      Array.from(e.target.files);

    const remainingSlots =
      3 - files.length;

    const limitedFiles =
      uploadedFiles.slice(
        0,
        remainingSlots
      );

    const updatedFiles = [
      ...files,
      ...limitedFiles,
    ];

    setFiles(updatedFiles);

    setCompletedFields((prev) => ({
      ...prev,
      images:
        updatedFiles.length > 0,
    }));
  };

  const removeImage = (
    indexToRemove
  ) => {
    const updatedFiles =
      files.filter(
        (_, index) =>
          index !== indexToRemove
      );

    setFiles(updatedFiles);

    setCompletedFields((prev) => ({
      ...prev,
      images:
        updatedFiles.length > 0,
    }));
  };

  const getUploadText = () => {
    const remaining =
      3 - files.length;

    if (remaining <= 0)
      return "Maximum Images Added";

    if (remaining === 1)
      return "Add One More Image";

    if (remaining === 2)
      return "Add Two Images";

    return "Add Up To Three Images";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  const renderCheck = (
    active
  ) => (
    <div
      className={`
      w-7
      h-7
      border
      flex
      items-center
      justify-center
      transition-all
      duration-300
      ${
        active
          ? `
            bg-green-500
            border-green-500
            text-white
          `
          : darkMode
          ? `
            border-white/10
            text-gray-500
          `
          : `
            border-gray-300
            text-gray-400
          `
      }
      `}
    >
      <FiCheck size={14} />
    </div>
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className={`
      relative
      overflow-hidden
      border
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
      {/* GRID */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
        bg-[size:50px_50px]
        "
      />

      {/* GLOW */}
      <div
        className="
        absolute
        top-[-120px]
        right-[-120px]
        w-[260px]
        h-[260px]
        bg-green-500/10
        blur-3xl
        rounded-full
        "
      />

      {/* TOP LINE */}
      <div
        className="
        absolute
        top-0
        left-0
        h-[2px]
        w-full
        bg-gradient-to-r
        from-green-500
        via-emerald-400
        to-transparent
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
        {/* CATEGORY */}
        <div className="mt-2">
          <div
            className="
            flex
            items-center
            justify-between
            gap-4
            flex-wrap
            mb-5
            "
          >
            <div>
              <h3
                className={`
                text-lg
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                Select Incident Type
              </h3>

              <p
                className={`
                mt-1
                text-sm
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
                `}
              >
                Choose the category
                that best describes the
                emergency.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {renderCheck(
                completedFields.category
              )}

              {category && (
                <div
                  className="
                  px-4
                  py-2
                  bg-green-500
                  text-white
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  "
                >
                  {category} Selected
                </div>
              )}
            </div>
          </div>

          {!preSelectedCategory && (
            <div
              className="
              grid
              grid-cols-2
              xl:grid-cols-3
              gap-4
              "
            >
              {categories.map(
                (
                  item,
                  index
                ) => (
                  <motion.button
                    whileHover={{
                      y: -4,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    key={index}
                    onClick={() => {
                      setCategory(
                        item.name
                      );

                      setCompletedFields(
                        (prev) => ({
                          ...prev,
                          category: true,
                        })
                      );
                    }}
                    className={`
                    relative
                    overflow-hidden
                    border
                    p-5
                    text-left
                    transition-all
                    duration-300
                    ${
                      category ===
                      item.name
                        ? `
                          border-green-500
                          bg-green-500/10
                        `
                        : darkMode
                        ? `
                          border-white/10
                          bg-white/[0.03]
                        `
                        : `
                          border-gray-200
                          bg-gray-50
                        `
                    }
                    `}
                  >
                    <div
                      className={`
                      absolute
                      inset-0
                      opacity-20
                      bg-gradient-to-br
                      ${item.color}
                      `}
                    />

                    <div className="relative z-10">
                      <div
                        className="
                        w-12
                        h-12
                        bg-black/20
                        flex
                        items-center
                        justify-center
                        text-white
                        text-xl
                        "
                      >
                        <FiAlertTriangle />
                      </div>

                      <h4
                        className={`
                        mt-5
                        text-lg
                        font-black
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        `}
                      >
                        {item.name}
                      </h4>
                    </div>
                  </motion.button>
                )
              )}
            </div>
          )}
        </div>

        {/* FORM */}
        <div
          className="
          mt-10
          grid
          grid-cols-1
          gap-6
          "
        >
          {/* TITLE */}
          <div>
            <div
              className="
              flex
              items-center
              justify-between
              gap-3
              mb-3
              "
            >
              <label
                className={`
                text-sm
                font-bold
                uppercase
                tracking-[0.14em]
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
                `}
              >
                Incident Title
              </label>

              {renderCheck(
                completedFields.title
              )}
            </div>

            <input
              type="text"
              placeholder="Example: Major flood blocking traffic near city junction"
              value={title}
              onChange={(e) => {
                setTitle(
                  e.target.value
                );

                setCompletedFields(
                  (prev) => ({
                    ...prev,
                    title:
                      e.target.value.trim()
                        .length > 0,
                  })
                );
              }}
              className={`
              w-full
              h-16
              px-5
              border
              outline-none
              text-sm
              transition-all
              duration-300
              ${
                darkMode
                  ? `
                    bg-white/[0.03]
                    border-white/10
                    text-white
                    focus:border-green-500/40
                  `
                  : `
                    bg-white
                    border-gray-200
                  `
              }
              `}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <div
              className="
              flex
              items-center
              justify-between
              gap-3
              mb-3
              "
            >
              <label
                className={`
                text-sm
                font-bold
                uppercase
                tracking-[0.14em]
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
                `}
              >
                Detailed Description
              </label>

              {renderCheck(
                completedFields.description
              )}
            </div>

            <textarea
              rows={7}
              placeholder="Describe what happened, nearby landmarks, affected areas, or visible damage..."
              value={description}
              onChange={(e) => {
                setDescription(
                  e.target.value
                );

                setCompletedFields(
                  (prev) => ({
                    ...prev,
                    description:
                      e.target.value.trim()
                        .length > 0,
                  })
                );
              }}
              className={`
              w-full
              p-5
              border
              outline-none
              resize-none
              text-sm
              transition-all
              duration-300
              ${
                darkMode
                  ? `
                    bg-white/[0.03]
                    border-white/10
                    text-white
                    focus:border-green-500/40
                  `
                  : `
                    bg-white
                    border-gray-200
                  `
              }
              `}
            />
          </div>

          {/* ADDRESS */}
          <div>
            <div
              className="
              flex
              items-center
              justify-between
              gap-3
              mb-3
              "
            >
              <label
                className={`
                text-sm
                font-bold
                uppercase
                tracking-[0.14em]
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
                `}
              >
                Address / Landmark
              </label>

              {renderCheck(
                completedFields.address
              )}
            </div>

            <div className="relative">
              <FiMapPin
                className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-green-500
                "
              />

              <input
                type="text"
                placeholder="Enter incident location"
                value={address}
                onChange={(e) => {
                  setAddress(
                    e.target.value
                  );

                  setCompletedFields(
                    (prev) => ({
                      ...prev,
                      address:
                        e.target.value.trim()
                          .length > 0,
                    })
                  );
                }}
                className={`
                w-full
                h-16
                pl-14
                pr-4
                border
                outline-none
                text-sm
                ${
                  darkMode
                    ? `
                      bg-white/[0.03]
                      border-white/10
                      text-white
                    `
                    : `
                      bg-white
                      border-gray-200
                    `
                }
                `}
              />
            </div>
          </div>

          {/* GPS */}
          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.97,
            }}
            type="button"
            onClick={
              handleLocationDetection
            }
            className="
            relative
            overflow-hidden
            w-full
            h-16
            bg-green-500
            hover:bg-green-400
            text-white
            font-black
            uppercase
            tracking-[0.14em]
            flex
            items-center
            justify-center
            gap-3
            transition-all
            duration-300
            "
          >
            <FiCrosshair />

            <span>
              {detecting
                ? "Detecting..."
                : "Detect Location"}
            </span>
          </motion.button>

          {/* COORDINATES */}
          {coordinates && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
              border
              border-green-500/20
              bg-green-500/10
              p-5
              "
            >
              <h3
                className="
                text-lg
                font-black
                text-white
                "
              >
                Location Connected
              </h3>

              <div
                className="
                mt-3
                flex
                flex-wrap
                gap-5
                text-sm
                text-green-300
                "
              >
                <span>
                  LAT:{" "}
                  {
                    coordinates.lat
                  }
                </span>

                <span>
                  LNG:{" "}
                  {
                    coordinates.lng
                  }
                </span>
              </div>
            </motion.div>
          )}

          {/* IMAGE */}
          <div>
            <div
              className="
              flex
              items-center
              justify-between
              gap-3
              mb-3
              "
            >
              <label
                className={`
                text-sm
                font-bold
                uppercase
                tracking-[0.14em]
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
                `}
              >
                Upload Evidence
              </label>

              {renderCheck(
                completedFields.images
              )}
            </div>

            <label
              className={`
              relative
              overflow-hidden
              border-2
              border-dashed
              p-8
              flex
              flex-col
              items-center
              justify-center
              text-center
              cursor-pointer
              transition-all
              duration-300
              ${
                darkMode
                  ? `
                    border-white/10
                    bg-white/[0.03]
                  `
                  : `
                    border-gray-300
                    bg-gray-50
                  `
              }
              `}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={
                  handleImageUpload
                }
                disabled={
                  files.length >= 3
                }
                className="hidden"
              />

              <div
                className="
                w-20
                h-20
                rounded-full
                bg-green-500/10
                flex
                items-center
                justify-center
                text-green-400
                text-4xl
                "
              >
                <FiUploadCloud />
              </div>

              <h3
                className={`
                mt-6
                text-2xl
                font-black
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
                `}
              >
                {getUploadText()}
              </h3>

              <p
                className={`
                mt-3
                max-w-lg
                text-sm
                leading-relaxed
                ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }
                `}
              >
                Upload clear images to
                help emergency teams
                verify incidents faster
                and improve response
                accuracy.
              </p>
            </label>

            {/* IMAGE PREVIEW */}
            {files.length > 0 && (
              <div
                className="
                mt-5
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-4
                "
              >
                {files.map(
                  (
                    file,
                    index
                  ) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className={`
                      relative
                      overflow-hidden
                      border
                      p-4
                      ${
                        darkMode
                          ? `
                            border-white/10
                            bg-white/[0.03]
                          `
                          : `
                            border-gray-200
                            bg-gray-50
                          `
                      }
                      `}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            index
                          )
                        }
                        className="
                        absolute
                        top-3
                        right-3
                        w-8
                        h-8
                        bg-red-500
                        hover:bg-red-400
                        text-white
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        "
                      >
                        <FiX />
                      </button>

                      <div
                        className="
                        flex
                        items-center
                        gap-4
                        "
                      >
                        <div
                          className="
                          w-12
                          h-12
                          bg-green-500/10
                          flex
                          items-center
                          justify-center
                          text-green-400
                          text-xl
                          shrink-0
                          "
                        >
                          <FiImage />
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`
                            truncate
                            text-sm
                            font-semibold
                            ${
                              darkMode
                                ? "text-white"
                                : "text-black"
                            }
                            `}
                          >
                            {file.name}
                          </p>

                          <p
                            className={`
                            mt-1
                            text-xs
                            ${
                              darkMode
                                ? "text-gray-500"
                                : "text-gray-400"
                            }
                            `}
                          >
                            Evidence Attached
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            className="
            relative
            overflow-hidden
            mt-4
            h-16
            bg-green-500
            hover:bg-green-400
            text-white
            font-black
            uppercase
            tracking-[0.18em]
            flex
            items-center
            justify-center
            gap-4
            transition-all
            duration-300
            "
          >
            <span className="relative z-10">
              Submit Emergency Report
            </span>

            <FiArrowRight className="relative z-10 text-lg" />
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default ReportFormPanel;