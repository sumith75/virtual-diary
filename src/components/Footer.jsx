export default function Footer() {
  return (
    <footer
      className="
        w-full
        px-8 py-6
        border-t
        bg-white dark:bg-gray-900
        border-gray-200 dark:border-gray-700
      "
    >
      <div
        className="
          flex flex-col md:flex-row
          items-center justify-between
          gap-3
        "
      >
        {/* BRAND */}
        <div className="flex items-center gap-2">
          <span className="text-xl">📖</span>
          <h2 className="text-lg font-bold tracking-wide text-gray-900 dark:text-white">
            Virtual Diary
          </h2>
        </div>

        {/* INFO */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
          <p>Write. Reflect. Remember.</p>
          <p>support@virtualdiary.com</p>
        </div>

        {/* COPYRIGHT */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Virtual Diary
        </p>
      </div>
    </footer>
  );
}
