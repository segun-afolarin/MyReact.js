import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";

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
        sticky
        top-20
        md:top-24
        z-40
        w-full
        border-b
        backdrop-blur-xl

        ${darkMode
          ? "bg-[#050B11]/95 border-white/10"
          : "bg-white/95 border-gray-200"
        }
      `}
      /*
        ⚠️ FIXES APPLIED:

        1. `top` now uses `top-20 md:top-24` (Tailwind spacing scale,
           80px / 96px) instead of an arbitrary `top-[90px]`. This now
           matches `<main>`'s actual padding-top in MyReportsDashboard
           (`pt-24 md:pt-28`, i.e. header height + a little breathing
           room) so the bar locks exactly under the header instead of
           overlapping it or leaving a gap.

        2. `z-50` → `z-40`. DashboardHeader almost certainly sits at a
           higher z-index (commonly 50) since it's fixed/sticky too —
           if both are z-50, stacking order becomes unpredictable across
           browsers. Keeping this one step below the header avoids it
           rendering on top of the header on scroll.

        3. This is now the ONLY sticky wrapper for the search bar — the
           parent page no longer wraps it in a second sticky div. Sticky
           elements nested inside other sticky elements with different
           `top` offsets is what broke this originally.
      */
    >

      <div className="px-4 sm:px-6 lg:px-8 py-4">

        {/* SEARCH ROW */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          {/* SEARCH INPUT */}
          <div className="flex-1 relative">

            <FiSearch
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports, location, ID..."
              className={`
                w-full
                h-12
                pl-10
                pr-4
                outline-none
                border
                text-sm
                transition

                ${darkMode
                  ? "bg-transparent border-white/10 text-white placeholder:text-gray-500"
                  : "bg-transparent border-gray-200 text-black placeholder:text-gray-400"
                }
              `}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            <button
              type="button"
              className={`
              h-12 px-4 flex items-center gap-2 text-sm font-medium border
              ${darkMode
                ? "border-white/10 text-white hover:bg-white/5"
                : "border-gray-200 text-black hover:bg-gray-50"
              }
            `}>
              <FiFilter />
              Filter
            </button>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className={`
              h-12 px-4 flex items-center gap-2 text-sm font-medium border
              ${darkMode
                ? "border-white/10 text-white hover:bg-white/5"
                : "border-gray-200 text-black hover:bg-gray-50"
              }
            `}>
              <FiRefreshCw />
              Refresh
            </button>

          </div>

        </div>

        {/* FILTER CHIPS */}
        <div className="flex gap-3 mt-4 overflow-x-auto">

          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`
                whitespace-nowrap
                px-3 py-2
                text-xs font-medium
                border

                transition

                ${filter === item
                  ? "bg-green-600 text-white border-green-600"
                  : darkMode
                    ? "border-white/10 text-gray-300 hover:border-green-500/40"
                    : "border-gray-200 text-gray-600 hover:border-green-500"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>

      </div>
    </motion.div>
  );
};

export default ReportSearch;