import React, { useState } from "react";
import "../styles/tailwind.css";

const MainLayout = () => {
  const [activePage, setActivePage] = useState("Digital");

  // Page content for the right side
  const pageContent = {
    Digital: <p>Digital Art Portfolio</p>,
    Traditional: <p>Traditional Art Portfolio</p>,
    WaterColor: <p>Watercolor Art Portfolio</p>,
    About: <p>About the Artist</p>,
  };

  return (
    <div className="flex h-screen font-inconsolata">
      {/* Left Side */}
      <div className="w-1/5 bg-blue-900 text-white p-10 flex flex-col">
        {/* Top Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <img
              src="src/assets/icon.jpg"
              alt="Artist Icon"
              className="w-24 h-24 mx-auto rounded-full"
            />
            <h1 className="mt-4 text-lg font-bold">0_nekoharu</h1>
          </div>

          {/* Links */}
          <nav className="space-y-4">
            {["Digital", "Traditional", "WaterColor", "About"].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`flex items-center w-full px-4 py-2 rounded-md ${
                  activePage === page
                    ? "bg-blue-700 text-yellow-300"
                    : "hover:bg-blue-800"
                }`}
              >
                <span className="mr-2">
                  {page === "Digital"
                    ? "🖌️"
                    : page === "Traditional"
                    ? "✏️"
                    : page === "WaterColor"
                    ? "🎨"
                    : "📜"}
                </span>
                {page}
              </button>
            ))}
          </nav>
        </div>

        {/* Important Links */}
        {activePage === "About" && (
          <div className="mt-4 space-y-2">
            <a
              href="https://instagram.com/0_nekoharu/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-pink-500 font-semibold hover:text-pink-400"
            >
              🌸 Instagram
            </a>
            <button
              onClick={() => alert("Share this portfolio!")}
              className="block w-full text-center text-blue-500 font-semibold hover:text-blue-400"
            >
              🔗 Share
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-auto text-center text-xs text-gray-400">
          <p>
            <a href="mailto:johnwaveraguilar@gmail.com" className="text-gray-300 hover:underline">johnwaveraguilar@gmail.com</a>
          </p>
          <p>&copy; {new Date().getFullYear()}</p>
        </footer>
      </div>

      {/* Right Side */}
      <div className="w-4/5 bg-gray-100 p-12">
        {pageContent[activePage]}
      </div>
    </div>
  );
};

export default MainLayout;
