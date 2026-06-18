import {
  motion
} from "framer-motion";

import {
  useState
} from "react";


import {

FiBell,
FiAlertTriangle,
FiCheckCircle,
FiMail,
FiSmartphone,
FiMapPin,
FiShield

} from "react-icons/fi";




const SettingsNotifications = ({
darkMode
}) => {



const [alerts,setAlerts] =
useState(true);


const [reports,setReports] =
useState(true);


const [updates,setUpdates] =
useState(true);


const [email,setEmail] =
useState(false);




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
gap-2
items-center
text-green-500
text-xs
uppercase
tracking-[.25em]
font-bold
"

>


<FiBell/>

Notifications


</div>




<h2

className="
mt-3
text-3xl
font-black
"

>

Citizen Alerts

</h2>




<p

className="
mt-2
opacity-60
"

>

Control what updates you receive.

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

Active Alerts

</p>


<h3

className="
text-4xl
font-black
text-green-500
"

>

4

</h3>



</div>



</div>









{/* SETTINGS */}




<div

className="
mt-10
grid
grid-cols-1
md:grid-cols-2
gap-5
"

>




<NotifyCard

icon={<FiAlertTriangle/>}

title="Emergency Alerts"

text="Receive urgent community issues"

enabled={alerts}

setEnabled={setAlerts}

/>





<NotifyCard

icon={<FiCheckCircle/>}

title="Report Updates"

text="Get progress on submitted reports"

enabled={reports}

setEnabled={setReports}

/>





<NotifyCard

icon={<FiMapPin/>}

title="Area Updates"

text="Nearby infrastructure changes"

enabled={updates}

setEnabled={setUpdates}

/>





<NotifyCard

icon={<FiMail/>}

title="Email Notifications"

text="Receive important emails"

enabled={email}

setEnabled={setEmail}

/>




</div>









{/* SECURITY MESSAGE */}





<div

className="
mt-8
border
border-green-500/30
bg-green-500/10
p-5
flex
gap-4
items-center
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


<FiShield size={24}/>


</div>






<div>


<h3 className="font-bold">

Stay Connected

</h3>


<p className="text-sm opacity-60">

Notifications help you respond faster
and stay involved.

</p>


</div>



</div>







</div>





</motion.section>


);

};









const NotifyCard = ({

icon,
title,
text,
enabled,
setEnabled

}) => {



return (

<div

className="
border
border-green-500/20
bg-green-500/[0.04]
p-5
hover:bg-green-500/[0.1]
transition
"

>



<div

className="
flex
justify-between
items-start
"

>


<div

className="
text-green-500
text-2xl
"

>

{icon}

</div>





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




</div>








<h3 className="font-bold mt-5">

{title}

</h3>




<p className="text-sm opacity-60 mt-1">

{text}

</p>







</div>


);


};






export default SettingsNotifications;