'use client';

import Image from 'next/image';

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
    <div className="bg-white rounded-lg border border-[#C9CFD2] p-6 sticky top-24">
      <h2 className="text-lg font-bold text-[#191C1F] mb-6">Đơn đặt hàng</h2>

      {/* Product List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 pb-4 border-b border-[#C9CFD2] last:border-0">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                loading="eager"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-[#191C1F] line-clamp-2">
                {item.name}
              </h3>
              <p className="text-xs text-[#686868] mt-1">x{item.quantity}</p>
              <p className="text-sm font-bold text-[#1E40AF] mt-1">
                {formatPrice(item.price)} VND
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Breakdown */}
      <div className="space-y-3 mb-6 pt-4 border-t border-[#C9CFD2]">
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Số lượng sản phẩm:</span>
          <span className="font-medium text-[#191C1F]">{itemCount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Tạm tính:</span>
          <span className="font-medium text-[#191C1F]">{formatPrice(subtotal)} VND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Phí giao hàng:</span>
          <span className="font-medium text-[#191C1F]">{formatPrice(shippingFee)} VND</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Phí dịch vụ (5%):</span>
          <span className="font-medium text-[#191C1F]">{formatPrice(serviceFee)} VND</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-[#C9CFD2] pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#191C1F]">Tổng cộng:</span>
          <span className="text-2xl font-bold text-[#1E40AF]">
            {formatPrice(total)} VND
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#1E40AF] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-wider"
      >
        Thanh toán
      </button>
    </div>
  );
}
