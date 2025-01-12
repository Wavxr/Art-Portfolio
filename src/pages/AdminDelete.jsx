import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const AdminDelete = ({ darkMode }) => {
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
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Manage Artworks</h2>

        {/* Dropdown for filtering by artwork type */}
        <div className="mb-8 flex justify-center">
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className={`p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
          >
            {artworkTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Render artworks in card format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-52 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{artwork.type}</p>
              <button
                onClick={() => handleDelete(artwork.id)}
                className="w-full py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDelete;
