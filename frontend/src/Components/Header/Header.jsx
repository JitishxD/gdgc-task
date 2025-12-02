import ThemeToggle from "./ThemeToggle";

export default function Header({ search, setSearch }) {
  return (
    <>
      <div className="flex items-center mb-6 justify-between">
        <div className="flex items-center">
          <img src="/gdgc-task/favicon.png" alt="GDGC Members Logo" />

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            <span className="hidden xl:inline">GDGC Members</span>
            <span className="hidden vsm:inline xl:hidden">GDGC</span>
          </h1>
        </div>

        <div className="flex items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded w-46 xl:w-full max-w-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search by name or bio..."
          />

          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
