import React from "react";

const Artwork = ({ imageUrl, title }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-2 flex flex-col items-center text-center">
      <div className="w-full aspect-[4/5] overflow-hidden flex justify-center items-center rounded-lg">
        <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
      </div>
      <p className="mt-3 text-sm text-gray-800 break-words">{title}</p>
    </div>
  );
};

export default Artwork;
