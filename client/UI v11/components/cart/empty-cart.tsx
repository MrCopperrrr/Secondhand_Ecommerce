'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-6">
        <ShoppingCart size={64} className="text-[#C9CFD2]" />
      </div>
      <h2 className="text-2xl font-bold text-[#191C1F] mb-2">
        Giỏ hàng của bạn đang trống
      </h2>
      <p className="text-[#686868] mb-8">
        Hãy thêm một số sản phẩm để tiếp tục mua sắm
      </p>
      <Link href="/">
        <button className="px-8 py-3 bg-[#1E40AF] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
          QUAY VỀ TRANG CHỦ
        </button>
      </Link>
    </div>
  );
}
