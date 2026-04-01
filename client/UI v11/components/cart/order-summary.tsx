'use client';

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
    <div className="sticky top-20 bg-white rounded-lg border border-[#C9CFD2] p-6 h-fit">
      <h2 className="text-lg font-bold text-[#191C1F] mb-6">Thành tiền</h2>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-6 pb-6 border-b border-[#C9CFD2]">
        {/* Item Count */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Số lượng sản phẩm:</span>
          <span className="font-medium text-[#191C1F]">{itemCount}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Tạm tính:</span>
          <span className="font-medium text-[#191C1F]">
            {formatPrice(subtotal)} VND
          </span>
        </div>

        {/* Shipping Fee */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Phí giao hàng:</span>
          <span className="font-medium text-[#191C1F]">
            {formatPrice(shippingFee)} VND
          </span>
        </div>

        {/* Service Fee */}
        <div className="flex justify-between text-sm">
          <span className="text-[#686868]">Phí dịch vụ (5%):</span>
          <span className="font-medium text-[#191C1F]">
            {formatPrice(serviceFee)} VND
          </span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="mb-6">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-[#191C1F]">Tổng cộng:</span>
          <span className="text-lg font-bold text-[#191C1F]">
            {formatPrice(total)} VND
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={!hasAvailableItems || itemCount === 0}
        className={`w-full py-3 font-bold text-white rounded-lg transition-colors ${
          hasAvailableItems && itemCount > 0
            ? 'bg-[#1E40AF] hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-400 cursor-not-allowed opacity-60'
        }`}
      >
        TIẾN HÀNH THANH TOÁN
      </button>
    </div>
  );
}
