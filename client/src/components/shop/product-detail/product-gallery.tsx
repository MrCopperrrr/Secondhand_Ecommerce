import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-[#C9CFD2]">
        <span className="text-gray-400 text-sm">Không có hình ảnh</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Hero Image */}
      <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden border border-[#C9CFD2]">
        <img
          src={images[selectedIndex]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="flex items-center gap-3">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E40AF] flex items-center justify-center hover:bg-blue-900 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          {/* Thumbnails */}
          <div className="flex gap-2 flex-1 overflow-x-auto no-scrollbar">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-[#1E40AF] shadow-md'
                    : 'border-[#C9CFD2]'
                }`}
              >
                <img
                  src={image}
                  alt={`${alt} - thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E40AF] flex items-center justify-center hover:bg-blue-900 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
