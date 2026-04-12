import React from 'react';

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface ProductPricingProps {
  price: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  isDisabled?: boolean;
}

export function ProductPricing({
  price,
  onAddToCart,
  onBuyNow,
  isDisabled = false,
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
          onClick={isDisabled ? undefined : onAddToCart}
          disabled={isDisabled}
          className={`py-3 px-4 rounded-none transition-colors font-bold text-sm uppercase tracking-wider border transition-all ${
            isDisabled 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70' 
              : 'bg-[#1E40AF] text-white hover:bg-blue-800 border-[#1E40AF]'
          }`}
        >
          {isDisabled ? 'SẢN PHẨM CỦA BẠN' : 'THÊM VÀO GIỎ HÀNG'}
        </button>
        <button
          onClick={isDisabled ? undefined : onBuyNow}
          disabled={isDisabled}
          className={`py-3 px-4 rounded-none transition-colors font-bold text-sm uppercase tracking-wider border transition-all ${
            isDisabled
              ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed opacity-70'
              : 'bg-white text-[#1E40AF] hover:bg-blue-50 border-[#1E40AF]'
          }`}
        >
          {isDisabled ? 'KHÔNG THỂ MUA' : 'MUA NGAY'}
        </button>
      </div>
      {isDisabled && (
        <p className="text-[11px] text-gray-400 italic">
          * Bạn không thể mua sản phẩm do chính mình đăng bán.
        </p>
      )}
    </div>
  );
}
