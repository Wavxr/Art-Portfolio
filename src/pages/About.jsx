import React from "react";
import { FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-blue-200">
      <div className="max-w-3xl bg-white rounded-lg shadow-xl p-8 text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
        {/* Avatar */}
        <div className="mb-6">
          <img
            src="/nekoharu.jpg"
            alt="Riri's Avatar"
            className="mx-auto w-40 h-40 rounded-full border-4 border-blue-500"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meet Riri</h1>
        <p className="text-lg text-gray-600 italic mb-4">"I draw what I like 🎨"</p>

        {/* Bio */}
        <p className="text-gray-700 leading-relaxed mb-6">
          Hi, I’m Riri, a{" "}
          <span className="font-semibold text-blue-500">self-taught art hobbyist </span> 
          with a love for all things creative! ✍️ At just 20 years old, I’m exploring the art world by drawing 
          what inspires me the most—be it fantasy, anime, or cozy cat vibes. 🐾
          <br />
          I share my life with a sweet companion, my cat named Haru 🐱, who often sneaks into my artworks.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://www.instagram.com/0_nekoharu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 text-2xl hover:text-pink-700"
            title="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@0_nekoharu?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-2xl hover:text-blue-700"
            title="TikTok"
          >
            <FaTiktok />
          </a>
          <a
            href="https://x.com/0_nekoharu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 text-2xl hover:text-gray-700"
            title="Twitter"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Call to Action */}
        <div>
          <p className="text-lg text-gray-700 mb-4">
            Follow my journey as I bring my imagination to life, one sketch at a time! ✨
          </p>
          <a
            href="https://www.instagram.com/0_nekoharu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            View My Work on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
