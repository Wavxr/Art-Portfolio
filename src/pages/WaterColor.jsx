import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Artwork from "../components/Artwork";

function WaterColor() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworksRef = collection(db, "artworks");
        const q = query(artworksRef, where("type", "==", "Watercolor")); // Filter for "Watercolor" artworks
        const querySnapshot = await getDocs(q);

        const fetchedArtworks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Manually sort artworks by date (latest first)
        const sortedArtworks = fetchedArtworks.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
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
    <div className="artwork-grid">
      {loading ? (
        <p>Loading artworks...</p>
      ) : (
        artworks.map((art) => (
          <Artwork key={art.id} imageUrl={art.imageUrl} title={art.title} />
        ))
      )}
    </div>
  );
}

export default WaterColor;
