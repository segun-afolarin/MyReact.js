// src/pages/AuthPage.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import Navbar    from "../components/layout/Navbas";
import Footer    from "../components/footer/Footer";
import authImage from "../assets/about-hero.jpg";

import { useAuth } from "../context/AuthContext";

// ─── Stats ────────────────────────────────────────────────────────────────────

const stats = [
  { number: "12K+", label: "Infrastructure Reports"   },
  { number: "500+", label: "Communities Reached"       },
  { number: "98%",  label: "AI Verification Accuracy"  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

const AuthPage = () => {
  const [isLogin, setIsLogin]           = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError]     = useState(null);

  const [formData, setFormData] = useState({
    name:            "",
    email:           "",
    password:        "",
    confirmPassword: "",
  });

  const { login, register, loading, error, clearError } = useAuth();

  // ── Combined error: server error takes priority, else local ───────────────
  const displayError = error || localError;

  // ── Handle input change ───────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError();
    setLocalError(null);
  };

  // ── Switch tab ────────────────────────────────────────────────────────────
  const switchTab = (loginState) => {
    setIsLogin(loginState);
    clearError();
    setLocalError(null);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  // ── Extract the first readable error from a Laravel 422 response ──────────
  const extractLaravelError = (err) => {
    const data = err?.response?.data;
    if (!data) return "Something went wrong. Please try again.";

    // Laravel sends { errors: { field: ["message"] } }
    if (data.errors) {
      const firstField = Object.values(data.errors)[0];
      if (Array.isArray(firstField) && firstField.length > 0) {
        return firstField[0];
      }
    }

    // Fallback to top-level message
    return data.message || "Something went wrong. Please try again.";
  };

  // ── Handle submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (isLogin) {
      // ── LOGIN ──────────────────────────────────────────────────────────────
      if (!formData.email || !formData.password) {
        setLocalError("Please enter your email and password.");
        return;
      }

      try {
        await login({
          email:    formData.email.trim(),
          password: formData.password,
        });
      } catch (err) {
        setLocalError(extractLaravelError(err));
      }

    } else {
      // ── REGISTER ───────────────────────────────────────────────────────────
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setLocalError("Please fill in all fields.");
        return;
      }
      if (formData.password.length < 8) {
        setLocalError("Password must be at least 8 characters.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setLocalError("Passwords do not match.");
        return;
      }

      try {
        await register({
          name:                  formData.name.trim(),
          email:                 formData.email.trim(),
          password:              formData.password,
          password_confirmation: formData.confirmPassword,
        });
      } catch (err) {
        setLocalError(extractLaravelError(err));
      }
    }
  };

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F8F7] overflow-hidden">
      <Navbar />

      <section className="relative pt-40 pb-28 px-4 sm:px-6 lg:px-10 overflow-hidden">

        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:70px_70px]" />

        {/* GLOW */}
        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-green-100 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">

          {/* ── LEFT SIDE ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-5 py-3 rounded-full text-sm font-semibold text-[#0E7A53] mb-8">
              <Sparkles size={16} />
              AI-Powered Civic Platform
            </div>

            <h1 className="text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight text-black max-w-2xl">
              Create Impact.
              <br />
              Build A
              <span className="text-[#0E7A53]"> Smarter Nigeria.</span>
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-gray-600 max-w-xl">
              Join thousands of citizens using NationAura to report infrastructure
              issues, improve transparency, and transform communities through civic technology.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-5">
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-black/5 rounded-[28px] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
                >
                  <h3 className="text-3xl font-black text-black">{item.number}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4 }}
              className="relative mt-12 overflow-hidden rounded-[40px] border border-black/5 shadow-[0_30px_90px_rgba(0,0,0,0.08)]"
            >
              <img src={authImage} alt="NationAura" className="w-full h-[320px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 max-w-sm rounded-[28px] bg-white/10 backdrop-blur-2xl border border-white/10 p-6 text-white"
              >
                <h3 className="text-2xl font-black leading-tight">Technology For Civic Transparency</h3>
                <p className="mt-4 text-white/75 leading-relaxed">
                  Empowering citizens with real-time reporting, AI verification, and public accountability.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT SIDE ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[40px] bg-white/90 backdrop-blur-2xl border border-black/5 shadow-[0_30px_100px_rgba(0,0,0,0.08)] p-7 sm:p-10 md:p-12">

              {/* TOP GLOW */}
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-green-100 rounded-full blur-3xl opacity-50" />

              {/* TOGGLE */}
              <div className="relative flex bg-[#F3F4F6] rounded-full p-1 mb-10">
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[#0E7A53] ${isLogin ? "left-1" : "left-1/2"}`}
                />
                <button
                  type="button"
                  onClick={() => switchTab(true)}
                  className={`relative z-10 flex-1 py-3 rounded-full font-semibold transition-all ${isLogin ? "text-white" : "text-gray-600"}`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => switchTab(false)}
                  className={`relative z-10 flex-1 py-3 rounded-full font-semibold transition-all ${!isLogin ? "text-white" : "text-gray-600"}`}
                >
                  Sign Up
                </button>
              </div>

              {/* ANIMATED FORM */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* HEADER */}
                  <div className="mb-10">
                    <div className="inline-flex items-center gap-2 bg-green-50 text-[#0E7A53] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <Sparkles size={15} />
                      {isLogin ? "Welcome Back" : "Create Account"}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight">
                      {isLogin ? "Continue Your Civic Impact." : "Join The Movement For Transparency."}
                    </h2>
                    <p className="mt-5 text-gray-600 text-lg leading-relaxed">
                      {isLogin
                        ? "Access your dashboard and continue reporting infrastructure issues."
                        : "Create your account and start improving communities through civic technology."}
                    </p>
                  </div>

                  {/* GOOGLE */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-4 bg-white border border-gray-200 hover:border-gray-300 py-4 rounded-2xl font-semibold text-gray-700 transition-all duration-300 shadow-sm"
                  >
                    <FcGoogle size={24} />
                    Continue with Google
                  </motion.button>

                  {/* DIVIDER */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-sm text-gray-400">OR CONTINUE WITH EMAIL</span>
                    </div>
                  </div>

                  {/* ERROR BANNER */}
                  <AnimatePresence>
                    {displayError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="mb-5 px-5 py-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium"
                      >
                        {displayError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* FORM */}
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                    {!isLogin && (
                      <InputField
                        icon={<User size={18} />}
                        placeholder="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    )}

                    <InputField
                      icon={<Mail size={18} />}
                      placeholder="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <div className="relative">
                      <InputField
                        icon={<Lock size={18} />}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {!isLogin && (
                      <InputField
                        icon={<Lock size={18} />}
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    )}

                    {/* REMEMBER ME */}
                    {isLogin && (
                      <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                          <input type="checkbox" className="accent-[#0E7A53]" />
                          Remember me
                        </label>
                        <button type="button" className="text-[#0E7A53] font-semibold hover:underline">
                          Forgot Password?
                        </button>
                      </div>
                    )}

                    {/* SUBMIT */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full bg-[#0E7A53] hover:bg-[#095c3e] disabled:opacity-70 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_20px_50px_rgba(14,122,83,0.22)]"
                    >
                      {loading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Please wait...
                        </>
                      ) : (
                        <>
                          {isLogin ? "Login Now" : "Create Account"}
                          <ArrowRight size={20} />
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* SWITCH */}
                  <p className="mt-8 text-center text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      onClick={() => switchTab(!isLogin)}
                      className="ml-2 text-[#0E7A53] font-bold hover:underline"
                    >
                      {isLogin ? "Sign Up" : "Login"}
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

export default AuthPage;

// ─── InputField ───────────────────────────────────────────────────────────────

const InputField = ({ icon, placeholder, type, name, value, onChange, required }) => (
  <div className="relative">
    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={name === "email" ? "email" : name === "password" ? "current-password" : "off"}
      className="w-full bg-[#FAFAFA] border border-gray-200 rounded-2xl py-5 pl-14 pr-5 outline-none text-black transition-all duration-300 focus:border-[#0E7A53] focus:ring-4 focus:ring-green-100"
    />
  </div>
);