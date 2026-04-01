import React from 'react';
import { ShoppingCart } from 'lucide-react';

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface ProductInfoProps {
  title: string;
  price: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function ProductInfo({
  title,
  price,
  onAddToCart,
  onBuyNow,
}: ProductInfoProps) {
  return (
    <div className="space-y-4 font-outfit">
      {/* Title */}
      <h1 className="text-2xl font-bold text-[#191C1F]">{title}</h1>

      {/* Price */}
      <div className="py-4 border-y border-[#C9CFD2]">
        <p className="text-4xl font-bold text-[#1E40AF]">
          {formatPrice(price)} <span className="text-lg text-[#686868] font-normal uppercase">VND</span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1E40AF] text-white py-3 px-4 rounded-none hover:bg-blue-900 transition-colors font-bold text-base"
        >
          <ShoppingCart size={20} />
          THÊM VÀO GIỎ HÀNG
        </button>
        <button
          onClick={onBuyNow}
          className="flex-1 py-3 px-4 border-2 border-[#1E40AF] text-[#1E40AF] rounded-none hover:bg-blue-50 transition-colors font-bold text-base"
        >
          MUA NGAY
        </button>
      </div>
    </div>
  );
}
