import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Artwork from "../components/Artwork";

const Haru = () => {
  const [haruPhotos, setHaruPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHaruPhotos = async () => {
      try {
        const photosRef = collection(db, "artworks");
        const q = query(photosRef, where("type", "==", "Haru")); // Filter for Haru's photos
        const querySnapshot = await getDocs(q);

        const fetchedPhotos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort photos by date (latest first)
        const sortedPhotos = fetchedPhotos.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });

        setHaruPhotos(sortedPhotos);
      } catch (error) {
        console.error("Error fetching Haru's photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHaruPhotos();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Haru 🐾</h2>
      <p>Meet Haru, the adorable Siamese cat!</p>
      {loading ? (
        <p>Loading Haru's photos...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {haruPhotos.map((photo) => (
            <Artwork
              key={photo.id}
              imageUrl={photo.imageUrl} // Pass imageUrl to Artwork component
              title={photo.title} // Pass title to Artwork component
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Haru;