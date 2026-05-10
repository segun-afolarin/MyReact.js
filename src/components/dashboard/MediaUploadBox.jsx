import { motion } from "framer-motion";

import {
  FiImage,
  FiVideo,
  FiUploadCloud,
  FiMic,
  FiCamera,
  FiTrash2,
} from "react-icons/fi";

const uploadedFiles = [
  {
    name: "road_damage.jpg",
    type: "Image",
    size: "2.4 MB",
  },

  {
    name: "flood_area.mp4",
    type: "Video",
    size: "12.8 MB",
  },
];

const MediaUploadBox = ({
  darkMode,
}) => {
  return (
    <section
      className={`
      relative
      overflow-hidden
      rounded-[32px]
      border
      p-6
      md:p-8
      ${
        darkMode
          ? `
            bg-white/[0.04]
            border-white/10
            backdrop-blur-2xl
          `
          : `
            bg-white/80
            border-gray-200
            backdrop-blur-2xl
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
          top-[-100px]
          right-[-60px]
          w-[220px]
          h-[220px]
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

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="mb-8">
          <h2
            className={`
            text-2xl
            font-black
            tracking-tight
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Upload Media Evidence
          </h2>

          <p
            className={`
            mt-2
            text-sm
            leading-relaxed
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
            `}
          >
            Add photos, videos, and
            voice recordings to support
            your infrastructure report.
          </p>
        </div>

        {/* UPLOAD BOX */}
        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className={`
          relative
          overflow-hidden
          rounded-[30px]
          border-2
          border-dashed
          p-8
          md:p-12
          text-center
          transition-all
          duration-300
          ${
            darkMode
              ? `
                border-green-500/20
                bg-[#0B1218]/70
              `
              : `
                border-green-500/30
                bg-[#F8FAFC]
              `
          }
          `}
        >
          {/* INNER GLOW */}
          <div
            className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.10),transparent_60%)]
            "
          />

          {/* ICON */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="
            relative
            z-10
            flex
            items-center
            justify-center
            w-24
            h-24
            mx-auto
            rounded-full
            bg-green-500/15
            text-green-500
            text-[42px]
            "
          >
            <FiUploadCloud />
          </motion.div>

          {/* TITLE */}
          <h3
            className={`
            relative
            z-10
            mt-6
            text-2xl
            font-black
            tracking-tight
            ${
              darkMode
                ? "text-white"
                : "text-black"
            }
            `}
          >
            Drag & Drop Files
          </h3>

          {/* DESCRIPTION */}
          <p
            className={`
            relative
            z-10
            mt-3
            max-w-[520px]
            mx-auto
            text-sm
            leading-relaxed
            ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }
            `}
          >
            Upload images of bad roads,
            drainage problems, broken
            infrastructure, or videos
            showing traffic and flooding.
          </p>

          {/* BUTTONS */}
          <div
            className="
            relative
            z-10
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-4
            "
          >
            {/* PHOTO */}
            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
              flex
              items-center
              gap-3
              px-5
              py-4
              rounded-2xl
              bg-green-500
              text-white
              font-semibold
              shadow-[0_12px_30px_rgba(34,197,94,0.30)]
              "
            >
              <FiImage />

              Upload Images
            </motion.button>

            {/* VIDEO */}
            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className={`
              flex
              items-center
              gap-3
              px-5
              py-4
              rounded-2xl
              border
              font-semibold
              ${
                darkMode
                  ? `
                    bg-white/[0.04]
                    border-white/10
                    text-white
                  `
                  : `
                    bg-white
                    border-gray-200
                    text-black
                  `
              }
              `}
            >
              <FiVideo />

              Upload Videos
            </motion.button>

            {/* VOICE */}
            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className={`
              flex
              items-center
              gap-3
              px-5
              py-4
              rounded-2xl
              border
              font-semibold
              ${
                darkMode
                  ? `
                    bg-white/[0.04]
                    border-white/10
                    text-white
                  `
                  : `
                    bg-white
                    border-gray-200
                    text-black
                  `
              }
              `}
            >
              <FiMic />

              Voice Record
            </motion.button>
          </div>
        </motion.div>

        {/* QUICK ACTIONS */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-4
          mt-6
          "
        >
          {/* CAMERA */}
          <motion.button
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className={`
            rounded-[24px]
            border
            p-5
            text-left
            transition-all
            duration-300
            ${
              darkMode
                ? `
                  bg-white/[0.03]
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
              flex
              items-center
              justify-center
              w-14
              h-14
              rounded-2xl
              bg-green-500/15
              text-green-500
              text-2xl
              mb-4
              "
            >
              <FiCamera />
            </div>

            <h4
              className={`
              text-lg
              font-bold
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              Open Camera
            </h4>

            <p
              className={`
              mt-2
              text-sm
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
              `}
            >
              Capture infrastructure
              issues directly from your
              device camera.
            </p>
          </motion.button>

          {/* AI DETECTION */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`
            relative
            overflow-hidden
            rounded-[24px]
            border
            p-5
            ${
              darkMode
                ? `
                  bg-green-500/10
                  border-green-500/20
                `
                : `
                  bg-green-50
                  border-green-100
                `
            }
            `}
          >
            {/* GLOW */}
            <div
              className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.16),transparent_60%)]
              "
            />

            <div className="relative z-10">
              <span
                className="
                inline-flex
                items-center
                gap-2
                px-3
                py-2
                rounded-full
                bg-green-500
                text-white
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                "
              >
                AI ACTIVE
              </span>

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
                Smart Infrastructure
                Detection
              </h4>

              <p
                className={`
                mt-3
                text-sm
                leading-relaxed
                ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
                `}
              >
                AI automatically checks
                uploaded images for road
                damage, flooding,
                drainage blockage, and
                public infrastructure
                risks.
              </p>
            </div>
          </motion.div>
        </div>

        {/* FILES */}
        <div className="mt-8">
          <div
            className="
            flex
            items-center
            justify-between
            mb-5
            "
          >
            <h3
              className={`
              text-lg
              font-bold
              ${
                darkMode
                  ? "text-white"
                  : "text-black"
              }
              `}
            >
              Uploaded Files
            </h3>

            <span
              className="
              text-xs
              uppercase
              tracking-[0.14em]
              text-green-500
              font-semibold
              "
            >
              2 Files
            </span>
          </div>

          <div className="space-y-4">
            {uploadedFiles.map(
              (file, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.08,
                  }}
                  className={`
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  rounded-[24px]
                  border
                  p-5
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                      `
                      : `
                        bg-white
                        border-gray-200
                      `
                  }
                  `}
                >
                  {/* LEFT */}
                  <div
                    className="
                    flex
                    items-center
                    gap-4
                    "
                  >
                    {/* ICON */}
                    <div
                      className="
                      flex
                      items-center
                      justify-center
                      w-14
                      h-14
                      rounded-2xl
                      bg-green-500/15
                      text-green-500
                      text-2xl
                      shrink-0
                      "
                    >
                      {file.type ===
                      "Image" ? (
                        <FiImage />
                      ) : (
                        <FiVideo />
                      )}
                    </div>

                    {/* INFO */}
                    <div>
                      <h4
                        className={`
                        text-sm
                        font-bold
                        ${
                          darkMode
                            ? "text-white"
                            : "text-black"
                        }
                        `}
                      >
                        {file.name}
                      </h4>

                      <p
                        className={`
                        mt-1
                        text-xs
                        ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                        `}
                      >
                        {file.type} •{" "}
                        {file.size}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <button
                    className="
                    flex
                    items-center
                    justify-center
                    w-12
                    h-12
                    rounded-2xl
                    bg-red-500/10
                    text-red-500
                    "
                  >
                    <FiTrash2 />
                  </button>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaUploadBox;