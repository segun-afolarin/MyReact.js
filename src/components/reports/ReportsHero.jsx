import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiFileText,
  FiActivity,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";


const ReportsHero = ({
  darkMode
}) => {


const heroContent = [

  {
    title1: "Your Reports",
    title2: "Command Center",
    paragraph:
      "This is your personal civic control room where every report you submit comes to life. Track progress, monitor verification, and see how your actions are directly shaping safer, smarter, and more accountable communities around you."
  },

  {
    title1: "Track Every",
    title2: "Community Action",
    paragraph:
      "Follow each stage of your reports in real time — from submission to verification and final government response. Stay fully informed as your contributions move through the system and create measurable change in your environment."
  },

  {
    title1: "Your Evidence",
    title2: "Creates Impact",
    paragraph:
      "Every report you submit becomes part of a growing system of truth. Verified evidence helps authorities detect issues faster, prioritize urgent problems, and deliver real solutions that improve daily life in your community."
  },

  {
    title1: "Stay Connected",
    title2: "To Change",
    paragraph:
      "You are not just reporting issues — you are actively shaping progress. Stay connected to every update, every confirmation, and every resolution as your voice continues to drive meaningful civic transformation."
  }
];


const stats=[

{
title:"Reports",
value:"24"
},

{
title:"Resolved",
value:"18"
},

{
title:"Impact",
value:"94%"
}

];



const [active,setActive]=useState(0);



useEffect(()=>{

const timer=setInterval(()=>{

setActive(prev=>
prev===heroContent.length-1
?0
:prev+1
)

},9000);


return ()=>clearInterval(timer);


},[]);



return (

<motion.section

initial={{
opacity:0,
y:25
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}


className={`

relative
overflow-hidden
border
transition-all


${
darkMode

?

`
bg-[#0B1218]
border-white/10
`

:

`
bg-white
border-gray-200
shadow-[0_20px_50px_rgba(0,0,0,0.06)]
`

}

`}

>





{/* background glow */}


<div

className="
absolute
top-0
right-0
w-96
h-96
bg-green-500/10
blur-[120px]
"

/>



<div

className="
absolute
inset-0
opacity-[0.035]
bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)]
bg-[size:50px_50px]
"

/>





<div

className="
relative
z-10
p-6
lg:p-10
grid
grid-cols-1
xl:grid-cols-[1fr_360px]
gap-10
"

>





{/* LEFT */}


<div>



<div

className="
inline-flex
items-center
gap-3
px-4
py-2
bg-green-500/10
border
border-green-500/20
text-green-600
mb-6
"

>


<span

className="
w-2.5
h-2.5
bg-green-500
animate-pulse
"

/>


<span

className="
text-xs
font-bold
tracking-[0.18em]
uppercase
"

>

Report Monitoring Live

</span>


</div>







<div className="min-h-[230px]">


<AnimatePresence mode="wait">


<motion.div

key={active}

initial={{
opacity:0,
y:25
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-20
}}

transition={{
duration:.6
}}

>


<h1

className={`
text-[42px]
sm:text-[58px]
lg:text-[74px]
font-black
leading-[.95]
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


<span className="block">

{heroContent[active].title1}

</span>




<span

className="
block
bg-gradient-to-r
from-green-400
via-emerald-500
to-green-700
bg-clip-text
text-transparent
"

>

{heroContent[active].title2}

</span>


</h1>





<p

className="
mt-6
max-w-2xl
text-base
leading-relaxed
text-gray-500
dark:text-gray-400
"

>

{heroContent[active].paragraph}

</p>



</motion.div>


</AnimatePresence>


</div>









{/* stats */}


<div

className="
grid
grid-cols-3
gap-4
mt-5
"

>


{
stats.map((item,index)=>(


<div

key={index}

className={`

border
p-5


${
darkMode

?
"border-white/10 bg-white/[0.03]"

:

"border-gray-200 bg-gray-50"

}

`}

>


<h3

className="
text-3xl
font-black
"

>

{item.value}

</h3>


<p

className="
text-xs
text-gray-500
mt-2
"

>

{item.title}

</p>


</div>


))
}


</div>



</div>







{/* RIGHT ANALYTICS */}



<div

className={`

border
p-6


${
darkMode

?
"border-white/10 bg-white/[0.03]"

:

"border-gray-200 bg-gray-50"

}

`}

>




<div

className="
flex
justify-between
items-start
"

>


<div>

<p

className="
text-xs
uppercase
tracking-widest
text-gray-400
"

>

Analytics

</p>


<h3

className="
text-2xl
font-black
mt-2
"

>

Report Health

</h3>


</div>




<div

className="
w-14
h-14
bg-green-600
text-white
flex
items-center
justify-center
"

>

<FiActivity/>

</div>


</div>







<div className="mt-10">


<h2

className="
text-6xl
font-black
"

>

94%

</h2>


<p

className="
text-gray-500
mt-2
"

>

Resolution efficiency

</p>




<div

className="
mt-5
h-2
bg-gray-200
dark:bg-white/10
overflow-hidden
"

>


<motion.div

initial={{
width:0
}}

animate={{
width:"94%"
}}

transition={{
duration:1
}}

className="
h-full
bg-green-600
"

/>


</div>


</div>





<div

className="
mt-8
flex
items-center
gap-3
text-green-600
font-semibold
"

>

<FiTrendingUp/>

+12% improvement


</div>



</div>



</div>



</motion.section>

)

};


export default ReportsHero;