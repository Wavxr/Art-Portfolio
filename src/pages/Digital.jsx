import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Artwork from "../components/Artwork";

function Digital() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {loading ? (
        <div className="col-span-full flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Loading artworks...</p>
          </div>
        </div>
      ) : (
        artworks.map((art) => (
          <div
            key={art.id}
            className="transform transition-all duration-300 hover:translate-y-[-4px]"
          >
            <Artwork imageUrl={art.imageUrl} title={art.title} />
          </div>
        ))
      )}
    </div>
  );
}

export default Digital;
