import React from "react";
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
import DashboardLayout from "./layouts/DashboardLayout";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LinkTree />} />
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<Navigate to="digital" />} />
              <Route path="digital" element={<Digital />} />
              <Route path="traditional" element={<Traditional />} />
              <Route path="watercolor" element={<WaterColor />} />
              <Route path="haru" element={<Haru />} />
              <Route path="about" element={<About />} />
              <Route path="admin" element={<Admin />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
