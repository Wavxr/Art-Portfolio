import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Artwork from "../components/Artwork";
import ArtworkModal from "../components/ArtworkModal";

function Digital() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworksRef = collection(db, "artworks");
        const q = query(artworksRef, where("type", "==", "Digital")); // Filter for "Digital" artworks
        const querySnapshot = await getDocs(q);

        const fetchedArtworks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Manually sort artworks by date (latest first)
        const sortedArtworks = fetchedArtworks.sort((a, b) => {
          const dateA = new Date(a.date); // Convert date string to Date object
          const dateB = new Date(b.date); // Convert date string to Date object
          return dateB - dateA; // Sort by descending order
        });

        setArtworks(sortedArtworks);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
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
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getColumnArtworks().map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((artwork) => (
                <div 
                  key={artwork.id}
                  onClick={() => setSelectedArtwork(artwork)}
                  className="cursor-pointer transform transition-transform hover:scale-[1.02]"
                >
                  <Artwork 
                    imageUrl={artwork.imageUrl} 
                    title={artwork.title} 
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Artwork Modal */}
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
