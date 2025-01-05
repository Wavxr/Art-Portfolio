import React from "react";

const Haru = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Haru 🐾</h2>
      <p>Meet Haru, the adorable Siamese cat!</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {["src/assets/haru1.jpg", "src/assets/haru2.jpg", "src/assets/haru3.jpg"].map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Haru Photo ${index + 1}`}
            className="rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Haru;
