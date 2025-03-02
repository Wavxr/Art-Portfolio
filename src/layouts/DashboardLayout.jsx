import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Login from "../components/Login";

const DashboardLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminSubPage, setAdminSubPage] = useState("Upload");
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  // Capitalize first letter for proper comparison
  const formatPageName = (page) => {
    if (!page) return "Digital";
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  return (
    <>
      <MainLayout
        activePage={currentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowLoginModal={setShowLoginModal}
      >
        <Outlet context={{ adminSubPage, setAdminSubPage }} />
      </MainLayout>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center transition-all duration-300">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setShowLoginModal={setShowLoginModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;