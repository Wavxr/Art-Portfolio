import React, { useState } from "react";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [fileName, setFileName] = useState("Not selected file");

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "Not selected file");
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here (e.g., upload to server or Firebase)
    console.log({ title, type, date, fileName });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <p className="mb-8">Welcome, Nekoharu! Manage your portfolio here.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md"
          />
        </div>

        {/* Type Input */}
        <div>
          <label htmlFor="type" className="block text-lg font-medium">Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md"
          >
            <option value="">Select Type</option>
            <option value="Digital">Digital</option>
            <option value="Watercolor">Watercolor</option>
            <option value="Traditional">Traditional</option>
            <option value="Haru">Haru</option>
          </select>
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor="date" className="block text-lg font-medium">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md"
          />
        </div>

        {/* Image Upload UI */}
        <div className="container">
          <div className="header">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <p>Browse File to upload!</p>
          </div>
          <label htmlFor="file" className="footer">
            <svg
              fill="#000000"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
              </g>
            </svg>
            <p>{fileName}</p>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                  stroke="#000000"
                  strokeWidth="2"
                ></path>
                <path
                  d="M19.5 5H4.5"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                  stroke="#000000"
                  strokeWidth="2"
                ></path>
              </g>
            </svg>
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Admin;
