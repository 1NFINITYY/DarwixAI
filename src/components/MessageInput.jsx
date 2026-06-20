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

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height =
      "auto";

    textareaRef.current.style.height =
      Math.min(
        textareaRef.current.scrollHeight,
        160
      ) + "px";
  }, [text]);

  const handleSend = () => {
    if (!text.trim()) return;

    sendMessage(text);

    setText("");

    if (textareaRef.current) {
      textareaRef.current.style.height =
        "auto";
      textareaRef.current.focus();
    }
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

        {/* Input Container */}
        <div
          className="
            rounded-[32px]
            border border-white/10
            bg-white/10
            backdrop-blur-3xl
            shadow-2xl
            px-5
            py-4
          "
        >
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
            className="
              w-full
              resize-none
              overflow-y-auto
              bg-transparent
              text-gray-100
              placeholder:text-gray-400
              caret-cyan-400
              outline-none
              text-lg
              leading-7
              max-h-40
            "
          />

          {/* Bottom Toolbar */}
          <div className="mt-4 flex items-center justify-end gap-2">
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
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  text-gray-400
                  transition
                  hover:bg-white/10
                  hover:text-yellow-400
                "
              >
                <FaSmile size={18} />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-14 right-0 z-50">
                  <EmojiPicker
                    theme="dark"
                    onEmojiClick={
                      handleEmojiClick
                    }
                  />
                </div>
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-gradient-to-r
                from-blue-500
                to-indigo-600
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-blue-500/40
              "
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}