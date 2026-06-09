import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FiCpu,
  FiSend,
  FiActivity,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiMessageSquare,
} from "react-icons/fi";

const AIChatAnalyst = ({ darkMode }) => {
  const [question, setQuestion] = useState("");

  const [activeQuestion, setActiveQuestion] =
    useState(
      "Ask The Community Intelligence Engine"
    );

  const [answer, setAnswer] = useState(
    "Nation Aura AI continuously analyzes community reports, citizen participation, government activity and infrastructure trends to generate intelligence for your area."
  );

  const suggestions = [
    {
      question:
        "What issue is growing fastest?",
      answer:
        "Infrastructure complaints currently show the strongest growth trend. Road damage and drainage-related reports have increased significantly over recent weeks.",
    },

    {
      question:
        "Which reports get resolved most?",
      answer:
        "Environmental cleanup and public utility issues currently achieve the highest resolution rates due to stronger agency response times.",
    },

    {
      question:
        "What should government prioritize?",
      answer:
        "AI recommends prioritizing recurring infrastructure issues, particularly road repairs, drainage systems and electricity concerns affecting multiple communities.",
    },

    {
      question:
        "What trends are affecting my area?",
      answer:
        "Current analysis indicates increasing infrastructure concerns, stronger citizen engagement and growing demand for transparency in project execution.",
    },
  ];

  const handleAsk = () => {
    if (!question.trim()) return;

    setActiveQuestion(question);

    setAnswer(
      `AI analysis suggests that "${question}" is strongly influenced by community reporting activity, recurring issue patterns, government responsiveness and citizen participation trends. Additional verified reports would improve prediction accuracy and insight quality.`
    );

    setQuestion("");
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className={`
        relative
        overflow-hidden
        border
        ${
          darkMode
            ? "bg-[#081019] border-white/10"
            : "bg-white border-gray-200"
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

      {/* GLOW */}
      <div
        className="
          absolute
          right-[-120px]
          top-[-120px]
          w-[350px]
          h-[350px]
          bg-green-500/10
          blur-[140px]
        "
      />

      <div className="relative z-10 p-5 sm:p-7 lg:p-10">
        {/* HEADER */}
        <div className="mb-10">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              border
              border-green-500/20
              bg-green-500/5
              text-green-500
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
            "
          >
            <FiCpu />
            AI Civic Analyst
          </div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={activeQuestion}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
              }}
              className={`
                mt-4
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-black
                tracking-[-0.05em]
                ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }
              `}
            >
              {activeQuestion}
            </motion.h2>
          </AnimatePresence>

          <p
            className={`
              mt-4
              max-w-3xl
              leading-relaxed
              ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }
            `}
          >
            Ask questions about reports,
            community issues, government
            performance, infrastructure
            trends and citizen engagement.
          </p>
        </div>

        {/* AI TERMINAL */}
        <div
          className={`
            border
            ${
              darkMode
                ? "border-white/10 bg-white/[0.02]"
                : "border-gray-200 bg-[#F8FAF9]"
            }
          `}
        >
          {/* TERMINAL HEADER */}
          <div
            className="
              border-b
              border-green-500/20
              p-4
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-2">
              <FiActivity className="text-green-500" />

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  font-bold
                "
              >
                Nation Aura AI Terminal
              </span>
            </div>

            <div
              className="
                text-green-500
                text-xs
                font-bold
              "
            >
              ONLINE
            </div>
          </div>

          {/* ANSWER */}
          <div className="p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={answer}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                className="
                  border-l-4
                  border-green-500
                  pl-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-green-500
                    font-bold
                  "
                >
                  <FiCpu />
                  AI Analysis
                </div>

                <p
                  className={`
                    mt-3
                    leading-relaxed
                    text-base
                    sm:text-lg
                    ${
                      darkMode
                        ? "text-gray-300"
                        : "text-gray-700"
                    }
                  `}
                >
                  {answer}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SUGGESTIONS */}
          <div className="px-5 pb-5">
            <div className="flex flex-wrap gap-3">
              {suggestions.map(
                (item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveQuestion(
                        item.question
                      );

                      setAnswer(
                        item.answer
                      );
                    }}
                    className="
                      px-4
                      py-2
                      border
                      border-green-500/20
                      bg-green-500/5
                      hover:bg-green-500/10
                      transition-all
                      text-sm
                    "
                  >
                    {item.question}
                  </button>
                )
              )}
            </div>
          </div>

          {/* INPUT */}
          <div
            className="
              border-t
              border-green-500/20
              p-4
            "
          >
            <div className="flex gap-3">
              <input
                value={question}
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleAsk()
                }
                placeholder="Ask Nation Aura AI..."
                className={`
                  flex-1
                  px-4
                  py-3
                  outline-none
                  border
                  ${
                    darkMode
                      ? `
                        bg-white/[0.03]
                        border-white/10
                        text-white
                      `
                      : `
                        bg-white
                        border-gray-200
                      `
                  }
                `}
              />

              <button
                onClick={handleAsk}
                className="
                  px-5
                  border
                  border-green-500/20
                  bg-green-500/10
                  hover:bg-green-500/20
                  transition-all
                  text-green-500
                "
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>

        {/* AI STATS */}
        <div
          className="
            mt-6
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >
          <div
            className="
              border
              border-green-500/20
              bg-green-500/5
              p-5
            "
          >
            <FiTrendingUp className="text-green-500 text-xl" />

            <h3 className="mt-3 text-3xl font-black">
              18%
            </h3>

            <p className="mt-1 text-sm">
              Trend Growth
            </p>
          </div>

          <div
            className="
              border
              border-green-500/20
              bg-green-500/5
              p-5
            "
          >
            <FiShield className="text-green-500 text-xl" />

            <h3 className="mt-3 text-3xl font-black">
              94%
            </h3>

            <p className="mt-1 text-sm">
              Trust Score
            </p>
          </div>

          <div
            className="
              border
              border-green-500/20
              bg-green-500/5
              p-5
            "
          >
            <FiActivity className="text-green-500 text-xl" />

            <h3 className="mt-3 text-3xl font-black">
              124
            </h3>

            <p className="mt-1 text-sm">
              Active Reports
            </p>
          </div>

          <div
            className="
              border
              border-green-500/20
              bg-green-500/5
              p-5
            "
          >
            <FiMessageSquare className="text-green-500 text-xl" />

            <h3 className="mt-3 text-3xl font-black">
              AI
            </h3>

            <p className="mt-1 text-sm">
              Intelligence Engine
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AIChatAnalyst;