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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 m-10">
      {loading ? (
        <p><strong>Loading artworks...</strong></p>
      ) : (
        artworks.map((art) => (
          <div
            key={art.id}
            className="transform transition-transform duration-50 ease-in-out hover:scale-105"
          >
            <Artwork imageUrl={art.imageUrl} title={<strong>{art.title}</strong>} />
          </div>
        ))
      )}
    </div>
  );
}

export default Digital;
