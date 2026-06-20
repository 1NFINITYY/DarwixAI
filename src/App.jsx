import { useEffect, useState } from "react";
import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState(() => {
    const savedMessages =
      localStorage.getItem("messages");

    return savedMessages
      ? JSON.parse(savedMessages)
      : [];
  });

  const [typing, setTyping] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "messages",
      JSON.stringify(messages)
    );
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toISOString(),
      status: "sent",
      replyTo,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setReplyTo(null);

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      const success = Math.random() > 0.2;

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: success
          ? "Thanks for your message!"
          : "Failed to generate response.",
        timestamp: new Date().toISOString(),
        status: success
          ? "sent"
          : "failed",
        replyTo: null,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
    }, 1500);
  };

  const retryMessage = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              status: "sent",
              text: "Retried successfully!",
            }
          : msg
      )
    );
  };

  const deleteMessage = (id) => {
    setMessages((prev) =>
      prev.filter(
        (msg) => msg.id !== id
      )
    );
  };

  return (
    <div
      className="
      h-screen
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-indigo-950
      text-white
      flex
      flex-col
    "
    >
      {/* Background Blur */}
      <div
        className="
        absolute
        inset-0
        overflow-hidden
        -z-10
      "
      >
        <div
          className="
          absolute
          top-0
          left-0
          h-96
          w-96
          rounded-full
          bg-blue-500/20
          blur-[150px]
        "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          h-96
          w-96
          rounded-full
          bg-purple-500/20
          blur-[150px]
        "
        />
      </div>

      <Header />

      <ChatArea
        messages={messages}
        typing={typing}
        retryMessage={retryMessage}
        deleteMessage={deleteMessage}
        onReply={setReplyTo}
      />

      <MessageInput
        sendMessage={sendMessage}
        replyTo={replyTo}
        setReplyTo={setReplyTo}
      />
    </div>
  );
}

export default App;