'use client';

import { ShoppingCart, Heart } from 'lucide-react';

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
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-[#191C1F]">{title}</h1>

      {/* Price */}
      <div className="py-4 border-y border-[#C9CFD2]">
        <p className="text-4xl font-bold text-[#1E40AF]">
          {formatPrice(price)} <span className="text-lg text-[#686868]">VND</span>
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1E40AF] text-white py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors font-medium text-base"
        >
          <ShoppingCart size={20} />
          Thêm vào giỏ hàng
        </button>
        <button
          onClick={onBuyNow}
          className="flex-1 py-3 px-4 border-2 border-[#1E40AF] text-[#1E40AF] rounded-lg hover:bg-blue-50 transition-colors font-medium text-base"
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
}
