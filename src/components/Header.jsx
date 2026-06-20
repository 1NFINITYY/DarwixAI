export default function Header() {
  return (
    <header className="mx-5 mt-5">
      <div
        className="
        rounded-3xl
        border border-white/10
        bg-white/10
        backdrop-blur-3xl
        shadow-2xl
        px-6
        py-4
      "
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Chat Assistant
            </h1>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />

              <p className="text-sm text-gray-300">
                Online
              </p>
            </div>
          </div>

          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border border-white/10
            bg-white/10
            backdrop-blur-2xl
            shadow-xl
          "
          >
            <span className="text-2xl">
              🤖
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}