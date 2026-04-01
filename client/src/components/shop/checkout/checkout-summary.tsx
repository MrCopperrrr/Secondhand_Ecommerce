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
  onCheckout: () => void;
}

export function CheckoutSummary({ items, onCheckout }: CheckoutSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 25000;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + shippingFee + serviceFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-none border-2 border-[#1E40AF] p-8 sticky top-24 font-outfit shadow-md">
      <h2 className="text-xl font-bold text-[#191C1F] mb-8 pb-4 border-b-2 border-[#1E40AF] inline-block uppercase">
        Đơn hàng của bạn
      </h2>

      {/* Product List */}
      <div className="space-y-6 mb-8 max-h-96 overflow-y-auto no-scrollbar pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 pb-6 border-b border-[#C9CFD2] last:border-0 hover:bg-gray-50 transition-colors rounded-none p-2">
            <div className="relative w-20 h-20 flex-shrink-0 rounded-none overflow-hidden bg-white border border-gray-100 shadow-sm">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#191C1F] line-clamp-2 uppercase">
                {item.name}
              </h3>
              <p className="text-sm font-medium text-[#686868] mt-2">Số lượng: {item.quantity}</p>
              <p className="text-base font-bold text-[#1E40AF] mt-1">
                {formatPrice(item.price)} VND
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Breakdown */}
      <div className="space-y-4 mb-8 pt-6 border-t border-[#C9CFD2]">
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Số lượng sản phẩm:</span>
          <span className="font-bold text-[#191C1F] uppercase">{itemCount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Tạm tính:</span>
          <span className="font-bold text-[#191C1F]">{formatPrice(subtotal)} VND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Phí giao hàng:</span>
          <span className="font-bold text-[#191C1F]">{formatPrice(shippingFee)} VND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Phí dịch vụ (5%):</span>
          <span className="font-bold text-[#191C1F]">{formatPrice(serviceFee)} VND</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-[#C9CFD2] pt-6 mb-10">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#191C1F] uppercase">Tổng thanh toán:</span>
          <span className="text-2xl font-bold text-[#1E40AF]">
            {formatPrice(total)} VND
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white font-bold py-4 rounded-none transition-all duration-300 uppercase tracking-widest text-base shadow-lg"
      >
        XÁC NHẬN ĐẶT HÀNG
      </button>
    </div>
  );
}
