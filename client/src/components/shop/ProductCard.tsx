import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product_id: string;
  name: string;
  price: number;
  images: string[];
  status: string;
  campus: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product_id,
  name,
  price,
  images,
  status,
  campus,
}) => {
  const inStock = status === 'Active';
  const mainImage = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400';

  return (
    <Link 
      to={`/product/${product_id}`}
      className="bg-white rounded-none border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer block"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-none">
        <img
          src={mainImage}
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
            <span className="text-[#EE1919] font-medium">Hết hàng</span>
          )}
          <span className="text-[#2DB224] font-medium">{campus}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
