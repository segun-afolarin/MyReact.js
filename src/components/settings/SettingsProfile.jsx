import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useState,
  useEffect,
} from "react";


import {

FiUser,
FiShield,
FiCamera,
FiEdit3,
FiSave,
FiX,
FiMail,
FiPhone,
FiMapPin,
FiLock,
FiAward,
FiCheckCircle

} from "react-icons/fi";



const SettingsProfile = ({
  darkMode
}) => {



const [editing,setEditing] =
useState(false);



const [profile,setProfile] =
useState({

name:"Afolarin Oluwasegun",

phone:"+234 800 000 000",

location:"Kwara State, Nigeria",

email:"citizen@email.com",

id:"NA-20492",

image:""

});




useEffect(()=>{

const saved =
localStorage.getItem(
"citizenProfile"
);


if(saved){

setProfile(
JSON.parse(saved)
);

}


},[]);







const uploadImage=(e)=>{


const file =
e.target.files[0];


if(file){


const reader =
new FileReader();



reader.onload = () => {


setProfile({

...profile,

image:reader.result

});


};


reader.readAsDataURL(file);


}


};







const saveProfile = ()=>{


localStorage.setItem(

"citizenProfile",

JSON.stringify(profile)

);


setEditing(false);


};








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

${
darkMode
?
"bg-[#081019] border-white/10"
:
"bg-white border-gray-200"
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





<div

className="
absolute
top-[-120px]
right-[-120px]
w-[320px]
h-[320px]
bg-green-500/10
blur-[120px]
"

/>








<div

className="
relative
z-10
p-5
sm:p-8
lg:p-10
"


>





<div

className="
flex
flex-col
xl:flex-row
gap-10
justify-between
"

>






{/* PROFILE */}




<div

className="
flex
flex-col
md:flex-row
gap-7
items-center
"


>





{/* IMAGE */}



<div
className="relative"
>



<div

className="
h-32
w-32
border
border-green-500/30
bg-green-500/10
overflow-hidden
flex
items-center
justify-center
shadow-[0_0_50px_rgba(34,197,94,.25)]
"

>


{


profile.image ?


<img

src={profile.image}

className="
w-full
h-full
object-cover
"

/>



:


<FiUser

size={55}

className="text-green-500"

/>


}




</div>







<AnimatePresence>


{

editing &&


<motion.label


initial={{
scale:0,
opacity:0
}}


animate={{
scale:1,
opacity:1
}}



exit={{
scale:0,
opacity:0
}}



className="
absolute
bottom-0
right-0
w-10
h-10
bg-green-500
text-black
flex
items-center
justify-center
cursor-pointer
"


>



<FiCamera/>




<input


type="file"


hidden


accept="image/*"


onChange={uploadImage}


/>




</motion.label>



}



</AnimatePresence>







<div


className="
absolute
bottom-2
right-2
translate-x-1/2
translate-y-1/2
bg-green-500
border-4
border-white
dark:border-[#081019]
w-8
h-8
flex
items-center
justify-center
"


>


<FiCheckCircle

className="text-white"

/>


</div>






</div>









{/* TEXT */}





<div>


<div

className="
flex
gap-2
items-center
text-green-500
font-bold
text-xs
uppercase
tracking-[.25em]
"

>

<FiShield/>

Verified Citizen

</div>





<h1

className="
mt-3
text-3xl
sm:text-5xl
font-black
tracking-tight
"

>

{profile.name}

</h1>




<p

className="
mt-3
opacity-60
max-w-xl
"

>

Your verified identity controls what
information can be updated.

</p>







<div

className="
mt-5
flex
flex-wrap
gap-3
"


>


<Tag icon={<FiAward/>}>

Top Contributor

</Tag>



<Tag icon={<FiLock/>}>

Identity Protected

</Tag>



</div>





</div>





</div>








{/* BUTTON */}





{


!editing ?



<button


onClick={()=>setEditing(true)}


className="
bg-green-500
text-black
px-6
py-3
font-bold
flex
gap-2
items-center
h-fit
"


>


<FiEdit3/>

Edit Profile


</button>



:



<div

className="
flex
gap-3
h-fit
"


>


<button


onClick={()=>setEditing(false)}


className="
border
px-5
py-3
flex
gap-2
items-center
"


>


<FiX/>

Cancel


</button>





<button


onClick={saveProfile}


className="
bg-green-500
text-black
px-5
py-3
flex
gap-2
items-center
"


>


<FiSave/>

Save


</button>





</div>


}




</div>









{/* DETAILS */}




<div


className="
mt-10
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-4
"


>





<Card

icon={<FiMail/>}

title="Email"

value={profile.email}

locked

/>





<Card

icon={<FiLock/>}

title="Citizen ID"

value={profile.id}

locked

/>





<Card

icon={<FiPhone/>}

title="Phone"

value={profile.phone}

edit={editing}

change={(v)=>

setProfile({

...profile,

phone:v

})

}


/>






<Card

icon={<FiMapPin/>}

title="Location"

value={profile.location}

edit={editing}

change={(v)=>

setProfile({

...profile,

location:v

})

}


/>





</div>






</div>





</motion.section>


)

};








const Card = ({

icon,

title,

value,

locked,

edit,

change

}) => (



<div


className="
border
p-5
bg-black/[0.03]
"


>



<div

className="
text-green-500
text-xl
mb-3
"

>

{icon}

</div>




<p className="text-xs opacity-60 uppercase">

{title}

</p>






{

edit ?



<input


value={value}


onChange={(e)=>

change(
e.target.value
)

}


className="
mt-2
w-full
border
bg-transparent
p-2
outline-none
"


/>



:



<h3

className="
font-bold
mt-2
"

>

{value}

</h3>


}







{

locked &&

<div

className="
mt-3
text-xs
opacity-50
flex
gap-1
items-center
"


>


<FiLock/>

Locked


</div>


}





</div>


);








const Tag=({

children,

icon

})=>(


<div

className="
border
border-green-500/20
bg-green-500/5
px-3
py-2
flex
gap-2
items-center
text-sm
"


>

{icon}

{children}


</div>


);



export default SettingsProfile;