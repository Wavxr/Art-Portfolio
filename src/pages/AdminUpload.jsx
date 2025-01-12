import React, { useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

import "../styles/tailwind.css";

const AdminUpload = ({ darkMode }) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // Added fileName state
  const [uploading, setUploading] = useState(false);

  const artworksRef = collection(db, "artworks");

  const handleFileChange = (e) => {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      setFile(chosenFile);
      setFileName(chosenFile.name); // Set fileName state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert("Please upload an image.");
      return;
    }
  
    try {
      setUploading(true);
  
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nekoharu");
  
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dhdwnuup0/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (data.secure_url) {
        // Store form data, image link, and public ID in Firebase
        await addDoc(artworksRef, {
          type,
          title: title || "Unknown Character",
          date,
          imageUrl: data.secure_url,
          publicId: data.public_id, // Store the public ID here
        });
  
        alert("Artwork uploaded successfully!");
        setType("");
        setTitle("");
        setDate("");
        setFile(null);
        setFileName(""); // Clear fileName state
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className={`flex justify-center ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
      <form
        className={`w-full max-w-lg p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"}`}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Upload Artwork</h2>
  
        {/* Type Selector */}
        <div className="mb-4">
          <label htmlFor="type" className={`block font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 text-gray-200" : ""}`}
          >
            <option value="">Select Type</option>
            <option value="Digital">Digital</option>
            <option value="Traditional">Traditional</option>
            <option value="WaterColor">WaterColor</option>
            <option value="Haru">Haru</option>
          </select>
        </div>
  
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className={`block font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            Title (or Character Name)
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title or character name"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 text-gray-200 placeholder-gray-400" : ""}`}
          />
        </div>
  
        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className={`block font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            Date Created
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 text-gray-200" : ""}`}
          />
        </div>
  
        {/* File Upload */}
        <div className="mb-6">
          <label className={`block font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>Upload Image</label>
          <div className={`container flex flex-col items-center gap-3 p-4 border-2 border-dashed rounded-md ${darkMode ? "border-gray-600 bg-gray-700" : "border-blue-500 bg-blue-50"}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-16 ${darkMode ? "text-gray-400" : "text-blue-500"}`}
            >
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Browse file to upload!</p>
            <label
              htmlFor="file"
              className={`w-full flex justify-between items-center gap-2 p-2 rounded-md cursor-pointer border ${darkMode ? "border-gray-600 bg-gray-700" : "border-blue-300 bg-blue-100"}`}
            >
              <p className={`flex-grow ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{fileName || "No file selected"}</p>
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
  
};

export default AdminUpload;