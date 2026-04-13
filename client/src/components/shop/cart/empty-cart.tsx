// React default import not needed with automatic JSX runtime
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-white border-2 border-dashed border-[#C9CFD2] rounded-none font-roboto shadow-sm">
      <div className="mb-8 p-6 bg-gray-50 rounded-full border border-gray-100">
        <ShoppingCart size={80} className="text-[#C9CFD2]" />
      </div>
      <h2 className="text-3xl font-bold text-[#191C1F] mb-3">
        GIỎ HÀNG ĐANG TRỐNG
      </h2>
      <p className="text-base text-[#686868] mb-10 max-w-sm text-center px-4">
        Hãy tiếp tục khám phá và thêm vào giỏ hàng những sản phẩm ưng ý nhất!
      </p>
      <Link to="/" className="w-full max-w-xs">
        <button className="w-full px-10 py-4 bg-[#1E40AF] text-white font-bold rounded-none hover:bg-blue-800 transition-all duration-300 shadow-lg uppercase tracking-widest text-base">
          QUAY VỀ TRANG CHỦ
        </button>
      </Link>
    </div>
  );
}
