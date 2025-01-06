import React from "react";

const Artwork = ({ imageUrl, title }) => {
  return (
    <div className="polaroid">
      <div className="polaroid-image-container">
        <img src={imageUrl} alt={title} className="polaroid-image" />
      </div>
      <p className="polaroid-title">{title}</p>
    </div>
  );
};

export default Artwork;
