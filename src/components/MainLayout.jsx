import React, { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/tailwind.css";
import { useTheme } from '../context/ThemeContext';

const MainLayout = ({
  activePage,
  setActivePage,
  children,
  setShowLoginModal, // Receive modal control function
}) => {
  const { darkMode, toggleDarkMode } = useTheme(); // Get both darkMode and toggleDarkMode from useTheme
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Remove the duplicate toggleDarkMode declaration
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
    <div className="h-screen flex flex-col sm:flex-row overflow-hidden">
      {/* Mobile Header - Keep Fixed */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <img
            src="/nekoharu.jpg"
            alt="Artist Icon"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="font-bold">0_nekoharu</h1>
        </div>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className={`p-2 rounded-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-md`}
        >
          {showSidebar ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar - Keep Fixed */}
      <div
        className={`fixed sm:static inset-y-0 left-0 w-[280px] h-full overflow-y-auto transform transition-transform duration-300 ease-in-out z-40
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } shadow-xl sm:shadow-none`}
      >
        <div className="flex flex-col h-full p-6 pt-20 sm:pt-6">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <img
              src="/nekoharu.jpg"
              alt="Artist Icon"
              className="w-24 h-24 mx-auto rounded-full shadow-lg border-2 border-gray-200 dark:border-gray-700"
            />
            <h1 className="mt-4 text-lg font-bold">0_nekoharu</h1>
          </div>

          {/* Controls Section */}
          <div className="flex items-center justify-between mb-8 px-2">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <button
              onClick={handleAuthAction}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 flex-grow">
            {["Digital", "Traditional", "WaterColor", "Haru", "About"].map(
              (page) => (
                // Inside the Navigation Links section
                <button
                  key={page}
                  onClick={() => {
                    setActivePage(page);
                    setShowSidebar(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    activePage === page
                      ? darkMode
                        ? "bg-gray-700 text-yellow-300"
                        : "bg-blue-500 text-white"
                      : darkMode
                      ? "hover:bg-gray-700/50"
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
          {/* Credit Line */}
          <div className="text-center mt-auto pt-4 text-xs text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()}</p>
            <p>johnwaveraguilar@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Main Content Area - Make Scrollable */}
      <div className="flex-1 w-full sm:w-auto mt-16 sm:mt-0 h-screen overflow-y-auto">
        <div className="container mx-auto p-4">
          {React.cloneElement(children, { darkMode })}
        </div>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
