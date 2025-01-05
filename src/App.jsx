import React, { useState } from "react";
import MainLayout from "./components/MainLayout";
import Digital from "./pages/Digital";
import Traditional from "./pages/Traditional";
import WaterColor from "./pages/WaterColor";
import Haru from "./pages/Haru";
import About from "./pages/About";

function App() {
  const [activePage, setActivePage] = useState("Digital");

  // Map page names to components
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
      default:
        return <Digital />;
    }
  };

  return (
    <MainLayout activePage={activePage} setActivePage={setActivePage}>
      {getPageComponent()}
    </MainLayout>
  );
}

export default App;
