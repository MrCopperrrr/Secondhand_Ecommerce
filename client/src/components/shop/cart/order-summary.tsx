import React from 'react';

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  serviceFee: number;
  total: number;
  hasAvailableItems: boolean;
  onCheckout: () => void;
}

export function OrderSummary({
  itemCount,
  subtotal,
  shippingFee,
  serviceFee,
  total,
  hasAvailableItems,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-24 bg-white rounded-none border-2 border-[#1E40AF] p-8 h-fit font-outfit shadow-md">
      <h2 className="text-xl font-bold text-[#191C1F] mb-8 pb-4 border-b-2 border-[#1E40AF] inline-block">
        TỔNG ĐƠN HÀNG
      </h2>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-8 pb-6 border-b border-[#C9CFD2]">
        {/* Item Count */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Số lượng sản phẩm:</span>
          <span className="font-bold text-[#191C1F]">{itemCount}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Tạm tính:</span>
          <span className="font-bold text-[#191C1F]">
            {formatPrice(subtotal)} VND
          </span>
        </div>

        {/* Shipping Fee */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Phí giao hàng:</span>
          <span className="font-bold text-[#191C1F]">
            {formatPrice(shippingFee)} VND
          </span>
        </div>

        {/* Service Fee */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-medium">Phí dịch vụ (5%):</span>
          <span className="font-bold text-[#191C1F]">
            {formatPrice(serviceFee)} VND
          </span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="mb-10">
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
        disabled={!hasAvailableItems || itemCount === 0}
        className={`w-full py-4 font-bold text-white rounded-none transition-all duration-300 uppercase tracking-widest text-base shadow-lg ${
          hasAvailableItems && itemCount > 0
            ? 'bg-[#1E40AF] hover:bg-blue-800 hover:shadow-xl cursor-pointer'
            : 'bg-gray-300 cursor-not-allowed opacity-60'
        }`}
      >
        TIẾN HÀNH THANH TOÁN
      </button>
    </div>
  );
}
