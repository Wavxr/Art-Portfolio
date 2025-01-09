import React from "react";
import AdminUpload from "./AdminUpload";
import AdminDelete from "./AdminDelete";
import AdminUpdate from "./AdminUpdate";

const Admin = ({ adminSubPage, setAdminSubPage }) => {
  const renderAdminPage = () => {
    switch (adminSubPage) {
      case "Upload":
        return <AdminUpload />;
      case "Delete":
        return <AdminDelete />;
      case "Update":
        return <AdminUpdate />;
      default:
        return <AdminUpload />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation Tabs */}
      <nav className="flex justify-between space-x-4 mb-6">
        <button
          onClick={() => setAdminSubPage("Upload")}
          className={`w-full sm:w-auto px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
            adminSubPage === "Upload"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Upload Content
        </button>
        <button
          onClick={() => setAdminSubPage("Delete")}
          className={`w-full sm:w-auto px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
            adminSubPage === "Delete"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Delete Content
        </button>
        <button
          onClick={() => setAdminSubPage("Update")}
          className={`w-full sm:w-auto px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
            adminSubPage === "Update"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
          }`}
        >
          Update Content
        </button>
      </nav>
      {/* Admin Page Content */}
      <div className="mt-6">{renderAdminPage()}</div>
    </div>
  );
};

export default Admin;
