import React from "react";
import Artwork from "../components/Artwork";

function Digital() {
  const artworks = [
    { id: 1, imageUrl: "https://via.placeholder.com/300x400", title: "Digital Art 1" },
    { id: 2, imageUrl: "https://via.placeholder.com/500x300", title: "Digital Art 2" },
    { id: 3, imageUrl: "https://via.placeholder.com/300x300", title: "Digital Art 3" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((art) => (
        <Artwork key={art.id} imageUrl={art.imageUrl} title={art.title} />
      ))}
    </div>
  );
};

export default Digital;
