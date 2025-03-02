import React from "react";
import { FaTimes } from "react-icons/fa";

const ArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
        style={{
          maxHeight: "90vh",
          animation: "modal-appear 0.3s ease-out forwards"
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
        >
          <FaTimes />
        </button>
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Image container */}
          <div className="w-full md:w-2/3 h-[50vh] md:h-auto relative">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="w-full h-full object-contain"
            />
            
            {/* Cat silhouette at bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16">
              <svg viewBox="0 0 100 50" className="w-full h-full fill-current text-gray-800 dark:text-gray-200 opacity-30">
                <path d="M25,40 Q40,10 50,40 Q60,10 75,40 L75,45 Q60,30 50,45 Q40,30 25,45 Z" />
                <circle cx="35" cy="20" r="2" />
                <circle cx="65" cy="20" r="2" />
                <path d="M42,28 Q50,32 58,28" strokeWidth="1" stroke="currentColor" fill="none" />
              </svg>
            </div>
          </div>
          
          {/* Details container */}
          <div className="w-full md:w-1/3 p-6 overflow-y-auto" style={{ maxHeight: "90vh" }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{artwork.title}</h2>
            
            <div className="space-y-4">
              {artwork.description && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Description</h3>
                  <p className="text-gray-800 dark:text-gray-200">{artwork.description}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Created</h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {new Date(artwork.date).toLocaleDateString()}
                </p>
              </div>
              
              {artwork.medium && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Medium</h3>
                  <p className="text-gray-800 dark:text-gray-200">{artwork.medium}</p>
                </div>
              )}
              
              {/* Cat paw prints decoration */}
              <div className="pt-6 opacity-30">
                <div className="flex justify-between">
                  {[...Array(4)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" className="fill-current text-gray-400 dark:text-gray-500 transform rotate-45">
                      <path d="M12,8c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S14.2,8,12,8z M9,12c0-1.7,1.3-3,3-3s3,1.3,3,3s-1.3,3-3,3S9,13.7,9,12z" />
                      <path d="M4.9,8C5.5,8,6,7.5,6,6.9C6,6.3,5.5,5.8,4.9,5.8S3.8,6.3,3.8,6.9C3.8,7.5,4.3,8,4.9,8z" />
                      <path d="M9,3.8C9,3.2,8.5,2.7,7.9,2.7S6.8,3.2,6.8,3.8S7.3,4.9,7.9,4.9S9,4.4,9,3.8z" />
                      <path d="M16.1,4.9c0.6,0,1.1-0.5,1.1-1.1c0-0.6-0.5-1.1-1.1-1.1S15,3.2,15,3.8C15,4.4,15.5,4.9,16.1,4.9z" />
                      <path d="M19.1,5.8C18.5,5.8,18,6.3,18,6.9c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1C20.2,6.3,19.7,5.8,19.1,5.8z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ArtworkModal;