import { useState } from 'react';
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
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center border border-[#C9CFD2]">
        <span className="text-gray-400 text-sm">Không có hình ảnh</span>
      </div>
    );
  }

  // To show 6 thumbnails, we might need a subset or scrolling. 
  // For now let's just show up to 6 or let it scroll but styled as the picture.
  return (
    <div className="space-y-6">
      {/* Main Hero Image */}
      <div className="relative w-full aspect-[4/3] bg-white overflow-hidden border border-[#C9CFD2]">
        <img
          src={images[selectedIndex]}
          alt={alt}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E40AF] flex items-center justify-center hover:bg-blue-800 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Thumbnails Container */}
        <div className="flex gap-2 flex-1 items-center justify-between overflow-hidden">
          {images.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-1 aspect-square overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? 'border-[#1E40AF]'
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
          {/* Fill gaps if less than 6 images */}
          {images.length < 6 && [...Array(6 - images.length)].map((_, i) => (
            <div key={`empty-${i}`} className="flex-1 aspect-square bg-gray-50 border border-[#C9CFD2]" />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1E40AF] flex items-center justify-center hover:bg-blue-800 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
