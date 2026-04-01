import React from 'react';

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface ProductPricingProps {
  price: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function ProductPricing({
  price,
  onAddToCart,
  onBuyNow,
}: ProductPricingProps) {
  return (
    <div className="space-y-6 pt-4">
      {/* Price - Black, 1E40AF */}
      <div>
        <p className="text-3xl font-black text-[#1E40AF] tracking-tight">
          {formatPrice(price)} VND
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onAddToCart}
          className="bg-[#1E40AF] text-white py-3 px-4 rounded-none hover:bg-blue-800 transition-colors font-bold text-sm uppercase tracking-wider border border-[#1E40AF]"
        >
          THÊM VÀO GIỎ HÀNG
        </button>
        <button
          onClick={onBuyNow}
          className="bg-white text-[#1E40AF] py-3 px-4 rounded-none hover:bg-blue-50 transition-colors font-bold text-sm uppercase tracking-wider border border-[#1E40AF]"
        >
          MUA NGAY
        </button>
      </div>
    </div>
  );
}
