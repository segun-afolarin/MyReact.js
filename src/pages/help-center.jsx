import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Link } from "react-router-dom";

import {
  FiSend,
  FiCpu,
  FiUser,
  FiMenu,
  FiPlus,
  FiSearch,
  FiMessageSquare,
  FiArrowLeft,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";

const quickQuestions = [
  "How do I report an issue?",
  "Track my report",
  "Community guidelines",
  "Contact support",
];

const welcomeMessage = [
  {
    type: "assistant",
    text:
      "Hello 👋 I’m NationAura Civic Assistant. I help citizens report, track, and resolve infrastructure issues across Nigeria. How can I help you today?",
  },
];

const HelpCenter = () => {
  const [messages, setMessages] =
    useState(welcomeMessage);

  const [input, setInput] = useState("");

  const [typing, setTyping] =
    useState(false);

  const [sidebar, setSidebar] =
    useState(window.innerWidth >= 1024);

  const [chatHistory, setChatHistory] =
    useState([
      "Road Damage Support",
      "Water Supply Report",
      "Electricity Complaint",
    ]);

  const chatRef = useRef(null);

  /* AUTO SCROLL */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop =
        chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  /* HANDLE RESPONSIVE SIDEBAR */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebar(true);
      } else {
        setSidebar(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  /* SEND MESSAGE */
  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      type: "user",
      text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      let reply =
        "NationAura helps citizens report and track infrastructure issues in real-time.";

      if (
        text.toLowerCase().includes("report")
      ) {
        reply =
          "To report an issue, upload evidence, add the location, and describe the problem. Our AI system routes it to the appropriate authority instantly.";
      }

      if (
        text.toLowerCase().includes("track")
      ) {
        reply =
          "You can monitor your report status live: Submitted → Verified → Assigned → In Progress → Resolved.";
      }

      if (
        text.toLowerCase().includes("support")
      ) {
        reply =
          "Our support team is available 24/7 to help with civic complaints, verification, and technical assistance.";
      }

      const aiReply = {
        type: "assistant",
        text: reply,
      };

      setMessages((prev) => [
        ...prev,
        aiReply,
      ]);
    }, 1400);
  };

  /* NEW CHAT */
  const handleNewConversation = () => {
    setMessages(welcomeMessage);

    const newChat =
      "Conversation " +
      (chatHistory.length + 1);

    setChatHistory((prev) => [
      newChat,
      ...prev,
    ]);
  };

  return (
    <div
      className="
      h-screen
      w-full
      bg-[#F4F7F5]
      overflow-hidden
      flex
      "
    >
      {/* SIDEBAR */}
      <AnimatePresence>

        {sidebar && (
          <motion.div
            initial={{
              x: -80,
              opacity: 0,
            }}

            animate={{
              x: 0,
              opacity: 1,
            }}

            exit={{
              x: -80,
              opacity: 0,
            }}

            transition={{
              duration: 0.3,
            }}

            className="
            fixed
            lg:relative
            z-50
            w-[320px]
            h-full
            bg-white
            border-r
            border-gray-200
            flex
            flex-col
            shadow-xl
            "
          >
            {/* TOP */}
            <div
              className="
              p-6
              border-b
              border-gray-100
              "
            >
              {/* BACK */}
              <Link to="/">
                <motion.button
                  whileHover={{
                    x: -2,
                  }}

                  className="
                  flex
                  items-center
                  gap-3
                  text-gray-600
                  hover:text-green-700
                  transition-all
                  duration-300
                  mb-8
                  "
                >
                  <FiArrowLeft />

                  Back Home
                </motion.button>
              </Link>

              {/* LOGO */}
              <div
                className="
                flex
                items-center
                gap-4
                "
              >
                <div
                  className="
                  w-16
                  h-16
                  rounded-2xl
                  overflow-hidden
                  shadow-lg
                  "
                >
                  <img
                    src="/images/logo.png"
                    alt="NationAura"
                    className="
                    w-full
                    h-full
                    object-cover
                    "
                  />
                </div>

                <div>
                  <h2
                    className="
                    text-xl
                    font-black
                    text-gray-900
                    "
                  >
                    NationAura
                  </h2>

                  <p
                    className="
                    text-sm
                    text-green-700
                    font-medium
                    "
                  >
                    Civic AI Platform
                  </p>
                </div>
              </div>

              {/* NEW CHAT */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}

                whileTap={{
                  scale: 0.98,
                }}

                onClick={
                  handleNewConversation
                }

                className="
                mt-8
                w-full
                h-14
                rounded-2xl
                bg-green-700
                hover:bg-green-800
                text-white
                flex
                items-center
                justify-center
                gap-3
                font-semibold
                transition-all
                duration-300
                shadow-lg
                "
              >
                <FiPlus />

                New Conversation
              </motion.button>
            </div>

            {/* SEARCH */}
            <div className="p-5">
              <div className="relative">

                <FiSearch
                  className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  "
                />

                <input
                  type="text"
                  placeholder="Search conversations..."

                  className="
                  w-full
                  h-12
                  rounded-2xl
                  bg-gray-50
                  border
                  border-gray-200
                  pl-11
                  pr-4
                  outline-none
                  focus:border-green-400
                  transition-all
                  duration-300
                  "
                />

              </div>
            </div>

            {/* HISTORY */}
            <div
              className="
              flex-1
              overflow-y-auto
              px-4
              pb-5
              space-y-3
              "
            >
              {chatHistory.map(
                (chat, index) => (
                  <motion.button
                    key={index}

                    whileHover={{
                      x: 4,
                    }}

                    className="
                    w-full
                    flex
                    items-center
                    gap-4
                    p-4
                    rounded-2xl
                    hover:bg-green-50
                    transition-all
                    duration-300
                    text-left
                    "
                  >
                    <div
                      className="
                      w-11
                      h-11
                      rounded-xl
                      bg-green-100
                      text-green-700
                      flex
                      items-center
                      justify-center
                      "
                    >
                      <FiMessageSquare />
                    </div>

                    <div>
                      <h3
                        className="
                        text-sm
                        font-semibold
                        text-gray-800
                        "
                      >
                        {chat}
                      </h3>

                      <p
                        className="
                        text-xs
                        text-gray-500
                        "
                      >
                        AI assistance
                      </p>
                    </div>
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* MAIN */}
      <div
        className="
        flex-1
        flex
        flex-col
        h-full
        "
      >
        {/* HEADER */}
        <div
          className="
          h-20
          px-5
          md:px-8
          bg-white/90
          backdrop-blur-xl
          border-b
          border-gray-200
          flex
          items-center
          justify-between
          "
        >
          <div
            className="
            flex
            items-center
            gap-4
            "
          >
            {/* MOBILE MENU */}
            <button
              onClick={() =>
                setSidebar(!sidebar)
              }

              className="
              lg:hidden
              w-11
              h-11
              rounded-xl
              bg-green-100
              text-green-700
              flex
              items-center
              justify-center
              "
            >
              <FiMenu />
            </button>

            {/* AI ICON */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
              }}

              className="
              w-14
              h-14
              rounded-2xl
              bg-gradient-to-br
              from-green-600
              to-emerald-700
              text-white
              flex
              items-center
              justify-center
              text-2xl
              shadow-lg
              "
            >
              <FiCpu />
            </motion.div>

            <div>
              <h2
                className="
                font-bold
                text-gray-900
                text-lg
                "
              >
                NationAura Civic Assistant
              </h2>

              <p
                className="
                text-sm
                text-green-700
                flex
                items-center
                gap-2
                "
              >
                <FiZap />

                AI-powered civic intelligence
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div
            className="
            hidden
            md:flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-green-100
            text-green-700
            text-sm
            font-medium
            "
          >
            <FiCheckCircle />

            System Online
          </div>
        </div>

        {/* CHAT BODY */}
        <div
          ref={chatRef}

          className="
          flex-1
          overflow-y-auto
          px-4
          md:px-8
          py-8
          "
        >
          <div
            className="
            max-w-4xl
            mx-auto
            space-y-8
            "
          >
            {/* QUICK QUESTIONS */}
            {messages.length === 1 && (
              <div
                className="
                flex
                flex-wrap
                gap-3
                "
              >
                {quickQuestions.map(
                  (question, index) => (
                    <motion.button
                      key={index}

                      whileHover={{
                        y: -2,
                      }}

                      onClick={() =>
                        sendMessage(question)
                      }

                      className="
                      px-5
                      py-3
                      rounded-2xl
                      bg-white
                      border
                      border-gray-200
                      hover:border-green-300
                      hover:bg-green-50
                      transition-all
                      duration-300
                      text-sm
                      text-gray-700
                      shadow-sm
                      "
                    >
                      {question}
                    </motion.button>
                  )
                )}
              </div>
            )}

            {/* MESSAGES */}
            {messages.map(
              (message, index) => (
                <motion.div
                  key={index}

                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  className={`flex ${
                    message.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                    flex
                    gap-4
                    max-w-[90%]
                    ${
                      message.type === "user"
                        ? "flex-row-reverse"
                        : ""
                    }
                    `}
                  >
                    {/* ICON */}
                    <div
                      className={`
                      w-11
                      h-11
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      text-white
                      flex-shrink-0
                      ${
                        message.type ===
                        "assistant"
                          ? "bg-gradient-to-br from-green-600 to-emerald-700"
                          : "bg-gray-900"
                      }
                      `}
                    >
                      {message.type ===
                      "assistant" ? (
                        <FiCpu />
                      ) : (
                        <FiUser />
                      )}
                    </div>

                    {/* BUBBLE */}
                    <div
                      className={`
                      rounded-[28px]
                      px-6
                      py-5
                      text-[15px]
                      leading-relaxed
                      shadow-sm
                      ${
                        message.type ===
                        "assistant"
                          ? "bg-white text-gray-700"
                          : "bg-green-700 text-white"
                      }
                      `}
                    >
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              )
            )}

            {/* TYPING */}
            <AnimatePresence>

              {typing && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}

                  animate={{
                    opacity: 1,
                  }}

                  exit={{
                    opacity: 0,
                  }}

                  className="
                  flex
                  items-center
                  gap-4
                  "
                >
                  <div
                    className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-gradient-to-br
                    from-green-600
                    to-emerald-700
                    text-white
                    flex
                    items-center
                    justify-center
                    "
                  >
                    <FiCpu />
                  </div>

                  <div
                    className="
                    bg-white
                    rounded-[24px]
                    px-6
                    py-5
                    flex
                    items-center
                    gap-2
                    shadow-sm
                    "
                  >
                    <span
                      className="
                      w-2
                      h-2
                      rounded-full
                      bg-green-600
                      animate-bounce
                      "
                    />

                    <span
                      className="
                      w-2
                      h-2
                      rounded-full
                      bg-green-600
                      animate-bounce
                      "
                    />

                    <span
                      className="
                      w-2
                      h-2
                      rounded-full
                      bg-green-600
                      animate-bounce
                      "
                    />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* INPUT */}
        <div
          className="
          border-t
          border-gray-200
          bg-white/90
          backdrop-blur-xl
          px-4
          md:px-8
          py-5
          "
        >
          <div
            className="
            max-w-4xl
            mx-auto
            "
          >
            <div className="relative">

              <input
                type="text"

                value={input}

                onChange={(e) =>
                  setInput(e.target.value)
                }

                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage(input);
                  }
                }}

                placeholder="Message NationAura Civic Assistant..."

                className="
                w-full
                h-16
                rounded-3xl
                bg-white
                border
                border-gray-200
                px-6
                pr-20
                outline-none
                focus:border-green-400
                transition-all
                duration-300
                text-gray-700
                shadow-sm
                "
              />

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}

                whileTap={{
                  scale: 0.96,
                }}

                onClick={() =>
                  sendMessage(input)
                }

                className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                w-12
                h-12
                rounded-2xl
                bg-green-700
                hover:bg-green-800
                text-white
                flex
                items-center
                justify-center
                transition-all
                duration-300
                shadow-lg
                "
              >
                <FiSend />
              </motion.button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;