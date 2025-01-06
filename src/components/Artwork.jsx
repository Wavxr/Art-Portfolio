import React from "react";

const Artwork = ({ imageUrl, title }) => {
  return (
    <div className="artwork-card">
      <div className="artwork-image-container">
        <img src={imageUrl} alt={title} className="artwork-image" />
      </div>
      <p className="artwork-title">{title}</p>
    </div>
  );
};

export default Artwork;
