import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import ArtworkModal from "../components/ArtworkModal";
import { motion } from "framer-motion";

function Digital() {
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworksRef = collection(db, "artworks");
        const q = query(artworksRef, where("type", "==", "Digital"));
        const querySnapshot = await getDocs(q);

        const fetchedArtworks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).sort((a, b) => new Date(b.date) - new Date(a.date));

        setArtworks(fetchedArtworks);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  // Split artworks into columns for masonry layout
  const getColumnArtworks = () => {
    const columns = [[], [], []]; // 3 columns for desktop
    
    artworks.forEach((artwork, index) => {
      const columnIndex = index % columns.length;
      columns[columnIndex].push(artwork);
    });
    
    return columns;
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-900">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-gray-800 dark:text-white"
      >
        Digital Art
      </motion.h1>

      <div className="block lg:flex gap-6">
        {getColumnArtworks().map((column, columnIndex) => (
          <div key={columnIndex} className="w-full lg:flex-1 flex flex-col gap-6 mb-6 lg:mb-0">
            {column.map((artwork, index) => (
              <motion.div 
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + columnIndex), duration: 0.3 }}
                onClick={() => setSelectedArtwork(artwork)}
                className="cursor-pointer transform transition-transform hover:scale-[1.02]"
              >
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-2 flex flex-col items-center text-center overflow-hidden">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full rounded-lg object-cover"
                  />
                  <h3 className="mt-2 text-sm font-medium text-gray-800 dark:text-white">{artwork.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {selectedArtwork && (
        <ArtworkModal 
          artwork={selectedArtwork} 
          onClose={() => setSelectedArtwork(null)} 
        />
      )}
    </div>
  );
}

export default Digital;
