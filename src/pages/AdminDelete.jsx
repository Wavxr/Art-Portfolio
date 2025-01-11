import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const AdminDelete = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const artworksRef = collection(db, "artworks");

  // Fetch artworks from Firebase Firestore
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const querySnapshot = await getDocs(artworksRef);
        const artworksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtworks(artworksList);
        setFilteredArtworks(artworksList); // Initialize with all artworks
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const artworkRef = doc(db, "artworks", id);
      await deleteDoc(artworkRef);

      // Update state after deletion
      setArtworks((prevArtworks) =>
        prevArtworks.filter((artwork) => artwork.id !== id)
      );
      setFilteredArtworks((prevFiltered) =>
        prevFiltered.filter((artwork) => artwork.id !== id)
      );

      alert("Artwork deleted successfully!");
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete artwork.");
    }
  };

  // Handle dropdown change
  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === "All") {
      setFilteredArtworks(artworks);
    } else {
      setFilteredArtworks(artworks.filter((artwork) => artwork.type === type));
    }
  };

  // Get unique artwork types for dropdown
  const artworkTypes = ["All", ...new Set(artworks.map((artwork) => artwork.type))];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Delete Artwork</h2>

      {/* Dropdown for filtering by artwork type */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="p-2 border rounded"
        >
          {artworkTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Render artworks in card format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col"
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg">{artwork.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{artwork.type}</p>
            <button
              onClick={() => handleDelete(artwork.id)}
              className="mt-auto bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
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
