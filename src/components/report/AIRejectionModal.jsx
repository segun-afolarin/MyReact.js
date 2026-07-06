import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const AIRejectionModal = ({ darkMode, message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={`
                relative w-full max-w-md border p-6 sm:p-7
                ${darkMode ? "bg-[#09131B] border-red-500/20" : "bg-white border-red-200"}
              `}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className={`
                  absolute top-4 right-4 w-9 h-9 flex items-center justify-center border
                  ${darkMode
                    ? "border-white/10 bg-white/[0.05] text-gray-400 hover:text-white"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:text-black"
                  }
                `}
              >
                <FiX />
              </button>

              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-3xl">
                  <FiAlertTriangle />
                </div>
              </div>

              <h3 className={`mt-5 text-center text-xl font-black ${darkMode ? "text-white" : "text-black"}`}>
                We Couldn't Verify Your Photo
              </h3>

              <p className={`mt-3 text-center text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {message}
              </p>

              <button
                onClick={onClose}
                className="
                  mt-6 w-full h-13 bg-green-500 hover:bg-green-400 text-white
                  font-black uppercase tracking-[0.15em] text-sm
                  flex items-center justify-center transition-all duration-300
                "
              >
                I Understand
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIRejectionModal;