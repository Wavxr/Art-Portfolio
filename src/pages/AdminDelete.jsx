import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { v2 as cloudinary } from "cloudinary-core";

const AdminDelete = () => {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`;
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

  const [artworks, setArtworks] = useState([]);
  const artworksRef = collection(db, "artworks");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const querySnapshot = await getDocs(artworksRef);
        const artworksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtworks(artworksList);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID

      // Generate signature in frontend using Cloudinary SDK (client-side)
      const timestamp = Math.floor(Date.now() / 1000); // Current timestamp
      const signature = cloudinary.utils.api_sign_request(
        { public_id: publicId, timestamp }, 
        import.meta.env.VITE_CLOUDINARY_API_SECRET
      );

      const formData = new FormData();
      formData.append("public_id", publicId);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);

      // Cloudinary image deletion
      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const data = await cloudinaryResponse.json();

      if (cloudinaryResponse.ok && data.result === "ok") {
        // Delete artwork from Firestore
        const artworkRef = doc(db, "artworks", id);
        await deleteDoc(artworkRef);

        // Remove deleted artwork from local state
        setArtworks((prevArtworks) =>
          prevArtworks.filter((artwork) => artwork.id !== id)
        );

        alert("Artwork deleted successfully!");
      } else {
        console.error("Cloudinary error response:", data);
        alert(`Failed to delete image from Cloudinary: ${data.error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete artwork.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Delete Artwork</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg">{artwork.title}</h3>
                <p className="text-sm text-gray-500">{artwork.type}</p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(artwork.id, artwork.imageUrl)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDelete;
