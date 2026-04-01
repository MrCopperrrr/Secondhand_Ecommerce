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
  serviceFee,
  total,
  hasAvailableItems,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-none border border-[#C9CFD2] p-6 h-fit font-roboto shadow-sm">
      <h2 className="text-2xl font-bold text-[#191C1F] mb-6">
        Thành tiền
      </h2>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-8 pb-6 border-b border-gray-100">
        {/* Item Count */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-normal">Số lượng sản phẩm</span>
          <span className="font-bold text-[#191C1F]">{itemCount} sản phẩm</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-normal">Tạm tính</span>
          <span className="font-bold text-[#191C1F]">
            {formatPrice(subtotal)} VND
          </span>
        </div>

        {/* Service Fee */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868] font-normal">Phí dịch vụ (5%)</span>
          <span className="font-bold text-[#191C1F]">
            {formatPrice(serviceFee)} VND
          </span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="mb-8">
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
        disabled={!hasAvailableItems || itemCount === 0}
        className={`w-full py-3.5 font-bold text-white rounded-none transition-all duration-300 uppercase tracking-wider text-sm ${
          hasAvailableItems && itemCount > 0
            ? 'bg-[#1E40AF] hover:bg-blue-800'
            : 'bg-gray-300 cursor-not-allowed opacity-60'
        }`}
      >
        TIẾN HÀNH THANH TOÁN
      </button>
    </div>
  );
}
