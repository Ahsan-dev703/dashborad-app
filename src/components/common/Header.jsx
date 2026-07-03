const Header = ({ title }) => {
  const handleToggle = () => {
    if (typeof window !== "undefined")
      window.dispatchEvent(new Event("toggleSidebar"));
  };

  return (
    <header className="fixed sm:relative top-0 left-0 right-0 w-full bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 z-40">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="md:hidden p-2 rounded-md hover:bg-gray-700 transition-colors text-gray-100"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-100">
            {title}
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          {/* reserved for action icons on larger screens */}
        </div>
      </div>
    </header>
  );
};
export default Header;
