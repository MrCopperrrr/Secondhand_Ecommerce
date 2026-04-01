import React from 'react';

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  items: CheckoutItem[];
  shippingFee: number;
  onCheckout: () => void;
  isFormValid: boolean;
}

export function CheckoutSummary({ items, shippingFee, onCheckout, isFormValid }: CheckoutSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + shippingFee + serviceFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-none border border-[#C9CFD2] p-8 sticky top-24 font-roboto shadow-sm">
      <h2 className="text-2xl font-bold text-[#191C1F] mb-8">
        Đơn đặt hàng
      </h2>

      {/* Product List */}
      <div className="space-y-6 mb-8 max-h-96 overflow-y-auto no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 pb-0 border-0 transition-colors rounded-none">
            <div className="relative w-20 h-20 flex-shrink-0 rounded-none overflow-hidden bg-white border border-gray-100 shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-normal text-[#191C1F] line-clamp-2 leading-relaxed">
                {item.name}
              </h3>
              <p className="text-base font-bold text-[#1E40AF] mt-1">
                {formatPrice(item.price)} VND
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Breakdown */}
      <div className="space-y-4 mb-8 pt-0 border-t-0">
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-normal">Số lượng sản phẩm</span>
          <span className="font-bold text-[#191C1F]">{itemCount} sản phẩm</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-normal">Tạm tính</span>
          <span className="font-bold text-[#191C1F]">{formatPrice(subtotal)} VND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-normal">Phí giao hàng</span>
          <span className="font-bold text-[#191C1F] text-black">{formatPrice(shippingFee)} VND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-normal">Phí dịch vụ (5%)</span>
          <span className="font-bold text-[#191C1F]">{formatPrice(serviceFee)} VND</span>
        </div>
      </div>

      {/* Total Section */}
      <div className="border-t border-[#C9CFD2] pt-6 mb-8 mt-8">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-[#191C1F]">Tổng cộng</span>
          <span className="text-base font-bold text-[#000000]">
            {formatPrice(total)} VND
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={!isFormValid}
        className={`w-full font-bold py-3.5 rounded-none transition-all duration-300 uppercase tracking-widest text-sm ${
          isFormValid 
            ? 'bg-[#1E40AF] hover:bg-blue-800 text-white cursor-pointer' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
        }`}
      >
        {isFormValid ? 'THANH TOÁN' : 'Vui lòng hoàn tất thông tin'}
      </button>
      
      {!isFormValid && (
        <p className="mt-2 text-center text-[10px] text-gray-400 italic">
          * Vui lòng điền đầy đủ các thông tin bắt buộc
        </p>
      )}
    </div>
  );
}
