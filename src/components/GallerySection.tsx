import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, Heart } from "lucide-react";

const GALLERY_IMAGES = [
  {
    id: "img-1",
    url: "https://jumpshare.com/v/RlPDavSQnOzv9QNAzOdX+",
    alt: "Nikkah Signing Ceremony - Dhilshana & Saleem",
    caption: "The Nikkah Signing Ceremony"
  },
  {
    id: "img-2",
    url: "https://jumpshare.com/v/DnWvdWqJfVrjXKn79wu6+",
    alt: "A Union Bound in Faith - Dhilshana & Saleem",
    caption: "A Union Bound in Faith"
  },
  {
    id: "img-3",
    url: "https://jumpshare.com/v/BjkQuTIO7nO5kGbS02lf+",
    alt: "Celebrating Love & Blessings - Dhilshana & Saleem",
    caption: "The Sacred Nikkah Certificate"
  }
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div id="gallery-section-container" className="space-y-12">
      {/* Dynamic Grid displaying the Moments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto px-4">
        {GALLERY_IMAGES.map((img, index) => {
          // Middle card has a subtle visual offset on desktop
          const translateClass = index === 1 ? "md:translate-y-6" : "";

          return (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative h-[480px] md:h-[550px] rounded-2xl overflow-hidden border border-[#DCD0C0]/40 shadow-[0_12px_30px_rgba(163,117,109,0.04)] group transition-all duration-500 bg-[#FAF8F5] ${translateClass}`}
            >
              {/* Image element with Jumpshare direct link with no-referrer policy */}
              <img
                src={img.url}
                alt={img.alt}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center filter brightness-[0.98] group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-700 ease-out cursor-pointer"
                onClick={() => setSelectedImage(img.url)}
                onError={(e) => {
                  // Fallback to high-quality wedding illustration if Jumpshare fails or is blocked
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes("unsplash")) {
                    target.src = `https://images.unsplash.com/photo-1519225495810-7517c3198a7a?auto=format&fit=crop&q=80&w=600&h=800`;
                  }
                }}
              />

              {/* Minimal Hover Overlay with Zoom Icon */}
              <div 
                className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer pointer-events-none"
                onClick={() => setSelectedImage(img.url)}
              >
                <div className="p-3.5 bg-white/90 rounded-full shadow-lg text-[#7E5E4E] transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {/* Clean decorative bottom bar highlighting the image context on hover */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-[#DCD0C0]/30 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="font-sans text-[10px] font-semibold tracking-wider text-[#7E5E4E] uppercase text-center flex items-center justify-center gap-1.5">
                  <Heart className="w-3 h-3 text-[#C2A289] fill-[#C2A289]" />
                  {img.caption}
                </p>
              </div>

              {/* Aesthetic Border highlight on hover */}
              <div className="absolute inset-3 border border-[#C2A289]/0 group-hover:border-[#C2A289]/20 rounded-xl transition-all duration-500 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal Viewer */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10"
              title="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Zoomed wedding celebration moment"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes("unsplash")) {
                    target.src = `https://images.unsplash.com/photo-1519225495810-7517c3198a7a?auto=format&fit=crop&q=80&w=1200&h=800`;
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

