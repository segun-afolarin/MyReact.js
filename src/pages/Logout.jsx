import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiArrowRight
} from "react-icons/fi";


export default function Logout(){

  const navigate = useNavigate();



  const logout = ()=>{

    localStorage.clear();

    navigate("/Signup");

  };


  const cancel = ()=>{

    navigate("/CitizenDashboard");

  };



  return (

    <div
    className="
    min-h-screen
    bg-gradient-to-br
    from-green-900
    via-green-700
    to-emerald-500
    flex
    items-center
    justify-center
    px-6
    "
    >



      <motion.div


      initial={{
        opacity:0,
        scale:.85
      }}

      animate={{
        opacity:1,
        scale:1
      }}

      transition={{
        duration:.5
      }}


      className="
      bg-white
      w-full
      max-w-md
      p-10
      text-center
      shadow-2xl
      ">


        {/* animated logout icon */}


        <motion.div

        animate={{
          y:[0,-8,0]
        }}

        transition={{
          duration:2,
          repeat:Infinity
        }}

        className="
        mx-auto
        mb-8
        w-28
        h-28
        bg-green-50
        flex
        items-center
        justify-center
        "

        >


          <FiLogOut

          size={65}

          className="text-green-700"

          />



        </motion.div>







        <h1

        className="
        text-3xl
        font-black
        text-gray-900
        "

        >

          Leaving so soon?

        </h1>





        <p

        className="
        mt-4
        text-gray-600
        leading-relaxed
        "

        >

          Your citizen session is still active.
          Are you sure you want to sign out?

        </p>







        <div
        className="
        mt-8
        space-y-4
        ">


          {/* stay */}


          <motion.button

          whileHover={{
            scale:1.03
          }}

          whileTap={{
            scale:.96
          }}


          onClick={cancel}


          className="
          w-full
          h-14
          bg-green-600
          text-white
          font-bold
          flex
          items-center
          justify-center
          gap-2
          "

          >


            No, Keep Me Here

          </motion.button>






          {/* logout */}


          <motion.button


          whileHover={{
            scale:1.03
          }}

          whileTap={{
            scale:.96
          }}


          onClick={logout}


          className="
          w-full
          h-14
          border-2
          border-green-600
          text-green-700
          font-bold
          flex
          items-center
          justify-center
          gap-2
          bg-white
          "

          >


            Yes, Log Me Out

            <FiArrowRight/>


          </motion.button>



        </div>






        <p
        className="
        mt-8
        text-xs
        text-gray-400
        "

        >

          Nation Aura Secure Access

        </p>




      </motion.div>


    </div>

  );

}