import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/tailwind.css";

const MainLayout = ({ activePage, setActivePage, children }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={`flex h-screen font-inconsolata transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Left Side */}
      <div
        className={`w-1/5 p-10 flex flex-col transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="mb-8 self-start">
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Top Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <img
              src="src/assets/icon.jpg"
              alt="Artist Icon"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h1 className="mt-4 text-lg font-bold">0_nekoharu</h1>
          </div>

          {/* Links */}
          <nav className="space-y-4">
            {["Digital", "Traditional", "WaterColor", "Haru", "About"].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`flex items-center w-full px-4 py-2 rounded-md ${
                  activePage === page
                    ? darkMode
                      ? "bg-gray-600 text-yellow-300"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">
                  {page === "Digital"
                    ? "🖌️"
                    : page === "Traditional"
                    ? "✏️"
                    : page === "WaterColor"
                    ? "🎨"
                    : page === "Haru"
                    ? "🐾"
                    : "📜"}
                </span>
                {page}
              </button>
            ))}
          </nav>
        </div>

        {/* Important Links */}
        {activePage === "About" && (
          <div className="mt-4 space-y-2">
            <a
              href="https://instagram.com/0_nekoharu/"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center font-semibold ${
                darkMode ? "text-pink-400 hover:text-pink-300" : "text-pink-500 hover:text-pink-400"
              }`}
            >
              🌸 Instagram
            </a>
            <button
              onClick={() => alert("Share this portfolio!")}
              className={`block w-full text-center font-semibold ${
                darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-500 hover:text-blue-400"
              }`}
            >
              🔗 Share
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-auto text-center text-xs">
          <p>
            <a
              href="mailto:johnwaveraguilar@gmail.com"
              className="hover:underline"
            >
              johnwaveraguilar@gmail.com
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()}</p>
        </footer>
      </div>

      {/* Right Side */}
      <div className="w-4/5 p-12">{children}</div>
    </div>
  );
};

export default MainLayout;