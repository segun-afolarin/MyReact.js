import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiUser, FiShield, FiCamera, FiEdit3, FiSave,
  FiX, FiMail, FiPhone, FiMapPin, FiLock,
  FiAward, FiCheckCircle, FiTrash2,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext"; // ← adjust depth if needed
import api from "../../api/axios"; // ← same axios instance AuthContext uses (adjust depth if needed)

const SettingsProfile = ({ darkMode }) => {
  const { user, setUser } = useAuth();
  // ⚠️ NOTE: your current AuthContext does NOT expose `setUser` in its
  // provider value — only `user`. You need to add `setUser` to the
  // `value={{ ... }}` object in AuthContext.jsx so this component (and any
  // other) can update the cached user after a profile edit. See the
  // AuthContext patch note at the bottom of this file.

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // imageFile holds the raw File object for upload; profile.image is just
  // the preview (base64 or existing URL) shown in the <img>
  const [imageFile, setImageFile] = useState(null);

  const [profile, setProfile] = useState({
    name:     "",
    phone:    "",
    location: "",
    email:    "",
    id:       "NA-20492",
    image:    "",
  });

  // ── Seed from auth user (source of truth from Laravel /api/user) ──────────
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name:     user.name       || prev.name,
        email:    user.email      || prev.email,
        phone:    user.phone      || "",
        location: user.location   || "",
        id:       user.id ? `NA-${String(user.id).padStart(5, "0")}` : prev.id,
        image:    user.avatar_url || "",
      }));
    }
  }, [user]);

  // ── Upload image (just preview + keep the File for submission) ────────────
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setProfile((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  // ── Remove image ───────────────────────────────────────────────────────────
  const removeImage = () => {
    setProfile((prev) => ({ ...prev, image: "" }));
    setImageFile(null);
  };

  // ── Save → real Laravel call ────────────────────────────────────────────
  const saveProfile = async () => {
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("_method", "PUT"); // Laravel method-spoofing for file uploads
      formData.append("name", profile.name);
      formData.append("phone", profile.phone);
      formData.append("location", profile.location);
      if (imageFile) {
        formData.append("avatar", imageFile);
      }

      // Using POST here (not put()) because of the _method spoofing above —
      // `api` is your existing axios instance, so the Sanctum token header
      // is already attached the same way it is for login/register.
      const { data } = await api.post("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = data.user;

      // Keep AuthContext's cached user in sync (see note at top re: setUser)
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setProfile((prev) => ({
        ...prev,
        name: updatedUser.name,
        phone: updatedUser.phone || "",
        location: updatedUser.location || "",
        image: updatedUser.avatar_url || prev.image,
      }));

      setImageFile(null);
      setEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err.response?.data || err);

      // Same pattern as AuthContext's extractError — show the first
      // validation error if present, else a generic message.
      const data = err.response?.data;
      if (data?.errors) {
        const firstField = Object.values(data.errors)[0];
        setError(Array.isArray(firstField) ? firstField[0] : "Validation failed.");
      } else {
        setError(data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ── Cancel ─────────────────────────────────────────────────────────────────
  const cancelEdit = () => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name:     user.name     || prev.name,
        phone:    user.phone    || "",
        location: user.location || "",
        image:    user.avatar_url || "",
      }));
    }
    setImageFile(null);
    setError("");
    setEditing(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        relative overflow-hidden border
        ${darkMode ? "bg-[#081019] border-green-500/20" : "bg-white border-green-200"}
      `}
    >
      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* GLOW */}
      <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] bg-green-500/10 blur-[120px]" />

      <div className="relative z-10 p-5 sm:p-8 lg:p-10">

        {/* ── ERROR BANNER (only shows if save fails) ─────────────────────── */}
        {error && (
          <div className="mb-5 border border-red-500/30 bg-red-500/10 text-red-500 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-10 justify-between">

          {/* ── PROFILE ─────────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row gap-7 items-center">

            {/* AVATAR */}
            <div className="relative flex-shrink-0">
              <div className={`
                h-32 w-32 border overflow-hidden flex items-center justify-center
                shadow-[0_0_50px_rgba(34,197,94,.25)]
                ${darkMode ? "border-green-500/30 bg-green-500/10" : "border-green-300 bg-green-50"}
              `}>
                {profile.image ? (
                  <img src={profile.image} className="w-full h-full object-cover" alt="profile" />
                ) : (
                  <FiUser size={55} className="text-green-500" />
                )}
              </div>

              {/* UPLOAD button — shown when editing */}
              <AnimatePresence>
                {editing && (
                  <motion.label
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 text-black flex items-center justify-center cursor-pointer z-10"
                    title="Upload photo"
                  >
                    <FiCamera />
                    <input type="file" hidden accept="image/*" onChange={uploadImage} />
                  </motion.label>
                )}
              </AnimatePresence>

              {/* REMOVE IMAGE button — shown when editing and image exists */}
              <AnimatePresence>
                {editing && profile.image && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={removeImage}
                    title="Remove photo"
                    className="absolute top-0 left-0 w-10 h-10 bg-red-500 text-white flex items-center justify-center z-10"
                  >
                    <FiTrash2 size={16} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* VERIFIED BADGE */}
              {!editing && (
                <div className={`
                  absolute bottom-2 right-2 translate-x-1/2 translate-y-1/2
                  bg-green-500 border-4 w-8 h-8 flex items-center justify-center
                  ${darkMode ? "border-[#081019]" : "border-white"}
                `}>
                  <FiCheckCircle className="text-white" />
                </div>
              )}
            </div>

            {/* TEXT */}
            <div className="flex-1">
              <div className="flex gap-2 items-center text-green-500 font-bold text-xs uppercase tracking-[.25em]">
                <FiShield />
                Verified Citizen
              </div>

              {/* NAME — editable */}
              {editing ? (
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Full name"
                  className={`
                    mt-3 w-full text-3xl sm:text-4xl font-black tracking-tight
                    border-b-2 border-green-500 bg-transparent outline-none pb-1
                    ${darkMode ? "text-white" : "text-black"}
                  `}
                />
              ) : (
                <h1 className={`mt-3 text-3xl sm:text-5xl font-black tracking-tight ${darkMode ? "text-white" : "text-black"}`}>
                  {profile.name || "Citizen"}
                </h1>
              )}

              <p className={`mt-3 max-w-xl text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Your verified identity controls what information can be updated.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Tag icon={<FiAward />}>Top Contributor</Tag>
                <Tag icon={<FiLock />}>Identity Protected</Tag>
              </div>
            </div>
          </div>

          {/* ── EDIT / SAVE BUTTONS ──────────────────────────────────────── */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-green-500 text-black px-6 py-3 font-bold flex gap-2 items-center h-fit hover:bg-green-400 transition-colors"
            >
              <FiEdit3 />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3 h-fit">
              <button
                onClick={cancelEdit}
                disabled={saving}
                className={`
                  border px-5 py-3 flex gap-2 items-center font-semibold transition-colors disabled:opacity-50
                  ${darkMode ? "border-green-500/30 text-white hover:bg-green-500/10" : "border-green-300 text-gray-700 hover:bg-green-50"}
                `}
              >
                <FiX />
                Cancel
              </button>
              <button
                onClick={saveProfile}
                disabled={saving}
                className="bg-green-500 text-black px-5 py-3 flex gap-2 items-center font-bold hover:bg-green-400 transition-colors disabled:opacity-50"
              >
                <FiSave />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* ── DETAIL CARDS ─────────────────────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* EMAIL — locked, always from auth */}
          <Card
            darkMode={darkMode}
            icon={<FiMail />}
            title="Email"
            value={user?.email || profile.email}
            locked
          />

          {/* CITIZEN ID — locked */}
          <Card
            darkMode={darkMode}
            icon={<FiLock />}
            title="Citizen ID"
            value={profile.id}
            locked
          />

          {/* PHONE — editable */}
          <Card
            darkMode={darkMode}
            icon={<FiPhone />}
            title="Phone"
            value={profile.phone}
            edit={editing}
            change={(v) => setProfile({ ...profile, phone: v })}
          />

          {/* LOCATION — editable */}
          <Card
            darkMode={darkMode}
            icon={<FiMapPin />}
            title="Location"
            value={profile.location}
            edit={editing}
            change={(v) => setProfile({ ...profile, location: v })}
          />
        </div>
      </div>
    </motion.section>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const Card = ({ icon, title, value, locked, edit, change, darkMode }) => (
  <div className={`
    border p-5 transition-colors
    ${darkMode
      ? "border-green-500/20 bg-green-500/[0.03] hover:bg-green-500/[0.06]"
      : "border-green-200 bg-green-50/40 hover:bg-green-50"}
  `}>
    <div className="text-green-500 text-xl mb-3">{icon}</div>

    <p className={`text-xs uppercase tracking-widest ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
      {title}
    </p>

    {edit ? (
      <input
        value={value}
        onChange={(e) => change(e.target.value)}
        className={`
          mt-2 w-full border-b bg-transparent p-1 outline-none text-sm font-semibold
          border-green-500 focus:border-green-400
          ${darkMode ? "text-white" : "text-black"}
        `}
      />
    ) : (
      <h3 className={`font-bold mt-2 text-sm break-words ${darkMode ? "text-white" : "text-black"}`}>
        {value || "—"}
      </h3>
    )}

    {locked && (
      <div className="mt-3 text-xs text-green-500/60 flex gap-1 items-center">
        <FiLock size={11} />
        Locked
      </div>
    )}
  </div>
);

// ─── Tag ──────────────────────────────────────────────────────────────────────

const Tag = ({ children, icon }) => (
  <div className="border border-green-500/20 bg-green-500/5 px-3 py-2 flex gap-2 items-center text-sm text-green-600">
    {icon}
    {children}
  </div>
);

export default SettingsProfile;

/*
─────────────────────────────────────────────────────────────────────────────
REQUIRED PATCH — AuthContext.jsx
─────────────────────────────────────────────────────────────────────────────
Your current AuthContext.jsx does NOT expose `setUser` to consumers — only
`user`. SettingsProfile needs to update the cached user after a successful
save (so other parts of your app immediately see the new name/phone/etc.
without needing a page refresh).

Add `setUser` to the value object near the bottom of AuthContext.jsx:

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,        // ← ADD THIS LINE
        loading,
        error,
        isReady,
        isLoggedIn: !!user,
        login,
        logout,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

That's the only change needed in AuthContext.jsx — everything else (token
handling, login/logout, axios instance) stays exactly as you have it, since
SettingsProfile uses your existing `api` instance which already attaches the
Sanctum token the same way it does for /login and /user.
─────────────────────────────────────────────────────────────────────────────
*/