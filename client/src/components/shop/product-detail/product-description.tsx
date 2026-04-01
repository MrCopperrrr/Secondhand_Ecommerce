import React from 'react';

interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="border border-[#C9CFD2] rounded-none p-8 bg-white mt-8 font-outfit shadow-sm">
      <h2 className="text-xl font-bold text-[#191C1F] mb-6 relative inline-block">
        MÔ TẢ SẢN PHẨM
        <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#1E40AF]" />
      </h2>
      <div className="text-base text-[#686868] leading-8 whitespace-pre-wrap mt-4">
        {description}
      </div>
    </div>
  );
}
