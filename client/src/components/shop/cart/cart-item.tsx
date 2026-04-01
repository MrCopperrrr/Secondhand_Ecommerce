import React from 'react';
import { X } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  selected: boolean;
  onSelect: (id: string, selected: boolean) => void;
  onRemove: (id: string) => void;
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export function CartItem({
  id,
  name,
  description,
  price,
  image,
  inStock,
  selected,
  onSelect,
  onRemove,
}: CartItemProps) {
  return (
    <div
      className={`flex gap-4 p-4 border-b border-[#C9CFD2] transition-opacity font-outfit ${
        !inStock ? 'opacity-50' : ''
      }`}
    >
      {/* Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(id, e.target.checked)}
          disabled={!inStock}
          className="w-5 h-5 rounded-none cursor-pointer accent-[#1E40AF]"
        />
      </div>

      {/* Product Thumbnail */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-none overflow-hidden bg-gray-100 border border-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-[#191C1F] line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-[#686868] line-clamp-2 mt-1">
          {description}
        </p>
      </div>

      {/* Status */}
      <div className="hidden md:flex items-center w-28 px-2">
        <span
          className={`text-sm font-bold ${
            inStock ? 'text-[#2DB224]' : 'text-red-600'
          }`}
        >
          {inStock ? 'Còn hàng' : 'Hết hàng'}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center w-32 justify-end px-2">
        <span className="text-base font-bold text-[#1E40AF]">
          {formatPrice(price)} VND
        </span>
      </div>

      {/* Remove Button */}
      <div className="flex items-center">
        <button
          onClick={() => onRemove(id)}
          className="text-red-600 hover:text-red-700 transition-colors p-2"
          aria-label="Remove item"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
