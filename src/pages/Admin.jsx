import React from "react";
import AdminUpload from "./AdminUpload";
import AdminDelete from "./AdminDelete";

const Admin = ({ adminSubPage, setAdminSubPage }) => {
  const renderAdminPage = () => {
    switch (adminSubPage) {
      case "Upload":
        return <AdminUpload />;
      case "Delete":
        return <AdminDelete />;
      default:
        return <AdminUpload />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {/* Navigation Tabs */}
      <nav className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setAdminSubPage("Upload")}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
            adminSubPage === "Upload"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Upload Content
        </button>
        <button
          onClick={() => setAdminSubPage("Delete")}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
            adminSubPage === "Delete"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Delete Content
        </button>
      </nav>
      {/* Admin Page Content */}
      <div className="w-full max-w-3xl">{renderAdminPage()}</div>
    </div>
  );
};

export default Admin;
