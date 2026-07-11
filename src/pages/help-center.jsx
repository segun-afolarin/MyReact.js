import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiSend, FiCpu, FiUser, FiMenu, FiPlus, FiSearch,
  FiArrowLeft, FiMapPin, FiActivity, FiUsers, FiPhone,
  FiX, FiChevronRight, FiMoreVertical, FiBookmark,
  FiEdit2, FiArchive, FiTrash2, FiMic, FiMicOff,
  FiVolume2, FiVolumeX,
} from "react-icons/fi";

// ---------------------------------------------------------------------------
// Static content
// ---------------------------------------------------------------------------

const quickActions = [
  {
    icon: FiMapPin,
    title: "Report an issue",
    desc: "Roads, drainage, bridges, power, water",
    prompt: "How do I report an issue?",
  },
  {
    icon: FiActivity,
    title: "Track a report",
    desc: "Check status with your reference code",
    prompt: "I want to track a report",
  },
  {
    icon: FiUsers,
    title: "Community guidelines",
    desc: "What can and can't be reported",
    prompt: "Community guidelines",
  },
  {
    icon: FiPhone,
    title: "Talk to a person",
    desc: "Escalate to the support team",
    prompt: "Contact support",
  },
];

const welcomeMessage = [
  {
    type: "assistant",
    text:
      "Hello — I'm the NationAura Civic Assistant. I help citizens report, track, and resolve infrastructure issues across Nigeria. What do you need help with?",
    time: new Date(),
  },
];

const statusTone = {
  Resolved: "text-green-700 bg-green-50 border-green-200",
  "In Progress": "text-amber-700 bg-amber-50 border-amber-200",
  Assigned: "text-blue-700 bg-blue-50 border-blue-200",
  Active: "text-green-700 bg-green-50 border-green-200",
};

const VOICE_LANG = "en-NG";

const formatTime = (d) =>
  d.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" });

// Fallback used only if the chat request itself fails (network/server error) —
// not for normal conversation, which is handled server-side by the AI.
const OFFLINE_REPLY =
  "Sorry, I couldn't reach the assistant just now. Please try again in a moment, or reach our support team at support@nationaura.ng.";

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

const IconBox = ({ icon: Icon, tone = "green" }) => (
  <div
    className={`flex h-11 w-11 shrink-0 items-center justify-center text-lg ${
      tone === "green"
        ? "bg-green-900 text-white"
        : "bg-stone-900 text-white"
    }`}
  >
    <Icon />
  </div>
);

const StatusDot = ({ active }) => (
  <span className="relative flex h-2 w-2">
    {active && (
      <span className="absolute inline-flex h-full w-full animate-ping bg-green-500 opacity-75" />
    )}
    <span className={`relative inline-flex h-2 w-2 ${active ? "bg-green-500" : "bg-stone-300"}`} />
  </span>
);

// Single conversation row: click to open, "..." to pin/rename/archive/delete.
const ConversationItem = ({
  chat, isActive, onSelect,
  isRenaming, renameValue, onRenameChange, onRenameSubmit, onStartRename,
  menuOpen, onToggleMenu,
  confirming, onTogglePin, onArchive, onRequestDelete, onConfirmDelete,
}) => (
  <div data-conv-menu className="group relative">
    <button
      onClick={() => !isRenaming && onSelect()}
      className={`flex w-full items-start gap-3 border px-3 py-3 text-left transition-colors ${
        isActive ? "border-green-800 bg-green-50" : "border-transparent hover:border-stone-200 hover:bg-stone-50"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          {isRenaming ? (
            <input
              autoFocus
              value={renameValue}
              onChange={(e) => onRenameChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter") onRenameSubmit();
                if (e.key === "Escape") onRenameSubmit(true);
              }}
              onBlur={() => onRenameSubmit()}
              className="w-full border border-green-800 bg-white px-1.5 py-0.5 text-[13.5px] font-semibold text-stone-800 outline-none"
            />
          ) : (
            <h3 className="flex min-w-0 items-center gap-1.5 text-[13.5px] font-semibold text-stone-800">
              {chat.pinned && <FiBookmark className="h-3 w-3 shrink-0 text-green-700" />}
              <span className="truncate">{chat.title}</span>
            </h3>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMenu();
            }}
            className={`shrink-0 p-1 text-stone-400 hover:text-stone-700 ${
              menuOpen ? "text-stone-700" : "opacity-0 group-hover:opacity-100 focus:opacity-100"
            }`}
            aria-label="Conversation options"
          >
            <FiMoreVertical className="h-3.5 w-3.5" />
          </button>
        </div>

        {!isRenaming && (
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className={`border px-1.5 py-0.5 text-[10px] font-semibold ${statusTone[chat.status] || "border-stone-200 bg-stone-50 text-stone-600"}`}
            >
              {chat.status}
            </span>
            <span className="text-[11px] text-stone-400">{chat.when}</span>
          </div>
        )}
      </div>
    </button>

    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.12 }}
          className="absolute right-2 top-10 z-10 w-48 border border-stone-200 bg-white shadow-lg"
        >
          <button
            onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] text-stone-700 hover:bg-stone-50"
          >
            <FiBookmark className="h-3.5 w-3.5" /> {chat.pinned ? "Unpin" : "Pin conversation"}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onStartRename(); }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] text-stone-700 hover:bg-stone-50"
          >
            <FiEdit2 className="h-3.5 w-3.5" /> Rename
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onArchive(); }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] text-stone-700 hover:bg-stone-50"
          >
            <FiArchive className="h-3.5 w-3.5" /> {chat.archived ? "Unarchive" : "Archive"}
          </button>
          <div className="h-px bg-stone-100" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              confirming ? onConfirmDelete() : onRequestDelete();
            }}
            className={`flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors ${
              confirming ? "bg-red-50 text-red-700" : "text-red-600 hover:bg-red-50"
            }`}
          >
            <FiTrash2 className="h-3.5 w-3.5" /> {confirming ? "Click to confirm delete" : "Delete"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Speaker button shown under an assistant bubble — tap to hear it, tap again to stop.
const ListenButton = ({ text, index, speakingIndex, onToggle, supported }) => {
  if (!supported) return null;
  const isSpeaking = speakingIndex === index;

  return (
    <button
      onClick={() => onToggle(text, index)}
      aria-label={isSpeaking ? "Stop reading reply aloud" : "Read reply aloud"}
      className={`mt-1.5 flex items-center gap-1.5 border px-2 py-1 text-[11px] font-semibold transition-colors ${
        isSpeaking
          ? "border-green-800 bg-green-50 text-green-800"
          : "border-stone-200 text-stone-500 hover:border-green-800 hover:text-green-800"
      }`}
    >
      {isSpeaking ? <FiVolumeX className="h-3 w-3" /> : <FiVolume2 className="h-3 w-3" />}
      {isSpeaking ? "Stop" : "Listen"}
    </button>
  );
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const HelpCenter = () => {
  const [messages, setMessages] = useState(welcomeMessage);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sidebar, setSidebar] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  // null = a fresh, unsaved conversation — nothing added to history until
  // the user actually sends a message.
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  // Starts empty — real conversations are added to this as the user actually
  // chats (see sendMessage). Nothing here is seeded or hardcoded.
  const [chatHistory, setChatHistory] = useState([]);

  // ── Voice: input (speech-to-text) and output (text-to-speech) ──────────
  const [listening, setListening] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const [speakerSupported, setSpeakerSupported] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const recognitionRef = useRef(null);

  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    const handleResize = () => setSidebar(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close any open conversation menu when clicking outside of it.
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("[data-conv-menu]")) {
        setOpenMenuId(null);
        setConfirmDeleteId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Set up speech recognition once. Falls back gracefully (mic button just
  // won't render) on browsers that don't support it — mainly older Safari.
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicSupported(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = VOICE_LANG;
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);

      recognitionRef.current = recognition;
    }

    if (!window.speechSynthesis) {
      setSpeakerSupported(false);
    }

    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    setInput("");
    try {
      recognition.start();
      setListening(true);
    } catch {
      // start() throws if called while already running — ignore, state stays in sync via onend.
    }
  };

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === VOICE_LANG) ||
      voices.find((v) => v.lang === "en-GB") ||
      voices.find((v) => v.lang?.startsWith("en")) ||
      voices[0]
    );
  };

  const toggleSpeak = (text, index) => {
    if (!window.speechSynthesis) return;

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel(); // only one reply reads at a time
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANG;
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async (text) => {
    const clean = text.trim();
    if (!clean || typing) return;

    if (listening) toggleListening();

    const userMsg = { type: "user", text: clean, time: new Date() };
    const messagesSoFar = [...messages, userMsg];

    setMessages(messagesSoFar);
    setInput("");
    setTyping(true);

    // Only now — on the first real message of a fresh conversation — do we
    // create a sidebar entry. Opening "New conversation" and never asking
    // anything leaves no trace in the history.
    if (activeChat === null) {
      const newId = Date.now();
      setChatHistory((prev) => [
        { id: newId, title: clean.length > 40 ? clean.slice(0, 40) + "…" : clean, status: "Active", when: "Just now", pinned: false, archived: false },
        ...prev,
      ]);
      setActiveChat(newId);
    }

    try {
      // Send a little context so the assistant can follow the thread, but
      // keep the payload small. The backend is stateless and public — it
      // never has a session, so this is the only context it gets.
      const history = messagesSoFar
        .slice(0, -1)
        .slice(-10)
        .map((m) => ({ role: m.type === "assistant" ? "assistant" : "user", text: m.text }));

      const res = await fetch("/api/help-center/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, history }),
      });

      if (!res.ok) throw new Error(`Chat request failed (${res.status})`);

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { type: "assistant", text: data.reply || OFFLINE_REPLY, time: new Date() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "assistant", text: OFFLINE_REPLY, time: new Date() },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleNewConversation = () => {
    setMessages(welcomeMessage);
    setActiveChat(null);
    if (window.innerWidth < 1024) setSidebar(false);
    inputRef.current?.focus();
  };

  const togglePin = (id) => {
    setChatHistory((prev) => prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)));
    setOpenMenuId(null);
  };

  const toggleArchive = (id) => {
    setChatHistory((prev) => prev.map((c) => (c.id === id ? { ...c, archived: !c.archived } : c)));
    setOpenMenuId(null);
  };

  const deleteChat = (id) => {
    setChatHistory((prev) => prev.filter((c) => c.id !== id));
    if (activeChat === id) {
      setActiveChat(null);
      setMessages(welcomeMessage);
    }
    setOpenMenuId(null);
    setConfirmDeleteId(null);
  };

  const startRename = (chat) => {
    setRenamingId(chat.id);
    setRenameValue(chat.title);
    setOpenMenuId(null);
  };

  const submitRename = (cancel = false) => {
    if (!cancel && renamingId !== null) {
      const trimmed = renameValue.trim();
      if (trimmed) {
        setChatHistory((prev) => prev.map((c) => (c.id === renamingId ? { ...c, title: trimmed } : c)));
      }
    }
    setRenamingId(null);
  };

  const matchesSearch = (c) => c.title.toLowerCase().includes(search.toLowerCase());
  const pinnedList = chatHistory.filter((c) => c.pinned && !c.archived && matchesSearch(c));
  const recentList = chatHistory.filter((c) => !c.pinned && !c.archived && matchesSearch(c));
  const archivedList = chatHistory.filter((c) => c.archived && matchesSearch(c));
  const nothingFound = pinnedList.length === 0 && recentList.length === 0 && (!showArchived || archivedList.length === 0);

  const itemProps = (chat) => ({
    chat,
    isActive: activeChat === chat.id,
    onSelect: () => setActiveChat(chat.id),
    isRenaming: renamingId === chat.id,
    renameValue,
    onRenameChange: setRenameValue,
    onRenameSubmit: submitRename,
    onStartRename: () => startRename(chat),
    menuOpen: openMenuId === chat.id,
    onToggleMenu: () => {
      setOpenMenuId((prev) => (prev === chat.id ? null : chat.id));
      setConfirmDeleteId(null);
    },
    confirming: confirmDeleteId === chat.id,
    onTogglePin: () => togglePin(chat.id),
    onArchive: () => toggleArchive(chat.id),
    onRequestDelete: () => setConfirmDeleteId(chat.id),
    onConfirmDelete: () => deleteChat(chat.id),
  });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-stone-100">

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebar && (
          <div className="contents">
            {/* mobile scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebar(false)}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            />

            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-50 flex h-full w-[300px] flex-col border-r border-stone-200 bg-white lg:relative"
            >
              {/* TOP */}
              <div className="border-b border-stone-100 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-stone-500 transition-colors hover:text-green-800"
                  >
                    <FiArrowLeft className="h-3.5 w-3.5" /> Back home
                  </Link>
                  <button
                    onClick={() => setSidebar(false)}
                    className="text-stone-400 hover:text-stone-700 lg:hidden"
                    aria-label="Close sidebar"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-green-900">
                    <img src="/images/logo.png" alt="NationAura" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold leading-tight text-stone-900">NationAura</h2>
                    <p className="text-xs font-medium text-green-700">Civic Assistant</p>
                  </div>
                </div>

                <button
                  onClick={handleNewConversation}
                  className="mt-6 flex h-[48px] w-full items-center justify-center gap-2 bg-green-900 text-[14px] font-semibold text-white transition-colors hover:bg-green-800"
                >
                  <FiPlus className="h-4 w-4" /> New conversation
                </button>
              </div>

              {/* SEARCH */}
              <div className="p-5 pb-3">
                <div className="relative">
                  <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search conversations"
                    className="h-11 w-full border border-stone-200 bg-stone-50 pl-10 pr-4 text-[13.5px] text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-green-800 focus:bg-white"
                  />
                </div>
              </div>

              {/* HISTORY */}
              <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
                {nothingFound && (
                  <p className="px-2 py-6 text-center text-xs text-stone-400">No conversations found</p>
                )}

                {pinnedList.length > 0 && (
                  <>
                    <p className="px-2 pb-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                      Pinned
                    </p>
                    {pinnedList.map((chat) => (
                      <ConversationItem key={chat.id} {...itemProps(chat)} />
                    ))}
                  </>
                )}

                {recentList.length > 0 && (
                  <>
                    <p className="px-2 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400">
                      Recent
                    </p>
                    {recentList.map((chat) => (
                      <ConversationItem key={chat.id} {...itemProps(chat)} />
                    ))}
                  </>
                )}

                {archivedList.length > 0 && (
                  <>
                    <button
                      onClick={() => setShowArchived((v) => !v)}
                      className="mt-3 flex w-full items-center justify-between px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-400 hover:text-stone-600"
                    >
                      <span>Archived ({archivedList.length})</span>
                      <FiChevronRight className={`h-3 w-3 transition-transform ${showArchived ? "rotate-90" : ""}`} />
                    </button>
                    {showArchived && archivedList.map((chat) => (
                      <ConversationItem key={chat.id} {...itemProps(chat)} />
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="flex h-full flex-1 flex-col">

        {/* HEADER */}
        <div className="flex h-[76px] items-center justify-between border-b border-stone-200 bg-white px-5 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebar(!sidebar)}
              className="flex h-10 w-10 items-center justify-center border border-stone-200 text-stone-600 hover:border-stone-300 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <FiMenu />
            </button>

            <IconBox icon={FiCpu} />

            <div>
              <h2 className="text-[15px] font-bold text-stone-900">NationAura Civic Assistant</h2>
              <p className="flex items-center gap-1.5 text-xs text-stone-500">
                <StatusDot active /> Online, replies in seconds
              </p>
            </div>
          </div>

          <a
            href="mailto:support@nationaura.ng"
            className="hidden items-center gap-2 border border-stone-200 px-3.5 py-2 text-xs font-semibold text-stone-600 transition-colors hover:border-green-800 hover:text-green-800 md:flex"
          >
            <FiPhone className="h-3.5 w-3.5" /> Contact support
          </a>
        </div>

        {/* CHAT BODY */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
          <div className="mx-auto max-w-3xl space-y-6">

            {/* QUICK ACTIONS */}
            {messages.length === 1 && (
              <div className="grid grid-cols-1 gap-3 pb-2 sm:grid-cols-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => sendMessage(action.prompt)}
                    className="flex items-start gap-3 border border-stone-200 bg-white p-4 text-left transition-colors hover:border-green-800 hover:bg-green-50"
                  >
                    <IconBox icon={action.icon} />
                    <div>
                      <h3 className="text-[13.5px] font-semibold text-stone-900">{action.title}</h3>
                      <p className="mt-0.5 text-xs text-stone-500">{action.desc}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* MESSAGES */}
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[85%] gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                  <IconBox
                    icon={message.type === "assistant" ? FiCpu : FiUser}
                    tone={message.type === "assistant" ? "green" : "dark"}
                  />
                  <div className={message.type === "user" ? "flex flex-col items-end" : ""}>
                    <div
                      className={`border px-5 py-3.5 text-[14.5px] leading-relaxed ${
                        message.type === "assistant"
                          ? "border-stone-200 bg-white text-stone-700"
                          : "border-green-900 bg-green-900 text-white"
                      }`}
                    >
                      {message.text}
                    </div>

                    {message.type === "assistant" && (
                      <ListenButton
                        text={message.text}
                        index={index}
                        speakingIndex={speakingIndex}
                        onToggle={toggleSpeak}
                        supported={speakerSupported}
                      />
                    )}

                    <p
                      className={`mt-1.5 text-[10.5px] text-stone-400 ${
                        message.type === "user" ? "text-right" : ""
                      }`}
                    >
                      {formatTime(message.time)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* TYPING */}
            <AnimatePresence>
              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <IconBox icon={FiCpu} />
                  <div className="flex items-center gap-1.5 border border-stone-200 bg-white px-5 py-4">
                    <span className="h-1.5 w-1.5 animate-bounce bg-green-700 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce bg-green-700 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce bg-green-700" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* INPUT */}
        <div className="border-t border-stone-200 bg-white px-4 py-5 md:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              {micSupported && (
                <button
                  onClick={toggleListening}
                  aria-label={listening ? "Stop voice typing" : "Speak your message"}
                  className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center border transition-colors ${
                    listening
                      ? "border-red-600 bg-red-50 text-red-600"
                      : "border-stone-200 text-stone-500 hover:border-green-800 hover:text-green-800"
                  }`}
                >
                  {listening ? <FiMicOff className="h-4 w-4" /> : <FiMic className="h-4 w-4" />}
                </button>
              )}

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(input);
                }}
                placeholder={listening ? "Listening... speak now" : "Message NationAura Civic Assistant..."}
                className="h-[52px] flex-1 border border-stone-200 bg-white px-4 text-[14.5px] text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-green-800"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center bg-green-900 text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiSend className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2.5 text-center text-[11px] text-stone-400">
              {micSupported ? "Tap the mic to speak instead of typing. " : ""}
              For life-threatening emergencies, contact local emergency services directly. We never ask for your password here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;