import {
  useEffect,
  useMemo,
  useRef,
} from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import { Virtuoso } from "react-virtuoso";

export default function ChatArea({
  messages,
  typing,
  retryMessage,
  deleteMessage,
  onReply,
}) {
  const virtuosoRef = useRef(null);

  const data = useMemo(() => {
    if (typing) {
      return [
        ...messages,
        {
          id: "typing-indicator",
          type: "typing",
        },
      ];
    }

    return messages;
  }, [messages, typing]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.length > 0) {
        virtuosoRef.current?.scrollToIndex({
          index: data.length - 1,
          align: "end",
          behavior: "smooth",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div
      role="log"
      aria-live="polite"
      className="
        flex-1
        min-h-0
        w-full
        max-w-6xl
        mx-auto
        px-8
        md:px-12
        mt-4
      "
    >
      <Virtuoso
        ref={virtuosoRef}
        style={{
          height: "100%",
        }}
        data={data}
        followOutput={(isAtBottom) =>
          isAtBottom ? "smooth" : false
        }
        itemContent={(index, item) => {
          if (item.type === "typing") {
            return (
              <div className="py-3">
                <TypingIndicator />
              </div>
            );
          }

          return (
            <div className="py-3">
              <Message
                key={item.id}
                message={item}
                retryMessage={retryMessage}
                deleteMessage={deleteMessage}
                onReply={onReply}
              />
            </div>
          );
        }}
      />
    </div>
  );
}