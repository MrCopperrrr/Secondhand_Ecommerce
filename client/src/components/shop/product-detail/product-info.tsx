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
    <div className="space-y-6 font-outfit">
      {/* Title - Chữ to không in đậm */}
      <h1 className="text-3xl font-normal text-[#000000] leading-tight">
        {title}
      </h1>

      {/* Price - Black, 1E40AF */}
      <div className="pt-2">
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
