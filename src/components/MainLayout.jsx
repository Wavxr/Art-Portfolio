import React, { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/tailwind.css";

const MainLayout = ({
  activePage,
  setActivePage,
  children,
  setShowLoginModal, // Receive modal control function
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is logged out
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      signOut(auth)
        .then(() => {
          setIsLoggedIn(false);
        })
        .catch((error) => {
          console.error("Error during sign out:", error);
        });
    } else {
      setShowLoginModal(true); // Show login modal
    }
  };

  return (
    <div
      className={`flex h-screen font-inconsolata transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Hamburger Menu */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className={`sm:hidden fixed top-4 right-4 z-50 p-2 rounded-full ${
          darkMode ? "bg-gray-600 text-white" : "bg-blue-500 text-white"
        }`}
      >
        {showSidebar ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      {showSidebar || window.innerWidth >= 640 ? (
        <div
          className={`absolute sm:static top-0 left-0 h-screen sm:h-auto w-4/5 sm:w-1/4 md:w-1/5 p-4 sm:p-10 flex flex-col transition-transform duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } ${showSidebar ? "z-50" : ""}`} // Ensures the sidebar overlays the content
        >
          {/* Header Section */}
          <div className="mb-8 flex justify-between items-center">
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
            <button
              onClick={handleAuthAction}
              className={`ml-4 px-4 py-2 rounded-md text-sm font-medium ${
                darkMode
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-400"
              }`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>

          {/* Profile Section */}
          <div className="text-center mb-12">
            <img
              src="/nekoharu.jpg" // Profile Picture Path
              alt="Artist Icon"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h1 className="mt-4 text-lg font-bold">0_nekoharu</h1>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            {["Digital", "Traditional", "WaterColor", "Haru", "About"].map(
              (page) => (
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
              )
            )}
            {isLoggedIn && (
              <button
                onClick={() => setActivePage("Admin")}
                className={`flex items-center w-full px-4 py-2 rounded-md ${
                  activePage === "Admin"
                    ? darkMode
                      ? "bg-gray-600 text-yellow-300"
                      : "bg-blue-500 text-white"
                    : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">⚙️</span>
                Admin
              </button>
            )}
          </nav>

          {/* Important Links */}
          {activePage === "About" && (
            <div className="mt-4 space-y-2">
              <a
                href="https://instagram.com/0_nekoharu/"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center font-semibold ${
                  darkMode
                    ? "text-pink-400 hover:text-pink-300"
                    : "text-pink-500 hover:text-pink-400"
                }`}
              >
                🌸 Instagram
              </a>
              <button
                onClick={() => alert("Share this portfolio!")}
                className={`block w-full text-center font-semibold ${
                  darkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-500 hover:text-blue-400"
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
      ) : null}

      {/* Main Content Area */}
      <div className="w-full sm:w-4/5 overflow-y-auto">
        {React.cloneElement(children, { darkMode })}
      </div>
    </div>
  );
};

export default MainLayout;
