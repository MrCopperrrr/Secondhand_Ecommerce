import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  proximity: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  inStock,
  proximity,
}) => {
  return (
    <div className="bg-white rounded-none border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-none">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-[#191C1F] line-clamp-2 mb-2 h-10">
          {name}
        </h3>

        {/* Price */}
        <p className="text-base font-bold text-[#1E40AF] mb-3">
          {price.toLocaleString('vi-VN')} VND
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
};

export default ProductCard;
