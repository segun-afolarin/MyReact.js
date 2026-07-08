import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import { getMyReports } from "../../utils/api";

// Community reports require 5 confirmations before escalation — same
// constant used elsewhere (UserReportsQueue, ReportController). getMyReports()
// doesn't expose the per-report threshold, so it's hardcoded here to match.
const REQUIRED_CONFIRMATIONS = 5;

const ReportStats = ({
  darkMode
}) => {

  // ── Live personal stats from /api/reports/mine — same source as
  // ReportsHero, since this grid is about the user's own reports. ──────
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyReports = useCallback(async () => {
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
    fetchMyReports();
  }, [fetchMyReports]);

  const totalReports = myReports.length;
  const resolvedCount = myReports.filter((r) => r.status === "Resolved").length;
  const inProgressCount = myReports.filter((r) => r.status === "In Progress").length;

  const resolutionRate = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0;
  const inProgressRate = totalReports > 0 ? Math.round((inProgressCount / totalReports) * 100) : 0;

  // "Impact Score" isn't a stored field — it's a composite of two things
  // we do have real data for: how many of your reports got resolved, and
  // how close each report gets to the community-confirmation threshold.
  // This is one reasonable definition, not an extracted ground-truth value —
  // adjust the weighting/formula here if you want it to mean something else.
  const avgConfirmationRate =
    totalReports > 0
      ? Math.round(
          myReports.reduce(
            (sum, r) => sum + Math.min((r.confirmations ?? 0) / REQUIRED_CONFIRMATIONS, 1) * 100,
            0
          ) / totalReports
        )
      : 0;
  const impactScore = totalReports > 0 ? Math.round((resolutionRate + avgConfirmationRate) / 2) : 0;

  const displayValue = (n, pad = false) =>
    loading ? "—" : pad ? String(n).padStart(2, "0") : `${n}`;
  const displayPercent = (n) => (loading ? "—%" : `${n}%`);

const stats = [

{
 title:"Total Reports",
 value: displayValue(totalReports),
 label:"Citizen submissions",
 icon:<FiFileText/>,
 percent: loading ? "0%" : "100%"
},


{
 title:"Resolved",
 value: displayValue(resolvedCount, true),
 label:"Issues completed",
 icon:<FiCheckCircle/>,
 percent: loading ? "0%" : `${resolutionRate}%`
},


{
 title:"In Progress",
 value: displayValue(inProgressCount, true),
 label:"Active investigations",
 icon:<FiClock/>,
 percent: loading ? "0%" : `${inProgressRate}%`
},


{
 title:"Impact Score",
 value: displayPercent(impactScore),
 label:"Community contribution",
 icon:<FiTrendingUp/>,
 percent: loading ? "0%" : `${impactScore}%`
}

];



return (

<section

className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
"

>


{
stats.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.45,
delay:index*.08
}}


whileHover={{
y:-4
}}


className={`
relative
overflow-hidden
border
p-6
transition-all
duration-300

${
darkMode

?
`
bg-[#0B1218]
border-white/10
hover:border-green-500/40
`

:

`
bg-white
border-gray-200
shadow-[0_15px_40px_rgba(0,0,0,0.06)]
hover:border-green-500/40
`

}

`}

>


{/* subtle glow */}

<div

className="
absolute
right-0
top-0
w-32
h-32
bg-green-500/10
blur-3xl
pointer-events-none
"

/>






<div

className="
relative
flex
items-start
justify-between
"

>


<div>


<p

className={`
text-xs
uppercase
tracking-[0.18em]

${
darkMode
?
"text-gray-500"
:
"text-gray-400"
}

`}

>

{item.title}

</p>




<h2

className={`
mt-4
text-4xl
font-black
tracking-tight

${
darkMode
?
"text-white"
:
"text-black"
}

`}

>

{item.value}

</h2>



<p

className="
mt-2
text-sm
text-gray-500
"

>

{item.label}

</p>



</div>







<motion.div

initial={{
scale:.8,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

transition={{
delay:.3 + index*.1
}}

className="
w-14
h-14
flex
items-center
justify-center
bg-green-600
text-white
text-xl
shadow-lg
"

>

{item.icon}

</motion.div>



</div>








{/* progress */}


<div className="mt-7">


<div

className={`
h-[5px]
overflow-hidden

${
darkMode
?
"bg-white/10"
:
"bg-gray-100"
}

`}

>


<motion.div


initial={{
width:0
}}

animate={{
width:item.percent
}}

transition={{
duration:.8,
delay:.4 + index*.1
}}


className="
h-full
bg-gradient-to-r
from-green-500
to-emerald-600
"

/>



</div>



<div

className="
mt-3
flex
justify-between
text-xs
text-gray-500
"

>

<span>
Progress
</span>


<span
className="text-green-600 font-semibold"
>

{item.percent}

</span>


</div>


</div>







</motion.div>



))
}


</section>

);

};


export default ReportStats;