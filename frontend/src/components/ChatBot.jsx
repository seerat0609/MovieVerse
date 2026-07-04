import { useState } from "react";

import ReactMarkdown from "react-markdown";

import {
  sendChatMessage,
} from "../services/api";

function ChatBot() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "🎬 Hi! I'm MovieVerse AI. Ask me anything about movies.",
      },
    ]);

  const [loading, setLoading] =
    useState(false);

  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage =
      message;

    setMessage("");

    try {
      setLoading(true);

      const data =
        await sendChatMessage(
          currentMessage
        );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "❌ Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() =>
            setIsOpen(true)
          }
          style={{
            position:
              "fixed",

            bottom: "25px",

            right: "25px",

            background:
              "#E50914",

            color: "white",

            border: "none",

            borderRadius:
              "50px",

            padding:
              "15px 22px",

            fontSize:
              "1rem",

            fontWeight:
              "bold",

            cursor:
              "pointer",

            zIndex: 9999,

            boxShadow:
              "0 0 20px rgba(229,9,20,0.4)",
          }}
        >
          🤖 Ask AI
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position:
              "fixed",

            bottom: "25px",

            right: "25px",

            width: "420px",

            height:
              "650px",

            background:
              "#0f172a",

            borderRadius:
              "20px",

            border:
              "1px solid rgba(255,255,255,0.1)",

            display:
              "flex",

            flexDirection:
              "column",

            zIndex: 9999,

            overflow:
              "hidden",

            boxShadow:
              "0 0 40px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              background:
                "#111827",

              color:
                "white",

              padding:
                "18px",

              display:
                "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",
            }}
          >
            <strong>
              🍿 MovieVerse
              CineBot
            </strong>

            <button
              onClick={() =>
                setIsOpen(
                  false
                )
              }
              style={{
                background:
                  "transparent",

                color:
                  "white",

                border:
                  "none",

                fontSize:
                  "1.3rem",

                cursor:
                  "pointer",
              }}
            >
              ✖
            </button>
          </div>

          <div
            style={{
              flex: 1,

              overflowY:
                "auto",

              background:
                "#020617",

              padding:
                "15px",
            }}
          >
            {messages.map(
              (
                message,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  style={{
                    marginBottom:
                      "15px",

                    textAlign:
                      message.sender ===
                      "user"
                        ? "right"
                        : "left",
                  }}
                >
                  <span
                    style={{
                      display:
                        "inline-block",

                      maxWidth:
                        "85%",

                      padding:
                        "12px 16px",

                      borderRadius:
                        "15px",

                      background:
                        message.sender ===
                        "user"
                          ? "#E50914"
                          : "#1e293b",

                      color:
                        "white",

                      lineHeight:
                        "1.6",
                    }}
                  >
                    <ReactMarkdown>
                      {
                        message.text
                      }
                    </ReactMarkdown>
                  </span>
                </div>
              )
            )}

            {loading && (
              <p
                style={{
                  color:
                    "white",
                }}
              >
                MovieVerse AI
                is thinking...
              </p>
            )}
          </div>

          <div
            style={{
              display:
                "flex",

              gap: "10px",

              padding:
                "15px",

              background:
                "#111827",
            }}
          >
            <input
              type="text"
              value={
                message
              }
              placeholder="Ask about movies..."
              onChange={(
                e
              ) =>
                setMessage(
                  e.target
                    .value
                )
              }
              onKeyDown={(
                e
              ) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  handleSend();
                }
              }}
              style={{
                flex: 1,

                padding:
                  "12px",

                borderRadius:
                  "10px",

                border:
                  "none",
              }}
            />

            <button
              onClick={
                handleSend
              }
              style={{
                background:
                  "#E50914",

                color:
                  "white",

                border:
                  "none",

                padding:
                  "12px 18px",

                borderRadius:
                  "10px",

                cursor:
                  "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;