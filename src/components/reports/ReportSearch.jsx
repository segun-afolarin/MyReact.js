import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiRefreshCw, FiX } from "react-icons/fi";

const ReportSearch = ({
  darkMode,
  search,
  setSearch,
  filter,
  setFilter,
}) => {

  const filters = ["All", "Pending", "In Progress", "Resolved"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`
        sticky top-20 md:top-24 z-40 w-full border-b backdrop-blur-xl
        ${darkMode ? "bg-[#050B11]/95 border-white/10" : "bg-white/95 border-gray-200"}
      `}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4">

        {/* SEARCH ROW */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          {/* SEARCH INPUT */}
          <div className="flex-1 relative">
            <FiSearch
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, location, ID, status, or keywords..."
              className={`
                w-full h-12 pl-10 pr-10 outline-none border text-sm transition
                ${darkMode
                  ? "bg-transparent border-white/10 text-white placeholder:text-gray-500 focus:border-green-500/40"
                  : "bg-transparent border-gray-200 text-black placeholder:text-gray-400 focus:border-green-400"
                }
              `}
            />

            {/* Clear button */}
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className={`
                  absolute right-3 top-1/2 -translate-y-1/2
                  w-5 h-5 flex items-center justify-center rounded-full
                  transition-all duration-200
                  ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-black"}
                `}
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`
                h-12 px-4 flex items-center gap-2 text-sm font-medium border transition-all duration-200
                ${darkMode
                  ? "border-white/10 text-white hover:bg-white/5"
                  : "border-gray-200 text-black hover:bg-gray-50"
                }
              `}
            >
              <FiFilter />
              Filter
            </button>

            <button
              type="button"
              onClick={() => { setSearch(""); setFilter("All"); }}
              className={`
                h-12 px-4 flex items-center gap-2 text-sm font-medium border transition-all duration-200
                ${darkMode
                  ? "border-white/10 text-white hover:bg-white/5"
                  : "border-gray-200 text-black hover:bg-gray-50"
                }
              `}
            >
              <FiRefreshCw />
              Reset
            </button>
          </div>
        </div>

        {/* FILTER CHIPS */}
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`
                whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] border
                transition-all duration-200
                ${filter === item
                  ? "bg-green-600 text-white border-green-600"
                  : darkMode
                  ? "border-white/10 text-gray-300 hover:border-green-500/40 hover:text-green-400"
                  : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ACTIVE SEARCH INDICATOR */}
        {(search || filter !== "All") && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 flex-wrap"
          >
            <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Filtering:
            </span>

            {search && (
              <div className={`
                inline-flex items-center gap-2 px-3 py-1 border text-xs font-semibold
                ${darkMode ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-green-200 bg-green-50 text-green-700"}
              `}>
                "{search}"
                <button type="button" onClick={() => setSearch("")} className="hover:opacity-70">
                  <FiX size={11} />
                </button>
              </div>
            )}

            {filter !== "All" && (
              <div className={`
                inline-flex items-center gap-2 px-3 py-1 border text-xs font-semibold
                ${darkMode ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-green-200 bg-green-50 text-green-700"}
              `}>
                {filter}
                <button type="button" onClick={() => setFilter("All")} className="hover:opacity-70">
                  <FiX size={11} />
                </button>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

export default ReportSearch;