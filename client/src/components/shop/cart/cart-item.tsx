import React from 'react';
import { XCircle, CheckCircle2, Circle } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
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
  price,
  image,
  inStock,
  selected,
  onSelect,
  onRemove,
}: CartItemProps) {
  return (
    <div className={`flex items-center gap-4 p-5 border-b border-gray-100 transition-opacity font-roboto ${
        !inStock ? 'opacity-50' : ''
      }`}
    >
      {/* Circle Selection Button */}
      <button
        onClick={() => inStock && onSelect(id, !selected)}
        disabled={!inStock}
        className="flex-shrink-0 transition-colors"
      >
        {selected ? (
          <CheckCircle2 size={24} className="text-[#1E40AF] fill-[#1E40AF] text-white" strokeWidth={1} />
        ) : (
          <Circle size={24} className="text-gray-300 hover:text-[#1E40AF]" strokeWidth={1} />
        )}
      </button>

      {/* Row Content - 3 Column Layout to match header */}
      <div className="flex-1 flex items-center gap-4">
        {/* Col 1: Product Thumbnail and Name (Canh trái) */}
        <div className="flex-1 flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 flex-shrink-0 bg-white border border-gray-100 p-1">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-sm font-normal text-[#000000] line-clamp-2 pr-4 flex-1">
            {name}
          </h3>
        </div>

        {/* Col 2: Status (Canh giữa) */}
        <div className="w-28 text-center px-2">
          <span
            className={`text-sm font-bold ${
              inStock ? 'text-[#2DB224]' : 'text-[#EE1919]'
            }`}
          >
            {inStock ? 'Còn hàng' : 'Hết hàng'}
          </span>
        </div>

        {/* Col 3: Price (Canh phải) */}
        <div className="w-32 text-right px-2">
          <span className="text-sm font-bold text-[#000000]">
            {formatPrice(price)} VND
          </span>
        </div>
      </div>

      {/* Remove Button - Cross with circle */}
      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 text-[#EE1919] hover:text-red-700 transition-colors p-1"
        aria-label="Remove item"
      >
        <XCircle size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
}
