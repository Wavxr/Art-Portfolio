import React from "react";
import Artwork from "../components/Artwork";

function Digital() {
  const artworks = [
    { id: 1, imageUrl: "https://via.placeholder.com/300x400", title: "Digital Art 1" },
    { id: 2, imageUrl: "https://via.placeholder.com/500x300", title: "Digital Art 2" },
    { id: 3, imageUrl: "https://via.placeholder.com/300x300", title: "Digital Art 3" },
    { id: 4, imageUrl: "https://via.placeholder.com/300x450", title: "Digital Art 4" },
    { id: 5, imageUrl: "https://via.placeholder.com/400x400", title: "Digital Art 5" },
    { id: 6, imageUrl: "https://via.placeholder.com/350x500", title: "Digital Art 6" },
  ];

  return (
    <div className="artwork-grid">
      {artworks.map((art) => (
        <Artwork key={art.id} imageUrl={art.imageUrl} title={art.title} />
      ))}
    </div>
  );
}

export default Digital;
