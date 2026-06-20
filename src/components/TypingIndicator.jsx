import { FaRobot } from "react-icons/fa";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      {/* Robot Avatar */}
      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-full
          border border-white/10
          bg-white/10
          backdrop-blur-2xl
          text-cyan-400
          shadow-lg
        "
      >
        <FaRobot />
      </div>

      {/* Typing Bubble */}
      <div
        className="
          flex items-center gap-2
          rounded-3xl
          border border-white/10
          bg-slate-800/70
          px-5 py-4
          backdrop-blur-2xl
          shadow-xl
        "
      >
        <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>

        <div
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{
            animationDelay: "0.15s",
          }}
        ></div>

        <div
          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"
          style={{
            animationDelay: "0.3s",
          }}
        ></div>
      </div>
    </div>
  );
}