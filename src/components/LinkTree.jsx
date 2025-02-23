import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";

const LinkTree = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Profile Section */}
        <div className="mb-8">
          <img
            src="/nekoharu.jpg"
            alt="0_nekoharu"
            className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">0_nekoharu</h1>
          <p className="text-gray-600 dark:text-gray-300">Digital Artist</p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <HiOutlinePhotograph className="text-xl" />
            <span>Art Portfolio Website</span>
          </button>

          <a
            href="https://instagram.com/0_nekoharu"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <FaInstagram className="text-xl" />
            <span>Instagram</span>
          </a>

          <a
            href="https://www.tiktok.com/@0_nekoharu"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <FaTiktok className="text-xl" />
            <span>TikTok</span>
          </a>

          <a
            href="https://twitter.com/0_nekoharu"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <FaTwitter className="text-xl" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkTree;