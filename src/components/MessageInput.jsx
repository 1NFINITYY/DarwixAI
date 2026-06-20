import {
  useRef,
  useState,
  useEffect,
} from "react";
import {
  FaTimes,
  FaSmile,
  FaPaperPlane,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({
  sendMessage,
  replyTo,
  setReplyTo,
}) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(
          e.target
        )
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);
    setText("");

    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (
    emojiData
  ) => {
    setText(
      (prev) => prev + emojiData.emoji
    );
  };

  return (
    <div className="p-5">
      <div className="mx-auto max-w-5xl">
        {/* Reply Banner */}
        {replyTo && (
          <div
            className="
            mb-4
            flex items-start justify-between
            rounded-3xl
            border border-white/10
            bg-white/10
            p-4
            backdrop-blur-2xl
            shadow-xl
          "
          >
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-cyan-300">
                Replying to
              </p>

              <p className="truncate text-sm text-gray-300">
                {replyTo.text}
              </p>
            </div>

            <button
              onClick={() =>
                setReplyTo(null)
              }
              className="text-gray-400 transition hover:text-red-400"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Main Input */}
        <div
          className="
          relative
          flex items-end gap-4
          rounded-[32px]
          border border-white/10
          bg-white/10
          p-4
          backdrop-blur-3xl
          shadow-2xl
        "
        >
          {/* Emoji Button */}
          <div
            className="relative"
            ref={emojiPickerRef}
          >
            <button
              onClick={() =>
                setShowEmojiPicker(
                  (prev) => !prev
                )
              }
              className="
                text-gray-300
                transition
                hover:text-yellow-400
              "
            >
              <FaSmile size={22} />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-14 left-0 z-50">
                <EmojiPicker
                  theme="dark"
                  onEmojiClick={
                    handleEmojiClick
                  }
                />
              </div>
            )}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            aria-label="Message input"
            className="
              flex-1
              resize-none
              bg-transparent
              text-gray-100
              placeholder:text-gray-400
              caret-cyan-400
              outline-none
            "
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            aria-label="Send message"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              text-white
              shadow-xl
              transition-all
              duration-300
              hover:scale-110
              hover:shadow-blue-500/40
            "
          >
            <FaPaperPlane size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}