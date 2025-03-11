import React, { useState } from "react";
import AdminUpload from "./AdminUpload";
import AdminDelete from "./AdminDelete";

const Admin = ({ darkMode }) => {
  const [adminSubPage, setAdminSubPage] = useState("Upload");

  const renderAdminPage = () => {
    switch (adminSubPage) {
      case "Upload":
        return <AdminUpload darkMode={darkMode} />;
      case "Delete":
        return <AdminDelete darkMode={darkMode} />;
      default:
        return <AdminUpload darkMode={darkMode} />;
    }
  };

  return (
    <div className={`m-10 flex flex-col items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <nav className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setAdminSubPage("Upload")}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
            adminSubPage === "Upload"
              ? darkMode ? "bg-gray-600 text-yellow-300" : "bg-blue-500 text-white"
              : darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Upload Content
        </button>
        <button
          onClick={() => setAdminSubPage("Delete")}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
            adminSubPage === "Delete"
              ? darkMode ? "bg-gray-600 text-yellow-300" : "bg-blue-500 text-white"
              : darkMode ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Delete Content
        </button>
      </nav>
      <div className="w-full max-w-3xl">{renderAdminPage()}</div>
    </div>
  );
};

export default Admin;