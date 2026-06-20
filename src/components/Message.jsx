import {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  FaRobot,
  FaCopy,
  FaReply,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { createPortal } from "react-dom";

export default function Message({
  message,
  retryMessage,
  deleteMessage,
  onReply,
}) {
  const isUser = message.sender === "user";

  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [menuPosition, setMenuPosition] =
    useState({
      top: 0,
      left: 0,
    });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        message.text
      );

      setCopied(true);
      setShowMenu(false);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMenuToggle = () => {
    const rect =
      buttonRef.current.getBoundingClientRect();

    const MENU_WIDTH = 160;
    const MENU_HEIGHT = 160;
    const PADDING = 10;

    let left =
      rect.left + rect.width / 2;

    left = Math.min(
      left,
      window.innerWidth -
        MENU_WIDTH -
        PADDING
    );

    left = Math.max(PADDING, left);

    let top;

    if (
      window.innerHeight -
        rect.bottom <
      MENU_HEIGHT + PADDING
    ) {
      top = rect.top - MENU_HEIGHT;
    } else {
      top = rect.bottom + 8;
    }

    setMenuPosition({
      top,
      left,
    });

    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <div
        className={`group flex w-full ${
          isUser
            ? "justify-end pr-8 md:pr-16"
            : "justify-start"
        }`}
      >
        {!isUser && (
          <div
            className="
              mr-3 mt-1
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-white/10
              bg-white/10
              backdrop-blur-xl
              shadow-lg
              text-cyan-400
            "
          >
            <FaRobot />
          </div>
        )}

        <div
          className={`max-w-[700px] rounded-3xl border px-5 py-4 shadow-2xl transition-all duration-300
          ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-transparent text-white"
              : "bg-slate-800/70 backdrop-blur-2xl border-white/10"
          }`}
        >
          {/* Reply Preview */}
          {message.replyTo && (
            <div className="mb-3 rounded-2xl border-l-4 border-cyan-400 bg-black/20 p-3 text-sm">
              <p className="font-semibold text-cyan-300">
                Replying to
              </p>

              <p className="truncate opacity-80">
                {message.replyTo.text}
              </p>
            </div>
          )}

          {/* Message */}
          <div className="flex items-start gap-3">
            <div
              className={`flex-1 whitespace-pre-wrap break-words leading-7 ${
                isUser
                  ? "text-white"
                  : "text-gray-100"
              }`}
            >
              {message.text}
            </div>

            <button
              ref={buttonRef}
              onClick={handleMenuToggle}
              className="
                mt-1 shrink-0
                opacity-100
                xl:opacity-0
                xl:group-hover:opacity-100
                transition
                text-gray-300
                hover:text-white
              "
            >
              <BsThreeDotsVertical
                size={18}
              />
            </button>
          </div>

          {/* Timestamp */}
          <div
            className="mt-3 text-xs text-gray-300"
            title={new Date(
              message.timestamp
            ).toLocaleString()}
          >
            {new Date(
              message.timestamp
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          {copied && (
            <p className="mt-2 text-xs text-green-400">
              Copied!
            </p>
          )}

          {message.status === "failed" && (
            <div className="mt-3">
              <p className="text-sm text-red-400">
                Failed to send
              </p>

              <button
                onClick={() =>
                  retryMessage(message.id)
                }
                className="text-sm text-cyan-400 underline"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      {showMenu &&
        createPortal(
          <div
            ref={menuRef}
            className="
              fixed z-[99999]
              w-44 overflow-hidden
              rounded-2xl
              border border-white/10
              bg-slate-900/80
              backdrop-blur-2xl
              shadow-2xl
            "
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
          >
            <button
              onClick={handleCopy}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/10"
            >
              <FaCopy />
              Copy
            </button>

            <button
              onClick={() => {
                onReply(message);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/10"
            >
              <FaReply />
              Reply
            </button>

            {isUser && (
              <button
                onClick={() => {
                  setShowInfo(true);
                  setShowMenu(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/10"
              >
                <FaInfoCircle />
                Message Info
              </button>
            )}

            <button
              onClick={() => {
                deleteMessage(message.id);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
            >
              <FaTrash />
              Delete
            </button>
          </div>,
          document.body
        )}

      {/* Info Modal */}
      {isUser &&
        showInfo &&
        createPortal(
          <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
              className="
                w-80 rounded-3xl
                border border-white/10
                bg-slate-900/80
                p-6
                text-white
                shadow-2xl
                backdrop-blur-2xl
              "
            >
              <h2 className="mb-6 text-xl font-bold">
                Message Info
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="font-semibold text-green-400">
                    ✓ Sent
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(
                      message.timestamp
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-cyan-400">
                    ✓✓ Delivered
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(
                      message.timestamp
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-blue-400">
                    ✓✓ Read
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(
                      message.timestamp
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setShowInfo(false)
                }
                className="
                  mt-8 w-full rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  to-indigo-600
                  py-3
                  text-white
                  transition
                  hover:scale-[1.02]
                "
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}