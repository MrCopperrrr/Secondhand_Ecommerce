'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SuccessIcon } from './success-icon';

interface SuccessCardProps {
  orderId?: string;
}

export function SuccessCard({ orderId = '1' }: SuccessCardProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 shadow-lg">
      {/* Success Icon */}
      <SuccessIcon />

      {/* Confirmation Message */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#191C1F] mb-3">
          Thanh toán thành công
        </h1>
        <p className="text-base text-[#686868] font-normal">
          Đơn hàng của bạn đã được đặt
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Secondary Button - Back to Home */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1E40AF] rounded hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          <ChevronLeft size={20} className="text-[#1E40AF]" />
          <span className="font-bold text-[#1E40AF]">QUAY VỀ TRANG CHỦ</span>
        </Link>

        {/* Primary Button - View Order */}
        <Link
          href={`/order/${orderId}`}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1E40AF] text-white rounded hover:bg-[#1a3a8a] transition-colors whitespace-nowrap"
        >
          <span className="font-bold">XEM ĐƠN HÀNG</span>
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}
