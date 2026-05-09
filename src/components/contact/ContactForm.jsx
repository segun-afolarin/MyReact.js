import { motion } from "framer-motion";

import {
  FiMail,
  FiUser,
  FiSend,
  FiUploadCloud,
} from "react-icons/fi";

const ContactForm = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
      }}
      className="
      relative
      overflow-hidden
      rounded-[40px]
      bg-white/85
      backdrop-blur-2xl
      border
      border-white/40
      shadow-[0_20px_80px_rgba(0,0,0,0.05)]
      p-8
      md:p-10
      "
    >
      {/* GLOW */}
      <div
        className="
        absolute
        -top-20
        -right-20
        w-56
        h-56
        bg-green-100
        rounded-full
        blur-3xl
        opacity-40
        "
      />

      <div className="relative z-10">
        <div
          className="
          inline-flex
          bg-green-100
          text-green-700
          px-4
          py-2
          rounded-full
          text-sm
          font-medium
          mb-8
          "
        >
          Send A Support Request
        </div>

        <form className="space-y-6">
          {/* NAME */}
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-3
              "
            >
              Full Name
            </label>

            <div
              className="
              h-14
              rounded-2xl
              bg-[#F8FAF9]
              border
              border-gray-100
              px-5
              flex
              items-center
              gap-3
              "
            >
              <FiUser className="text-green-700" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="
                w-full
                bg-transparent
                outline-none
                text-gray-700
                "
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-3
              "
            >
              Email Address
            </label>

            <div
              className="
              h-14
              rounded-2xl
              bg-[#F8FAF9]
              border
              border-gray-100
              px-5
              flex
              items-center
              gap-3
              "
            >
              <FiMail className="text-green-700" />

              <input
                type="email"
                placeholder="Enter your email"
                className="
                w-full
                bg-transparent
                outline-none
                text-gray-700
                "
              />
            </div>
          </div>

          {/* SUBJECT */}
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-3
              "
            >
              Subject
            </label>

            <input
              type="text"
              placeholder="Support request subject"
              className="
              w-full
              h-14
              rounded-2xl
              bg-[#F8FAF9]
              border
              border-gray-100
              px-5
              outline-none
              text-gray-700
              "
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-3
              "
            >
              Message
            </label>

            <textarea
              rows={6}
              placeholder="Describe your issue or support request..."
              className="
              w-full
              rounded-3xl
              bg-[#F8FAF9]
              border
              border-gray-100
              p-5
              outline-none
              resize-none
              text-gray-700
              "
            />
          </div>

          {/* FILE */}
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-3
              "
            >
              Optional Image Upload
            </label>

            <label
              className="
              group
              flex
              flex-col
              items-center
              justify-center
              gap-3
              rounded-3xl
              border-2
              border-dashed
              border-green-200
              bg-green-50/40
              p-8
              cursor-pointer
              hover:bg-green-50/70
              transition-all
              duration-300
              "
            >
              <input
                type="file"
                className="hidden"
              />

              <div
                className="
                w-16
                h-16
                rounded-2xl
                bg-white
                flex
                items-center
                justify-center
                shadow-lg
                text-green-700
                text-2xl
                "
              >
                <FiUploadCloud />
              </div>

              <div className="text-center">
                <p
                  className="
                  font-medium
                  text-black
                  "
                >
                  Upload Screenshot or Image
                </p>

                <p
                  className="
                  text-sm
                  text-gray-500
                  mt-1
                  "
                >
                  PNG, JPG or JPEG
                </p>
              </div>
            </label>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            className="
            w-full
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-green-700
            to-emerald-700
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-3
            shadow-[0_15px_40px_rgba(22,163,74,0.25)]
            transition-all
            duration-300
            "
          >
            <FiSend />

            Send Message
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;