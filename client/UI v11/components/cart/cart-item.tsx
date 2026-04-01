'use client';

import Image from 'next/image';
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
      className={`flex gap-4 p-4 border-b border-[#C9CFD2] transition-opacity ${
        !inStock ? 'opacity-50' : ''
      }`}
    >
      {/* Checkbox */}
      <div className="flex items-start pt-1">
        <input
          type="radio"
          name={`item-${id}`}
          checked={selected}
          onChange={(e) => onSelect(id, e.target.checked)}
          disabled={!inStock}
          className="w-5 h-5 rounded cursor-pointer accent-[#1E40AF]"
        />
      </div>

      {/* Product Thumbnail */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          loading="eager"
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-[#191C1F] line-clamp-1">
          {name}
        </h3>
        <p className="text-xs text-[#686868] line-clamp-2">
          {description}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center w-24">
        <span
          className={`text-sm font-medium ${
            inStock ? 'text-[#2DB224]' : 'text-red-600'
          }`}
        >
          {inStock ? 'Còn hàng' : 'Hết hàng'}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center w-32 justify-end">
        <span className="text-sm font-medium text-[#191C1F]">
          {formatPrice(price)} VND
        </span>
      </div>

      {/* Remove Button */}
      <div className="flex items-center">
        <button
          onClick={() => onRemove(id)}
          className="text-red-600 hover:text-red-700 transition-colors p-1"
          aria-label="Remove item"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
