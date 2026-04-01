import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
}

export function AddToCartModal({ isOpen, onClose, productName, productImage }: AddToCartModalProps) {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsAnimating(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="relative w-full max-w-md bg-white rounded-none shadow-2xl overflow-hidden font-outfit animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <div className="p-8 text-center">
          {/* Success Icon Animation (Copied from SuccessIcon) */}
          <div className="flex justify-center mb-6">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="48"
                fill="none" stroke="#2DB224" strokeWidth="4"
                style={{
                  strokeDasharray: '301.59',
                  strokeDashoffset: isAnimating ? 0 : '301.59',
                  transition: 'stroke-dashoffset 0.8s ease-out',
                }}
              />
              <path
                d="M 32 50 L 45 63 L 68 38"
                fill="none" stroke="#2DB224" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: '60',
                  strokeDashoffset: isAnimating ? 0 : '60',
                  transition: 'stroke-dashoffset 0.8s ease-out 0.2s',
                }}
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-[#191C1F] mb-2 uppercase tracking-tighter">
            THÀNH CÔNG!
          </h2>
          <div className="w-12 h-1 bg-[#2DB224] mx-auto mb-6" />
          
          <p className="text-[#686868] mb-8 font-medium">
            Sản phẩm <span className="text-[#000000] font-bold">"{productName}"</span> đã được thêm vào giỏ hàng của bạn.
          </p>

          {/* Product Preview */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 mb-8 text-left">
            <div className="w-16 h-16 bg-white border border-gray-200 flex-shrink-0">
              <img src={productImage} alt={productName} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#191C1F] truncate">{productName}</p>
              <p className="text-xs text-[#2DB224] font-bold uppercase mt-1">Đã thêm</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/cart')}
              className="w-full py-4 bg-[#1E40AF] text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-md"
            >
              <ShoppingBag size={18} />
              XEM GIỎ HÀNG
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 border-2 border-[#1E40AF] text-[#1E40AF] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-all bg-white"
            >
              TIẾP TỤC MUA SẮM
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
