// React default import not required with automatic JSX runtime
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SuccessIcon } from './success-icon';

interface SuccessCardProps {
  orderId?: string;
}

export function SuccessCard({ orderId = '1001' }: SuccessCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-none p-10 shadow-2xl border-2 border-[#2DB224] font-roboto text-center">
      {/* Success Icon */}
      <SuccessIcon />

      {/* Confirmation Message */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#191C1F] mb-4 tracking-tighter">
          Thanh toán thành công
        </h1>
        <div className="w-20 h-1 bg-[#2DB224] mx-auto mb-6" />
        <p className="text-lg text-[#686868] font-medium leading-relaxed">
          Cảm ơn bạn! Đơn hàng <span className="text-[#191C1F] font-bold">#{orderId}</span> của bạn đã được đặt và đang chờ xác nhận từ người bán.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Secondary Button - Back to Home */}
        <Link
          to="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#1E40AF] rounded-none hover:bg-blue-50 transition-all duration-300 whitespace-nowrap bg-white shadow-sm"
        >
          <ChevronLeft size={22} className="text-[#1E40AF]" />
          <span className="font-bold text-[#1E40AF]">Trang chủ</span>
        </Link>

        {/* Primary Button - View Order */}
        <Link
          to="/profile/orders"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#1E40AF] text-white rounded-none hover:bg-blue-800 transition-all duration-300 whitespace-nowrap shadow-md"
        >
          <span className="font-bold text-base">Xem đơn hàng</span>
          <ChevronRight size={22} />
        </Link>
      </div>
    </div>
  );
}
