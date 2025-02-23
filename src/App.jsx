import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Digital from "./pages/Digital";
import Traditional from "./pages/Traditional";
import WaterColor from "./pages/WaterColor";
import Haru from "./pages/Haru";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import LinkTree from "./components/LinkTree";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [activePage, setActivePage] = useState("Digital");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminSubPage, setAdminSubPage] = useState("Upload");

  const getPageComponent = () => {
    switch (activePage) {
      case "Digital":
        return <Digital />;
      case "Traditional":
        return <Traditional />;
      case "WaterColor":
        return <WaterColor />;
      case "Haru":
        return <Haru />;
      case "About":
        return <About />;
      case "Admin":
        return (
          <Admin
            adminSubPage={adminSubPage}
            setAdminSubPage={setAdminSubPage}
          />
        );
      default:
        return <Digital />;
    }
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LinkTree />} />
            <Route
              path="/dashboard/*"
              element={
                <>
                  <MainLayout
                    activePage={activePage}
                    setActivePage={setActivePage}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setShowLoginModal={setShowLoginModal}
                  >
                    {getPageComponent()}
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
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
