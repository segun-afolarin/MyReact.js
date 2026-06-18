import {
  motion
} from "framer-motion";

import {
  useState
} from "react";


import {

FiFileText,
FiMapPin,
FiClock,
FiCheckCircle,
FiTrendingUp,
FiShield,
FiEye,
FiBell

} from "react-icons/fi";




const SettingsReports = ({
darkMode
}) => {



const [publicReports,setPublicReports] =
useState(true);


const [location,setLocation] =
useState(true);


const [updates,setUpdates] =
useState(true);




return (


<motion.section


initial={{
opacity:0,
y:30
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:.6
}}



className={`
relative
overflow-hidden
border
p-5
sm:p-8


${
darkMode
?
"bg-[#081019] border-white/10 text-white"
:
"bg-white border-gray-200 text-black shadow-xl"
}

`}

>






{/* GREEN EFFECT */}



<div

className="
absolute
top-[-120px]
right-[-120px]
w-[320px]
h-[320px]
bg-green-500/20
blur-[120px]
"

/>







<div className="relative z-10">







{/* HEADER */}





<div

className="
flex
flex-col
md:flex-row
justify-between
gap-6
"

>


<div>



<div

className="
flex
items-center
gap-2
text-green-500
text-xs
font-bold
uppercase
tracking-[.25em]
"

>


<FiFileText/>


Report Center


</div>





<h2

className="
mt-3
text-3xl
font-black
"

>

Report Preferences

</h2>





<p className="
mt-2
opacity-60
max-w-xl
">

Control how your citizen reports
are shared and tracked.

</p>




</div>









<div

className="
border
border-green-500/30
bg-green-500/10
p-5
"

>


<p className="
text-xs
opacity-60
">

Total Reports

</p>



<h3

className="
text-4xl
font-black
text-green-500
"

>

128

</h3>



</div>







</div>













{/* REPORT CARDS */}




<div

className="
mt-10
grid
grid-cols-1
md:grid-cols-2
gap-5
"

>





<Card

icon={<FiEye/>}

title="Public Reports"

text="Allow verified citizens to see your impact"

enabled={publicReports}

setEnabled={setPublicReports}

/>








<Card

icon={<FiMapPin/>}

title="Location Tracking"

text="Attach location automatically to reports"

enabled={location}

setEnabled={setLocation}

/>








<Card

icon={<FiBell/>}

title="Report Updates"

text="Receive progress notifications"

enabled={updates}

setEnabled={setUpdates}

/>








<Card

icon={<FiClock/>}

title="Report History"

text="Keep your complete report timeline"

value="128 Reports"

/>





</div>












{/* IMPACT */}





<div

className="
mt-8
border
border-green-500/30
bg-green-500/10
p-5
flex
flex-col
sm:flex-row
gap-5
items-start
sm:items-center
"

>





<div

className="
w-12
h-12
border
border-green-500/30
flex
items-center
justify-center
text-green-500
"

>


<FiTrendingUp size={24}/>


</div>







<div>


<h3 className="font-bold">

Your Report Impact

</h3>



<p className="text-sm opacity-60">

87 reports have been resolved
through your contributions.

</p>



</div>





<div className="
sm:ml-auto
text-green-500
font-black
"

>

87%

</div>







</div>









{/* TRUST */}




<div

className="
mt-5
border
border-green-500/20
p-5
flex
gap-4
items-center
"

>


<div

className="
text-green-500
text-xl
"

>


<FiShield/>


</div>



<p className="text-sm opacity-70">

Your reports are protected and
linked to your verified citizen identity.

</p>




</div>







</div>






</motion.section>


);

};









const Card = ({

icon,
title,
text,
enabled,
setEnabled,
value

}) => {



return (

<div


className="
border
border-green-500/20
bg-green-500/[0.04]
p-5
transition
hover:bg-green-500/[0.1]
"

>





<div className="
flex
justify-between
items-start
"


>


<div className="
text-green-500
text-2xl
">

{icon}

</div>





{

setEnabled &&


<button


onClick={()=>setEnabled(!enabled)}


className={`
w-12
h-6
border
border-green-500/30

${
enabled
?
"bg-green-500"
:
"bg-green-950"
}

`

}


>



<div

className={`
w-4
h-4
bg-white
transition

${
enabled
?
"ml-7"
:
"ml-1"
}

`}

/>


</button>



}



</div>







<h3 className="font-bold mt-5">

{title}

</h3>



<p className="text-sm opacity-60 mt-1">

{text}

</p>





{

value &&

<h4 className="
mt-4
text-green-500
font-black
text-xl
">

{value}

</h4>


}






</div>

);

};






export default SettingsReports;