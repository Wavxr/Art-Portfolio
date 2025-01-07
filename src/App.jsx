import React, { useState } from "react";
import MainLayout from "./components/MainLayout";
import Digital from "./pages/Digital";
import Traditional from "./pages/Traditional";
import WaterColor from "./pages/WaterColor";
import Haru from "./pages/Haru";
import About from "./pages/About";
import Admin from "./pages/Admin"; // Import Admin Page
import Login from "./components/Login";

function App() {
  const [activePage, setActivePage] = useState("Digital");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      case "Admin": // Add Admin Case
        return <Admin />;
      default:
        return <Digital />;
    }
  };

  return (
    <>
      <MainLayout
        activePage={activePage}
        setActivePage={setActivePage}
        isLoggedIn={isLoggedIn} // Pass isLoggedIn to MainLayout
        setIsLoggedIn={setIsLoggedIn}
        setShowLoginModal={setShowLoginModal} // Pass modal control function
      >
        {getPageComponent()}
      </MainLayout>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setShowLoginModal={setShowLoginModal} // Close modal from Login
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
