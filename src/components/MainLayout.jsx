import React, { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import DarkModeToggle from "./DarkModeToggle";
import "../styles/tailwind.css";
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";

const MainLayout = ({
  activePage,
  isLoggedIn: propIsLoggedIn,
  setIsLoggedIn: propSetIsLoggedIn,
  setShowLoginModal,
  children
}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn || false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        if (propSetIsLoggedIn) propSetIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        if (propSetIsLoggedIn) propSetIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [propSetIsLoggedIn]);

  // Add this useEffect to handle mobile viewport height adjustments
  useEffect(() => {
    // Function to update CSS variable with the actual viewport height
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set the initial value
    setVH();

    // Update on resize and orientation change
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      signOut(auth)
        .then(() => {
          setIsLoggedIn(false);
          if (propSetIsLoggedIn) propSetIsLoggedIn(false);
        })
        .catch((error) => {
          console.error("Error during sign out:", error);
        });
    } else {
      setShowLoginModal(true); // Show login modal
    }
  };

  const handlePageChange = (page) => {
    setShowSidebar(false);
    navigate(`/dashboard/${page.toLowerCase()}`);
  };

  return (
    <div className="h-screen flex flex-col sm:flex-row overflow-hidden">
      {/* Mobile Header - Keep Fixed */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-16 px-4 flex items-center justify-between bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <img
            src="/nekoharu.jpg"
            alt="Artist Icon"
            className="w-8 h-8 rounded-full"
          />
          <h1 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            0_nekoharu
          </h1>
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
        className={`fixed sm:static inset-y-0 left-0 w-[280px] h-[100vh] h-[calc(var(--vh,1vh)*100)] overflow-y-auto z-40
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 transition-transform duration-300 ease-in-out
          ${
            darkMode 
              ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white" 
              : "bg-gradient-to-b from-white to-gray-50 text-gray-900"
          } shadow-xl sm:shadow-none`}
      >
        <div className="flex flex-col h-full p-6 pt-20 sm:pt-6">
        {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-400 p-1">
              <img
                src="/nekoharu.jpg"
                alt="Artist Icon"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full border-4 border-white dark:border-gray-800 opacity-50"></div>
            </div>
            <h1 className="mt-4 text-lg font-bold">0_nekoharu</h1>
            <div className="w-12 h-1 bg-blue-500 dark:bg-blue-400 mx-auto mt-2 rounded-full"></div>
          </motion.div>

          {/* Rest of the component remains unchanged */}
          {/* Controls Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-between mb-8 px-2"
          >
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
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 w-full sm:w-auto mt-16 sm:mt-0 h-screen overflow-y-auto"
          >
            {["Digital", "Traditional", "WaterColor", "Haru", "About"].map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === `/dashboard/${page.toLowerCase()}`
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
                onClick={() => handlePageChange("Admin")}
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
          </motion.div>
          {/* Credit Line */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mt-auto pt-4 text-xs text-gray-500 dark:text-gray-400"
          >
            <p>© {new Date().getFullYear()}</p>
            <p>johnwaveraguilar@gmail.com</p>
          </motion.div>
        </div>
      </div>
{/* Main Content Area - Make Scrollable */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.5 }}
  className="flex-1 w-full sm:w-auto mt-16 sm:mt-0 h-screen overflow-y-auto"
>
  <div className="w-full h-full pb-16 sm:pb-0">
    {children}
  </div>
</motion.div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
