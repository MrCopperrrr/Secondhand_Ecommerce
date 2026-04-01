'use client';

import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  proximity: string;
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export function ProductCard({
  id,
  name,
  price,
  image,
  inStock,
  proximity,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#C9CFD2] overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          loading="eager"
          className="object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-[#191C1F] line-clamp-2 mb-2">
          {name}
        </h3>

        {/* Price */}
        <p className="text-base font-bold text-[#1E40AF] mb-3">
          {formatPrice(price)} VND
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs">
          {inStock ? (
            <span className="text-[#2DB224] font-medium">Còn hàng</span>
          ) : (
            <span className="text-[#686868]">Hết hàng</span>
          )}
          <span className="text-[#2DB224] font-medium">{proximity}</span>
        </div>
      </div>
    </div>
  );
}
