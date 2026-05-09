// NationAuraAuth.jsx

import { useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Building2,
  Landmark,
  Phone,
  Globe,
  MapPin,
  UploadCloud,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

import Navbar from "../components/layout/Navbas";
import Footer from "../components/footer/Footer";

import authImage from "../assets/about-hero.jpg";

const stats = [
  {
    number: "250+",
    label: "Verified Government Agencies",
  },

  {
    number: "800+",
    label: "NGOs Onboarded",
  },

  {
    number: "99%",
    label: "Secure Verification Accuracy",
  },
];

const NationAuraAuth = () => {
  const [isLogin, setIsLogin] =
    useState(true);

  const [accountType, setAccountType] =
    useState("government");

  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div
      className="
      min-h-screen
      bg-[#F7F8F7]
      overflow-hidden
      "
    >
      <Navbar />

      <section
        className="
        relative
        pt-40
        pb-28
        px-4
        sm:px-6
        lg:px-10
        overflow-hidden
        "
      >
        {/* GRID */}
        <div
          className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          [background-size:70px_70px]
          "
        />

        {/* GLOW */}
        <div
          className="
          absolute
          top-[-200px]
          left-[-150px]
          w-[500px]
          h-[500px]
          bg-green-100
          rounded-full
          blur-3xl
          opacity-50
          "
        />

        <div
          className="
          relative
          z-10
          max-w-7xl
          mx-auto
          grid
          lg:grid-cols-[1.05fr_0.95fr]
          gap-14
          items-center
          "
        >
          {/* ================================= */}
          {/* LEFT */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="hidden lg:block"
          >
            {/* BADGE */}
            <div
              className="
              inline-flex
              items-center
              gap-2
              bg-green-50
              border
              border-green-100
              px-5
              py-3
              rounded-full
              text-sm
              font-semibold
              text-[#0E7A53]
              mb-8
              "
            >
              <ShieldCheck size={16} />

              Secure Civic Verification
            </div>

            {/* HEADING */}
            <h1
              className="
              text-6xl
              xl:text-7xl
              font-black
              leading-[0.95]
              tracking-tight
              text-black
              max-w-2xl
              "
            >
              Trusted Access
              <br />

              For
              <span className="text-[#0E7A53]">
                {" "}
                National Impact.
              </span>
            </h1>

            {/* TEXT */}
            <p
              className="
              mt-8
              text-xl
              leading-relaxed
              text-gray-600
              max-w-xl
              "
            >
              NationAura connects verified
              Government Agencies and NGOs
              into one secure civic
              collaboration ecosystem.
            </p>

            {/* STATS */}
            <div
              className="
              mt-12
              grid
              grid-cols-3
              gap-5
              "
            >
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                  bg-white
                  border
                  border-black/5
                  rounded-[28px]
                  p-6
                  shadow-[0_15px_40px_rgba(0,0,0,0.04)]
                  "
                >
                  <h3
                    className="
                    text-3xl
                    font-black
                    text-black
                    "
                  >
                    {item.number}
                  </h3>

                  <p
                    className="
                    mt-2
                    text-sm
                    text-gray-500
                    "
                  >
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* IMAGE */}
            <motion.div
              whileHover={{
                y: -8,
              }}
              className="
              relative
              mt-12
              overflow-hidden
              rounded-[40px]
              border
              border-black/5
              shadow-[0_30px_90px_rgba(0,0,0,0.08)]
              "
            >
              <img
                src={authImage}
                alt="NationAura"
                className="
                w-full
                h-[320px]
                object-cover
                "
              />

              {/* OVERLAY */}
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/70
                via-black/20
                to-transparent
                "
              />

              {/* FLOATING CARD */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="
                absolute
                bottom-8
                left-8
                max-w-sm
                rounded-[28px]
                bg-white/10
                backdrop-blur-2xl
                border
                border-white/10
                p-6
                text-white
                "
              >
                <h3
                  className="
                  text-2xl
                  font-black
                  leading-tight
                  "
                >
                  Secure Verification
                  Infrastructure
                </h3>

                <p
                  className="
                  mt-4
                  text-white/75
                  leading-relaxed
                  "
                >
                  Institution-grade onboarding
                  with secure document
                  verification and admin
                  approval systems.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ================================= */}
          {/* RIGHT */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div
              className="
              relative
              overflow-hidden
              rounded-[40px]
              bg-white/90
              backdrop-blur-2xl
              border
              border-black/5
              shadow-[0_30px_100px_rgba(0,0,0,0.08)]
              p-7
              sm:p-10
              md:p-12
              "
            >
              {/* GLOW */}
              <div
                className="
                absolute
                top-0
                right-0
                w-[250px]
                h-[250px]
                bg-green-100
                rounded-full
                blur-3xl
                opacity-50
                "
              />

              {/* LOGIN / SIGNUP */}
              <div
                className="
                relative
                flex
                bg-[#F3F4F6]
                rounded-full
                p-1
                mb-8
                "
              >
                <motion.div
                  layout
                  className={`
                  absolute
                  top-1
                  bottom-1
                  w-1/2
                  rounded-full
                  bg-[#0E7A53]
                  ${
                    isLogin
                      ? "left-1"
                      : "left-1/2"
                  }
                  `}
                />

                <button
                  onClick={() =>
                    setIsLogin(true)
                  }
                  className={`
                  relative
                  z-10
                  flex-1
                  py-3
                  rounded-full
                  font-semibold
                  ${
                    isLogin
                      ? "text-white"
                      : "text-gray-600"
                  }
                  `}
                >
                  Login
                </button>

                <button
                  onClick={() =>
                    setIsLogin(false)
                  }
                  className={`
                  relative
                  z-10
                  flex-1
                  py-3
                  rounded-full
                  font-semibold
                  ${
                    !isLogin
                      ? "text-white"
                      : "text-gray-600"
                  }
                  `}
                >
                  Sign Up
                </button>
              </div>

              {/* ACCOUNT TYPE */}
              <div className="mb-8">
                <p
                  className="
                  text-sm
                  font-semibold
                  text-gray-500
                  mb-4
                  "
                >
                  SELECT ACCOUNT TYPE
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() =>
                      setAccountType(
                        "government"
                      )
                    }
                    className={`
                    rounded-3xl
                    border
                    p-5
                    text-left
                    transition-all
                    ${
                      accountType ===
                      "government"
                        ? "border-[#0E7A53] bg-green-50"
                        : "border-gray-200 bg-white"
                    }
                    `}
                  >
                    <Landmark
                      className="mb-3"
                      size={28}
                    />

                    <h3 className="font-bold text-lg">
                      Government
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Federal, State &
                      Local Agencies
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      setAccountType("ngo")
                    }
                    className={`
                    rounded-3xl
                    border
                    p-5
                    text-left
                    transition-all
                    ${
                      accountType ===
                      "ngo"
                        ? "border-[#0E7A53] bg-green-50"
                        : "border-gray-200 bg-white"
                    }
                    `}
                  >
                    <Building2
                      className="mb-3"
                      size={28}
                    />

                    <h3 className="font-bold text-lg">
                      NGO
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Civic & nonprofit
                      organizations
                    </p>
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={
                    isLogin
                      ? "login"
                      : accountType
                  }
                  initial={{
                    opacity: 0,
                    x: 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  {/* HEADER */}
                  <div className="mb-8">
                    <div
                      className="
                      inline-flex
                      items-center
                      gap-2
                      bg-green-50
                      text-[#0E7A53]
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      font-semibold
                      mb-5
                      "
                    >
                      <Sparkles size={15} />

                      {isLogin
                        ? "Secure Login"
                        : accountType ===
                          "government"
                        ? "Government Registration"
                        : "NGO Registration"}
                    </div>

                    <h2
                      className="
                      text-4xl
                      font-black
                      leading-tight
                      tracking-tight
                      "
                    >
                      {isLogin
                        ? "Continue Your Mission."
                        : "Create Verified Access."}
                    </h2>

                    <p
                      className="
                      mt-4
                      text-gray-600
                      text-lg
                      "
                    >
                      Secure onboarding with
                      verification and approval
                      workflow.
                    </p>
                  </div>

                  {/* FORM */}
                  <form className="space-y-5">
                    {/* LOGIN */}
                    {isLogin ? (
                      <>
                        <InputField
                          icon={
                            <Mail size={18} />
                          }
                          placeholder="Official Email Address"
                          type="email"
                        />

                        <div className="relative">
                          <InputField
                            icon={
                              <Lock size={18} />
                            }
                            placeholder="Password"
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
                            }
                            className="
                            absolute
                            right-5
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                            "
                          >
                            {showPassword ? (
                              <EyeOff
                                size={20}
                              />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>

                        <div
                          className="
                          flex
                          justify-between
                          items-center
                          text-sm
                          "
                        >
                          <label
                            className="
                            flex
                            items-center
                            gap-2
                            text-gray-600
                            "
                          >
                            <input type="checkbox" />
                            Remember me
                          </label>

                          <button
                            className="
                            text-[#0E7A53]
                            font-semibold
                            "
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* GOVERNMENT */}
                        {accountType ===
                          "government" && (
                          <>
                            <InputField
                              icon={
                                <Landmark size={18} />
                              }
                              placeholder="Agency Name"
                              type="text"
                            />

                            <InputField
                              icon={
                                <Briefcase size={18} />
                              }
                              placeholder="Ministry / Department"
                              type="text"
                            />

                            <InputField
                              icon={
                                <Mail size={18} />
                              }
                              placeholder="Official Government Email"
                              type="email"
                            />

                            <InputField
                              icon={
                                <Phone size={18} />
                              }
                              placeholder="Phone Number"
                              type="text"
                            />

                            <InputField
                              icon={
                                <MapPin size={18} />
                              }
                              placeholder="Office Address"
                              type="text"
                            />

                            <InputField
                              icon={
                                <Globe size={18} />
                              }
                              placeholder="Official Website"
                              type="text"
                            />

                            <InputField
                              icon={
                                <User size={18} />
                              }
                              placeholder="Officer Full Name"
                              type="text"
                            />
                          </>
                        )}

                        {/* NGO */}
                        {accountType ===
                          "ngo" && (
                          <>
                            <InputField
                              icon={
                                <Building2 size={18} />
                              }
                              placeholder="NGO Name"
                              type="text"
                            />

                            <InputField
                              icon={
                                <ShieldCheck size={18} />
                              }
                              placeholder="CAC Registration Number"
                              type="text"
                            />

                            <InputField
                              icon={
                                <Mail size={18} />
                              }
                              placeholder="Official Email"
                              type="email"
                            />

                            <InputField
                              icon={
                                <Phone size={18} />
                              }
                              placeholder="Phone Number"
                              type="text"
                            />

                            <InputField
                              icon={
                                <MapPin size={18} />
                              }
                              placeholder="Office Address"
                              type="text"
                            />

                            <InputField
                              icon={
                                <User size={18} />
                              }
                              placeholder="Director Full Name"
                              type="text"
                            />
                          </>
                        )}

                        {/* PASSWORD */}
                        <div className="relative">
                          <InputField
                            icon={
                              <Lock size={18} />
                            }
                            placeholder="Password"
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
                            }
                            className="
                            absolute
                            right-5
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                            "
                          >
                            {showPassword ? (
                              <EyeOff
                                size={20}
                              />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>

                        {/* UPLOAD */}
                        <div
                          className="
                          border-2
                          border-dashed
                          border-gray-200
                          rounded-3xl
                          p-8
                          text-center
                          bg-[#FAFAFA]
                          "
                        >
                          <UploadCloud
                            size={38}
                            className="
                            mx-auto
                            text-[#0E7A53]
                            "
                          />

                          <h3
                            className="
                            mt-4
                            font-bold
                            text-lg
                            "
                          >
                            Upload Verification
                            Documents
                          </h3>

                          <p
                            className="
                            mt-2
                            text-gray-500
                            text-sm
                            "
                          >
                            PDF, PNG or JPG files
                            only
                          </p>
                        </div>
                      </>
                    )}

                    {/* BUTTON */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="
                      w-full
                      bg-[#0E7A53]
                      hover:bg-[#095c3e]
                      text-white
                      py-5
                      rounded-2xl
                      font-bold
                      text-lg
                      flex
                      items-center
                      justify-center
                      gap-3
                      transition-all
                      duration-300
                      shadow-[0_20px_50px_rgba(14,122,83,0.22)]
                      "
                    >
                      {isLogin
                        ? "Login Now"
                        : "Submit Verification"}

                      <ArrowRight size={20} />
                    </motion.button>
                  </form>

                  {/* FOOTER */}
                  <p
                    className="
                    mt-8
                    text-center
                    text-gray-500
                    "
                  >
                    {isLogin
                      ? "Don’t have an account?"
                      : "Already have an account?"}

                    <button
                      onClick={() =>
                        setIsLogin(!isLogin)
                      }
                      className="
                      ml-2
                      text-[#0E7A53]
                      font-bold
                      hover:underline
                      "
                    >
                      {isLogin
                        ? "Sign Up"
                        : "Login"}
                    </button>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NationAuraAuth;

/* ================================= */
/* INPUT FIELD */
/* ================================= */

const InputField = ({
  icon,
  placeholder,
  type,
}) => {
  return (
    <div className="relative">
      <span
        className="
        absolute
        left-5
        top-1/2
        -translate-y-1/2
        text-gray-400
        "
      >
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        className="
        w-full
        bg-[#FAFAFA]
        border
        border-gray-200
        rounded-2xl
        py-5
        pl-14
        pr-5
        outline-none
        text-black
        transition-all
        duration-300
        focus:border-[#0E7A53]
        focus:ring-4
        focus:ring-green-100
        "
      />
    </div>
  );
};